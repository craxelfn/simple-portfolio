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
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors",
        scrolled && "border-border/80 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <SectionLink
              key={item.id}
              to={item.id}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                active === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
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
                    "rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors",
                    active === item.id ? "text-foreground" : "text-foreground/90",
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
