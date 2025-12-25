import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

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
    alternates: {
      canonical: `${siteConfig.url}/privacy`,
      languages: {
        en: "/privacy",
        es: "/es/privacy",
      },
    },
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
