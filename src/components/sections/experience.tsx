"use client";

import { motion } from "framer-motion";
import { Building2, CalendarRange } from "lucide-react";

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
        </ScrollReveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/50 via-border to-transparent dark:from-sky-400/40" />
          </div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
            className="relative space-y-12 md:space-y-16"
          >
            {experience.map((job, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.li
                  key={job.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="relative"
                >
                  <div
                    className="absolute left-[11px] top-2 h-[calc(100%+3rem)] w-px bg-gradient-to-b from-border to-transparent md:hidden"
                    aria-hidden
                  />

                  <div
                    className="absolute left-1/2 top-10 z-20 hidden size-3.5 -translate-x-1/2 rounded-full border-[3px] border-background bg-gradient-to-br from-sky-500 to-cyan-500 shadow-[0_0_20px_rgba(14,165,233,0.35)] md:block"
                    aria-hidden
                  />
                  <div
                    className="absolute left-1/2 top-10 z-10 hidden size-5 -translate-x-1/2 rounded-full bg-sky-500/20 blur-md md:block"
                    aria-hidden
                  />

                  <div
                    className="absolute left-0 top-10 z-20 size-3 rounded-full border-2 border-background bg-gradient-to-br from-sky-500 to-cyan-500 md:hidden"
                    aria-hidden
                  />

                  <div className="grid gap-6 md:grid-cols-2 md:gap-10 md:items-start">
                    {isLeft ? (
                      <>
                        <ExperienceCard job={job} />
                        <div className="hidden md:block" aria-hidden />
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block" aria-hidden />
                        <ExperienceCard job={job} />
                      </>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ job }: { job: (typeof experience)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/15 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-border hover:shadow-md sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.08),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.07),_transparent_55%)]" />
      <div className="relative flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 font-medium text-foreground/95 shadow-sm">
          <CalendarRange className="size-3.5 shrink-0" aria-hidden />
          {job.period}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 shadow-sm">
          <Building2 className="size-3.5 shrink-0" aria-hidden />
          {job.company}
        </span>
      </div>
      <h3 className="relative mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        {job.role}
      </h3>
      {job.summary ? (
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
      ) : null}
      <ul className="relative mt-5 space-y-2.5 border-t border-border/60 pt-5">
        {job.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500"
              aria-hidden
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
