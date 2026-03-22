"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { experience } from "@/constants/portfolio";
import { staggerContainer } from "@/lib/motion";

import { ScrollReveal } from "../motion/scroll-reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Experience
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Where I&apos;ve worked
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A vertical timeline of roles, impact, and ownership.
          </p>
        </ScrollReveal>

        <div className="relative mt-14 pl-8 sm:pl-10">
          <div className="absolute left-[11px] top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-border via-border to-transparent sm:left-[13px]" />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
            className="space-y-12"
          >
            {experience.map((job, index) => (
              <motion.li
                key={job.id}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="relative"
              >
                <span className="absolute -left-[21px] top-1 flex size-6 items-center justify-center rounded-full border border-border bg-background shadow-sm sm:-left-[23px]">
                  <span className="size-2 rounded-full bg-sky-500 dark:bg-sky-400" />
                </span>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="size-4 shrink-0" aria-hidden />
                      <span>{job.period}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{job.role}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                {job.summary ? (
                  <p className="mt-4 max-w-2xl text-muted-foreground">{job.summary}</p>
                ) : null}
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-foreground/90">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/25" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
