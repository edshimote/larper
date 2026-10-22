"use client";
import { Component, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { CoreFallback } from "./CoreFallback";

// Lazy-loaded: three.js never ships in the initial bundle.
const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false, loading: () => <CoreFallback /> });

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <CoreFallback /> : this.props.children; }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

export function HeroVisual({ label }: { label: string }) {
  const [mode, setMode] = useState<"pending" | "3d" | "static" | "fallback">("pending");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduce ? "static" : hasWebGL() ? "3d" : "fallback");
  }, []);

  return (
    <div role="img" aria-label={label} className="relative h-full w-full">
      {mode === "3d" ? <Boundary><CoreScene /></Boundary> : <CoreFallback animated={mode === "fallback"} />}
    </div>
  );
}
