import { Metadata } from "next";
import { getAllMathletesResources } from "@/lib/mathletes-resources";
import MathletesResourcesPageContent from "./MathletesResourcesPageContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Math Competition Resources - MATHCOUNTS & AMC 8 Prep",
  description:
    "Free math competition resources for middle school students. Prepare for MATHCOUNTS, AMC 8, and Math League with practice problems, strategies, and study guides. Number theory, algebra, and geometry tutorials.",
  keywords: [
    "MATHCOUNTS preparation",
    "AMC 8 practice problems",
    "Math League resources",
    "competitive math study guide",
    "number theory problems",
    "algebra competition prep",
    "geometry problem solving",
    "math olympiad middle school",
    "mental math strategies",
    "math competition tips",
  ],
  openGraph: {
    title: "Free Math Competition Resources - JAMUN Mathletes",
    description:
      "Prepare for MATHCOUNTS and AMC 8: practice problems, problem-solving strategies, and topic guides for competitive math.",
    url: `${siteConfig.url}/mathletes/resources`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/mathletes/resources`,
  },
};

export default function MathletesResourcesPage() {
  const resources = getAllMathletesResources();

  return <MathletesResourcesPageContent resources={resources} />;
}
