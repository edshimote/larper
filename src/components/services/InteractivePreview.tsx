"use client";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useActive } from "./useActive";

const RINGS = [{ r: 0, d: 14 }, { r: 60, d: 20 }, { r: 120, d: 26 }];
const SPARKS = [[14, 20, 30], [78, 14, -40], [86, 70, 50], [22, 82, -20], [50, 6, 60]];

/** CSS-only 3D orbital composition: no canvas, so it costs almost nothing. Cursor tilts it. */
export function InteractivePreview() {
  const { ref, active } = useActive<HTMLDivElement>();
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 110, damping: 16 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-28, 28]), { stiffness: 110, damping: 16 });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const state = { animationPlayState: active ? "running" : "paused" } as const;
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} aria-hidden
      className="relative grid h-full w-full touch-pan-y place-items-center overflow-hidden rounded-xl border border-line bg-[radial-gradient(ellipse_at_50%_40%,rgba(121,88,255,0.22),transparent_65%)] [perspective:900px]">
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative h-44 w-44 sm:h-52 sm:w-52">
        <div className="absolute inset-[33%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#00D9FF,#7958FF_60%,#171D2B)] shadow-[0_0_60px_10px_rgba(121,88,255,0.45)]" style={{ transform: "translateZ(0)" }} />
        {RINGS.map(({ r, d }) => (
          <div key={r} className="absolute inset-0" style={{ transform: `rotateX(72deg) rotateZ(${r}deg)`, transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 animate-[spin_var(--d)_linear_infinite] rounded-full border border-primary/40" style={{ ...state, ["--d" as string]: `${d}s` }}>
              <i className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_10px_2px_rgba(0,217,255,0.7)]" />
            </div>
          </div>
        ))}
        {SPARKS.map(([l, tp, z], i) => <i key={i} className="absolute h-1 w-1 rounded-full bg-primary-soft/80" style={{ left: `${l}%`, top: `${tp}%`, transform: `translateZ(${z}px)` }} />)}
      </motion.div>
    </div>
  );
}
