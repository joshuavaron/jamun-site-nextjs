import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DonatePage } from "@/components/sections/DonatePage";
import { siteConfig, defaultOgImage } from "@/config/site";
import { ogLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DonatePageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/donate`,
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/donate`,
      languages: {
        en: "/donate",
        es: "/es/donate",
        zh: "/zh/donate",
        ar: "/ar/donate",
        hi: "/hi/donate",
        tr: "/tr/donate",
      },
    },
  };
}

export default async function Donate({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DonatePage />;
}
