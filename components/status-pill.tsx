import { cn } from "@/lib/utils";

export type StatusVariant = "ok" | "warn" | "info" | "danger" | "idle";

const CONFIG: Record<
  StatusVariant,
  { dot: string; text: string; bg: string; label: string }
> = {
  ok:     { dot: "bg-[var(--color-ok)]",     text: "text-[var(--color-ok)]",     bg: "bg-[var(--color-ok)]/10",     label: "ok" },
  warn:   { dot: "bg-[var(--color-warn)]",   text: "text-[var(--color-warn)]",   bg: "bg-[var(--color-warn)]/10",   label: "warn" },
  info:   { dot: "bg-[var(--color-info)]",   text: "text-[var(--color-info)]",   bg: "bg-[var(--color-info)]/10",   label: "info" },
  danger: { dot: "bg-[var(--color-danger)]", text: "text-[var(--color-danger)]", bg: "bg-[var(--color-danger)]/10", label: "danger" },
  idle:   { dot: "bg-[var(--color-fg-dim)]", text: "text-[var(--color-fg-dim)]", bg: "bg-[var(--color-surface-2)]", label: "idle" },
};

interface StatusPillProps {
  variant: StatusVariant;
  label: string;
  pulse?: boolean;
  className?: string;
}

export function StatusPill({ variant, label, pulse = false, className }: StatusPillProps) {
  const c = CONFIG[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs font-medium",
        c.bg,
        c.text,
        className
      )}
      role="status"
      aria-label={`Status: ${label}`}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full flex-shrink-0",
          c.dot,
          pulse && "animate-pulse"
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
