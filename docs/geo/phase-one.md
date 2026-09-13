# MTT GEO — phase one, 2026-09-13

## Scope and baseline
First phase is the public technical foundation and company/capability consistency. No claim is made that Google has indexed every page or that any AI service cites MTT.

- Current catalogue: 217 designs, including 127 rigid boxes and 30 each of cartons, corrugated packaging and paper bags.
- Existing server-rendered product details, canonical URLs and sitemap are retained.
- Existing Organization identity is retained; one shared description now covers the four packaging families and inserts in About, footer and default metadata.
- About now explicitly includes corrugated packaging and practical purchasing answers with internal links.
- Chinese home metadata and visible links also include corrugated packaging and bags.
- No new AI-specific schema, paid service or dependency. Existing robots allows public crawling. Public HTTP checks cannot establish verified Googlebot/CDN access from every region.
- Run `python3 scripts/check-geo-foundation.py` for a dated public baseline and `python3 scripts/validate-static.py` after build for all sitemap routes.

## Identity and evidence ledger
Retain the established site positioning: MTT Packaging, custom packaging development and manufacturing partner in China; Hugo He; info@mttpackaging.com; +86 17207110964; English and Chinese contact.
Existing About states Shenzhen. This phase does not independently verify incorporation or premises and adds no new address.
Before making stronger claims, obtain owner evidence for legal company name, registration, factory ownership/partner arrangements, capacity, certificates and certificate scope, actual sample/order records, customer permissions and measured test results. Do not publish invented client names, deliveries, reviews, years of experience or performance improvements.
Catalogue images remain design illustrations; physical samples establish final fit and finish. Do not describe generated imagery as a photographed completed order.

## Phase two — 12 priority product pages
- MTT-R0101: Signature perfume — Lift-off lid — /products/signature-perfume-lift-off
- MTT-R0103: Skincare ritual — Magnetic book box — /products/skincare-ritual-book
- MTT-R0202: Coffee tasting flight — Drawer box — /products/coffee-tasting-flight-drawer
- MTT-R0303: Collagen routine set — Magnetic book box — /products/collagen-routine-set-book
- MTT-R0401: Engagement ring keepsake — Lift-off lid — /products/engagement-ring-keepsake-lift-off
- MTT-R0507: Festival sweets collection — Hexagonal lift-off box — /products/festival-sweets-collection-hexagonal
- MTT-C0104: Skincare duo — Crash-lock bottom carton — /products/custom-skincare-duo-auto-bottom
- MTT-C0112: Sealed macarons — Window tuck carton — /products/custom-sealed-macarons-window-tuck
- MTT-C0128: Festive confectionery — Pillow carton — /products/custom-festive-confectionery-pillow
- MTT-E0103: Perfume bottle — Roll-end mailer — /products/custom-perfume-bottle-mailer
- MTT-E0104: Skincare duo — Four-flap shipping carton — /products/custom-skincare-duo-rsc
- MTT-B0110: Reed diffuser — Twisted-paper handle bag — /products/custom-reed-diffuser-twisted-bag

For each: direct answer on intended use; selection reason; when another family is preferable; material/finish choices; required measurements; sampling checkpoints; relevant guide and product-prefilled enquiry. Review the actual record and images before writing. Preserve URL, avoid keyword repetition and unsupported fixed price/lead time.

## Six buyer questions — reuse existing URLs first
1. Perfume magnetic versus lift-off rigid box: improve `custom-box-structure-guide` and link the two matching products.
2. Rigid versus carton versus corrugated: expand `rigid-box-vs-folding-carton` to explain transport packaging separately; retain URL.
3. Paper, EVA and molded pulp inserts: improve `custom-inserts-product-protection`, link `molded-pulp-inserts-cosmetic-packaging`.
4. Quote inputs: improve `how-to-write-a-packaging-brief` with a reusable checklist.
5. Gloss/matte/foil/UV: improve `printing-finishing-guide` with matching product examples.
6. Complete box/bag/card/ribbon procurement: evaluate existing `packaging-design-to-production-china` before creating an additional page.

Format: answer first, comparison, applicability, limitations, evidence, relevant products, enquiry. Existing shipping-cost and volume-percentage claims in `reduce-shipping-costs-rigid-boxes` need source review before reuse. Do not present undated freight estimates as current prices.

## Measurement and next gates
- Preserve consent-controlled analytics. Existing events include whatsapp_click, gift_builder_entry, packaging_brief_click and quote_start; validate successful submissions separately.
- Record weekly GSC clicks/impressions and page indexing from actual account reports when available. Google AI-feature traffic is included in Web search reporting; do not label all Google traffic as GEO.
- Review GA4 session source/referrer for identifiable AI referrals; attribution is incomplete when referrers are stripped. WhatsApp clicks are not confirmed enquiries.
- Keep a fixed set of buyer prompts for optional manual AI citation checks: record platform, date, prompt and cited URLs. Do not equate a one-off answer with stable ranking.
- Sitemap inclusion is a discovery mechanism, not a submitted URL Inspection request or indexing guarantee.
- Completed validation: type check and language route regression passed; 494 sitemap pages passed the static route gate; 10 public URLs returned successfully without noindex. About content and footer were inspected in the in-app browser at its actual 462px viewport, with no document-width overflow. A requested 390px override returned a 140px viewport, so it was reset and is not counted as a valid device-size test. Dedicated desktop/device checks remain a limitation. Deployment and live content verification follow this build.

Reference: https://developers.google.com/search/docs/appearance/ai-features (checked 2026-09-13).
