# Release validation — 2026-10-09

Scope: existing packaging-family comparison guide, shared guide navigation and article layout. Homepage, Insights hub, About cards and quote form were sampled in the browser; this is not a claim of visually reviewing every page.

- `MTT_STATIC_EXPORT=1 npm run build`: passed.
- `npm run check:release`: passed. 560 sitemap pages; 480 products; 51 guide navigation paths; all 560 pages reachable by rendered internal links.
- Quote failure/retry/validation/deduplication and analytics consent checks passed with simulated network behavior; no real inquiry was submitted and GA4 lead reconciliation was not undertaken.
- Browser checks at 375 and 768 CSS pixels on the revised article: no document overflow; wide tables scroll inside their own regions and respond to keyboard input. Desktop article checked at 1280 px, homepage navigation at 1536 px. About and quote also sampled on mobile.
- No broken loaded images or missing alt attributes observed. The nine About capability/industry cards already had appropriate images and destination links.
- Article console errors after final local check: none observed.
- Visible breadcrumbs and matching Article/Organization/BreadcrumbList/FAQPage JSON-LD; no invented credentials, test results or customer outcomes.
- Independent content review: 92/100; repository editorial rubric: 93/100; no P0 factual/claim blocker.
- Page-speed field measurements and search-engine indexing are not established by these local checks. Deployment and submission results are recorded separately after release.

Local visual evidence: sibling `mtt-daily-qa-20261009/screenshots/12-article-final-desktop.png` and `13-calculation-final-desktop.png`, plus mobile and homepage screenshots in the same directory.
