"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Home, Search, ArrowLeft, Compass } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/20 to-jamun-blue/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-20">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-[120px] sm:text-[160px] md:text-[200px] font-bold bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent leading-none">
              404
            </span>
            {/* Floating compass icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-4 sm:-right-8"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-jamun-orange to-amber-400 flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            {t("heading")}{" "}
            <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
              {t("headingHighlight")}
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button href="/" size="lg" className="group">
            <Home className="mr-2 h-5 w-5" />
            {t("backHome")}
          </Button>
          <Button href="/programs" variant="outline" size="lg" className="group">
            <Search className="mr-2 h-5 w-5" />
            {t("explorePrograms")}
          </Button>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {t("popularDestinations")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: t("linkModelUN"), href: "/modelun" },
              { name: t("linkMockTrial"), href: "/mocktrial" },
              { name: t("linkMathletes"), href: "/mathletes" },
              { name: t("linkAbout"), href: "/about" },
            ].map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-jamun-blue/10 border border-gray-100 hover:border-jamun-blue/30 transition-all duration-300"
                >
                  <span className="text-gray-700 group-hover:text-jamun-blue font-medium transition-colors">
                    {link.name}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-jamun-blue rotate-180 transition-all group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
