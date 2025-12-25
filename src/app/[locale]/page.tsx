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

// FAQ data for structured data - matches FAQSection content
const homepageFAQs = [
  {
    question: "What is Model UN and how does it benefit middle school students?",
    answer:
      "Model UN (Model United Nations) is an educational simulation where students represent different countries and debate global issues as UN delegates. For middle school students in grades 5-8, Model UN develops critical skills including public speaking, research, diplomatic negotiation, and understanding of international relations. Students learn to write position papers, draft resolutions, and deliver speeches—skills that prepare them for high school debate, magnet school applications, and future college success.",
  },
  {
    question: "How do I prepare for my first Mock Trial competition?",
    answer:
      "We provide comprehensive Mock Trial preparation materials including case analysis guides, opening statement templates, cross-examination techniques, and practice sessions. New participants learn courtroom procedures, evidence rules, and objection strategies through step-by-step tutorials. Our experienced mentors help students master both attorney and witness roles, building confidence in legal reasoning and persuasive argumentation.",
  },
  {
    question: "What math competitions does JAMUN prepare students for?",
    answer:
      "Our Mathletes program prepares middle school students for competitions including MATHCOUNTS, AMC 8, Math League, and Math Olympiad. We provide practice problems covering number theory, algebra, geometry, and problem-solving strategies. Students develop speed, accuracy, and creative mathematical thinking through team-based learning and individual challenges.",
  },
  {
    question: "Are JAMUN's academic programs affordable?",
    answer:
      "Yes! JAMUN is committed to making academic competitions accessible to all students regardless of financial circumstances. All of our resources, curriculum guides, and training materials are completely free. Our conferences are low-cost, and we offer a grant program that can subsidize up to 100% of conference costs for students who need financial assistance. This includes registration fees, travel costs, and competition materials. As a 501(c)(3) nonprofit, all donations directly support student programs and our grant fund.",
  },
  {
    question: "How can my school start a Model UN club or academic team?",
    answer:
      "JAMUN provides complete startup kits for schools including free curriculum guides, training materials, position paper templates, and ongoing mentorship. Whether you want to start a Model UN club, Mock Trial team, or Mathletes program, we offer free resources and support for educators. Contact us to schedule a consultation where we'll help you create an implementation plan tailored to your school's needs.",
  },
  {
    question: "Do academic competitions help with college admissions?",
    answer:
      "Academic competitions demonstrate intellectual curiosity, leadership, and commitment—qualities college admissions officers value highly. Model UN, Mock Trial, and Mathletes develop transferable skills like public speaking, critical thinking, teamwork, and time management. Students who participate in these activities from middle school build impressive track records that strengthen high school and college applications.",
  },
  {
    question: "What skills do students develop in JAMUN programs?",
    answer:
      "JAMUN programs develop essential 21st-century skills including public speaking and debate, critical thinking and analysis, research and writing, teamwork and collaboration, leadership and confidence, and problem-solving abilities. These skills transfer to academic success, standardized test performance, and future career readiness.",
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
