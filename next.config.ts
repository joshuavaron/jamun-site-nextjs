import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  trailingSlash: true,
  // Externalize Prisma to reduce serverless function size
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default withNextIntl(nextConfig);
