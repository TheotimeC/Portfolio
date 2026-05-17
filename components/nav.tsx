"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PERSON } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a
          href="#hero"
          className="font-mono text-sm font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Back to top"
        >
          <span className="text-[var(--color-accent)] mr-1.5" aria-hidden="true">▮</span>
          <span>{PERSON.name.split(" ")[0]}</span>
          <span className="text-[var(--color-fg-muted)]"> {PERSON.name.split(" ").slice(1).join(" ")}</span>
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-ok)] animate-pulse" />
            <span className="font-mono text-xs text-[var(--color-fg-dim)]">system ready</span>
          </div>
          <a
            href="#contact"
            className="font-mono text-xs font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
