import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a [locale] segment, this layout is only used
// for requests that don't match any locale (e.g., /unknown-page)
// These will be handled by the root not-found.tsx
export default function RootLayout({ children }: Props) {
  return children;
}
