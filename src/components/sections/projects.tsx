"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

import { projects } from "@/constants/portfolio";
import { TechLogo } from "@/constants/tech-icons";
import { staggerContainer } from "@/lib/motion";

import { ScrollReveal } from "../motion/scroll-reveal";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-b border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected work
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Card className="group h-full overflow-hidden border-border/80 bg-card/60 backdrop-blur transition-shadow hover:shadow-lg">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
                    <div className="flex shrink-0 gap-1">
                      {project.repo && (
                        <Button variant="ghost" size="icon" className="size-8" asChild>
                          <Link href={project.repo} target="_blank" rel="noopener noreferrer" aria-label="Repository">
                            <Github className="size-4" />
                          </Link>
                        </Button>
                      )}
                      {project.href && (
                        <Button variant="ghost" size="icon" className="size-8" asChild>
                          <Link href={project.href} target="_blank" rel="noopener noreferrer" aria-label="Live site">
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  {project.description ? (
                    <CardDescription className="text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
