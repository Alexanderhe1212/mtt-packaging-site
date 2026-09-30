# Indexing phase two — 2026-09-30

## Evidence and scope

Applied seo-audit 2.0.1 and the repository content-quality pipeline. GSC live UI: 28-day performance August 31–September 27, 579 impressions, 32 clicks, CTR 5.5%, position 34.1. This predates the September 29 release and cannot measure its effect. Aggregate indexing remains dated September 21 (174 indexed, 481 excluded); it is not a current URL-by-URL verdict.

Individual URL Inspection on September 30:
- `/products/anniversary-ring-pair-lift-off`: not indexed, URL unknown to Google, no crawl or detected referring sitemap/page. This differs from its presence in the older discovered report.
- `/products/boutique-accessory-gift-shoulder`: discovered, currently not indexed; both sitemaps detected, no crawl recorded.

The free advertools 0.16.6 crawler checked both products, the previously indexed statement-cuff control, and both industry hubs. All five returned 200 and self-canonical. Extracted main-text counts: ring 659, accessory 638, control 659, jewelry hub 786, gift hub 805. These include shared template text and do not measure unique editorial value. No demonstrated word-count threshold or technical blocking cause was found. The causal explanation for Google's selection remains unknown.

Raw crawl: `output/index-phase2-20260930/before.jl`. Runner now accepts a focused `--paths` sample without replacing yesterday's defaults.

## Buyer problems and changes

Two products, EN/ZH variants (four URLs), plus two industry pages. Preserve URLs and existing illustrative images.
- Double ring box: pair spacing, independent removal, band/setting dimensions, taller-stone clearance, separate versus attached lid, representative lining and finish review. Primary intent: custom double ring gift box. Distinct from a single-ring keepsake box.
- Accessory shoulder box: neck/rim versus finger access, padded-recess tradeoff, clasp/projecting-edge review, actual paper/gloss approval, shipping pack boundary. Primary intent: custom accessory shoulder box.
- Add descriptive contextual links from the jewelry and gifting industry pages. Both product guides link to relevant existing decision guides. Metadata describes the actual format; EN/ZH sitemap dates reflect the change.

No invented orders, certifications, material tolerances, customer ratings or traffic predictions. All practical checks are project-dependent guidance, not completed MTT test claims. Search volume is not known; selection is based on the observed indexing gap and relevance to existing packaging offerings.

## Sources and editorial gate

- Google link guidance: https://developers.google.com/search/docs/crawling-indexing/links-crawlable — descriptive, crawlable contextual links. This supports discoverability work, not guaranteed indexing.
- GIA jewelry care: https://www.gia.edu/gia-news-research-tips-caring-jewelry — background for careful separation/storage; no claim that the illustrated lining is certified or anti-tarnish.
- Actual structure, insert and finish attributes come from existing product records. Copy adds decision tradeoffs, sampling checks and RFQ inputs.

Editorial assessment for both additions: problem 9/10, insight 17/20, usefulness 18/20, writing 14/15, SEO 9/10, GEO 9/10, trust 10/10, conversion 5/5 = 91/100. Subjective publication gate, not search performance score. No unresolved factual claims.

## Validation

Static build and release checks passed (554 sitemap pages). Mobile ring page at 390px and desktop accessory page at 1440px: no horizontal overflow or broken loaded images; existing five-view galleries preserved. Production deployment and request receipts recorded separately after verification.

## Production and submission outcome

Deployment commit `de55ff9069df1b042b3a705c08e07db887cf804d`, GitHub Actions run `36739017113` completed successfully. Production revision matched. Post-deployment advertools crawl verified all six changed URLs return 200, self-canonical and contain the new copy/links. Workflow IndexNow notification and receipt steps succeeded.

Google manual requests for both English product URLs returned: “There was a problem submitting your indexing request. Please try again later.” No accepted request receipt; these two Google requests remain outstanding. No CAPTCHA was solved, no indexing success is claimed. On the second ring URL inspection Google showed discovered/not indexed with both sitemaps, rather than the earlier unknown response; no crawl was recorded. This response variability is not proof of an update-induced change.

Evidence: `output/index-phase2-20260930/after.jl`, `google-request-error.png`, `live-ring.png` (Chrome translated the page automatically; authored EN/ZH content verified separately).
