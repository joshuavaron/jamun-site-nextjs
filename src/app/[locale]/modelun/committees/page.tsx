import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllCommittees } from "@/lib/committees";
import CommitteesPageContent from "./CommitteesPageContent";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { routing, ogLocale } from "@/i18n/routing";

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
      url: localizedUrl(locale, "/modelun/committees"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/modelun/committees"),
  };
}

export default async function CommitteesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const committees = getAllCommittees(locale);

  return <CommitteesPageContent committees={committees} />;
}
