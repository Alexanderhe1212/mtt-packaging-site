import type { MetadataRoute } from 'next';
import { articles } from '../lib/articles';
import { industries } from '../lib/industries';
const lastModified = new Date('2026-08-28');
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://mttpackaging.com', lastModified, changeFrequency: 'monthly', priority: 1 }, ...['packaging','how-we-work','sustainability','insights'].map((slug)=>({url:`https://mttpackaging.com/${slug}`,lastModified,changeFrequency:'monthly' as const,priority:.9})), ...industries.map(({ slug }) => ({ url: `https://mttpackaging.com/industries/${slug}`, lastModified, changeFrequency: 'monthly' as const, priority: .85 })), ...articles.map(({ slug }) => ({ url: `https://mttpackaging.com/insights/${slug}`, lastModified, changeFrequency: 'monthly' as const, priority: .75 }))]; }
