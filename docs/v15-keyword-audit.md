# V15 keyword hierarchy audit

217 products: no exact duplicate SEO titles or descriptions; no duplicate combination of searchUse + structure + family. These checks do not establish search demand or rule out query cannibalization.

Hierarchy: custom packaging (site/catalogue) → rigid boxes / folding cartons / corrugated boxes / paper bags (family landing pages) → intended product + opening structure (product pages). Industry pages serve application guidance; articles answer buying questions. Pages should not all target the broad phrase custom packaging boxes.

Change: add the existing packaging family landing page to product BreadcrumbList between catalogue and product, matching the family link already present in the visible buying-resources section. EN/ZH products share the English family destination; existing English-guide notice retained. URLs and unique product titles preserved. Full mapping: v15-keyword-map.csv.

Next evidence needed: Search Console query-to-page comparisons over 28/90 days before merging pages or changing well-performing titles. No search volumes, ranking gains or indexing requests claimed.

Primary references: https://developers.google.com/search/docs/appearance/title-link and https://developers.google.com/search/docs/crawling-indexing/links-crawlable (descriptive distinct titles; relevant crawlable internal links).

GitHub tools reviewed: https://github.com/eliasdabbas/advertools for future exported-query analysis; not installed or run. Existing https://github.com/lycheeverse/lychee actually run offline: 33,672 link occurrences, 3,750 unique, 2,461 excluded, zero errors. This is a static link check, not indexing confirmation. NetworkX audit could not run in the current Python environment (module unavailable); no discovery-depth claim made. Release checks passed.
