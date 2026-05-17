"use client";

import { motion } from "framer-motion";
import { Workflow, Cpu, Activity, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { FOCUS_AREAS, type FocusArea } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Workflow,
  Cpu,
  Activity,
};

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FocusCard({ area, index }: { area: FocusArea; index: number }) {
  const Icon = ICON_MAP[area.icon] ?? Cpu;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASING, delay: index * 0.1 }}
      className={cn(
        "group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4",
        "transition-all duration-200 hover:border-[var(--color-border-strong)]"
      )}
    >
      {/* Accent dot on hover */}
      <span
        className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden />
        <span className="font-mono text-xs text-[var(--color-fg-dim)]">{area.index}</span>
      </div>

      <div className="space-y-2">
        <h3 className="font-sans text-base font-semibold text-[var(--color-fg)]">
          {area.title}
        </h3>
        <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {area.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {area.bullets.map((b) => (
          <span
            key={b}
            className="inline-block rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-fg-dim)]"
          >
            {b}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function WhatIBuild() {
  return (
    <section id="focus" className="py-24 px-6">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="space-y-3"
        >
          <SectionLabel>03 — Focus</SectionLabel>
          <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
            What I build.
          </h2>
          <p className="font-sans text-sm text-[var(--color-fg-muted)] max-w-lg">
            Three tightly-related areas — they reinforce each other.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOCUS_AREAS.map((area, i) => (
            <FocusCard key={area.index} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
