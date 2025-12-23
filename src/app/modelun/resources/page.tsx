import { Metadata } from "next";
import { getAllResources } from "@/lib/resources";
import ResourcesPageContent from "./ResourcesPageContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Model UN Resources | Position Papers, Resolutions & Delegate Guides",
  description:
    "Free Model UN resources for middle school delegates. Learn to write position papers, draft resolutions, give speeches, and master parliamentary procedure. Beginner guides and advanced strategies.",
  keywords: [
    "Model UN resources",
    "position paper template",
    "MUN resolution writing",
    "Model UN speech tips",
    "parliamentary procedure guide",
    "MUN delegate guide",
    "Model UN for beginners",
    "how to write position paper",
    "Model UN committee rules",
    "MUN opening speech",
  ],
  openGraph: {
    title: "Free Model UN Resources & Guides - JAMUN",
    description:
      "Everything you need to succeed in Model UN: position paper templates, resolution guides, speech tips, and parliamentary procedure tutorials.",
    url: `${siteConfig.url}/modelun/resources`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/modelun/resources`,
  },
};

export default function ResourcesPage() {
  const resources = getAllResources();

  return <ResourcesPageContent resources={resources} />;
}
