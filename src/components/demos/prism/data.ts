import type { LucideIcon } from "lucide-react";
import { Box, Orbit, Sparkles } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

/**
 * Model registry for the GLB/GLTF viewer (Stage 3.5).
 *
 * To add a new model later: drop a .glb/.gltf file in /public/models/, then add an entry here
 * with `kind: "glb"` and its `path`. Nothing else in the viewer needs to change — `PrismScene`
 * reads this registry and renders whichever kind it finds. No real asset is available yet
 * (no network in this sandbox, no file supplied), so every entry below is `kind: "procedural"`:
 * an original, hand-built Three.js geometry that stands in for a real model.
 */
export type ModelId = "aurora" | "helix" | "nova";

export type ModelEntry =
  | { id: ModelId; kind: "procedural"; icon: LucideIcon; accent: string; accent2: string }
  | { id: ModelId; kind: "glb"; icon: LucideIcon; accent: string; accent2: string; path: string };

export const MODELS: ModelEntry[] = [
  { id: "aurora", kind: "procedural", icon: Sparkles, accent: "#8B6CFF", accent2: "#00D9FF" },
  { id: "helix", kind: "procedural", icon: Orbit, accent: "#00D9FF", accent2: "#8B6CFF" },
  { id: "nova", kind: "procedural", icon: Box, accent: "#A58FFF", accent2: "#22D3EE" },
];

export const DEFAULT_MODEL: ModelId = "aurora";

export const PRISM_ART: ArtSpec = { icon: Sparkles, from: "#160f2e", via: "#1a1030", to: "#07090F", glow: "rgba(139,108,255,0.4)", tone: "#8B6CFF" };
