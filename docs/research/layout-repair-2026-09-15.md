# Article layout repair — 2026-09-15

The article body used a broad descendant section selector with a 90px number column. Seven articles also rendered FAQ rows with a single child, so the answer and question occupied that column at desktop widths (45px at tablet widths). Mobile's one-column override masked the defect.

Numbered sections now opt into the number grid explicitly. Unnumbered FAQ rows use the available reading width, and the row styles target direct children only. Section spacing is reduced from 45px to 32px per side.

Validation:
- Production static build and complete release checks passed.
- All 32 articles passed body/FAQ content-width and overflow checks at 390, 768 and 1440px.
- Screenshots of the reported brief article reviewed at 390 and 1440px. Desktop FAQ content width is 1008px; mobile is 342px.
- Regression command: `npm run check:article-layout` against a local static server (default port 4223, configurable with MTT_TEST_ORIGIN).

The geometry regression check supplements the existing content/navigation checks, which did not previously detect narrow text columns.

Whole-site scanner: `node scripts/audit-layout.mjs`. It checks visible text column geometry and horizontal overflow in server-rendered HTML across the sitemap at three widths; images/scripts are disabled for this broad static pass. The article regression check runs with JavaScript enabled, and screenshots verify the reported page. Geometry heuristics are not a substitute for a manual review of every image or interaction.

Full sitemap scan covered 541 routes at 1440, 768 and 390px. Additional genuine findings were PPWR nested timeline grids, PPWR mobile card/FAQ columns, and packaging-index mobile FAQ columns. These now use scoped responsive classes; the PPWR narrative/timeline no longer inherits a three-column card grid. No prose or legal claims were changed.

Two initial overflow flags (rigid-box category and skincare guide) were transient measurements before fonts settled; JavaScript-enabled rechecks confirmed document width equals viewport width. The scanner now awaits fonts and excludes hidden text. All four flagged routes passed the final three-width recheck with zero findings. Screenshot review also covers the PPWR timeline at desktop/mobile sizes.
