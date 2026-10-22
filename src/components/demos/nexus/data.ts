import type { LucideIcon } from "lucide-react";
import { Bell, Headset, MessageSquare, ShoppingBag, Terminal } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

/** Fictional bots managed in the console. Names/types come from i18n (`demos.nexus.bots.items`); `online` is the initial demo state. */
export const BOTS: { icon: LucideIcon; online: boolean }[] = [
  { icon: Headset, online: true },
  { icon: ShoppingBag, online: true },
  { icon: Bell, online: false },
];

export const CHAT_ICON = MessageSquare;
export const CONSOLE_ICON = Terminal;

/** Console commands recognized by the demo terminal. Response copy lives in i18n (`demos.nexus.console.responses`). */
export const COMMANDS = ["help", "status", "ping", "restart", "clear"] as const;
export type Command = (typeof COMMANDS)[number];

export const NEXUS_ART: ArtSpec = { icon: Terminal, from: "#042a31", via: "#063c45", to: "#07090F", glow: "rgba(34,211,238,0.35)", tone: "#22D3EE" };
