# MTT SEO and GEO review — 2026-11-13

## Evidence and scope

- Semrush third-party interface, MTT Site Audit, completed snapshot 2026-11-13 12:25, desktop, JavaScript rendering disabled, 100 of 100 configured pages. This is a bounded sample, not a complete-site audit. Its score is not a Google ranking or AI-citation metric.
- Google Search Console, domain property, Web search, the paper-bag size article, last 28 days versus prior 28 days: 131 versus 25 impressions and 0 versus 0 clicks. Average positions 20.7 versus 13.7 are averages across the queries shown and may reflect a different query mix, not a controlled change in ranking. Viewed on 2026-11-13; last update 17 hours earlier.
- Semrush keyword gap, US desktop snapshot 2026-11-11: only the first 100 of 8,255 untapped rows were exported locally. These are modelled third-party estimates, not actual MTT queries or a complete competitor export. Some unrelated and brand-specific entries require screening.

## Findings and actions

1. The calculator is flagged because its WebApplication markup has no `aggregateRating` or `review`. Google requires one for software-app rich-result eligibility. The calculator has no verified review data, so do not invent a rating or review. Keep the truthful existing markup; ineligibility for this enhancement is not proof of an indexing failure. Source: https://developers.google.com/search/docs/appearance/structured-data/software-app
2. The report lists 13 hreflang conflict occurrences. Sampled affected URLs are catalogue filters and an enquiry prefill containing query parameters. Live responses for `products?contents=jar-tin`, `products?family=rigid&structure=fold-flat`, and `request-a-quote?product_family=rigid` return HTTP 200, canonicalize to the corresponding clean page, and point alternate languages to those clean canonical URLs. Semrush flags parameter variants because they lack self-referencing hreflang; this observation alone does not justify changing canonical or bilingual mappings. Other occurrences remain unreviewed; do not generalize the sample.
3. The report flags 77 low text-to-HTML-ratio occurrences. This is not evidence that a page lacks useful content or a direct instruction to add copy. Review important pages against real buyer needs instead.
4. The 100-row keyword sample contains `emboss vs deboss` and `foil stamping`. Existing deboss and foil-matching guides cover separate buyer decisions; add reciprocal contextual links. Their prior editorial reviews are recorded in `content-quality-review-2026-11-04.json` and `content-quality-review-2026-09-16.json`; see `2026-11-13-semrush-finish-links.md`. Avoid claiming this will raise rankings.
5. The paper-bag page has modest impressions without clicks, but visible query counts are small and the query mix is varied. Its title and content should only be changed after inspecting current displayed search snippets and relevance; do not infer a cause from CTR alone.

## Validation status

The link change was built and checked locally in an isolated worktree. Its deployment, search-engine recrawl, indexing, search clicks and AI citations require separate evidence. No sitewide remediation or production deployment is asserted by this record.
