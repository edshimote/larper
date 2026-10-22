"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { COMMANDS, CONSOLE_ICON } from "./data";

type Line = { kind: "in" | "out"; text: string };

/**
 * Demo command console. Recognizes a small fixed set of commands with local state only — no eval, no
 * arbitrary code execution, no real system commands.
 */
export function NexusTerminal() {
  const { t } = useLanguage();
  const n = t.demos.nexus.console;
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: n.welcome }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [lines]);
  // Reset the greeting if the language changes mid-session.
  useEffect(() => { setLines([{ kind: "out", text: n.welcome }]); }, [n.welcome]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setLines((prev) => [...prev, { kind: "in", text: raw.trim() }]);
    if (cmd === "clear") { setLines([]); return; }
    const known = cmd !== "unknown" && cmd in n.responses;
    const out = known ? n.responses[cmd as keyof typeof n.responses] : n.responses.unknown;
    setLines((prev) => [...prev, { kind: "out", text: out }]);
  };

  const Icon = CONSOLE_ICON;

  return (
    <section id="console" aria-labelledby="nx-console-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0B2227] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#22D3EE]">{n.eyebrow}</p>
          <h2 id="nx-console-title" className="mt-4 font-[family-name:var(--font-space-mono)] text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">{n.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{n.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#071219]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-[#94A3B8]">
            <Icon size={14} className="text-[#22D3EE]" aria-hidden />
            <span className="font-[family-name:var(--font-space-mono)]">{n.prompt}</span>
          </div>
          <div className="h-80 overflow-y-auto p-4 font-[family-name:var(--font-space-mono)] text-sm leading-relaxed" aria-live="polite">
            {lines.map((l, i) => (
              <p key={i} className={l.kind === "in" ? "text-[#F8FAFC]" : "text-[#94A3B8]"}>
                {l.kind === "in" ? <span className="text-[#22D3EE]">{n.prompt}&gt; </span> : null}
                {l.text}
              </p>
            ))}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <span className="font-[family-name:var(--font-space-mono)] text-sm text-[#22D3EE]">{n.prompt}&gt;</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={n.placeholder}
              className="flex-1 bg-transparent font-[family-name:var(--font-space-mono)] text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none"
              aria-label={n.placeholder}
            />
          </form>
        </Reveal>
        <p className="mt-4 font-mono text-[0.72rem] text-[#94A3B8]">{n.hint} {COMMANDS.join(", ")}</p>
      </div>
    </section>
  );
}
