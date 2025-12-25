import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DonatePageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "donate to education nonprofit",
      "support academic competitions",
      "tax-deductible donation",
      "501(c)(3) education",
      "fund student programs",
      "Model UN donation",
      "educational charity",
      "youth education nonprofit",
      "school program funding",
      "academic enrichment donation",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/donate`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/donate`,
      languages: {
        en: "/donate",
        es: "/es/donate",
      },
    },
  };
}

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
