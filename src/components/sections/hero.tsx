"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
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
  LinkedIn: Linkedin,
  GitHub: Github,
  "Download CV": Download,
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
                  {...("target" in link ? { target: link.target, rel: "noopener noreferrer" } : {})}
                  {...(link.label === "Download CV" ? { download: true } : {})}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/60 text-sm font-medium text-muted-foreground backdrop-blur transition-all duration-300 hover:border-foreground/20 hover:bg-muted hover:text-foreground hover:shadow-md",
                    link.label === "Download CV" ? "px-4 py-2.5" : "size-10 hover:-translate-y-1 hover:scale-110"
                  )}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon className={cn("shrink-0", link.label === "Download CV" ? "size-4" : "size-5")} aria-hidden />
                  {link.label === "Download CV" && <span>{link.label}</span>}
                </a>
              );
            })}
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  );
}
