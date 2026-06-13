import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SummaryPage } from "@/components/sections";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

// The summary body is English-only, so the meta copy is English while the
// canonical/hreflang/OG URLs are locale-aware (the page renders under every
// locale's UI chrome). Indexable and listed in the sitemap.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = "A One-Page Overview";
  const description =
    "A one-page overview of JAMUN — a 100% volunteer-run 501(c)(3) nonprofit running low-cost academic competitions and free resources for middle schoolers.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, "/summary"),
      type: "website",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/summary"),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SummaryPage />;
}
