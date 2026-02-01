import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllResources, getProgramConfig } from "@/lib/program-resources";
import { ResourcesPageContent } from "@/components/resources";
import { siteConfig, defaultOgImage } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const programConfig = getProgramConfig("modelun");

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
      "Model UN resources",
      "position paper template",
      "MUN resolution writing",
      "Model UN speech tips",
      "parliamentary procedure guide",
      "MUN delegate guide",
      "Model UN for beginners",
      "how to write position paper",
      "Model UN committee rules",
      "MUN opening speech",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/modelun/resources`,
      type: "website",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/modelun/resources`,
      languages: {
        en: "/modelun/resources",
        es: "/es/modelun/resources",
        zh: "/zh/modelun/resources",
      },
    },
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resources = getAllResources("modelun", locale);

  return <ResourcesPageContent resources={resources} programConfig={programConfig} />;
}
