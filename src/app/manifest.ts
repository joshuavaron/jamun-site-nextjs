import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.fullName,
    short_name: siteConfig.name,
    description:
      "Affordable Model UN, Mock Trial & Mathletes competitions and free resources for middle schoolers (grades 5-8).",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#397bce",
    icons: [
      {
        src: "/images/logos/jamun-logo-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/images/logos/jamun-logo-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/images/logos/jamun-logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
