# MTT Packaging project instructions

## Brand positioning & commercial facts

- **Brand & Domain**: `MTT Packaging` (`https://mttpackaging.com`) — China Packaging Development & Manufacturing Partner with a factory in Changzhou, Jiangsu, China (`江苏常州`).
- **Core Offerings**: Rigid presentation boxes (`custom-rigid-boxes`), collapsible/foldable rigid boxes (`fold-flat`), folding cartons (`folding-cartons`), corrugated mailers/cartons (`corrugated-boxes`), custom paper bags (`custom-paper-bags`), and fitted inserts (`custom-inserts`) serving fragrance, cosmetics & skincare, jewelry & watches, and luxury gifting B2B buyers overseas.
- **Commercial Terms**: Minimum order quantity `1,000 pieces per design`, minimum `US$2,000 product value per order` (excluding freight, sample charges and other fees), physical sampling before mass production (**Sample first**), and 24-hour enquiry response target.
- **Voice**: Professional, restrained, engineering-driven, and commercially transparent. Never invent factories, production capacity, client cases, lab test passes, certifications, or unverified search volumes.

## Content quality — user-adopted default, 2026-09-15

Before writing or revising SEO, GEO, Insights, Case Studies, or buyer-problem content, read and follow [the MTT Content Quality Pipeline](docs/content-quality-pipeline.md). This is the user's standing editorial requirement, not an optional suggestion.

- **SEO/GEO Hard Standards**: Every English guide and product page must include focused buyer-intent keyword alignment, unique SEO Title (`< 70` chars) & Meta Description, logical H1/H2 hierarchy, 40–100 word Quick Answer (`intro`), visible structured FAQ when helpful (`FAQPage` schema matches visible HTML), natural internal links to relevant product/category/enquiry paths (never place `/request-a-quote` inside `.article-body` sections), and descriptive image `alt` text.
- **Editorial Gate**: Publish only at `85/100` or above with zero unresolved factual or claim issues. Preserve working URLs unless a change is explicitly requested.

## Daily packaging and organic search operations

For MTT website maintenance from 2026-11-07 through 2027-02-04, follow the [90-day operating plan](docs/seo-geo-operations-2026-11-07.md) alongside the quality pipeline. Reconcile the current daily run with recent releases and open work before selecting a page. A day without a material buyer-facing change does not require a publication.

## One-shot SEO/GEO, blog & product publishing SOP

When the user asks to publish ("发布" / "上线"), optimize website SEO/GEO, write a blog guide, or add a product page, activate `.agents/skills/mtt-one-shot-release/SKILL.md` together with `mtt-organic-growth-audit` and `post-build-seo-geo`, and execute end-to-end without pausing mid-way:

1. **Author / Edit**: Draft or revise content, product records, metadata, `lib/knowledge-taxonomy.ts`, `lib/article-navigation.ts`, `app/sitemap.ts`, `public/llms.txt`, keyword maps, and `docs/research/content-quality-review-*.json`.
2. **Local Pre-flight & Build**: Run `npm run seo-check && python3 scripts/preflight-mtt.py && MTT_STATIC_EXPORT=1 npm run build && npm run check:types && npm run lint && npm run check:release` (zero errors required).
3. **Commit & Push**: `git add` scoped files, `git commit`, and `git push origin main` (triggers GitHub Pages build/deploy, IndexNow, optional Bing Webmaster API, and `.github/workflows/auto-index.yml`).
4. **Post-Deploy Verification & Indexing**: Run `python3 scripts/verify-live-release.py --url <changed-url>` (and `npm run index -- --url <changed-url>` when immediate GSC URL Inspection / sitemap submission is needed). Use `npm run gsc` for 28-day GSC opportunity reviews when `gsc-key.json` / `GSC_SERVICE_ACCOUNT_JSON` is present.
5. **Concise Final Report**: Output changed files, live URLs, and GitHub push / CI / indexing verification status.
