import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--bg-primary)] px-4 py-16 text-center text-[var(--text-primary)]">
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span className="font-mono text-sm font-semibold tracking-wider text-[var(--text-muted)] uppercase">
          404 Error
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
          Sorry, the component or page you are looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-[var(--text-primary)] px-4 text-xs font-semibold text-[var(--bg-primary)] shadow-sm transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
          <Link
            href="/components"
            className="inline-flex h-9 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--card-hover)]"
          >
            Browse Components
          </Link>
        </div>
      </div>
    </main>
  );
}
