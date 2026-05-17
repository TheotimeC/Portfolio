"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusPill, StatusVariant } from "@/components/status-pill";

type FeedRow = {
  variant: StatusVariant;
  label: string;
  detail: string;
  timestamp: string;
};

const FEED: FeedRow[] = [
  { variant: "warn",  label: "PLANNING",       detail: "decomposed goal into 4 steps",   timestamp: "+0.04s" },
  { variant: "info",  label: "TOOL · search",  detail: "queried portfolio index",         timestamp: "+0.31s" },
  { variant: "info",  label: "TOOL · retrieve",detail: "fetched 3 documents",             timestamp: "+0.62s" },
  { variant: "info",  label: "MEMORY",         detail: "wrote 1 fact to scratchpad",     timestamp: "+0.88s" },
  { variant: "ok",    label: "EVAL",           detail: "response grounded · score 0.91", timestamp: "+1.12s" },
  { variant: "ok",    label: "READY",          detail: "system status: nominal",         timestamp: "+1.20s" },
];

const GAUGES = [
  { label: "latency", value: "1.2s",   pct: 42 },
  { label: "tokens",  value: "1,840",  pct: 61 },
  { label: "tools",   value: "3 / 8",  pct: 37 },
];

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function RuntimePreview() {
  const [visible, setVisible] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runSequence = () => {
    setVisible([]);
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    FEED.forEach((_, i) => {
      const t = setTimeout(
        () => setVisible((prev) => [...prev, i]),
        prefersReducedMotion ? 0 : i * 250
      );
      timerRef.current.push(t);
    });

    if (!prefersReducedMotion) {
      loopRef.current = setTimeout(runSequence, FEED.length * 250 + 4000);
    }
  };

  useEffect(() => {
    runSequence();
    return () => {
      timerRef.current.forEach(clearTimeout);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden w-full"
      aria-label="Agent runtime preview (decorative)"
      aria-live="off"
      role="img"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-[var(--color-fg-dim)]">
          &gt; agent.run(&quot;explain portfolio&quot;)
        </span>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-2 min-h-[220px]">
        <AnimatePresence initial={false}>
          {FEED.map((row, i) =>
            visible.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASING }}
                className="flex items-start gap-3"
              >
                <StatusPill variant={row.variant} label={row.label} className="shrink-0 mt-0.5" />
                <span className="font-mono text-xs text-[var(--color-fg-muted)] flex-1 leading-relaxed">
                  {row.detail}
                </span>
                <span className="font-mono text-xs text-[var(--color-fg-dim)] tabular-nums shrink-0">
                  {row.timestamp}
                </span>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Gauges */}
      <div className="border-t border-[var(--color-border)] px-4 py-3 grid grid-cols-3 gap-4">
        {GAUGES.map((g) => (
          <div key={g.label} className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[10px] text-[var(--color-fg-dim)] uppercase tracking-wider">
                {g.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-fg-muted)] tabular-nums">
                {g.value}
              </span>
            </div>
            <div
              className="h-0.5 w-full rounded-full bg-[var(--color-surface-2)]"
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-[var(--color-accent)]/60"
                style={{ width: `${g.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
