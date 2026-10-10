## Quality Review: Internal vs External Box Dimensions: How to Measure

### Overall Score: 93/100 - Exceptional

Independent review completed 2026-10-10; final narrow rereview completed after the portrait-diagram rebuild on the same date. Scope: `lib/dimension-guide-october-10.json`; rendered `dist/client/insights/measure-packaging-internal-external-dimensions/index.html`; `public/design/guides/box-dimensions-layers.svg`; `tools/packaging-studio/app/lib/size-plan.mjs`; current repository instructions; official FEFCO and FedEx sources. Only this review file was written by the reviewer.

| Category | Score | Max | Evidence |
|---|---:|---:|---|
| Content Quality | 26 | 30 | Clear measurement task; four-record matrix; distinct product/insert/closed-box/shipping checks; reproducible calculations; useful limitations. Technical vocabulary makes the prose harder for first-time buyers. |
| SEO Optimization | 25 | 25 | One H1, eight purposeful body sections, working contents links, descriptive stable URL, matching metadata, five contextual internal links and relevant first-party citations. |
| E-E-A-T Signals | 12 | 15 | Official sources verified and retrieval date visible; exact calculator behavior checked; no invented first-hand claims. Corporate editorial attribution is truthful but lacks an individual responsible editor/bio and public editorial-policy link. |
| Technical Elements | 15 | 15 | Content-matched Article/Organization/BreadcrumbList graph, two semantic tables, complete social metadata, WebP hero and lightweight vector diagram with appropriate alt text. Speed and responsive-browser evidence N/A and excluded before reweighting. |
| AI Citation Readiness | 15 | 15 | Direct 64-word Quick Answer, clear measurement entities, self-contained formulas and boundaries, static HTML, accessible crawler rules. No claim of actual indexing or AI citation. |

### Rating: 90–100 Exceptional

**No P0 issues identified. Zero P0.** No unsupported numerical claim, invented MTT result, universal clearance/tolerance promise, misleading source attribution, broken article structure or observed plagiarism risk was found. There is no editorial or factual blocker in the reviewed article. A passing editorial score does not establish that separate build, browser or deployment checks have passed.

### Scoring basis and unavailable metrics

- Content: coverage 7/7; readability 4/7; originality/differentiated synthesis 4/5; sentence/paragraph structure 4/4; examples/engagement 4/4; grammar/clarity 3/3 = 26/30.
- SEO: headings/navigation 5/5; title 4/4; topic consistency 4/4; internal links 4/4; URL 3/3; meta description 3/3; external linking 2/2 = 25/25.
- E-E-A-T: attribution 2/4; citations 4/4; trust indicators 3/4; evidence basis 3/3 = 12/15. Do not invent personal authorship or credentials to recover points.
- Technical: schema 4/4; image optimization 3/3; structured elements 2/2; social metadata 2/2 = 11/11 assessed points. **Page speed: N/A. Mobile friendliness: N/A.** Reweighted category = 11 ÷ 11 × 15 = 15. The main agent reported no mobile document overflow or broken loaded images before the final diagram refinement. That check identified small diagram labels and led to the portrait SVG revision. A browser capture of the final portrait diagram and performance measurements were not supplied at this narrow rereview, so mobile and speed remain N/A rather than being inferred.
- The MTT-specific skill permits appropriate Article and Organization schema. An empty FAQ array correctly results in no FAQPage entity; adding artificial FAQs or BlogPosting solely to gain a schema count is unnecessary.

### Official-source verification

