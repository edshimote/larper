"use client";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/**
 * Stage 3.1 illustrative previews (DOM/SVG/CSS only, no WebGL, no images, no URLs).
 * Each one carries the fictional brand's own accent on top of the portfolio's dark tokens.
 * Content is fictional; numbers are avoided on purpose. Replaced by real demos in Stages 3.2–3.4.
 */
const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-bg text-[0.66rem] text-ink sm:text-xs ${className}`}>{children}</div>;
}

function Dots() {
  return <span aria-hidden className="flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />)}</span>;
}

/* ───────────── Northline Logistics ───────────── */
export function NorthlineArt({ accent }: { accent: string }) {
  const a = useLanguage().t.demo.art.northline;
  return (
    <Frame>
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-display font-semibold tracking-tight" style={{ color: accent }}>{a.brand}</span>
        <span className="hidden gap-3 text-ink-muted sm:flex">{a.nav.map((n) => <span key={n}>{n}</span>)}</span>
        <Dots />
      </div>
      <div className="relative flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4" style={{ background: `radial-gradient(90% 80% at 80% 0%, ${mix(accent, 22)}, transparent 70%)` }}>
        <svg aria-hidden viewBox="0 0 200 90" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-70">
          <path d="M10 70 C 50 20, 100 90, 140 40 S 190 20, 195 18" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
          <circle cx="10" cy="70" r="2.5" fill={accent} />
          <circle cx="195" cy="18" r="2.5" fill={accent} className="animate-pulse motion-reduce:animate-none" />
        </svg>
        <p className="relative max-w-[16ch] font-display text-sm font-semibold leading-tight sm:text-lg">{a.headline}</p>
        <div className="relative flex items-center gap-2">
          <span className="flex-1 truncate rounded-md border border-line bg-surface/80 px-2.5 py-1.5 text-ink-muted">{a.field}</span>
          <span className="rounded-md px-2.5 py-1.5 font-medium text-bg" style={{ background: accent }}>{a.track}</span>
        </div>
        <ol className="relative grid grid-cols-3 gap-1.5">
          {a.status.map((s, i) => (
            <li key={s} className="flex items-center gap-1.5 rounded-md border border-line bg-surface/70 px-2 py-1">
              <i className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "animate-pulse motion-reduce:animate-none" : ""}`} style={{ background: i <= 1 ? accent : "rgba(255,255,255,.2)" }} />
              <span className="truncate text-ink-muted">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

