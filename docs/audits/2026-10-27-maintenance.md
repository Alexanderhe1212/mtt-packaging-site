# Warning and delivery maintenance — 2026-10-27

## Reproduced findings

- ESLint reported 95 warnings, zero errors. Six unused declarations, seven incomplete hook dependency declarations and three misplaced client directives were cleaned up without changing lint rules. The resulting local count is 79: 60 native-image advisories, 10 effect initialization advisories, two static-navigation advisories, and seven ignored-by-Git local browser helper expression advisories. CI does not contain those local helpers. Native images and document navigation are intentional for this static deployment. Browser-only storage/query initialization is retained to preserve hydration, consent and enquiry behavior.
- IndexNow compared every release with `HEAD^:mtt-packaging-edgeone.zip`, an older archive rather than the preceding deployment. It could repeatedly notify unchanged pages. The workflow now reads a validated public content-hash manifest from the currently deployed site before replacing it. Missing baseline initializes without a bulk notification; invalid manifests and network errors stop the release. Subsequent runs submit changed canonical, indexable sitemap pages only, at most 100 per HTTP request. Deployment revision and key checks remain. Per-batch receipts preserve successful batches if a later request fails; failed URLs require an explicit retry using the previous manifest/receipt, not an assumed indexing success.
- Live GitHub Pages image responses specify `Cache-Control: max-age=600`. No unsupported `_headers` file or service worker was introduced. Longer HTTP cache lifetimes require a hosting/CDN change, outside this maintenance release.
- The navigation mark was a 256px, 8,932-byte WebP. Build-generated 54px and 108px alternatives are 1,298 and 2,978 bytes. Responsive source selection preserves the original for large displays. Existing product thumbnails, original images, CSS states and shared React runtime remain. Lighthouse's unused CSS/JS estimates describe one page/initial interaction and do not establish that shared code is removable.

## Verification

- Static build, types, release checks and local lint passed (zero errors).
- IndexNow tests exercise validated manifests, no-index exclusion, unchanged content, missing baseline, lossless 100-URL batches and mocked HTTP receipts; no tests notify search engines. The new tests fail against the prior implementation.
- Product thumbnail validation checks both generated mark dimensions and smaller byte sizes.
- Local catalogue, studio and enquiry browser checks passed, including failure/retry and consent paths. Tests sent no real enquiries. Six-route Lighthouse SEO/accessibility checks scored 100. Initial homepage performance was 76 under concurrent browser testing; an uncompressed standalone server scored 70 and is not comparable. Three isolated runs with the release compression configuration scored 90/94/94 (median 94), with no assertion failures. Other five routes scored 88–97. These are lab results, not field Core Web Vitals. Cloud workflow receipts remain the deployment gate.

This maintenance changes neither canonical policy nor URLs and makes no traffic, ranking or indexing claim. The first manifest migration intentionally sends no IndexNow request. Google crawling and actual indexing are separate from deployment and notification acceptance.
