import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { TranslationNotice } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { staticAlternates, localizedUrl } from "@/lib/seo";
import { routing, ogLocale, type Locale } from "@/i18n/routing";

const GTM_ID = "GTM-MXCXMJ3Z";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#397bce",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle"),
      template: siteConfig.seo.titleTemplate,
    },
    description: t("defaultDescription"),
    applicationName: t("siteName"),
    authors: [{ name: "JAMUN Team", url: siteConfig.url }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    creator: t("siteFullName"),
    publisher: t("siteName"),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url: localizedUrl(locale),
      siteName: t("siteFullName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "JAMUN - Affordable Academic Competitions for Middle School",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: "JAMUN - Affordable Academic Competitions for Middle School",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: staticAlternates(locale),
    category: "Education",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Preload critical fonts for faster rendering */}
        <link
          rel="preload"
          href="/fonts/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/outfit-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Typekit: Freight Text Pro for serif headers */}
        <link rel="stylesheet" href="https://use.typekit.net/vxu0ezk.css" />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper
            header={<Header />}
            footer={<Footer />}
            scrollToTop={<ScrollToTop />}
          >
            {children}
          </LayoutWrapper>
          <TranslationNotice />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
