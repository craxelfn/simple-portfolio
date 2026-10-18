"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { useCallback, useState } from "react";

import { PROJECT_CATEGORIES, projects, type ProjectCategory, type ProjectItem } from "@/constants/portfolio";
import { TechLogo } from "@/constants/tech-icons";
import { snappySpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SectionHeading } from "../motion/section-heading";
import { TiltCard } from "../motion/tilt-card";
import { ProjectModal } from "./project-modal";

type Filter = "All" | ProjectCategory;

const FILTERS: Filter[] = ["All", ...PROJECT_CATEGORIES];
const MAX_CARD_LOGOS = 6;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <section id="projects" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            description="Open-source work at Oracle and systems I've built end to end. Open any card for the details."
          />
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {FILTERS.map((option) => {
              const isActive = option === filter;
              const count = option === "All" ? projects.length : projects.filter((p) => p.category === option).length;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(option)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-transparent text-white"
                      : "border-border/80 text-muted-foreground hover:border-foreground/20 hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="projects-filter"
                      transition={snappySpring}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 shadow-lg shadow-sky-500/25"
                    />
                  ) : null}
                  <span className="relative z-10">{option}</span>
                  <span className="relative z-10 ml-1.5 text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <LayoutGroup>
          <ul className="relative mt-12 grid grid-flow-dense gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={() => setSelectedId(project.id)} />
              ))}
            </AnimatePresence>
          </ul>
          <ProjectModal project={selected} onClose={closeModal} />
        </LayoutGroup>
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: ProjectItem;
  onOpen: () => void;
};

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const logos = project.technologies.slice(0, MAX_CARD_LOGOS);
  const hiddenCount = project.technologies.length - logos.length;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className={cn(project.isFeatured && "lg:col-span-2")}
    >
      <motion.div layoutId={`project-card-${project.id}`} className="h-full rounded-2xl">
        <TiltCard
          maxTilt={project.isFeatured ? 4 : 7}
          className={cn(
            "h-full rounded-2xl border bg-card/60 shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 hover:shadow-xl",
            project.isFeatured
              ? "border-sky-500/30 hover:border-sky-500/60 hover:shadow-sky-500/10"
              : "border-border/80 hover:border-foreground/20",
          )}
        >
          {project.isFeatured ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-gradient-to-br from-sky-500/30 to-violet-500/30 blur-3xl transition-transform duration-700 group-hover/tilt:scale-150"
            />
          ) : null}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="group relative flex h-full w-full flex-col p-6 text-left sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {project.category}
              </span>
              {project.badge ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sky-500/15 to-violet-500/15 px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-sky-500/30">
                  <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
                  {project.badge}
                </span>
              ) : null}
            </div>

            <motion.h3
              layoutId={`project-title-${project.id}`}
              className={cn(
                "mt-4 font-semibold leading-snug tracking-tight text-foreground",
                project.isFeatured ? "text-xl sm:text-2xl" : "text-lg",
              )}
            >
              {project.title}
            </motion.h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

            <div className="mt-auto pt-6">
              <div className="flex items-center gap-1.5">
                {logos.map((t) => (
                  <span
                    key={t}
                    title={t}
                    className="grid size-8 place-items-center rounded-lg border border-border/70 bg-background/70 transition-transform duration-300 group-hover:-translate-y-0.5"
                  >
                    <TechLogo name={t} className="size-4 text-foreground" />
                  </span>
                ))}
                {hiddenCount > 0 ? (
                  <span className="ml-1 text-xs font-medium text-muted-foreground">+{hiddenCount}</span>
                ) : null}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400">
                View details
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </div>
          </button>
        </TiltCard>
      </motion.div>
    </motion.li>
  );
}
