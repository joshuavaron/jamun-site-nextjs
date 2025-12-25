import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LeaderboardsPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Model UN leaderboard",
      "Mock Trial rankings",
      "Mathletes competition results",
      "academic competition standings",
      "school rankings",
      "delegate awards",
      "competition results",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/leaderboards`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/leaderboards`,
      languages: {
        en: "/leaderboards",
        es: "/es/leaderboards",
      },
    },
  };
}

export default function LeaderboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
