import type { NextConfig } from 'next';

const nextConfig: NextConfig =
  process.env.MTT_STATIC_EXPORT === '1'
    ? {
        output: 'export',
        trailingSlash: true,
      }
    : {};

export default nextConfig;
