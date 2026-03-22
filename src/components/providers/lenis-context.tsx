"use client";

import type Lenis from "lenis";
import { createContext } from "react";

export type LenisContextValue = {
  lenisRef: React.MutableRefObject<Lenis | null>;
};

export const LenisContext = createContext<LenisContextValue | null>(null);
