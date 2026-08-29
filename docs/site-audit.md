# MTT Packaging Website Audit

> Generated: 2026-08-29
> Auditor: Claude Code
> Scope: Full source code audit before optimization

---

## 1. Framework / Stack

| Component | Current | Notes |
|-----------|---------|-------|
| Framework | Next.js 16.2.6 | Static export mode |
| Build Tool | vinext 1.0.0-beta.3 | Vite-based Next.js alternative |
| CSS | Tailwind v4.2.1 | PostCSS plugin |
| Language | TypeScript 5.9.3 | |
| Deployment | GitHub Pages | Via GitHub Actions |
| CDN | EdgeOne (Tencent Cloud) | Currently pointing to GitHub Pages |
| Hosting | Static HTML | No server-side rendering |

**Issue**: vinext beta version — static export has known issues with `trailingSlash: true` causing 308 redirect errors on dynamic routes.

---

## 2. Routing Structure

| Route | Type | File |
|-------|------|------|
| `/` | Static | `app/page.tsx` |
| `/packaging` | Static | `app/packaging/page.tsx` |
| `/how-we-work` | Static | `app/how-we-work/page.tsx` |
| `/sustainability` | Static | `app/sustainability/page.tsx` |
| `/insights` | Static | `app/insights/page.tsx` |
| `/insights/[slug]` | Dynamic | `app/insights/[slug]/page.tsx` |
| `/industries/[slug]` | Dynamic | `app/industries/[slug]/page.tsx` |

**Missing Pages** (per prompt requirements):
- `/request-a-quote/` — Dedicated RFQ page
- `/about/` — About / trust page
- `/quality-control/` — QC page
- `/case-studies/` — Case studies hub
- `/contact/` — Dedicated contact page
- `/custom-packaging/` — Main product hub
- `/rigid-boxes/` — Product category
- `/magnetic-closure-boxes/` — Product category
- `/drawer-boxes/` — Product category
- `/folding-cartons/` — Product category
- `/custom-inserts/` — Product category
- `/paper-bags/` — Product category
- `/perfume-packaging/` — Industry page (currently `/industries/perfume-fragrance-packaging/`)
- `/cosmetic-packaging/` — Industry page
- `/skincare-packaging/` — Industry page
- `/jewelry-packaging/` — Industry page
- `/candle-packaging/` — Industry page
- `/gift-packaging/` — Industry page
- `/packaging-guide/` — Content hub
- `/thank-you/` — RFQ confirmation page

---

## 3. Homepage Analysis

### H1
```
Premium Packaging, Engineered Around Your Product.
```
**Severity: P0** — H1 is brand-focused, NOT keyword-optimized. Should target "Custom Luxury Packaging Manufacturer" or similar commercial keyword.

### H2 Tags (11 total)
1. "Packaging starts with what you need to protect."
2. "Packaging developed for fragrance, beauty, jewelry and gifting."
3. "Real production should show the detail."
4. "Clear decisions before production begins."
5. "Your direct contact for custom packaging."
6. "From product to delivered packaging."
7. "Production evidence, not generic claims."
8. "Touch, structure and protection."
9. "Before you request a custom quote."
10. "Have a Packaging Project?"

**Severity: P1** — H2s are poetic but NOT keyword-optimized. Should include commercial terms like "Custom Rigid Boxes", "Luxury Perfume Packaging" etc.

### CTAs
| Location | Text | Target | Assessment |
|----------|------|--------|------------|
| Hero | "Request a Quote →" | `#quote` (homepage section) | ✅ Good |
| Hero | "View Production Portfolio ↓" | `#projects` | ⚠️ Could be stronger |
| Hugo section | "WhatsApp Hugo ↗" | WhatsApp link | ✅ Good |
| Hugo section | "Email Hugo →" | `mailto:info@mttpackaging.com` | ⚠️ mailto: is unreliable |
| Quote section | "Send Brief →" | mailto: | ❌ P0 — Form submits via mailto: |
| Quote section | "WhatsApp Hugo ↗" | WhatsApp | ✅ Good |
| Footer | Business email | mailto: | ✅ Acceptable |

---

## 4. RFQ Form Analysis

**Current Implementation**: `app/page.tsx` lines 86-115

### Fields
- Name (required)
- Company
- Industry (select)
- Packaging Type (select)
- Estimated Quantity (select)
- Country
- Message

### Critical Issues

| Issue | Severity | Impact |
|-------|----------|--------|
| Form submits via `mailto:` | **P0** | No server-side processing. Relies on user's email client. Many mobile users won't have email configured. No backup storage. No conversion tracking. |
| No file upload | **P0** | Buyers cannot submit artwork files (PDF, AI, EPS) |
| No business email field | **P1** | Cannot follow up directly |
| No thank-you page | **P1** | No conversion tracking, no next-step guidance |
| No spam protection | **P1** | Vulnerable to spam submissions |
| No validation beyond "required" | **P2** | Could receive incomplete inquiries |
| No dedicated /request-a-quote/ page | **P1** | RFQ buried at bottom of homepage |

