import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/' }, sitemap: ['https://mttpackaging.com/sitemap.xml','https://mttpackaging.com/sitemap-products.xml'], host: 'https://mttpackaging.com' }; }
