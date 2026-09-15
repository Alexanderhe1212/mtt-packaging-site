# Version 11 quality extension — 2026-09-15

This follows the homepage photography release. It preserves those images and concentrates on search metadata, readable buyer answers and repeatable quality checks.

## Executed plan

1. Inspect the current export and existing release gates; research suitable maintained open-source tools.
2. Fix inherited homepage social metadata and missing product share URLs/images.
3. Keep the machine-readable directory synchronized with visible article records and buyer paths.
4. Expose the homepage answers already present in structured data as native expandable buyer FAQs.
5. Run static, metadata, FAQ parity, local link and mobile browser checks, then deploy the verified export.

## GitHub projects used

- [Lychee](https://github.com/lycheeverse/lychee), version 0.24.2, MIT/Apache-2.0. Used as an offline release-audit utility, not shipped to visitors. The official macOS ARM archive was verified against its published SHA-256: `c9d3740ea2d891854d37116c9fba840f37b6e7c89d330e7db84ac333631c4977`.
- [Lighthouse](https://github.com/GoogleChrome/lighthouse), through the existing pinned Lighthouse CI 0.15.1 setup. Used for homepage performance, accessibility and SEO diagnostics.

No new browser library, paid service or framework migration was needed.

## Verified fixes

- Root metadata no longer forces the homepage title and description into child Twitter cards. Each page uses its resolved page/Open Graph information.
- All 434 English/Chinese product pages declare their own share URL, title, description and product image. Language selection remains disabled as requested.
- `llms.txt` is generated during builds from the existing business summary and article records: 13 buyer paths and 31 guides. It includes the product catalogue, four packaging families, inserts, tools and quotation path.
- Both sitemap URLs are declared in the source robots route, matching the deployed robots policy.
- Five homepage buyer questions are visible with native details/summary controls. Existing wording is reused; no fabricated customer results or new certification claims were introduced.
- A release check validates all page social title/description pairs, product images/URLs, generated directory targets and visible structured FAQ answers. The source article list is authoritative for future guide additions.

## Reproduce

After the normal static build, run `npm run check:release`. Install the verified Lychee release outside the browser bundle and run `LYCHEE_BIN=work/lychee/lychee npm run audit:links` (or put `lychee` on PATH). The local link audit checks sitemap-listed HTML, root-relative files and anchor fragments. It intentionally excludes external HTTP/mail links; it does not claim those destinations are reachable.

## Results and limits

494 sitemap pages passed the static and metadata release checks; 434 product share previews passed; 44 discovery links passed. All 80 structured FAQ answers matched visible page content. Lychee checked 33,157 reference occurrences, reporting zero local errors; 2,461 external occurrences were excluded. Browser checks at 390px and 1440px confirmed FAQ expansion, menu operation, 14 retained homepage images, no horizontal overflow and no page JavaScript errors.

The existing IndexNow detector identifies one substantive content change (homepage); metadata-only edits do not trigger mass resubmission. A notification receipt does not establish indexing. Search Console impressions, clicks, AI citations and enquiry growth were not measured in this release.

[Google's AI guidance](https://developers.google.com/search/docs/appearance/ai-features) supports ordinary search foundations and useful content. [Google's June 2026 documentation update](https://developers.google.com/search/updates#june-2026) explicitly states that llms.txt does not affect Google visibility/rankings and that FAQ rich results have been removed. The directory is maintained for systems that use it, and the visible FAQs serve buyers; neither is sold as a ranking shortcut.

Homepage Lighthouse mobile simulation: performance 89/100, accessibility 100/100, best-practices 96/100, seo 100/100. This is a local diagnostic run, not field traffic data.
