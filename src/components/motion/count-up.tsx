"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { EASE_OUT } from "@/lib/motion";

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      value.jump(to);
      return;
    }
    const controls = animate(value, to, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [isInView, reduceMotion, to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
