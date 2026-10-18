"use client";

import { motion, useInView, useScroll, useSpring, type Variants } from "framer-motion";
import { Building2, CalendarRange } from "lucide-react";
import { useRef } from "react";

import { experience, type ExperienceItem } from "@/constants/portfolio";
import { TechLogo } from "@/constants/tech-icons";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SectionHeading } from "../motion/section-heading";
import { TiltCard } from "../motion/tilt-card";

const highlightList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const highlightItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export function Experience() {
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="experience" className="scroll-mt-24 overflow-x-clip border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="From full-stack internships to deploying data and AI platforms with Oracle's enterprise customers."
        />

        <div className="relative mt-16">
          <div aria-hidden className="absolute top-0 left-[11px] h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute top-0 left-[11px] h-full w-[2px] origin-top bg-gradient-to-b from-sky-500 via-cyan-400 to-violet-500 shadow-[0_0_14px_rgba(56,189,248,0.7)] md:left-1/2 md:-translate-x-1/2"
          />

          <ul ref={listRef} className="relative space-y-12 md:space-y-16">
            {experience.map((job, index) => (
              <TimelineItem key={job.id} job={job} isLeft={index % 2 === 0} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ job, isLeft }: { job: ExperienceItem; isLeft: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <li ref={ref} className="relative">
      {job.isCurrent ? (
        <span
          aria-hidden
          className="absolute top-9 left-[5px] z-10 size-[14px] animate-ping rounded-full bg-sky-400/70 md:left-1/2 md:-ml-[7px]"
        />
      ) : null}
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 420, damping: 14 }}
        className="absolute top-9 left-[5px] z-20 size-[14px] rounded-full border-[3px] border-background bg-gradient-to-br from-sky-500 to-cyan-400 shadow-[0_0_20px_rgba(14,165,233,0.7)] md:left-1/2 md:-ml-[7px]"
      />

      <div className="grid pl-10 md:grid-cols-2 md:gap-12 md:pl-0">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -80 : 80, rotate: isLeft ? -3 : 3 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className={cn(!isLeft && "md:col-start-2")}
        >
          {job.isCurrent ? <CurrentRoleCard job={job} /> : <RoleCard job={job} />}
        </motion.div>
      </div>
    </li>
  );
}

function RoleCard({ job }: { job: ExperienceItem }) {
  return (
    <TiltCard
      maxTilt={4}
      className="rounded-2xl border border-border/70 bg-muted/15 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-sky-500/40 hover:shadow-lg sm:p-7"
    >
      <RoleDetails job={job} />
    </TiltCard>
  );
}

/** The current role gets a rotating gradient border so it reads as "now". */
function CurrentRoleCard({ job }: { job: ExperienceItem }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-[1.5px] shadow-[0_0_50px_-14px_rgba(56,189,248,0.6)]">
      <motion.div
        aria-hidden
        className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,#38bdf8_70deg,#a78bfa_140deg,transparent_210deg)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <TiltCard maxTilt={0} className="rounded-[calc(1rem-1.5px)] bg-card p-6 sm:p-7">
        <RoleDetails job={job} />
      </TiltCard>
    </div>
  );
}

function RoleDetails({ job }: { job: ExperienceItem }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 font-medium text-foreground/95 shadow-sm">
          <CalendarRange className="size-3.5 shrink-0" aria-hidden />
          {job.period}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 shadow-sm">
          <Building2 className="size-3.5 shrink-0" aria-hidden />
          {job.company}
        </span>
        {job.isCurrent ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-medium text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Current · Full-time
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{job.role}</h3>
      {job.summary ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.summary}</p> : null}

      {job.highlights.length > 0 ? (
        <motion.ul
          variants={highlightList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-5 space-y-2.5 border-t border-border/60 pt-5"
        >
          {job.highlights.map((h) => (
            <motion.li key={h} variants={highlightItem} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500" aria-hidden />
              <span>{h}</span>
            </motion.li>
          ))}
        </motion.ul>
      ) : null}

      {job.tech ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              <TechLogo name={t} className="size-3.5 shrink-0 text-foreground" />
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}