---

## 5. Metadata Audit

### Homepage
| Field | Value | Assessment |
|-------|-------|------------|
| title | "MTT Packaging \| High-End Custom Packaging by Hugo He" | ⚠️ "by Hugo He" wastes title space |
| description | "Work directly with Hugo He at MTT Packaging for high-end custom rigid boxes, gift packaging, folding cartons, paper bags and precision inserts." | ⚠️ Person-focused, not product-focused |
| canonical | "/" | ✅ |
| OG title | "MTT Packaging \| High-End Custom Packaging" | ✅ |
| OG description | "Premium custom packaging for serious business, personally handled by Hugo He." | ⚠️ |

### Layout Metadata (`app/layout.tsx`)
| Field | Value | Assessment |
|-------|-------|------------|
| authors | Hugo He | ✅ |
| email | info@mttpackaging.com | ✅ Fixed |
| robots | index, follow | ✅ |
| category | "Custom Packaging" | ✅ |

---

## 6. Structured Data

### Homepage JSON-LD
- ✅ Organization
- ✅ WebSite
- ✅ Person (Hugo He)
- ✅ Service
- ✅ FAQPage

### Industry Pages
- ✅ Service
- ✅ Organization
- ✅ BreadcrumbList
- ✅ FAQPage

### Article Pages
- ✅ Article (with datePublished, dateModified)
- ✅ Organization
- ✅ BreadcrumbList
- ✅ FAQPage

**Missing**: Product schema for packaging solutions, AggregateRating (if reviews exist)

---

## 7. Internal Linking

### Current Link Map
```
Homepage → #industries (anchor)
Homepage → #projects (anchor)
Homepage → #process (anchor)
Homepage → #faq (anchor)
Homepage → #quote (anchor)
Homepage → /packaging
Homepage → /industries/[slug] (4 links)
Homepage → WhatsApp
Homepage → mailto:

SiteNav → /packaging, /how-we-work, /sustainability, /insights, /#contact
SiteNav → WhatsApp

Article pages → WhatsApp (CTA)
Article pages → Related articles (2 links)

Industry pages → WhatsApp (CTA)
```

**Issues**:
- No links from homepage to individual article pages
- No links from articles to product pages
- No links from industry pages to related articles
- No links from articles to industry pages
- No breadcrumb navigation visible on pages
- `/insights` page links to articles but no cross-linking to industries

---

## 8. Sitemap

**File**: `app/sitemap.ts`

**Content**: Includes all static and dynamic routes. Dynamic routes generated from `articles` and `industries` arrays.

**Issues**:
- All dates are hardcoded to `2026-08-28`
- No `lastModified` per page
- Priority values are uniform (not differentiated by page importance)

---

## 9. robots.txt

**File**: `app/robots.ts`

**Content**: Allows all, points to sitemap.

**Assessment**: ✅ Correct

---

## 10. Image Optimization

**Issue: P1** — All images use `<img>` instead of Next.js `<Image />` component.

ESLint warnings (20 total) across all pages:
- No automatic optimization
- No responsive srcset
- No lazy loading
- No WebP/AVIF conversion
- No width/height for CLS prevention

