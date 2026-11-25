"""Pre-flight validation for MTT Packaging blog guides, products, and SEO/GEO invariants.

Runs fast Python checks on source data, keyword maps, taxonomy, reviews, and images.
When Node.js/npm is installed locally, also runs build, check:types, lint, and check:release.
"""
from __future__ import annotations

import csv
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANNED_RE = re.compile(
    r"In today.s competitive market|In conclusion|anonymized project discussion|20–35%|\$2–4",
    re.IGNORECASE,
)


def load_json(path: Path):
    """Parse JSON with contextual error reporting."""
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise RuntimeError(f"Invalid JSON in {path.relative_to(ROOT)}: {exc}") from exc


def collect_guide_json_paths() -> list[Path]:
    """Discover all guide JSON files imported by lib/articles.ts."""
    articles_ts = (ROOT / "lib/articles.ts").read_text(encoding="utf-8")
    imports = re.findall(r"from\s+['\"]\.\/([^'\"]+\.json)['\"]", articles_ts)
    return [ROOT / "lib" / name for name in imports if name != "buyer-article-updates.json"]


def collect_products() -> list[dict]:
    """Load all products from JSON files imported by lib/products.ts."""
    products_ts = (ROOT / "lib/products.ts").read_text(encoding="utf-8")
    imports = re.findall(r"from\s+['\"]\.\/([^'\"]+\.json)['\"]", products_ts)
    products: list[dict] = []
    for name in imports:
        data = load_json(ROOT / "lib" / name)
        if not isinstance(data, list):
            raise RuntimeError(f"Expected list in lib/{name}")
        products.extend(data)
    return products


def check_guides() -> tuple[set[str], int]:
    """Validate guide JSON files, taxonomy coverage, navigation, and review scores."""
    guide_records: dict[str, dict] = {}
    for path in collect_guide_json_paths():
        data = load_json(path)
        items = data if isinstance(data, list) else [data]
        for item in items:
            slug = item["slug"]
            if slug in guide_records:
                raise AssertionError(f"Duplicate guide slug across JSON files: {slug}")
            guide_records[slug] = item

    updates = load_json(ROOT / "lib/buyer-article-updates.json")
    merged = {slug: {**rec, **updates.get(slug, {})} for slug, rec in guide_records.items()}

    for slug, guide in merged.items():
        wc = len(guide["intro"].split())
        assert 40 <= wc <= 100, f"{slug}: intro word count {wc} outside 40..100"
        resolved_title = guide.get("seoTitle") or f"{guide['title']} | MTT Packaging"
        assert 1 <= len(resolved_title.strip()) < 70, f"{slug}: title length {len(resolved_title.strip())} >= 70"
        hero_img = ROOT / "public" / guide["image"].lstrip("/")
        assert hero_img.is_file(), f"{slug}: missing hero image {guide['image']}"
        section_html = " ".join(part[1] for part in guide["sections"])
        assert "/request-a-quote" not in section_html, f"{slug}: /request-a-quote link inside article body"
        visible = " ".join(
            [
                guide["title"],
                guide["summary"],
                guide["intro"],
                guide.get("cta", ""),
                *[f"{t} {c}" for t, c in guide["sections"]],
                *[f"{q} {a}" for q, a in guide.get("faq", [])],
            ]
        )
        assert not BANNED_RE.search(visible), f"{slug}: banned phrase detected"

    titles = [g["title"] for g in merged.values()]
    summaries = [g["summary"] for g in merged.values()]
    assert len(titles) == len(set(titles)), "Duplicate guide titles detected"
    assert len(summaries) == len(set(summaries)), "Duplicate guide summaries detected"

    taxonomy_raw = (ROOT / "lib/knowledge-taxonomy.ts").read_text(encoding="utf-8")
    topics = json.loads(taxonomy_raw.split(" = ", 1)[1].rstrip(";\n"))
    owned = [slug for topic in topics for slug in topic["slugs"]]
    assert len(owned) == len(set(owned)), "Duplicate slug ownership in lib/knowledge-taxonomy.ts"
    for slug in merged:
        assert slug in owned, f"{slug}: missing from lib/knowledge-taxonomy.ts"

    check_cq_src = (ROOT / "scripts/check-content-quality.py").read_text(encoding="utf-8")
    for path in collect_guide_json_paths():
        rel = f"lib/{path.name}"
        assert rel in check_cq_src, f"{rel}: not registered in scripts/check-content-quality.py"

    reviews: dict[str, dict] = {}
    for rev_path in sorted((ROOT / "docs/research").glob("content-quality-review-*.json")):
        rev_data = load_json(rev_path)
        if isinstance(rev_data, list):
            for rec in rev_data:
                if isinstance(rec, dict) and "slug" in rec and "score" in rec:
                    reviews[rec["slug"]] = rec

    for slug in merged:
        assert slug in reviews, f"{slug}: missing editorial review record in docs/research/"
        rec = reviews[slug]
        assert rec["total"] == sum(rec["score"].values()) and rec["total"] >= 85, (
            f"{slug}: editorial score {rec.get('total')} < 85"
        )
        assert not rec.get("unresolvedFactualIssues"), f"{slug}: unresolvedFactualIssues not empty"

    return set(merged), len(merged)


