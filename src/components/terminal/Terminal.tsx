"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { runCommand } from "./commands";
import { OutLine } from "./Output";
import { COMMAND_IDS, THEMES, THEME_STYLES, type HistoryEntry, type ThemeId } from "./types";

let uid = 0;
const nextId = () => ++uid;

export function Terminal() {
  const { t, locale } = useLanguage();
  const router = useRouter();

  const [theme, setTheme] = useState<ThemeId>("violet");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [booted, setBooted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Welcome lines appear once on mount.
  useEffect(() => {
    const id = nextId();
    setHistory([{ id, input: "", pending: false, output: t.terminal.welcome.map((l) => <OutLine key={l} variant="muted">{l}</OutLine>) }]);
    const tmo = setTimeout(() => setBooted(true), reducedMotion ? 0 : 200);
    return () => clearTimeout(tmo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [history, reducedMotion]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  const openProject = useCallback((href: string) => router.push(href), [router]);
  const cycleTheme = useCallback(() => {
    let next: ThemeId = "violet";
    setTheme((cur) => {
      const i = THEMES.indexOf(cur);
      next = THEMES[(i + 1) % THEMES.length];
      return next;
    });
    return next;
  }, []);

  const submit = useCallback((raw: string) => {
    const value = raw.trim();
    if (!value) return;

    const result = runCommand(value, { t, locale, theme, reducedMotion, cycleTheme, openProject, scrollTo });

    if (result.kind === "clear") {
      setHistory([]);
      setCmdLog((l) => [...l, value].slice(-50));
      setLogIndex(null);
      return;
    }

    setCmdLog((l) => [...l, value].slice(-50));
    setLogIndex(null);

    const id = nextId();
    setHistory((h) => [...h, { id, input: value, pending: true, output: null }].slice(-60));

    const delay = reducedMotion ? 0 : 180 + Math.random() * 180;
    window.setTimeout(() => {
      setHistory((h) => h.map((e) => (e.id === id ? { ...e, pending: false, output: result.node } : e)));
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, locale, theme, reducedMotion, cycleTheme, openProject, scrollTo]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const next = logIndex === null ? cmdLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(next);
      setInput(cmdLog[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const next = logIndex + 1;
      if (next >= cmdLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(next);
        setInput(cmdLog[next] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const first = input.trim().toLowerCase();
      if (!first) return;
      const matches = COMMAND_IDS.filter((c) => c.startsWith(first));
      if (matches.length === 1) {
        setInput(matches[0] + " ");
      } else if (matches.length > 1) {
        setHistory((h) => [...h, { id: nextId(), input: "", pending: false, output: <OutLine variant="muted">{matches.join("  ")}</OutLine> }]);
      }
    }
  };

  const styleVars = useMemo(() => {
    const s = THEME_STYLES[theme];
    return { "--term-accent": s.accent, "--term-accent2": s.accent2, "--term-bg": s.bg } as React.CSSProperties;
  }, [theme]);

  return (
    <div style={styleVars} className="overflow-hidden rounded-2xl border border-line shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-[#0D0F16] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden />
        <span className="ml-3 truncate font-mono text-xs text-ink-muted">{t.terminal.windowTitle}</span>
        <div className="ml-auto hidden items-center gap-2 text-ink-muted sm:flex" aria-hidden>
          <Minus size={13} /> <Square size={11} /> <X size={13} />
        </div>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="h-[420px] overflow-y-auto bg-[var(--term-bg)] px-4 py-4 font-mono text-[0.83rem] sm:text-sm"
        style={{ scrollbarWidth: "thin" }}
      >
        <AnimatePresence initial={false}>
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="mb-3"
            >
              {entry.input && (
                <p className="flex gap-2 text-ink">
                  <span className="shrink-0 text-[var(--term-accent)]">{t.terminal.prompt}$</span>
                  <span className="break-all">{entry.input}</span>
                </p>
              )}
              <div className="mt-1 pl-0">
                {entry.pending ? (
                  <span className="inline-flex items-center gap-1 text-ink-muted" aria-live="polite">
                    {t.terminal.processing}
                    <TerminalCursor />
                  </span>
                ) : (
                  entry.output
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Live prompt row */}
        <form onSubmit={onSubmitForm} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-[var(--term-accent)]">{t.terminal.prompt}$</label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label={t.terminal.inputLabel}
            placeholder={booted ? t.terminal.inputPlaceholder : ""}
            className="min-w-0 flex-1 bg-transparent text-ink caret-[var(--term-accent)] outline-none placeholder:text-ink-muted/60"
          />
          <TerminalCursor />
          <button type="submit" className="sr-only">{t.terminal.runLabel}</button>
        </form>
      </div>

      {/* Mobile quick commands */}
      <div className="flex flex-wrap gap-2 border-t border-line bg-[#0D0F16] px-4 py-3 sm:hidden" role="group" aria-label={t.terminal.quickLabel}>
        {(["help", "about", "skills", "projects", "contact", "whoami", "clear"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { submit(c); inputRef.current?.focus(); }}
            className="glass rounded-full px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function TerminalCursor() {
  return <span className="h-[1.1em] w-[0.5em] animate-pulse bg-[var(--term-accent)]" aria-hidden />;
}
