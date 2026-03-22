"use client";

import Lenis from "lenis";
import { useEffect, useMemo, useRef } from "react";

import { LenisContext } from "./lenis-context";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = instance;

    let rafId = 0;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({ lenisRef }), []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
