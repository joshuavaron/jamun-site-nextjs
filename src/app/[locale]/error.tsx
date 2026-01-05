"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h1>
          <p className="text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("tryAgain")}
          </Button>
          <Button href="/" variant="outline">
            <Home className="w-4 h-4 mr-2" />
            {t("goHome")}
          </Button>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </main>
  );
}
