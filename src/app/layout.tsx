import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { siteConfig } from "@/config/site";

const GA_MEASUREMENT_ID = "G-JYTR5V7G12";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#397bce",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "JAMUN Team", url: siteConfig.url }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: "JAMUN - Junior Assembly of Model United Nations",
  publisher: "JAMUN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.seo.openGraph.siteName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    // OG image is auto-generated via /app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    // Twitter image is auto-generated via /app/opengraph-image.tsx
    creator: "@JAMUNorg",
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
  alternates: {
    canonical: siteConfig.url,
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <LayoutWrapper
          header={<Header />}
          footer={<Footer />}
          scrollToTop={<ScrollToTop />}
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
