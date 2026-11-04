# B2B product schema: scope and release decision

The November 3 Ahrefs email reports 1,080 internal URLs, Health Score 100,
0 errors, 521 warnings and 1,071 notices, including 480 product-schema warnings.
The current catalogue has 240 designs (150 rigid, 30 carton, 30 corrugated,
30 bag) rendered in English and Chinese. The counts match, but the email is
not a URL-level export: do not claim all flagged URLs were individually matched.

## Decision

Specific made-to-order designs with a visible code, name, construction,
materials, images and a design-specific enquiry action can be described as
Product. A fixed price or stocked inventory is not necessary for the Schema.org
entity. The catalogue's concept images must not be presented as delivered work.

Add only Product type, localized @id/url/name/description, existing identifier,
existing gallery images and a reciprocal link to WebPage. Include the existing
visible visualization/sampling/quotation disclaimer in its description.
Do not add offers, prices, availability, reviews, ratings, GTINs or MPNs.
Keep the existing WebPage, breadcrumbs, metadata, locale routes and UI intact.

Service remains appropriate for broad manufacturing/engineering capabilities,
such as /packaging/custom-inserts and /packaging/custom-rigid-boxes, because
they explain a range of deliverables and a custom development process rather
than one named design. Existing Service markup is retained. Catalogue/listing
pages, guides and illustrative case studies are not automatically Products.

Alternatives considered: keeping WebPage alone is defensible but omits the
specific design entity; changing all details to Service obscures their individual
physical-product focus. Adding unpriced Offers or invented commerce data solely
to satisfy a validator is rejected.

## Search limitations

Schema.org-valid Product is distinct from Google rich-result eligibility.
Google product snippets require name plus offers, review or aggregateRating.
These pages intentionally do not qualify. Rich Results Test/Search Console may
report missing commerce/review properties; that is not JSON syntax corruption.
Do not promise shopping results, a ranking boost, or a reduction to zero warnings.

Sources checked November 4, 2026:
- https://schema.org/Product
- https://schema.org/Service
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet

## Evidence and validation

Reviewed source at 32dc40230039271028f2f761a8e1acfbb142b2e4.
Live English perfume and skincare-carton content was checked. The Chinese perfume
page was checked in Chrome, including actual JSON-LD: WebPage and BreadcrumbList
only. Its named design, specification table and quotation/sample disclaimer match
the source. Other catalogue records were inspected from the source data.

Regression test first failed on missing Product; after the change it passed all
480 localized graphs, entity relationships, existing image files, absence of
unsupported commerce fields and HTML-safe JSON serialization. The --built mode
also validates actual exported HTML and canonical/hreflang links for all 480.
The PR-only workflow runs the production build, types, lint and existing release
checks with read-only permissions and no deploy step. Inspect its result before
merging. Local source-expression tests alone do not prove a successful build.

## Deployment gate and recrawl

Do not merge or deploy until Hugo approves the reviewed change. main pushes
trigger the existing deployment workflow. After approved deployment, verify
representative EN/ZH HTML, then request an Ahrefs recrawl and compare its actual
URL-level findings. Google processing/reindexing is separate. Until then, only
the code-level omission is addressed; no live warnings are confirmed cleared.
