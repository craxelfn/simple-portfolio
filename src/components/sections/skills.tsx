"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type CSSProperties } from "react";

import { SKILL_CATEGORIES, skills, type SkillItem } from "@/constants/portfolio";
import { TECH_COLORS, TechLogo } from "@/constants/tech-icons";
import { snappySpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SectionHeading } from "../motion/section-heading";
import { VelocityMarquee } from "../motion/velocity-marquee";

type Category = SkillItem["category"];

const MARQUEE_SPLIT = Math.ceil(skills.length / 2);
const MARQUEE_ROWS = [skills.slice(0, MARQUEE_SPLIT), skills.slice(MARQUEE_SPLIT)];

export function Skills() {
  const [active, setActive] = useState<Category>(SKILL_CATEGORIES[0]);
  const visible = skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="scroll-mt-24 overflow-hidden border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technical skills"
          description="The stack I use to ship data platforms, AI agents, and cloud systems. Scroll to speed up the strips."
        />
      </div>

      <div className="mt-12 space-y-4">
        {MARQUEE_ROWS.map((row, i) => (
          <VelocityMarquee key={i} baseVelocity={i === 0 ? -2 : 2}>
            {row.map((skill) => (
              <SkillChip key={skill.name} name={skill.name} />
            ))}
          </VelocityMarquee>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map((category) => {
            const isActive = category === active;
            const count = skills.filter((s) => s.category === category).length;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(category)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-transparent text-white"
                    : "border-border/80 text-muted-foreground hover:border-foreground/20 hover:text-foreground",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="skills-tab"
                    transition={snappySpring}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25"
                  />
                ) : null}
                <span className="relative z-10">{category}</span>
                <span className="relative z-10 ml-1.5 text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.6, y: 24 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20, delay: i * 0.035 },
                }}
                exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.18 } }}
                whileHover={{ y: -6 }}
              >
                <SkillTile name={skill.name} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SkillChip({ name }: { name: string }) {
  return (
    <div className="mx-2 flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-4 py-2.5 shadow-sm backdrop-blur">
      <TechLogo name={name} className="size-5 shrink-0 text-foreground" />
      <span className="whitespace-nowrap text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

function SkillTile({ name }: { name: string }) {
  const brand = { "--brand": TECH_COLORS[name] ?? "#38bdf8" } as CSSProperties;
  return (
    <div
      style={brand}
      className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border/80 bg-card/50 px-3 py-5 text-center shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-(--brand) hover:shadow-[0_12px_32px_-14px_var(--brand)]"
    >
      <TechLogo
        name={name}
        className="size-10 text-foreground transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-115"
      />
      <span className="text-xs font-medium leading-snug text-foreground sm:text-sm">{name}</span>
    </div>
  );
}
