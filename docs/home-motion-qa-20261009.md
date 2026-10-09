# Homepage image motion — 2026-10-09

## Scope and design
Preserve the existing MTT homepage composition, photography, copy, metadata and destinations. Add motion to 18 existing photographs: hero (1), packaging families (4), industries (4), finishes (6) and packaging details (3). The Packaging Studio is unchanged.

- Hero: one 1.5-second scale/settle entrance; stays fully opaque.
- Other photographs: one 0.9-second gentle lift and fade from 65% opacity on entering the viewport.
- Fine-pointer hover: 2.5% detail zoom, contained within each image area.
- Narrow screens: shorter entrances. No scroll listeners, repeated background animation or new media.
- Progressive enhancement: all server-rendered photos remain visible without JavaScript or IntersectionObserver. Reduced-motion preference, including changes during the visit, disables entrances and transforms. Print remains static.

## Verification
- `MTT_STATIC_EXPORT=1 npm run build`: passed.
- `npm run check:release`: passed, including all 560 sitemap pages, 480 bilingual product pages, 51 guides, consent, enquiry retry and Studio checks.
- In-app browser: desktop layout at 1309 CSS pixels and mobile at 390 CSS pixels; no horizontal overflow. Existing browser zoom means viewport override values differ from CSS pixels.
- Before/after desktop screenshots: original layout and images retained.
- Hero loaded; 18 motion targets present. Scrolling to product grid changed the entered count from 1 to 5. Image transforms settle back to none; hover sampled at scale 1.02033 during transition toward 1.025.
- Emulated reduced motion dynamically cleared all entrance classes and returned checked images to opacity 1, animation none, transform none.
- JavaScript disabled and page reloaded: all 18 image elements still present; hero loaded and opaque; quote destination retained.
- Mobile packaging-detail images loaded and entered as they reached the viewport. Product-card click reached the existing custom rigid boxes page.
- No browser console errors recorded for the checked flows.
- Added client chunk: 995 bytes, 561 bytes gzip. No new dependencies or media. This is a payload measurement, not a field Core Web Vitals result.
- Evidence screenshots: local `mtt-home-motion-20261009` directory beside the release source.

Content and structured data are unchanged; no new factual or editorial claims were introduced. No form submission was made during QA.
