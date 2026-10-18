"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type ScrollTextRevealProps = {
  text: string;
  className?: string;
};

/** Each word brightens as the paragraph scrolls through the viewport. */
export function ScrollTextReveal({ text, className }: ScrollTextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          isStatic={Boolean(reduceMotion)}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isStatic: boolean;
};

function Word({ children, progress, range, isStatic }: WordProps) {
  const opacity = useTransform(progress, range, isStatic ? [1, 1] : [0.15, 1]);
  return (
    <>
      <motion.span aria-hidden style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
