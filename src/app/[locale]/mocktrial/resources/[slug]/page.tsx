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
import { defaultOgImage } from "@/config/site";
import { contentAlternates, localizedUrl } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateLearningResourceSchema,
  jsonLdScript,
} from "@/lib/structured-data";
import { ogLocale, bcp47Locale } from "@/i18n/routing";

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

  // Build content-driven alternates (only locales with a real translation) +
  // self-canonical + x-default -> English.
  const alternates = getAlternateLanguages("mocktrial", slug, locale);
  const seoAlternates = contentAlternates(
    locale,
    `${programConfig.basePath}/${slug}`,
    alternates.map((alt) => ({
      locale: alt.locale,
      path: `${programConfig.basePath}/${alt.slug}`,
    })),
  );

  return {
    title: `${resource.title} | JAMUN Mock Trial Resources`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      url: seoAlternates.canonical,
      type: "article",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: seoAlternates,
  };
}

export default async function MockTrialResourcePage({ params }: ResourcePageProps) {
  const { slug, locale } = await params;
  const resource = getResourceBySlug("mocktrial", slug, locale);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources("mocktrial", slug, 4, locale);

  const canonicalUrl = localizedUrl(locale, `${programConfig.basePath}/${slug}`);
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const learningResourceSchema = generateLearningResourceSchema({
    title: resource.title,
    description: resource.description,
    url: canonicalUrl,
    inLanguage: bcp47Locale(locale),
  });
  const breadcrumbSchema = generateBreadcrumbSchema(locale, [
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("mockTrial"), url: "/mocktrial" },
    { name: tBreadcrumbs("resources"), url: programConfig.basePath },
    { name: resource.title, url: `${programConfig.basePath}/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([learningResourceSchema, breadcrumbSchema]),
        }}
      />
      <ResourcePageContent
        resource={resource}
        relatedResources={relatedResources}
        programConfig={programConfig}
      />
    </>
  );
}
