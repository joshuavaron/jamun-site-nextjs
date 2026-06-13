import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Only use static export for production builds (Cloudflare Pages)
  // Dev server needs dynamic features like middleware
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  // No trailing slash: canonical URLs are https://www.jamun.org/about (not /about/).
  // With output:'export' this emits out/about.html, which Cloudflare Pages serves
  // cleanly at /about. Next also renders <link rel="canonical"> without a slash.
  trailingSlash: false,
};

export default withNextIntl(nextConfig);
