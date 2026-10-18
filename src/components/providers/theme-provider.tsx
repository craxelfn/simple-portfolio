"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "theme";

export type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const NO_TRANSITIONS_CSS = "*,*::before,*::after{transition:none!important}";

/**
 * Hover transitions (transition-colors etc.) would otherwise animate the theme
 * change too, leaving some elements mid-fade while the rest has switched.
 * Disable them for the frame in which the theme class flips.
 */
function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(NO_TRANSITIONS_CSS));
  document.head.appendChild(style);

  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;

  // Force a style recalc while transitions are off, then restore them.
  void window.getComputedStyle(document.body).opacity;
  window.setTimeout(() => style.remove(), 1);
}

function resolve(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemIsDark(mq.matches);
    mq.addEventListener("change", onChange);
    queueMicrotask(() => setSystemIsDark(mq.matches));
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setHydrated(true);
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemeState(stored);
        }
      } catch {
        /* ignore */
      }
    });
  }, []);

  const resolvedTheme = useMemo((): "light" | "dark" => {
    if (theme === "system") return systemIsDark ? "dark" : "light";
    return theme === "dark" ? "dark" : "light";
  }, [theme, systemIsDark]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    if (root.classList.contains("dark") === (resolvedTheme === "dark")) return;
    applyTheme(resolvedTheme);
  }, [resolvedTheme, hydrated]);

  const setTheme = useCallback((next: Theme) => {
    // Apply synchronously so a view transition captures the finished new theme.
    applyTheme(resolve(next));
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
