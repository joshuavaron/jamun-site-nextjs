import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  HeroSection,
  StatsSection,
  WhoWeServeSection,
  ProgramsSection,
  WhyChooseSection,
  SkillsSection,
  GallerySection,
  TestimonialSection,
  FAQSection,
  CTASection,
} from "@/components/sections";
import { siteConfig } from "@/config/site";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Model UN middle school",
      "Mock Trial for kids",
      "Mathletes program",
      "middle school academic competitions",
      "affordable extracurricular activities",
      "youth debate programs",
      "public speaking for students",
      "leadership skills middle school",
      "JAMUN",
      "academic enrichment grades 5-8",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: siteConfig.url,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: siteConfig.url,
      languages: {
        en: "/",
        es: "/es",
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get translations for FAQ structured data
  const t = await getTranslations({ locale, namespace: "FAQSection" });

  // FAQ data for structured data - uses translations
  const homepageFAQs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer"),
    },
    {
      question: t("faq5Question"),
      answer: t("faq5Answer"),
    },
    {
      question: t("faq6Question"),
      answer: t("faq6Answer"),
    },
    {
      question: t("faq7Question"),
      answer: t("faq7Answer"),
    },
  ];

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQSchema(homepageFAQs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([organizationSchema, websiteSchema, faqSchema]),
        }}
      />
      <HeroSection />
      <StatsSection />
      <WhoWeServeSection />
      <ProgramsSection />
      <WhyChooseSection />
      <SkillsSection />
      <GallerySection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
