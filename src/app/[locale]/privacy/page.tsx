"use client";

import { motion } from "framer-motion";
import { Section, TypewriterText } from "@/components/ui";
import { Shield, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPage");
  const lastUpdated = t("lastUpdatedDate");

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
            <Shield className="w-4 h-4" />
            {t("heroBadge")}
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
            <TypewriterText text={t("heroTitle1")} delay={0.3} />
            <TypewriterText
              text={t("heroTitle2")}
              delay={0.3 + 8 * 0.03}
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
            {/* Introduction */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("introTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("introText")}
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("infoCollectTitle")}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("personalInfoTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("personalInfoText")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>{t("personalInfoItem1")}</li>
                <li>{t("personalInfoItem2")}</li>
                <li>{t("personalInfoItem3")}</li>
                <li>{t("personalInfoItem4")}</li>
                <li>{t("personalInfoItem5")}</li>
              </ul>

              <p className="text-gray-600 leading-relaxed mb-4">
                {t("infoMayInclude")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>{t("infoItem1")}</li>
                <li>{t("infoItem2")}</li>
                <li>{t("infoItem3")}</li>
                <li>{t("infoItem4")}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {t("autoCollectTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("autoCollectText")}
              </p>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("howUseTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("howUseText")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("howUseItem1")}</li>
                <li>{t("howUseItem2")}</li>
                <li>{t("howUseItem3")}</li>
                <li>{t("howUseItem4")}</li>
                <li>{t("howUseItem5")}</li>
                <li>{t("howUseItem6")}</li>
              </ul>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("infoSharingTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("infoSharingText")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("infoSharingItem1")}</li>
                <li>{t("infoSharingItem2")}</li>
                <li>{t("infoSharingItem3")}</li>
              </ul>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 p-6 bg-jamun-blue/5 rounded-2xl border border-jamun-blue/10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("childrensPrivacyTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("childrensPrivacyText")}
              </p>
            </motion.div>

            {/* Photography and Video */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("photoVideoTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("photoVideoText1")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>{t("photoVideoItem1")}</li>
                <li>{t("photoVideoItem2")}</li>
                <li>{t("photoVideoItem3")}</li>
                <li>{t("photoVideoItem4")}</li>
                <li>{t("photoVideoItem5")}</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                {t("photoVideoText2")}{" "}
                <a href="mailto:contact@jamun.org" className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium">
                  contact@jamun.org
                </a>{" "}
                {t("photoVideoText3")}
              </p>
            </motion.div>

            {/* Data Security */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("dataSecurityTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("dataSecurityText")}
              </p>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("yourRightsTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("yourRightsText")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("yourRightsItem1")}</li>
                <li>{t("yourRightsItem2")}</li>
                <li>{t("yourRightsItem3")}</li>
                <li>{t("yourRightsItem4")}</li>
              </ul>
            </motion.div>

            {/* Cookies */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("cookiesTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("cookiesText")}
              </p>
            </motion.div>

            {/* Changes to This Policy */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {t("changesToPolicyTitle")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("changesToPolicyText")}
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
