import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BGWriterPageContent from "./BGWriterPageContent";
import { siteConfig, defaultOgImage } from "@/config/site";

interface BGWriterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BGWriterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BGWriterMetadata" });

  const basePath = "/modelun/resources/position-paper-writer";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "es" ? "es_ES" : locale === "zh" ? "zh_CN" : "en_US",
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}${basePath}`,
      languages: {
        en: basePath,
        es: `/es${basePath}`,
        zh: `/zh${basePath}`,
      },
    },
  };
}

export default async function BGWriterPage({ params }: BGWriterPageProps) {
  // Await params to satisfy Next.js 15 requirements
  await params;

  return <BGWriterPageContent />;
}
