# MTT site audit — 2026-11-13

## Scope and evidence
Production baseline dcd122552ed3ebcc5ea25e96bee8d31d139d0dfe, confirmed using live deployment-revision.txt. Current appearance preserved. Independent worktree protects existing uncommitted editorial work.

Applied audit dimensions: qiaomu-seo evidence workflow, technical/on-page SEO, site architecture, conversion paths, analytics consent/attribution, schema and GEO crawler accessibility. Skills are selected by relevant dimension; installing a skill is not a test result.

- 598 sitemap pages: static indexability, social metadata, internal reachability checks passed in the baseline release verification.
- All 598 pages scanned at 1440, 768 and 390 pixels: no horizontal overflow or narrow-text heuristic findings. Images and JavaScript intentionally excluded from this layout sweep; interactive flows are separate browser checks.
- 480 EN/ZH product pages: schema/breadcrumb/image consistency and family buying-guide/sample/enquiry links passed.
- 87 articles: baseline content-quality, navigation, internal-link and metadata checks passed; this is automated structural coverage, not individual factual re-review of every paragraph.
- Six representative templates: Lighthouse lab performance 91–97, accessibility and SEO 100. Not real-user Core Web Vitals or a ranking forecast.
- Ten live endpoints sampled: seven HTML destinations returned 200 with self canonicals and index/follow; robots and sitemap returned 200; deliberately missing URL returned 404/noindex.
- Existing product catalogue, enquiry and studio browser regression tests passed on this same baseline; no real enquiry sent.
- 16 offline consent/attribution scenarios passed; 1,223 thumbnails and ten editorial image sets passed checks.

## Findings and remediation plan

1. **Confirmed dependency advisory, moderate:** basic-ftp 6.2.3 is vulnerable to malformed FTP directory responses (GHSA-5pm8-86m8-9m6r). It is a transitive detection-tool dependency, not an exposed website FTP endpoint. Update only its existing override and lock entry to compatible patch 6.2.6; verify isolated install, import, audit and build. No FTP credentials or remote FTP server required.
2. **Other moderate dependency advisories:** baseline audit groups 19 affected packages, including downstream chains; these are not 19 independent exploitable website bugs. minimatch upgrade crosses a major version; Satori/@vercel/og/vinext involve build/rendering tooling. Review reachability and compatibility before upgrading. Do not apply npm audit force/downgrades.
3. **71 lint warnings:** 64 native-image hints, five effect-state hints, two full-navigation hints. They are not proven broken links or indexing errors. Preserve responsive image output and standalone-tool handoff; do not suppress rules to inflate score. Review each actual behavior before changing it.
4. **Measurement gap:** current GSC page/query exports, Bing actual index reports, field CWV, current backlink profile and AI citation samples were not obtained in this run. No ranking, indexing or conversion improvement asserted. Follow-up should prioritize actual high-impression/low-click queries when those reports are available.

## Release boundaries
Safe dependency patch is the only implementation change selected by this audit. Existing design, URLs, metadata, MOQ, contacts and business terms remain untouched. No indexing request, outreach or Pinterest publication is needed for this tooling-only patch. Rollback: revert this audit's dependency commit to baseline dcd1225. Deployment and post-deployment observation must be recorded separately.

## Verified implementation result

Compatible basic-ftp patch 6.2.3 → 6.2.6 installed with npm ci in this independent worktree. Audit affected-package count reduced from 19 moderate to 10 moderate; zero high/critical before and after. This removes a downstream advisory chain, not nine independent vulnerabilities. Isolated import, TypeScript, complete 601-route export, 598 sitemap-page/search/crawl gates, 87-article quality gates and ten studio behavior tests passed. Lighthouse runner healthcheck passed after dependency change; the six lab scores above belong to the baseline full run. Remaining lint warnings are reported without suppression. No real enquiry submitted.

## Remediation round two

- Scoped minimatch override 11.0.8 only under TypeScript-ESLint eliminates the glob amplification advisory chain. Installed with npm ci; lint and type checks retain compatibility. Moderate affected-package count is now 3 (Satori → @vercel/og → vinext); no high/critical.
- JSON import now declares its type for supported Node 22+/Vite native configuration loading, removing the configuration compatibility warning.
- Trial @vercel/og 1.0.3 could not directly render a PNG: `Dynamic require of "fs" is not supported` in its bundled HarfBuzz code. It also introduced an fflate advisory chain. Trial changes were reverted rather than released. No image-generation compatibility claim is made.
- 71 lint hints each have a disposition in warning-dispositions.csv. These remain visible; reviewed/retained does not mean fixed or warning-free. Full native-image replacement is not a validated remedy in this static-export stack.
- Complete closure is NOT achieved: three dependency findings need a compatible image-generation-library migration or verified upstream patch. GSC/Bing field data remain a separate evidence gap.

## Remediation round three

Studio calculator handoff is now read by a lazy bootstrap initializer rather than an effect that updates state after the first paint. Dynamic thumbnails initialize their visibility fallback directly when IntersectionObserver is unavailable, avoiding an extra effect-driven render. Browser regression coverage includes valid calculator import and acceptance, clearing the consumed handoff, malformed JSON feedback, missing fixed images with IntersectionObserver unavailable, shared GPU context, artwork edits, autosave, quote dimensions, and failed-chunk recovery. No live enquiry sent. Full lint: zero errors, 69 warnings. Type check, complete static build and 598-page static/search gates passed. Dependency findings remain three; no claim of complete closure.
