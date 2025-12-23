"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Pages that should not show header/footer (immersive/trapped pages)
const HEADERLESS_PAGES = ["/donate"];

interface LayoutWrapperProps {
  header: ReactNode;
  footer: ReactNode;
  scrollToTop: ReactNode;
  children: ReactNode;
}

export function LayoutWrapper({
  header,
  footer,
  scrollToTop,
  children,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHeaderless = HEADERLESS_PAGES.some((page) => pathname.startsWith(page));

  if (isHeaderless) {
    return <main className="min-h-screen overflow-x-hidden">{children}</main>;
  }

  return (
    <>
      {scrollToTop}
      {header}
      <main className="min-h-screen pt-14 md:pt-16 overflow-x-hidden">{children}</main>
      {footer}
    </>
  );
}
