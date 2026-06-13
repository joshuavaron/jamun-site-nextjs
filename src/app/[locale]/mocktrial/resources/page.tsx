import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllResources, getProgramConfig } from "@/lib/program-resources";
import { ResourcesPageContent } from "@/components/resources";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { routing, ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const programConfig = getProgramConfig("mocktrial");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: programConfig.metaTranslationNamespace });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Mock Trial resources",
      "cross-examination tips",
      "opening statement guide",
      "closing argument techniques",
      "Mock Trial objections",
      "courtroom procedure",
      "direct examination",
      "witness preparation",
      "Mock Trial case analysis",
      "legal argumentation students",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl(locale, "/mocktrial/resources"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/mocktrial/resources"),
  };
}

export default async function MockTrialResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resources = getAllResources("mocktrial", locale);

  return <ResourcesPageContent resources={resources} programConfig={programConfig} />;
}
