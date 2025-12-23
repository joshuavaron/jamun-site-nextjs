import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Donate to JAMUN - Support Accessible Academic Programs for Students",
  description:
    "Support JAMUN's mission to make academic competitions accessible to all middle school students. Your tax-deductible donation funds Model UN, Mock Trial, and Mathletes programs for underserved schools. 501(c)(3) nonprofit.",
  keywords: [
    "donate to education nonprofit",
    "support academic competitions",
    "tax-deductible donation",
    "501(c)(3) education",
    "fund student programs",
    "Model UN donation",
    "educational charity",
    "youth education nonprofit",
    "school program funding",
    "academic enrichment donation",
  ],
  openGraph: {
    title: "Donate to JAMUN - Every Gift Changes a Student's Life",
    description:
      "Help bring Model UN, Mock Trial, and Mathletes to middle schoolers who might never get the chance otherwise. 100% volunteer-run nonprofit.",
    url: `${siteConfig.url}/donate`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/donate`,
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
