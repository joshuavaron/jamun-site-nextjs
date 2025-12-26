import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllMockTrialResources } from "@/lib/mocktrial-resources";
import MockTrialResourcesPageContent from "./MockTrialResourcesPageContent";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MockTrialResourcesPageMetadata" });

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
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/mocktrial/resources`,
      languages: {
        en: "/mocktrial/resources",
        es: "/es/mocktrial/resources",
      },
    },
  };
}

export default async function MockTrialResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resources = getAllMockTrialResources();

  return <MockTrialResourcesPageContent resources={resources} />;
}
