import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig, defaultOgImage } from "@/config/site";
import {
  generateProgramSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MockTrialPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
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
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/mocktrial`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/mocktrial`,
      languages: {
        en: "/mocktrial",
        es: "/es/mocktrial",
      },
    },
  };
}

export default async function MockTrialLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  // Get translations for structured data
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const tStructured = await getTranslations({ locale, namespace: "StructuredData" });
  const tFaq = await getTranslations({ locale, namespace: "MockTrialHomePage" });

  // Structured data for Mock Trial program with translations
  const mockTrialSchema = generateProgramSchema({
    name: tStructured("mockTrialProgramName"),
    description: tStructured("mockTrialProgramDescription"),
    url: "/mocktrial",
    image: "/images/conferences/DSC02128.webp",
    educationalLevel: tStructured("educationalLevel"),
    skills: [
      tStructured("mockTrialSkill1"),
      tStructured("mockTrialSkill2"),
      tStructured("mockTrialSkill3"),
      tStructured("mockTrialSkill4"),
      tStructured("mockTrialSkill5"),
      tStructured("mockTrialSkill6"),
      tStructured("mockTrialSkill7"),
      tStructured("mockTrialSkill8"),
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("programs"), url: "/programs" },
    { name: tBreadcrumbs("mockTrial"), url: "/mocktrial" },
  ]);

  // FAQs for structured data with translations
  const mockTrialFaqs = [
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

  const faqSchema = generateFAQSchema(mockTrialFaqs);

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
