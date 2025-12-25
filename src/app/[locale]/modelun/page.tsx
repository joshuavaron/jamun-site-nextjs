import { Metadata } from "next";
import { getAllCommittees } from "@/lib/committees";
import ModelUNPageContent from "./ModelUNPageContent";
import { siteConfig } from "@/config/site";
import {
  generateProgramSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Model UN for Middle School - Conferences & Resources",
  description:
    "Join JAMUN's Model United Nations program for grades 5-8. Learn diplomatic skills, global issues, public speaking, and resolution writing. Beginner-friendly conferences, position paper guides, and free resources.",
  keywords: [
    "Model UN middle school",
    "Model United Nations for beginners",
    "MUN conferences grades 5-8",
    "learn diplomatic skills",
    "position paper writing",
    "Model UN resolution",
    "youth debate program",
    "public speaking middle school",
    "international relations students",
    "MUN delegate training",
    "Model UN committees",
    "General Assembly simulation",
  ],
  openGraph: {
    title: "Model UN for Middle School - JAMUN",
    description:
      "Step into the shoes of UN delegates and tackle real-world global issues. Develop public speaking, research, and negotiation skills. Free resources and low-cost conferences.",
    url: `${siteConfig.url}/modelun`,
    type: "website",
    images: [
      {
        url: "/images/conferences/DSC00848.webp",
        width: 1200,
        height: 630,
        alt: "JAMUN Model UN Conference",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/modelun`,
  },
};

// Structured data for Model UN program
const modelUNSchema = generateProgramSchema({
  name: "Model United Nations Program",
  description:
    "Learn diplomatic skills, global issues analysis, public speaking, and resolution writing through our Model UN program designed for middle school students in grades 5-8.",
  url: "/modelun",
  image: "/images/conferences/DSC00848.webp",
  educationalLevel: "Middle School (Grades 5-8)",
  skills: [
    "Public Speaking",
    "Diplomatic Negotiation",
    "Research Skills",
    "Position Paper Writing",
    "Resolution Drafting",
    "International Relations",
    "Critical Thinking",
    "Debate Skills",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Programs", url: "/programs" },
  { name: "Model UN", url: "/modelun" },
]);

// FAQs for structured data
const modelUNFaqs = [
  {
    question: "Do I need any experience to join Model UN?",
    answer:
      "Not at all! Our program is designed specifically for beginners. We'll teach you everything from how to research your country to parliamentary procedure. Many of our most successful delegates started with zero experience.",
  },
  {
    question: "What grades can participate?",
    answer:
      "JAMUN Model UN is designed for middle school students in grades 5-8. We create age-appropriate committees and topics that challenge students while remaining accessible.",
  },
  {
    question: "How much time does Model UN require?",
    answer:
      "Typically, clubs meet weekly for 1-2 hours. Before conferences, delegates spend additional time researching their country and preparing speeches. Conferences are usually 1-2 days on weekends.",
  },
  {
    question: "What topics do you debate?",
    answer:
      "Topics range from climate change and human rights to technology regulation and international security. We select topics that are relevant, engaging, and appropriate for middle schoolers to explore.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "We work hard to keep costs minimal. Many of our resources are free, and we offer financial assistance for conference registration fees. No student should be unable to participate due to cost.",
  },
  {
    question: "How do awards work?",
    answer:
      "Delegates can earn awards like Best Delegate, Outstanding Delegate, and Honorable Mention based on their preparation, speaking skills, collaboration, and adherence to their country's positions.",
  },
];

const faqSchema = generateFAQSchema(modelUNFaqs);

export default function ModelUNPage() {
  const committees = getAllCommittees();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([modelUNSchema, breadcrumbSchema, faqSchema]),
        }}
      />
      <ModelUNPageContent committees={committees} />
    </>
  );
}
