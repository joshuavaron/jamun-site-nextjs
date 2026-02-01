import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig, defaultOgImage } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "about JAMUN",
      "youth-led nonprofit",
      "student organization",
      "Model UN nonprofit",
      "academic competition organization",
      "middle school programs",
      "volunteer-run nonprofit",
      "Make Academics Fun",
      "educational nonprofit",
      "student volunteers",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/about`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/about`,
      languages: {
        en: "/about",
        es: "/es/about",
      },
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
