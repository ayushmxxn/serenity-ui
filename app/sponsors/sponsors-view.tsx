"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Heart, X } from "lucide-react";
import { useState } from "react";
import { TopSponsorStrip } from "../components/top-sponsor-strip";
import { TopStripNavRow } from "../components/top-strip-nav-row";
import Footer from "../components/footer";
import type { ProfileStatsData } from "../components/profile-stats";
import { useCoreAudio } from "../lib/use-core-audio";

export default function SponsorsView({
  stats,
}: {
  stats?: ProfileStatsData | null;
} = {}) {
  const { play } = useCoreAudio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live preview input state
  const [previewName, setPreviewName] = useState("Alex Rivers");

  const handleOpenModal = () => {
    play("tap");
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    play("tap");
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    play("success");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-orange-500 selection:text-white">
      {/* 1. Full-width live Serenity strip at the very top */}
      <TopSponsorStrip className="w-full" />

      {/* 2. Utility Row: Back button (left) and Dark/Light Mode button (right) */}
      <TopStripNavRow />

      {/* 3. One Hero Screen: Everything Important, Nothing Below */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-4 sm:py-6 text-center">
        <div className="mx-auto max-w-3xl w-full flex flex-col items-center">
          {/* Price & Cadence Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1 text-xs font-medium text-[var(--text-muted)] mb-3">
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500/20" />
            <span className="font-bold text-[var(--text-primary)]">$29 · one time</span>
            <span className="text-[var(--text-muted)]/40">·</span>
            <span>Featured on the homepage</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading text-[var(--text-primary)] leading-[1.1]">
            Support Serenity.
          </h1>

          {/* Short, Natural Copy */}
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            Serenity is free, open source, and built late into the night.
            Support the project once and have your name, avatar, or company featured on the homepage.
          </p>

          {/* Main Visual Element: Beautiful Preview of What Being a Sponsor Looks Like */}
          <div className="mt-5 sm:mt-6 w-full max-w-sm">
            <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Preview Header Chrome */}
              <div className="px-4 py-1.5 bg-[var(--pill-bg)] border-b border-[var(--card-border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span className="font-medium">Homepage sponsor preview</span>
                <span className="font-mono text-[10px]">serenity-ui.com#sponsors</span>
              </div>

              {/* The Sponsor Specimen Card */}
              <div className="p-5 sm:p-6 flex flex-col items-center justify-center text-center bg-[var(--bg-primary)]/50">
                <div className="relative mb-2.5">
                  <div className="h-11 w-11 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] flex items-center justify-center text-base font-bold font-heading text-orange-500 shadow-inner">
                    {previewName.trim().charAt(0).toUpperCase() || "S"}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20">
                    <Heart className="h-2 w-2 fill-current" />
                  </div>
                </div>

                <div className="text-base font-bold font-heading text-[var(--text-primary)]">
                  {previewName || "Your Name or Company"}
                </div>

                <div className="text-xs text-[var(--text-muted)] mt-0.5">
                  Serenity UI Sponsor
                </div>
              </div>

              {/* Inline interactive preview editor */}
              <div className="p-2.5 bg-[var(--pill-bg)]/60 border-t border-[var(--card-border)] flex items-center justify-center gap-2 text-xs">
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  Test your name:
                </span>
                <input
                  type="text"
                  value={previewName}
                  onChange={(e) => setPreviewName(e.target.value)}
                  maxLength={24}
                  placeholder="Your name or company"
                  className="rounded-lg border border-[var(--card-border)] bg-[var(--bg-primary)] px-2.5 py-0.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-orange-500 max-w-[170px] text-center"
                />
              </div>
            </div>
          </div>

          {/* One Clear CTA */}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={handleOpenModal}
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold shadow-md hover:opacity-90 transition-all active:scale-95 cursor-pointer"
            >
              <span>Request sponsorship · $29</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </main>

      {/* 3. Homepage Footer */}
      <Footer stats={stats} />

      {/* Sponsorship Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-[var(--bg-primary)] p-6 sm:p-7 shadow-2xl z-10"
            >
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-4 top-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {!isSubmitted ? (
                <div>
                  <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
                    Request sponsorship
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    $29 · one time · Featured on the homepage
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Name or company
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivers or Acme Studio"
                        className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Link (Twitter, GitHub, or Website)
                      </label>
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://x.com/alex"
                        className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Your email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] py-2.5 text-xs sm:text-sm font-semibold hover:opacity-90 transition-all cursor-pointer"
                      >
                        Submit request
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-[var(--text-muted)]">
                      We&apos;ll be in touch to confirm your details and send a separate payment request.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
                    Request received
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed">
                    We received your details. Ayushmaan will reach out to {email} shortly with payment instructions and placement confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--pill-hover)]"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
