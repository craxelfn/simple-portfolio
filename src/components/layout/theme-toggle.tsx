"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

const subscribeNoop = () => () => {};

const REVEAL_DURATION_MS = 650;
const REVEAL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9" aria-label="Toggle theme">
        <span className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  /** The new theme grows out of the button as a circle (View Transitions API). */
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const next = isDark ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: REVEAL_DURATION_MS, easing: REVEAL_EASING, pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {
        // The switch already happened; only the reveal animation was skipped.
      });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 overflow-hidden"
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {isDark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-sky-600" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
