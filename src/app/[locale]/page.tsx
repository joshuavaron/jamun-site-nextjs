import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LandingPage } from "@/components/sections/LandingPage";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQSchema,
  jsonLdScript,
} from "@/lib/structured-data";
import { routing, ogLocale } from "@/i18n/routing";

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
    // t("title") already ends with "| JAMUN"; use `absolute` so the root
    // "%s | JAMUN" template doesn't append the brand a second time.
    title: { absolute: t("title") },
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
      url: localizedUrl(locale),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale),
  };
}

// FAQ structured data — mirrors the questions rendered in LandingPage.
const HOMEPAGE_FAQS = [
  {
    question: "What is Model UN, and how does it help middle schoolers?",
    answer:
      "Model UN is an educational simulation where students represent different countries and debate global issues as UN delegates. For middle schoolers in grades 5–8, it builds public speaking, research, diplomatic negotiation, and an early understanding of international relations. Students learn to write position papers, draft resolutions, and deliver speeches — skills that compound into high school debate, magnet admissions, and college applications.",
  },
  {
    question: "How do I prepare for my first Mock Trial competition?",
    answer:
      "We provide free Mock Trial prep: case analysis guides, opening statement templates, cross-examination techniques, and practice sessions. New delegates learn courtroom procedure, evidence rules, and objection strategies through step-by-step tutorials. Our experienced mentors help students grow into both attorney and witness roles.",
  },
  {
    question: "What math competitions does JAMUN prepare students for?",
    answer:
      "Our Mathletes program trains delegates for MATHCOUNTS, AMC 8, Math League, and Math Olympiad. We provide practice problems across number theory, algebra, geometry, and problem-solving strategy. Students build speed, accuracy, and creative mathematical thinking through team-based learning and individual challenges.",
  },
  {
    question: "Are JAMUN's programs affordable?",
    answer:
      "Yes. All of our curriculum guides, training materials, and resources are completely free. Conferences are low-cost, and our grant program covers up to 100% of conference costs — including registration, travel, and materials — for families who need support. As a 501(c)(3) nonprofit, every donation goes directly to student programs and the grant fund.",
  },
  {
    question: "How can my school start a Model UN club or academic team?",
    answer:
      "JAMUN provides complete startup kits: free curriculum, training, position paper templates, and ongoing mentorship for educators. Whether you're launching a Model UN club, Mock Trial team, or Mathletes program, we'll help you draft an implementation plan tailored to your school. Email us to schedule a consultation.",
  },
  {
    question: "Do academic competitions help with high school and college admissions?",
    answer:
      "Yes — academic competitions demonstrate intellectual curiosity, leadership, and commitment, the qualities admissions officers value most. Students who participate from middle school build impressive track records of public speaking, critical thinking, and teamwork that strengthen high school, magnet, and college applications.",
  },
  {
    question: "Do students need experience to join?",
    answer:
      "Not at all. JAMUN is designed for beginners. Most of our delegates start with zero experience and our coaches teach you everything — from how to research your country to parliamentary procedure to building a Mock Trial case. The only requirement is showing up curious.",
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
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([organizationSchema, websiteSchema, faqSchema]),
        }}
      />
      <LandingPage />
    </>
  );
}
