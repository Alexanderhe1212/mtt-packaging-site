# Current State

> Generated: 2026-08-29 (Post Sprint 2 deployment)

---

## Framework
- **Next.js** 16.2.6 with **vinext** 1.0.0-beta.3 (Vite-based)
- **Tailwind** v4.2.1
- **TypeScript** 5.9.3
- **Node** v26.7.0, **pnpm** 11.24.0

## Deployment
- **Method**: Static export → GitHub Pages via GitHub Actions
- **Production URL**: https://mttpackaging.com
- **Repository**: https://github.com/Alexanderhe1212/mtt-packaging-site
- **Deploy workflow**: `out/` → zip → push to GitHub → Actions unzips to `_site/` → deploys to Pages
- **CDN**: EdgeOne (Tencent Cloud) currently pointing to GitHub Pages

## Git Status
- **Branch**: main
- **Status**: Clean (no uncommitted changes)
- **Last commit**: `6b8d39a` — Fix: add new pages to deployment

## Build Status
- **Build**: Passes (`MTT_STATIC_EXPORT=1 pnpm build`)
- **Known issue**: `trailingSlash: true` in next.config.ts causes 308 errors (currently disabled)

## Production Health (verified 2026-08-29)
- Homepage: 200 ✅
- /request-a-quote/: 200 ✅
- /about/: 200 ✅
- /quality-control/: 200 ✅
- /packaging/: 200 ✅
- robots.txt: 200 ✅
- sitemap.xml: 200 ✅

## Pages
| URL | Status | File |
|-----|--------|------|
| / | Live | app/page.tsx |
| /request-a-quote/ | Live | app/request-a-quote/page.tsx |
| /about/ | Live | app/about/page.tsx |
| /quality-control/ | Live | app/quality-control/page.tsx |
| /packaging/ | Live | app/packaging/page.tsx |
| /how-we-work/ | Live | app/how-we-work/page.tsx |
| /sustainability/ | Live | app/sustainability/page.tsx |
| /insights/ | Live | app/insights/page.tsx |
| /insights/[slug]/ | Live | app/insights/[slug]/page.tsx (7 articles) |
| /industries/[slug]/ | Live | app/industries/[slug]/page.tsx (4 pages) |

## Form Architecture
- **RFQ form**: `/request-a-quote/` — uses `mailto:info@mttpackaging.com` (no backend)
- **Homepage contact**: `mailto:info@mttpackaging.com`
- **WhatsApp**: Floating button on all pages + CTAs
- **Status**: NO functional backend. Forms rely on user's email client.

## SEO Architecture
- **Titles**: Keyword-optimized on all pages
- **Meta descriptions**: Unique per page
- **Canonicals**: Set on all pages
- **Structured data**: Organization, WebSite, Service, FAQPage, Article, BreadcrumbList
- **Sitemap**: Dynamic from articles[] and industries[] arrays
- **robots.txt**: Allows all, points to sitemap
- **llms.txt**: Present with business info and page links

## Key Risks
1. **RFQ form has no backend** — submissions may be lost
2. **No analytics** — cannot track conversions
3. **No Google Search Console** — cannot monitor search performance
4. **Trust pages have TODOs** — need owner-verified content
5. **No real project photos** — using structure references

## Safe Workflow
1. Create feature branch: `git checkout -b <type>/<description>`
2. Make ONE small change
3. Build: `MTT_STATIC_EXPORT=1 pnpm build`
4. Commit: `git commit -m "<type>: <description>"`
5. Deploy via deploy script
6. Health check after deployment
7. Update change-log.md
