import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Best Academic Programs for Middle School Students",
  description:
    "Explore JAMUN's three academic competition programs for grades 5-8: Model UN (diplomacy & debate), Mock Trial (legal advocacy), and Mathletes (competitive math). Free resources, beginner-friendly, real competitions.",
  keywords: [
    "Model UN programs",
    "Mock Trial for middle school",
    "Mathletes competitions",
    "middle school debate",
    "academic competitions",
    "extracurricular activities grades 5-8",
    "public speaking programs",
    "critical thinking activities",
    "youth leadership development",
    "affordable academic programs",
    "MATHCOUNTS preparation",
    "AMC 8 training",
  ],
  openGraph: {
    title: "Three Academic Programs for Middle School Excellence",
    description:
      "Model UN, Mock Trial, and Mathletes - three paths to developing public speaking, critical thinking, and leadership skills. Beginner-friendly programs for grades 5-8.",
    url: `${siteConfig.url}/programs`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/programs`,
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
