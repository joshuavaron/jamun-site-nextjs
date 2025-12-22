"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="relative bg-gray-50 py-16 md:py-20 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Friendly badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-sm border border-gray-100"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="text-sm font-medium text-gray-700">Join 500+ students nationwide</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
          Ready to Start Your{" "}
          <span className="text-jamun-blue">Journey</span>?
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you're a student eager to compete, a parent supporting your child,
          or an educator building a program—we're here to help you succeed.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <div className="w-8 h-8 rounded-full bg-jamun-blue/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-jamun-blue" />
            </div>
            <span className="text-sm font-medium">Free resources</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Supportive community</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Heart className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium">Youth-led nonprofit</span>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/register"
              size="lg"
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/programs"
              variant="outline"
              size="lg"
            >
              Explore Programs
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
          Questions? We'd love to hear from you at{" "}
          <a
            href="mailto:contact@jamun.org"
            className="text-jamun-blue hover:text-jamun-blue-dark transition-colors font-medium"
          >
            contact@jamun.org
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
