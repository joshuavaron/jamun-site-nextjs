import { Metadata } from "next";
import { defaultOgImage } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { ogLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = "Joshua Varon — Founder of JAMUN";
  const description =
    "Meet Joshua Varon, President & Founder of JAMUN. Duke mathematics and computer science student building a nonprofit that makes academic competition accessible to every middle schooler.";

  return {
    title,
    description,
    keywords: [
      "Joshua Varon",
      "JAMUN founder",
      "JAMUN president",
      "youth-led nonprofit founder",
      "Duke University student",
      "Model UN founder",
      "academic competition nonprofit",
    ],
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, "/about/joshua"),
      type: "profile",
      locale: ogLocale(locale),
      images: [defaultOgImage],
    },
    alternates: staticAlternates(locale, "/about/joshua"),
  };
}

export default function JoshuaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
