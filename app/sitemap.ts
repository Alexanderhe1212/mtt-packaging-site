import type { MetadataRoute } from 'next';
import { articles } from '../lib/articles';
import { industries } from '../lib/industries';
export const dynamic = 'force-static';
const lastModified = new Date('2026-08-31');
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://mttpackaging.com', lastModified, changeFrequency: 'monthly', priority: 1 }, ...['packaging','how-we-work','sustainability','insights','request-a-quote','about','quality-control','ppwr-compliant-packaging','privacy-policy','cookie-policy'].map((slug)=>({url:`https://mttpackaging.com/${slug}`,lastModified,changeFrequency:'monthly' as const,priority:.9})), ...['custom-rigid-boxes','folding-cartons','custom-paper-bags','custom-inserts'].map((slug)=>({url:`https://mttpackaging.com/packaging/${slug}`,lastModified,changeFrequency:'monthly' as const,priority:.88})), ...industries.map(({ slug }) => ({ url: `https://mttpackaging.com/industries/${slug}`, lastModified, changeFrequency: 'monthly' as const, priority: .85 })), ...articles.map(({ slug }) => ({ url: `https://mttpackaging.com/insights/${slug}`, lastModified, changeFrequency: 'monthly' as const, priority: .75 }))]; }
