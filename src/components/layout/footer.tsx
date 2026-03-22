"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/constants/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link
            href={`mailto:${siteConfig.email}`}
            className="flex size-10 items-center justify-center rounded-lg border border-border/50 bg-muted/30 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-foreground/20 hover:bg-muted hover:text-foreground hover:shadow-md"
            aria-label="Email"
            title="Email"
          >
            <Mail className="size-5 shrink-0" aria-hidden />
          </Link>
          <a
            href="https://www.linkedin.com/in/oussama-lakrafi-118805295/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-lg border border-border/50 bg-muted/30 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-foreground/20 hover:bg-muted hover:text-foreground hover:shadow-md"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin className="size-5 shrink-0" aria-hidden />
          </a>
          <a
            href="https://github.com/craxelfn/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-lg border border-border/50 bg-muted/30 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-foreground/20 hover:bg-muted hover:text-foreground hover:shadow-md"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className="size-5 shrink-0" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
