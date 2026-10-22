"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, SendHorizontal } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { BOTS, CHAT_ICON } from "./data";

/**
 * Session/conversation viewer: pick a bot, replay a sample conversation, and send a demo message that
 * always gets a predefined reply. Entirely client-side — nothing is sent to a real chat platform.
 */
export function NexusChat() {
  const { t } = useLanguage();
  const c = t.demos.nexus.chat;
  const botNames = t.demos.nexus.bots.items.map((item) => item.name);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(c.msgs.length);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [extra, setExtra] = useState<{ bot: boolean; text: string }[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [shown, extra, typing]);

  const replay = () => {
    setExtra([]);
    setShown(0);
    let at = 300;
    c.msgs.forEach((_, i) => {
      window.setTimeout(() => setShown(i + 1), (at += 450));
    });
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setExtra((prev) => [...prev, { bot: false, text }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setExtra((prev) => [...prev, { bot: true, text: c.msgs[c.msgs.length - 1]?.text ?? "" }]);
    }, 900);
  };

  const CIcon = CHAT_ICON;

  return (
    <section id="chat" aria-labelledby="nx-chat-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#22D3EE]">{c.eyebrow}</p>
          <h2 id="nx-chat-title" className="mt-4 font-[family-name:var(--font-space-mono)] text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">{c.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{c.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0F2A30]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
            <label className="flex items-center gap-2 text-sm text-[#94A3B8]">
              {c.selectLabel}
              <select
                value={active}
                onChange={(e) => { setActive(Number(e.target.value)); replay(); }}
                className="rounded-full border border-white/15 bg-[#0B2227] px-3 py-1.5 text-sm text-[#F8FAFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22D3EE]"
              >
                {BOTS.map((_, i) => <option key={i} value={i}>{botNames[i]}</option>)}
              </select>
            </label>
            <button type="button" onClick={replay} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-[#F8FAFC] transition-colors hover:border-[#22D3EE] hover:text-[#22D3EE]">
              <RotateCcw size={12} aria-hidden />{c.replay}
            </button>
          </div>

          <div className="flex h-[22rem] flex-col gap-2.5 overflow-y-auto p-5" aria-live="polite">
            <div className="mb-1 flex items-center gap-2 text-xs text-[#94A3B8]">
              <CIcon size={14} className="text-[#22D3EE]" aria-hidden />{botNames[active]}
            </div>
            {c.msgs.slice(0, shown).map((m, i) => (
              <motion.p key={`s-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${m.bot ? "self-start rounded-bl-sm bg-white/[0.06] text-[#F8FAFC]" : "self-end rounded-br-sm bg-[#22D3EE] text-[#052a30]"}`}>
                {m.text}
              </motion.p>
            ))}
            {extra.map((m, i) => (
              <motion.p key={`e-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${m.bot ? "self-start rounded-bl-sm bg-white/[0.06] text-[#F8FAFC]" : "self-end rounded-br-sm bg-[#22D3EE] text-[#052a30]"}`}>
                {m.text}
              </motion.p>
            ))}
            {typing && (
              <span className="flex w-14 gap-1 self-start rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3" aria-hidden>
                {[0, 1, 2].map((d) => <i key={d} style={{ animationDelay: `${d * 150}ms` }} className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#94A3B8]" />)}
              </span>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={c.placeholder}
              className="flex-1 rounded-full border border-white/10 bg-[#0B2227] px-4 py-2 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22D3EE]"
            />
            <button type="submit" aria-label={c.send} className="grid h-9 w-9 place-items-center rounded-full bg-[#22D3EE] text-[#052a30] transition-colors hover:bg-[#5fe6f5]">
              <SendHorizontal size={15} aria-hidden />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
