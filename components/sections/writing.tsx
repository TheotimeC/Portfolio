"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { ARTICLES, type Article } from "@/lib/content";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASING, delay: index * 0.1 }}
      className="group relative flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:[border-top-color:var(--color-accent)]"
      aria-label={`Read: ${article.title}`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--color-fg-dim)]">{article.date}</span>
        <ExternalLink
          className="h-3.5 w-3.5 text-[var(--color-fg-dim)] transition-colors group-hover:text-[var(--color-accent)]"
          aria-hidden="true"
        />
      </div>

      {/* Title + description */}
      <div className="space-y-2 flex-1">
        <h3 className="font-sans text-base font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)] leading-snug">
          {article.title}
        </h3>
        <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {article.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-fg-dim)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export function Writing() {
  return (
    <section id="writing" className="py-24 px-6">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="flex items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <SectionLabel>06 — Writing</SectionLabel>
            <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
              Thinking out loud.
            </h2>
            <p className="font-sans text-sm text-[var(--color-fg-muted)] max-w-lg">
              Articles on AI engineering, agentic systems, and building things that last past the demo.
            </p>
          </div>

          <a
            href="https://medium.com/@theotime.colinet"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs text-[var(--color-fg-dim)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
            aria-label="All articles on Medium"
          >
            Medium profile
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.url} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
