"use client";

import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCoreAudio } from "../lib/use-core-audio";
import { ThemeToggleIcon } from "./serenity-notch-navbar";

const emptySubscribe = () => () => {};

export function TopStripNavRow() {
  const { play } = useCoreAudio();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const toggleTheme = () => {
    play("tap");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full flex items-center justify-between px-4 sm:px-8 py-3 pointer-events-none">
      <Link
        href="/"
        onClick={() => play("tap")}
        aria-label="Back to Home"
        className="pointer-events-auto group/back relative flex shrink-0 items-center justify-center h-8.5 w-8.5 rounded-xl font-medium text-[var(--text-primary)] bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover/back:-translate-x-0.5" />
      </Link>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="pointer-events-auto relative flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
      >
        <ThemeToggleIcon isDark={isDark} />
      </button>
    </div>
  );
}
