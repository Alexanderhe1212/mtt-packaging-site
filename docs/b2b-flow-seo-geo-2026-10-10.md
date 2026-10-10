# B2B enquiry flow, SEO and GEO — 2026-10-10

## Why
- Live check at 1280–1440px (most laptop widths): `.ed-nav-links` and the header quote button were hidden between 851px and 1450px, leaving only "Menu". Buyers had no visible quote action in the header.
- Homepage mixed two long specification tables, two process sections and a separate commercial-information band; buyers had to scroll ~11,400px with no route selector.
- Historical GSC (2026-08-28 – 09-24): 617 impressions, average position 34.6; 174 indexed / 481 excluded. Lighthouse on live home: performance 97, accessibility/best practices/SEO 100 — technical SEO is not the bottleneck; commercial clarity and entity signals are.

## Changes
- Header (all EN pages): green contact bar (location, MOQ, email, WhatsApp); full links from 1240px; "Get a Quote" button visible at every width, including mobile.
- Homepage order: hero (Get a Quote primary, 3 proof points) → key facts (MOQ, sample, lead time, shipping, reply time) → "Find what you need" router (type / industry / 240 designs / size tool) → packaging families → industries (4-card grid) → Why MTT + Hugo contact → process → finishes → structure details → buyer guides → FAQ (8) → quote form with brief checklist.
- Family images now use brand-palette visuals that show each structure clearly; 480/800 variants added. Home image transfer on first load: 372 KB → 211 KB (Lighthouse mobile, local build).
- Thank-you page: next steps, file hand-off routes (WhatsApp/email, since the form does not upload files), guides and catalogue links.
- RFQ page: brand-green submit button and serif heading.
- Organization schema: Shenzhen/Guangdong/CN address, telephone, areaServed, knowsAbout, OfferCatalog of five packaging families.
- llms.txt: "Key facts" block (what, who for, where, MOQ, sampling, lead time, quality, payment, response time).
- Sitemap lastmod 2026-10-10 for `/` and `/request-a-quote`.

## Evidence boundary
Every new statement repeats facts already published on About, Quality Control, How We Work, FAQ and footer. No new customers, certifications, factory claims or results. Images remain illustrative concepts (footer disclosure unchanged).

## Verification
`MTT_STATIC_EXPORT=1 npm run build` and `npm run check:release` pass (561 sitemap pages, 52 articles, quote retry, consent, IndexNow, crawl paths). Browser checks at 1366px and 375px: no horizontal overflow. Lighthouse (local static server): accessibility 100, SEO 100 on home and RFQ.

## Still needed from Hugo
Real factory / sampling / QC photos, social or directory profile URLs for `sameAs`, any certificates with documentary proof, and permission to cite real client projects.
