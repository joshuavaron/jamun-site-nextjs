"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { X, Globe, Heart } from "lucide-react";

export function TranslationNotice() {
  const locale = useLocale();
  const t = useTranslations("TranslationNotice");
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Only show for non-English locales
    if (locale === "en") {
      setIsVisible(false);
      return;
    }

    // Check if user has already dismissed this notice in this session
    const dismissedKey = `translation-notice-dismissed-${locale}`;
    const dismissed = sessionStorage.getItem(dismissedKey);

    if (!dismissed) {
      // Small delay before showing the notice
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [locale]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    const dismissedKey = `translation-notice-dismissed-${locale}`;
    sessionStorage.setItem(dismissedKey, "true");
  };

  if (locale === "en" || hasDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header gradient */}
              <div className="h-2 bg-gradient-to-r from-jamun-blue via-purple-500 to-jamun-orange" />

              <div className="p-6 md:p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jamun-blue/10 to-purple-100 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-jamun-blue" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-2">
                  {t("title")}
                </h2>

                {/* Subtitle with heart */}
                <p className="text-center text-jamun-blue font-medium mb-6 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 fill-jamun-blue" />
                  {t("subtitle")}
                  <Heart className="w-4 h-4 fill-jamun-blue" />
                </p>

                {/* Message */}
                <div className="space-y-4 text-gray-600 text-center">
                  <p>{t("message1")}</p>
                  <p className="text-sm text-gray-500">{t("message2")}</p>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={handleDismiss}
                  className="mt-8 w-full py-3 px-6 bg-jamun-blue text-white font-medium rounded-full hover:bg-jamun-blue-dark transition-colors duration-200"
                >
                  {t("dismiss")}
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={t("closeAriaLabel")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
