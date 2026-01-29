import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ReferralPageMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "school referral JAMUN",
      "Model UN for schools",
      "Mock Trial school program",
      "Mathletes school program",
      "academic competitions middle school",
      "free school programs",
      "extracurricular programs for schools",
      "standards-aligned academic programs",
      "grants for school competitions",
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteConfig.url}/referral`,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    alternates: {
      canonical: `${siteConfig.url}/referral`,
      languages: {
        en: "/referral",
        es: "/es/referral",
      },
    },
  };
}

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
