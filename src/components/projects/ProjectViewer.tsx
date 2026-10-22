"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Box, Check, ChevronLeft, ChevronRight, Clock, Code, ExternalLink, Maximize2, Minimize2, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { hasDemo, projectHref, resolveProject, type Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
import { TiltStage } from "./TiltStage";

type Props = { projects: Project[]; index: number; onClose: (restoreFocus?: boolean) => void; onNavigate: (delta: number) => void };

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Modal presentation: large interactive demo, prev/next navigation, device toggle (websites), 3D tilt. */
export function ProjectViewer({ projects, index, onClose, onNavigate }: Props) {
  const { t, locale } = useLanguage();
  const p = t.projects;
  const reduce = useReducedMotion();
  const project = projects[index];
  const r = resolveProject(project, t, locale);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [tilt, setTilt] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const comingSoon = project.kind === "concept" && !hasDemo(project);
  const demoHref = projectHref(project);
  const live = Boolean(demoHref);
  const tiltOn = tilt && !reduce;

  useEffect(() => { setDevice("desktop"); setFullscreen(false); setLoaded(false); }, [project.id]);

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") { e.preventDefault(); if (fullscreen) setFullscreen(false); else onClose(); return; }
    const tag = (e.target as HTMLElement).tagName;
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault(); onNavigate(e.key === "ArrowRight" ? 1 : -1); return;
    }
    if (e.key === "Tab" && panel.current) {
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const toggle = "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors";
  const on = "border-primary/60 bg-primary/15 text-ink";
  const off = "border-line text-ink-muted hover:border-white/20 hover:text-ink";
  const iconBtn = "grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-white/25 hover:text-ink";

  const frameWidth = device === "tablet" ? "max-w-[48rem]" : device === "mobile" ? "max-w-[23.5rem]" : "max-w-full";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      onKeyDown={onKeyDown} className={`fixed inset-0 z-[70] grid place-items-center ${fullscreen ? "" : "p-3 sm:p-6"}`}>
      <div aria-hidden onClick={() => onClose()} className="absolute inset-0 bg-bg/85 backdrop-blur-md" />
      <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={`${p.dialogLabel}: ${r.title}`}
        initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 flex w-full flex-col overflow-hidden border border-line bg-gradient-to-b from-elevated to-surface shadow-2xl shadow-black/60 transition-[max-width,max-height,border-radius] duration-300 ${fullscreen ? "h-[100svh] max-h-[100svh] max-w-none rounded-none" : "max-h-[94svh] max-w-6xl rounded-[1.5rem]"}`}>
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <p className="font-mono text-xs text-ink-muted" aria-live="polite">{index + 1} {p.counter} {projects.length}</p>
          <div className="flex items-center gap-2">
            {projects.length > 1 && !fullscreen && (
              <>
                <button type="button" onClick={() => onNavigate(-1)} aria-label={p.prev} className={iconBtn}><ChevronLeft size={18} aria-hidden /></button>
                <button type="button" onClick={() => onNavigate(1)} aria-label={p.next} className={iconBtn}><ChevronRight size={18} aria-hidden /></button>
              </>
            )}
            <button ref={closeBtn} type="button" onClick={() => onClose()} aria-label={p.close} className={iconBtn}><X size={18} aria-hidden /></button>
          </div>
        </div>

        <div className={`grid flex-1 overflow-y-auto lg:overflow-hidden ${fullscreen ? "lg:grid-cols-1" : "lg:grid-cols-[1.5fr_1fr]"}`}>
          <div className="relative flex min-h-0 flex-col border-b border-line lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2">
                {live ? (
                  <div role="group" aria-label={p.device.label} className="flex gap-2">
                    <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} className={`${toggle} ${device === "desktop" ? on : off}`}><Monitor size={14} aria-hidden />{p.device.desktop}</button>
                    <button type="button" aria-pressed={device === "tablet"} onClick={() => setDevice("tablet")} className={`${toggle} ${device === "tablet" ? on : off}`}><Tablet size={14} aria-hidden />{p.device.tablet}</button>
                    <button type="button" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} className={`${toggle} ${device === "mobile" ? on : off}`}><Smartphone size={14} aria-hidden />{p.device.mobile}</button>
                  </div>
                ) : !reduce && (
                  <button type="button" aria-pressed={tilt} onClick={() => setTilt((v) => !v)} className={`${toggle} ${tilt ? on : off}`}><Box size={14} aria-hidden />{p.tilt}</button>
                )}
              </div>
              {live && (
                <button type="button" aria-pressed={fullscreen} onClick={() => setFullscreen((v) => !v)} aria-label={fullscreen ? p.exitFullscreen : p.fullscreen} className={`${toggle} ${off}`}>
                  {fullscreen ? <Minimize2 size={14} aria-hidden /> : <Maximize2 size={14} aria-hidden />}{fullscreen ? p.exitFullscreen : p.fullscreen}
                </button>
              )}
            </div>

            {live ? (
              <div className={`relative flex-1 p-4 sm:p-6 ${fullscreen ? "" : "h-[26rem] sm:h-[32rem] lg:h-[36rem]"}`}>
                <div className={`relative mx-auto h-full overflow-hidden rounded-xl border border-line bg-bg transition-[max-width] duration-300 ${frameWidth}`}>
                  {!loaded && (
                    <div className="absolute inset-0 z-10 grid place-items-center gap-2 bg-surface">
                      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" aria-hidden />
                      <p className="font-mono text-[0.68rem] text-ink-muted">{p.loadingPreview}</p>
                    </div>
                  )}
                  <iframe key={project.id} src={demoHref ?? undefined} title={`${r.title} — ${p.livePreview}`}
                    onLoad={() => setLoaded(true)} loading="eager" className="h-full w-full border-0 bg-bg"
                    sandbox="allow-scripts allow-same-origin allow-forms" />
                </div>
                <p className="mt-2 text-center font-mono text-[0.65rem] text-ink-muted">{p.livePreview}</p>
              </div>
            ) : (
              <>
                <div className="relative h-[22rem] p-4 sm:h-[28rem] sm:p-8 lg:h-[34rem]">
                  <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(121,88,255,0.2),transparent_65%)]" aria-hidden />
                  <TiltStage enabled={tiltOn}>
                    <div className="relative mx-auto h-full max-w-full transition-[max-width] duration-300">
                      <ProjectVisual key={project.id} project={project} />
                    </div>
                  </TiltStage>
                </div>
                {tiltOn && <p className="px-4 pb-4 font-mono text-[0.68rem] text-ink-muted sm:px-6">{p.tiltHint}</p>}
              </>
            )}
          </div>

          {!fullscreen && (
          <div className="flex flex-col gap-5 p-5 sm:p-8 lg:overflow-y-auto">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="px-2.5 py-1 text-[0.68rem]">{project.kind === "concept" ? p.kinds[project.label] : p.kinds.case}</Badge>
              {comingSoon && <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-ink-muted"><Clock size={12} aria-hidden />{p.comingSoon}</span>}
            </div>
            {r.type && <p className="-mb-3 font-mono text-xs tracking-wide" style={{ color: project.accent }}>{r.type}</p>}
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{r.title}</h2>
            <p className="text-sm leading-relaxed text-ink-muted">{r.summary}</p>
            {r.highlights.length > 0 && (
              <div>
                <h3 className="mb-3 font-mono text-xs tracking-[0.12em] text-secondary">{p.highlightsLabel}</h3>
                <ul className="space-y-2">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-ink"><Check size={15} className="mt-0.5 shrink-0 text-secondary" aria-hidden />{h}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.kind === "case" && (r.role || project.year) && (
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {r.role && <div><dt className="font-mono text-xs text-ink-muted">{p.roleLabel}</dt><dd>{r.role}</dd></div>}
                {project.year && <div><dt className="font-mono text-xs text-ink-muted">{p.yearLabel}</dt><dd>{project.year}</dd></div>}
              </dl>
            )}
            <div>
              <h3 className="mb-3 font-mono text-xs tracking-[0.12em] text-secondary">{p.stackLabel}</h3>
              <ul className="flex flex-wrap gap-1.5">{project.stack.map((s) => <li key={s}><Badge className="px-2.5 py-1 text-[0.68rem]">{s}</Badge></li>)}</ul>
            </div>
            {project.kind === "concept" && <p className="font-mono text-[0.68rem] leading-relaxed text-ink-muted">{p.conceptNote}</p>}
            <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              {demoHref && <Button href={demoHref} size="md">{p.openDemo}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden /></Button>}
              {project.kind === "case" && project.links?.live && (
                <Button href={project.links.live} target="_blank" rel="noopener noreferrer" variant="secondary" size="md">{p.live}<ExternalLink size={14} aria-hidden /></Button>
              )}
              {project.kind === "case" && project.links?.repo && (
                <Button href={project.links.repo} target="_blank" rel="noopener noreferrer" variant="secondary" size="md">{p.repo}<Code size={14} aria-hidden /></Button>
              )}
              <Button href="#contact" size="md" variant={demoHref ? "secondary" : "primary"} onClick={() => onClose(false)}>{p.discuss}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden /></Button>
            </div>
          </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
