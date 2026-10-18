"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useContext, useState } from "react";

import { LenisContext } from "@/components/providers/lenis-context";

const SHOW_AFTER_PX = 700;

export function BackToTop() {
  const ctx = useContext(LenisContext);
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setIsVisible(y > SHOW_AFTER_PX));

  function handleClick() {
    const lenis = ctx?.lenisRef.current;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-lg backdrop-blur-md"
        >
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className="stroke-border" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-sky-500"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="size-5" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
