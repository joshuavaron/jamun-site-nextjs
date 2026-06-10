import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getActiveFullCase } from "@/lib/cases";
import { CaseFullContent } from "@/components/cases";
import { siteConfig, defaultOgImage } from "@/config/site";
import { routing, ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const fullCase = getActiveFullCase(locale);

  if (!fullCase) {
    return { title: "Case Not Found | JAMUN Mock Trial" };
  }

  const t = await getTranslations({ locale, namespace: "MockTrialCases" });
  const { manifest } = fullCase;
  const url = `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}/mocktrial/case/full`;

  return {
    title: `${manifest.title} — ${t("fullCaseLabel")} | JAMUN Mock Trial`,
    description: manifest.description,
    openGraph: {
      title: `${manifest.title} — ${t("fullCaseLabel")}`,
      description: manifest.description,
      type: "article",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: { canonical: url },
  };
}

export default async function CaseFullPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fullCase = getActiveFullCase(locale);

  if (!fullCase) {
    notFound();
  }

  return <CaseFullContent fullCase={fullCase} />;
}
