import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium tracking-widest uppercase text-[var(--color-fg-dim)]",
        className
      )}
    >
      {children}
    </p>
  );
}
