"use client";

import { motion } from "framer-motion";
import { Section, TypewriterText } from "@/components/ui";
import { Shield, Mail } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-4 h-4" />
            Your Privacy Matters
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
            <TypewriterText text="Privacy " delay={0.3} />
            <TypewriterText
              text="Policy"
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
            Last updated: {lastUpdated}
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
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Junior Assembly of Model United Nations (&quot;JAMUN,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website jamun.org and participate in our programs.
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
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Personal Information
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Register for our programs (Model UN, Mock Trial, or Mathletes)</li>
                <li>Subscribe to our newsletter</li>
                <li>Make a donation</li>
                <li>Contact us with inquiries</li>
                <li>Apply for grants or volunteer positions</li>
              </ul>

              <p className="text-gray-600 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Name and contact information (email address, phone number)</li>
                <li>School name and grade level</li>
                <li>Parent/guardian contact information (for minor participants)</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Automatically Collected Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When you visit our website, we may automatically collect certain information about your device, including your IP address, browser type, operating system, and browsing behavior. We use Google Analytics to help us understand how visitors use our site.
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
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Administer our programs and events</li>
                <li>Communicate with participants, parents, and educators</li>
                <li>Process donations and issue tax receipts</li>
                <li>Improve our website and services</li>
                <li>Send newsletters and program updates (with your consent)</li>
                <li>Comply with legal obligations</li>
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
                Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Service providers who assist us in operating our website and programs</li>
                <li>Schools and educators involved in our programs (with appropriate consent)</li>
                <li>Legal authorities when required by law</li>
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
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our programs serve students in grades 5-8. We are committed to protecting the privacy of children. We collect information about minor participants only with parental or guardian consent and use it solely for program administration. Parents and guardians may contact us at any time to review, update, or delete their child&apos;s information.
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
                Photography and Video
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                JAMUN may take photographs and video recordings of participants at our events, conferences, and programs. These images and videos may be used for promotional and educational purposes, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Our website and social media channels</li>
                <li>Marketing materials and brochures</li>
                <li>Newsletters and email communications</li>
                <li>Grant applications and annual reports</li>
                <li>Press releases and media coverage</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                By registering for and participating in JAMUN programs, participants (and their parents/guardians for minors) consent to the use of their likeness in photographs and videos for these purposes. If you do not wish to have your child photographed or recorded, please notify us in writing at{" "}
                <a href="mailto:contact@jamun.org" className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium">
                  contact@jamun.org
                </a>{" "}
                prior to the event. We will make reasonable efforts to accommodate such requests, though we cannot guarantee complete exclusion from group photos or wide-angle shots.
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
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
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
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
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
                Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website uses cookies and similar technologies to enhance your browsing experience and collect analytics data. You can control cookie settings through your browser preferences.
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
                Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
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
                If you have questions about this Privacy Policy or our data practices, please contact us:
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
