import { Armchair, Crown, Scissors, Sparkles, Star, Wind } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

/** Fictional prices (USD) and durations. Names/descriptions live in i18n (`demos.northstar.services.items`, same order). */
export const SERVICE_META = [
  { id: "classic", price: 35, minutes: 30 },
  { id: "fade", price: 40, minutes: 40 },
  { id: "beard", price: 20, minutes: 20 },
  { id: "combo", price: 50, minutes: 50 },
] as const;

/** Illustrative time slots. NOT real availability. */
export const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"] as const;

/** Window event: a service card asks the booking demo to preselect a service (detail = index). */
export const NS_SELECT_EVENT = "northstar:select";

export const GOLD = "#C6A667";

// Gallery art in the same order as i18n `demos.northstar.gallery.items`. Swap `src` in for real photos later.
export const GALLERY_ART: (ArtSpec & { src?: string })[] = [
  { icon: Armchair, from: "#1b1712", via: "#2a2218", to: "#0b0b0b", glow: "rgba(198,166,103,.35)", tone: "#C6A667" },
  { icon: Scissors, from: "#14161a", via: "#20242b", to: "#0b0b0b", glow: "rgba(160,174,192,.25)", tone: "#cbd5e1" },
  { icon: Sparkles, from: "#1a1410", via: "#2c2016", to: "#0b0b0b", glow: "rgba(198,166,103,.3)", tone: "#e7d3a1" },
  { icon: Crown, from: "#17120e", via: "#241a12", to: "#0b0b0b", glow: "rgba(180,120,70,.3)", tone: "#d9b27c" },
  { icon: Star, from: "#101214", via: "#1a1e22", to: "#0b0b0b", glow: "rgba(198,166,103,.22)", tone: "#C6A667" },
  { icon: Wind, from: "#181410", via: "#262018", to: "#0b0b0b", glow: "rgba(210,180,120,.28)", tone: "#e7d3a1" },
];
