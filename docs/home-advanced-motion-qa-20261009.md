# Homepage cinematic motion — 2026-10-09

## Scope
Upgrade the existing 18 homepage photographs using Motion 14.0.0 (MIT), from https://github.com/motiondivision/motion. Compared with Lenis; retained native browser scrolling rather than replacing it. No paid Motion+ components or new image/video downloads. Product Design skill applied to existing layout.

## Behavior
- Hero image aperture reveal and staggered copy entrance.
- Desktop hero, industry and detail images have gentle scroll-linked depth (5.5% overscan, vertical movement -2% to +2%).
- Fine mouse input tilts the hero plane and product/finish frames up to 3/4 degrees; pointer exit/cancel/window blur restores position.
- Gallery images reveal once after entering view and loading successfully.
- Touch/narrow layouts use shorter reveals without parallax or pointer tilt.
- Reduced motion and printing show static, fully visible content. No JavaScript is required to see any content or follow links.
- Scroll, reveal and pointer transforms use separate layers. Preference/viewport changes dispose listeners, animations and committed inline styles.

## Validation
- Production build and full release checks pass: 560 sitemap pages, 480 product pages, 51 guides; studio/quote/consent checks pass.
- Browser: 1440 and 390 px widths, no horizontal overflow; no console errors.
- Mouse movement produces perspective transform; leaving resets it.
- Scrolling from 0 to 211 px changes hero transform, confirming scroll linkage.
- Desktop-to-mobile transition tested; final image transform is none.
- Reduced-motion mode clears motion marker, clip and transforms.
- JavaScript disabled: all 18 images, title and quote links remain in static HTML.
- Existing packaging subjects, metadata, links, commercial copy and image assets preserved.
- Motion component built chunk approximately 20 KB / 8 KB gzip (not a whole-site payload measurement).

## Evidence
Screenshots: ../mtt-home-advanced-motion-20261009/desktop.png, craft.png, mobile.png (local workspace evidence).
Third-party notices: public/licenses/motion.txt.
Deployment will be verified independently using GitHub Actions and the production revision file.
