"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { FINE_POINTER, useMediaQuery } from "@/hooks/use-media-query";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

/** A dot that tracks the pointer and a trailing ring that grows over anything clickable. */
export function CursorFollower() {
  const hasFinePointer = useMediaQuery(FINE_POINTER);
  const reduceMotion = useReducedMotion();
  const isEnabled = hasFinePointer && !reduceMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      setIsHovering(Boolean(target?.closest(INTERACTIVE)));
    };
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [isEnabled, x, y]);

  if (!isEnabled) return null;

  const ringSize = isHovering ? 56 : 34;

  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500"
          animate={{ width: 6, height: 6, opacity: isVisible && !isHovering ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/70 dark:border-sky-400/70"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: isVisible ? 1 : 0,
            scale: isPressed ? 0.8 : 1,
            backgroundColor: isHovering ? "rgba(14, 165, 233, 0.12)" : "rgba(14, 165, 233, 0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
      </motion.div>
    </>
  );
}