1. **FEFCO, current official landing page and 12th-edition PDF.** The [official FEFCO Code page](https://www.fefco.org/technical-information/fefco-code) identifies the shared corrugated design system and links to the [12th-edition PDF](https://www.fefco.org/sites/default/files/files/styles/thumbnail/public/FEFCO%20Code_WEBprotected.pdf). Both were accessed on 2026-10-10. The PDF returned HTTP 200, 30,621,860 bytes and 145 pages. Page 4 explicitly sets out internal dimensions in millimetres and the L × W × H sequence, with opening-based axes and design-specific exceptions. This supports `lib/dimension-guide-october-10.json:22,46`. The article correctly tells readers to identify the opening and match the chosen style instead of extending the convention to every bag or gift box.
2. **FEFCO precision boundary.** Page 4 also describes controlled-condition measurements of the flat blank from crease centers, accounting for material thickness. The article does not present its assembled-sample checks as a complete normative FEFCO inspection procedure. Its general physical-fit advice is therefore not a contradiction. A short clarification could help a purchaser specifically ordering to the code; it is not a factual blocker for this guide.
3. **FedEx.** The [official dimensional-weight guide](https://www.fedex.com/en-us/shipping/packaging/what-is-dimensional-weight.html), accessed on 2026-10-10, supports the greater-of actual/dimensional-weight explanation in `lib/dimension-guide-october-10.json:38`. The article deliberately leaves carrier-specific measurement, rounding and divisor rules to the selected service and market. It does not promise that one divisor or calculator setting applies worldwide.

The responsible standards organization and carrier are the appropriate primary sources here. Their authority for these claims is more relevant than the reviewer template's examples of SEO publishers. No third-party blog was used to establish the load-bearing technical claims.

### Engineering and calculation checks

| Check | Independent result | Finding |
|---|---|---|
| Product 180 × 120 × 50 mm; 5 mm per side | 180 + 10 = 190; 120 + 10 = 130; 50 + 10 = 60 mm | All three table rows correct. |
| Live module, `planSize(..., 'product', 'mm')` | `{length:190,width:130,height:60}`, product dimensions retained, clearance 5 mm | Article matches `size-plan.mjs:16–25`, especially line 23. |
| Internal mode on 190 × 130 × 60 mm | Same internal dimensions, no extra allowance, clearance result 0 | Article accurately distinguishes product-size and agreed-cavity modes. |
| Centimetre equivalent: 18 × 12 × 5 cm; 0.5 cm per side | 190 × 130 × 60 mm | Unit conversion preserves the same physical size. |
| 250 × 180 × 100 mm parcel | 0.25 × 0.18 × 0.10 = 0.0045 m³ | Correct geometric volume. |
| 100 identical parcels | 0.0045 × 100 = 0.45 m³ | Correct; explicitly excludes palletisation/consolidation packaging. |

- The arithmetic is framed as planning, not verified engineering. The 5 mm example is explicitly **not** a recommended tolerance, protective cushion, secure grip or established insert thickness.
- Distinguishing intentional allowance from permitted manufacturing variation is correct. Checking limiting product/packaging combinations is more useful than relying on nominal cavity size alone.
- Maximum product envelope, cap/pump/protrusion inclusion, orientation, set layout, safe support surfaces, removal access and observed-versus-specified dimensional variation are all relevant buyer judgments. A few measured samples are not falsely promoted into a production tolerance.
- Internal-to-external conversion is correctly conditional. Wrapped corners, doubled panels, nested lids and drawer sleeves prevent a universal finished-size rule based on twice one board thickness. The article does not claim the simplified straight-wall relationship is always wrong.
- Paper-bag fit is tied to the actual closed box and loading orientation, not cavity dimensions. Shipping is tied to the final filled/sealed transport pack, with actual packed weight kept separate.
- No code correctness claim is made beyond the article-relevant calculations exercised above. This was not a complete audit of the studio or every calculator pathway.

### Diagram and rendered-page inspection

- The final SVG was rasterized in memory and visually inspected at its native 600 × 780 size. Its revised portrait layout has no text overlaps and uses substantially larger relative labels. The rendered article declares the matching 600 × 780 intrinsic dimensions and limits display width to 600 px. Product boundary, internal cavity and finished outer boundary are distinct and legible; the arrows correspond to those spans. The schematic explicitly excludes scale and manufacturing-drawing status.
- The diagram's three records do not conflict with the article's four-record matrix: the diagram covers product, internal and finished external boundaries, while the article separately defines the shipping pack. Its footer instructs readers to repeat for width and height. It illustrates a planar boundary relationship rather than pretending to show lid-height clearance.
- The hero image was visually inspected: rigid fragrance presentation box, fitted bottles and matching bag agree with its alternative text. It is not offered as measurement, transit-test or customer-order evidence.
- Rendered counts: **one H1, eight numbered body sections, two tables, one in-body diagram, one hero illustration, zero FAQs**. Both tables have captions and scoped headers. The vector is lazy-loaded; the hero is not.
- The JSON-LD graph parses and contains Article, Organization and BreadcrumbList. Headline, description, entity URL, dates and organization attribution match the visible article. DatePublished and dateModified are both 2026-10-10 in this new-page build; this is not proof of a live publication date.
- Title, description, canonical, Open Graph and Twitter card fields agree with the article. All local page-link destinations exist after stripping query/fragment components. All in-page links resolve. Referenced images exist.
- Five contextual internal links cover irregular-glass inserts, the workbench, material selection, the volume calculator and sample approval. Their anchors describe their destinations.
- The article is present in static HTML. Built robots.txt permits general crawling. No statement is made about actual crawler visits, indexing or ranking.
- This is source, rendered-HTML and image inspection. It does **not** substitute for a responsive browser pass or measured performance evidence.

### Buyer usefulness and overlap

The reader decision is concrete: label and measure the correct boundary before asking for a quote, planning a cavity, matching a bag or estimating shipping volume. The guide adds at least six information-gain forms: terminology matrix, engineering judgment, schematic, worked calculation, failure examples and approval checklist.

The related guides address different tasks: handmade-glass insert variability; full sample approval; assembled-versus-flat freight volume and labour; or selection among box families. This article owns measurement basis and the product-to-cavity-to-outside chain. An exact-sentence check across the other built Insights bodies found **no matching sentences of ten or more whitespace-separated words**. This bounded comparison does not prove web-wide originality and is not a plagiarism certification.

The commercial next step requests a dimensioned product image, filled weight, quantity, opening and destination, and states that MTT can review assumptions and plan a structural sample. It does not imply a finished production specification, guaranteed fit or factory ownership.

### Editorial Style Diagnostics

- Authored content contains **1,328 English alphabetic word tokens**, counting hyphenated words as one token, including intro/body/CTA and table wording but excluding section headings, navigation, footer and product cards.
- Prose sample: **78 sentences**; sentence-length variation (population SD / mean) **0.3737**; vocabulary-diversity sample **0.4021**.
- Flesch Reading Ease **44.42** and Flesch-Kincaid grade **10.69**, measured using installed textstat on prose. Technical terms contribute to the reading burden; the text does not meet the generic 60–70 ease target.
- No conspicuous stock promotional opener, unsupported superlative or generic conclusion was found. The source/boundary section adds provenance rather than repeating a marketing conclusion.
- Burstiness and vocabulary metrics are descriptive only: they do not identify authorship or affect the score. Readability is scored separately under the explicit readability criterion.

### Repository eight-category assessment

| Criterion | Score | Maximum | Evidence |
|---|---:|---:|---|
| Customer problem clarity | 10 | 10 | Measurement ambiguity and its procurement consequences are explicit from the opener. |
| Original insight | 18 | 20 | Useful synthesis, original schematic and reproducible tool-linked example; no claim of proprietary research. |
| Technical usefulness | 19 | 20 | Correct math and structural caveats; formal FEFCO measurement method could receive a short scope note. |
| Human writing | 13 | 15 | Direct, specific and restrained; technical vocabulary and a few long abstractions reduce ease. |
| SEO | 10 | 10 | Clear intent, title, H1, metadata, URL, internal links and matching schema. |
| GEO | 10 | 10 | Self-contained definitions/calculations with scope and evidence; structured static content. |
| Trust / claim safety | 9 | 10 | Verified primary sources and explicit illustrative assumptions; corporate attribution remains basic. |
| Conversion | 5 | 5 | Relevant minimal brief inputs and a bounded sample-review next step. |
| **Total** | **94** | **100** | Editorial eligibility; separate release checks still required. |

These are reasoned editorial judgments, not objective measurements of search performance. The repository threshold is 85/100 with no unresolved factual claims; the stricter independent skill threshold is 90/100 with no P0. This draft satisfies both editorial thresholds.

### Issues Found

#### Critical (must fix before publishing)

- None. **No P0** and no unresolved factual or misleading claim found.

#### High (should fix)

- None in the assigned article/source/diagram scope. Browser, build and deployment results remain separate evidence requirements and are not inferred here.

#### Medium (recommended, nonblocking)

1. **Resolved in final rereview — sections 5 and 7 (`lib/dimension-guide-october-10.json:34,42`).** "Outside span" is now "outside measurement" and the nominal-size caveat now explicitly checks the largest permitted product against the smallest permitted cavity. Both changes are present in the final built HTML and preserve the engineering meaning. Necessary tolerance/allowance terminology remains intact.
2. **Accountable attribution — rendered byline.** Retain the truthful corporate byline. Add a public organizational editorial policy or a real approved responsible editor/bio when available; do not invent personal authorship or credentials.

#### Low (nice to have, nonblocking)

1. **FEFCO inspection scope — section 2 (`lib/dimension-guide-october-10.json:22`).** If this article later serves a formal code-based specification, add a sentence that the FEFCO technical page also defines controlled-condition crease-based blank measurements, while this guide's assembled checks verify usable product fit. The current wording does not falsely claim completeness.
2. **Diagram mobile legibility — `box-dimensions-layers.svg`.** The final 600 × 780 portrait SVG corrects the small relative label size seen in the earlier mobile check. Native-size visual review is clean, and final HTML has width:100% with max-width:600px. A final narrow-viewport visual check should confirm the actual result; this reviewer does not claim that check has already happened.

### Prioritized Fix List

1. Retain required build/release results and complete responsive browser QA for tables and the diagram before publication.
2. The two requested plain-language refinements are complete and verified; no further prose edit is required for clearance.
3. Improve author/process transparency only from verified organization information.

### Final narrow rereview

The rebuilt article is present and contains both approved wording refinements plus the 600 × 780 image attributes and 600 px maximum display width. The built SVG bytes exactly match the reviewed source SVG. No other claim change was reported or found in this limited rereview. The main agent reports that release checks passed before these refinements (561 pages, 52 guides); this report does not silently treat that earlier check as the final rebuilt release result. Scores and no-P0 clearance remain unchanged.

### Reviewed snapshot

- Article JSON SHA-256: `c22886f325660d377aa8cc74da26f2e7c4ffaff865c5ceb9fdf74aa1e991f22e`
- Built HTML SHA-256: `10d69c27ac931b6e17837c3f8d8bb58faedde88c02566aafd6f4413d6255c912`
- SVG SHA-256: `6150479e81d2202097327fb38170cc64caa8e34501cf150db9158229da1f1540`

Nonce: 86a934d6975d3ee018d7e84a50bfeccc
BLOCKING: false (93/100 independent editorial score, no P0 and no unresolved factual claim; speed/mobile N/A and reweighted, separate browser/build/release gates remain required)
