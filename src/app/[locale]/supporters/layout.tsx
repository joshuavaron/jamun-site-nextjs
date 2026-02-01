import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig, defaultOgImage } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SupportersPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "JAMUN supporters",
      "community partners",
      "nonprofit donors",
      "advisory board",
      "support academic competitions",
      "youth nonprofit sponsors",
      "education partners",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/supporters`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/supporters`,
      languages: {
        en: "/supporters",
        es: "/es/supporters",
      },
    },
  };
}

export default function SupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
