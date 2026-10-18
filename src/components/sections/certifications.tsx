"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";

import { certifications } from "@/constants/portfolio";

import { SectionHeading } from "../motion/section-heading";

const COLUMNS = 2;

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Certifications" title="Credentials" description="Open any badge to verify it." />

        <div className="mt-12 grid gap-4 [perspective:1200px] sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotateX: -75, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: (i % COLUMNS) * 0.1 + Math.floor(i / COLUMNS) * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border/80 bg-card/50 p-5 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-400/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-amber-500/40">
                <Award className="size-5 text-amber-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125 dark:text-amber-400" aria-hidden />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <h3 className="font-semibold leading-snug transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
              <ArrowUpRight
                className="ml-auto size-4 shrink-0 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
