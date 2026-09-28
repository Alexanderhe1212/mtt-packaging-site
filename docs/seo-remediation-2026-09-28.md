# Wanxiaozhi report remediation — 2026-09-28

Skills: seo-audit 2.0.1 and schema 2.0.0. Scope: supplied homepage report and screenshots; no unrelated site redesign or hosting migration.

## Findings and disposition

- Thin content / 28 words: not reproduced. Live homepage raw HTML contained 940 English word tokens in main, excluding scripts, styles, navigation, footer and form. Report also says SSR coverage 100%, 27 subheadings and excellent content. Its extraction method is unavailable; treat the 28-word result as a measurement discrepancy, not a reason to stuff copy. This count is not an indexing claim.
- Multimedia: already 23 images and a family comparison table. Added a second, accessible material-specification comparison table and a material-selection guide link. No irrelevant audio/video added just to satisfy a format count. Existing consultant video remains in the contact widget; it is not manufacturing footage.
- Material guidance: distinguishes GSM and caliper and gives component-specific sample checks for rigid cores, folding cartons, wraps and corrugated packs. No universal GSM-to-thickness conversion, stock-grade availability or test outcomes asserted.
- Experience / case links: homepage already links three packaging studies. These are design references, not verified customer outcomes. No invented project metrics added.
- Structured data: added a WebPage entity connected to existing WebSite, Organization and packaging-family ItemList. Live samples /packaging/folding-cartons and /products/perfume-discovery-library-double-door already have BreadcrumbList. No artificial homepage breadcrumb or AggregateRating; homepage is not an individual purchasable product. Existing schema retained. Local JSON parsing/entity presence checked; no Google rich-result eligibility claim.
- Security headers: live response is GitHub.com and lacks the five reported custom security headers. Existing meta CSP (object-src/base-uri/upgrade) and meta referrer remain. These do not replace HSTS, X-Frame-Options or server-side headers. Retain user's accepted free GitHub Pages limitation; no paid service, DNS change or fake _headers fix.
- All passed report categories retained. No assertion that an unchanged historic report will automatically clear.

## Content review

Buyer: international packaging purchaser deciding what to put in a material brief. Intent: compare GSM, thickness and converted-sample acceptance. Primary destination remains homepage with a contextual link to the existing material guide, avoiding a competing article.

Source checked: https://www.iggesund.com/insights/paperboard-know-how/general-technical-information/ and Holmen technical documentation at https://www.holmen.com/globalassets/board-and-paper/products/general-technical-information.pdf. These distinguish grammage and thickness by grade. The sample checks are conditional engineering guidance, not claimed experience or results. Structured-data policy: https://developers.google.com/search/docs/appearance/structured-data/sd-policies.

Editorial assessment: customer problem 9/10, insight 17/20, technical usefulness 18/20, human writing 14/15, SEO 9/10, GEO 9/10, trust 10/10, conversion 4/5 = 90/100. Evidence: component distinctions, comparison table, supplier-data request, closure/fit tradeoff and sample decision. No unresolved claim issues. This is editorial judgment, not a ranking prediction.

## Validation

- MTT_STATIC_EXPORT=1 npm run build passed.
- npm run check:release passed including all 550 sitemap routes, 41 article records, 480 product references and consent/quote regression checks. No real inquiry submitted.
- Local browser at 390 and 1440 pixels: no page horizontal overflow, two semantic tables, valid WebPage JSON-LD. Screenshots inspected; table region uses existing keyboard-focusable horizontal scrolling on small screens.
- Production deployment follows existing ZIP-based GitHub Pages workflow. Baseline rollback commit: c7cd56f9ee1d01d74de6994189cca5bd017db85a.
