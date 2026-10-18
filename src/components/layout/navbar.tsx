"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useActiveSection } from "@/hooks/use-active-section";
import { EASE_OUT } from "@/lib/motion";
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
const HIDE_AFTER_PX = 320;

const mobileList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isNearTop, setIsNearTop] = useState(true);
  const observedSection = useActiveSection(NAV_SECTION_IDS);
  const active = isNearTop ? null : observedSection;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(y > 12);
    setIsNearTop(y < window.innerHeight * 0.5);
    setIsHidden(y > previous && y > HIDE_AFTER_PX);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: isHidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        isScrolled
          ? "border-b border-border/70 bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#hero" aria-label="Oussama Lakrafi, back to top" className="group flex items-baseline gap-0.5">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
            className="relative flex select-none items-baseline font-serif text-[1.75rem] font-bold italic tracking-tighter"
          >
            <span className="bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent drop-shadow-sm">O</span>
            <span className="-ml-1.5 bg-gradient-to-br from-sky-500 to-violet-500 bg-clip-text text-transparent drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6">
              L
            </span>
            <span className="absolute -right-2 -bottom-1 size-2 rounded-full bg-sky-500 ring-2 ring-background transition-transform duration-300 group-hover:scale-150" />
          </motion.div>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border/60 bg-muted/30 p-1 shadow-inner backdrop-blur md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <SectionLink
              key={item.id}
              to={item.id}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "relative isolate rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <motion.nav
              variants={mobileList}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 px-4 pt-2 pb-6"
              aria-label="Mobile"
            >
              {navItems.map((item) => (
                <motion.div key={item.id} variants={mobileItem}>
                  <SectionLink
                    to={item.id}
                    onNavigate={() => setOpen(false)}
                    className={cn(
                      "w-full rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors",
                      active === item.id ? "bg-muted text-foreground" : "text-foreground/90 hover:bg-muted/60",
                    )}
                  >
                    {item.label}
                  </SectionLink>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
