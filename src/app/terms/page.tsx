"use client";

import { motion } from "framer-motion";
import { Section, TypewriterText } from "@/components/ui";
import { FileText, Mail } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsOfServicePage() {
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
            Legal Information
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
            <TypewriterText text="Terms of " delay={0.3} />
            <TypewriterText
              text="Service"
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
            Last updated: {lastUpdated}
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
                Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using the JAMUN website (jamun.org) and participating in our programs, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
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
                About JAMUN
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Junior Assembly of Model United Nations (&quot;JAMUN&quot;) is a 501(c)(3) nonprofit organization that provides Model UN, Mock Trial, and Mathletes programs for students in grades 5-8. Our programs are designed to develop public speaking, critical thinking, and leadership skills.
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
                Program Participation
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Eligibility
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our programs are primarily designed for students in grades 5-8. Participation in JAMUN programs requires registration and, for minor participants, parental or guardian consent.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Code of Conduct
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                All participants are expected to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Treat fellow participants, volunteers, and staff with respect</li>
                <li>Follow the rules and guidelines of each program</li>
                <li>Maintain academic integrity and honesty</li>
                <li>Dress appropriately for conferences and events (Western business attire for Model UN)</li>
                <li>Refrain from disruptive or inappropriate behavior</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                JAMUN reserves the right to remove any participant who violates our code of conduct.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Registration and Fees
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Program registration fees, when applicable, are outlined during the registration process. Financial assistance is available for families who demonstrate need. Refund policies vary by program and will be communicated at the time of registration.
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
                Website Use
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Permitted Use
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may use our website for lawful purposes related to learning about and participating in JAMUN programs. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Use the website in any way that violates applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Copy, distribute, or modify website content without permission</li>
                <li>Use automated systems to access the website without our consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                User Accounts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
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
                Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content on the JAMUN website, including text, graphics, logos, images, and educational materials, is the property of JAMUN or its content providers and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Educational resources provided by JAMUN may be used for personal, non-commercial educational purposes. Redistribution or commercial use requires written permission.
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
                Donations
              </h2>
              <p className="text-gray-600 leading-relaxed">
                JAMUN is a registered 501(c)(3) nonprofit organization. Donations are tax-deductible to the extent allowed by law. All donations are final and non-refundable unless otherwise required by law.
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
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The JAMUN website and services are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
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
                Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, JAMUN and its volunteers, officers, and directors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or participation in our programs.
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
                Indemnification
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify and hold harmless JAMUN, its volunteers, officers, and directors from any claims, damages, losses, or expenses arising from your violation of these Terms of Service or your use of our website and services.
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
                Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.
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
                Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
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
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have questions about these Terms of Service, please contact us:
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