**Images used**:
| Image | Size | Used On |
|-------|------|---------|
| capability-rigid-box.webp | Hero | Homepage |
| industry/*.webp | 4 images | Industry grid |
| structure/*.webp | 6 images | Projects section |
| hero/*.webp | 3 images | Page heroes |
| sustainability/*.webp | 4 images | Sustainability |
| selected-work-concepts.png | 1 image | Industry pages |
| og.png | 1 image | Social sharing |

**Placeholder images** (not real project photos):
- Factory photos: "Upload real production photo" placeholders
- Hugo portrait: "HH" placeholder
- Structure references: Marked as "Structure reference · Replace with verified project photo"

---

## 11. CSS Analysis

**File**: `app/globals.css`

**Size**: ~500 lines of CSS in a single file

**Issues**:
- No CSS modules or component-scoped styles
- Heavy use of inline styles in JSX (e.g., `style={{ marginTop: '12px' }}`)
- Responsive breakpoints: 900px, 560px (reasonable)
- No dark mode support
- Custom properties defined but underused

---

## 12. JavaScript Bundle

**Assessment**: Minimal JavaScript. Static export means minimal client-side JS.

**Client-side JS**:
- React hydration
- Form submission handler (mailto:)
- No analytics
- No third-party scripts
- No tracking pixels

**This is good for performance but bad for conversion tracking.**

---

## 13. Analytics / Tracking

**Current**: NONE

**Severity: P0**

No analytics installed:
- No Google Analytics 4
- No Google Search Console verification
- No conversion tracking
- No event tracking
- No UTM parameter capture
- No heat mapping

---

## 14. Mobile Responsiveness

**Breakpoints**:
- Desktop: > 900px
- Tablet: 560px - 900px
- Mobile: < 560px

**Issues**:
- Floating WhatsApp button may overlap content on small screens
- Contact form fields stack properly on mobile
- Navigation collapses on mobile (navlinks hidden)
- Hero section responsive
- Industry grid: 4→2→1 columns
- Project grid: 3→2→1 columns

---

## 15. 404 Page

**File**: `app/404.html` (generated)

**Assessment**: Basic 404 page. No links to key pages, no search, no CTA.

---

## 16. Redirect Chains

**Issue**: vinext with `trailingSlash: true` causes 308 redirects on dynamic routes during build. Currently `trailingSlash` is disabled.

**Risk**: URLs with/without trailing slashes may both be accessible (duplicate content).

---

## 17. Duplicated Content

**Potential Issues**:
- Homepage section anchors (#industries, #projects, etc.) don't create duplicate pages
- Industry pages have unique content ✅
- Article pages have unique content ✅
- No pagination issues

---

## 18. Indexability

**Assessment**: All pages are indexable (no noindex tags). Sitemap includes all routes.

**Risk**: The `__next.*.txt` files in the build output should not be indexed. These are RSC data files that might confuse crawlers.

---

## 19. Performance Bottlenecks

| Issue | Severity | Impact |
|-------|----------|--------|
| No image optimization | P1 | Large images served at full size |
| No lazy loading | P2 | Below-fold images load immediately |
| No font optimization | P2 | System fonts used (Arial) — actually good for performance |
| No critical CSS | P2 | Full CSS loaded upfront |
| Static export | ✅ | Fast TTFB |

---

## 20. Existing Ranking Pages

**Must preserve these URLs**:
- `/` — Homepage
- `/packaging` — Main packaging page
- `/how-we-work` — Process page
- `/sustainability` — Sustainability page
- `/insights` — Articles hub
- `/insights/[slug]` — Individual articles (7 articles)
- `/industries/[slug]` — Industry pages (4 pages)

**Do NOT change these URLs without 301 redirects.**

---

## Priority Summary

### P0 — Conversion / Indexing Critical
1. **RFQ form uses mailto:** — Must implement proper form submission
2. **No analytics** — Cannot track conversions or measure ROI
3. **H1 not keyword-optimized** — Missing commercial search intent
4. **No dedicated /request-a-quote/ page** — RFQ buried on homepage
5. **No file upload** — Buyers cannot submit artwork
6. **No Google Search Console** — Cannot monitor search performance

### P1 — Important
7. **No /about/ page** — Missing trust signal
8. **No /quality-control/ page** — Missing trust signal
9. **No case studies** — Missing social proof
10. **No /thank-you/ page** — No conversion tracking
11. **Images not optimized** — Performance and UX impact
12. **No internal linking strategy** — Poor link equity distribution
13. **Title tag wastes space on "by Hugo He"** — Should be keyword-focused
14. **No business email field in form** — Cannot follow up
15. **H2 tags not keyword-optimized** — Missing SEO opportunities

### P2 — Improvement
16. **No breadcrumbs** — Missing navigation aid and structured data
17. **Sitemap dates hardcoded** — Should be dynamic
18. **404 page too basic** — Should guide users to key pages
19. **No dark mode** — Minor UX improvement
20. **CSS not modular** — Maintenance concern

### P3 — Cosmetic
21. **Factory photo placeholders** — Need real photos
22. **Hugo portrait placeholder** — Need real photo
23. **No animation/transitions** — Minor UX polish
24. **Footer could be richer** — Missing links

---

## Files Requiring Modification

| File | Changes Needed |
|------|----------------|
| `app/page.tsx` | H1, CTAs, form, internal links |
| `app/layout.tsx` | Title, analytics, favicon |
| `app/globals.css` | New components, responsive fixes |
| `components/SiteNav.tsx` | Navigation restructure |
| `lib/seo.ts` | Enhanced structured data |
| `app/robots.ts` | Block RSC data files |
| `app/sitemap.ts` | Add new pages |
| `lib/articles.ts` | New content |
| `lib/industries.ts` | Enhanced data |

## New Files Required

| File | Purpose |
|------|---------|
| `app/request-a-quote/page.tsx` | Dedicated RFQ page |
| `app/thank-you/page.tsx` | RFQ confirmation |
| `app/about/page.tsx` | About / trust page |
| `app/quality-control/page.tsx` | QC page |
| `app/case-studies/page.tsx` | Case studies hub |
| `app/contact/page.tsx` | Contact page |
| `app/case-studies/[slug]/page.tsx` | Individual case studies |
