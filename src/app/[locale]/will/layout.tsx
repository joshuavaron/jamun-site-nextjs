import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WillPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Will Ballis",
      "Director of Mathletes",
      "JAMUN leadership",
      "math education",
      "competitive mathematics",
      "youth nonprofit leader",
      "MATHCOUNTS",
      "AMC 8",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/will`,
      type: "profile",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
      images: [
        {
          url: `${siteConfig.url}/images/team/will.webp`,
          width: 400,
          height: 400,
          alt: "Will Ballis - Director of Mathletes at JAMUN",
        },
      ],
    },
    alternates: {
      canonical: `${siteConfig.url}/will`,
      languages: {
        en: "/will",
        es: "/es/will",
        zh: "/zh/will",
      },
    },
  };
}

export default function WillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