def check_products() -> int:
    """Validate product catalogue uniqueness, images, and keyword maps."""
    products = collect_products()
    codes = [p["code"] for p in products]
    slugs = [p["slug"] for p in products]
    primary_terms = [p["searchTerms"][0].lower() for p in products]
    assert len(codes) == len(set(codes)), "Duplicate product code"
    assert len(slugs) == len(set(slugs)), "Duplicate product slug"
    assert len(primary_terms) == len(set(primary_terms)), "Duplicate product searchTerms[0]"

    for p in products:
        title = p.get("seoTitle") or p["name"]
        assert len(title.strip()) < 70, f"{p['code']}: seoTitle length {len(title.strip())} >= 70"
        indices = [0] if p.get("conceptSingleView") else ([0, 1, 2, 3, 4, 5] if p["structure"] == "fold-flat" else [0, 1, 2, 3, 4])
        for idx in indices:
            img_rel = p["image"].replace(".webp", f"-{idx}.webp").lstrip("/")
            assert (ROOT / "public" / img_rel).is_file(), f"{p['code']}: missing public/{img_rel}"

    with (ROOT / "docs/v15-keyword-map.csv").open(encoding="utf-8") as handle:
        kw_rows = list(csv.DictReader(handle))
    kw_json = load_json(ROOT / "docs/catalog/product-keywords.json")
    assert len(kw_rows) == len(kw_json) == len(products), (
        f"Keyword map count mismatch: csv={len(kw_rows)}, json={len(kw_json)}, catalogue={len(products)}"
    )
    by_code = {p["code"]: p for p in products}
    assert {r["code"] for r in kw_rows} == {r["code"] for r in kw_json} == set(by_code), "Keyword map code set mismatch"
    for row in kw_rows:
        product = by_code[row["code"]]
        assert row["product_url"] == f"https://mttpackaging.com/products/{product['slug']}"
        assert row["specific_search_intent"] == product["searchTerms"][0]
    for row in kw_json:
        product = by_code[row["code"]]
        assert row["url"] == f"https://mttpackaging.com/products/{product['slug']}"
        assert row["keywords"] == product["searchTerms"]

    return len(products)


def run_npm_pipeline() -> None:
    """Run Node/npm build, typecheck, lint, and full release checks if available."""
    npm = shutil.which("npm")
    if not npm:
        print("[SKIP] node/npm not found on PATH; GitHub Actions will execute build, lint, types, and check:release.")
        return

    env = {**os.environ, "MTT_STATIC_EXPORT": "1"}
    for cmd in (
        [npm, "run", "build"],
        [npm, "run", "check:types"],
        [npm, "run", "lint"],
        [npm, "run", "check:release"],
    ):
        print("Running:", " ".join(cmd))
        subprocess.run(cmd, cwd=ROOT, env=env, check=True)


def main() -> int:
    """Execute pre-flight validations."""
    _, guide_count = check_guides()
    product_count = check_products()
    print(f"[OK] Python pre-flight passed: {guide_count} guide JSON entries and {product_count} products verified.")
    run_npm_pipeline()
    return 0


if __name__ == "__main__":
    sys.exit(main())
