import type { ReactNode } from "react";

interface KeyProps {
  children: ReactNode;
  className?: string;
}

export function Key({ children, className = "" }: KeyProps) {
  return (
    <kbd
      aria-hidden="true"
      className={[
        "inline-flex items-center justify-center",
        "min-w-7 h-7 px-1.5",
        "rounded-md border border-theme-border",
        "bg-theme-surface text-theme-muted",
        "text-xs font-medium font-mono",
        "shadow-[0_1px_0_var(--color-theme-border)]",
        className,
      ].join(" ")}
    >
      {children}
    </kbd>
  );
}