import type { ReactNode } from "react";

export function Badge({ children, icon, className = "" }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <span className={`glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-ink-muted ${className}`}>
      {icon}
      {children}
    </span>
  );
}
