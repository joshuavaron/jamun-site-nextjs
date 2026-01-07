import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllResources, getProgramConfig } from "@/lib/program-resources";
import { ResourcesPageContent } from "@/components/resources";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const programConfig = getProgramConfig("mathletes");

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
      "MATHCOUNTS preparation",
      "AMC 8 practice problems",
      "Math League resources",
      "competitive math study guide",
      "number theory problems",
      "algebra competition prep",
      "geometry problem solving",
      "math olympiad middle school",
      "mental math strategies",
      "math competition tips",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/mathletes/resources`,
      type: "website",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/mathletes/resources`,
      languages: {
        en: "/mathletes/resources",
        es: "/es/mathletes/resources",
        zh: "/zh/mathletes/resources",
      },
    },
  };
}

export default async function MathletesResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resources = getAllResources("mathletes", locale);

  return <ResourcesPageContent resources={resources} programConfig={programConfig} />;
}
