import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllCommittees } from "@/lib/committees";
import CommitteesPageContent from "./CommitteesPageContent";
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
  const t = await getTranslations({ locale, namespace: "CommitteesPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Model UN committees",
      "General Assembly simulation",
      "Security Council MUN",
      "ECOSOC Model UN",
      "beginner MUN committees",
      "middle school Model UN",
      "UN committee simulation",
      "delegate committee selection",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/modelun/committees`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/modelun/committees`,
      languages: {
        en: "/modelun/committees",
        es: "/es/modelun/committees",
      },
    },
  };
}

export default async function CommitteesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const committees = getAllCommittees(locale);

  return <CommitteesPageContent committees={committees} />;
}
