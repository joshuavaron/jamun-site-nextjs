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
  const t = await getTranslations({ locale, namespace: "MathletesPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Mathletes middle school",
      "MATHCOUNTS preparation",
      "AMC 8 practice",
      "middle school math competitions",
      "competitive math program",
      "math team grades 5-8",
      "problem solving math",
      "number theory students",
      "Math League preparation",
      "math olympiad training",
      "algebra competition",
      "geometry problem solving",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/mathletes`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/mathletes`,
      languages: {
        en: "/mathletes",
        es: "/es/mathletes",
      },
    },
  };
}

export default async function MathletesLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  // Get translations for structured data
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const tStructured = await getTranslations({ locale, namespace: "StructuredData" });
  const tFaq = await getTranslations({ locale, namespace: "MathletesHomePage" });

  // Structured data for Mathletes program with translations
  const mathletesSchema = generateProgramSchema({
    name: tStructured("mathletesProgramName"),
    description: tStructured("mathletesProgramDescription"),
    url: "/mathletes",
    image: "/images/conferences/homebackground2.webp",
    educationalLevel: tStructured("educationalLevel"),
    skills: [
      tStructured("mathletesSkill1"),
      tStructured("mathletesSkill2"),
      tStructured("mathletesSkill3"),
      tStructured("mathletesSkill4"),
      tStructured("mathletesSkill5"),
      tStructured("mathletesSkill6"),
      tStructured("mathletesSkill7"),
      tStructured("mathletesSkill8"),
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("programs"), url: "/programs" },
    { name: tBreadcrumbs("mathletes"), url: "/mathletes" },
  ]);

  // FAQs for structured data with translations
  const mathletesFaqs = [
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

  const faqSchema = generateFAQSchema(mathletesFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([mathletesSchema, breadcrumbSchema, faqSchema]),
        }}
      />
      {children}
    </>
  );
}
