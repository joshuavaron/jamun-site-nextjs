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
  const t = await getTranslations({ locale, namespace: "PrivacyPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale, "/privacy"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/privacy"),
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
