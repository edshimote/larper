"use client";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/**
 * Visual-only simulation of a Python script running. No code is ever executed:
 * this just reveals fixed strings from i18n on a timer. No eval, no shell, no system access.
 */
export function DemoRun({ t, reducedMotion }: { t: Dictionary; reducedMotion: boolean }) {
  const lines = t.terminal.demo.lines;
  const [shown, setShown] = useState(reducedMotion ? lines.length : 0);
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    if (shown >= lines.length) {
      const t2 = setTimeout(() => setDone(true), 260);
      return () => clearTimeout(t2);
    }
    const t1 = setTimeout(() => setShown((n) => n + 1), 320);
    return () => clearTimeout(t1);
  }, [shown, lines.length, reducedMotion]);

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-black/30 p-3">
      <p className="text-xs text-ink-muted">{t.terminal.demo.title}</p>
      <div className="flex flex-col gap-0.5">
        {lines.slice(0, shown).map((line, i) => (
          <p key={i} className="text-[var(--term-accent2)]">
            <span className="text-ink-muted">{">>> "}</span>
            {line}
          </p>
        ))}
      </div>
      {!done ? (
        <p className="flex items-center gap-2 text-ink-muted">
          <span className="inline-flex gap-1" aria-hidden>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--term-accent)]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--term-accent)] [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--term-accent)] [animation-delay:300ms]" />
          </span>
          {t.terminal.demo.running}
        </p>
      ) : (
        <p className="text-[var(--term-accent)]">✓ {t.terminal.demo.done}</p>
      )}
      <p className="text-xs italic text-ink-muted">{t.terminal.demo.note}</p>
    </div>
  );
}
