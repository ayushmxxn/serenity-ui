"use client";

import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCoreAudio } from "../lib/use-core-audio";

const emptySubscribe = () => () => {};

export function ThemeToggleIcon({
  isDark,
  ...props
}: React.SVGProps<SVGSVGElement> & { isDark?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
      className={`h-4 w-4 pointer-events-none transition-transform duration-200 ease-out ${
        isDark ? "rotate-0 scale-100" : "rotate-180 scale-95"
      }`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 18" />
      <path d="M12 9l4.65 -4.65" />
      <path d="M12 14.3l7.37 -7.37" />
      <path d="M12 19.6l8.85 -8.85" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

interface SerenityNotchNavbarProps {
  currentTab?: "advertise" | "sponsors";
}

export function SerenityNotchNavbar({ currentTab }: SerenityNotchNavbarProps) {
  const { play } = useCoreAudio();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    play("tap");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full pointer-events-none px-4 sm:px-8">
      {/* Central Notch Navbar Container */}
      <div className="relative pointer-events-auto mx-auto flex items-center justify-between w-full max-w-[370px] sm:max-w-[420px] h-12 px-3 py-1.5 isolate">
        {/* Top Notch Seamless Background Plate with Inverted Shoulder Ears */}
        <div className="pointer-events-none absolute -inset-x-[18px] top-0 h-full -z-10 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.05)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
          {/* Left Inverted Notch Ear Cap */}
          <div className="absolute left-0 top-0 h-full w-[39px] overflow-visible">
            <svg
              viewBox="0 0 38 48"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <path
                d="M 0 0 A 18 18 0 0 1 18 18 L 18 28 A 20 20 0 0 0 38 48 L 39 48 L 39 0 L 0 0 Z"
                className="fill-[var(--bg-primary)] dark:fill-[#121214]"
              />
              <path
                d="M 0 0 A 18 18 0 0 1 18 18 L 18 28 A 20 20 0 0 0 38 48"
                fill="none"
                stroke="var(--card-border)"
                strokeWidth="1"
                className="dark:stroke-white/[0.12]"
              />
            </svg>
          </div>

          {/* Middle Body */}
          <div className="absolute left-[36px] right-[36px] top-0 h-full bg-[var(--bg-primary)] dark:bg-[#121214] border-b border-[var(--card-border)] dark:border-white/[0.12]" />

          {/* Right Inverted Notch Ear Cap */}
          <div className="absolute right-0 top-0 h-full w-[39px] overflow-visible">
            <svg
              viewBox="0 0 38 48"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <path
                d="M 0 48 A 20 20 0 0 0 20 28 L 20 18 A 18 18 0 0 1 38 0 L -1 0 L -1 48 Z"
                className="fill-[var(--bg-primary)] dark:fill-[#121214]"
              />
              <path
                d="M 0 48 A 20 20 0 0 0 20 28 L 20 18 A 18 18 0 0 1 38 0"
                fill="none"
                stroke="var(--card-border)"
                strokeWidth="1"
                className="dark:stroke-white/[0.12]"
              />
            </svg>
          </div>
        </div>

        {/* Left: Back to Home Link */}
        <div className="flex shrink-0 items-center justify-start">
          <Link
            href="/"
            onClick={() => play("tap")}
            aria-label="Back to Home"
            className="group/back relative flex shrink-0 items-center justify-center h-8.5 w-8.5 rounded-xl font-medium text-[var(--text-primary)] bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover/back:-translate-x-0.5" />
          </Link>
        </div>

        {/* Center: Serenity UI Brand Title & Active Route */}
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-tight font-heading text-[var(--text-primary)]">
          <Link
            href="/"
            onClick={() => play("tap")}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            Serenity
          </Link>
          <span className="text-[var(--text-muted)]/40">/</span>
          <span className="text-[var(--text-primary)] font-bold capitalize">
            {currentTab || "Experience"}
          </span>
        </div>

        {/* Right: Controls (GitHub & Theme Toggle) */}
        <div className="flex shrink-0 items-center justify-end gap-1.5">
          <a
            href="https://github.com/ayushmxxn/serenity-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            onClick={() => play("tap")}
            className="group/btn relative flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--pill-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
          >
            <div className="h-4 w-4 shrink-0">
              <GithubIcon />
            </div>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
          >
            <ThemeToggleIcon isDark={isDark} />
          </button>
        </div>
      </div>
    </header>
  );
}
