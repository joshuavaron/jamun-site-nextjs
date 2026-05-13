"use client";

import { motion } from "framer-motion";
import { Shield, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container, Heading, PillButton } from "@/components/ui";
import { fontBody, bodySize } from "@/lib/typography";

// ────────── Prose section wrapper ──────────
function ProseSection({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PrivacyPage() {
  const t = useTranslations("PrivacyPage");
  const lastUpdated = t("lastUpdatedDate");

  return (
    <div className="bg-white text-[#0a0a0a]">
      {/* ───── Hero ───── */}
      <section className="bg-white pt-32 md:pt-40 pb-14 md:pb-20">
        <Container className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-semibold text-[#397bce] bg-[#397bce]/10 rounded-full"
            style={fontBody}
          >
            <Shield className="w-4 h-4" />
            {t("heroBadge")}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Heading size="hero">
              {t("heroTitle1")}
              <span className="text-[#397bce]">{t("heroTitle2")}</span>
            </Heading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={fontBody}
            className={`mt-6 max-w-xl mx-auto ${bodySize.lead}`}
          >
            {t("lastUpdated", { date: lastUpdated })}
          </motion.p>
        </Container>
      </section>

      {/* ───── Content ───── */}
      <section className="bg-white border-t border-black/5">
        <Container narrow className="py-14 md:py-20 space-y-14 md:space-y-16">
          {/* Introduction */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("introTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("introText")}
            </p>
          </ProseSection>

          {/* Information We Collect */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("infoCollectTitle")}
            </Heading>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("personalInfoTitle")}
            </h3>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("personalInfoText")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 mb-6 leading-relaxed"
            >
              <li>{t("personalInfoItem1")}</li>
              <li>{t("personalInfoItem2")}</li>
              <li>{t("personalInfoItem3")}</li>
              <li>{t("personalInfoItem4")}</li>
              <li>{t("personalInfoItem5")}</li>
            </ul>

            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("infoMayInclude")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 mb-6 leading-relaxed"
            >
              <li>{t("infoItem1")}</li>
              <li>{t("infoItem2")}</li>
              <li>{t("infoItem3")}</li>
              <li>{t("infoItem4")}</li>
            </ul>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("autoCollectTitle")}
            </h3>
            <p style={fontBody} className={bodySize.base}>
              {t("autoCollectText")}
            </p>
          </ProseSection>

          {/* How We Use Your Information */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("howUseTitle")}
            </Heading>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("howUseText")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 leading-relaxed"
            >
              <li>{t("howUseItem1")}</li>
              <li>{t("howUseItem2")}</li>
              <li>{t("howUseItem3")}</li>
              <li>{t("howUseItem4")}</li>
              <li>{t("howUseItem5")}</li>
              <li>{t("howUseItem6")}</li>
            </ul>
          </ProseSection>

          {/* Information Sharing */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("infoSharingTitle")}
            </Heading>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("infoSharingText")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 leading-relaxed"
            >
              <li>{t("infoSharingItem1")}</li>
              <li>{t("infoSharingItem2")}</li>
              <li>{t("infoSharingItem3")}</li>
            </ul>
          </ProseSection>

          {/* Children's Privacy — highlighted */}
          <ProseSection>
            <div className="p-6 md:p-8 bg-[#397bce]/5 rounded-2xl">
              <Heading size="sub" className="mb-4 text-[#0a0a0a]">
                {t("childrensPrivacyTitle")}
              </Heading>
              <p style={fontBody} className={bodySize.base}>
                {t("childrensPrivacyText")}
              </p>
            </div>
          </ProseSection>

          {/* Photography and Video */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("photoVideoTitle")}
            </Heading>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("photoVideoText1")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 mb-6 leading-relaxed"
            >
              <li>{t("photoVideoItem1")}</li>
              <li>{t("photoVideoItem2")}</li>
              <li>{t("photoVideoItem3")}</li>
              <li>{t("photoVideoItem4")}</li>
              <li>{t("photoVideoItem5")}</li>
            </ul>
            <p style={fontBody} className={bodySize.base}>
              {t("photoVideoText2")}{" "}
              <a
                href="mailto:contact@jamun.org"
                className="font-semibold text-[#397bce] hover:text-[#2a5fa3] transition-colors"
              >
                contact@jamun.org
              </a>{" "}
              {t("photoVideoText3")}
            </p>
          </ProseSection>

          {/* Data Security */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("dataSecurityTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("dataSecurityText")}
            </p>
          </ProseSection>

          {/* Your Rights */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("yourRightsTitle")}
            </Heading>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("yourRightsText")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 leading-relaxed"
            >
              <li>{t("yourRightsItem1")}</li>
              <li>{t("yourRightsItem2")}</li>
              <li>{t("yourRightsItem3")}</li>
              <li>{t("yourRightsItem4")}</li>
            </ul>
          </ProseSection>

          {/* Cookies */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("cookiesTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("cookiesText")}
            </p>
          </ProseSection>

          {/* Changes to This Policy */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("changesToPolicyTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("changesToPolicyText")}
            </p>
          </ProseSection>

          {/* Contact Us */}
          <ProseSection>
            <div className="p-8 md:p-10 bg-[#397bce]/5 rounded-2xl text-center">
              <Heading size="sub" className="mb-4 text-[#0a0a0a]">
                {t("contactTitle")}
              </Heading>
              <p
                style={fontBody}
                className={`${bodySize.base} mb-8 max-w-lg mx-auto`}
              >
                {t("contactText")}
              </p>
              <PillButton
                href="mailto:contact@jamun.org"
                tone="primary"
                size="lg"
              >
                <Mail className="w-5 h-5" />
                contact@jamun.org
              </PillButton>
            </div>
          </ProseSection>
        </Container>
      </section>
    </div>
  );
}
