import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";
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

const title = "Oussama Lakrafi — Forward Deployed Engineer @ Oracle";
const description =
  "Forward Deployed Engineer at Oracle with expertise in AI engineering, data platforms, and solutions architecture. Based in Casablanca, Morocco.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Oussama Lakrafi" },
  description,
  keywords: [
    "Oussama Lakrafi",
    "Forward Deployed Engineer",
    "Oracle",
    "Oracle AI Data Platform",
    "AI engineering",
    "data engineering",
    "AI agents",
    "MLOps",
    "solutions architecture",
    "Casablanca",
    "Morocco",
  ],
  authors: [{ name: "Oussama Lakrafi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Oussama Lakrafi",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
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
          <MotionProvider>
            <LenisProvider>{children}</LenisProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
