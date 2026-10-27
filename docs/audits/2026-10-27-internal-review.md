# Website internal review — 27 October 2026

Baseline: dac969dba1f057c23bb91e643bd38220d1963b8e. Scope: static export and discovery, product templates, metadata, catalogue/enquiry paths, dependency advisories and existing CI gates. This is a bounded engineering review, not a penetration test or a claim about every browser or external citation.

## Verified findings and minimal repairs

- Product-related links on the perfume/refill page were 17px high with inadequate spacing in the mobile Lighthouse audit. A shared related-link class now provides a minimum 44px target height in both locales. Catalogue regression checks cover both locales and prevent horizontal overflow.
- The shared 404 export inherited the homepage canonical and conflicting robots metadata from the root layout. The host already returned HTTP 404, so this was not evidence of a soft 404. Static export now removes inherited canonical/robots/googlebot tags from only the error document and emits one `noindex, follow` directive. A release regression failed on the original output and passes on the repaired export. Normal pages keep their existing canonicals.

## Checks

- Static build, TypeScript and release gates pass: 566 sitemap pages reachable, 480 product previews, 57 guides with metadata/schema/editorial coverage and classification.
- npm audit: zero reported vulnerabilities at review time; this does not prove absence of all security defects.
- ESLint: zero errors, 95 warnings. Existing warnings were not suppressed.
- lychee offline link check: 41,269 references, 4,505 unique; zero errors, 3,551 excluded. External availability is not covered by an offline check.
- EN/ZH catalogue filters, reset, four-family galleries, quote links and axe checks pass, with mobile related-link target regression added.
- Existing GitHub CI runs enquiry simulations, guides, catalogue, studio and Lighthouse before deployment. Deployment and live verification must be recorded separately from local success.

## Remaining limitations / follow-up

The single live product sample before repair scored performance 94, accessibility 97, SEO 100; these are lab results, not field Core Web Vitals or ranking evidence. Its unused resource/cache hints require broader measurement before bundle or hosting changes. GitHub Pages cache headers are hosting constraints, not a reason by themselves to migrate.

IndexNow currently compares with a repository ZIP baseline, so a small release can notify a larger changed set than the immediate previous deployment. The observed HTTP 200 confirms receipt only; this is a notification-efficiency follow-up, not an established indexing failure.

No special GEO ranking or citation result was measured. Maintain crawlable source HTML, useful evidence-backed content, visible authorship and independently verifiable references. Do not fabricate cases, schema ratings or citation gains. Current Search Console exclusion URL exports and a comparable query-page cohort remain needed for attribution.
