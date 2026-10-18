"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Check, Copy, Github, Linkedin, Loader2, Mail, Phone, RotateCcw, Send, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { siteConfig } from "@/constants/portfolio";
import { EASE_OUT } from "@/lib/motion";

import { Magnetic } from "../motion/magnetic";
import { SectionHeading } from "../motion/section-heading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const isConfigured = Boolean(serviceId && templateId && publicKey);

const RESET_AFTER_MS = 4000;
const COPIED_FOR_MS = 1800;

type Status = "idle" | "loading" | "success" | "error";

type ContactMethod = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  isExternal?: boolean;
};

const METHODS: ContactMethod[] = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "Phone", value: siteConfig.phoneDisplay, href: siteConfig.phoneTel, icon: Phone },
  { label: "LinkedIn", value: "oussama-lakrafi", href: siteConfig.linkedin, icon: Linkedin, isExternal: true },
  { label: "GitHub", value: "craxelfn", href: siteConfig.github, icon: Github, isExternal: true },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something together"
              description="Have a data or AI problem that needs to reach production? Reach out by email, phone, or the form."
            />
            <ul className="mt-10 space-y-3">
              {METHODS.map((method, i) => (
                <motion.li
                  key={method.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 + i * 0.08 }}
                >
                  <ContactRow method={method} />
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ method }: { method: ContactMethod }) {
  const { icon: Icon } = method;
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border/80 bg-card/50 p-3 pr-4 backdrop-blur transition-colors hover:border-sky-500/40">
      <a
        href={method.href}
        {...(method.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-sky-600 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 dark:text-sky-400">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-muted-foreground">{method.label}</span>
          <span className="block truncate font-medium text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400">
            {method.value}
          </span>
        </span>
      </a>
      {method.label === "Email" ? <CopyButton value={method.value} /> : null}
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setIsCopied(false), COPIED_FOR_MS);
    } catch (error: unknown) {
      console.error("Copy to clipboard failed", error);
    }
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={handleCopy}
        aria-label={isCopied ? "Email copied" : "Copy email address"}
        whileTap={{ scale: 0.85 }}
        className="grid size-9 place-items-center rounded-lg border border-border/80 text-muted-foreground transition-colors hover:border-sky-500/40 hover:text-sky-500"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isCopied ? "check" : "copy"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.18 }}
          >
            {isCopied ? <Check className="size-4 text-emerald-500" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isCopied ? (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow"
          >
            Copied!
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [scope, animate] = useAnimate<HTMLFormElement>();
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) return;
    const form = event.currentTarget;
    setStatus("loading");
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("success");
      resetTimer.current = window.setTimeout(() => setStatus("idle"), RESET_AFTER_MS);
    } catch (error: unknown) {
      console.error("EmailJS send failed", error);
      setStatus("error");
      animate(scope.current, { x: [0, -12, 12, -8, 8, -4, 4, 0] }, { duration: 0.5 });
    }
  }

  return (
    <form
      ref={scope}
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 focus-within:border-sky-500/50 focus-within:shadow-[0_0_0_4px_rgba(14,165,233,0.08),0_20px_50px_-20px_rgba(14,165,233,0.35)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required placeholder="Tell me about your project…" className="min-h-[150px]" />
      </div>

      {!isConfigured ? (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          The form isn&apos;t connected yet. Email me directly at {siteConfig.email}.
        </p>
      ) : null}

      <div aria-live="polite" className="min-h-5 text-sm">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-emerald-600 dark:text-emerald-400">
              Thanks, your message was sent. I&apos;ll reply by email.
            </motion.p>
          ) : null}
          {status === "error" ? (
            <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-destructive">
              Your message didn&apos;t send. Try again, or email {siteConfig.email}.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <Magnetic strength={0.2} className="w-full sm:w-auto">
        <motion.button
          type="submit"
          disabled={status === "loading" || !isConfigured}
          whileTap={{ scale: 0.96 }}
          className="relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-7 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-shadow hover:shadow-xl hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              <SubmitLabel status={status} />
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </Magnetic>
    </form>
  );
}

function SubmitLabel({ status }: { status: Status }) {
  if (status === "loading") {
    return (
      <>
        <Loader2 className="size-4 animate-spin" aria-hidden />
        Sending…
      </>
    );
  }
  if (status === "success") {
    return (
      <>
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          />
        </svg>
        Message sent
      </>
    );
  }
  if (status === "error") {
    return (
      <>
        <RotateCcw className="size-4" aria-hidden />
        Try again
      </>
    );
  }
  return (
    <>
      <Send className="size-4" aria-hidden />
      Send message
    </>
  );
}
