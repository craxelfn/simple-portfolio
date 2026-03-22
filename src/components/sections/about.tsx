"use client";

import { motion } from "framer-motion";
import { Globe2, GraduationCap, Trophy } from "lucide-react";

import { aboutContent, siteConfig } from "@/constants/portfolio";
import { staggerContainer } from "@/lib/motion";

import { ScrollReveal } from "../motion/scroll-reveal";

export function About() {
  const { summary, languages, membership } = aboutContent;

  return (
    <section id="about" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Profile
          </h2>
          <p className="mt-4 text-muted-foreground">
            {siteConfig.location} · {siteConfig.title}
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="mt-12 grid gap-6 lg:grid-cols-12"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="lg:col-span-7 rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-muted/20 p-8 text-base leading-relaxed text-muted-foreground shadow-sm backdrop-blur-sm"
          >
            {summary}
          </motion.p>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex gap-4 rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-foreground/20"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Globe2 className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-foreground">Languages</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{languages}</p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex gap-4 rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-foreground/20"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Trophy className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-foreground">Achievements</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{membership}</p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex items-center gap-3 rounded-xl border border-dashed border-border/90 bg-muted/15 px-4 py-3 text-sm text-muted-foreground"
            >
              <GraduationCap className="size-5 shrink-0 text-muted-foreground" aria-hidden />
              <span>ENSA Berrechid · Engineering (CS)</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
