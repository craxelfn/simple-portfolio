"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  className,
  delay = 0,
  children,
  ...props
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduce ? 0 : 0.55,
          delay: reduce ? 0 : delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    }),
    [delay, reduce],
  );

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
