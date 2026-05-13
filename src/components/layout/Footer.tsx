"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const fontBody = { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" };

export function Footer() {
  const t = useTranslations("Footer");

  const FOOTER_COLUMNS = [
    {
      title: t("programsTitle"),
      links: [
        { label: t("modelUN"), href: "/modelun" },
        { label: t("mockTrial"), href: "/mocktrial" },
        { label: t("mathletes"), href: "/mathletes" },
      ],
    },
    {
      title: t("organizationTitle"),
      links: [
        { label: t("aboutUs"), href: "/about" },
        { label: t("supportersLink"), href: "/supporters" },
        { label: t("contact"), href: "mailto:contact@jamun.org" },
      ],
    },
    {
      title: t("resourcesTitle"),
      links: [
        { label: t("blogLink"), href: "/blog" },
        { label: t("privacyPolicy"), href: "/privacy" },
        { label: t("termsOfService"), href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0f172a] text-neutral-300" style={fontBody}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-16 lg:px-24 py-10 md:py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center mb-3"
              aria-label={t("logoAlt")}
            >
              <div className="relative h-8 w-44">
                <Image
                  src="/images/logos/jamun-white-side-logo.svg"
                  alt={t("logoAlt")}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">
              {t("tagline")}
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {t("nonprofit")}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-3">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("mailto:") ? (
                      <a
                        href={l.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-neutral-500">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
