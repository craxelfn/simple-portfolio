"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { siteConfig } from "@/constants/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {siteConfig.email}
          </Link>
          <Link
            href={siteConfig.phoneTel}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {siteConfig.phoneDisplay}
          </Link>
        </div>
      </div>
    </footer>
  );
}
