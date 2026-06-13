import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "about JAMUN",
      "youth-led nonprofit",
      "student organization",
      "Model UN nonprofit",
      "academic competition organization",
      "middle school programs",
      "volunteer-run nonprofit",
      "Make Academics Fun",
      "educational nonprofit",
      "student volunteers",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl(locale, "/about"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/about"),
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
