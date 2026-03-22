import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oussama Lakrafi — Software Engineer | Data Engineer | Cloud & DevOps",
    template: "%s · Oussama Lakrafi",
  },
  description:
    "Oussama Lakrafi — Computer Science engineering student at ENSA Berrechid (Casablanca, Morocco). Full stack, Data engineer, cloud, and DevOps.",
  keywords: [
    "Oussama Lakrafi",
    "software engineer",
    "full stack",
    "data engineer",
    "DevOps",
    "cloud",
    "Next.js",
    "React",
    "Morocco",
    "ENSA Berrechid",
  ],
  authors: [{ name: "Oussama Lakrafi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Oussama Lakrafi",
    title: "Oussama Lakrafi — Software Engineer | Data engineer | Cloud & DevOps",
    description:
      "Computer Science engineering student at ENSA Berrechid. Full stack, Data engineer, cloud, and DevOps.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussama Lakrafi — Software Engineer | Data Engineer | Cloud & DevOps",
    description:
      "Computer Science engineering student at ENSA Berrechid. Full stack, Data engineer, cloud, and DevOps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)');var dark=t==='dark'||(t!=='light'&&m.matches);document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
