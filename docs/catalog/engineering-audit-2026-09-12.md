# Product-image engineering review — 2026-09-12

Scope: all 120 published rigid-box products, five source views per product (600 views), reviewed in numbered four-product proof sheets. This is a visual consistency review, not a physical engineering approval.

## Corrections
- MTT-R0112: open insert had four recesses while interior/specification had five; open view corrected to five.
- MTT-R0208: open drawer channel count did not match six-channel interior; corrected and drawer-front border retained.
- MTT-R0308: closed upper drawer lacked a ribbon pull; restored. Drawer-front pinstripes now remain visible when opened.
- MTT-R0512: foliage appeared on the closed cream drawer front but disappeared when open; cream front made consistent.
- Image slicing: some generated grids have unequal row heights. Expanded separator detection beyond the former narrow midpoint window; regenerate all 600 deliverable views. Crop coordinates recorded in crop-audit.json.
- Design-to-production article: detached lid made visually separate, pen removal recesses added. Added opening-specific and removal/size review guidance.
- English/Chinese product detail pages: added specific checks for nine structures, insert access and relevant contents/contact considerations.

## Limits
Generated imagery cannot prove closing clearance, tolerances, actual board thickness, load capacity or food-contact suitability. Artwork registration and material colour remain subject to sample approval. Images are approximately 500 pixels per view; they are not high-resolution production drawings. No claim that all products are manufactured client cases is added.

## Validation results
- TypeScript, release catalogue validation and language route checks passed.
- All 600 derived WebPs decoded; no interior full-width white grid separators detected.
- Static validation: 297 sitemap pages, zero errors.
- Desktop open-view switching verified on R0308; Chinese open-view switching verified on R0112 at 390px, document width 390px (no horizontal overflow).
