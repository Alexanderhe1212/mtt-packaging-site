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
- Product catalogue audit: 65 of 240 product codes have individually authored buying-guide entries after this change; 175 do not (103 rigid, 26 corrugated, 24 bag, 22 carton). This counts data entries, not a verdict on every page. Prioritise individual additions using current search and enquiry evidence, accurate images and the editorial gate; do not generate generic entries in bulk.
- MTT-R0105 lacked the product-specific buying guide component and a direct link to the matching face-cream jar shoulder-neck fit guide. Added EN/ZH selection and sampling guidance, and an English guide link. No measurements or test results are represented as confirmed. Buyer problem, structure comparison and practical sample checks are explicit; editorial assessment 88/100, no unresolved factual claims.
- MTT-B0103 had a general bag-size guide but no contextual link to the newer perfume gift-bag load and handle guide. Added a direct, descriptive EN/ZH link and a reminder to test with the loaded set. Editorial assessment 87/100, no unsupported performance claims.
- Recent automated baseline: 611 sitemap routes reachable through rendered links, 98 guide structural checks, 16 consent and attribution scenarios, product schema/social checks. These do not establish individual content factual accuracy or successful delivery of real enquiries.
- External GEO Tool Check on 16 November: homepage, R0105 and the new fit guide returned HTTP 200, readable HTML and self-referencing canonical. robots.txt was reported as allowing selected AI crawlers. Third-party heuristic scores and suggestions are not verified rankings, citations or proof of indexing. Earlier Google live inspection returned a Next error page and Soft 404 for the guide; a later generic fetch does not establish what Google currently receives or explain the earlier result. Search Console live reinspection remains necessary.
- Dependency audit: 3 moderate affected packages in the satori / @vercel/og / vinext dependency chain; no high/critical findings. Earlier direct @vercel/og trial failed image generation, so a forced major upgrade is not a verified fix. Investigate compatibility separately.
- Lint baseline: 72 warnings, no errors; most are framework image hints or effect warnings. They are not automatically runtime defects and are not silently suppressed.
- Search Console UI failed to open in this audit; current page/query data and Google live indexing status could not be retrieved. Real form-delivery/inbox evidence and real-user Core Web Vitals were not established here. No real enquiry or external outreach was sent.

Record test, release and post-deployment results separately; inclusion in Google and actual enquiries remain separate outcomes.

## Local verification for this change

Full static build, release checks, TypeScript and lint completed; lint reports 0 errors and 72 existing warnings. A separate scan checked same-origin anchor destinations on all 611 sitemap pages and found no missing static target. Targeted EN/ZH output checks found both contextual links and the 1,000-piece notice. The catalogue browser suite passed at 390 and 1440 pixels, including filtering, product galleries, quote links and accessibility checks. The enquiry suite passed mocked accepted/rejected/retry cases and 390/1280 layouts; no live enquiry was sent. The optional lychee link checker was unavailable; the independent static scan above was used instead.
