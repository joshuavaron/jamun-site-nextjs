"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-jamun-blue to-jamun-blue-dark py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Make Learning Fun?
        </h2>
        <p className="text-lg md:text-xl text-jamun-blue-light mb-8 max-w-2xl mx-auto">
          Join thousands of students who are building essential skills through
          engaging academic competitions. Start your journey today!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="/register"
            variant="accent"
            size="lg"
            className="shadow-lg shadow-jamun-orange/30"
          >
            Register Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            href="/donate"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-jamun-blue"
          >
            Support Our Mission
          </Button>
        </div>

        <p className="mt-8 text-sm text-jamun-blue-light">
          Questions? Reach out to us at{" "}
          <a
            href="mailto:contact@jamun.org"
            className="underline hover:text-white transition-colors"
          >
            contact@jamun.org
          </a>
        </p>
      </motion.div>
    </section>
  );
}
