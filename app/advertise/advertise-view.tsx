"use client";

import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import type { ProfileStatsData } from "../components/profile-stats";
import { TopSponsorStrip } from "../components/top-sponsor-strip";
import { TopStripNavRow } from "../components/top-strip-nav-row";
import { useCoreAudio } from "../lib/use-core-audio";

export default function AdvertiseView({
  stats,
}: {
  stats?: ProfileStatsData | null;
} = {}) {
  const { play } = useCoreAudio();

  const [productName, setProductName] = useState("");
  const [productPitch, setProductPitch] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    setErrorMessage(null);
    setIsSubmitting(true);
    play("tap");

    try {
      const endpoint =
        process.env.NEXT_PUBLIC_FORMSPREE_ADVERTISE_URL ||
        "https://formspree.io/f/mjyvaenr";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          productName: productName.trim() || "Serenity",
          description:
            productPitch.trim() || "Components that make the web feel alive",
          productUrl: productUrl.trim() || "https://serenity-ui.com",
          email: email.trim(),
          _subject: `New Serenity Top Strip Request: ${productName.trim() || "Serenity"}`,
        }),
      });

      if (response.ok) {
        play("success");
        setIsSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        const err =
          data?.errors?.[0]?.message ||
          "Submission failed. Please check your inputs.";
        setErrorMessage(err);
        play("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      play("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-orange-500 selection:text-white">
      {/* 1. Header: Live Serenity advertising strip + Back / Theme utility row */}
      <header className="w-full shrink-0 flex flex-col">
        <TopSponsorStrip
          product={{
            name: productName || "Serenity",
            description:
              productPitch || "Components that make the web feel alive",
            url: productUrl || "https://serenity-ui.com",
          }}
          className="w-full"
        />
        <TopStripNavRow />
      </header>

      {/* Hero Content Area with Form */}
      <main className="relative flex-1 w-full flex flex-col items-center justify-center min-h-[calc(100svh-98px)] sm:min-h-[calc(100vh-98px)] py-8 sm:py-10 md:py-14 px-4 sm:px-6 text-center overflow-x-hidden">
        {/* Subtle technical background grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden flex items-center justify-center"
        >
          <svg
            className="h-full w-full stroke-[var(--card-border)]/40 dark:stroke-white/[0.04] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_20%,transparent_100%)]"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="serenity-tech-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
                <circle
                  cx="0"
                  cy="0"
                  r="1"
                  className="fill-[var(--text-muted)]/20 dark:fill-white/[0.08]"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#serenity-tech-pattern)"
            />
          </svg>
        </div>

        {/* Bottom-left Corner Illustration (Hidden on mobile phones, displayed on all other devices) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-0 select-none z-0 overflow-hidden leading-none m-0 p-0 hidden sm:block will-change-[opacity,transform] transition-all duration-500 ease-out ${
            isScrolled
              ? "opacity-0 translate-y-6 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          {/* Light Mode: Soft warm-gray rock with gentle warm-orange rim */}
          <img
            src="/images/serenity-corner-illustration-light.png?v=4"
            alt=""
            width={664}
            height={413}
            className="block dark:hidden w-[240px] md:w-[300px] lg:w-[360px] xl:w-[420px] h-auto object-contain object-bottom-left opacity-80 sm:opacity-90 transition-opacity"
          />
          {/* Dark Mode: Pure black rock with glowing warm-orange rim */}
          <img
            src="/images/serenity-corner-illustration.png?v=4"
            alt=""
            width={664}
            height={413}
            className="hidden dark:block w-[240px] md:w-[300px] lg:w-[360px] xl:w-[420px] h-auto object-contain object-bottom-left opacity-90 sm:opacity-100 transition-opacity"
          />
        </div>

        {/* Bottom-right Corner Illustration (Mirrored, hidden on mobile phones, displayed on all other devices) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 right-0 select-none z-0 overflow-hidden leading-none m-0 p-0 hidden sm:block will-change-[opacity,transform] transition-all duration-500 ease-out ${
            isScrolled
              ? "opacity-0 translate-y-6 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          {/* Light Mode: Soft warm-gray rock with gentle warm-orange rim */}
          <img
            src="/images/serenity-corner-illustration-light.png?v=4"
            alt=""
            width={664}
            height={413}
            className="block dark:hidden w-[240px] md:w-[300px] lg:w-[360px] xl:w-[420px] h-auto object-contain object-bottom-right scale-x-[-1] opacity-80 sm:opacity-90 transition-opacity"
          />
          {/* Dark Mode: Pure black rock with glowing warm-orange rim */}
          <img
            src="/images/serenity-corner-illustration.png?v=4"
            alt=""
            width={664}
            height={413}
            className="hidden dark:block w-[240px] md:w-[300px] lg:w-[360px] xl:w-[420px] h-auto object-contain object-bottom-right scale-x-[-1] opacity-90 sm:opacity-100 transition-opacity"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-lg w-full flex flex-col items-center">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-heading text-[var(--text-primary)] leading-[1.15] max-w-xl">
            Feature your product <br /> on Serenity.
          </h1>

          {/* Formspree Submission Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-10 flex flex-col items-center gap-2.5 sm:gap-3 w-full max-w-lg px-2 sm:px-0"
          >
            {/* Row 1: Product Name + Product URL side by side */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
              {/* Product Name */}
              <div className="w-full flex flex-col text-left">
                <label
                  htmlFor="productName"
                  className="text-xs font-medium text-[var(--text-muted)] mb-1.5 pl-1"
                >
                  Product name
                </label>
                <input
                  id="productName"
                  type="text"
                  name="productName"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Serenity"
                  maxLength={32}
                  className="w-full rounded-2xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] py-3 px-3 sm:px-5 text-[13px] sm:text-sm text-[var(--pill-text)] placeholder-[var(--text-muted)] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] disabled:opacity-60 transition-all"
                />
              </div>

              {/* Product URL */}
              <div className="w-full flex flex-col text-left">
                <label
                  htmlFor="productUrl"
                  className="text-xs font-medium text-[var(--text-muted)] mb-1.5 pl-1"
                >
                  Product URL
                </label>
                <input
                  id="productUrl"
                  type="text"
                  name="productUrl"
                  required
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://serenity-ui.com"
                  className="w-full rounded-2xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] py-3 px-3 sm:px-5 text-[13px] sm:text-sm text-[var(--pill-text)] placeholder-[var(--text-muted)] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] disabled:opacity-60 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Short Description (full width) */}
            <div className="w-full flex flex-col text-left">
              <label
                htmlFor="productPitch"
                className="text-xs font-medium text-[var(--text-muted)] mb-1.5 pl-1"
              >
                Short description
              </label>
              <input
                id="productPitch"
                type="text"
                name="description"
                value={productPitch}
                onChange={(e) => setProductPitch(e.target.value)}
                placeholder="Components that make the web feel alive"
                maxLength={60}
                className="w-full rounded-2xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] py-3 px-5 text-sm text-[var(--pill-text)] placeholder-[var(--text-muted)] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] disabled:opacity-60 transition-all"
              />
            </div>

            {/* Row 3: Email + CTA arranged efficiently */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
              {/* Email */}
              <div className="flex-1 flex flex-col text-left">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-[var(--text-muted)] mb-1.5 pl-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-2xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] py-3 px-5 text-sm text-[var(--pill-text)] placeholder-[var(--text-muted)] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] disabled:opacity-60 transition-all"
                />
              </div>

              {/* CTA or Subtle Inline Confirmation */}
              <div className="shrink-0 flex items-center justify-center mt-3 sm:mt-0">
                {!isSubmitted ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full sm:w-auto sm:flex-none items-center justify-center rounded-2xl bg-gradient-to-b from-[#FF6B35] via-[#FF5A1F] to-[#EA4E15] border border-[#ff7b47]/40 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.15),0_2px_8px_rgba(255,90,31,0.25),0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-200 enabled:hover:from-[#ff7542] enabled:hover:via-[#ff6329] enabled:hover:to-[#f0531a] enabled:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_16px_rgba(255,90,31,0.35),0_2px_4px_rgba(0,0,0,0.25)] enabled:active:scale-[0.98] enabled:active:from-[#f0531a] enabled:active:to-[#db430d] enabled:active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed enabled:cursor-pointer touch-manipulation whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Request the spot</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </button>
                ) : (
                  <div className="flex w-full sm:w-auto items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-6 py-3 text-sm font-medium gap-2 animate-in fade-in duration-300">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>Got it. I&apos;ll get back to you soon.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Availability pill below CTA */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--card-border)]/60 bg-[var(--card-bg)]/50 px-3 py-1 text-[11px] sm:text-xs font-medium text-[var(--text-muted)] mt-1 max-w-full">
              <span className="font-semibold text-orange-500">$99</span>
              <span className="text-[var(--text-muted)]/40">·</span>
              <span className="truncate">One product · 30 days · One spot</span>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-400 mt-1 font-medium text-center w-full">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </main>

      {/* 3. Homepage Footer */}
      <Footer stats={stats} className="" />
    </div>
  );
}
