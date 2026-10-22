import type { ReactNode } from "react";
import { createElement as h, Fragment } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { CONCEPTS, resolveProject, projectHref, hasDemo } from "@/lib/projects";
import { CONTACT, contactHref, whatsappHref } from "@/lib/contact";
import { OutBlock, OutLine, OutList, OutRow } from "./Output";
import { DemoRun } from "./DemoRun";
import type { ThemeId } from "./types";

export type TerminalCtx = {
  t: Dictionary;
  locale: Locale;
  theme: ThemeId;
  reducedMotion: boolean;
  cycleTheme: () => ThemeId;
  openProject: (href: string) => void;
  scrollTo: (id: string) => void;
};

export type RunResult = { kind: "output"; node: ReactNode } | { kind: "clear" };

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

function findProject(query: string, locale: Locale) {
  const q = slug(query);
  if (!q) return null;
  return (
    CONCEPTS.find((c) => slug(c.id) === q) ??
    CONCEPTS.find((c) => slug(c.id).startsWith(q)) ??
    CONCEPTS.find((c) => {
      // match against the localized title as well (e.g. "open vanta store")
      return slug(c.id).includes(q);
    }) ??
    null
  );
}

export function runCommand(raw: string, ctx: TerminalCtx): RunResult {
  const { t, locale } = ctx;
  const trimmed = raw.trim();
  const [cmdRaw, ...rest] = trimmed.split(/\s+/);
  const cmd = (cmdRaw ?? "").toLowerCase();
  const arg = rest.join(" ");

  switch (cmd) {
    case "": {
      return { kind: "output", node: null };
    }

    case "help": {
      const tt = t.terminal.help;
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          h(OutList, { items: tt.items.map((it) => h(Fragment, null, h("span", { className: "text-ink" }, it.cmd), h("span", { className: "text-ink-muted" }, "  — " + it.desc))) }),
          h(OutLine, { variant: "muted" }, tt.tip),
        ),
      };
    }

    case "about": {
      const tt = t.terminal.about;
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          ...tt.lines.map((l) => h(OutLine, { key: l }, l)),
        ),
      };
    }

    case "whoami": {
      const tt = t.terminal.whoami;
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          ...tt.lines.map((l) => h(OutLine, { key: l, variant: "muted" }, l)),
        ),
      };
    }

    case "skills": {
      const tt = t.terminal.skills;
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          ...tt.categories.map((cat) =>
            h(Fragment, { key: cat.title },
              h(OutLine, null, cat.title + ":"),
              h(OutList, { items: cat.items.map((i) => h("span", { key: i, className: "text-ink-muted" }, i)) }),
            ),
          ),
        ),
      };
    }

    case "projects": {
      const tt = t.terminal.projectsCmd;
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          h(OutList, {
            items: CONCEPTS.map((c) => {
              const r = resolveProject(c, t, locale);
              const demo = hasDemo(c);
              return h(Fragment, { key: c.id },
                h("span", { className: "text-ink" }, r.title),
                h("span", { className: "text-ink-muted" }, ` (${c.id}) — ${r.type ?? ""} — `),
                demo
                  ? h("button", {
                      type: "button",
                      className: "underline underline-offset-2 text-[var(--term-accent2)] hover:text-ink",
                      onClick: () => ctx.openProject(projectHref(c) as string),
                    }, tt.openLabel + " →")
                  : h("span", { className: "italic text-ink-muted" }, tt.soon),
              );
            }),
          }),
          h(OutLine, { variant: "muted" }, tt.hint),
        ),
      };
    }

    case "open": {
      const tt = t.terminal.open;
      if (!arg) return { kind: "output", node: h(OutLine, { variant: "muted" }, tt.usage) };
      const project = findProject(arg, locale);
      if (!project) return { kind: "output", node: h(OutLine, { variant: "error" }, tt.notFound) };
      const href = projectHref(project);
      if (!href) return { kind: "output", node: h(OutLine, { variant: "muted" }, tt.comingSoon) };
      ctx.openProject(href);
      const r = resolveProject(project, t, locale);
      return { kind: "output", node: h(OutLine, { variant: "success" }, `${tt.opening} ${r.title} → ${href}`) };
    }

    case "services": {
      const cards = t.services.cards;
      const tt = t.terminal.services;
      ctx.scrollTo("services");
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          h(OutList, {
            items: Object.values(cards).map((c) => h(Fragment, { key: c.title }, h("span", { className: "text-ink" }, c.title), h("span", { className: "text-ink-muted" }, " — " + c.desc))),
          }),
          h(OutLine, { variant: "muted" }, tt.cta),
        ),
      };
    }

    case "contact": {
      const tt = t.terminal.contact;
      ctx.scrollTo("contact");
      if (!CONTACT.email && !CONTACT.phone) {
        return { kind: "output", node: h(OutLine, { variant: "muted" }, tt.unconfigured) };
      }
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "accent" }, tt.intro),
          CONTACT.email ? h(OutRow, { label: tt.email, value: h("a", { href: contactHref, className: "underline underline-offset-2 hover:text-[var(--term-accent2)]" }, CONTACT.email) }) : null,
          CONTACT.phoneDisplay && whatsappHref ? h(OutRow, { label: tt.whatsapp, value: h("a", { href: whatsappHref, target: "_blank", rel: "noreferrer", className: "underline underline-offset-2 hover:text-[var(--term-accent2)]" }, CONTACT.phoneDisplay) }) : null,
          h(OutLine, { variant: "muted" }, tt.cta),
        ),
      };
    }

    case "clear": {
      return { kind: "clear" };
    }

    case "theme": {
      const next = ctx.cycleTheme();
      return { kind: "output", node: h(OutLine, { variant: "success" }, `${t.terminal.theme.switched} ${t.terminal.theme.names[next]}`) };
    }

    case "date": {
      const now = new Date();
      const formatted = now.toLocaleString(locale === "pt" ? "pt-BR" : "en-US", { dateStyle: "full", timeStyle: "short" });
      return { kind: "output", node: h(OutLine, null, formatted) };
    }

    case "echo": {
      if (!arg) return { kind: "output", node: h(OutLine, { variant: "muted" }, t.terminal.echo.usage) };
      return { kind: "output", node: h(OutLine, null, arg) };
    }

    case "demo": {
      return { kind: "output", node: h(DemoRun, { t, reducedMotion: ctx.reducedMotion }) };
    }

    case "sudo": {
      return { kind: "output", node: h(OutLine, { variant: "muted" }, t.terminal.easterEgg) };
    }

    default: {
      const tt = t.terminal.unknown;
      return {
        kind: "output",
        node: h(OutBlock, null,
          h(OutLine, { variant: "error" }, `${tt.prefix} ${cmd}`),
          h(OutLine, { variant: "muted" }, tt.suggestion),
        ),
      };
    }
  }
}
