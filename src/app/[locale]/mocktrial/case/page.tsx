import { notFound } from "next/navigation";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getActiveCase } from "@/lib/cases";
import { CaseLandingContent } from "@/components/cases";
import { siteConfig, defaultOgImage } from "@/config/site";
import { routing, ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const manifest = getActiveCase(locale);

  if (!manifest) {
    return { title: "Case Not Found | JAMUN Mock Trial" };
  }

  const url = `${siteConfig.url}${locale === "en" ? "" : `/${locale}`}/mocktrial/case`;

  return {
    title: `${manifest.title} | JAMUN Mock Trial`,
    description: manifest.description,
    openGraph: {
      title: manifest.title,
      description: manifest.description,
      type: "article",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: { canonical: url },
  };
}

export default async function CaseLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const manifest = getActiveCase(locale);

  if (!manifest) {
    notFound();
  }

  return <CaseLandingContent manifest={manifest} />;
}
