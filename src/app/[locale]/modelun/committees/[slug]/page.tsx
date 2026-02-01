import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCommitteeBySlug, getAllCommitteeSlugsAllLocales, getAlternateLanguages } from "@/lib/committees";
import CommitteePageContent from "./CommitteePageContent";
import { siteConfig, defaultOgImage } from "@/config/site";

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

  // Build alternate languages for SEO
  const alternates = getAlternateLanguages(slug, locale);
  const languages: Record<string, string> = {};

  // Add current locale
  languages[locale] = locale === "en" ? `/modelun/committees/${slug}` : `/${locale}/modelun/committees/${slug}`;

  // Add alternate locales
  for (const alt of alternates) {
    languages[alt.locale] = alt.locale === "en" ? `/modelun/committees/${alt.slug}` : `/${alt.locale}/modelun/committees/${alt.slug}`;
  }

  return {
    title: `${committee.name} (${committee.abbreviation}) | JAMUN Model UN`,
    description: `${committee.topic} - ${committee.description}`,
    openGraph: {
      title: `${committee.abbreviation}: ${committee.topic}`,
      description: committee.description,
      type: "website",
      images: [defaultOgImage],
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}/modelun/committees/${slug}`,
      languages,
    },
  };
}

export default async function CommitteePage({ params }: CommitteePageProps) {
  const { slug, locale } = await params;
  const committee = getCommitteeBySlug(slug, locale);

  if (!committee) {
    notFound();
  }

  return <CommitteePageContent committee={committee} />;
}
