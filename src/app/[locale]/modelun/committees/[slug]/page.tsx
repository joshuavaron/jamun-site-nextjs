import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCommitteeBySlug, getAllCommitteeSlugsAllLocales, getAlternateLanguages } from "@/lib/committees";
import CommitteePageContent from "./CommitteePageContent";
import { defaultOgImage } from "@/config/site";
import { contentAlternates } from "@/lib/seo";
import { generateBreadcrumbSchema, jsonLdScript } from "@/lib/structured-data";
import { ogLocale } from "@/i18n/routing";

interface CommitteePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const allSlugs = getAllCommitteeSlugsAllLocales();
  return allSlugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: CommitteePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const committee = getCommitteeBySlug(slug, locale);

  if (!committee) {
    const t = await getTranslations({ locale, namespace: "CommitteeDetailPage" });
    return {
      title: t("notFoundTitle"),
    };
  }

  // Build content-driven alternates (committees are EN-only today) +
  // self-canonical + x-default -> English.
  const alternates = getAlternateLanguages(slug, locale);
  const seoAlternates = contentAlternates(
    locale,
    `/modelun/committees/${slug}`,
    alternates.map((alt) => ({
      locale: alt.locale,
      path: `/modelun/committees/${alt.slug}`,
    })),
  );

  return {
    title: `${committee.name} (${committee.abbreviation}) | JAMUN Model UN`,
    description: `${committee.topic} - ${committee.description}`,
    openGraph: {
      title: `${committee.abbreviation}: ${committee.topic}`,
      description: committee.description,
      url: seoAlternates.canonical,
      type: "website",
      images: [defaultOgImage],
      locale: ogLocale(locale),
    },
    alternates: seoAlternates,
  };
}

export default async function CommitteePage({ params }: CommitteePageProps) {
  const { slug, locale } = await params;
  const committee = getCommitteeBySlug(slug, locale);

  if (!committee) {
    notFound();
  }

  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const breadcrumbSchema = generateBreadcrumbSchema(locale, [
    { name: tBreadcrumbs("home"), url: "/" },
    { name: tBreadcrumbs("modelUN"), url: "/modelun" },
    { name: tBreadcrumbs("committees"), url: "/modelun/committees" },
    { name: committee.name, url: `/modelun/committees/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />
      <CommitteePageContent committee={committee} />
    </>
  );
}
