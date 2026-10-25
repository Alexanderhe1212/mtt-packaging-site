# MTT website audit — 25 October 2026

Follow-up: the dependency alerts and remaining studio performance issue recorded below are addressed in the [dated dependency/performance report](dependency-performance-followup-2026-10-25.md). The original measurements below remain as historical evidence.

Scope: the current GitHub Pages static website, its source and release pipeline. Baseline revision: `09d2ab42e856f27f8ce4a0a1985df7dcbc644a22`. Private crawl logs, screenshots and test receipts are retained in the operations evidence directory, outside this public repository.

## Reproduced defects and fixes

1. **Article discovery and review coverage.** The new GSM/thickness article was published but missing from the materials knowledge topic and from the content-quality test input. Added its topic membership, an evidence-bounded editorial review and a specific enquiry CTA. A new regression compares reviewed slugs with every published Insights URL, so future omitted articles fail the release gate. All 55 articles are now covered and assigned once across five topics. Factual case content and URL are preserved.
2. **Tablet product copy.** A scan of 564 pages at 1440, 768 and 390 pixels found 48 pages with long paragraphs squeezed into narrow columns at tablet width. Product details now stack below 1000 pixels. The same full scan returns zero narrow-paragraph findings and zero horizontal overflows. Added 768/900-pixel regression checks for a previously affected page and inspected a rendered screenshot.
3. **Design-tool GPU setup.** The structure chooser created 12 WebGL contexts for its 12 thumbnails. The chooser now loads 12 pre-rendered WebP images (about 82 KB in total), so it needs no WebGL context at startup. They are generated from the existing illustrative model, not product photographs. Dynamic thumbnails and missing-image fallback share one renderer and dispose each scene's geometry, materials and shadow resources. Browser regressions cover zero initial contexts, one shared fallback context, loaded previews and a changed product length reaching the quote summary. No real enquiry was sent.
4. **Source and CI validation.** Corrected JSON FAQ and design-tool type mismatches, guarded material lookup and preserved category compatibility, and resolved several source lint errors. CI now runs type/lint/release checks, enquiry/navigation/catalogue/studio browser checks and the existing Lighthouse configuration before deployment. Reports are saved as workflow artifacts.

## Checks completed before submission

- Fresh static export using `MTT_STATIC_EXPORT=1 npm run build`: passed.
- TypeScript: passed. ESLint: zero errors, 84 warnings. Generated files are excluded; native anchors are intentional for static hosting. Existing browser-storage, URL-hydration and GPU-sync effects remain visible as warnings in eight explicitly named components rather than being rewritten as part of this repair.
- Release suite: nine design-tool unit tests passed; static references, sitemap consistency, social metadata, quote retry, analytics consent, article/schema/internal-link and discovery checks passed.
- Browser checks: English/Chinese catalogue, family filters, no-results/reset, galleries, quote links, article navigation, enquiry context, failure/retry and consent behavior passed. Form/API requests were mocked or blocked; these are not delivery tests.
- Offline lychee: 40,956 link checks, zero errors. This is not verification that every external source remains available.
- Live advertools crawl: all 564 sitemap URLs returned HTTP 200, with matching canonical URLs and no noindex. No duplicate title, H1 or description groups were found. Three deliberately nonexistent general/product/article URLs returned HTTP 404. A valid 200 response does not prove Google accepts the content or has indexed it.
- Full responsive layout scan: 564 pages × three widths, zero findings after the fix.

## Local Lighthouse observations after the fix

| Route | Performance | Accessibility | SEO |
|---|---:|---:|---:|
| / | 94 | 100 | 100 |
| /packaging/custom-rigid-boxes/ | 94 | 100 | 100 |
| /products/ | 91 | 100 | 100 |
| /products/travel-fragrance-trio-drawer/ | 96 | 100 | 100 |
| /request-a-quote/ | 98 | 100 | 100 |
| /tools/gift-box-solution-builder/ | 77 | 100 | 100 |

Mandatory assertions passed. The builder remains below the advisory performance threshold of 80: its single-run score was 58 before this change and 77 afterward; the after-run total blocking time was approximately 11 ms. This comparison is diagnostic lab evidence, not a real-user or search-performance claim. The performance warning remains visible.

## Limits and remaining work

- Search Console exclusion data and URL Inspection results remain unavailable. No current affected-URL list, ranking, traffic or successful indexing claim is made. The Google request for the new article remains unsubmitted while Chrome refuses Apple-event JavaScript. Browser authorization, request acceptance, recrawl and actual indexing are separate states.
- Dependency audit reports 37 package entries: two critical, 25 high, seven moderate and three low. These include Next/server functionality and development/audit tools. The deployment copies only `dist/client` to GitHub Pages; it does not run a Next/Node server or upload `node_modules`. The audit does not establish that those server endpoints are exposed on the live website, and this is not a penetration test. These dependency alerts are not resolved by this change; a dependency compatibility upgrade remains outstanding. No forced/downgrade-based automated audit fix was used.
- Lighthouse scores are single-run local lab observations, not real-user Core Web Vitals, conversion or ranking results. Its existing warning thresholds remain visible; passing mandatory assertions does not mean every score meets every advisory threshold.
- No blanket canonical change, URL deletion or website rewrite was performed.

Deployment and IndexNow receipts are recorded separately after the workflow finishes; this source report does not itself prove deployment or indexing.

To regenerate the fixed structural previews after a model change: build and serve the site locally, run `MTT_TEST_ORIGIN=http://127.0.0.1:4217 npm run generate:studio-thumbnails`, inspect the images, then rebuild. The generator blocks static thumbnail requests to exercise the same live rendering fallback; it cannot target a remote site.
