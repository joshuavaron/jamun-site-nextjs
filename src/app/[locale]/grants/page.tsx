import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GrantsPage } from "@/components/sections/GrantsPage";
import { siteConfig, defaultOgImage } from "@/config/site";
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
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteConfig.url}/grants`,
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/grants`,
      languages: {
        en: "/grants",
        es: "/es/grants",
        zh: "/zh/grants",
        ar: "/ar/grants",
        hi: "/hi/grants",
        tr: "/tr/grants",
      },
    },
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
