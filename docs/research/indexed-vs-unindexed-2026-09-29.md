# Indexed vs unindexed sample comparison — 2026-09-29

## Evidence and limits

GSC report snapshot says last updated 2026-09-21: 174 indexed, 481 excluded, including 356 discovered/not indexed and 31 crawled/not indexed. Excluded also includes canonical alternatives, redirects and parameter URLs; 481 is not a count of pages requiring content expansion. Current URL inspections and current site crawls were kept separate from this delayed report.

Used seo-audit workflow and the free open-source [advertools](https://github.com/eliasdabbas/advertools) 0.16.6 crawler in an isolated temporary Python environment. Ten public URLs were fetched across two runs, with concurrency 2 and 0.5-second download delay. All returned HTTP 200. The crawler tests delivery and on-page signals, not Google's indexing decision. Reusable runner: scripts/audit-indexing-samples.py. Raw local evidence: output/index-comparison-20260929/*.jl.

Word counts are regex counts of text under main, including navigation/footer where nested in main, related products and specification labels. They are comparable extraction counts, not an exact count of unique editorial prose.

| URL path | GSC evidence | Current main words | Current canonical / robots |
|---|---|---:|---|
| /packaging/custom-rigid-boxes | Live inspection: indexed | 3471 | Self / index, follow |
| /industries/cosmetics-skincare-packaging | Live inspection: indexed | 1213 | Self / index, follow |
| /products/custom-Christmas-ornaments-divided-mailer | Indexed examples, crawl Sep 22 | 642 | Self / index, follow |
| /products/statement-cuff-gift-shoulder | Indexed examples, crawl Sep 22 | 659 | Self / index, follow |
| /products/holiday-hamper-layers-tiered | Indexed examples, crawl Sep 22 | 681 | Self / index, follow |
| /products/signature-perfume-lift-off | Live inspection: crawled/not indexed; Sep 12 crawl successful | 758 | Self / index, follow |
| /products/skincare-ritual-collapsible-magnetic-rigid-box | Live inspection: crawled/not indexed; Sep 21 crawl successful | 986 | Self / index, follow |
| /products/custom-wrapped-mooncakes-window-tuck | Crawled/not indexed examples; Sep 21 | 682 | Self / index, follow |
| /insights/molded-pulp-inserts-cosmetic-packaging | Index status not inspected | 1131 | Self / index, follow |
| /request-a-quote?product=MTT-R0501&product_family=rigid | Representative parameter variant, not individually inspected | 418 | /request-a-quote / index, follow |

The current unindexed samples are not shorter than the indexed product controls. No HTTP, canonical or noindex blocker was reproduced in these samples. Successful crawling is not sufficient for indexing. GSC did not identify an exact quality defect, so content differentiation and recrawl latency remain hypotheses, not proven rejection reasons. The skincare buyer guide was expanded Sep 28, after Google's recorded Sep 21 crawl.

Static inbound-link sources before this release: perfume 49, skincare 4, mooncake 2 (canonical HTML pages, duplicate directory/index.html copies excluded). The perfume page is not an orphan; more links alone are not a diagnosis. Mooncake links were only the folding-carton directory and Chinese counterpart. Product directories contain many links and should not be mistaken for editorial recommendations.

## Targeted changes

- Perfume: clarify separate lid vs hinged box vs folding carton; separate opening fit from bottle retention; specify actual-sample foil/scuff review and relevant RFQ inputs. No universal clearance or verified transit claim.
- Mooncake: add bilingual buyer guidance for wrapped-unit fit, display alignment, film placement, alternatives and sample checks; replace generic title/meta with product-specific wording. Do not imply bare-food contact or shelf-life performance.
- Skincare: preserve recent substantive copy; link its insert discussion to the relevant molded-pulp guide. No repeated expansion merely to reach a word target.
- Rigid-box and folding-carton hubs: add brief contextual comparisons linking to the three designs. Existing URLs and self-canonicals retained.
- Update lastmod only for changed routes; request canonical English product URLs, not quote query variants.

## Editorial review

Audience: packaging buyers comparing a fragrance bottle presentation box, mixed-height skincare set, or seasonal wrapped-food carton. Demand evidence is actual GSC exclusion plus the existing product taxonomy; no claimed keyword volumes. Primary intent is selecting and briefing the specific structure, not publishing another broad guide.

Engineering judgments are conditional review instructions based on the visible product specifications; they do not claim an MTT completed case. [ISTA test procedure guidance](https://ista.org/test_procedures.php) supports matching a test to the distribution environment and evaluating product/package combinations, not declaring these untested concepts transit-qualified. No regulation, certification, customer result or guaranteed saving is asserted.

Information gain: decision comparison, product-specific failure risks, physical sample checklist and RFQ inputs. Score (subjective editorial gate, not predicted ranking): customer problem 10/10, insight 17/20, technical usefulness 18/20, writing 14/15, SEO 9/10, GEO 8/10, trust 10/10, conversion 5/5 = 91/100. No unresolved factual claim identified.

## Validation and submission

Pending completion below. Google [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) states that requests do not guarantee inclusion; repeated requests for the same URL do not accelerate crawling. Record each actual receipt separately from indexed status.

- Static export and complete release checks passed (554 sitemap pages). Desktop 1440px and mobile 390px preview showed no horizontal overflow; new guide and metadata present.
