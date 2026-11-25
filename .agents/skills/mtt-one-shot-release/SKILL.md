---
name: mtt-one-shot-release
description: One-shot end-to-end execution workflow for MTT Packaging (mttpackaging.com) whenever optimizing SEO/GEO, writing and publishing a blog guide (/insights/), or adding a product page (/products/). Use for any authorized publish, SEO/GEO improvement, article creation, or catalogue addition in mtt-packaging-site.
---

# MTT Packaging One-Shot Publish & SEO/GEO Pipeline

Execute the entire workflow in one continuous run — from keyword selection and content/product creation to local preflight, GitHub push, CI verification, live URL checks, IndexNow/Bing notification, and final GSC handoff output.

Activate alongside:
- `mtt-organic-growth-audit` (evidence gates, keyword deduplication, MOQ rules)
- `post-build-seo-geo` (No-JS HTML, Schema.org, Quick Answer, AI attribution)
- `b2b-site-builder` (catalogue/product buyer path and operations discipline)

---

## 1. Locked Fact Base (Never Violate)

- **Brand**: `MTT Packaging` — China Packaging Development & Manufacturing Partner
- **Factory city**: `Changzhou, Jiangsu, China` (`江苏常州`)
- **Contact**: `Hugo He` · `info@mttpackaging.com` · `WhatsApp +86 17207110964`
- **Canonical Domain**: `https://mttpackaging.com` (never restore old hostnames)
- **Order Minimums**: Minimum `1,000 pieces per design` and `US$2,000 product value per order` (excluding freight, sample charges and other fees)
- **Strict Honesty**: Never fabricate customers, completed orders, lab test passes, certifications, savings percentages, or unverified search volumes. Label concept renderings as concepts/illustrative.

---

## 2. Mode A — Write & Publish a Blog Guide (`/insights/<slug>`)

1. **Select topic from keyword map without cannibalization**:
   - Check `/Users/hugo/Documents/Codex/mtt packaging websit/mtt-content-plan-20261009/关键词页面表.csv`, `docs/research/knowledge-content-map-2026-09-28.csv`, `/Users/hugo/Downloads/MTT-topic-map-2026-11-20.csv`, and `lib/knowledge-taxonomy.ts` to pick an unpublished or authorized target without duplicating an existing buyer decision.
2. **Draft & verify external sources**:
   - Verify any external authoritative references via `search_web` and live HTTP 200 before citing.
   - Structure per `docs/content-quality-pipeline.md`:
     - `intro` (Quick Answer): **40–100 English words**, direct answer first.
     - `seoTitle`: **strictly `< 70` characters** (if `title` is ≥ 55 chars, omit `| MTT Packaging` suffix or use a concise `seoTitle`).
     - `summary`: unique meta description (≤ 160 chars).
     - `sections`: substantive packaging judgments (≥ 3 types of information gain: table, inline SVG measurement/structure diagram, failure modes, sample checklist). **NEVER** place `/request-a-quote` links inside `sections` (only `<aside aria-label="Packaging brief">` may link to it).
     - `faq`: optional, plain text only (rendered visibly and as `FAQPage` JSON-LD).
     - `cta`: includes `Minimum 1,000 pieces per design and US$2,000 product value per order, excluding freight, samples and other fees.`
     - Zero stock AI fluff (`In today's competitive market`, `In conclusion`, `elevate your brand`, `seamless`, etc.).
3. **Wire all required files**:
   - Guide JSON in `lib/` (e.g. `lib/buyer-guides-YYYY-MM-DD.json`) + import/spread in `lib/articles.ts`.
   - Assign to **exactly one** topic in `lib/knowledge-taxonomy.ts`.
   - Add navigation entry (3 curated products + 3 related guides) in `lib/article-navigation.ts`.
   - Update `insights` `lastModified` to today (`Asia/Shanghai`) in `app/sitemap.ts`.
   - Add link under `## Packaging guides` in `public/llms.txt`.
   - Register guide JSON in `scripts/check-content-quality.py` and add an evidence-backed editorial review (`total >= 85`, `unresolvedFactualIssues: []`) in `docs/research/content-quality-review-YYYY-MM-DD.json`.

---

## 3. Mode B — Add a Product Page (`/products/<slug>` + `/zh/products/<slug>`)

1. **Check uniqueness**:
   - Inspect `lib/products*.json`, `docs/v15-keyword-map.csv`, and `docs/catalog/product-keywords.json` so `code`, `slug`, and `searchTerms[0]` are unique.
2. **Add bilingual product data & verified images**:
   - Follow the schema in `lib/products-november-18.json` (EN + ZH fields, `seoTitle < 70` chars, `searchTerms`, `searchUse`, `check`, `logic`).
   - Place product images in `public/products/<id>-0.webp`..`-4.webp` (plus `-5.webp` for `fold-flat`, or set `conceptSingleView: true` when single-view).
   - If adding a new `lib/products-*.json` file, import/include it in `lib/products.ts`, `scripts/check-search-quality.py`, `scripts/check-phase-four.py`, and `scripts/check-phase-five.py` (or append to an existing wired batch if appropriate).
3. **Update keyword maps, sitemap & internal links**:
   - Update `docs/v15-keyword-map.csv` and `docs/catalog/product-keywords.json`.
   - Set today's `lastModified` for the new product URLs (and `products` / `zh/products`) in `app/sitemap.ts`.
   - Link the new product in relevant `lib/article-navigation.ts` entries (and optionally `lib/industries.ts`).

---

## 4. Mode C — Optimize Website SEO / GEO

- Check raw/static HTML readability (specs, tables, FAQs, links visible without JS).
- Check Schema.org JSON-LD matches visible HTML (`Organization` with Changzhou factory address, `Person`, `Article`, `FAQPage`, `WebPage`, `ItemList`, `BreadcrumbList`).
- Preserve GA4 (`G-Z132GJZZ57`), Clarity (`yk2b0kh4n6`), consent gating, and AI `utm_source`/referrer attribution in `lib/analytics-bootstrap.mjs`.
- Never alter `robots.txt` crawler allow rules, DNS, or existing canonical URLs without explicit approval.

---

## 5. One-Shot Validation, Deploy & Indexing Verification

Run these steps continuously without stopping mid-way:

1. **Pre-flight validation**:
   ```bash
   python3 scripts/preflight-mtt.py
   ```
   (Runs all Python structural, content, product, taxonomy, image, and keyword-map checks, plus full `npm run build && npm run check:types && npm run lint && npm run check:release` whenever `node`/`npm` is available locally.)

2. **Commit & push to `main`**:
   ```bash
   git add <scoped-files> && git commit -m "<type>: <concise summary>" && git push origin main
   ```

3. **Wait for GitHub Pages deploy, IndexNow/Bing & verify live URLs**:
   ```bash
   python3 scripts/verify-live-release.py --url https://mttpackaging.com/<changed-path>
   ```
   - Waits for `Deploy MTT Packaging` GitHub Actions run to pass.
   - Downloads `indexnow-receipt` (and `bing-webmaster-receipt` if `BING_WEBMASTER_API_KEY` secret is configured).
   - Verifies live `deployment-revision.txt == HEAD`, HTTP 200, canonical tag, `noindex` absence, and `sitemap.xml` / `sitemap-products.xml` presence.

4. **Final report**:
   - Report exact changed files, CI run ID, live verification results, IndexNow/Bing receipts, and list the exact URLs for Hugo to click **Request Indexing** in Google Search Console (since GSC does not provide an unauthenticated API for regular blog/product pages).
