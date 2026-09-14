# Phase six — GitHub-supported performance and SEO release checks

2026-09-14. Rollback: 27a30e8. No new content claims, product designs or URL changes.

## Open-source selection
- Adopted and pinned GoogleChrome/lighthouse-ci (`@lhci/cli` 0.15.1, Apache-2.0), extending the existing configuration from four to six representative URLs, including the catalogue and product detail. https://github.com/GoogleChrome/lighthouse-ci
- Configuration reference: https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
- Reviewed lycheeverse/lychee (MIT/Apache-2.0) but did not add another link checker: the existing static validation already checks the 494-site-page local link graph. https://github.com/lycheeverse/lychee
- Declared the already-used sharp 0.34.5 explicitly as a development dependency for reproducible thumbnail generation. https://github.com/lovell/sharp

Lighthouse is development-only, not downloaded by website visitors. Reports stay on the local filesystem; no public report upload, paid server or new scheduled task.

## Evidence and fixes
The initial detail-page audit identified approximately 154 KiB responsive-image savings and a missing high-priority hint for the main image. Five small gallery buttons requested full-size images. They also repeated the same accessible image/button label.

The build now derives 160px WebP thumbnails for all 217 designs / 1,085 views, using the originals without cropping or altering artwork. Existing originals remain the gallery's main views and schema image references. Main display images get high fetch priority. Buttons retain visible labels; redundant decorative thumbnail alt text is empty.

Combined source image bytes: 47,395,096. Combined thumbnail bytes: 4,014,132 (91.5% smaller). This is a thumbnail asset comparison, not a 91.5% reduction in total page weight. All original source images are preserved. Thumbnail generation runs on every build, updating changed sources.

## Repeatable checks
1. `MTT_STATIC_EXPORT=1 npm run build`
2. `npm run check:release` — static SEO/link checks, catalogue schema/handoff checks, retry behavior and thumbnail presence/dimensions.
3. `npm run audit:site` — Lighthouse collect/assert/local reports. SEO minimum .95; accessibility/performance thresholds remain warnings (.98/.80). Report warnings honestly rather than lowering thresholds to hide failures.

One production build, TypeScript, all 494 static pages, 434 product pages, 1,085 thumbnail files and enquiry regression checks passed. Six Lighthouse reports exported locally. SEO 100 across all six sampled routes. Product detail local performance 83 → 92 and LCP about 3.7 → 2.9 seconds; one simulated mobile run before/after, not a controlled field experiment. Catalogue 88 → 90 is recorded without attributing that small variation to these changes.

Browser checked loaded thumbnail sources, full-size image switch and 390px mobile layout (no horizontal overflow). Desktop 1280px also has no overflow. No enquiry was sent.

## Remaining findings
Builder performance 78/accessibility 96 and rigid-family accessibility 96 remain warnings for a later focused pass. Homepage image-delivery opportunity remains; do not replace the unapproved homepage alternative or globally lower product image quality to chase scores. These audits do not establish ranking, AI citations, indexing or visitor conversion gains. Today's Search Console quota was already exhausted; no new manual indexing submissions are claimed.

Deployment uses the existing committed static archive and Pages workflow, with post-deploy verification.
