# Phase nine — Bing discovery and enquiry completion

2026-09-14. Previous release: b0c9875. No traffic, ranking, AI citation or sales increase is claimed.

## Verified Bing status and actions

The authenticated Bing Webmaster Tools AI Performance report showed zero citations for June 14–September 13, 2026. This is not proof of no indexing. The main sitemap had been submitted September 4 and successfully crawled September 12, with 312 URLs discovered.

On September 14, the main sitemap was resubmitted and sitemap-products.xml added. The product sitemap then showed 434 URLs discovered and processing; the main sitemap showed the new submission date and processing. Discovery counts overlap and must not be added together. Actual indexed counts were not established by this report.

IndexNow showed onboarding rather than a submissions report. A pre-existing root verification file was found; this alone is not submission evidence.

## GitHub support

- [Puppeteer](https://github.com/puppeteer/puppeteer), Apache-2.0: reuse the installed browser automation library from the existing audit toolchain. A real-browser local regression script now checks the enquiry path, with external network requests blocked and Formspree responses simulated.
- [IndexNow Action](https://github.com/bojieyang/indexnow-action), MIT, and [Microsoft's IndexNow plugin](https://github.com/microsoft/indexnow-wordpress-plugin) were reviewed. We adopted the post-publication notification approach, with a small standard-library script tailored to our committed static archive, rather than installing a WordPress plugin or submitting the entire sitemap on every deployment. No code was copied from either project.
- Protocol and status semantics: https://www.indexnow.org/documentation . HTTP 200 means receipt, 202 means receipt with key validation pending; neither confirms indexing.

## Implemented

1. All product enquiry links preserve their packaging family as well as product name/code and selected accessories. The English quote form preselects the correct family but remains editable.
2. Calculator prefill and its hidden summary attach only when entered explicitly from the calculator. A stale calculator session can no longer silently contaminate another product enquiry. Corrected corrugated mapping from Other to Corrugated Box.
3. Added recommend-a-structure and planning-stage quantity options, a below-500 feasibility-review option, a viewable artwork/reference URL field, contact autocomplete and a direct jump to the form. Dimensions are clearly labelled finished internal box dimensions. Existing Chinese form supports artwork links already and remains available with no language-picker change.
4. Existing consent-gated analytics now includes email clicks, Chinese/trailing-slash quote entry links and a generic submission-error event. No field values or contact details are added to event parameters. generate_lead remains tied to server acceptance; contact clicks are not successful enquiries.
5. GitHub Pages deployment now emits a commit marker. Only after that exact version and the existing ownership file are reachable does the IndexNow script submit changed canonical sitemap pages. Visible text, links, images and form attributes drive change detection; script chunk changes alone do not. Removed sitemap entries are not automatically treated as deleted pages. Pure CSS/JS changes are not submission triggers. The action stores a receipt artifact; errors remain visible and do not pretend indexing succeeded.

## Validation

- TypeScript and 494-page static gate passed; 434 EN/ZH product CTA/schema/link checks and 1085 thumbnail checks passed.
- Browser regression: all four families prefill correctly; old calculator data excluded; editable planning selections and artwork URL accepted; failed request retains fields; retry leads to thank-you only after simulated acceptance; explicit calculator handoff works; no horizontal overflow at 390/1280px. No live test enquiry was sent.
- IndexNow offline tests cover unchanged build chunks, meaningful changes, noncanonical/noindex exclusion and removed-page handling.
- Existing quote duplicate/retry and consent tests passed. English navigation remains reachable within two links from home.

## Reproduce

After building, run `npm run check:release` and `work/seo-tools/bin/python scripts/audit-discovery.py --strict`. Serve dist/client locally, then run `MTT_TEST_ORIGIN=http://127.0.0.1:4217 npm run audit:enquiry`. The browser script refuses non-local targets. `python3 scripts/indexnow-submit.py --previous previous-release.zip` previews without sending; explicit --submit and a verified deployed revision are required to notify.

## Measurement

Compare Search Console/Bing impressions and clicks, Bing AI citations, consented quote_start → generate_lead, quote_error and real business enquiries over subsequent weeks. Cookie consent means analytics is a partial view. Email/WhatsApp clicks do not establish delivery or a qualified lead. IndexNow does not replace Google Search Console and no new Google manual submissions are claimed in this release.

Calculator release checks also found and corrected a low-contrast CTA label, missing skip-link target, skipped heading level and undersized FAQ touch targets.
