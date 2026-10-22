import { Globe2, MapPin, ShieldCheck, Snowflake, Truck, Warehouse } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

export const BLUE = "#38BDF8";

/** Six services, icons here; names/descriptions live in i18n (`demos.northline.services.items`, same order). */
export const SERVICE_ICONS = [Truck, Warehouse, MapPin, Globe2, ShieldCheck, Snowflake] as const;

/** Hero / about illustrative artwork. No photographs are used. */
export const NORTHLINE_ART: ArtSpec[] = [
  { icon: Truck, from: "#0A1628", via: "#10233d", to: "#071120", glow: "rgba(56,189,248,.35)", tone: "#38BDF8" },
  { icon: Globe2, from: "#0A1628", via: "#0F2238", to: "#071120", glow: "rgba(56,189,248,.28)", tone: "#7dd3fc" },
];

/**
 * Fixed, fictional shipment-tracking demo data. No real carrier/API is used — these are the ONLY
 * codes the demo recognizes. `stage` is the index reached in `demos.northline.tracking.stages`.
 */
export const TRACKING_DEMOS = [
  { code: "NL-48213", origin: "Chicago, IL", destination: "Austin, TX", stage: 3, eta: "Delivered Oct 14" },
  { code: "NL-77050", origin: "Newark, NJ", destination: "Atlanta, GA", stage: 2, eta: "Arriving Oct 23" },
  { code: "NL-90456", origin: "Seattle, WA", destination: "Denver, CO", stage: 0, eta: "Arriving Oct 27" },
] as const;

/** Fixed US cities for the quote simulator (same list for origin and destination; proper nouns, not translated). */
export const CITIES = ["Chicago, IL", "Austin, TX", "Newark, NJ", "Atlanta, GA", "Seattle, WA", "Denver, CO", "Los Angeles, CA", "Miami, FL"] as const;

/** Cargo type keys; labels live in i18n (`demos.northline.quote.cargoTypes`). */
export const CARGO_TYPES = ["general", "palletized", "refrigerated", "oversized", "parcels"] as const;
export type CargoType = (typeof CARGO_TYPES)[number];

/** Transport modes; labels live in i18n (`demos.northline.quote.modes`). Transit ranges are illustrative only. */
export const MODES = [
  { id: "ground", eta: "3–5 business days" },
  { id: "air", eta: "1–2 business days" },
  { id: "ocean", eta: "14–21 business days" },
] as const;
export type ModeId = (typeof MODES)[number]["id"];
