export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-x flex flex-col items-start justify-between gap-2 font-mono text-xs text-ink-muted sm:flex-row sm:items-center">
        <span className="font-display text-sm font-semibold text-ink">EDUARDO<span className="text-secondary">.</span>DEV</span>
        <span>© {new Date().getFullYear()} Eduardo.dev</span>
      </div>
    </footer>
  );
}
