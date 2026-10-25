# Dependency and studio performance follow-up — 25 October 2026

This follows the [website audit](site-audit-2026-10-25.md). Baseline: `0350a9ea2176910ed91ea7fa40b858e2c1870d69`. This report records source changes and local checks before publication; deployment and submission receipts are recorded separately in the private operations evidence.

## Actual exposure and dependency repair

The baseline npm audit reported 37 affected package entries (2 critical, 25 high, 7 moderate, 3 low), not 37 distinct vulnerabilities. The release workflow uploads only `dist/client` to GitHub Pages. It does not publish `node_modules` or run a Next/Node server. Benign live requests to `/_next/image`, `/@vite/client` and `/node_modules/` returned 404. Consequently the audit alone does not prove exposure of those server handlers on the public site. Build tools still run in development and CI and need maintained dependencies; browser-delivered React is also in scope.

The lockfile now resolves a fresh npm audit to **zero known vulnerability entries in every severity**. This is a dated package-database result, not a penetration test or a guarantee of no vulnerabilities. Updates preserve the current vinext framework version and application routes:

| Area | Updated versions / approach |
|---|---|
| Framework / browser | Next and matching ESLint configuration 16.4.3; React, React DOM and React server package 19.2.8 |
| Build / local tooling | Vite 8.3.5; Cloudflare Vite plugin 1.65.0; Wrangler 4.152.0; Sharp 0.35.5 |
| Audit/browser tools | Retain LHCI 0.15.1, use Lighthouse 13.5.0; declare Puppeteer Core 25.16.0 explicitly for browser checks |
| Transitive repairs | Lock compatible patched versions; targeted overrides for image-size 2.0.4, tmp 0.2.7, basic-ftp 6.2.3, LHCI UUID 11.1.1 and Miniflare Undici 7.30.1 |

The automatic recommendation to downgrade LHCI to 0.1.0 was rejected. No `--force` audit fix or framework migration was used. Targeted overrides require continued compatibility review when their parent packages are upgraded. The minimum Node version is now 22.19.0 for the current audit engine; CI uses Node 22. The existing CI now runs `npm run audit:dependencies` before building, blocking releases on high or critical advisories (or a failed audit service request).

## Reproduced performance issue and bounded fix

The structure chooser downloaded the full editor and 3D implementation before a visitor chose a box. A new browser regression failed on the baseline: 1,085,263 decoded HTML/JavaScript bytes exceeded a 500,000-byte startup budget.

The studio build now preserves Vite's hashed assets, loading the editor, 3D previews and dynamic thumbnail renderer when needed. Fixed structure images remain available at startup. Existing geometry, artwork, local project storage and enquiry behavior are retained. A chunk-load error shows a recovery message and lets the visitor return to structures without discarding the parent project state. Generated assets are recreated by the build and excluded from source linting.

The same browser regression now measures **387,383 initial HTML/JavaScript bytes**, a **64.3% reduction**. The chooser still creates zero initial WebGL contexts; missing-image fallback shares one renderer. A deferred 3D chunk still exceeds Vite's 500 KB advisory, but is no longer part of the initial chooser download.

For a comparable lab measurement, both the old and new builds were measured with Lighthouse **13.5.0**, the same mobile settings and three sequential runs. The earlier audit used Lighthouse 12.6.1; its score is not used as this comparison's baseline.

| Metric | Before | After |
|---|---:|---:|
| Performance, median of three | 78 | 88 |
| Individual performance scores | 78, 78, 77 | 88, 88, 89 |
| LCP, median | 4.439 s | 3.762 s |
| Total blocking time, median | 11 ms | 6.5 ms |
| Transferred bytes for tested page | 635,374 | 486,245 |

The existing performance advisory of 80 was preserved. The final six-route local release run passed all assertions: homepage 94, rigid-box page 94, enquiry 98, builder 88, catalogue 91 and example product 96. Accessibility and SEO categories scored 100 on those six routes. These are lab observations, not real-user Core Web Vitals, traffic, conversion or ranking improvements. The measured mobile LCP still leaves room for future work.

## Verification and limits

- Static production build, type checks, release suite and nine studio unit tests passed.
- ESLint: zero errors, 87 nonblocking warnings. The moved thumbnail renderer retains the previously scoped effect warning; generated vendor bundles are excluded. Existing unrelated warnings are not silently disabled.
- Browser tests passed: fixed/fallback previews; dimensions reaching the quote summary; text/image editing; 3D and folding views; local autosave; chunk failure recovery; catalogue filters/galleries; guide navigation; enquiry validation/retry; analytics consent.
- No real enquiry was sent. Browser test external requests were blocked or mocked.
- Offline lychee: 40,956 checks, zero errors. This does not verify availability of all external sources.
- Current local development startup and homepage HTTP 200 were verified after the tooling upgrade.
- A separate fresh `npm audit --json` passed with zero findings after installation. One intervening registry request failed; it was retried and is not counted as a successful audit.
- No article rewrite, canonical batch edit, page deletion, privacy-consent change or internal pricing-data exposure was introduced.
- Google recrawling and actual indexing are unverified. A deployed code change or accepted IndexNow notification does not establish indexing.
