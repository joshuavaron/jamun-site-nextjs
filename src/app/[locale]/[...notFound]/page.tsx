import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

// 404s should never be indexed (prevents soft-404 indexing).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Required for static export - generates paths for each locale
export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
    notFound: ["not-found"],
  }));
}

// Catch-all route that triggers the locale-specific not-found page
// This ensures 404s go through the [locale] layout (with navbar/footer)
export default function CatchAllPage() {
  notFound();
}
