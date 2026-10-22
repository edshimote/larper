import type { ReactNode } from "react";

export type ThemeId = "violet" | "matrix" | "amber";
export const THEMES: ThemeId[] = ["violet", "matrix", "amber"];

export const THEME_STYLES: Record<ThemeId, { accent: string; accent2: string; bg: string }> = {
  violet: { accent: "#A58FFF", accent2: "#00D9FF", bg: "#0A0C14" },
  matrix: { accent: "#4ADE80", accent2: "#86EFAC", bg: "#050806" },
  amber: { accent: "#F0B35C", accent2: "#FBBF24", bg: "#120D07" },
};

/** Known command ids, used for autocomplete + quick buttons. */
export const COMMAND_IDS = [
  "help", "about", "skills", "projects", "open", "services",
  "contact", "whoami", "clear", "theme", "date", "echo", "demo",
] as const;
export type CommandId = (typeof COMMAND_IDS)[number];

export type HistoryEntry = {
  id: number;
  input: string;
  pending: boolean;
  output: ReactNode | null;
};
