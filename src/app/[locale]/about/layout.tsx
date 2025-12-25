import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About JAMUN - Youth-Led Nonprofit for Grades 5-8",
  description:
    "Learn about JAMUN, a 501(c)(3) nonprofit organization run by high school and college students. Discover our mission to make academic competitions accessible to all middle school students through Model UN, Mock Trial, and Mathletes.",
  keywords: [
    "about JAMUN",
    "youth-led nonprofit",
    "student organization",
    "Model UN nonprofit",
    "academic competition organization",
    "middle school programs",
    "volunteer-run nonprofit",
    "Make Academics Fun",
    "educational nonprofit",
    "student volunteers",
  ],
  openGraph: {
    title: "About JAMUN - Youth-Led Academic Competition Nonprofit",
    description:
      "JAMUN is 100% youth-led and volunteer-run. With 500+ students impacted and 80+ volunteers, we're making academic competitions accessible to all middle schoolers.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
