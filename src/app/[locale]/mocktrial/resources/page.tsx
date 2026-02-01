import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllResources, getProgramConfig } from "@/lib/program-resources";
import { ResourcesPageContent } from "@/components/resources";
import { siteConfig, defaultOgImage } from "@/config/site";
import { routing } from "@/i18n/routing";

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
      url: `${siteConfig.url}/mocktrial/resources`,
      type: "website",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/mocktrial/resources`,
      languages: {
        en: "/mocktrial/resources",
        es: "/es/mocktrial/resources",
        zh: "/zh/mocktrial/resources",
      },
    },
  };
}

export default async function MockTrialResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resources = getAllResources("mocktrial", locale);

  return <ResourcesPageContent resources={resources} programConfig={programConfig} />;
}
