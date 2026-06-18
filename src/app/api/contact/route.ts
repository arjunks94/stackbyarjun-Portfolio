import { NextResponse } from "next/server";

export const runtime = "edge";

interface ContactBody {
  name: string;
  email: string;
  message: string;
  turnstileToken?: string;
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });

  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, email, message, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const valid = await verifyTurnstile(turnstileToken);
      if (!valid) {
        return NextResponse.json({ error: "Captcha verification failed" }, { status: 403 });
      }
    }

    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, timestamp: new Date().toISOString() }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
