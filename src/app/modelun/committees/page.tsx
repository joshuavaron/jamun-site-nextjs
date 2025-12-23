import { Metadata } from "next";
import { getAllCommittees } from "@/lib/committees";
import CommitteesPageContent from "./CommitteesPageContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Model UN Committees | General Assembly, Security Council & More",
  description:
    "Explore JAMUN's Model UN committees including General Assembly, Security Council, ECOSOC, and specialized agencies. Find the perfect committee for middle school delegates at our beginner-friendly conferences.",
  keywords: [
    "Model UN committees",
    "General Assembly simulation",
    "Security Council MUN",
    "ECOSOC Model UN",
    "beginner MUN committees",
    "middle school Model UN",
    "UN committee simulation",
    "delegate committee selection",
  ],
  openGraph: {
    title: "Model UN Committees - JAMUN",
    description:
      "Explore our diverse Model UN committees designed for middle school delegates. From General Assembly to Security Council, find your perfect fit.",
    url: `${siteConfig.url}/modelun/committees`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/modelun/committees`,
  },
};

export default function CommitteesPage() {
  const committees = getAllCommittees();

  return <CommitteesPageContent committees={committees} />;
}
