"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUp, RotateCcw } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import type { Action, ConversationTurn } from "@/lib/navigator/types";

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

type UserMessage = { id: string; role: "user"; text: string };
type AiMessage = {
  id: string;
  role: "ai";
  answer: string[];
  actions: Action[];
  displayedLines: string[];
};
type ChatMessage = UserMessage | AiMessage;

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

function toHistory(messages: ChatMessage[]): ConversationTurn[] {
  return messages.map((m) => ({
    role: m.role,
    text: m.role === "user" ? m.text : m.answer.join(" "),
  }));
}

export function Navigator() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);

  // Keep messagesRef in sync for stable submit closure
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Scroll thread to bottom on new content
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  // Cycle placeholder text — only when idle (no messages, no query)
  useEffect(() => {
    if (query || messages.length > 0) return;
    const id = setInterval(() => {
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 300);
    }, 3500);
    return () => clearInterval(id);
  }, [query, messages.length]);

  const submit = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    // Fast-forward any in-progress stream before starting the next turn
    if (streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
      setMessages((prev) =>
        prev.map((m) =>
          m.role === "ai" ? { ...m, displayedLines: m.answer } : m
        )
      );
    }

    const history = toHistory(messagesRef.current);
    const userMsgId = `u-${Date.now()}`;
    const aiMsgId = `a-${Date.now() + 1}`;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", text: trimmed },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/navigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, history }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json() as { answer?: string[]; actions?: Action[] };
      setIsLoading(false);

      const fullLines = data.answer ?? ["Something went wrong. Try refreshing the page."];
      const actions = data.actions ?? [{ label: "Contact", href: "#contact" }];
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          role: "ai",
          answer: fullLines,
          actions,
          displayedLines: [],
        },
      ]);

      let lineIdx = 0;
      streamRef.current = setInterval(() => {
        lineIdx++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId && m.role === "ai"
              ? { ...m, displayedLines: fullLines.slice(0, lineIdx) }
              : m
          )
        );
        if (lineIdx >= fullLines.length) {
          if (streamRef.current) clearInterval(streamRef.current);
          streamRef.current = null;
        }
      }, 220);
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          role: "ai",
          answer: ["Something went wrong. Try refreshing the page."],
          actions: [{ label: "Contact", href: "#contact" }],
          displayedLines: ["Something went wrong. Try refreshing the page."],
        },
      ]);
    }
  }, []);

  const handleSubmit = () => {
    if (!query.trim() || isLoading) return;
    submit(query);
    setQuery("");
  };

  const reset = () => {
    if (streamRef.current) clearInterval(streamRef.current);
    streamRef.current = null;
    setMessages([]);
    setQuery("");
    inputRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <section id="navigator" className="py-24 px-6">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="space-y-3"
        >
          <SectionLabel>02 — Navigator</SectionLabel>
          <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
            Ask my assistant anything about me or my work.
          </h2>
          <p className="font-sans text-sm text-[var(--color-fg-muted)]">
            Not a chatbot - a guided tour.
          </p>
        </motion.div>

        {/* Conversation thread */}
        <AnimatePresence mode="wait">
          {hasMessages && (
            <motion.div
              key="thread"
              ref={threadRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 max-h-[480px] overflow-y-auto pr-1"
              aria-live="polite"
            >
              {messages.map((msg) =>
                msg.role === "user" ? (
                  /* User bubble — right-aligned */
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: EASING }}
                    className="flex justify-end"
                  >
                    <div className="rounded-2xl bg-[var(--color-accent)] px-4 py-2.5 max-w-[80%]">
                      <p className="font-mono text-sm text-[var(--color-bg)]">
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* AI bubble — left-aligned */
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: EASING }}
                    className="space-y-3"
                  >
                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-2">
                      {msg.displayedLines.map((line, i) => (
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
                      {/* Streaming cursor while lines are still revealing */}
                      {msg.displayedLines.length < msg.answer.length && (
                        <span
                          className="inline-block h-3 w-0.5 bg-[var(--color-accent)] animate-pulse ml-0.5"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Action chips — appear once all lines are revealed */}
                    {msg.displayedLines.length === msg.answer.length && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                        className="flex flex-wrap gap-2"
                      >
                        {msg.actions.map((action) => (
                          <button
                            key={action.label}
                            onClick={() => scrollToSection(action.href)}
                            className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition-all duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] hover:-translate-y-px cursor-pointer"
                          >
                            → {action.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )
              )}

              {/* Thinking indicator while waiting for the API */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 font-mono text-xs text-[var(--color-fg-dim)]"
                >
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    ●
                  </motion.span>
                  thinking…
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input — always visible at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASING, delay: 0.08 }}
        >
          <div className="relative flex items-center gap-3 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4">
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
                disabled={isLoading}
                className="h-14 w-full bg-transparent font-mono text-sm text-[var(--color-fg)] placeholder-transparent focus:outline-none disabled:opacity-50"
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
                        key={hasMessages ? "follow-up" : placeholderIdx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-sm text-[var(--color-fg-dim)] truncate"
                      >
                        {hasMessages
                          ? "Ask a follow-up…"
                          : PLACEHOLDERS[placeholderIdx]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* New conversation button — visible once thread has messages */}
              {hasMessages && (
                <button
                  onClick={reset}
                  aria-label="Start new conversation"
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-xs text-[var(--color-fg-dim)] transition-colors hover:text-[var(--color-fg-muted)] cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  new
                </button>
              )}
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
          </div>
        </motion.div>

        {/* Suggested chips — shown below input when no conversation */}
        <AnimatePresence>
          {!hasMessages && (
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
                  onClick={() => { submit(chip); }}
                  className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition-all duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] hover:-translate-y-px cursor-pointer"
                >
                  {chip}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
