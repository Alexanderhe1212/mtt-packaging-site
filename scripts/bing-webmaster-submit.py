"""Optional Bing Webmaster Tools URL Submission API client.

Reads the changed canonical URL list produced by scripts/indexnow-submit.py and
submits only those URLs via Bing's SubmitUrlbatch endpoint when
BING_WEBMASTER_API_KEY is configured in the environment.
"""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

SITE_URL = "https://mttpackaging.com"
ENDPOINT = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch"
MAX_BATCH = 500


def submit_batch(api_key: str, urls: list[str]) -> tuple[int, str]:
    """POST one batch of URLs to Bing Webmaster SubmitUrlbatch."""
    payload = json.dumps({"siteUrl": SITE_URL, "urlList": urls}).encode("utf-8")
    req = Request(
        f"{ENDPOINT}?apikey={quote(api_key, safe='')}",
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    with urlopen(req, timeout=30) as resp:
        return resp.status, resp.read().decode("utf-8", errors="replace")


def main() -> int:
    """Submit changed URLs from IndexNow receipt if BING_WEBMASTER_API_KEY is set."""
    parser = argparse.ArgumentParser()
    parser.add_argument("--indexnow-result", default="/tmp/indexnow-result.json")
    parser.add_argument("--output", default="/tmp/bing-webmaster-result.json")
    args = parser.parse_args()

    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    api_key = os.environ.get("BING_WEBMASTER_API_KEY", "").strip()
    if not api_key:
        report = {
            "status": "skipped_unconfigured",
            "meaning": "BING_WEBMASTER_API_KEY secret is not configured; IndexNow remains active.",
        }
        out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        print(report["meaning"])
        return 0

    src = Path(args.indexnow_result)
    if not src.is_file():
        report = {"status": "skipped_no_indexnow_result", "urls": []}
        out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        print("No IndexNow result file found; skipping Bing Webmaster API submission.")
        return 0

    indexnow_data = json.loads(src.read_text(encoding="utf-8"))
    urls = indexnow_data.get("urls") or []
    if not urls:
        report = {"status": "unchanged", "urls": []}
        out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        print("No changed URLs to submit to Bing Webmaster API.")
        return 0

    batches = []
    for start in range(0, len(urls), MAX_BATCH):
        chunk = urls[start : start + MAX_BATCH]
        try:
            status, body = submit_batch(api_key, chunk)
            batches.append({"count": len(chunk), "http_status": status, "response": body[:300]})
        except (HTTPError, URLError) as exc:
            report = {
                "status": "failed",
                "error": str(exc),
                "batches": batches,
                "urls": urls,
            }
            out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
            print(f"Bing Webmaster API submission failed: {exc}")
            return 1

    report = {
        "status": "received",
        "meaning": "API acceptance does not establish indexing or ranking.",
        "count": len(urls),
        "urls": urls,
        "batches": batches,
    }
    out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"Bing Webmaster API: {len(urls)} URLs submitted.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
