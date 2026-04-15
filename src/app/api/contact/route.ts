import fs from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const buckets = new Map<string, number[]>();

type EmailTemplateData = {
  name: string;
  email: string;
  eventDate: string;
  guests: string;
  messageHtml: string;
};

let renderEmailTemplate:
  | ((data: EmailTemplateData) => string)
  | null = null;

try {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "contact-enquiry.hbs",
  );
  const source = fs.readFileSync(templatePath, "utf8");
  renderEmailTemplate = Handlebars.compile<EmailTemplateData>(source);
} catch {
  renderEmailTemplate = null;
}

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

  const smtpHost = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpSecure =
    process.env.SMTP_SECURE === "true" ||
    (process.env.SMTP_SECURE ? false : smtpPort === 465);
  const smtpUser = process.env.SMTP_USER?.trim();
  // Gmail app passwords are often copied with spaces; strip them safely.
  const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const to = (process.env.CONTACT_TO_EMAIL ?? smtpUser)?.trim();
  const from = (process.env.CONTACT_FROM_EMAIL ?? smtpUser)?.trim();

  if (!smtpUser || !smtpPass || !to || !from) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Set at least SMTP_USER and SMTP_PASS.",
      },
      { status: 503 },
    );
  }

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
  const messageHtml = message
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
  const html =
    renderEmailTemplate?.({
      name: name.trim(),
      email: email.trim(),
      eventDate: eventDateStr,
      guests: guestsStr,
      messageHtml,
    }) ??
    [
      `<p><strong>Name:</strong> ${name.trim()}</p>`,
      `<p><strong>Email:</strong> ${email.trim()}</p>`,
      `<p><strong>Event date:</strong> ${eventDateStr}</p>`,
      `<p><strong>Guests:</strong> ${guestsStr}</p>`,
      "<hr/>",
      `<p>${messageHtml}</p>`,
    ].join("");

  const transport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const mail = {
    from,
    to,
    replyTo: email.trim(),
    subject: `Zero Trace inquiry from ${name.trim()}`,
    text,
    html,
  };

  // IMPORTANT: On serverless (Vercel), fire-and-forget can be terminated
  // when the function returns. Await sendMail there for reliability.
  const isVercelRuntime = Boolean(process.env.VERCEL);
  const allowAsyncLocal = process.env.CONTACT_EMAIL_ASYNC === "true";

  if (isVercelRuntime || !allowAsyncLocal) {
    try {
      const info = await transport.sendMail(mail);
      console.log("[contact] sendMail success:", info.messageId);
      return NextResponse.json({ ok: true, queued: false });
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Failed to send email.";
      console.error("[contact] sendMail failed:", messageText);
      return NextResponse.json({ error: messageText }, { status: 502 });
    }
  }

  // Optional local mode: async enqueue-like behavior.
  void transport.sendMail(mail).catch((error: unknown) => {
    const messageText =
      error instanceof Error ? error.message : "Failed to send email.";
    console.error("[contact] async sendMail failed:", messageText);
  });
  return NextResponse.json({ ok: true, queued: true });
}
