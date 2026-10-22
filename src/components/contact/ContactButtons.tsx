"use client";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CONTACT, contactHref, whatsappHref } from "@/lib/contact";

// Only renders buttons for channels the owner actually configured in src/lib/contact.ts —
// never invents a link. If nothing is configured, renders nothing (ContactForm still works).
export function ContactButtons() {
  const { t } = useLanguage();
  const c = t.contact.buttons;

  const items = [
    CONTACT.email && { key: "email", href: contactHref, label: c.email, Icon: Mail, external: false },
    whatsappHref && { key: "whatsapp", href: whatsappHref, label: c.whatsapp, Icon: MessageCircle, external: true },
    CONTACT.github && { key: "github", href: CONTACT.github, label: c.github, Icon: Github, external: true },
    CONTACT.linkedin && { key: "linkedin", href: CONTACT.linkedin, label: c.linkedin, Icon: Linkedin, external: true },
  ].filter(Boolean) as { key: string; href: string; label: string; Icon: typeof Mail; external: boolean }[];

  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {items.map(({ key, href, label, Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="glass inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-ink transition-colors hover:border-white/25 hover:bg-white/[0.07]"
          >
            <Icon size={16} aria-hidden />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
