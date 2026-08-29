# Change Log

## Sprint 1 — Critical Fixes (2026-08-29)

### H1 Optimization
- **Before**: "Premium Packaging, Engineered Around Your Product."
- **After**: "Custom Luxury Packaging Manufacturer in China"
- **Impact**: Matches commercial search intent for packaging manufacturer queries

### Title Tag
- **Before**: "MTT Packaging | High-End Custom Packaging by Hugo He"
- **After**: "Custom Luxury Packaging Manufacturer | MTT Packaging"
- **Impact**: Keyword-optimized, removed personal name from title

### Meta Description
- **Before**: "Work directly with Hugo He at MTT Packaging for high-end custom rigid boxes..."
- **After**: "MTT Packaging is a custom luxury packaging manufacturer in China. We make custom rigid boxes, perfume packaging, cosmetic packaging, jewelry boxes and premium gift boxes. MOQ from 500 pcs."
- **Impact**: Product-focused, includes MOQ for qualified clicks

### Navigation
- **Before**: Industries / Projects / Process / FAQ
- **After**: Products / Industries / Process / Packaging Guide / Contact
- **Impact**: Clearer buyer journey, commercial intent

### Hero Trust Strip
- **Added**: MOQ from 500 pcs / Custom Structure & Inserts / Sampling Before Production / Worldwide Shipping
- **Impact**: Communicates key value propositions within 5 seconds

### Structured Data
- **Expanded**: Service types to include all packaging categories
- **Impact**: Better rich results coverage

### Brand Presentation
- **Removed**: "by Hugo He" from logo/brand area
- **Impact**: Brand-first positioning, not person-dependent

---

## Sprint 2 — RFQ & Trust Pages (2026-08-29)

### Task 1: /request-a-quote/
- Full RFQ form with: name, email, company, country, packaging type, quantity, dimensions, message, file upload
- Sidebar: process steps + what to include
- **Backend**: mailto: fallback (proper backend TODO documented)
- **Status**: Frontend complete, submission NOT functional (requires backend integration)

### Task 2: /about/
- Company overview (verified info only)
- Packaging capabilities
- Industries served
- How projects work
- **Status**: Published with TODOs for certifications, factory info, testimonials

### Task 3: /quality-control/
- 9 QC checkpoints documented
- Quality approach section
- **Status**: Published with TODOs for certifications, equipment, photos

### Task 4: GA4 Integration
- Architecture documented in /docs/analytics-setup.md
- **Status**: Requires Measurement ID from owner

---

## Previous Changes (Before Sprint System)

### WhatsApp Integration
- Floating WhatsApp button on all pages
- Pre-fill messages per page context
- WhatsApp CTAs on industry and article pages

### Contact Form Enhancement
- Added: Industry, Packaging Type, Quantity, Country fields
- Form submits via mailto: (temporary)

### Knowledge Articles
- 7 articles with datePublished/dateModified
- FAQPage Schema on all articles
- Related articles section
- New articles: Rigid Box vs Folding Carton, Cost Guide, Materials Guide

### Email Unification
- All references updated to info@mttpackaging.com

### Trust Section
- "Trusted by brands worldwide" section on homepage

### Build Fix
- Removed trailingSlash: true (caused 308 errors with vinext)
