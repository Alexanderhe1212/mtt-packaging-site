import type { MetadataRoute } from 'next';
import { articles } from '../lib/articles';
import { industries } from '../lib/industries';
import { siteUrl } from '../lib/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['zh','zh/request-a-quote','', 'packaging', 'industries', 'how-we-work', 'sustainability', 'insights', 'request-a-quote', 'about', 'quality-control', 'ppwr-compliant-packaging', 'privacy-policy', 'cookie-policy', 'tools', 'tools/box-size-calculator', 'tools/gift-box-solution-builder', ...['custom-rigid-boxes', 'folding-cartons', 'custom-paper-bags', 'custom-inserts'].map(s => `packaging/${s}`), ...industries.map(i => `industries/${i.slug}`)];
  return [...paths.map(path => ({ url: path ? `${siteUrl}/${path}` : siteUrl, ...(['packaging/custom-rigid-boxes','packaging/custom-inserts','industries/perfume-fragrance-packaging','tools/gift-box-solution-builder'].includes(path) ? {lastModified:path==='industries/perfume-fragrance-packaging'?'2026-09-12':'2026-09-10'} : {}) })), ...articles.map(article => ({ url: `${siteUrl}/insights/${article.slug}`, lastModified: article.dateModified || article.datePublished }))];
}
