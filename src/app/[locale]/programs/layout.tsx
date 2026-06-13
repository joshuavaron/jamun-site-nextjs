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
  const t = await getTranslations({ locale, namespace: "ProgramsPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Model UN programs",
      "Mock Trial for middle school",
      "Mathletes competitions",
      "middle school debate",
      "academic competitions",
      "extracurricular activities grades 5-8",
      "public speaking programs",
      "critical thinking activities",
      "youth leadership development",
      "affordable academic programs",
      "MATHCOUNTS preparation",
      "AMC 8 training",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl(locale, "/programs"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/programs"),
  };
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
