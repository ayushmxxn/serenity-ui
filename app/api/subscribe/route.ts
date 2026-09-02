import { NextResponse } from "next/server";

const DEFAULT_KIT_FORM_ID = "9850947";
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
      request.headers.get("cf-connecting-ip") ||
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
    const formId = process.env.KIT_FORM_ID?.trim() || DEFAULT_KIT_FORM_ID;

    if (!apiKey) {
      console.error("[Subscribe API] Server misconfiguration: KIT_API_KEY is not defined in environment.");
      return NextResponse.json(
        { success: false, error: "Subscription service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Step 1: Create or upsert subscriber in Kit v4 API
    const subscriberRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({ email_address: trimmedEmail }),
    });

    const subscriberResText = await subscriberRes.text();
    let subscriberData: { subscriber?: { id: number }; errors?: string[]; message?: string } | null = null;
    try {
      subscriberData = JSON.parse(subscriberResText);
    } catch {
      // Body is not JSON
    }

    console.log(`[Subscribe API] Kit /v4/subscribers response status: ${subscriberRes.status}`, {
      status: subscriberRes.status,
      body: subscriberData || subscriberResText,
    });

    if (!subscriberRes.ok) {
      const errorMsg =
        Array.isArray(subscriberData?.errors) && subscriberData.errors.length > 0
          ? subscriberData.errors.join(", ")
          : subscriberData?.message || "Failed to create subscriber.";

      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: subscriberRes.status >= 400 && subscriberRes.status < 500 ? subscriberRes.status : 500 }
      );
    }

    const subscriberId = subscriberData?.subscriber?.id;
    if (!subscriberId) {
      console.error("[Subscribe API] Kit /v4/subscribers returned 2xx without a subscriber ID.", subscriberData);
      return NextResponse.json(
        { success: false, error: "Unable to process subscriber record." },
        { status: 500 }
      );
    }

    // Step 2: Add subscriber to the form in Kit v4 API
    const formRes = await fetch(
      `https://api.kit.com/v4/forms/${formId}/subscribers/${subscriberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({}),
      }
    );

    const formResText = await formRes.text();
    let formData: { errors?: string[]; message?: string } | null = null;
    try {
      formData = JSON.parse(formResText);
    } catch {
      // Body is not JSON
    }

    console.log(`[Subscribe API] Kit /v4/forms/${formId}/subscribers/${subscriberId} response status: ${formRes.status}`, {
      status: formRes.status,
      body: formData || formResText,
    });

    if (!formRes.ok) {
      const errorMsg =
        Array.isArray(formData?.errors) && formData.errors.length > 0
          ? formData.errors.join(", ")
          : formData?.message || "Failed to add subscriber to newsletter form.";

      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: formRes.status >= 400 && formRes.status < 500 ? formRes.status : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You’re in!",
    });
  } catch (error) {
    console.error(
      "[Subscribe API] Unexpected error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
