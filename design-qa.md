# MTT editorial release QA — 2026-09-10

final result: passed

Scope: visual redesign and image-to-copy mapping, with production restoration and static-site release checks. This is not an engineering certification of illustrated packaging or a test of external email delivery.

## Findings corrected
- P1: preview-only noindex and simulated enquiries must not ship. Production restores original Formspree handlers, consent-managed analytics and indexable metadata, removes preview label and subscription calling script.
- P2: portrait window image stretched the entire card row. Shared 3:2 slots now have equal dimensions; cards align at the top without full-height gray panels. At 1440px, measured all six slots at421×281 with no horizontal overflow.
- P2: industry hero image height followed intrinsic content. Explicit bounded height now avoids oversized rows, with 3:2 mobile presentation.
- P2: imagery did not correspond to materials, finishes and structures. Corrected24 customization items, six structure examples, four industries, capability images and article covers. New perfume rigid box/discovery set matches the actual premium rigid/discovery/insert copy.
- P2: article and industry templates retained old navigation and stray WhatsApp markup. They now use shared SiteNav/SiteFooter and the single Hugo contact entry.
- P2: static manifest reference404. Build preparation now emits manifest.webmanifest from its source route.

## Visual evidence
Initial selected homepage versus implementation: isolated preview qa/desktop-comparison.jpg (1440px rendered comparison).
Latest fragrance asset versus actual rendered crop: qa/fragrance-comparison.jpg. Inspected together: both show main hinged fragrance box, fitted bottle recess and three-vial discovery box. Normal Hugo launcher overlays lower corner as existing behavior.
Desktop customization: inspected at1440×1000; equal3:2 image slots and no overflow. Final narrow519px view: qa/addons-production-mobile.png and qa/fragrance-final-mobile.png. Prior390px finishing validation also passed. Some final desktop screenshot attempts were interrupted when Chrome became unavailable; no claim of exhaustive device testing.

## Functional checks
All four image tabs switch to six-card content in the production static build. Phone menu opens all six links. Empty RFQ submission stays on form with five invalid required controls; packaging type selects correctly. Packaging tool iframe points to the original standalone application. Tool HTML is byte-identical to the previously deployed ZIP. Source handlers restored; external enquiry delivery not exercised to avoid sending test customer messages.

## Release gates
MTT_STATIC_EXPORT=1 npm run build;45 prerendered routes. scripts/validate-static.py checks43 sitemap pages for unique H1, canonical equality, indexability, local links/assets and absence of preview marker; also verifies production handlers. git diff --check.

## Limitations
AI product/process images are illustrative; they are not client project evidence, factory photographs or CAD. Fold-flat illustration shows folding direction rather than validated manufacturing geometry. Existing article text, business claims and production quotations remain outside the visual change. Formal packaging engineering still requires physical sampling.
