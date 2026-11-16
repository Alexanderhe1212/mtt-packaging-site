# MTT website audit and remediation — 16 November 2026

Production baseline: e2e3062f26eb5bf7d08acb0d3c7d02a0aa42b75b. Scope: isolated source snapshot, static site validation, dependency and lint checks, selected external live responses and selected product/guide journeys. Preserve the 1,000-piece minimum and existing URLs.

## Sequenced workflow

1. Establish production revision, existing work and search-console access.
2. Inspect crawlability, sitemap/canonical, broken paths, buyer journeys, representative content and enquiry handling. Distinguish sampled checks from complete coverage.
3. Repair verified blockers and buyer-facing gaps in small batches; avoid unsupported claims or unnecessary URL changes.
4. Run build, release, type, lint and relevant browser tests; inspect the changes.
5. Deploy only passing changes, verify production revision and affected URLs. Track Google submission and indexing separately.

## Findings and changes

- Product detail template lacked a clear MOQ near the enquiry button, including the Chinese versions. Added 1,000 pieces per design beside the button in both languages; the existing quote requirements are unchanged.
- Product catalogue audit: 65 of 240 product codes had individually authored buying-guide entries after the first batch; 175 did not at that point (103 rigid, 26 corrugated, 24 bag, 22 carton). This counts data entries, not a verdict on every page. Prioritise individual additions using current search and enquiry evidence, accurate images and the editorial gate; do not generate generic entries in bulk.
- MTT-R0105 lacked the product-specific buying guide component and a direct link to the matching face-cream jar shoulder-neck fit guide. Added EN/ZH selection and sampling guidance, and an English guide link. No measurements or test results are represented as confirmed. Buyer problem, structure comparison and practical sample checks are explicit; editorial assessment 88/100, no unresolved factual claims.
- MTT-B0103 had a general bag-size guide but no contextual link to the newer perfume gift-bag load and handle guide. Added a direct, descriptive EN/ZH link and a reminder to test with the loaded set. Editorial assessment 87/100, no unsupported performance claims.
- Recent automated baseline: 611 sitemap routes reachable through rendered links, 98 guide structural checks, 16 consent and attribution scenarios, product schema/social checks. These do not establish individual content factual accuracy or successful delivery of real enquiries.
- External GEO Tool Check on 16 November: homepage, R0105 and the new fit guide returned HTTP 200, readable HTML and self-referencing canonical. robots.txt was reported as allowing selected AI crawlers. Third-party heuristic scores and suggestions are not verified rankings, citations or proof of indexing. Earlier Google live inspection returned a Next error page and Soft 404 for the guide; a later generic fetch alone did not establish what Google receives or explain the earlier result. On 17 November, Search Console live reinspection reported the page available and eligible for indexing; the earlier error root cause remains unknown. Google rejected a renewed request because the daily quota was exceeded. The page was not indexed at inspection.
- Dependency audit: 3 moderate affected packages in the satori / @vercel/og / vinext dependency chain; no high/critical findings. Earlier direct @vercel/og trial failed image generation, so a forced major upgrade is not a verified fix. Investigate compatibility separately.
- Lint baseline: 72 warnings, no errors; most are framework image hints or effect warnings. They are not automatically runtime defects and are not silently suppressed.
- The homepage, enquiry and thank-you pages state a 24-hour response commitment. This audit did not verify actual staffing or response-time records; confirm the commitment before changing it or treating it as measured performance.
- Search Console was initially unavailable and later reconnected; see the dated search evidence and indexing follow-up below. Real form-delivery/inbox evidence and real-user Core Web Vitals were not established here. No real enquiry or external outreach was sent.

Record test, release and post-deployment results separately; inclusion in Google and actual enquiries remain separate outcomes.

## Local verification for this change

Full static build, release checks, TypeScript and lint completed; lint reports 0 errors and 72 existing warnings. A separate scan checked same-origin anchor destinations on all 611 sitemap pages and found no missing static target. Targeted EN/ZH output checks found both contextual links and the 1,000-piece notice. The catalogue browser suite passed at 390 and 1440 pixels, including filtering, product galleries, quote links and accessibility checks. The enquiry suite passed mocked accepted/rejected/retry cases and 390/1280 layouts; no live enquiry was sent. The optional lychee link checker was unavailable; the independent static scan above was used instead.

## Keyboard focus remediation

The English enquiry form removed focus outlines from nine controls. Browser inspection reproduced a focused name input with no outline or shadow. Removed the inline suppression so the existing site focus style applies. A regression check covers all nine controls and separates its focus events from later analytics assertions.

## Search-led skincare path — 17 November

Google Search Console, domain property, Web, complete 28 days 18 October–14 November: the query “biotech skincare gift kit packaging” showed 129 impressions, 0 clicks and average position 25.4; the reported page was /industries/cosmetics-skincare-packaging. This is a small query sample, not evidence of demand for a specific material or claim that MTT handles biotech products. Bing Webmaster Tools reports 456 impressions and 8 clicks for 16 August–15 November across all selected verticals, of which its box-size calculator page has 219 impressions and 4 clicks. These are separate platforms and periods.

Added a contextual path from the cosmetics industry page to the single-jar shoulder-neck product and its fit checklist, explaining how the single-jar decision differs from a mixed skincare set. Based on the illustrated product and the fit article; no new technical tolerances, certification, material claims or customer history. Editorial assessment 88/100: customer decision 9, distinct value 17, technical usefulness 18, writing 13, SEO 9, GEO 8, trust 10, conversion 4. Preserve 1,000-piece MOQ and test the linked pages and enquiry path.

## Indexed-product buyer guidance — 17 November

Google Search Console URL Inspection showed /zh/products/lip-colour-wardrobe-drawer and /zh/products/custom-festive-confectionery-ribbon-bag indexed even though the older 13 November aggregate report lists them as crawled but not indexed. Do not interpret the stale category as a current defect or submit redundant requests. Both product codes lacked individual buying guidance.

Added bilingual guidance to MTT-R0112 around five-tube support, removal, loaded drawer travel and shipping review. Cross-checked the existing illustrated product and its lipstick drawer guide. Editorial score 88/100 (problem 9, original value 17, technical 18, writing 13, SEO 9, GEO 8, trust 10, conversion 4). Added bilingual MTT-B0128 guidance around packaged contents, gusset fit, loaded handles and food-contact boundaries, referencing the existing paper-bag size and load guide. Editorial score 87/100 (9, 17, 18, 13, 8, 8, 10, 4). Visuals are identified as design references; no certifications, measured results or customer orders are asserted. The established 1,000-piece minimum remains unchanged.
