"use client";

import { motion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

import { AnimatedText } from "./animated-text";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="flex items-center gap-3"
      >
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          className="h-px w-10 origin-left bg-gradient-to-r from-sky-500 to-cyan-400"
        />
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
          {eyebrow}
        </p>
      </motion.div>
      <AnimatedText
        as="h2"
        text={title}
        className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      />
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT }}
          className="mt-4 text-muted-foreground"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
