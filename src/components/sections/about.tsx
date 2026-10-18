"use client";

import { motion } from "framer-motion";
import {
  Award,
  Bot,
  Briefcase,
  Cloud,
  Code2,
  Database,
  FolderGit2,
  Globe2,
  GraduationCap,
  MapPin,
  Plug,
  type LucideIcon,
} from "lucide-react";

import { aboutContent, siteConfig, type FocusId } from "@/constants/portfolio";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CountUp } from "../motion/count-up";
import { ScrollReveal } from "../motion/scroll-reveal";
import { ScrollTextReveal } from "../motion/scroll-text-reveal";
import { SectionHeading } from "../motion/section-heading";
import { TiltCard } from "../motion/tilt-card";

const FOCUS_STYLE: Record<FocusId, { icon: LucideIcon; gradient: string; glow: string }> = {
  data: { icon: Database, gradient: "from-sky-500 to-cyan-400", glow: "rgba(56, 189, 248, 0.18)" },
  agents: { icon: Bot, gradient: "from-violet-500 to-fuchsia-400", glow: "rgba(167, 139, 250, 0.2)" },
  harness: { icon: Plug, gradient: "from-amber-500 to-orange-400", glow: "rgba(251, 191, 36, 0.18)" },
  cloud: { icon: Cloud, gradient: "from-emerald-500 to-teal-400", glow: "rgba(52, 211, 153, 0.18)" },
};

const STAT_ICONS: readonly LucideIcon[] = [Code2, FolderGit2, Award, Briefcase];

export function About() {
  const { summary, languages, education, stats, focus } = aboutContent;

  return (
    <section id="about" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Turning complex business needs into production-ready systems"
          description={`${siteConfig.location} · ${siteConfig.title}`}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <TiltCard
              maxTilt={2}
              className="h-full rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-muted/20 p-8 shadow-sm backdrop-blur-sm"
            >
              <ScrollTextReveal text={summary} className="text-lg leading-relaxed text-foreground sm:text-xl" />
              <div className="mt-8 flex flex-wrap gap-2.5 text-sm text-muted-foreground">
                <InfoChip icon={MapPin}>{siteConfig.location}</InfoChip>
                <InfoChip icon={Globe2}>{languages}</InfoChip>
                <InfoChip icon={GraduationCap}>{education}</InfoChip>
              </div>
            </TiltCard>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.08 }}
              >
                <TiltCard className="h-full rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-500/40">
                  <StatBody icon={STAT_ICONS[i]} value={stat.value} suffix={stat.suffix} label={stat.label} />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {focus.map((area) => {
            const { icon: Icon, gradient, glow } = FOCUS_STYLE[area.id];
            return (
              <motion.li key={area.id} variants={fadeInUp}>
                <TiltCard
                  glowColor={glow}
                  className="h-full rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-lg"
                >
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500 group-hover/tilt:-rotate-12 group-hover/tilt:scale-110",
                      gradient,
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-semibold tracking-tight text-foreground">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                </TiltCard>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

type StatBodyProps = { icon: LucideIcon; value: number; suffix: string; label: string };

function StatBody({ icon: Icon, value, suffix, label }: StatBodyProps) {
  return (
    <div className="flex h-full min-h-36 flex-col justify-between gap-6">
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-sky-500 transition-transform duration-500 group-hover/tilt:-rotate-12 group-hover/tilt:scale-110">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <CountUp
          to={value}
          suffix={suffix}
          className="block bg-gradient-to-br from-sky-500 to-violet-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
        />
        <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1.5">
      <Icon className="size-4 shrink-0 text-sky-500" aria-hidden />
      {children}
    </span>
  );
}
