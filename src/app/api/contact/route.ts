import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const buckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const prev = buckets.get(ip) ?? [];
  const recent = prev.filter((t) => t > windowStart);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  buckets.set(ip, recent);
  return true;
}

function getIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const {
    name,
    email,
    eventDate,
    guests,
    body: message,
    website,
  } = body as Record<string, unknown>;

  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Zero Trace <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL, or use the mailto link.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const eventDateStr =
    typeof eventDate === "string" && eventDate ? eventDate : "—";
  const guestsStr = typeof guests === "string" && guests ? guests : "—";

  const text = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Event date: ${eventDateStr}`,
    `Guests: ${guestsStr}`,
    "",
    message.trim(),
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email.trim(),
    subject: `Zero Trace inquiry from ${name.trim()}`,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
