import { notFound } from "next/navigation";

// Catch-all route that triggers the styled not-found page
// This handles paths like /blabla, /blabla/blabla, /es/blabla, etc.
export default function CatchAllPage() {
  notFound();
}
