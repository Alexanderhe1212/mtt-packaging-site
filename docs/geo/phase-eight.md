# Phase eight — crawlable product discovery and buyer navigation

2026-09-14. No ranking, indexing or AI citation gain is claimed.

## What changed

- Added server-rendered, visible product directories to folding cartons, corrugated boxes and paper bags: 30 existing designs each, grouped by construction with native expandable sections and derived thumbnails. Existing interactive catalogue filters and product enquiry flows are preserved.
- Added four family links above the catalogue and six buyer-question links to the existing guides. The insights hub now has a descriptive heading and single-column mobile article layout.
- Declared the packaging overview static after a build omitted that route. Added missing main-content targets on the carton and bag pages so keyboard skip links work.
- Sitemap modification dates reflect the changed catalogue/guide hubs. No speculative new product pages or unsupported business claims were added.

## GitHub support and rationale

[NetworkX](https://github.com/networkx/networkx), BSD-3-Clause, is used only for a local shortest-link-path audit. Version 3.2.1 supports the current Python 3.9 environment. No browser dependency or paid service was added. [Advertools](https://github.com/eliasdabbas/advertools) was reviewed; its larger crawling stack was unnecessary for this static-site check. Existing Lighthouse CI validates the changed pages.

[Google crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) and [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) support useful crawlable content and ordinary SEO foundations; this release does not rely on invented AI-only markup or promise citations.

## Reproduce after future builds

```sh
python3 -m venv work/seo-tools
work/seo-tools/bin/pip install -r scripts/requirements-discovery.txt
work/seo-tools/bin/python scripts/audit-discovery.py --strict
npm run check:release
```

The audit reads sitemap-listed HTML pages and follows same-site rendered anchor links. It excludes nofollow links and JavaScript actions. The English navigation gate fails on unreachable pages or routes deeper than three links. Chinese routes are reported but excluded from the English gate because the language switcher remains disabled by request. A page failing this audit can still be indexed through a sitemap or other discovery path.

Before: 76 of 274 English pages unreachable via this link graph, 6 beyond three links, maximum reachable depth 5. After: 0 unreachable, 0 beyond three links, maximum depth 2. See phase-eight-audit.json. These are navigational findings, not Search Console indexing results.

## Validation and limits

494 sitemap pages checked; 434 EN/ZH product pages retain schema/breadcrumbs and consistent enquiry links; 1085 thumbnails checked. Quote retry/draft preservation and analytics consent tests pass. Mobile viewport 390px has no horizontal overflow on the changed directory and guide hub; native section keyboard expansion, product link and guide link navigation verified in browser.

No new manual Search Console requests are claimed: the recorded daily quota was already exhausted. Sitemap discovery is not equivalent to a manual request or confirmed indexing. Observe Search Console clicks/impressions and actual referrals over subsequent weeks; do not interpret local audit scores as traffic growth.

Final Lighthouse mobile simulation: all four changed content pages score SEO 100, accessibility 100 and best practices 100; performance is recorded in phase-eight-audit.json. Single local runs are diagnostic, not field performance data.
