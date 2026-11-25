# MTT Packaging project instructions

## Content quality — user-adopted default, 2026-09-15

Before writing or revising SEO, GEO, Insights, Case Studies, or buyer-problem content, read and follow [the MTT Content Quality Pipeline](docs/content-quality-pipeline.md). This is the user's standing editorial requirement, not an optional suggestion.

Start with the buyer's problem and decision; research claims; add substantive packaging judgments; review writing, facts, SEO, GEO and conversion; document an evidence-based editorial score. Publish only at 85/100 or above with no unresolved factual or claim issues. Never invent MTT experience, customers, tests, certifications or results.

Preserve working URLs unless a change is explicitly requested. Follow existing build, release-check and deployment procedures when publishing authorized website changes. Do not treat saving these instructions as a request to deploy the website or install additional tools.

## Daily packaging and organic search operations

For MTT website maintenance from 2026-11-07 through 2027-02-04, follow the [90-day operating plan](docs/seo-geo-operations-2026-11-07.md) alongside the quality pipeline. Reconcile the current daily run with recent releases and open work before selecting a page. A day without a material buyer-facing change does not require a publication.

## One-shot SEO/GEO, blog & product publishing workflow

When asked to optimize website SEO/GEO, publish a blog article, or add a product page, activate `.agents/skills/mtt-one-shot-release/SKILL.md` together with `mtt-organic-growth-audit` and `post-build-seo-geo`. Execute the full pipeline in one continuous pass:

1. Draft/edit content, metadata, taxonomy, navigation, `app/sitemap.ts`, `public/llms.txt`, and quality/keyword records.
2. Run `python3 scripts/preflight-mtt.py` before committing.
3. Commit scoped changes on `main` and push to `origin/main` (triggers GitHub Pages build, release checks, deployment, IndexNow, and optional Bing Webmaster API submission).
4. Run `python3 scripts/verify-live-release.py --url <changed-url>` to verify the GitHub Actions run, IndexNow/Bing receipts, live `deployment-revision.txt`, HTTP 200, canonical, and sitemap inclusion, then output any manual Google Search Console URL Inspection links needed.
