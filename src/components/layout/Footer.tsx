"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

// Footer link configurations with translation keys
const programLinks = [
  { key: "modelUN", href: "/modelun" },
  { key: "mockTrial", href: "/mocktrial" },
  { key: "mathletes", href: "/mathletes" },
  { key: "leaderboards", href: "/leaderboards" },
] as const;

const resourceLinks = [
  { key: "blog", href: "/blog" },
  { key: "privacyPolicy", href: "/privacy" },
  { key: "termsOfService", href: "/terms" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-10 w-44">
                <Image
                  src="/images/logos/jamun-white-side-logo.svg"
                  alt={t("logoAlt")}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              {t("tagline")}
            </p>
            <p className="text-xs text-gray-500">
              {t("nonprofit", { name: siteConfig.fullName })}
            </p>
          </div>

          {/* Link Columns - always side by side */}
          <div className="grid grid-cols-3 gap-6 lg:col-span-3 lg:gap-12">
            {/* Programs Column */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">{t("programs")}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {programLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organization Column */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">{t("organization")}</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/supporters"
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t("supporters")}
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contact@jamun.org"
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tNav("contact")}
                  </a>
                </li>
                <li>
                  <Link
                    href="/referral"
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t("referral")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">{t("resources")}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.key === "blog" ? tNav("blog") : t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center">
            {t("copyright", { year: currentYear, name: siteConfig.fullName })}
          </p>
        </div>
      </div>
    </footer>
  );
}
