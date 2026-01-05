"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FileWarning, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogPostError({ error, reset }: ErrorProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error("Blog post error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-jamun-blue/10 mb-6">
            <FileWarning className="w-10 h-10 text-jamun-blue" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {t("blogPostTitle")}
          </h1>
          <p className="text-gray-600">
            {t("blogPostDescription")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/blog" variant="primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToBlog")}
          </Button>
          <Button href="/" variant="outline">
            <Home className="w-4 h-4 mr-2" />
            {t("goHome")}
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
