"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

import { certifications } from "@/constants/portfolio";
import { staggerContainer } from "@/lib/motion";

import { ScrollReveal } from "../motion/scroll-reveal";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Certifications
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Credentials
          </h2>
         
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {certifications.map((c, i) => (
            <motion.a
              href={(c as any).href}
              target="_blank"
              rel="noopener noreferrer"
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group flex gap-4 rounded-xl border border-border/80 bg-card/50 p-5 transition-colors hover:border-foreground/20 hover:bg-muted/30"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-foreground/20">
                <Award className="size-5 text-amber-500 transition-transform group-hover:scale-110 dark:text-amber-400" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold leading-snug transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
