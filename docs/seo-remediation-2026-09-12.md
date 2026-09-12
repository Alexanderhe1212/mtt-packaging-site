# SEO remediation — 12 September 2026

Used GoogleChrome Lighthouse CI 0.15.1. Reports are under qa/seo-20260912.
43 sitemap pages passed the existing static release gate: routes, canonical, no accidental noindex, one H1 and local references.

## Changes
- Correct text/background contrast in editorial craft, process, trust, quotation and product sections.
- Responsive WebP images for homepage and rigid-box hero; priority hint for rigid-box hero.
- Hide redundant brand mark from screen readers where adjacent text already names the brand.
- Box thumbnails now render when approaching the viewport, and encode as WebP. All 12 structures remain available; scrolling to the bag and choosing a drawer were checked in the browser. The 18 existing tool tests passed.
- Lighthouse CI is configured and ran locally against the deployment output. A proposed push-triggered workflow is saved in docs/seo-check.workflow.yml, but NOT enabled: the existing GitHub credential lacks workflow scope and GitHub rejected that push. SEO below 95 fails audit; performance/accessibility are warnings. No paid service or server added.

## Validation limits
Before measurements used production HTTPS; after measurements used local static hosting. Performance differences include network differences and are not a controlled traffic/ranking experiment. Four tested pages have SEO/accessibility 100. Tool performance remains below the 80 warning threshold because WebGL initialization is expensive. No private Search Console/GA4 data was accessed. Scores do not establish Google indexing, rankings or traffic improvement.

## Source/build
Website source is this repository. Tool source: ../mtt-tool-dimensions/app/components/BoxThumbnail.tsx; build with scripts/build-gift-public.mjs in that project. Website static build: MTT_STATIC_EXPORT=1 npm run build. Deploy package generated from dist/client. URLs, canonical strategy, inquiry handlers and consent controls retained.
