import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import Link from "next/link";
import { Compass, Home, Search, ArrowLeft } from "lucide-react";

// Root-level 404 - renders when no locale segment matches
// Uses the default locale for translations
export default async function RootNotFound() {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });

  return (
    <html lang={locale}>
      <body className="antialiased">
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-20">
            {/* 404 display */}
            <div className="mb-8">
              <div className="relative inline-block">
                <span className="text-[120px] sm:text-[160px] md:text-[200px] font-bold bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent leading-none">
                  404
                </span>
                {/* Floating compass icon */}
                <div className="absolute -top-2 -right-4 sm:-right-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-jamun-orange to-amber-400 flex items-center justify-center shadow-lg">
                    <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                {t("heading")}{" "}
                <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
                  {t("headingHighlight")}
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-jamun-blue text-white font-medium hover:bg-jamun-blue/90 transition-colors"
              >
                <Home className="h-5 w-5" />
                {t("backHome")}
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <Search className="h-5 w-5" />
                {t("explorePrograms")}
              </Link>
            </div>

            {/* Helpful links */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-card)]">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {t("popularDestinations")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: t("linkModelUN"), href: "/modelun" },
                  { name: t("linkMockTrial"), href: "/mocktrial" },
                  { name: t("linkMathletes"), href: "/mathletes" },
                  { name: t("linkAbout"), href: "/about" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-jamun-blue/10 border border-gray-100 hover:border-jamun-blue/30 transition-all duration-300"
                  >
                    <span className="text-gray-700 group-hover:text-jamun-blue font-medium transition-colors">
                      {link.name}
                    </span>
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-jamun-blue rotate-180 transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
