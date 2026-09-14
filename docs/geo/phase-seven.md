# Phase seven — readable guidance and consent-aware loading

2026-09-14. Rollback: f9ad90c.

## GitHub support
Reviewed https://github.com/dequelabs/axe-core (MPL-2.0). The installed Lighthouse dependency already includes axe-core 4.13.0; reuse it rather than adding a second runtime/library. Its color-contrast finding identified builder step numbers (3.86:1) and rigid-family detail numbers (4.05:1). Updated only those two text rules to #70603e, and made color-contrast a blocking Lighthouse release assertion.

## Performance change
The previous layout loaded gtag.js even with analytics consent denied. Replace this with a small head bootstrap and load the GA script only after the existing CookieConsent grants analytics. Existing measurement ID, preference storage, grant/revoke hooks and consent-gated enquiry events remain. No library is loaded for visitors before consent. Grant once initializes GA once; revoke disables GA and updates consent; regrant does not initialize twice. Failed script downloads can retry without duplicating the queued initial configuration.

Google reference: https://developers.google.com/tag-platform/security/concepts/consent-mode . This switches from advanced-style denied-state loading to basic consent behavior: no pre-consent/cookieless signals for nonconsenting visitors. GA4 totals/modeling may differ and must not be interpreted as a traffic loss or gain without accounting for this measurement change. Full reporting delivery to GA4 is not certified by these tests. Ad blocking, network access and consent still affect reporting.

## Validation
- TypeScript passed; one production build.
- Existing release checks passed: 494 sitemap routes, 434 EN/ZH product pages, 1,085 thumbnails, enquiry rejection/retry and product handoff checks.
- New `node scripts/check-analytics-consent.mjs` executes the actual bootstrap without network: deny/grant/revoke/regrant, no duplicate load/config and failed-download retry pass. Added to `npm run check:release`.
- Browser fresh origin: no Google script before consent. Accepted preference and reopened settings were exercised with Google URLs blocked to avoid sending test statistics. Changed to Off and saved; returning to the builder loaded no Google script. The embedded builder still opened. 390px viewport/document width matched. Temporary device and network overrides cleared.
- Lighthouse: six pages passed SEO and accessibility at 100. Builder local performance 78→94 and accessibility 96→100; rigid-family accessibility 96→100. One mobile-simulation run, no claim of real-user Core Web Vitals or ranking improvements. Homepage best-practices 96 remains; no broad app rewrite.

## Preserved and follow-up
No product visuals, tool source, tool structures, saved designs, forms or sitemap URLs changed. Existing tool iframe loads normally; it was not hidden to improve scores. No manual indexing requests retried after the already-recorded daily quota. Future audits use the new color-contrast assertion and consent regression test.
