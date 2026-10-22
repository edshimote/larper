import type { LucideIcon } from "lucide-react";
import { Bell, Database, GitBranch, Mail, RefreshCw, ShoppingCart, Sparkles, Webhook } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

/** Fictional workflow steps rendered as connected nodes in the FlowCore runner. Copy lives in i18n (`demos.flowcore.runner.steps`). */
export const RUNNER_STEPS: LucideIcon[] = [Webhook, Database, GitBranch, Bell, Sparkles];

/** Fictional workflow cards. Icons here; names/descriptions/status in i18n (`demos.flowcore.workflows.items`). */
export const WORKFLOWS: { icon: LucideIcon; active: boolean }[] = [
  { icon: ShoppingCart, active: true },
  { icon: Mail, active: true },
  { icon: Database, active: false },
  { icon: RefreshCw, active: true },
];

/** Sample execution history rows. Workflow label + status come from i18n (`demos.flowcore.runner.history.rows`); duration/time are fixed sample values. */
export const HISTORY_META = [
  { duration: "1.8s" },
  { duration: "0.9s" },
  { duration: "2.4s" },
  { duration: "1.2s" },
  { duration: "3.1s" },
];

export const FLOWCORE_ART: ArtSpec = { icon: GitBranch, from: "#052e22", via: "#0a3f2f", to: "#07090F", glow: "rgba(52,211,153,0.35)", tone: "#34D399" };
