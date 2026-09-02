"use client";

import { useCoreAudio } from "../lib/use-core-audio";
import FooterGlow from "./footer-glow";
import { ProfileStatsData, ProfileStatsTrigger } from "./profile-stats";

interface FooterProps {
  stats?: ProfileStatsData | null;
}

export default function Footer({ stats }: FooterProps) {
  const { play } = useCoreAudio();

  return (
    <footer className="relative overflow-visible bg-[var(--bg-primary)] text-[var(--text-primary)] [content-visibility:auto] [contain-intrinsic-size:auto_500px]">
      <FooterGlow />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 sm:pt-36 md:pt-48 pb-16 sm:pb-24 flex flex-col items-center justify-center text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] font-heading mb-10 sm:mb-14">
          That&apos;s all for now.
        </h2>

        {/* Nav Links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-medium text-[var(--text-muted)] mb-10 sm:mb-14"
        >
          <a
            href="https://github.com/ayushmxxn"
            target="_blank"
            rel="noreferrer"
            onClick={() => play("tap")}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://discord.com/invite/kzk6uWey3g"
            target="_blank"
            rel="noreferrer"
            onClick={() => play("tap")}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Discord
          </a>
          <a
            href="https://x.com/ayushmxxn"
            target="_blank"
            rel="noreferrer"
            onClick={() => play("tap")}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Twitter / X
          </a>
        </nav>

        {/* 21st.dev Stats (Views & Bookmarks) */}
        <div className="mb-14 sm:mb-20 flex justify-center">
          <ProfileStatsTrigger
            views={stats?.views || "1.2M"}
            bookmarks={stats?.bookmarks || "8.3K"}
            align="center"
            showCard={false}
          />
        </div>

        {/* Bottom Attribution */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            Made by
            <a
              href="https://ayushmxxn.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => play("tap")}
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-primary)] hover:underline"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github.com/ayushmxxn.png?size=48"
                alt="Ayushmaan"
                width={20}
                height={20}
                loading="lazy"
                decoding="async"
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-[6px] object-cover border border-white/15 shadow-sm"
              />
              Ayushmaan
            </a>
          </span>
          <span className="text-[var(--text-muted)]/40 select-none">·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
