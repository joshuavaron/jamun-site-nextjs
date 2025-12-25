import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GrantsPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "student grants",
      "academic competition funding",
      "Model UN financial aid",
      "school program grants",
      "student scholarship",
      "competition registration fee assistance",
      "education grants middle school",
      "extracurricular funding",
      "nonprofit student grants",
      "affordable academic programs",
      "underserved school funding",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/grants`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/grants`,
      languages: {
        en: "/grants",
        es: "/es/grants",
      },
    },
  };
}

export default function GrantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
