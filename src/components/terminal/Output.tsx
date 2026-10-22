import type { ReactNode } from "react";

export function OutLine({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "muted" | "accent" | "error" | "success" }) {
  const styles = {
    default: "text-ink",
    muted: "text-ink-muted",
    accent: "text-[var(--term-accent)]",
    error: "text-rose-400",
    success: "text-[var(--term-accent2)]",
  } as const;
  return <p className={`${styles[variant]} leading-relaxed`}>{children}</p>;
}

export function OutBlock({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-0.5">{children}</div>;
}

export function OutRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <p>
      <span className="text-[var(--term-accent2)]">{label}</span>
      <span className="text-ink-muted"> — </span>
      <span className="text-ink">{value}</span>
    </p>
  );
}

export function OutList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-0.5 pl-3">
      {items.map((it, i) => (
        <li key={i} className="before:mr-2 before:text-[var(--term-accent)] before:content-['›']">{it}</li>
      ))}
    </ul>
  );
}
