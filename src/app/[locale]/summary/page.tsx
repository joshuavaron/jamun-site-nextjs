import type { Metadata } from "next";
import { SummaryPage } from "@/components/sections";

export const metadata: Metadata = {
  title: "JAMUN Summary",
  description:
    "A one-page summary of JAMUN — a 100% volunteer-run nonprofit running low-cost academic competitions for middle schoolers.",
};

export default function Page() {
  return <SummaryPage />;
}
