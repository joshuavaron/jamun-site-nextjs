import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  getResourceBySlug,
  getAllResourceSlugsAllLocales,
  getRelatedResources,
  getAlternateLanguages,
  getProgramConfig
} from "@/lib/program-resources";
import { ResourcePageContent } from "@/components/resources";
import { siteConfig } from "@/config/site";

interface ResourcePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const programConfig = getProgramConfig("mocktrial");

export const dynamicParams = false;

export async function generateStaticParams() {
  const allSlugs = getAllResourceSlugsAllLocales("mocktrial");
  return allSlugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const resource = getResourceBySlug("mocktrial", slug, locale);

  if (!resource) {
    const t = await getTranslations({ locale, namespace: programConfig.detailTranslationNamespace });
    return {
      title: t("notFoundTitle"),
    };
  }

  // Build alternate languages for SEO
  const alternates = getAlternateLanguages("mocktrial", slug, locale);
  const languages: Record<string, string> = {};

  // Add current locale
  languages[locale] = locale === "en"
    ? `${programConfig.basePath}/${slug}`
    : `/${locale}${programConfig.basePath}/${slug}`;

  // Add alternate locales
  for (const alt of alternates) {
    languages[alt.locale] = alt.locale === "en"
      ? `${programConfig.basePath}/${alt.slug}`
      : `/${alt.locale}${programConfig.basePath}/${alt.slug}`;
  }

  return {
    title: `${resource.title} | JAMUN Mock Trial Resources`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "article",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}${programConfig.basePath}/${slug}`,
      languages,
    },
  };
}

export default async function MockTrialResourcePage({ params }: ResourcePageProps) {
  const { slug, locale } = await params;
  const resource = getResourceBySlug("mocktrial", slug, locale);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources("mocktrial", slug, 4, locale);

  return (
    <ResourcePageContent
      resource={resource}
      relatedResources={relatedResources}
      programConfig={programConfig}
    />
  );
}
