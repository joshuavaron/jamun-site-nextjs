import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  generateProgramSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Mock Trial for Middle School | Legal Skills & Courtroom Advocacy",
  description:
    "Experience courtroom drama in JAMUN's Mock Trial program for grades 5-8. Learn legal reasoning, cross-examination, opening statements, and persuasive argumentation. Build confidence in public speaking and critical thinking.",
  keywords: [
    "Mock Trial middle school",
    "youth legal competition",
    "mock trial for kids",
    "courtroom advocacy skills",
    "cross-examination techniques",
    "legal reasoning students",
    "middle school debate",
    "public speaking competition",
    "critical thinking activities",
    "opening statement tips",
    "closing argument practice",
    "attorney witness competition",
  ],
  openGraph: {
    title: "Mock Trial for Middle School - JAMUN",
    description:
      "Learn to think like a lawyer! Develop argumentation, critical analysis, and presentation skills through courtroom simulation. Launching Fall 2026.",
    url: `${siteConfig.url}/mocktrial`,
    type: "website",
    images: [
      {
        url: "/images/conferences/DSC02128.webp",
        width: 1200,
        height: 630,
        alt: "JAMUN Mock Trial Competition",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/mocktrial`,
  },
};

// Structured data for Mock Trial program
const mockTrialSchema = generateProgramSchema({
  name: "Mock Trial Program",
  description:
    "Learn legal reasoning, cross-examination, opening statements, and persuasive argumentation through courtroom simulation designed for middle school students in grades 5-8.",
  url: "/mocktrial",
  image: "/images/conferences/DSC02128.webp",
  educationalLevel: "Middle School (Grades 5-8)",
  skills: [
    "Public Speaking",
    "Legal Reasoning",
    "Cross-Examination",
    "Persuasive Argumentation",
    "Critical Analysis",
    "Courtroom Procedure",
    "Witness Examination",
    "Case Preparation",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Programs", url: "/programs" },
  { name: "Mock Trial", url: "/mocktrial" },
]);

// FAQs for structured data
const mockTrialFaqs = [
  {
    question: "Do I need any experience to join Mock Trial?",
    answer:
      "Not at all! Our program is designed specifically for beginners. We'll teach you everything from courtroom basics to advanced examination techniques. Many of our best attorneys started with no prior experience.",
  },
  {
    question: "What grades can participate?",
    answer:
      "JAMUN Mock Trial is designed for middle school students in grades 5-8. We create age-appropriate cases and provide training that meets students where they are.",
  },
  {
    question: "When does Mock Trial start?",
    answer:
      "Mock Trial begins in Fall 2026! We're currently building our program and will open registration soon. Join our mailing list to be the first to know when registration opens.",
  },
  {
    question: "What roles can I play?",
    answer:
      "Students can be attorneys (who argue the case) or witnesses (who testify). Most students try both roles during practice, and many discover hidden talents they didn't know they had!",
  },
  {
    question: "How much time does Mock Trial require?",
    answer:
      "Mock Trial involves about 5 hours per week with weekly club meetings and year-round programming. We work with students to balance academics and extracurriculars.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "We work hard to keep costs minimal and offer financial assistance for competition fees. No student should be unable to participate due to cost.",
  },
];

const faqSchema = generateFAQSchema(mockTrialFaqs);

export default function MockTrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([mockTrialSchema, breadcrumbSchema, faqSchema]),
        }}
      />
      {children}
    </>
  );
}
