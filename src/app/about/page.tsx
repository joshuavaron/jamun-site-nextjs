"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader, Button } from "@/components/ui";
import {
  Heart,
  Users,
  Lightbulb,
  Target,
  Sparkles,
  ArrowRight,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Note: Metadata is exported from layout.tsx for this client component

// Team member data
const teamMembers = [
  {
    name: "Joshua Varon",
    role: "Founder",
    image: null,
    description:
      "Student at Duke University studying mathematics and computer science. Passionate about making academic competitions accessible to all students.",
    bgColor: "bg-rose-100",
    textColor: "text-rose-600",
    ringColor: "ring-rose-300",
  },
  {
    name: "Charlie Fumerton",
    role: "Director of Model UN",
    image: "/images/team/charlie.webp",
    description:
      "Volleyball player with a keen interest in politics and international relations. Dedicated to fostering diplomatic skills in young delegates.",
    bgColor: "bg-jamun-blue/10",
    textColor: "text-jamun-blue",
    ringColor: "ring-jamun-blue/30",
  },
  {
    name: "Dustin Simon",
    role: "Director of Mock Trial",
    image: "/images/team/dustin.webp",
    description:
      "Tennis enthusiast studying mathematics. Committed to helping students develop critical thinking and advocacy skills through legal simulation.",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    ringColor: "ring-purple-300",
  },
  {
    name: "Will Ballis",
    role: "Director of Mathletes",
    image: "/images/team/will.webp",
    description:
      "Former Mathletes champion who studied advanced mathematics. Passionate about philanthropy and expanding math competition opportunities.",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600",
    ringColor: "ring-emerald-300",
  },
];

// Core values
const values = [
  {
    icon: Heart,
    title: "Passion-Driven",
    description:
      "We believe that genuine enthusiasm is contagious. Our volunteers bring energy and excitement that transforms academic competition into an adventure.",
    color: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We're building more than programs—we're building a supportive family where every student feels they belong, regardless of experience level.",
    color: "bg-jamun-blue/10",
    iconColor: "text-jamun-blue",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "As a youth-led organization, we think differently. We constantly reimagine how to make learning engaging and competitions accessible.",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards because our students deserve nothing less. Quality in everything we create.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

// Timeline milestones
const timeline = [
  {
    year: "2023",
    title: "The Spark",
    description:
      "JAMUN was founded by a small group of high school students who saw a gap: middle schoolers were being left behind in academic competitions. We decided to change that.",
  },
  {
    year: "2024",
    title: "Growing Roots",
    description:
      "Our first conferences took flight. What started as a single Model UN event expanded to include Mock Trial and Mathletes, reaching students across multiple states.",
  },
  {
    year: "2025",
    title: "Building Momentum",
    description:
      "JAMUN earned 501(c)(3) nonprofit status. Our volunteer base grew to 80+, and we raised over $70,000 to make programs accessible to all.",
  },
  {
    year: "Today",
    title: "Looking Forward",
    description:
      "With 500+ students impacted and 30+ schools reached, we're just getting started. Our mission remains the same: make academics fun for every student.",
  },
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

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jamun-blue/5 via-white to-purple-50 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-jamun-blue/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-jamun-orange/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-jamun-blue bg-jamun-blue/10 rounded-full border border-jamun-blue/20"
              >
                <Sparkles className="w-4 h-4" />
                Our Story
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6"
              >
                Built by Students,{" "}
                <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
                  For Students
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                JAMUN (Junior Assembly of the Model United Nations) is a 501(c)(3) nonprofit
                organization run entirely by passionate high school and college student volunteers.
                We provide Model UN, Mock Trial, and Mathletes programs for middle school
                students in grades 5-8—with free resources and low-cost conferences, plus grants
                for those who need them—because we believe academic competition should be
                exciting, accessible, and—most importantly—fun.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button href="/programs" size="lg" className="group">
                  Explore Our Programs
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/donate" variant="outline" size="lg">
                  Support Our Mission
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/conferences/DSC01054.webp"
                  alt="JAMUN volunteers and participants at conference"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Decorative blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-jamun-orange/30 to-pink-400/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-jamun-blue/30 to-purple-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <Section background="white" className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-jamun-blue font-semibold text-sm tracking-widest uppercase mb-4 block">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Make Academics{" "}
              <span className="text-jamun-blue">Fun</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We believe every middle school student deserves the chance to
              discover their potential through academic competition. Research shows
              that students who participate in Model UN, debate, Mock Trial, and
              math competitions develop stronger public speaking, critical thinking,
              and leadership skills—abilities that transfer directly to academic
              success and college readiness.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              JAMUN exists to make these transformative experiences accessible to all.
              We provide free and low-cost programs in Model UN (diplomatic simulation),
              Mock Trial (courtroom advocacy), and Mathletes (competitive mathematics)—designed
              specifically for students in grades 5-8. Our goal isn&apos;t just to teach
              skills; it&apos;s to spark a lifelong love of learning that prepares students
              for magnet schools, high school honors programs, and college admissions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-jamun-blue/10 via-purple-100/50 to-emerald-100/30 rounded-3xl p-8 md:p-10">
              <Quote className="w-12 h-12 text-jamun-blue/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                &ldquo;We&apos;re not just running tournaments. We&apos;re showing kids that
                being smart is cool, that hard work pays off, and that they
                can accomplish incredible things.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jamun-blue/20 flex items-center justify-center">
                  <span className="text-jamun-blue font-bold">JV</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Joshua Varon</p>
                  <p className="text-sm text-gray-600">Founder, JAMUN</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Our Story / Timeline Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Our Journey"
          title="From Vision to Reality"
          subtitle="The story of how a group of passionate students built something bigger than themselves."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-jamun-blue via-purple-500 to-emerald-500 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 md:gap-16",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Year marker */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-jamun-blue rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-jamun-blue rounded-full" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "ml-16 md:ml-0 md:w-1/2",
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  )}
                >
                  <span className="inline-block px-4 py-1.5 mb-3 text-sm font-bold text-jamun-blue bg-jamun-blue/10 rounded-full">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="white" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Core Values"
          subtitle="These principles guide everything we do at JAMUN."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                  value.color
                )}
              >
                <value.icon className={cn("w-7 h-7", value.iconColor)} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Leadership Team Section */}
      <Section background="gray" className="py-16 md:py-20">
        <SectionHeader
          eyebrow="Meet the Team"
          title="The People Behind JAMUN"
          subtitle="A dedicated group of student leaders working to make academics accessible and exciting."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group text-center"
            >
              {/* Circular headshot */}
              <div className="relative mx-auto mb-5 w-40 h-40">
                {/* Decorative ring */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full ring-4 transition-all duration-300 group-hover:ring-8",
                    member.ringColor
                  )}
                />
                {/* Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">JV</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <span
                  className={cn(
                    "inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full",
                    member.bgColor,
                    member.textColor
                  )}
                >
                  {member.role}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our leadership team is supported by{" "}
            <span className="font-semibold text-jamun-blue">80+ volunteers</span>{" "}
            who share our passion for empowering young learners. Together,
            we&apos;re proving that students can create real, lasting change.
          </p>
        </motion.div>
      </Section>

      {/* Impact Stats - Similar to homepage StatsSection */}
      <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-jamun-blue/10 via-transparent to-purple-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-jamun-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Impact So Far
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every number represents a student inspired, a school empowered,
              or a volunteer who gave their time to make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "500+", label: "Students Impacted" },
              { value: "30+", label: "Schools Reached" },
              { value: "80+", label: "Student Volunteers" },
              { value: "$70K+", label: "Raised for Programs" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-jamun-blue/50 transition-all duration-300 text-center h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-jamun-blue/0 to-purple-600/0 group-hover:from-jamun-blue/5 group-hover:to-purple-600/5 transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-jamun-blue-light to-purple-400 bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <Section background="white" className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-jamun-blue/10 rounded-full">
            <Heart className="w-4 h-4 text-jamun-blue" />
            <span className="text-sm font-medium text-jamun-blue">
              Be Part of the Movement
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Join Us in Making Academics{" "}
            <span className="bg-gradient-to-r from-jamun-blue via-purple-600 to-jamun-blue bg-clip-text text-transparent">
              Fun
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Whether you&apos;re a student ready to compete, a teacher looking to
            start a program, or someone who wants to support our mission—there&apos;s
            a place for you at JAMUN.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/register" size="lg" className="group">
                Get Involved
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button href="/donate" variant="accent" size="lg">
                Support Our Mission
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
            Questions? Reach out at{" "}
            <a
              href="mailto:contact@jamun.org"
              className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
            >
              contact@jamun.org
            </a>
          </motion.p>
        </motion.div>
      </Section>
    </main>
  );
}
