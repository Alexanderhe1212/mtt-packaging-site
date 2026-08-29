# MTT Packaging website

## Project goal

Maintain the English-language website for MTT Packaging, a high-end custom packaging sales brand represented by Hugo He. The site should generate qualified B2B enquiries for perfume, cosmetics, jewelry, watches, and premium gift packaging.

## Brand and contact details

- Brand: MTT Packaging
- Positioning: premium, business-focused, custom packaging
- Contact: Hugo He
- Email: info@mttpackaging.com
- WhatsApp: +86 17207110964
- Domain: https://mttpackaging.com

Do not rename the brand, invent factories, customers, certifications, production figures, awards, addresses, or environmental claims. Only describe a certification as held when documentary proof is available. Use cautious wording such as “certified materials can be specified when available” where appropriate.

## Tech and important files

- Next.js App Router pages: `app/`
- Shared navigation: `components/SiteNav.tsx`
- Content data: `lib/`
- Images, logo, favicon, `llms.txt`: `public/`
- Global styles: `app/globals.css`
- SEO/AEO: `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `lib/seo.ts`, `public/llms.txt`
- Static export switch: `next.config.ts`

This project uses pnpm and requires Node.js 22.13 or newer.

## Local development

```bash
pnpm install
pnpm dev
```

Open the local URL shown in the terminal, normally `http://localhost:3000`.

Before considering a change finished, run:

```bash
pnpm lint
MTT_STATIC_EXPORT=1 pnpm build
```

The deployable static website is generated in `out/`.

## Design rules

- Preserve a restrained premium editorial style; avoid a cheap wholesale-marketplace appearance.
- Use consistent type sizes, compact vertical spacing, responsive layouts, and clear section navigation.
- Prefer real MTT project and production photography supplied by Hugo. Until real assets are supplied, never imply concept images are completed client work.
- Every image must match the adjacent heading and copy, have useful alt text, and not duplicate another image without a reason.
- Keep the homepage focused on: hero, industries, real projects, why MTT, Hugo, process, craftsmanship, materials and finishes, FAQ, final enquiry CTA, footer.
- Keep WhatsApp and quote actions obvious on desktop and mobile.
- Maintain accessibility: semantic headings, keyboard-operable controls, visible focus, sufficient contrast, and descriptive labels.

## SEO and AEO rules

- Keep one clear H1 per page and use a logical H2/H3 hierarchy.
- Write unique titles, descriptions, canonical URLs, Open Graph data, and useful page copy.
- Preserve `robots.txt`, `sitemap.xml`, structured data, `llms.txt`, and the Google verification record workflow.
- Target specific buyer intent naturally; do not stuff keywords or create thin near-duplicate pages.
- FAQs must answer real procurement questions such as MOQ, sampling, lead time, structure, inserts, finishes, shipping, and required quote information.
- Do not make unverifiable superlatives or fabricated sustainability claims.

## Deployment

The live site is hosted by GitHub Pages at `mttpackaging.com`. The public repository `Alexanderhe1212/mtt-packaging-site` currently contains the compiled static package and a GitHub Actions deployment workflow; it is not the primary source repository.

After an approved source change:

1. Run `pnpm lint` and `MTT_STATIC_EXPORT=1 pnpm build`.
2. Test the generated `out/` homepage and important routes locally.
3. Package the contents of `out/` with `index.html` at the archive root.
4. Update the deployment artifact in the GitHub repository and confirm its Pages workflow succeeds.
5. Verify `https://mttpackaging.com/`, `/packaging/`, `robots.txt`, and `sitemap.xml` after deployment.

Do not change Tencent DNS, GitHub Pages settings, the public repository, contact details, or production claims without Hugo's explicit approval. Never restore `custom-domains.chatgpt.site` or the old Cloudflare hostname.

## Working style

- Inspect existing components and data before adding new code.
- Make the smallest coherent change and reuse current patterns.
- Do not replace the stack or add dependencies unless necessary.
- Preserve user changes and avoid destructive Git commands.
- Summarize changed files and verification results after each task.
