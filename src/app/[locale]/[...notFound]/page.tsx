import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
