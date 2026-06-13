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
  const t = await getTranslations({ locale, namespace: "SupportersPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "JAMUN supporters",
      "community partners",
      "nonprofit donors",
      "advisory board",
      "support academic competitions",
      "youth nonprofit sponsors",
      "education partners",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl(locale, "/supporters"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/supporters"),
  };
}

export default function SupportersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
