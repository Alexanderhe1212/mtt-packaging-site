# Phase ten — buying guides connected to product decisions

2026-09-14. Builds on phase nine (3ffa583). No traffic, ranking, lead or AI citation improvement is asserted.

## Problem and scope

The shared insight template selected the first three articles in catalogue order (with an editorial-update filter), rather than related buying decisions. Readers of long guides also lacked a section directory and a consistent path to relevant product specifications.

## Changes

- All 31 existing guides receive an at-a-glance summary reused from their existing metadata and a native expandable section directory. Section anchors and the keyboard skip target are present in static HTML.
- Curated topic groups replace catalogue-order recommendations. Focused wine, Christmas, jewellery, tea and skincare articles receive specific product selections. Every guide offers three existing designs with the actual family, opening and paper data, linking to the full five-view product page and its existing enquiry flow. These are comparison options, not an assertion of tested product suitability.
- Added a direct enquiry option for buyers who have not selected a design. Existing URLs, article text, publication dates, product data, tool, language settings and contact mechanisms are retained.
- Corrected a low-contrast line in the shared article contact panel. Mobile article sections use full-width text rather than losing space to a number column.
- Added rendered checks to the release gate for every guide's unique anchors, three distinct related articles, three real product routes and quote link.

## Approach and sources

Google's https://developers.google.com/search/docs/appearance/ai-features recommends useful text, crawlable internal links and ordinary search fundamentals. It does not require a special AI schema or guarantee indexing/citations. This phase improves those paths using existing data rather than manufacturing customer results or new keyword-only pages.

Existing Puppeteer (https://github.com/puppeteer/puppeteer) and Lighthouse (https://github.com/GoogleChrome/lighthouse) are reused for browser and mobile-simulation checks. No new dependency, backend or paid service is introduced.

## Verification

Run the normal static build, `npm run check:release`, the discovery graph audit, and the local browser guide check. Browser tests reject non-essential cookies before exercising page links; otherwise the fixed consent banner can cover the test's click location. Consent itself remains available and unchanged. No live enquiry is sent.

Report results are recorded in phase-ten-audit.json. The two-page Lighthouse sample is a local mobile simulation, not field traffic evidence. The existing deployment action sends changed canonical URLs to IndexNow only after the deployed revision is verified. A receipt is not confirmation of indexing; no new Google manual indexing request is claimed.

## Measurement

Observe Search Console/Bing impressions and clicks for existing guide URLs over subsequent weeks, then consented enquiry events and actual qualified enquiries. Changes in those metrics require real measurements; link improvements and audit scores do not prove growth.
