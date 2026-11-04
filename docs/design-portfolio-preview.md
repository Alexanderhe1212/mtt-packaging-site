# MTT portfolio preview — 2026-11-04

Status: local preview only; user approval required before production deployment.
Base: d6f7f1ec3e67f1cda4996c677f91617ded7e15bd. Branch: design/portfolio-preview-20261104.

Implement two visual directions on the real homepage and English catalogue: A warm-white orange-red studio, B blue/orange gallery. Preserve URLs, metadata, structured data, commercial facts, existing inquiry form and analytics. Compact catalogue uses existing filter state logic. Important navigation retained in Explore and footer. No live form submissions in QA.

Use existing MTT assets plus two original hero concepts; no third-party packaging images reused. Each major image slot uses a distinct visual. Both supplied references informed the preview: Studio uses the editorial italic headline and orange/lilac palette; Gallery uses the split layout and blue/orange packaging.

Acceptance: desktop first product row within viewport, mobile/desktop no overflow, all catalogue filters retained, product inquiry context retained, native validation and blocked-network form QA, keyboard menus, reduced motion, responsive images, build/types/release checks. Screenshots at 1440 and 390 pixels. Preview variant switch is review-only and must be removed before merging.

Existing facts retained for review: MOQ 1,000 per design; typical 20–35 day production after approval; reply within 24 hours. Product pages say commercial terms are project-specific. Do not silently change these claims.

Verification: static build and TypeScript passed; catalogue EN/ZH browser regression passed, including filters, no-results/reset, product inquiry context and axe. Homepage axe and empty-form validation passed in both directions at 390/1440. Capture checks found no horizontal overflow or broken loaded images. Desktop product images begin around 609px. No live inquiry submitted. Metadata compared unchanged for homepage and catalogue. Scoped ESLint: zero errors, seven native-img advisory warnings; assets use existing static-export pipeline and WebP. Full release checks retained.

Preview: http://127.0.0.1:4310/?direction=studio and ?direction=gallery. This is local to this Mac, not a public deployment. Remove preview switch/query handling before an approved production release.

## Combined direction — user refinement
The default preview now combines Gallery's split hero with Studio's bold/serif-italic typography. The blue/orange hero is loaded directly in initial HTML. Desktop selected work has staggered spacing; mobile work uses large single-column images. Mobile preview controls are smaller and positioned away from the contact widget. Original A/B directions remain available for comparison.

Verified combined homepage at 360, 390, 768 and 1440px: no horizontal overflow, axe zero violations, product menu present, empty enquiry form rejected without submitting. Desktop/mobile captures at 1440/390px; catalogue first images begin at approximately 608px desktop and 624px mobile. Build, types and release checks passed. Production remains unchanged.

## Atelier direction — replacement after visual feedback
New original oxblood/ivory packaging concept, independent removable lid and paper insert. Large staggered headline above a full-width image replaces the rejected split layout. Burgundy craft section and staggered selected-work arrangement. Mobile shows the full image with CTA below. Existing directions remain accessible; Atelier is the default. No production publish.
Validated build, types, release checks and homepage axe/overflow at 360/390/768/1440. Native empty-form validation checked with external and POST requests blocked. Original hero source preserved in generated_images; WebP assets are 183KB desktop and 36KB mobile.

## Colour Study implementation — 2026-11-04
User selected C then requested implementation. New independent raster assets: hero, rigid box, drawer, paper bag, material macro and worktable; generated concept provenance, no customer/production claims. HTML text and working controls remain semantic. Approved colour palette applies through the enquiry section and footer. Figtree self-hosted, OFL included.
Compact catalogue now has semantic order matching visual order, a single visible application selector in Refine, corrected compact image sizes and concept disclosure above the grid. No floating preview switch; chosen visual direction is stable across navigation. Chinese catalogue retains its application buttons; regression test updated to exercise the visible English select.
Evidence files: /tmp/mtt-colour-{build,types,release,qa,catalogue,lint}.log. Review-only local URL http://127.0.0.1:4310/. Production not deployed.

## Production approval — 2026-11-04
User approved the just-completed Colour Study preview for production in the latest message. Release still requires fresh build, functionality, accessibility and deployment verification. Previous preview-only notes above are historical. Rollback base: d6f7f1ec3e67f1cda4996c677f91617ded7e15bd. Preserve main working-tree changes.
