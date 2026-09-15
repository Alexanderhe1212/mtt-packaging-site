# Version 12 — clearer packaging selection and repeatable usability checks

2026-09-15. Starting revision: f89f386760e3cd1fbe3044390652e8691349791d (rollback reference).

## Executed plan
1. Inspect current source, earlier maintenance records and live-equivalent static output.
2. Research GitHub tools, reuse available axe-core, Puppeteer and Lychee.
3. Correct a concrete commercial-information conflict; add a compact four-family buying comparison and fix catalogue reset.
4. Validate static discovery, accessibility, mobile interactions and enquiry handoff; package and publish using the existing deployment.

## Findings and changes
The folding-carton search and Open Graph descriptions said 500 pieces while the page introduction said 1,000 and its existing FAQ said typical projects start from 1,000–3,000. The description and introduction now follow that existing FAQ range and explicitly require confirmation for the specification. This does not create a guaranteed minimum or a new supplier price.

The product directory now has a native, collapsed comparison of rigid board gift boxes, folding paperboard cartons, corrugated shipping packaging and paper bags. Each compares material construction, opening, typical use and physical-sample priorities, linking to its existing family guide. English and Chinese versions expose the same information in their initial HTML, without adding indexed filter pages. The language switcher remains disabled. The comparison distinguishes lift-off lids, magnetic hinges, drawers, carton tabs and corrugated locking wings; it does not infer certified performance from material names.

Clear filters previously reselected rigid boxes. It now clears all active filters and shows every family. Default entry still shows rigid packaging. Existing product URLs, images, artwork editor, consent controls and enquiry transport remain unchanged.

The release date check previously required an exact old date, rejecting valid later edits. It now allows dates from the prior revision through today. Only the three actually updated content pages have their sitemap modification date advanced.

## GitHub tools and rationale
- [axe-core](https://github.com/dequelabs/axe-core), existing version 4.13.0, MPL-2.0: browser accessibility diagnostics. Runs locally and is not shipped to customers. Some contrast checks require human review; a clean automated result is not a full accessibility certification.
- [Puppeteer](https://github.com/puppeteer/puppeteer): real Chrome interaction checks, using the existing dependency.
- [Lychee](https://github.com/lycheeverse/lychee), existing verified 0.24.2: local files and anchor links. External destinations are excluded from this audit.

No paid subscription, browser extension permissions or new runtime dependency is required. Google's [crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) supports ordinary anchors with meaningful destinations. The comparison is buyer information, not a special AI ranking technique. No ranking, citation or enquiry uplift is asserted.

## Validation and reuse
Run the normal static build, npm run check:release, npm run audit:catalogue, npm run audit:enquiry, and LYCHEE_BIN=work/lychee/lychee npm run audit:links against the local export. TypeScript and diff whitespace checks pass.

494 sitemap pages, 434 product metadata sets, 44 discovery links and visible FAQ parity passed. The new comparison exists in English/Chinese static HTML. Browser tests at 390 and 1440 pixels verify expansion, four-family filtering, zero results and reset. Five gallery views and family-aware quote links pass for one product from each family. Axe reported no violations in the eight tested states; several image/overlay contrast checks remain automated-inconclusive. This is sampled interaction testing, not visual certification of every product photograph. Local quote tests validate four-family prefill, stale-data isolation and simulated failure/retry without sending a live enquiry.

IndexNow preview identifies three substantive changes: /products, /zh/products and /packaging/folding-cartons. The existing workflow submits them only after the production revision is verified. An accepted notification is not confirmation of indexing. Google manual requests and traffic changes are not claimed in this release.
