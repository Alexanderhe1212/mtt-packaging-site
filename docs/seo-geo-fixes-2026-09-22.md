# SEO/GEO audit fixes — 2026-09-22

User authorized fixes and deployment after read-only audit. Guest article is intended for third-party DIELINE, not a new MTT URL; no article added to Insights. Existing untracked documents/output/scripts left untouched.

## Changes
- Quote form field rows now use responsive grid classes. Grid/fieldset/input minimum widths prevent clipping. Desktop layout retained.
- MOQ public copy, FAQ schema sources, metadata, llms generator, quote forms (EN/ZH), calculator choices and reusable customization/chat content now start at 1,000 pieces. Historical sub-1,000 calculator values map to an unselected field rather than increasing an order without approval.
- Case directory visibly says Packaging studies and design analysis; canonical /case-studies and all article URLs retained.
- Unchanged: robots policy, canonical strategy, noindex pages, sitemap routes, inquiry endpoint, consent and analytics handlers, product catalogue.

## Validation before deployment
- Static build succeeded. Complete release gate: 543 sitemap pages, 480 bilingual product routes, 34 guides; canonical/noindex/metadata/crawl path/schema checks pass.
- Quote acceptance/rejection/offline retry/duplicate prevention tested locally with mocked network: no real enquiry sent.
- CUA rendered form checks at 320, 390, 768 and 1440px: every visible field/button within viewport. Mobile form width342px at390px viewport (was600px). Menu paths unchanged.
- Lighthouse six-page local run: SEO/accessibility/best practices all100; performance home89, rigid94, quote97, tool82, catalogue91, exampleproduct96. These are lab results, not evidence of rankings or real-user traffic.
- Visible generated HTML scanned for old500piece/500–999 promises; none found.
- Rollback reference: rollback/pre-seo-geo-20260922 at bb193ce41ffc322dbdf1e320fef95c85822ba3af.

Editorial review of changed buyer copy:90/100 (problem10/10, originality16/20, technical usefulness17/20, clarity14/15, SEO10/10, GEO10/10, claim safety9/10, conversion4/5). This is a review judgment for limited existing-page corrections, not a search-performance score. MOQ is user-authorized policy; no new experience/price/test/certification claim.

Publishing uses existing GitHub Pages ZIP workflow, which includes change-filtered IndexNow submission. Successful submission must not be called indexed. Live verification and receipt will be recorded separately after deployment.
