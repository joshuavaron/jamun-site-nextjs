import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getBackgroundGuideBySlug,
  getAllBackgroundGuideSlugsAllLocales,
  getAlternateLanguages,
} from "@/lib/background-guides";
import { getCommitteeBySlug, getAllCommittees } from "@/lib/committees";
import BackgroundGuidePageContent from "./BackgroundGuidePageContent";
import { siteConfig } from "@/config/site";

interface BackgroundGuidePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const allSlugs = getAllBackgroundGuideSlugsAllLocales();
  return allSlugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: BackgroundGuidePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const guide = getBackgroundGuideBySlug(slug, locale);

  if (!guide) {
    const t = await getTranslations({ locale, namespace: "BackgroundGuidePage" });
    return {
      title: t("notFoundTitle"),
    };
  }

  // Build alternate languages for SEO
  const alternates = getAlternateLanguages(slug, locale);
  const languages: Record<string, string> = {};
  const basePath = "/modelun/background-guides";

  // Add current locale
  languages[locale] = locale === "en"
    ? `${basePath}/${slug}`
    : `/${locale}${basePath}/${slug}`;

  // Add alternate locales
  for (const alt of alternates) {
    languages[alt.locale] = alt.locale === "en"
      ? `${basePath}/${alt.slug}`
      : `/${alt.locale}${basePath}/${alt.slug}`;
  }

  return {
    title: `${guide.title} | JAMUN Model UN`,
    description: `Background guide for JAMUN Model UN conference - ${guide.title}`,
    openGraph: {
      title: guide.title,
      description: `Background guide for JAMUN Model UN conference - ${guide.title}`,
      type: "article",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}${basePath}/${slug}`,
      languages,
    },
  };
}

// Find the committee that uses this background guide
function findCommitteeForGuide(guideSlug: string, locale: string) {
  const committees = getAllCommittees(locale);
  const committee = committees.find(c => c.backgroundGuide === guideSlug);
  if (committee) {
    return getCommitteeBySlug(committee.slug, locale);
  }
  return null;
}

export default async function BackgroundGuidePage({ params }: BackgroundGuidePageProps) {
  const { slug, locale } = await params;
  const guide = getBackgroundGuideBySlug(slug, locale);

  if (!guide) {
    notFound();
  }

  // Try to find the associated committee
  const committee = findCommitteeForGuide(slug, locale);

  return (
    <BackgroundGuidePageContent
      guide={guide}
      committee={committee}
    />
  );
}
