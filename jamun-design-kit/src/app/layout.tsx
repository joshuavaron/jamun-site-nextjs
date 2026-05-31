import type { Metadata, Viewport } from "next";
import "./globals.css";

// Example root layout. The two <link rel="preload"> tags warm the most-used
// self-hosted fonts; the Typekit stylesheet loads Freight Text Pro (the serif
// display family). See SETUP.md — swap the Typekit URL for your own kit, or
// replace the serif with a self-hosted / Google font.

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#397bce",
};

export const metadata: Metadata = {
  title: "Design Kit Starter",
  description: "A starter built on the JAMUN design system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
        {/* Adobe Typekit: Freight Text Pro (serif display headings).
            Replace with your own kit URL, or remove and self-host. */}
        <link rel="stylesheet" href="https://use.typekit.net/vxu0ezk.css" />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
