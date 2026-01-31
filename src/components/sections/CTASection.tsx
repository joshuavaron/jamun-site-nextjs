"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Heart } from "lucide-react";
import { Button, Badge, Card, Section } from "@/components/ui";
import { fadeInUp, defaultViewport, tapScale } from "@/lib/animations";

export function CTASection() {
  const t = useTranslations("CTASection");
  return (
    <Section background="cream" pattern="dots">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
      >
        <Card variant="elevated" className="p-8 md:p-12 text-center">
          {/* Friendly badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Badge variant="accent" dot size="lg" icon={Heart}>
              {t("badge")}
            </Badge>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6">
            {t("title")}{" "}
            <span className="text-jamun-blue">{t("titleHighlight")}</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="primary" dot size="lg">
                {t("feature1")}
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="purple" dot size="lg">
                {t("feature2")}
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Badge variant="emerald" dot size="lg">
                {t("feature3")}
              </Badge>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={tapScale}>
              <Button href="/register" size="lg" iconRight={ArrowRight}>
                {t("primaryCTA")}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={tapScale}>
              <Button href="/programs" variant="outline" size="lg">
                {t("secondaryCTA")}
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            {t("contactText")}{" "}
            <a
              href="mailto:contact@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              contact@jamun.org
            </a>
          </motion.p>
        </Card>
      </motion.div>
    </Section>
  );
}
