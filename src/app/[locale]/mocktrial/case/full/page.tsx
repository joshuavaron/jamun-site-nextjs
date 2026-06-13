import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getActiveFullCase } from "@/lib/cases";
import { CaseFullContent } from "@/components/cases";
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
  const fullCase = getActiveFullCase(locale);

  if (!fullCase) {
    return { title: "Case Not Found | JAMUN Mock Trial" };
  }

  const t = await getTranslations({ locale, namespace: "MockTrialCases" });
  const { manifest } = fullCase;

  return {
    title: `${manifest.title} — ${t("fullCaseLabel")} | JAMUN Mock Trial`,
    description: manifest.description,
    openGraph: {
      title: `${manifest.title} — ${t("fullCaseLabel")}`,
      description: manifest.description,
      url: localizedUrl(locale, "/mocktrial/case/full"),
      type: "article",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/mocktrial/case/full"),
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
