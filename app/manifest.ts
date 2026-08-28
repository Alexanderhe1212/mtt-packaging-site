import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MTT Packaging',
    short_name: 'MTT',
    description: 'High-end custom packaging by Hugo He.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f0e8',
    theme_color: '#102016',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
