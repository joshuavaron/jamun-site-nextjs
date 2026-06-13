import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DonatePage } from "@/components/sections/DonatePage";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
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
      url: localizedUrl(locale, "/donate"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/donate"),
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
