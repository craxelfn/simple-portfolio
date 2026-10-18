"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import { siteConfig } from "@/constants/portfolio";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SectionLink } from "../layout/section-link";
import { Magnetic } from "../motion/magnetic";

const Hero3D = dynamic(() => import("./hero-3d").then((m) => ({ default: m.Hero3D })), {
  ssr: false,
  loading: () => null,
});

const ROLE_INTERVAL_MS = 2600;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_OUT } },
};

const NAME_DELAY_S = 0.35;
const LETTER_STAGGER_S = 0.045;

// The stagger lives on the word so a letter springs straight back after hover.
const nameWord: Variants = {
  hidden: {},
  visible: (startIndex: number) => ({
    transition: {
      delayChildren: NAME_DELAY_S + startIndex * LETTER_STAGGER_S,
      staggerChildren: LETTER_STAGGER_S,
    },
  }),
};

const letter: Variants = {
  hidden: { y: 60, rotateX: -90, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 180, damping: 16 },
  },
};

const socials = [
  { label: "GitHub", href: siteConfig.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
] as const;

// Gradient for the last name, sampled per letter so each glyph can move on its own.
const LAST_NAME_COLORS = ["#0ea5e9", "#06b6d4", "#22d3ee", "#38bdf8", "#818cf8", "#a78bfa", "#8b5cf6"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX}px ${spotY}px, rgba(56, 189, 248, 0.12), transparent 70%)`;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    spotX.set(event.clientX - box.left);
    spotY.set(event.clientY - box.top);
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden border-b border-border/60 pt-[4.75rem]"
    >
      <Aurora />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />
      <Hero3D />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[min(92vh,940px)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div className="max-w-2xl space-y-7" variants={container} initial="hidden" animate="visible">
          <StatusBadge />

          <div>
            <motion.p variants={item} className="text-lg font-medium text-muted-foreground">
              Hi, I&apos;m
            </motion.p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl [perspective:800px]">
              <span className="sr-only">{siteConfig.name}</span>
              <AnimatedName text={siteConfig.firstName} startIndex={0} />
              <span aria-hidden> </span>
              <AnimatedName text={siteConfig.lastName} startIndex={siteConfig.firstName.length} colors={LAST_NAME_COLORS} />
            </h1>
            <RoleRotator />
          </div>

          <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <SectionLink
                to="projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-shadow hover:shadow-xl hover:shadow-sky-500/40"
              >
                View my work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </SectionLink>
            </Magnetic>
            <Magnetic>
              <a
                href={siteConfig.cv}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-sky-500/50 hover:bg-muted"
              >
                <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
                Download CV
              </a>
            </Magnetic>
            <div className="flex items-center gap-1.5 sm:ml-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <Magnetic key={label} strength={0.5}>
                  <motion.a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={label}
                    title={label}
                    whileHover={{ rotate: -8, scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="grid size-11 place-items-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:border-sky-500/50 hover:text-sky-500"
                  >
                    <Icon className="size-5" aria-hidden />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <ScrollCue />
      </motion.div>
    </section>
  );
}

type AnimatedNameProps = {
  text: string;
  startIndex: number;
  colors?: readonly string[];
};

function AnimatedName({ text, startIndex, colors }: AnimatedNameProps) {
  return (
    <motion.span
      aria-hidden
      className="inline-block whitespace-nowrap"
      variants={nameWord}
      custom={startIndex}
      initial="hidden"
      animate="visible"
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block cursor-default"
          style={colors ? { color: colors[i % colors.length] } : undefined}
          variants={letter}
          whileHover={{
            y: -14,
            scale: 1.1,
            rotate: i % 2 === 0 ? -8 : 8,
            transition: { type: "spring", stiffness: 500, damping: 10 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function RoleRotator() {
  const [index, setIndex] = useState(0);
  const roles = siteConfig.roles;

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), ROLE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [roles.length]);

  return (
    <motion.p variants={item} className="mt-4 text-xl font-medium text-foreground/90 sm:text-2xl">
      <span className="sr-only">I build {roles.join(", ")}.</span>
      <span aria-hidden className="flex flex-wrap items-baseline gap-x-2">
        <span>I build</span>
        <span className="relative inline-flex h-[1.35em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={roles[index]}
              initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="whitespace-nowrap bg-gradient-to-r from-sky-500 via-cyan-400 to-violet-500 bg-clip-text font-semibold text-transparent"
            >
              {roles[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.p>
  );
}

function StatusBadge() {
  return (
    <motion.div
      variants={item}
      className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-700 dark:text-sky-300"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {siteConfig.title}
      <motion.span
        aria-hidden
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/15"
        animate={{ x: ["0%", "450%"] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/[0.07] via-transparent to-transparent dark:from-sky-400/[0.06]" />
      <motion.div
        className="absolute -left-40 top-0 size-[30rem] rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-500/15"
        animate={{ x: [0, 90, -30, 0], y: [0, 50, 90, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/4 size-[34rem] rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-500/12"
        animate={{ x: [0, -70, 40, 0], y: [0, -40, 60, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 left-1/3 size-[28rem] rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-400/10"
        animate={{ x: [0, 60, -60, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[size:56px_56px]",
          "bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)]",
          "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
        )}
      />
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
    >
      <SectionLink
        to="about"
        aria-label="Scroll to About"
        className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/40 p-1.5 transition-colors hover:border-sky-500"
      >
        <motion.span
          className="block size-1.5 rounded-full bg-sky-500"
          animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </SectionLink>
      <span className="text-xs text-muted-foreground">Scroll</span>
    </motion.div>
  );
}
