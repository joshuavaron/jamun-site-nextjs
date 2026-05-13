import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RegisterPage } from "@/components/sections/RegisterPage";
import { siteConfig, defaultOgImage } from "@/config/site";
import { ogLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "RegisterPageMetadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${siteConfig.url}/register`,
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/register`,
      languages: {
        en: "/register",
        es: "/es/register",
        zh: "/zh/register",
        ar: "/ar/register",
        hi: "/hi/register",
        tr: "/tr/register",
      },
    },
  };
}

export default async function Register({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RegisterPage />;
}
