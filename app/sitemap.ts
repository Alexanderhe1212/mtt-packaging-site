import type { MetadataRoute } from 'next';
import { articles } from '../lib/articles';
import { industries } from '../lib/industries';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://mttpackaging.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }, ...industries.map(({ slug }) => ({ url: `https://mttpackaging.com/industries/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .85 })), ...articles.map(({ slug }) => ({ url: `https://mttpackaging.com/insights/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .75 }))]; }
