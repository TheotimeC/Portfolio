"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/section-label";
import { StatusPill, StatusVariant } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASING, delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4",
        "transition-all duration-200",
        "hover:[border-top-color:var(--color-accent)]"
      )}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--color-fg-dim)]">{project.index}</span>
        <StatusPill variant={project.statusVariant as StatusVariant} label={project.status} />
      </div>

      {/* Title + description */}
      <div className="space-y-2 flex-1">
        <h3 className="font-sans text-lg font-semibold text-[var(--color-fg)]">
          {project.title}
        </h3>
        <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-[var(--color-border)]" />

      {/* Will demonstrate */}
      <p className="font-sans text-xs italic text-[var(--color-fg-dim)] leading-relaxed">
        Will demonstrate: {project.willDemonstrate}
      </p>

      {/* Disabled CTA */}
      <Button
        variant="ghost"
        size="sm"
        disabled
        aria-disabled="true"
        className="w-full justify-center cursor-not-allowed opacity-40 mt-auto"
        tabIndex={-1}
      >
        Coming soon
      </Button>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASING }}
          className="space-y-3"
        >
          <SectionLabel>04 — Labs</SectionLabel>
          <h2 className="font-sans text-2xl font-semibold text-[var(--color-fg)]">
            Labs under construction.
          </h2>
          <p className="font-sans text-sm text-[var(--color-fg-muted)] max-w-lg">
            Selected projects coming soon. These are the labs in build.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.index} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
