import { NextResponse } from "next/server";

const KIT_FORM_ID = "9850947";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory sliding window rate limiter with auto-pruning
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function pruneRateLimits(now: number) {
  if (rateLimitMap.size > 200) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneRateLimits(now);

  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_COUNT) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    // Extract client IP address for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }
    const { email } = body;

    // Server-side email validation
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const apiKey = process.env.KIT_API_KEY?.trim();

    // Prepare payload for Kit form subscription
    const formData = new FormData();
    formData.append("email_address", trimmedEmail);
    if (apiKey) {
      formData.append("api_key", apiKey);
    }

    // Server-side fetch to Kit subscription endpoint (never exposing API key to client)
    const kitResponse = await fetch(
      `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(apiKey ? { "X-Kit-Api-Key": apiKey } : {}),
        },
        body: formData,
      }
    );

    if (!kitResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Subscription service unavailable. Please try again." },
        { status: 500 }
      );
    }

    const kitResult = await kitResponse.json();

    if (kitResult.status === "success" || kitResponse.status === 200) {
      return NextResponse.json({
        success: true,
        message: "You’re in!",
      });
    }

    return NextResponse.json(
      { success: false, error: "Unable to complete subscription. Please try again." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
