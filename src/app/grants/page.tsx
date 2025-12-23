"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  Sparkles,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Why grants matter
const grantBenefits = [
  {
    icon: DollarSign,
    title: "Remove Financial Barriers",
    description:
      "Cover registration fees, travel costs, and materials so no student is left behind due to financial constraints.",
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    icon: Rocket,
    title: "Accelerate Growth",
    description:
      "Provide resources and training that help students reach their full potential faster than ever before.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: Users,
    title: "Build Community",
    description:
      "Connect students with mentors, peers, and opportunities that extend far beyond their local community.",
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
    title: "Submit Application",
    description:
      "Fill out our simple online form with your information and grant request details. It takes just 10-15 minutes.",
  },
  {
    step: 2,
    icon: Clock,
    title: "Review Process",
    description:
      "Our team reviews applications within 2-3 weeks and may reach out for additional information if needed.",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Receive Decision",
    description:
      "You'll be notified of the decision via email with clear next steps if approved.",
  },
  {
    step: 4,
    icon: Send,
    title: "Get Funded",
    description:
      "Approved grants are disbursed directly to cover your specified expenses. It's that simple.",
  },
];

// Testimonials
const testimonials = [
  {
    quote:
      "The JAMUN grant made it possible for my son to participate in Model UN. It changed his perspective on global issues and sparked a passion for social studies.",
    author: "Grant Recipient",
    role: "Parent, 2025",
    avatar: "P",
    color: "bg-purple-500",
  },
  {
    quote:
      "Our school couldn't afford to start a new extracurricular. Now we have 30 students participating in Model UN conferences twice a year!",
    author: "Faculty Advisor",
    role: "Middle School Teacher",
    avatar: "F",
    color: "bg-emerald-500",
  },
  {
    quote:
      "As a first-generation student, I never thought I'd be able to compete at the state level. The JAMUN grant opened doors I didn't even know existed.",
    author: "Student Recipient",
    role: "8th Grade, Mock Trial",
    avatar: "S",
    color: "bg-jamun-blue",
  },
];

// What grants cover
const grantCovers = [
  { item: "Conference registration fees", icon: GraduationCap },
  { item: "Travel and transportation", icon: Users },
  { item: "Competition materials", icon: FileText },
  { item: "Training programs", icon: Rocket },
  { item: "Team uniforms and supplies", icon: Star },
  { item: "Coaching resources", icon: Shield },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function GrantsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-jamun-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-200/20 to-purple-200/20 rounded-full blur-3xl -z-10" />

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
                Funding for Every Student
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6"
              >
                Cost Shouldn't Determine{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-jamun-blue to-purple-600 bg-clip-text text-transparent">
                  Who Gets to Participate
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Academic competitions build critical thinking, public speaking,
                and leadership skills that last a lifetime. Our grants ensure
                every student can access these transformative experiences.
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
                  Apply for a Grant
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="#how-it-works" variant="outline" size="lg">
                  Learn How It Works
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
                  No application fee
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  2-3 week response
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Simple process
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
                    src="/images/conferences/hero-main.webp"
                    alt="Students participating in JAMUN competition"
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
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Grants Awarded
                          </p>
                          <p className="text-sm text-gray-600">
                            Changing lives every day
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-emerald-600">
                            100+
                          </p>
                          <p className="text-xs text-gray-500">
                            Students Funded
                          </p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div>
                          <p className="text-2xl font-bold text-jamun-blue">
                            15+
                          </p>
                          <p className="text-xs text-gray-500">
                            Schools Supported
                          </p>
                        </div>
                        <div className="w-px bg-gray-200" />
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            $25K+
                          </p>
                          <p className="text-xs text-gray-500">Grants Given</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative blobs */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-jamun-blue/20 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/20 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Our Grants Matter Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Why It Matters"
          title="Every Student Deserves a Chance"
          subtitle="Our grants remove barriers and open doors to life-changing experiences in academic competition."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {grantBenefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={cn(
                "relative bg-white rounded-2xl p-8 border-2 shadow-sm hover:shadow-xl transition-all duration-300",
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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

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
              &ldquo;The JAMUN grant made it possible for my son to participate
              in Model UN. It changed his perspective on global issues and
              sparked a passion for social studies that has shaped his entire
              academic journey.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                P
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-lg">
                  Parent of Grant Recipient
                </p>
                <p className="text-white/70">2025 Model UN Program</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <Section
        id="how-it-works"
        background="gray"
        className="py-16 md:py-20 scroll-mt-20"
      >
        <SectionHeader
          eyebrow="How It Works"
          title="A Simple Path to Funding"
          subtitle="Our streamlined application process makes it easy to apply for the support you need."
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
                <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white rounded-full border-4 border-jamun-blue shadow-lg flex items-center justify-center transform -translate-x-1/2 z-10">
                  <span className="text-2xl font-bold text-jamun-blue">
                    {step.step}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    "ml-20 md:ml-0 md:w-1/2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100",
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
              What We Fund
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Comprehensive Support for{" "}
              <span className="text-jamun-blue">Your Journey</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our grants are flexible and designed to cover the full range of
              expenses that might stand between a student and their chance to
              compete. We work with each applicant to understand their unique
              needs.
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
                src="/images/conferences/gallery-4.webp"
                alt="Students at JAMUN conference"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-jamun-blue/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* More Testimonials Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Success Stories"
          title="What Recipients Say"
          subtitle="Hear from families, teachers, and students whose lives have been changed by JAMUN grants."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                Applications Open Now
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Apply for a Grant?
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Fill out a short application and our team will review it within
              2-3 weeks. Don't let cost stand in the way of your potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="https://docs.google.com/forms/d/e/1FAIpQLSebFceytbjpIIyWJebROTfUDUrsF1JRHagu5i-WHg9zV5T74Q/viewform?usp=sharing&ouid=103922860105045263948"
                  size="lg"
                  className="bg-white text-jamun-blue hover:bg-gray-100 group"
                >
                  Open Application Form
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            <p className="text-white/70 text-sm">
              You'll be redirected to Google Forms to complete your application.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Have Questions Section */}
      <Section background="white" className="py-16 md:py-20">
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
              We're Here to Help
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Have Questions?
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            We're here to help. Reach out to our grants team for assistance with
            your application or to learn more about our funding opportunities.
            No question is too small.
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
                Contact Grants Team
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/contact" size="lg" variant="ghost">
                General Inquiries
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
            Email us directly at{" "}
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
