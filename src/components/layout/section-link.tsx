"use client";

import { useContext, type ButtonHTMLAttributes } from "react";

import { LenisContext } from "@/components/providers/lenis-context";
import { cn } from "@/lib/utils";

type SectionLinkProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> & {
  to: string;
  onNavigate?: () => void;
};

const OFFSET = 76;

export function SectionLink({ to, className, children, onNavigate, ...rest }: SectionLinkProps) {
  const ctx = useContext(LenisContext);

  return (
    <button
      type="button"
      className={cn(className)}
      {...rest}
      onClick={() => {
        const el = document.getElementById(to);
        if (!el) return;
        onNavigate?.();
        const lenis = ctx?.lenisRef.current;
        if (lenis) {
          lenis.scrollTo(el, { offset: -OFFSET, duration: 1.2 });
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
    >
      {children}
    </button>
  );
}
