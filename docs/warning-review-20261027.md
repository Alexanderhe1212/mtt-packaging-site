# Remaining warning review — 2026-10-27

The current local lint result is 77 warnings and zero errors. These are static-analysis suggestions, not 77 demonstrated website failures. This release does not disable rules or claim the warnings are eliminated.

## Image suggestions: 60

All reported native image call sites were inspected. The static GitHub Pages deployment has no server image-optimization endpoint. Replacing native images with a server-dependent component is not an appropriate blanket fix. Native images support existing static WebP files, srcset/sizes, explicit dimensions and lazy loading. Product images and studio previews also have reserved CSS containers.

Actual improvement in this release: six page hero images (About, How We Work, Insights, Packaging, Chinese home and Folding Cartons) had no responsive selection despite smaller files already being available. They now expose real 480/800/1440-width candidates as applicable. Original URLs, alt text, content, layout and canonical URLs remain intact. The existing 800px variants are 70.1% (hero), 77.9% (development table) and 78.1% (carton) smaller in file bytes than their originals. These are asset comparisons, not measured page-speed, traffic or conversion gains. Browser selection depends on display density and cached candidates.

A release check verifies all six static HTML references, actual candidate widths and smaller file bytes. No new images or dependencies are required. The generic native-image warnings remain visible, including on already responsive images.

## State synchronization: 8

- CalcQuoteSummary: reads optional session storage after hydration; does not clear it until an accepted enquiry.
- CookieConsent: reads stored choice and privacy signals after hydration, and subscribes to reopening/storage events. Do not move browser reads into server rendering or silently change consent.
- LanguagePicker: reads the route, saved language and browser preference after hydration. Do not force a locale redirect merely to remove a warning.
- ProductCatalogue: initializes bookmarked family/structure filters from the URL after hydration. Existing EN/ZH family, clear-filter and product-return tests exercise this flow.
- StudioApp: reads the calculator handoff and asks before replacing the active project.
- DynamicBoxThumbnail (two warnings): initializes visibility without IntersectionObserver and resets the cached preview when its key changes. GPU rendering remains deferred with cancellation and one shared renderer.
- FoldingPreview: reports GPU/setup failure from the rendering effect; flat layout remains available.

These call sites synchronize browser-only external state or report rendering failures. Their bounded lifecycle behavior is not evidence of an infinite render loop. A broader state rewrite solely to reduce this count would affect consent, saved work or preview fallback. Retain visible warnings and existing browser/consent tests; investigate independently if a reproducible defect is found.

## Navigation and operational scripts: 9

Two calculator location.assign calls intentionally load same-origin static pages after saving a handoff. Client-only routing is not necessary to preserve this flow. Keep full navigation and error handling.

Seven files in work/ are browser-console navigation helpers; a trailing string is their console result. They are not imported into the website bundle. Keep their behavior rather than delete their result or broadly exclude work/ from lint.

## Validation and limits

Use the existing build, type, release and GitHub browser/Lighthouse gates. Validate the six pages at mobile and desktop widths and compare deployed resources. Search indexing, mail delivery, actual enquiries and conversion gains are separate and are not established by these checks.
