"use client";

import { ArrowRight, Heart } from "lucide-react";
import { useCoreAudio } from "../lib/use-core-audio";

export default function HomepageSponsors() {
  const { play } = useCoreAudio();

  return (
    <section
      id="sponsors"
      aria-label="Sponsors"
      className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-5 sm:px-8 lg:px-10 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] mb-3">
          <Heart className="h-3.5 w-3.5 text-red-500/80 fill-red-500/20" />
          <span>Sponsors</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-heading text-[var(--text-primary)] leading-[1.15]">
          Be the first to <br />
          support Serenity.
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] max-w-md leading-relaxed">
          Supporters will be featured here.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/sponsors/ayushmxxn"
            target="_blank"
            rel="noreferrer"
            onClick={() => play("tap")}
            className="group/btn relative inline-flex items-center gap-2 rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
          >
            <span>Become a sponsor</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
