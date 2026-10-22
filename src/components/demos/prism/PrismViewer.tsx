"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PrismFallback } from "./PrismFallback";
import type { ModelEntry } from "./data";

// Lazy-loaded, mounted only on this route: three.js never ships in the portfolio's main bundle,
// and this is the page's only <canvas> (the one-WebGL-canvas rule — see PROJECT_CONTEXT.md).
const PrismScene = dynamic(() => import("./PrismScene"), { ssr: false, loading: () => <PrismFallback /> });

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

export function PrismViewer({ entry, modelLabel }: { entry: ModelEntry; modelLabel: string }) {
  const { t } = useLanguage();
  const v = t.demos.prism.viewer;
  const [mode, setMode] = useState<"pending" | "3d" | "static" | "error">("pending");
  const [resetToken, setResetToken] = useState(0);
  const [inView, setInView] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduce ? "static" : hasWebGL() ? "3d" : "static");
  }, []);

  // Performance: pause the render loop once the viewer scrolls out of the viewport.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showCanvas = mode === "3d";

  return (
    <div className="relative">
      <div ref={hostRef} role="img" aria-label={modelLabel} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#120B24] to-[#07090F] sm:aspect-[16/10]">
        {showCanvas ? (
          <Boundary onError={() => setMode("error")}>
            <PrismScene entry={entry} resetToken={resetToken} idleSpin inView={inView} />
          </Boundary>
        ) : (
          <PrismFallback animated={mode !== "static" && mode !== "error"} />
        )}

        {mode === "pending" && (
          <div className="absolute inset-0 grid place-items-center bg-[#07090F]/60 font-mono text-xs text-ink-muted">{v.loading}</div>
        )}

        {(mode === "static" || mode === "error") && (
          <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07090F]/90 to-transparent px-4 pb-3 pt-10 text-center text-xs text-ink-muted">
            {mode === "error" ? v.error : v.webglUnavailable}
          </p>
        )}

        {showCanvas && (
          <button
            type="button"
            onClick={() => setResetToken((n) => n + 1)}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#07090F]/70 px-3 py-1.5 text-xs text-ink backdrop-blur-sm transition-colors hover:border-[#00D9FF] hover:text-[#00D9FF]"
          >
            <RotateCcw size={13} aria-hidden />{v.reset}
          </button>
        )}

        {showCanvas && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-3 rounded-full border border-white/10 bg-[#07090F]/60 px-3 py-1 text-[0.65rem] text-ink-muted backdrop-blur-sm">
            <span>{v.dragHint}</span><span aria-hidden>·</span><span>{v.zoomHint}</span>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted">{v.note}</p>
    </div>
  );
}
