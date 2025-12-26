import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllResources } from "@/lib/resources";
import ResourcesPageContent from "./ResourcesPageContent";
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
  const t = await getTranslations({ locale, namespace: "ResourcesPageMetadata" });

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
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/modelun/resources`,
      languages: {
        en: "/modelun/resources",
        es: "/es/modelun/resources",
      },
    },
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resources = getAllResources(locale);

  return <ResourcesPageContent resources={resources} />;
}
