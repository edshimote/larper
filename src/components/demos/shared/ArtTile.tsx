import type { LucideIcon } from "lucide-react";

export type ArtSpec = { icon: LucideIcon; from: string; via: string; to: string; glow: string; tone: string };

/**
 * Original illustrative artwork (gradients + a large soft icon). Stand-in for photography: no external
 * images, no licenses, no broken URLs. To use real photos later, pass `src` (a file in /public) and `alt`.
 */
export function ArtTile({ spec, label, src, className = "" }: { spec: ArtSpec; label: string; src?: string; className?: string }) {
  const Icon = spec.icon;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={label} className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(150deg, ${spec.from}, ${spec.via} 55%, ${spec.to})` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(60% 55% at 72% 22%, ${spec.glow}, transparent 70%)` }} />
      <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 7px)" }} />
      <Icon aria-hidden strokeWidth={1} className="absolute left-1/2 top-1/2 h-[46%] w-[46%] min-h-10 min-w-10 -translate-x-1/2 -translate-y-1/2" style={{ color: spec.tone, opacity: 0.55 }} />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
