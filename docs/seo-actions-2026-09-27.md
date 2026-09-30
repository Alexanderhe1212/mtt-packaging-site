# Search evidence and publication — 2026-09-27

## Verified account evidence
- Google Search Console 28 days, 2026-08-28–2026-09-24: 49 clicks, 617 impressions, 7.9% CTR, average position 34.6. Query rows are not the complete click total (privacy/aggregation); do not infer all visits are irrelevant from the visible top rows.
- Visible queries: multifunction cosmetic packaging (26 impressions), christmas packaging checklist (21), molded pulp packaging for cosmetics gift sets (12), perfume carton overwrapper (11), wrist watch packaging market (9). Each shown row had zero clicks. Procurement intent varies; no keyword search-volume estimates made.
- Index report dated 2026-09-21: 174 indexed, 481 excluded. Discovered 356; crawled not indexed 31; alternate canonical 49; 404 29; redirects 10; duplicate without user canonical 4; noindex 1; soft404 1. This is a historical report, not a live crawl today.
- Redirect examples are HTTP/www versions. Do not undo canonical redirects to clear an exclusion report.
- First 10 of 29 404 examples include historic Vite virtual modules, TSX cache URLs and /quality-control/page, /case-studies/page. Current deployment archive contains zero matching development references. Other 19 examples not individually verified this run. No claim that all 404s are resolved.
- Bing recommendations: insufficient quality inbound links; homepage missing-alt warning (one URL, one occurrence). Live rendered homepage: 23 img elements, zero missing alt, zero empty alt. Warning not reproduced; no speculative markup change.
- Bing AI Performance 3 months through Sep26: 29 citations, shown on Sep18 (12), Sep21 (1), Sep22 (1), Sep24 (15). This is Bing's sampled Microsoft/partner report, not cross-platform visibility or enquiries.
- GA4 data not read this run: the open tab was property creation. No new property created and no conclusion drawn about actual enquiries.

## Changes
- New shared-box/multiple-cosmetic-SKU procurement guide with original planning diagram, decision table, configuration checklist and related-page links.
- Expanded established molded-pulp guide with acceptance record and revision control. Kept its URL to avoid a competing near-duplicate page.
- Static release gate now rejects historical development-path patterns in production HTML. Current release passes; this is prevention, not a claim that Google has refreshed old errors.
- Existing canonical, indexing, consent and enquiry handling retained.

## Content review
Applied claude-blog fact-check and SEO-check modules alongside the project pipeline.
- New article: editorial 91/100 (record in research JSON); no unsupported commercial, environmental or testing claims. ISTA procedure distinction verified at https://ista.org/test_procedures.php on Sep27.
- Molded-pulp additions: proposed acceptance controls, not claimed test outcomes. Editorial assessment 91/100: customer10, insight17, technical18, writing13, SEO9, GEO9, trust10, conversion5. No unresolved factual assertions; no universal tolerances supplied.
- Guest article: 589 words including title/summary/bio. Complementary inventory-control angle, no numerical savings or environmental advantage claimed. One descriptive backlink. Editorial assessment 90/100: customer10, insight17, technical17, writing13, SEO9, GEO9, trust10, conversion5. Scores are judgments, not traffic forecasts.
- Existing related content compared before drafting; no web-wide plagiarism claim. Generated-site checks verify metadata, H1, schema, routes, links and assets.

## Verification and publication boundary
- MTT_STATIC_EXPORT=1 npm run build: passed.
- npm run check:release: all 550 sitemap URLs, 41 articles, 480 product pages and existing consent/quote regression checks passed. No real inquiry submitted.
- Browser: new article desktop at1440 and mobile390; updated pulp page mobile390; no horizontal page overflow. Planning image loaded and visually inspected.
- Prior rollback revision: a62ae5e8f41d227db6ee429f48892649e8f61031.
- Deployment and IndexNow receipts recorded after push in the delivery folder.

## Backlinks
- Gmail check found CNS newsletter invitation, not editorial acceptance.
- Packaging Strategies already received three submissions Sep22–24 with no reply found; do not send another batch to the same editor now.
- Packaging Europe excludes AI-written articles; Packaging Digest excludes exclusively AI-written articles and requires contributor agreement. No generated manuscript sent as human-authored to either.
- Sustainable Packaging News official 2026 media pack lists content@spnews.com for editorial submissions. Offer only free editorial consideration; no advertising purchase or commitment. Publication and link attributes remain editor-controlled.
- A SENT receipt is not a published backlink. Record final page URL, anchor, href, rel, date and accessibility only after actual publication.

### Sustainable Packaging News — publication verified 2026-09-30
- Status: published editorial article with one MTT backlink verified in the publicly served article HTML; no login required for this check. This closes the publication-verification step for this placement.
- Final page URL: https://spnews.com/shared-gift-box/ (HTTP 200; final response URL and canonical both match).
- Article title: A Shared Gift Box Can Leave an Unshared Inventory Problem.
- Publication date: 2026-09-28. The page's `article:published_time` and `time[itemprop="datePublished"]` both report `2026-09-28T13:09:24.247702`; no timezone offset is supplied, so none is inferred.
- Verification date: 2026-09-30 (Asia/Shanghai). Method: unauthenticated HTTP GET of the public article, parsing the returned HTML and checking the actual MTT anchor, followed by an HTTP GET of its destination.
- Actual anchor text: `shared-box configuration checklist`.
- Actual href: `https://mttpackaging.com/insights/shared-box-multiple-cosmetic-skus` — the MTT shared-box/multiple-cosmetic-SKU guide, rather than the homepage.
- Link attributes: `target="_blank"`; `aria-label="Link opens in new window (shared-box configuration checklist)"`; `rel` is absent in the served HTML (no explicit `nofollow`, `sponsored` or `ugc` value). This records markup only; it does not prove search-engine treatment or ranking benefit.
- Accessibility: the article and linked MTT guide each returned HTTP 200 without login; the destination's final response URL matches the href, with no redirect observed. The anchor is present in server-returned HTML, has descriptive visible text, and its aria-label identifies the new-window behavior. This is a public-access/link check, not a full accessibility audit or proof of indexing.
- Source HTML for the backlink:

  ```html
  <a href="https://mttpackaging.com/insights/shared-box-multiple-cosmetic-skus" target="_blank" aria-label="Link opens in new window (shared-box configuration checklist)">shared-box configuration checklist</a>
  ```

- Editorial confirmation / LinkedIn: according to the user's supplied account of Dominy Jones's 2026-09-28 confirmation, the article was published and shared on their LinkedIn page. The public article and backlink are independently verified above; the LinkedIn post URL, post contents, reach and engagement were not independently verified in this check and are not counted as an additional verified MTT backlink.
- Performance boundary: no attributable referral traffic, enquiries, conversions, Google/Bing indexing, ranking uplift or link-equity effect has been verified. No GA4, GSC or LinkedIn analytics were read for this closeout. Published placement and live backlink are the confirmed results.
