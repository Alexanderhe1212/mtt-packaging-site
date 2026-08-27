import type { MetadataRoute } from 'next';
import { articles } from '../lib/articles';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://mttpackaging.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }, ...articles.map(({ slug }) => ({ url: `https://mttpackaging.com/insights/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .75 }))]; }
