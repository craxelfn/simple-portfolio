"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

/** Words rise out of a mask, un-blurring as the text scrolls into view. */
export function AnimatedText({ text, as = "h2", className, delay = 0 }: AnimatedTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden className={cn("inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom")}>
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
