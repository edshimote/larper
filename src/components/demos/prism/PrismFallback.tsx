/** Pure CSS/SVG stand-in used when WebGL is unavailable, the scene fails to load, or reduced motion is requested. Mirrors hero/CoreFallback.tsx. */
export function PrismFallback({ animated = true }: { animated?: boolean }) {
  const spin = animated ? "animate-[spin_34s_linear_infinite]" : "";
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden>
      <div className="absolute h-3/5 w-3/5 rounded-full bg-[#8B6CFF]/25 blur-[90px]" />
      <div className="absolute h-2/5 w-2/5 translate-x-1/4 translate-y-1/4 rounded-full bg-[#00D9FF]/20 blur-[80px]" />
      <svg viewBox="0 0 400 400" className={`relative h-4/5 w-4/5 ${spin}`}>
        <g fill="none" strokeWidth="1">
          <polygon points="200,60 320,135 320,265 200,340 80,265 80,135" stroke="#8B6CFF" strokeOpacity=".65" />
          <polygon points="200,130 265,170 265,230 200,270 135,230 135,170" stroke="#00D9FF" strokeOpacity=".75" />
          <path d="M200 60V130M320 135L265 170M320 265L265 230M200 340V270M80 265L135 230M80 135L135 170" stroke="#A58FFF" strokeOpacity=".45" />
        </g>
        <circle cx="200" cy="200" r="16" fill="#00D9FF" fillOpacity=".85" />
      </svg>
    </div>
  );
}
