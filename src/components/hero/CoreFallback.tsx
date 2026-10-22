// Pure CSS/SVG visual used when WebGL is unavailable, fails, or reduced motion is requested.
export function CoreFallback({ animated = true }: { animated?: boolean }) {
  const spin = animated ? "animate-[spin_40s_linear_infinite]" : "";
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden>
      <div className="absolute h-3/5 w-3/5 rounded-full bg-primary/30 blur-[90px]" />
      <div className="absolute h-2/5 w-2/5 translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/20 blur-[80px]" />
      <svg viewBox="0 0 400 400" className={`relative h-4/5 w-4/5 ${spin}`}>
        <g fill="none" strokeWidth="1">
          <polygon points="200,40 340,120 340,280 200,360 60,280 60,120" stroke="#7958FF" strokeOpacity=".6" />
          <polygon points="200,100 290,150 290,250 200,300 110,250 110,150" stroke="#00D9FF" strokeOpacity=".7" />
          <path d="M200 40V100M340 120L290 150M340 280L290 250M200 360V300M60 280L110 250M60 120L110 150" stroke="#A58FFF" strokeOpacity=".4" />
          <circle cx="200" cy="200" r="150" stroke="#fff" strokeOpacity=".08" strokeDasharray="3 8" />
        </g>
        <circle cx="200" cy="200" r="22" fill="#00D9FF" fillOpacity=".85" />
      </svg>
    </div>
  );
}
