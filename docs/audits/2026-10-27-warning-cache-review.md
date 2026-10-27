# Remaining warning review and cache plan — 2026-10-27

## Verified scope

Baseline: 72 tracked-source warnings (60 images, 10 effect-state, 2 static navigation). No lint rule was disabled. QuoteForm now derives product/accessory defaults from a hydration-safe browser URL snapshot; only user edits are stored in React state. Two effect-state warnings removed; 70 retained. Browser tests cover initial defaults, history changes, editable/empty accessory values and submission retry.

All 60 warned image elements have alt attributes. 57 have explicit width and height; the other three use reserved-aspect containers (square product gallery and 36:25 studio preview). Original image URLs, image content and canonical URLs remain intact. This source audit does not claim all image compression opportunities are exhausted.

## Per-warning disposition

Line references below identify the baseline warning locations.

| File:line | Rule | Disposition / reason |
|---|---|---|
| `app/about/page.tsx:81` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:121` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:130` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:139` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:143` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:152` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:170` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:179` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:188` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/about/page.tsx:197` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/case-studies/page.tsx:17` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/how-we-work/page.tsx:43` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/how-we-work/page.tsx:61` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/how-we-work/page.tsx:75` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/how-we-work/page.tsx:88` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/industries/[slug]/page.tsx:94` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/industries/[slug]/page.tsx:108` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/industries/page.tsx:25` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/insights/[slug]/page.tsx:92` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/insights/[slug]/page.tsx:95` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/insights/[slug]/page.tsx:124` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/insights/page.tsx:44` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/insights/page.tsx:68` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/corrugated-boxes/page.tsx:5` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/custom-inserts/page.tsx:59` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/custom-inserts/page.tsx:65` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/custom-paper-bags/page.tsx:58` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/custom-paper-bags/page.tsx:71` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/custom-rigid-boxes/page.tsx:72` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/custom-rigid-boxes/page.tsx:95` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/folding-cartons/page.tsx:62` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/folding-cartons/page.tsx:78` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/page.tsx:83` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/page.tsx:113` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/page.tsx:188` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/packaging/page.tsx:227` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/page.tsx:94` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/page.tsx:106` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/page.tsx:121` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/page.tsx:135` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/page.tsx:165` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/page.tsx:203` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/ppwr-compliant-packaging/page.tsx:122` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/quality-control/page.tsx:73` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/sustainability/page.tsx:82` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/zh/page.tsx:4` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `app/zh/page.tsx:4` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/BoxSizeCalculator.tsx:124` | `@next/next/no-location-assign-relative-destination` | Retain full-document navigation: calculator transfers browser session data to the static quote page or standalone studio. |
| `components/BoxSizeCalculator.tsx:215` | `@next/next/no-location-assign-relative-destination` | Retain full-document navigation: calculator transfers browser session data to the static quote page or standalone studio. |
| `components/CalcQuoteSummary.tsx:33` | `react-hooks/set-state-in-effect` | Read calculator sessionStorage after hydration; preserve direct-visit and retry isolation. |
| `components/CaseStages.tsx:2` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/CookieConsent.tsx:17` | `react-hooks/set-state-in-effect` | Read consent and browser privacy signal after hydration; preserve GPC, revocation and cross-tab storage behavior. |
| `components/FamilyProductDirectory.tsx:9` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/FragrancePlanning.tsx:12` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/LanguagePicker.tsx:8` | `react-hooks/set-state-in-effect` | Read stored language preference and browser language after hydration; preserve language prompt and static language routes. |
| `components/MTTPackagingMark.tsx:2` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/PackagingCustomization.tsx:90` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/ProductCatalogue.tsx:16` | `react-hooks/set-state-in-effect` | Apply URL filter defaults after hydration; preserve crawlable default product HTML. |
| `components/ProductGallery.tsx:3` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/QuoteForm.tsx:18` | `react-hooks/set-state-in-effect` | Fixed: derive URL defaults without effect-to-state copies; retain editable accessory override. |
| `components/QuoteForm.tsx:19` | `react-hooks/set-state-in-effect` | Fixed: derive URL defaults without effect-to-state copies; retain editable accessory override. |
| `components/RelatedPackagingStudies.tsx:2` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/SiteNav.tsx:14` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/SiteNav.tsx:19` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `components/ZhNav.tsx:2` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `tools/packaging-studio/app/StudioApp.tsx:39` | `react-hooks/set-state-in-effect` | Import calculator draft and surface invalid-data errors on startup; no recurring render loop reproduced. |
| `tools/packaging-studio/app/StudioApp.tsx:55` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `tools/packaging-studio/app/components/BoxThumbnail.tsx:12` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `tools/packaging-studio/app/components/DynamicBoxThumbnail.tsx:22` | `react-hooks/set-state-in-effect` | Synchronize intersection visibility, cached GPU previews and rendering failures; preserve shared GPU context and cleanup. |
| `tools/packaging-studio/app/components/DynamicBoxThumbnail.tsx:23` | `react-hooks/set-state-in-effect` | Synchronize intersection visibility, cached GPU previews and rendering failures; preserve shared GPU context and cleanup. |
| `tools/packaging-studio/app/components/DynamicBoxThumbnail.tsx:30` | `@next/next/no-img-element` | Retain native static image: no image-optimizer server is deployed. Changing only to an unoptimized wrapper does not reduce image bytes. |
| `tools/packaging-studio/app/components/FoldingPreview.tsx:32` | `react-hooks/set-state-in-effect` | Reset external GPU animation and report browser rendering failures; preserve animation controls and disposal. |

## Cache evidence and recommendation

Live HTML, robots.txt, sitemap.xml and a responsive logo each return `Cache-Control: max-age=600`, an ETag and HTTP 304 on an unchanged conditional request. Thus a 10-minute TTL does not imply downloading the full resource again every 10 minutes. Authoritative DNS is currently DNSPod; responses are served by GitHub Pages. No DNS, CDN, service worker or browser-cache policy changes are made in this release.

Recommended next infrastructure option: keep GitHub Pages as origin and add a CDN proxy, after reviewing the complete DNS zone and TLS configuration. Apply long browser caching only to content-hashed JS/CSS (for example the generated `_next/static` chunks and standalone studio hashed assets), not all files in an extension/directory indiscriminately. Start other same-name images with existing origin caching; version their URLs before extending browser TTL. Keep HTML, robots.txt, all sitemaps, 404s, deployment revision, IndexNow manifest/key files and external form submissions outside long-lived rules. Preserve query strings. Do not enable bot challenges for verified search crawlers.

This is a reviewable plan, not an applied CDN configuration. Switching nameservers can affect email and other records and is not a routine code-only cleanup. Before activation: export DNS records (including mail/TXT/verification), configure TLS, verify origin routing and real 404s, test query-prefilled quotations, compare canonical/robots/sitemap responses, rehearse origin bypass/rollback and verify a content update appears promptly. Browser-held long-lived assets cannot be recalled merely by purging a CDN cache.

Alternative: move hosting to Cloudflare Pages, which supports `_headers`, but this changes deployment plumbing and 404 behavior and is unnecessary solely to eliminate a Lighthouse cache warning. Do not add a nonfunctional `_headers` file to GitHub Pages. Avoid a service worker for this purpose because stale HTML and update coordination introduce additional risk.

Sources: [React browser snapshots](https://react.dev/reference/react/useSyncExternalStore), [Cloudflare browser/edge TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/), [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/), [Cloudflare Pages serving/caching guidance](https://developers.cloudflare.com/pages/configuration/serving-pages/). Accessed 2026-10-27.

No ranking, traffic, recrawl or indexing improvement is inferred from these changes.
