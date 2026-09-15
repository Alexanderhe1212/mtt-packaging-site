# V13 audit remediation — 2026-09-15

Scope: mobile catalogue, enquiry entry, contact launcher, mobile design workspace and static homepage navigation.

- Search and packaging families remain visible; advanced filters are collapsed. EN/ZH and all four families preserved.
- Same 354px viewport: first product moves from 1929.57px to 593.12px (69% less introductory scrolling).
- Contact opens only on request; mobile launcher reduced to 52px. It remains floating and can overlap a small part of imagery.
- Mobile uses an explicit full-screen studio link, avoiding the nested iframe scroll. Existing studio file and project storage unchanged. Desktop iframe retained. Standalone analytics events are not relayed through the parent iframe listener.
- Quote trust row compact; global MOQ is specification-dependent rather than a universal 500.
- Homepage native anchor replaces its sole next/link usage, removing static-export RSC prefetch console exception.

Validation: build and release checks pass (494 metadata pages, 434 product share previews, 44 discovery links, 31 guides). Existing catalogue browser suite EN/ZH 390/1440 and four galleries passes; axe reports no violations. Enquiry suite passes including failure/retry and mobile; no live enquiry sent.

Local Lighthouse: accessibility/best-practices/SEO 100; console errors absent. Local performance 70 versus earlier live 99 is not an equivalent-host comparison; check production after deployment. No field traffic or ranking claims. No manual Google indexing request is included.

Evidence: work/growth/audit-v13/ (baseline report, before/after screenshots, build/check logs, Lighthouse JSON).
