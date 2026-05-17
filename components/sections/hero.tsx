"use client";

import { motion } from "framer-motion";
import { MapPin, Cpu, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { GridBg } from "@/components/grid-bg";
import { RuntimePreview } from "./runtime-preview";
import { PERSON } from "@/lib/content";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASING, delay },
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-center pt-14 overflow-hidden"
    >
      <GridBg />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-6">
            <motion.div {...fadeUp(0)}>
              <SectionLabel>01 — Identity</SectionLabel>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-sans text-[clamp(2.5rem,6vw,3.5rem)] font-semibold tracking-tight text-[var(--color-fg)] leading-none"
            >
              {PERSON.name}
            </motion.h1>

            <motion.p
              {...fadeUp(0.14)}
              className="font-sans text-lg font-medium text-[var(--color-fg-muted)]"
            >
              {PERSON.title} -{" "}
              <span className="text-[var(--color-fg-muted)]/70">{PERSON.subtitle}</span>
            </motion.p>

            <motion.p
              {...fadeUp(0.2)}
              className="font-sans text-xl text-[var(--color-fg)] leading-relaxed max-w-lg"
            >
              {PERSON.tagline}
            </motion.p>

            <motion.p
              {...fadeUp(0.26)}
              className="font-sans text-[0.95rem] text-[var(--color-fg-muted)] leading-relaxed max-w-prose"
            >
              {PERSON.supporting}
            </motion.p>

            <motion.div
              {...fadeUp(0.32)}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[var(--color-fg-dim)]"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--color-accent)]" aria-hidden="true" />
                {PERSON.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" aria-hidden="true" />
                Working at Euro-Information
              </span>
            </motion.div>
          </div>

          {/* Right — Runtime Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASING, delay: 0.18 }}
          >
            <RuntimePreview />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] text-[var(--color-fg-dim)] tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-4 w-px bg-[var(--color-fg-dim)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
