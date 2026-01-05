import { notFound } from "next/navigation";

// Catch-all route that triggers the locale-specific not-found page
// This ensures 404s go through the [locale] layout (with navbar/footer)
export default function CatchAllPage() {
  notFound();
}
