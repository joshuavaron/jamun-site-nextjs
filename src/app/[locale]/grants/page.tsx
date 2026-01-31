"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, Button, TypewriterText } from "@/components/ui";
import {
  Award,
  ArrowRight,
  Heart,
  Rocket,
  Users,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  Send,
  Quote,
  ExternalLink,
  Mail,
  GraduationCap,
  Star,
  Shield,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function GrantsPage() {
  const t = useTranslations("GrantsPage");

  // Why grants matter
  const grantBenefits = [
    {
      icon: DollarSign,
      title: t("benefit1Title"),
      description: t("benefit1Description"),
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      icon: Rocket,
      title: t("benefit2Title"),
      description: t("benefit2Description"),
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: Users,
      title: t("benefit3Title"),
      description: t("benefit3Description"),
      color: "bg-jamun-blue/10",
      iconColor: "text-jamun-blue",
      borderColor: "border-jamun-blue/20",
    },
  ];

  // How it works steps
  const processSteps = [
    {
      step: 1,
      icon: FileText,
      title: t("step1Title"),
      description: t("step1Description"),
    },
    {
      step: 2,
      icon: Clock,
      title: t("step2Title"),
      description: t("step2Description"),
    },
    {
      step: 3,
      icon: CheckCircle,
      title: t("step3Title"),
      description: t("step3Description"),
    },
    {
      step: 4,
      icon: Send,
      title: t("step4Title"),
      description: t("step4Description"),
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: t("testimonial1Quote"),
      author: t("testimonial1Author"),
      role: t("testimonial1Role"),
      avatar: "P",
      color: "bg-purple-500",
    },
    {
      quote: t("testimonial2Quote"),
      author: t("testimonial2Author"),
      role: t("testimonial2Role"),
      avatar: "F",
      color: "bg-emerald-500",
    },
    {
      quote: t("testimonial3Quote"),
      author: t("testimonial3Author"),
      role: t("testimonial3Role"),
      avatar: "S",
      color: "bg-jamun-blue",
    },
  ];

  // What grants cover
  const grantCovers = [
    { item: t("cover1"), icon: GraduationCap },
    { item: t("cover2"), icon: Users },
    { item: t("cover3"), icon: FileText },
    { item: t("cover4"), icon: Rocket },
    { item: t("cover5"), icon: Star },
    { item: t("cover6"), icon: Shield },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200"
              >
                <Heart className="w-4 h-4" />
                {t("heroBadge")}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                <TypewriterText text={t("heroTitle1")} delay={0.3} />
                <TypewriterText
                  text={t("heroTitle2")}
                  delay={0.3 + 24 * 0.03}
                  className="bg-gradient-to-r from-emerald-600 via-jamun-blue to-purple-600 bg-clip-text text-transparent"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {t("heroDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  href="https://docs.google.com/forms/d/e/1FAIpQLSebFceytbjpIIyWJebROTfUDUrsF1JRHagu5i-WHg9zV5T74Q/viewform?usp=sharing&ouid=103922860105045263948"
                  size="lg"
                  className="group"
                >
                  {t("heroPrimaryCTA")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="#how-it-works" variant="outline" size="lg">
                  {t("heroSecondaryCTA")}
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {t("heroTrustNoFee")}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {t("heroTrustResponse")}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {t("heroTrustSimple")}
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Visual - Impact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                {/* Main image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/images/conferences/DSC02030.webp"
                    alt={t("heroImageAlt")}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                  {/* Overlay content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-jamun-blue flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {t("heroOverlayTitle")}
                          </p>
                          <p className="text-sm text-gray-600">
                            {t("heroOverlaySubtitle")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-emerald-600">
                            100+
                          </p>
                          <p className="text-xs text-gray-500">
                            {t("heroStatStudents")}
                          </p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div>
                          <p className="text-2xl font-bold text-jamun-blue">
                            15+
                          </p>
                          <p className="text-xs text-gray-500">
                            {t("heroStatSchools")}
                          </p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            $25K+
                          </p>
                          <p className="text-xs text-gray-500">{t("heroStatGrants")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Our Grants Matter Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("whyEyebrow")}
          title={t("whyTitle")}
          subtitle={t("whySubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {grantBenefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className={cn(
                "relative bg-white rounded-2xl p-8 border-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300",
                benefit.borderColor
              )}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                  benefit.color
                )}
              >
                <benefit.icon className={cn("w-8 h-8", benefit.iconColor)} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Featured Testimonial Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-jamun-blue to-purple-700 py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Quote className="w-16 h-16 text-white/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-medium mb-8 leading-relaxed">
              &ldquo;{t("featuredQuote")}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                P
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-lg">
                  {t("featuredAuthor")}
                </p>
                <p className="text-white/70">{t("featuredRole")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <Section
        id="how-it-works"
        background="cream"
        className="py-16 md:py-20 scroll-mt-20"
      >
        <SectionHeader
          eyebrow={t("howEyebrow")}
          title={t("howTitle")}
          subtitle={t("howSubtitle")}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-jamun-blue to-purple-500 md:-translate-x-1/2" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex gap-8 md:gap-16",
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-right"
                )}
              >
                {/* Step number */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white rounded-full border-4 border-jamun-blue shadow-[var(--shadow-card)] flex items-center justify-center transform -translate-x-1/2 z-10">
                  <span className="text-2xl font-bold text-jamun-blue">
                    {step.step}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    "ml-20 md:ml-0 md:w-1/2 bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-gray-100",
                    index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-4 mb-3",
                      index % 2 === 1 && "md:flex-row-reverse"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-jamun-blue/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-jamun-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* What Grants Cover Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-4 block">
              {t("whatEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              {t("whatTitle")}{" "}
              <span className="text-jamun-blue">{t("whatTitleHighlight")}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("whatDescription")}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {grantCovers.map((item, index) => (
                <motion.div
                  key={item.item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item.item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/conferences/DSC02050.webp"
                alt={t("whatImageAlt")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

          </motion.div>
        </div>
      </Section>

      {/* More Testimonials Section */}
      <Section background="cream" className="py-16 md:py-20">
        <SectionHeader
          eyebrow={t("testimonialsEyebrow")}
          title={t("testimonialsTitle")}
          subtitle={t("testimonialsSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
                    testimonial.color
                  )}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Apply CTA Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-jamun-blue to-purple-700 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full">
              <ClipboardCheck className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                {t("ctaBadge")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("ctaTitle")}
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("ctaDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="https://docs.google.com/forms/d/e/1FAIpQLSebFceytbjpIIyWJebROTfUDUrsF1JRHagu5i-WHg9zV5T74Q/viewform?usp=sharing&ouid=103922860105045263948"
                  size="lg"
                  className="bg-white text-jamun-blue hover:bg-gray-100 group"
                >
                  {t("ctaPrimaryCTA")}
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            <p className="text-white/70 text-sm">
              {t("ctaRedirectNote")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Have Questions Section */}
      <Section background="cream" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Mail className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              {t("questionsHelpBadge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            {t("questionsTitle")}
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t("questionsDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                href="mailto:grants@jamun.org"
                size="lg"
                variant="outline"
                className="group"
              >
                <Mail className="mr-2 h-5 w-5" />
                {t("questionsPrimaryCTA")}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="mailto:contact@jamun.org" size="lg" variant="ghost">
                {t("questionsSecondaryCTA")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
            {t("questionsEmailNote")}{" "}
            <a
              href="mailto:grants@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              grants@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
