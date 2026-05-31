import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The example page (src/app/page.tsx) pulls demo photos from picsum so the
    // starter renders out of the box. Remove this once you swap in your own
    // images under /public, or add your real image host here.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
