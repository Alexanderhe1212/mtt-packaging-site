# Packaging Studio design QA — 2026-10-09

## Approved reference and design contract

The user selected option 3: a cream MTT header, four numbered steps, forest-green live preview and a white dimension panel. The real, editable 3D preview replaces the static presentation image. Keep the original Design Your Box URL and use the existing enquiry channels. Product dimensions and internal box dimensions must remain distinct, editable units must preserve physical dimensions, and the resulting specification must follow the buyer into the enquiry.

The user's final correction asked for less screen space below the tool. The guidance is now a native, default-closed disclosure with roughly 55 CSS pixels in the tested desktop viewport. Full guidance remains available on demand and in server-rendered HTML. The full-screen utility link has reduced padding.

## Evidence and checks

- Compared selected option 3 and the implemented Size view at the same 1487 × 1058 viewport. Retained split proportions, colours, typography hierarchy, dimensions, formula and primary CTA.
- Reviewed desktop Size, Design and Quote views, and narrow-screen Size, Design and Quote views. No substantive horizontal overflow. Narrow preview framing adapts to the camera aspect ratio so the complete box remains visible.
- Browser-verified editing 180 → 200 mm, internal result 190 → 210 mm, conversion to centimetres without changing physical size, zero-value rejection, and subsequent recovery. Invalid inputs hide the obsolete preview and block progression/save.
- Browser-verified artwork text placement, project save/reopen, quote specification and decoded WhatsApp draft. No live test enquiry was sent.
- Browser-verified the production-build calculator handoff: 180 × 120 × 50 mm and 5 mm per-side allowance become 190 × 130 × 60 mm internal in a separate project, retaining the original product measurements. Quantity remains unspecified when the calculator provides no exact quantity.
- Tested the embedded studio at narrow and desktop widths, step-based height updates and the guidance disclosure opening/closing. The iframe height decreases when moving from the structure grid to Size.
- Nine automated tests pass: dimensions, unit round trips, input bounds, known internal dimensions, calculator handoff validation, legacy project compatibility, identical enquiry specifications, submission validation and explicit provider acceptance.
- Full static build and repository release checks pass: 560 sitemap pages, 480 bilingual product pages, 51 guides, thumbnail references, consent, quote retry and crawl paths. Test transports are mocked and do not send messages.
- Browser console inspection returned no errors during the tested flow.

## Issues found and resolved

| Priority | Finding | Resolution |
|---|---|---|
| P1 | Previous calculated results could remain after input changes | Clear stale calculator outputs; revalidate design size before saving or sending |
| P1 | Changing calculator units could reinterpret input values | Convert physical measurements, including advanced sheet and dieline fields |
| P2 | Narrow-screen 3D box clipping | Fit the complete bounding box to camera aspect ratio |
| P2 | Embedded dialog centred below the visible browser area | Position at the top of the studio and scroll the containing frame into view |
| P2 | Large permanently visible guidance below designer | Default-closed accessible details section with compact spacing |
| P2 | Imported calculator project described as a starting example | Restrict example note to the unnamed starting project |

No unresolved P0, P1 or P2 issue in the tested release scope.

## Known boundaries

3D proportions, finishes and reference layouts are illustrative; this is not manufacturing approval or automatic pricing. Artwork stays local unless the customer shares a file or link. Provider acceptance is not a confirmed production order or mailbox-delivery guarantee. Keyboard-labelled controls and a native dialog were inspected, but a complete assistive-technology certification was not performed. Screenshots and test logs are retained with the October 9 local release evidence.
