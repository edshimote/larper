import { NextRequest, NextResponse } from "next/server";
import { CONTACT, SERVICE_IDS } from "@/lib/contact";

// In-memory rate limit: 1 submission per IP per 30s window. Resets on redeploy/cold start —
// acceptable as a lightweight first line of defense; not a durable store, no persistence intended.
const lastSubmission = new Map<string, number>();
const WINDOW_MS = 30_000;
const MAX_LEN = { name: 120, email: 160, company: 160, budget: 60, message: 4000 };

function sanitize(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, max);
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= MAX_LEN.email;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill. Any value here = bot.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success to the bot, do nothing
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const last = lastSubmission.get(ip);
  if (last && now - last < WINDOW_MS) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = sanitize(body.name, MAX_LEN.name);
  const email = sanitize(body.email, MAX_LEN.email);
  const company = sanitize(body.company, MAX_LEN.company);
  const service = sanitize(body.service, 40);
  const budget = sanitize(body.budget, MAX_LEN.budget);
  const message = sanitize(body.message, MAX_LEN.message);
  const estimatorSummary = sanitize(body.estimatorSummary, 2000);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (service && !SERVICE_IDS.includes(service as (typeof SERVICE_IDS)[number])) {
    return NextResponse.json({ ok: false, error: "invalid_service" }, { status: 400 });
  }

  // No form provider configured on the server: do NOT fake a success response.
  // Set CONTACT_FORM_WEBHOOK_URL (any endpoint accepting a JSON POST — e.g. a Formspree/Make/n8n
  // webhook) in the server environment to enable real delivery. Credentials stay server-side only.
  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_FORM_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_FORM_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        name,
        email,
        company: company || null,
        service: service || null,
        budget: budget || null,
        message,
        estimatorSummary: estimatorSummary || null,
        source: "eduardo.dev contact form",
        ownerEmail: CONTACT.email,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
  }

  lastSubmission.set(ip, now);
  return NextResponse.json({ ok: true });
}
