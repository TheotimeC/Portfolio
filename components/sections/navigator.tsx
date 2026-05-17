"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUp, RotateCcw } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Action } from "@/lib/navigator/intents";

const SUGGESTED = [
  "Explain the portfolio in 30 seconds",
  "What kind of AI systems do you build?",
  "What makes this profile different?",
  "Show the technical focus",
  "Challenge my AI project idea",
  "Contact Théotime",
];

const PLACEHOLDERS = [
  "Ask about my work, skills, architecture, or future projects…",
  "What kind of AI systems do you build?",
  "How do you approach evaluation?",
  "What's your take on agentic systems?",
  "How can I reach Théotime?",
];

type ResponseState = {
  answer: string[];
  actions: Action[];
  displayedLines: string[];
};

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

function scrollToSection(href: string) {
  if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1));
    if (el) {
      const offset = 72;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  } else {
    window.open(href, "_blank", "noopener,noreferrer");
  }
}

export function Navigator() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseState | null>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Cycle placeholder */
  useEffect(() => {
    if (query || response) return;
    const interval = setInterval(() => {
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, [query, response]);

  const submit = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/navigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      const data: { answer: string[]; actions: Action[] } = await res.json();

      // Fake-stream the answer lines
      const fullLines = data.answer;
      setResponse({ answer: fullLines, actions: data.actions, displayedLines: [] });
      setIsLoading(false);

      let lineIdx = 0;
      streamRef.current = setInterval(() => {
        lineIdx++;
        setResponse((prev) =>
          prev
            ? { ...prev, displayedLines: fullLines.slice(0, lineIdx) }
            : prev
        );
        if (lineIdx >= fullLines.length) {
          if (streamRef.current) clearInterval(streamRef.current);
        }
      }, 220);
    } catch {
      setIsLoading(false);
      setResponse({
        answer: ["Something went wrong. Try refreshing the page."],
        actions: [{ label: "Contact", href: "#contact" }],
        displayedLines: ["Something went wrong. Try refreshing the page."],
      });
    }
  }, []);

  const handleSubmit = () => {
    submit(query);
    setQuery("");
  };

  const handleChip = (chip: string) => {
    setQuery(chip);
    setTimeout(() => {
      submit(chip);
      setQuery("");
    }, 50);
  };

  const reset = () => {
    if (streamRef.current) clearInterval(streamRef.current);
    setResponse(null);
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <section id="navigator" className="py-24 px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="space-y-3"
        >
          <SectionLabel>02 — Navigator</SectionLabel>
          <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
            Ask this site anything about my work.
          </h2>
          <p className="font-sans text-sm text-[var(--color-fg-muted)]">
            Not a chatbot - a guided tour.
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASING, delay: 0.08 }}
        >
          <div
            className="relative flex items-center gap-3 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4"
          >
            <Sparkles
              className="h-4 w-4 shrink-0 text-[var(--color-accent)]"
              aria-hidden="true"
            />

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="h-14 w-full bg-transparent font-mono text-sm text-[var(--color-fg)] placeholder-transparent focus:outline-none"
                aria-label="Ask a question about Théotime's work"
                autoComplete="off"
              />
              {/* Animated placeholder */}
              {!query && (
                <div
                  className="pointer-events-none absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <AnimatePresence mode="wait">
                    {showPlaceholder && (
                      <motion.span
                        key={placeholderIdx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-sm text-[var(--color-fg-dim)] truncate"
                      >
                        {PLACEHOLDERS[placeholderIdx]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!query.trim() || isLoading}
              aria-label="Submit question"
              className="h-8 w-8 shrink-0"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

        {/* Response or chips */}
        <AnimatePresence mode="wait">
          {response ? (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASING }}
              className="space-y-4"
              aria-live="polite"
            >
              {/* Answer lines */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2">
                {response.displayedLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="font-mono text-sm text-[var(--color-fg-muted)] leading-relaxed"
                  >
                    {line}
                  </motion.p>
                ))}
                {isLoading && (
                  <span className="inline-block h-3 w-0.5 bg-[var(--color-accent)] animate-pulse ml-0.5" aria-hidden="true" />
                )}
              </div>

              {/* Action chips */}
              {response.displayedLines.length === response.answer.length && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="flex flex-wrap gap-2"
                >
                  {response.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => scrollToSection(action.href)}
                      className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition-all duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] hover:-translate-y-px cursor-pointer"
                    >
                      → {action.label}
                    </button>
                  ))}
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs text-[var(--color-fg-dim)] transition-colors hover:text-[var(--color-fg-muted)] cursor-pointer"
                    aria-label="Ask another question"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    ask another
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="chips"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {SUGGESTED.map((chip, i) => (
                <motion.button
                  key={chip}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASING, delay: i * 0.04 }}
                  onClick={() => handleChip(chip)}
                  className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition-all duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] hover:-translate-y-px cursor-pointer"
                >
                  {chip}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && !response && (
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-fg-dim)]" aria-live="polite">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              ●
            </motion.span>
            thinking…
          </div>
        )}
      </div>
    </section>
  );
}
