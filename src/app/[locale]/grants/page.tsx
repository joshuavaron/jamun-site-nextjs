import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GrantsPage } from "@/components/sections/GrantsPage";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { ogLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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
      url: localizedUrl(locale, "/grants"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/grants"),
  };
}

export default async function Grants({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GrantsPage />;
}
