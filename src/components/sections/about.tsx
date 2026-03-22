"use client";

import { motion } from "framer-motion";

import { aboutContent } from "@/constants/portfolio";
import { staggerContainer } from "@/lib/motion";

import { ScrollReveal } from "../motion/scroll-reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A little about me
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="mt-10 grid gap-8 lg:grid-cols-2"
        >
          {aboutContent.paragraphs.map((text, i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-base leading-relaxed text-muted-foreground"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
