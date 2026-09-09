import type { MetadataRoute } from 'next';
import { articles } from '../lib/articles';
import { industries } from '../lib/industries';
import { siteUrl } from '../lib/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', 'packaging', 'industries', 'how-we-work', 'sustainability', 'insights', 'request-a-quote', 'about', 'quality-control', 'ppwr-compliant-packaging', 'privacy-policy', 'cookie-policy', 'tools', 'tools/box-size-calculator', 'tools/gift-box-solution-builder', ...['custom-rigid-boxes', 'folding-cartons', 'custom-paper-bags', 'custom-inserts'].map(s => `packaging/${s}`), ...industries.map(i => `industries/${i.slug}`)];
  return [...paths.map(path => ({ url: path ? `${siteUrl}/${path}` : siteUrl })), ...articles.map(article => ({ url: `${siteUrl}/insights/${article.slug}`, lastModified: article.dateModified || article.datePublished }))];
}
