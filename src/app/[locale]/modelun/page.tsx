import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllCommittees } from "@/lib/committees";
import ModelUNPageContent from "./ModelUNPageContent";
import { siteConfig } from "@/config/site";
import {
  generateProgramSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ModelUNPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
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
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/modelun`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
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
      languages: {
        en: "/modelun",
        es: "/es/modelun",
      },
    },
  };
}

export default async function ModelUNPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const committees = getAllCommittees();

  // Get translations for structured data
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const tStructured = await getTranslations({ locale, namespace: "StructuredData" });
  const tFaq = await getTranslations({ locale, namespace: "ModelUNHomePage" });

  // Structured data for Model UN program with translations
  const modelUNSchema = generateProgramSchema({
    name: tStructured("modelUNProgramName"),
    description: tStructured("modelUNProgramDescription"),
    url: "/modelun",
    image: "/images/conferences/DSC00848.webp",
    educationalLevel: tStructured("educationalLevel"),
    skills: [
      tStructured("modelUNSkill1"),
      tStructured("modelUNSkill2"),
      tStructured("modelUNSkill3"),
      tStructured("modelUNSkill4"),
      tStructured("modelUNSkill5"),
      tStructured("modelUNSkill6"),
      tStructured("modelUNSkill7"),
      tStructured("modelUNSkill8"),
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("programs"), url: "/programs" },
    { name: tBreadcrumbs("modelUN"), url: "/modelun" },
  ]);

  // FAQs for structured data with translations
  const modelUNFaqs = [
    {
      question: tFaq("faq1Question"),
      answer: tFaq("faq1Answer"),
    },
    {
      question: tFaq("faq2Question"),
      answer: tFaq("faq2Answer"),
    },
    {
      question: tFaq("faq3Question"),
      answer: tFaq("faq3Answer"),
    },
    {
      question: tFaq("faq4Question"),
      answer: tFaq("faq4Answer"),
    },
    {
      question: tFaq("faq5Question"),
      answer: tFaq("faq5Answer"),
    },
    {
      question: tFaq("faq6Question"),
      answer: tFaq("faq6Answer"),
    },
  ];

  const faqSchema = generateFAQSchema(modelUNFaqs);

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
