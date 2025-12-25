"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Heart, Users, GraduationCap, Trophy, Sparkles, ArrowRight, Check } from "lucide-react";
import { TypewriterText } from "@/components/ui";

const impactStats = [
  { value: "500+", label: "Students Empowered", icon: Users },
  { value: "30+", label: "Schools Reached", icon: GraduationCap },
  { value: "$70K+", label: "Raised for Programs", icon: Trophy },
];

const donationImpacts = [
  { amount: "$25", impact: "Sponsors a student's registration fee" },
  { amount: "$50", impact: "Provides materials for one student at a competition" },
  { amount: "$100", impact: "Sponsors an entire classroom's participation" },
  { amount: "$250", impact: "Enables a school to attend their first conference" },
  { amount: "$500", impact: "Funds coaching for a first-time team" },
  { amount: "$1,000", impact: "Covers transportation for an inter-city school team" },
];

const reasons = [
  "100% volunteer-run - every dollar goes directly to students",
  "Reaching underserved schools with affordable programs",
  "Building the next generation of leaders and critical thinkers",
  "Making academic competitions accessible to all",
];

export default function DonatePage() {
  return (
    <>
      <Script
        src="https://widgets.givebutter.com/latest.umd.cjs?acct=3VthXuG6YBH7y7nq&p=other"
        strategy="lazyOnload"
      />

      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Urgency badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-orange-500/25"
              >
                <Heart className="w-4 h-4 animate-pulse" />
                Your Support Changes Lives
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <TypewriterText text="Every Student Deserves a " delay={0.3} />
                <TypewriterText
                  text="Chance to Shine"
                  delay={0.3 + 25 * 0.03}
                  className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              >
                Help us bring Model UN, Mock Trial, and Mathletes to middle school
                students who might never get the chance otherwise. Your tax-deductible
                donation to our 501(c)(3) nonprofit directly funds academic competitions,
                training materials, and grants that empower the next generation of
                public speakers, debaters, and problem-solvers.
              </motion.p>

              {/* Impact stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12"
              >
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white mb-3 shadow-lg shadow-orange-500/30">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content - Widget + Impact */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Donation Widget */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="bg-white rounded-3xl shadow-2xl shadow-orange-500/10 border border-orange-100 p-6 md:p-8 sticky top-24">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                    Make Your Gift Today
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    JAMUN is a 501(c)(3) nonprofit. Your donation is tax-deductible.
                  </p>

                  {/* Givebutter Widget */}
                  <div className="givebutter-widget-container">
                    {/* @ts-expect-error - Givebutter custom element */}
                    <givebutter-widget id="L4K9wj"></givebutter-widget>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-500" />
                        Secure
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-500" />
                        Tax-deductible
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-500" />
                        501(c)(3)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Why Donate + Impact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2 space-y-8"
              >
                {/* Why Your Gift Matters */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-orange-500" />
                    Why Your Gift Matters
                  </h2>
                  <ul className="space-y-4">
                    {reasons.map((reason, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 text-lg">{reason}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Impact breakdown */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 md:p-8 border border-orange-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Your Impact at Every Level
                  </h3>
                  <div className="space-y-3">
                    {donationImpacts.map((item, index) => (
                      <motion.div
                        key={item.amount}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm"
                      >
                        <span className="flex-shrink-0 text-lg font-bold text-orange-600 w-16">
                          {item.amount}
                        </span>
                        <span className="text-gray-700">{item.impact}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Urgency/Final CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-16 h-16 text-white/90 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Don&apos;t Wait. Act Now.
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Right now, there are students who have never had the opportunity to
                compete, debate, or discover their potential. You can change that today.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    document.querySelector(".givebutter-widget-container")?.scrollIntoView({
                      behavior: "smooth",
                      block: "center"
                    });
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-orange-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  Donate Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <p className="mt-6 text-white/70 text-sm">
                Every gift, no matter the size, makes a difference.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonial/Story Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <blockquote className="text-2xl md:text-3xl text-gray-700 italic mb-6 leading-relaxed">
                &ldquo;Before JAMUN, I never thought I could speak in front of people.
                Now I&apos;m leading my school&apos;s Model UN team. This program changed my life.&rdquo;
              </blockquote>
              <cite className="text-gray-600 font-medium">
                — Anonymous, 8th Grade Delegate
              </cite>
            </motion.div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="bg-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logos/jamun-white-side-logo.svg"
                  alt="JAMUN"
                  width={100}
                  height={28}
                  className="opacity-70"
                />
              </div>
              <p>
                JAMUN is a 501(c)(3) nonprofit organization. EIN: 39-3081214
              </p>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
