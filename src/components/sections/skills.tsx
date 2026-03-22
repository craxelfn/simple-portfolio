"use client";

import { motion } from "framer-motion";

import { skills, type SkillItem } from "@/constants/portfolio";
import { TechLogo } from "@/constants/tech-icons";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { ScrollReveal } from "../motion/scroll-reveal";

const CATEGORY_ORDER: SkillItem["category"][] = [
  "Programming Languages",
  "Frontend",
  "Backend",
  "Databases",
  "DevOps & Cloud",
  "AI & Data",
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Skills
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Technical skills
          </h2>
          
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-14 space-y-14"
        >
          {CATEGORY_ORDER.map((category, ci) => {
            const items = skills.filter((s) => s.category === category);
            if (items.length === 0) return null;
            return (
              <motion.div
                key={category}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, delay: ci * 0.04, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {category}
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {items.map((s) => (
                    <motion.div
                      key={s.name}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      className={cn(
                        "group flex flex-col items-center gap-3 rounded-xl border border-border/80 bg-card/50 px-3 py-4 text-center",
                        "shadow-sm transition-[box-shadow,border-color] hover:border-foreground/15 hover:shadow-md",
                      )}
                    >
                      <TechLogo
                        name={s.name}
                        className="size-9 text-foreground transition-transform group-hover:scale-105 sm:size-10"
                      />
                      <span className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                        {s.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
