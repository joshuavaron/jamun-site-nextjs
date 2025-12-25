// Root layout - minimal wrapper that delegates to [locale] layout
// This is required for next-intl to work with App Router

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
