import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.motto}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Model UN",
    "Mock Trial",
    "Mathletes",
    "middle school",
    "academic competition",
    "public speaking",
    "debate",
    "leadership",
    "youth education",
    "nonprofit",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
