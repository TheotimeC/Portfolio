"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/section-label";
import { APPROACH_PRINCIPLES } from "@/lib/content";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Approach() {
  return (
    <section id="approach" className="py-24 px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="space-y-3"
        >
          <SectionLabel>05 — Approach</SectionLabel>
          <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
            How I think about AI systems.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {APPROACH_PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASING, delay: i * 0.08 }}
              className="space-y-2"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--color-accent)] shrink-0">
                  {p.index} →
                </span>
                <p className="font-sans text-base font-semibold text-[var(--color-fg)]">
                  {p.heading}
                </p>
              </div>
              <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed pl-8">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
