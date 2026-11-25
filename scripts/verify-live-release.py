"""Wait for GitHub Pages deployment, download receipts, and verify live SEO signals."""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

REPO = "Alexanderhe1212/mtt-packaging-site"
WORKFLOW = "Deploy MTT Packaging"
ORIGIN = "https://mttpackaging.com"
SITEMAP_NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def run_gh(args: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
    """Run gh CLI with retries handled by caller."""
    return subprocess.run(["gh", *args], text=True, capture_output=True, check=check)


def current_head_sha() -> str:
    """Return local git HEAD full SHA."""
    res = subprocess.run(["git", "rev-parse", "HEAD"], text=True, capture_output=True, check=True)
    return res.stdout.strip()


def wait_for_run(sha: str, timeout_sec: int) -> int:
    """Locate and wait for the Deploy MTT Packaging workflow run matching sha."""
    deadline = time.monotonic() + timeout_sec
    run_id: int | None = None

    while time.monotonic() < deadline:
        res = run_gh(
            [
                "run",
                "list",
                "-R",
                REPO,
                "-w",
                WORKFLOW,
                "-L",
                "10",
                "--json",
                "databaseId,headSha,status,conclusion",
            ],
            check=False,
        )
        if res.returncode == 0 and res.stdout.strip():
            runs = json.loads(res.stdout)
            match = next((r for r in runs if r.get("headSha") == sha), None)
            if match:
                run_id = int(match["databaseId"])
                if match.get("status") == "completed":
                    if match.get("conclusion") != "success":
                        raise RuntimeError(f"Workflow run {run_id} finished with conclusion={match.get('conclusion')}")
                    print(f"[OK] GitHub Actions run {run_id} succeeded for {sha[:7]}.")
                    return run_id
                print(f"[WAIT] Run {run_id} status={match.get('status')}...")
        time.sleep(15)

    raise TimeoutError(f"Timed out waiting for workflow run for {sha} (last run_id={run_id})")


def download_receipts(run_id: int, dest: Path) -> None:
    """Download indexnow-receipt and optional bing-webmaster-receipt artifacts."""
    dest.mkdir(parents=True, exist_ok=True)
    for name in ("indexnow-receipt", "bing-webmaster-receipt"):
        res = run_gh(["run", "download", str(run_id), "-R", REPO, "-n", name, "-D", str(dest / name)], check=False)
        if res.returncode == 0:
            for file in (dest / name).glob("*.json"):
                print(f"--- Artifact {name}/{file.name} ---")
                print(file.read_text(encoding="utf-8").strip())


def fetch_text(url: str) -> tuple[int, str]:
    """Fetch URL and return (status, body)."""
    req = Request(url, headers={"User-Agent": "MTT-Release-Verify/1.0"})
    with urlopen(req, timeout=30) as resp:
        return resp.status, resp.read().decode("utf-8", errors="replace")


def verify_live_revision(sha: str, timeout_sec: int = 120) -> None:
    """Confirm live deployment-revision.txt matches sha."""
    deadline = time.monotonic() + timeout_sec
    last_val = ""
    while time.monotonic() < deadline:
        try:
            _, body = fetch_text(f"{ORIGIN}/deployment-revision.txt?v={int(time.time())}")
            last_val = body.strip()
            if last_val == sha:
                print(f"[OK] Live deployment-revision.txt matches {sha}.")
                return
        except Exception as exc:
            last_val = str(exc)
        time.sleep(5)
    raise RuntimeError(f"Live deployment-revision.txt mismatch: expected {sha}, got {last_val!r}")


def collect_sitemap_urls() -> dict[str, str | None]:
    """Fetch main and product sitemaps and return url -> lastmod."""
    entries: dict[str, str | None] = {}
    for sm in ("sitemap.xml", "sitemap-products.xml"):
        _, xml_text = fetch_text(f"{ORIGIN}/{sm}?v={int(time.time())}")
        root = ET.fromstring(xml_text)
        for node in root.findall("s:url", SITEMAP_NS):
            loc = node.findtext("s:loc", default="", namespaces=SITEMAP_NS).strip()
            lastmod = node.findtext("s:lastmod", default=None, namespaces=SITEMAP_NS)
            if loc:
                entries[loc] = lastmod
    return entries


def verify_urls(urls: list[str]) -> None:
    """Verify HTTP 200, canonical, absence of noindex, and sitemap presence for URLs."""
    if not urls:
        return
    sitemap_entries = collect_sitemap_urls()
    for url in urls:
        normalized = url if url.startswith("http") else f"{ORIGIN}/{url.lstrip('/')}"
        status, html = fetch_text(f"{normalized}?verify={int(time.time())}")
        if status != 200:
            raise RuntimeError(f"{normalized}: expected HTTP 200, got {status}")
        canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
        canonical = canonical_match.group(1) if canonical_match else ""
        if canonical != normalized:
            raise RuntimeError(f"{normalized}: canonical mismatch ({canonical!r})")
        if re.search(r'<meta[^>]+name=["\'](?:robots|googlebot)["\'][^>]+noindex', html, re.I):
            raise RuntimeError(f"{normalized}: unexpected noindex directive")
        if normalized not in sitemap_entries:
            raise RuntimeError(f"{normalized}: missing from live sitemaps")
        print(f"[OK] Live {normalized} -> HTTP 200, canonical match, sitemap lastmod={sitemap_entries[normalized]}")

    print("\n=== Google Search Console Manual URL Inspection List ===")
    for url in urls:
        normalized = url if url.startswith("http") else f"{ORIGIN}/{url.lstrip('/')}"
        print(f"- {normalized}")


def main() -> int:
    """Wait for CI deployment and verify live site + search receipts."""
    parser = argparse.ArgumentParser()
    parser.add_argument("--sha", default=None, help="Commit SHA to verify (defaults to git HEAD)")
    parser.add_argument("--url", action="append", default=[], help="Canonical URL or path to verify live")
    parser.add_argument("--timeout", type=int, default=720, help="CI wait timeout in seconds")
    args = parser.parse_args()

    sha = args.sha or current_head_sha()
    run_id = wait_for_run(sha, args.timeout)
    download_receipts(run_id, Path(f"/tmp/mtt-release-{sha[:7]}"))
    verify_live_revision(sha)
    verify_urls(args.url)
    return 0


if __name__ == "__main__":
    sys.exit(main())
