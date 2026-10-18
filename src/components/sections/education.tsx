"use client";

import { motion } from "framer-motion";
import { CalendarRange, GraduationCap } from "lucide-react";

import { education } from "@/constants/portfolio";

import { SectionHeading } from "../motion/section-heading";
import { TiltCard } from "../motion/tilt-card";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 overflow-x-clip border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <ul className="mt-12 space-y-6">
          {education.map((edu, i) => (
            <motion.li
              key={edu.id}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 90, damping: 17, delay: i * 0.12 }}
            >
              <TiltCard
                maxTilt={3}
                className="rounded-xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-sky-500/40 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/20 transition-transform duration-500 group-hover/tilt:-rotate-12 group-hover/tilt:scale-110">
                      <GraduationCap className="size-6" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{edu.degree}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{edu.school}</p>
                      {edu.detail ? <p className="mt-2 max-w-xl text-sm text-muted-foreground">{edu.detail}</p> : null}
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border/80 bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <CalendarRange className="size-3.5" aria-hidden />
                    {edu.period}
                  </span>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
