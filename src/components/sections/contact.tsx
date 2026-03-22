"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

import { siteConfig } from "@/constants/portfolio";

import { ScrollReveal } from "../motion/scroll-reveal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const form = e.currentTarget;
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  }

  const configured = Boolean(serviceId && templateId && publicKey);

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Seeking a final-year project internship (PFE). Reach out by email, phone, or the form
              below.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Phone:{" "}
              <a
                href={siteConfig.phoneTel}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={onSubmit}
              className="space-y-5 rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Your message…"
                />
              </div>

              {!configured && (
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Add EmailJS environment variables to enable sending. See{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.example</code>.
                </p>
              )}

              {status === "success" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Thanks — your message was sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive">
                  {configured
                    ? "Something went wrong. Please try again or email directly."
                    : "EmailJS is not configured yet."}
                </p>
              )}

              <Button
                type="submit"
                className="w-full gap-2 rounded-lg sm:w-auto"
                disabled={status === "loading" || !configured}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
