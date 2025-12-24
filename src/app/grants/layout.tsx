import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conference Grants for Students - Up to 100% Covered",
  description:
    "Apply for JAMUN grants to cover registration fees, travel costs, and materials for Model UN, Mock Trial, and Mathletes competitions. Financial assistance for middle school students and schools. Free application.",
  keywords: [
    "student grants",
    "academic competition funding",
    "Model UN financial aid",
    "school program grants",
    "student scholarship",
    "competition registration fee assistance",
    "education grants middle school",
    "extracurricular funding",
    "nonprofit student grants",
    "affordable academic programs",
    "underserved school funding",
  ],
  openGraph: {
    title: "Apply for JAMUN Student Grants - Cost Shouldn't Determine Participation",
    description:
      "Get financial assistance for Model UN, Mock Trial, and Mathletes competitions. 100+ students funded, $25K+ grants given. Simple application process.",
    url: `${siteConfig.url}/grants`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/grants`,
  },
};

export default function GrantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
