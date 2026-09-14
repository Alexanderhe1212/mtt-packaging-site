# Phase 11 — Homepage image refresh

The homepage now uses 14 new original packaging illustrations generated with the built-in image tool. Each scene follows the copy beside it and has a distinct colour, material or opening structure.

## Image selection

- Hero: burgundy drawer perfume box, saffron tray and matching retail bag, card and ribbon.
- Packaging families: cobalt lift-off rigid box; lilac/lime folding cartons; orange corrugated mailer; red/blush paper bags.
- Industries: black fragrance discovery set; turquoise/pink skincare set; emerald watch case; magenta double-door gift set.
- Craftsmanship: copper foil on fuchsia wrap and blind embossing on ivory paper.
- Packaging details: yellow magnetic box, teal/terracotta tea drawer and peach fitted skincare interior.

## Review and corrections

Lids, hinges, drawer direction, insert cavities and material families were visually reviewed. Three first-pass issues were corrected before publication: a misplaced mailer tab, a lit candle inside gift packaging and a carton-style tongue on a magnetic rigid box. Responsive layouts retain the full composition of structure images. Macro finishing images intentionally show close details.

Images describe possible packaging directions; they are not a substitute for physical sample approval. Existing site disclosure remains in place. No customer name, testimonial or delivery claim was added.

## Implementation

- Versioned WebP assets in `public/design/home-v4/`, with responsive sizes and descriptive alt text.
- Homepage source and narrowly scoped image sizing updated; existing navigation, catalogue, tools and inquiry behavior retained.
- Three packaging detail images link to relevant existing technical studies.
- Original generation prompts and correction prompts are recorded in `phase-eleven-image-prompts.json`.

## Validation

Type check and production build passed. Release checks covered 494 sitemap pages, 434 product pages, thumbnail references, quote handling, analytics consent, IndexNow change detection and 31 guide pages. Homepage browser checks passed at 390px and 1440px: all 14 images load, no horizontal overflow, mobile menu works and no JavaScript page errors. The existing enquiry browser suite passed using mocked submissions; no real enquiry was sent.

Only the homepage canonical URL changed in the IndexNow comparison. Deployment submits that changed URL through the existing workflow; a successful receipt means the notification was received, not that indexing or ranking is guaranteed.

Homepage Lighthouse: performance 90/100, accessibility 100/100, best-practices 96/100, seo 100/100. One local mobile simulation; field results may differ.
