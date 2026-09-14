# SEO + GEO next release — 2026-09-14

Follows phase two buyer content and phase three homepage visuals. Rollback: 0d3ff251080f79f4281ede61655935592b791e17. User's new homepage image remains preview-only.

## Changes
- Expand existing folding-carton, corrugated and paper-bag landing pages with closure/material selection, packed-product measurements, sample checkpoints, accessory planning and relevant guide/quote/tool links. No new duplicate articles or URLs.
- Correct two FAQ layouts to use the existing mobile-responsive buyer-faq class.
- Corrugated H1 explicitly names the packaging family and shipping use.
- Replace unsupported Product-rich-result markup on 217 designs (434 English/Chinese detail URLs) with WebPage and BreadcrumbList. These are specification-led enquiry pages with no verified public offer price, aggregate rating or review. Do not fabricate these to meet Google's Product snippet requirements. This intentionally relinquishes Product snippet eligibility; ordinary page indexing remains available. Page text, gallery, product code and enquiry links remain intact.
- Update sitemap modification dates for changed product templates and three buying guides. No daily date churn on unchanged articles.

## Validation
- TypeScript passed; one production build succeeded.
- All 494 sitemap pages passed route, H1, canonical, noindex and local-reference gate.
- Existing phase-two checks passed for 33 pages.
- New check-phase-four.py validated 434 product schemas/breadcrumbs/images/dates and three buyer guide link sets.
- Browser: corrugated page rendered and new guide content visible; 390px paper-bag page reported document width 390px, buyer columns collapsed to one 350px column. Desktop 1280px document had no horizontal overflow. Temporary device override cleared. No enquiry was sent.

## Indexing and measurement
Search Console accepted eight product URL requests earlier today and then returned daily Quota Exceeded. No retry/bypass in this release. Product snippet warnings in historical GSC reports will persist until Google recrawls. Next run should prioritize the three revised family pages and the makeup-artist-collection-stacked-drawers page flagged by GSC, using the local submission records to avoid duplicates. Do not manually request all 434 pages only for the shared template change. No claim of increased rankings, AI citations, traffic or leads.

## Primary references
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet

Google's ordinary SEO foundations apply to its AI features. Visible helpful answers and accessible internal links support discovery; no special AI schema or guaranteed citation is promised.