/* ───────────── Vanta Store ───────────── */
const TILE_SHAPES = ["rounded-[40%]", "rounded-full", "rounded-md"] as const;
export function VantaArt({ accent }: { accent: string }) {
  const a = useLanguage().t.demo.art.vanta;
  return (
    <Frame>
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-display font-bold tracking-[0.3em]">{a.brand}</span>
        <span className="hidden gap-3 text-ink-muted sm:flex">{a.nav.map((n) => <span key={n}>{n}</span>)}</span>
        <Dots />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-end justify-between gap-3">
          <p className="max-w-[18ch] font-display text-sm font-semibold leading-tight sm:text-base">{a.headline}</p>
          <span className="shrink-0 rounded-full px-2.5 py-1 font-medium text-bg" style={{ background: accent }}>{a.cta}</span>
        </div>
        <ul className="grid flex-1 grid-cols-3 gap-2">
          {a.items.map((name, i) => (
            <li key={name} className="flex flex-col gap-1.5 rounded-lg border border-line bg-surface/80 p-1.5">
              <div className="grid flex-1 place-items-center rounded-md" style={{ background: `linear-gradient(160deg, ${mix(accent, 16 + i * 6)}, rgba(255,255,255,.03))` }}>
                <span className={`block h-1/2 w-1/2 min-h-6 min-w-6 border border-white/20 bg-white/10 ${TILE_SHAPES[i % 3]}`} />
              </div>
              <span className="truncate px-0.5">{name}</span>
              <span className="truncate rounded px-1 py-0.5 text-center text-[0.6rem] text-ink-muted" style={{ background: mix(accent, 12) }}>{a.add}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/* ───────────── FlowCore Automation ───────────── */
const BARS = [38, 55, 44, 68, 52, 78, 62] as const;
export function FlowCoreArt({ accent }: { accent: string }) {
  const a = useLanguage().t.demo.art.flowcore;
  return (
    <Frame className="flex-row">
      <aside className="hidden w-[24%] flex-col gap-1.5 border-r border-line p-2.5 sm:flex">
        <span className="mb-1 font-display font-semibold" style={{ color: accent }}>{a.brand}</span>
        {a.nav.map((n, i) => <span key={n} className={`rounded-md px-2 py-1 ${i === 0 ? "text-ink" : "text-ink-muted"}`} style={i === 0 ? { background: mix(accent, 14) } : undefined}>{n}</span>)}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-display text-sm font-semibold">{a.title}</p>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5" style={{ borderColor: mix(accent, 40), color: accent }}>
            <i className="h-1.5 w-1.5 animate-pulse rounded-full motion-reduce:animate-none" style={{ background: accent }} />{a.status}
          </span>
        </div>
        <div className="flex items-center">
          {a.steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <span className="rounded-lg border px-2 py-1.5" style={{ borderColor: mix(accent, 35), background: mix(accent, 9) }}>{s}</span>
              {i < a.steps.length - 1 && <span aria-hidden className="mx-1 h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}, ${mix(accent, 20)})` }} />}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-lg border border-line bg-surface/70 p-2">
          <svg aria-hidden viewBox="0 0 70 24" preserveAspectRatio="none" className="h-14 w-full">
            {BARS.map((h, i) => <rect key={i} x={i * 10 + 2} y={24 - h * 0.28} width="6" height={h * 0.28} rx="1.5" fill={accent} opacity={0.35 + i * 0.09} />)}
          </svg>
          <p className="mt-1 text-[0.6rem] text-ink-muted">{a.sample}</p>
        </div>
      </div>
    </Frame>
  );
}

/* ───────────── Nexus Bot Console ───────────── */
export function NexusArt({ accent }: { accent: string }) {
  const a = useLanguage().t.demo.art.nexus;
  return (
    <Frame>
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-display font-semibold" style={{ color: accent }}>{a.brand}</span>
        <Dots />
      </div>
      <div className="grid flex-1 gap-2 p-3 sm:grid-cols-[1fr_1.2fr] sm:p-4">
        <ul className="flex flex-col gap-1.5">
          {a.bots.map((b, i) => {
            const online = i !== 2;
            return (
              <li key={b} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface/80 px-2.5 py-2">
                <span className="truncate">{b}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-ink-muted">
                  <i className={`h-1.5 w-1.5 rounded-full ${online && i === 0 ? "animate-pulse motion-reduce:animate-none" : ""}`} style={{ background: online ? accent : "rgba(255,255,255,.25)" }} />
                  {online ? a.online : a.idle}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="hidden flex-col gap-1.5 rounded-lg border border-line bg-black/30 p-2.5 font-mono text-[0.62rem] sm:flex">
          <span className="text-ink-muted">{a.log}</span>
          {a.lines.map((l, i) => <span key={l} style={{ color: i === 0 ? accent : undefined, opacity: 1 - i * 0.2 }}>› {l}</span>)}
          <span className="mt-auto text-[0.58rem] text-ink-muted">{a.sample}</span>
        </div>
      </div>
    </Frame>
  );
}

/* ───────────── Beyond the Screen (3D) ───────────── */
// Gallery card preview only: CSS/SVG, no WebGL. The one-canvas rule reserves the real
// GLB/GLTF <canvas> for the dedicated /projects/beyond-the-screen route (Stage 3.5).
export function PrismArt({ accent }: { accent: string }) {
  const a = useLanguage().t.demo.art.prism;
  return (
    <Frame className="relative">
      <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(70% 70% at 70% 20%, ${mix(accent, 28)}, transparent 65%), radial-gradient(60% 60% at 15% 85%, ${mix("#00D9FF", 20)}, transparent 70%)` }} />
      <div className="relative flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-display font-semibold" style={{ color: accent }}>{a.brand}</span>
        <Dots />
      </div>
      <div className="relative flex flex-1 items-center justify-center p-4">
        <svg aria-hidden viewBox="0 0 120 120" className="h-[60%] w-[60%] animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
          <polygon points="60,10 105,40 105,85 60,115 15,85 15,40" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.85" />
          <polygon points="60,32 85,48 85,78 60,94 35,78 35,48" fill={mix(accent, 18)} stroke="#00D9FF" strokeWidth="1" strokeOpacity="0.7" />
          <circle cx="60" cy="63" r="5" fill="#00D9FF" />
        </svg>
      </div>
      <div className="relative flex items-center justify-between px-3 pb-2.5 text-ink-muted">
        <span className="rounded-full border border-line bg-surface/80 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider">{a.tag}</span>
        <span className="text-[0.62rem]">{a.hint}</span>
      </div>
    </Frame>
  );
}

export const ART: Record<"northline" | "vanta" | "flowcore" | "nexus" | "prism", (p: { accent: string }) => ReactNode> = {
  northline: NorthlineArt, vanta: VantaArt, flowcore: FlowCoreArt, nexus: NexusArt, prism: PrismArt,
};
