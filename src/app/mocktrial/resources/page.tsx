import { Metadata } from "next";
import { getAllMockTrialResources } from "@/lib/mocktrial-resources";
import MockTrialResourcesPageContent from "./MockTrialResourcesPageContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Mock Trial Guides & Templates for Students",
  description:
    "Free Mock Trial resources for middle school students. Learn cross-examination techniques, opening statements, closing arguments, and courtroom procedures. Attorney and witness preparation guides.",
  keywords: [
    "Mock Trial resources",
    "cross-examination tips",
    "opening statement guide",
    "closing argument techniques",
    "Mock Trial objections",
    "courtroom procedure",
    "direct examination",
    "witness preparation",
    "Mock Trial case analysis",
    "legal argumentation students",
  ],
  openGraph: {
    title: "Free Mock Trial Resources & Guides - JAMUN",
    description:
      "Master courtroom skills: cross-examination, opening statements, objections, and case analysis. Free guides for student attorneys and witnesses.",
    url: `${siteConfig.url}/mocktrial/resources`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/mocktrial/resources`,
  },
};

export default function MockTrialResourcesPage() {
  const resources = getAllMockTrialResources();

  return <MockTrialResourcesPageContent resources={resources} />;
}
