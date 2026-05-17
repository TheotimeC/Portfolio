"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { PERSON } from "@/lib/content";

const BUILD_DATE = new Date().toISOString().slice(0, 10);
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* fallback */
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl space-y-12">
        <hr className="border-[var(--color-border)]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="space-y-8 text-center"
        >
          <div className="space-y-3">
            <SectionLabel className="justify-center">06 — Contact</SectionLabel>
            <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
              Building something serious with AI?
            </h2>
            <p className="font-sans text-sm text-[var(--color-fg-muted)]">
              I&apos;m open to roles, collaborations, and hard problems.
            </p>
          </div>

          {/* Email CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <a
                href={`mailto:${PERSON.email}`}
                aria-label={`Send email to ${PERSON.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {PERSON.email}
              </a>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : `Copy email ${PERSON.email}`}
              className="h-12 w-12 shrink-0"
            >
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--color-ok)]" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
              </motion.span>
            </Button>
          </div>

          <AnimatedToast show={copied} />

          {/* Social links */}
          <div className="flex items-center justify-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a
                href={PERSON.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="gap-2"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-[var(--color-fg-dim)]">
            © 2026 · Théotime Colinet
          </p>
          <p className="font-mono text-[11px] text-[var(--color-fg-dim)]">
            last deploy: {BUILD_DATE}
          </p>
        </div>
      </div>
    </section>
  );
}

function AnimatedToast({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -4 }}
      transition={{ duration: 0.2 }}
      className="h-5 flex items-center justify-center font-mono text-xs text-[var(--color-fg-dim)]"
      aria-live="polite"
      aria-atomic="true"
    >
      {show && "copied · expires in 3s"}
    </motion.div>
  );
}
