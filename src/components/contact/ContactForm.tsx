"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  CONTACT,
  contactHref,
  ESTIMATOR_APPLY_EVENT,
  SERVICE_IDS,
  type EstimatorApplyDetail,
  type ServiceId,
} from "@/lib/contact";
import { ContactButtons } from "./ContactButtons";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t } = useLanguage();
  const f = t.contact.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState<ServiceId | "">("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");
  const mountedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill from the Project Estimator's "Request a Custom Quote" CTA without losing anything typed.
  useEffect(() => {
    const onApply = (e: Event) => {
      const { service: svc, summary } = (e as CustomEvent<EstimatorApplyDetail>).detail;
      setService(svc);
      setMessage((prev) => (prev ? `${prev}\n\n${summary}` : summary));
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(ESTIMATOR_APPLY_EVENT, onApply);
    return () => window.removeEventListener(ESTIMATOR_APPLY_EVENT, onApply);
  }, []);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = f.required;
    if (!email.trim()) next.email = f.required;
    else if (!EMAIL_RE.test(email.trim())) next.email = f.invalidEmail;
    if (!message.trim()) next.message = f.required;
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setErrorDetail(f.errorValidation);
      return;
    }
    // Soft anti-spam: a human takes a moment to fill a form out.
    if (Date.now() - mountedAt.current < 1500 || honeypot.trim() !== "") {
      setStatus("success"); // behave normally; silently drop
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          service,
          budget,
          message,
          company_website: honeypot,
        }),
      });
      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (res.status === 429) {
        setStatus("error");
        setErrorDetail(f.errorRateLimit);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErrorDetail(f.errorGeneric);
        return;
      }
      setStatus("success");
      setName(""); setEmail(""); setCompany(""); setService(""); setBudget(""); setMessage("");
    } catch {
      setStatus("error");
      setErrorDetail(f.errorGeneric);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.05]";
  const labelCls = "mb-1.5 block font-mono text-xs tracking-wide text-ink-muted";
  const errorCls = "mt-1.5 text-xs text-red-400";

  if (status === "unconfigured") {
    return (
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
          <div>
            <p className="font-display text-lg font-semibold">{f.unconfiguredTitle}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{f.unconfiguredDesc}</p>
          </div>
        </div>
        <div className="mt-6">
          <ContactButtons />
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="glass flex items-start gap-3 rounded-2xl p-6 sm:p-8" role="status">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden />
        <p className="text-sm text-ink">{f.success}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="glass relative rounded-2xl p-6 sm:p-8">
      <h3 className="font-display text-lg font-semibold">{f.title}</h3>
      <p className="mt-1.5 text-sm text-ink-muted">{f.subtitle}</p>

      {/* Honeypot — hidden from sighted users, never filled by humans */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="company_website">{f.honeypot}</label>
        <input
          id="company_website" name="company_website" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>{f.name}</label>
          <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} autoComplete="name" />
          {errors.name && <p id="name-error" className={errorCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>{f.email}</label>
          <input id="email" type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} autoComplete="email" />
          {errors.email && <p id="email-error" className={errorCls}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className={labelCls}>{f.company} <span className="text-ink-muted/60">{f.companyOptional}</span></label>
          <input id="company" className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>{f.service}</label>
          <select id="service" className={inputCls} value={service} onChange={(e) => setService(e.target.value as ServiceId | "")}>
            <option value="">{f.servicePlaceholder}</option>
            {SERVICE_IDS.map((id) => (
              <option key={id} value={id}>{t.services.cards[id].title}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className={labelCls}>{f.budget}</label>
          <select id="budget" className={inputCls} value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">{f.budgetPlaceholder}</option>
            {f.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>{f.message}</label>
          <textarea id="message" rows={5} className={`${inputCls} resize-y`} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder={f.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <p id="message-error" className={errorCls}>{errors.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} className="shrink-0" aria-hidden /> {errorDetail}
        </motion.p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-medium text-white transition-all duration-300 hover:bg-primary-soft hover:shadow-glow active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <><Loader2 size={16} className="animate-spin" aria-hidden /> {f.submitting}</>
          ) : (
            <>{f.submit} <Send size={15} aria-hidden /></>
          )}
        </button>
        <p className="font-mono text-[0.68rem] leading-relaxed text-ink-muted">{f.privacy}</p>
      </div>

      {!CONTACT.email && process.env.NODE_ENV !== "production" && (
        <p className="mt-4 font-mono text-[0.68rem] text-ink-muted">
          Dev note: set CONTACT_FORM_WEBHOOK_URL (and optional CONTACT_FORM_WEBHOOK_TOKEN) in the server environment to enable real delivery.
        </p>
      )}
      <a href={contactHref} className="sr-only">{CONTACT.email}</a>
    </form>
  );
}
