"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/constants/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { SectionLink } from "./section-link";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_SECTION_IDS = navItems.map((n) => n.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-sm backdrop-blur-xl md:py-1"
          : "border-b border-transparent bg-background/40 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="group flex items-baseline gap-0.5 transition-transform duration-300 hover:scale-105"
        >
          <div className="relative flex select-none items-baseline font-serif text-[1.75rem] font-bold italic tracking-tighter">
            <span className="bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent drop-shadow-sm">
              O
            </span>
            <span className="-ml-1.5 bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6">
              L
            </span>
            <span className="absolute -bottom-1 -right-2 size-2 rounded-full bg-primary ring-2 ring-background transition-transform duration-300 group-hover:scale-125" />
          </div>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border/60 bg-muted/30 p-1 shadow-inner backdrop-blur md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <SectionLink
              key={item.id}
              to={item.id}
              className={cn(
                "relative isolate rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === item.id ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 z-0 rounded-full border border-border/50 bg-background shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </SectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 pb-6 pt-2" aria-label="Mobile">
              {navItems.map((item) => (
                <SectionLink
                  key={item.id}
                  to={item.id}
                  onNavigate={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                    active === item.id
                      ? "bg-muted text-foreground"
                      : "text-foreground/90 hover:bg-muted/60",
                  )}
                >
                  {item.label}
                </SectionLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
