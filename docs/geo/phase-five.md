# SEO + GEO phase five: product discovery to enquiry — 2026-09-14

## Scope
Continue phase four with crawlable product-to-buying-guide connections and a reliable enquiry handoff. No new article/URL, generated imagery, language-picker change or dependency. Homepage alternative remains preview-only. Rollback: 5983f37.

## Implemented
- All 217 designs / 434 English and Chinese detail pages link to the correct packaging-family buying guide and specification/sample process. Box pages also link to insert selection; paper bags are not described as rigid boxes. Chinese pages label the English guide destinations explicitly.
- One shared product-level accessory selection drives all three enquiry links. Previously the top and bottom links dropped selected accessories; this was reproduced in the browser before the fix.
- Chinese enquiries retain the Chinese design name plus stable product code.
- Clearing selected accessories in the quote form no longer removes the input, so the customer can replace the text.
- Calculator handoff storage is cleared only when the receiving service confirms an accepted enquiry containing the calculator summary. Offline/rejected submissions preserve data for retry; unrelated enquiries do not erase it.

## Validation
- TypeScript passed. One production build succeeded.
- 494 sitemap pages passed the existing static route/metadata/link gate. Existing phase-two and phase-four gates passed.
- `python3 scripts/check-phase-five.py`: 434 product pages have correct family guides, process links and three equal server-rendered enquiry destinations.
- `node scripts/check-quote-retry.mjs`: real QuoteForm handler tested with mocked network for acceptance, rejection, offline retry, invalid form, duplicate submission and unrelated-draft preservation. No live enquiry was sent.
- Browser: English two-accessory selection updated all three CTAs; removing one passed only the remaining accessory to the quote form. Clearing/replacing its text worked. Chinese product/accessory handoff passed. English desktop width 1280 and mobile width 390, Chinese product/quote width 390, no horizontal overflow. Device emulation cleared after check.

## SEO/GEO rationale and limits
Google's guidance supports accessible internal links, helpful visible content and good page experience for ordinary Search and its AI features: https://developers.google.com/search/docs/appearance/ai-features . These changes improve navigation and enquiry accuracy; they do not establish ranking, traffic or AI citation gains.

Product template dates were already 2026-09-14 from phase four, so dates remain accurate without churning unrelated URLs. Search Console daily quota was reached earlier today; no repeat attempts, workaround or new claim of manual submission. Existing indexing queue and daily automation remain in place. New products/articles were not created solely to increase URL count.
