import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllMathletesResources } from "@/lib/mathletes-resources";
import MathletesResourcesPageContent from "./MathletesResourcesPageContent";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MathletesResourcesPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "MATHCOUNTS preparation",
      "AMC 8 practice problems",
      "Math League resources",
      "competitive math study guide",
      "number theory problems",
      "algebra competition prep",
      "geometry problem solving",
      "math olympiad middle school",
      "mental math strategies",
      "math competition tips",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/mathletes/resources`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/mathletes/resources`,
      languages: {
        en: "/mathletes/resources",
        es: "/es/mathletes/resources",
      },
    },
  };
}

export default function MathletesResourcesPage() {
  const resources = getAllMathletesResources();

  return <MathletesResourcesPageContent resources={resources} />;
}
