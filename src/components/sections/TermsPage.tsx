"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
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

export function TermsPage() {
  const t = useTranslations("TermsPage");
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
            <FileText className="w-4 h-4" />
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
          {/* Agreement to Terms — highlighted */}
          <ProseSection>
            <div className="p-6 md:p-8 bg-[#f97316]/5 rounded-2xl">
              <Heading size="sub" className="mb-4 text-[#0a0a0a]">
                {t("agreementTitle")}
              </Heading>
              <p style={fontBody} className={bodySize.base}>
                {t("agreementText")}
              </p>
            </div>
          </ProseSection>

          {/* About JAMUN */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("aboutTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("aboutText")}
            </p>
          </ProseSection>

          {/* Program Participation */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("participationTitle")}
            </Heading>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("eligibilityTitle")}
            </h3>
            <p style={fontBody} className={`${bodySize.base} mb-6`}>
              {t("eligibilityText")}
            </p>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("conductTitle")}
            </h3>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("conductText")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 mb-6 leading-relaxed"
            >
              <li>{t("conductItem1")}</li>
              <li>{t("conductItem2")}</li>
              <li>{t("conductItem3")}</li>
              <li>{t("conductItem4")}</li>
              <li>{t("conductItem5")}</li>
            </ul>
            <p style={fontBody} className={bodySize.base}>
              {t("conductRemoval")}
            </p>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("registrationTitle")}
            </h3>
            <p style={fontBody} className={bodySize.base}>
              {t("registrationText")}
            </p>
          </ProseSection>

          {/* Website Use */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("websiteUseTitle")}
            </Heading>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("permittedUseTitle")}
            </h3>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("permittedUseText")}
            </p>
            <ul
              style={fontBody}
              className="list-disc pl-6 text-neutral-700 space-y-2 mb-6 leading-relaxed"
            >
              <li>{t("permittedUseItem1")}</li>
              <li>{t("permittedUseItem2")}</li>
              <li>{t("permittedUseItem3")}</li>
              <li>{t("permittedUseItem4")}</li>
              <li>{t("permittedUseItem5")}</li>
            </ul>

            <h3
              style={{ ...fontBody, fontWeight: 600 }}
              className="text-lg text-[#0a0a0a] mt-6 mb-3"
            >
              {t("userAccountsTitle")}
            </h3>
            <p style={fontBody} className={bodySize.base}>
              {t("userAccountsText")}
            </p>
          </ProseSection>

          {/* Intellectual Property */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("intellectualPropertyTitle")}
            </Heading>
            <p style={fontBody} className={`${bodySize.base} mb-4`}>
              {t("intellectualPropertyText1")}
            </p>
            <p style={fontBody} className={bodySize.base}>
              {t("intellectualPropertyText2")}
            </p>
          </ProseSection>

          {/* Donations — highlighted */}
          <ProseSection>
            <div className="p-6 md:p-8 bg-[#397bce]/5 rounded-2xl">
              <Heading size="sub" className="mb-4 text-[#0a0a0a]">
                {t("donationsTitle")}
              </Heading>
              <p style={fontBody} className={bodySize.base}>
                {t("donationsText")}
              </p>
            </div>
          </ProseSection>

          {/* Disclaimer of Warranties */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("disclaimerTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("disclaimerText")}
            </p>
          </ProseSection>

          {/* Limitation of Liability */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("liabilityTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("liabilityText")}
            </p>
          </ProseSection>

          {/* Indemnification */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("indemnificationTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("indemnificationText")}
            </p>
          </ProseSection>

          {/* Changes to Terms */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("changesToTermsTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("changesToTermsText")}
            </p>
          </ProseSection>

          {/* Governing Law */}
          <ProseSection>
            <Heading size="sub" className="mb-4 text-[#0a0a0a]">
              {t("governingLawTitle")}
            </Heading>
            <p style={fontBody} className={bodySize.base}>
              {t("governingLawText")}
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
