"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function RootErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-fatal client error details for diagnostics
    console.error("App boundary error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--bg-primary)] px-4 py-16 text-center text-[var(--text-primary)]">
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span className="font-mono text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase">
          Application Error
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
          An unexpected error occurred while rendering this view. You can try refreshing or returning to the home page.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-[var(--text-primary)] px-4 text-xs font-semibold text-[var(--bg-primary)] shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--card-hover)]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
