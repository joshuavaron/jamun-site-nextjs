import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getResourceBySlug, getAllResourceSlugsAllLocales, getRelatedResources, getAlternateLanguages } from "@/lib/resources";
import ResourcePageContent from "./ResourcePageContent";
import { siteConfig } from "@/config/site";

interface ResourcePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const allSlugs = getAllResourceSlugsAllLocales();
  return allSlugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const resource = getResourceBySlug(slug, locale);

  if (!resource) {
    const t = await getTranslations({ locale, namespace: "ResourcesPage" });
    return {
      title: t("notFoundTitle"),
    };
  }

  // Build alternate languages for SEO
  const alternates = getAlternateLanguages(slug, locale);
  const languages: Record<string, string> = {};

  // Add current locale
  languages[locale] = locale === "en" ? `/modelun/resources/${slug}` : `/${locale}/modelun/resources/${slug}`;

  // Add alternate locales
  for (const alt of alternates) {
    languages[alt.locale] = alt.locale === "en" ? `/modelun/resources/${alt.slug}` : `/${alt.locale}/modelun/resources/${alt.slug}`;
  }

  return {
    title: `${resource.title} | JAMUN Model UN Resources`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "article",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}/modelun/resources/${slug}`,
      languages,
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug, locale } = await params;
  const resource = getResourceBySlug(slug, locale);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources(slug, 4, locale);

  return <ResourcePageContent resource={resource} relatedResources={relatedResources} />;
}
