"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check, Github, X } from "lucide-react";
import { useContext, useEffect, useRef } from "react";

import { LenisContext } from "@/components/providers/lenis-context";
import type { ProjectItem } from "@/constants/portfolio";
import { TechLogo } from "@/constants/tech-icons";
import { EASE_OUT } from "@/lib/motion";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const details: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.45, ease: EASE_OUT, staggerChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

type ProjectModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

/** Expands from the clicked card through a shared layoutId. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ctx = useContext(LenisContext);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const lenis = ctx?.lenisRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [project, ctx, onClose]);

  const link = project?.href ?? project?.repo;

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      ) : null}
      {project ? (
        <motion.div key="dialog" className="pointer-events-none fixed inset-0 z-[90] grid place-items-center p-4 sm:p-6">
          <motion.div
            ref={dialogRef}
            layoutId={`project-card-${project.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            data-lenis-prevent
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="pointer-events-auto relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div aria-hidden className="relative h-28 overflow-hidden bg-gradient-to-br from-sky-500/30 via-cyan-400/10 to-violet-500/30">
              <motion.div
                className="absolute -left-10 -top-10 size-40 rounded-full bg-sky-400/40 blur-2xl"
                animate={{ x: [0, 260, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              whileHover={{ rotate: 90, scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur"
            >
              <X className="size-5" aria-hidden />
            </motion.button>

            <div className="-mt-8 px-6 pb-8 sm:px-8">
              <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {project.category}
              </span>
              <motion.h3
                id="project-dialog-title"
                layoutId={`project-title-${project.id}`}
                className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground"
              >
                {project.title}
              </motion.h3>

              <motion.div variants={details} initial="hidden" animate="visible" exit="exit">
                <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

                {project.highlights ? (
                  <ul className="mt-6 space-y-3">
                    {project.highlights.map((h) => (
                      <motion.li key={h} variants={details} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky-500/15 text-sky-500">
                          <Check className="size-3" aria-hidden />
                        </span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/40 px-2 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      <TechLogo name={t} className="size-4 shrink-0 text-foreground" />
                      {t}
                    </span>
                  ))}
                </div>

                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-shadow hover:shadow-xl hover:shadow-sky-500/40"
                  >
                    <Github className="size-4" aria-hidden />
                    View source on GitHub
                  </a>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
