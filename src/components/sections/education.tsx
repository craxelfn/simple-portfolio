"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { education } from "@/constants/portfolio";
import { staggerContainer } from "@/lib/motion";

import { ScrollReveal } from "../motion/scroll-reveal";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Academic background
          </h2>
        </ScrollReveal>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 space-y-6"
        >
          {education.map((edu, i) => (
            <motion.li
              key={edu.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card/50 p-6 transition-colors hover:border-foreground/15 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <GraduationCap className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{edu.degree}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{edu.school}</p>
                  {edu.detail ? (
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground">{edu.detail}</p>
                  ) : null}
                </div>
              </div>
              <p className="text-sm text-muted-foreground sm:text-right">{edu.period}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
