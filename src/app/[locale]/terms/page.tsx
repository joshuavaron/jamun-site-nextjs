"use client";

import { motion } from "framer-motion";
import { Section, TypewriterText } from "@/components/ui";
import { FileText, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsOfServicePage() {
  const t = useTranslations("TermsPage");
  const lastUpdated = "December 2024";

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20"
          >
            <FileText className="w-4 h-4" />
            {t("heroBadge")}
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
            <TypewriterText text={t("heroTitle1")} delay={0.3} />
            <TypewriterText
              text={t("heroTitle2")}
              delay={0.3 + 9 * 0.03}
              className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("lastUpdated", { date: lastUpdated })}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <Section background="white" className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-gray max-w-none">
            {/* Agreement to Terms */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 p-6 bg-amber-50 rounded-2xl border border-amber-100"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("agreementTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("agreementText")}
              </p>
            </motion.div>

            {/* About JAMUN */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("aboutTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("aboutText")}
              </p>
            </motion.div>

            {/* Program Participation */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("participationTitle")}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("eligibilityTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t("eligibilityText")}
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("conductTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("conductText")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>{t("conductItem1")}</li>
                <li>{t("conductItem2")}</li>
                <li>{t("conductItem3")}</li>
                <li>{t("conductItem4")}</li>
                <li>{t("conductItem5")}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                {t("conductRemoval")}
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("registrationTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("registrationText")}
              </p>
            </motion.div>

            {/* Website Use */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("websiteUseTitle")}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("permittedUseTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("permittedUseText")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>{t("permittedUseItem1")}</li>
                <li>{t("permittedUseItem2")}</li>
                <li>{t("permittedUseItem3")}</li>
                <li>{t("permittedUseItem4")}</li>
                <li>{t("permittedUseItem5")}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("userAccountsTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("userAccountsText")}
              </p>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("intellectualPropertyTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("intellectualPropertyText1")}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t("intellectualPropertyText2")}
              </p>
            </motion.div>

            {/* Donations */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 p-6 bg-jamun-blue/5 rounded-2xl border border-jamun-blue/10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("donationsTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("donationsText")}
              </p>
            </motion.div>

            {/* Disclaimer of Warranties */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("disclaimerTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("disclaimerText")}
              </p>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("liabilityTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("liabilityText")}
              </p>
            </motion.div>

            {/* Indemnification */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("indemnificationTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("indemnificationText")}
              </p>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("changesToTermsTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("changesToTermsText")}
              </p>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("governingLawTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("governingLawText")}
              </p>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 bg-gradient-to-br from-jamun-blue/5 via-purple-50/50 to-white rounded-2xl border border-gray-100"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("contactTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t("contactText")}
              </p>
              <a
                href="mailto:contact@jamun.org"
                className="inline-flex items-center gap-3 px-6 py-3 bg-jamun-blue text-white font-medium rounded-full hover:bg-jamun-blue-dark transition-colors"
              >
                <Mail className="w-5 h-5" />
                contact@jamun.org
              </a>
            </motion.div>
          </div>
        </div>
      </Section>
    </main>
  );
}
