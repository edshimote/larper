"use client";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** CSS 3D presentation stage: the child tilts toward the cursor. Mouse/pen only; no WebGL involved. */
export function TiltStage({ children, enabled = true, max = 7 }: { children: ReactNode; enabled?: boolean; max?: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 120, damping: 18 });
  const reset = () => { x.set(0); y.set(0); };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div onPointerMove={move} onPointerLeave={reset} className="relative h-full w-full [perspective:1200px]">
      <motion.div style={enabled ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
