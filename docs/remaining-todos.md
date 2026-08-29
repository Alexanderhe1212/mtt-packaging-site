# Remaining TODOs

> Updated: 2026-08-29

---

## P0 — Critical (Block Conversion)

### RFQ Form Backend Integration
- **Status**: Frontend built, submission NOT functional
- **Action**: Integrate Formspree, EmailJS, or custom backend
- **Owner action required**: Choose service, provide API credentials
- **File**: `app/request-a-quote/page.tsx` (see TODO comments)
- **Impact**: Without this, no RFQ submissions are received

### GA4 Measurement ID
- **Status**: Architecture ready, ID not provided
- **Owner action required**: Create GA4 property, provide Measurement ID (G-XXXXXXXXXX)
- **File**: `docs/analytics-setup.md`
- **Impact**: Cannot track conversions or measure ROI

### Google Search Console Verification
- **Status**: Not verified
- **Owner action required**: Verify domain in Search Console
- **Impact**: Cannot monitor search performance

---

## P1 — Important (Trust & Credibility)

### About Page — Verified Information
- **Status**: Page created with verified info only
- **Owner action required**: Provide (if desired):
  - Company founding year
  - Factory location details
  - Verified certifications (ISO, FSC, etc.)
  - Real customer testimonials (with permission)
  - Production capacity
  - Team size

### Quality Control — Verified Information
- **Status**: Page created with industry-standard checkpoints
- **Owner action required**: Provide (if desired):
  - Specific QC criteria and tolerances
  - Real QC photos from production
  - Certifications (if held)
  - Quality statistics (if verified)

### Hugo Portrait Photo
- **Status**: Placeholder ("HH") on homepage
- **Owner action required**: Provide real portrait photo
- **File**: `app/page.tsx` (v2-photo-placeholder)

### Factory / Production Photos
- **Status**: Placeholder text on homepage
- **Owner action required**: Provide real factory and production photos
- **File**: `app/page.tsx` (v2-factory-placeholder)

### Project Portfolio Photos
- **Status**: Structure reference images (not real client work)
- **Owner action required**: Provide verified project photographs
- **Note**: Images should show real packaging, not concepts

---

## P2 — SEO Improvements

### Dedicated Product Pages
- **Status**: Not created
- **Action**: Create individual pages for:
  - /rigid-boxes/
  - /magnetic-closure-boxes/
  - /drawer-boxes/
  - /folding-cartons/
  - /custom-inserts/
  - /paper-bags/
- **Impact**: Each page targets distinct commercial keyword

### Industry Page URL Restructure
- **Status**: Current URLs use `/industries/[slug]` format
- **Note**: URLs like `/perfume-packaging/` would be more SEO-friendly
- **Risk**: Changing URLs requires 301 redirects
- **Decision needed**: Owner must approve URL changes

### Case Studies
- **Status**: Not created
- **Action**: Create /case-studies/ hub and individual case study pages
- **Owner action required**: Provide real project details (never fabricate)

### Additional Knowledge Articles
- **Status**: 7 articles exist
- **Action**: Create articles targeting:
  - "How Much Does Custom Perfume Packaging Cost?"
  - "MOQ for Custom Packaging: What Brands Need to Know"
  - "How to Choose Packaging for a 50ml Perfume Bottle"
  - "How to Reduce Shipping Costs for Rigid Boxes"
  - "Custom Packaging Sampling Process"

### Breadcrumb Navigation
- **Status**: Structured data exists, no visible breadcrumbs
- **Action**: Add visible breadcrumb navigation to all pages

---

## P3 — Performance & UX

### Image Optimization
- **Status**: All images use `<img>` instead of `<Image />`
- **Action**: Consider migrating to optimized image component
- **Impact**: Better LCP, reduced bandwidth

### Cookie Consent Banner
- **Status**: Not implemented
- **Action**: Evaluate if needed for EU/GDPR compliance
- **Decision needed**: Based on target markets

### 404 Page Enhancement
- **Status**: Basic 404 page
- **Action**: Add links to key pages and RFQ CTA

### Internal Linking
- **Status**: Limited cross-linking between pages
- **Action**: Add links from articles to product pages, from product pages to case studies

---

## Owner Action Summary

| Action | Priority | Status |
|--------|----------|--------|
| Choose RFQ backend service | P0 | NOT STARTED |
| Provide GA4 Measurement ID | P0 | NOT STARTED |
| Verify Google Search Console | P0 | NOT STARTED |
| Provide Hugo portrait photo | P1 | NOT STARTED |
| Provide factory/production photos | P1 | NOT STARTED |
| Provide project portfolio photos | P1 | NOT STARTED |
| Verify certifications for About/QC pages | P1 | NOT STARTED |
| Provide customer testimonials | P1 | NOT STARTED |
| Approve product page URL structure | P2 | NOT STARTED |
| Provide real case study details | P2 | NOT STARTED |
