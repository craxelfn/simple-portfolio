"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import dynamic from "next/dynamic";

import { siteConfig } from "@/constants/portfolio";
import { cn } from "@/lib/utils";

import { SectionLink } from "../layout/section-link";
import { buttonVariants } from "../ui/button";

const Hero3D = dynamic(
  () => import("./hero-3d").then((m) => ({ default: m.Hero3D })),
  { ssr: false, loading: () => null },
);

const contactIcons = {
  Email: Mail,
  Phone: Phone,
} as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border/60 pt-[4.75rem]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/[0.07] via-transparent to-transparent dark:from-sky-400/[0.06]" />
      <Hero3D />

      <div className="relative mx-auto flex min-h-[min(88vh,920px)] max-w-6xl flex-col justify-center gap-10 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl space-y-8"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            Portfolio · {siteConfig.location}
          </motion.p>

          <div className="space-y-4">
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {siteConfig.name}
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-lg text-muted-foreground sm:text-xl"
            >
              {siteConfig.title}
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              {siteConfig.tagline}
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="flex flex-wrap gap-3"
          >
            {siteConfig.contactLinks.map((link) => {
              const Icon =
                link.label in contactIcons
                  ? contactIcons[link.label as keyof typeof contactIcons]
                  : Mail;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {link.label === "Phone" ? siteConfig.phoneDisplay : link.label}
                </a>
              );
            })}
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  );
}
