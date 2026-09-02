"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Eye, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCoreAudio } from "../lib/use-core-audio";
import {
  getAllBlocks,
  getAllComponents,
  type RegistryEntry,
} from "../registry";
import { LiquidSegmentedSwitcher, type SwitcherTab } from "./liquid-switcher";
import { PACKAGE_MANAGERS } from "./package-managers";

// Cross-platform clipboard helper for mobile Safari & Mobile Chrome
export const safeCopy = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback
  }
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand("copy");
    document.body.removeChild(textArea);
    return result;
  } catch {
    return false;
  }
};

function LazyVideoPreview({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <video
        ref={videoRef}
        src={hasLoaded ? src : undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
}

export function ComponentCard({ item }: { item: RegistryEntry }) {
  const { play } = useCoreAudio();
  const [copiedType, setCopiedType] = useState<"cli" | "code" | null>(null);
  const [copiedPackageManager, setCopiedPackageManager] = useState<string | null>(null);
  const [isCliMenuOpen, setIsCliMenuOpen] = useState(false);
  const [hoveredPm, setHoveredPm] = useState<string | null>(null);
  const cliContainerRef = useRef<HTMLDivElement | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cliSlug =
    item.variants?.find((v) => v.id === item.defaultVariant)?.cliSlug ||
    item.variants?.[0]?.cliSlug ||
    item.slug;

  useEffect(() => {
    if (!isCliMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        cliContainerRef.current &&
        !cliContainerRef.current.contains(e.target as Node)
      ) {
        setIsCliMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCliMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCliMenuOpen]);

  const handleToggleCliMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    play("tap");
    setHoveredPm(null);
    setCopiedPackageManager(null);
    setIsCliMenuOpen((prev) => !prev);
  };

  const handleCopyPackageManager = async (
    e: React.MouseEvent,
    pmId: string,
    command: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    play("copy");
    setCopiedPackageManager(pmId);
    setCopiedType("cli");
    setIsCliMenuOpen(false);
    const success = await safeCopy(command);
    if (!success) {
      setCopiedPackageManager(null);
      setCopiedType(null);
      return;
    }
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedPackageManager(null);
      setCopiedType(null);
    }, 1800);
  };

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cardCode = item.code || item.variants?.[0]?.code || "";
    const success = await safeCopy(cardCode);
    if (success) {
      play("copy");
      setCopiedType("code");
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedType(null), 1800);
    }
  };

  const ComponentPreview = item.component;

  return (
    <div className="group relative flex flex-col">
      {/* Component Preview Container */}
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--pill-bg)] border border-[var(--card-border)] flex items-center justify-center transition-colors ${
          item.videoPreview ? "p-0" : "p-4"
        }`}
      >
        {/* Live component preview or video preview */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {item.videoPreview ? (
            <LazyVideoPreview src={item.videoPreview} />
          ) : (
            <ComponentPreview />
          )}
        </div>
      </div>

      {/* Component Name and 3 Action Options */}
      <div className="relative flex items-center justify-between px-0.5 pt-2.5">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold font-heading text-[var(--text-primary)] truncate pr-2">
          {item.name}
        </h3>

        {/* Action Buttons: Compact View All Components Pill Style */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* CLI Command Copy Button & Package Manager Popover */}
          <div ref={cliContainerRef} className="relative">
            <button
              onClick={handleToggleCliMenu}
              type="button"
              aria-label={`Copy CLI command for ${item.name}`}
              className={`group/btn relative flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--pill-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 touch-manipulation cursor-pointer active:scale-95 ${
                isCliMenuOpen ? "border-[var(--text-primary)]/30 dark:border-white/30" : ""
              }`}
            >
              {copiedType === "cli" ? (
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" />
              ) : (
                <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              )}
              {/* UI Tooltip */}
              <span
                className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.1] dark:bg-white dark:text-[#09090b] dark:border-black/[0.08] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-30 transition-all duration-200 ${
                  copiedType === "cli"
                    ? "opacity-100 translate-y-0"
                    : !isCliMenuOpen
                    ? "opacity-0 translate-y-1 group-hover/btn:opacity-100 group-hover/btn:translate-y-0"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {copiedType === "cli" ? "Paste in your terminal" : "CLI command"}
              </span>
            </button>

            {/* Compact Package Manager Popover */}
            <AnimatePresence>
              {isCliMenuOpen && (
                <motion.div
                  onMouseLeave={() => setHoveredPm(null)}
                  initial={{ opacity: 0, y: 6, scale: 0.94, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 4, scale: 0.94, filter: "blur(2px)" }}
                  transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.7 }}
                  className="absolute bottom-full mb-2 right-0 w-36 rounded-2xl bg-[var(--bg-primary)]/95 dark:bg-[#141417]/95 backdrop-blur-xl border border-[var(--card-border)] dark:border-white/[0.08] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.12),0_2px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_34px_-8px_rgba(0,0,0,0.7),0_2px_8px_-2px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] p-1 z-50 select-none"
                >
                  <div className="flex flex-col gap-0.5">
                    {PACKAGE_MANAGERS.map((pm) => {
                      const cmd = pm.getCommand(cliSlug);
                      const isCopied = copiedPackageManager === pm.id;
                      const Icon = pm.Icon;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={(e) => handleCopyPackageManager(e, pm.id, cmd)}
                          onMouseEnter={() => setHoveredPm(pm.id)}
                          className={`group/pm relative flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 ${
                            isCopied
                              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {hoveredPm === pm.id && !isCopied && (
                            <motion.div
                              layoutId={`card-pm-hover-${item.slug}`}
                              className="absolute inset-0 rounded-xl bg-[var(--pill-hover)] dark:bg-white/[0.09]"
                              transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                          )}

                          {isCopied && (
                            <motion.div
                              layoutId={`card-pm-hover-${item.slug}`}
                              className="absolute inset-0 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15"
                              transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                          )}

                          <span className="relative z-10 flex items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-black/[0.03] dark:bg-white/[0.06] p-0.5">
                              <Icon className="h-3.5 w-3.5 object-contain" />
                            </span>
                            <span className="text-[12px]">{pm.label}</span>
                          </span>

                          {isCopied && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              className="relative z-10 flex items-center text-emerald-500"
                            >
                              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                            </motion.span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Copy Code Button */}
          <button
            onClick={handleCopyCode}
            type="button"
            aria-label={`Copy source code for ${item.name}`}
            className="group/btn relative flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--pill-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 touch-manipulation cursor-pointer active:scale-95"
          >
            {copiedType === "code" ? (
              <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            )}
            {/* UI Tooltip */}
            <span
              className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.1] dark:bg-white dark:text-[#09090b] dark:border-black/[0.08] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-30 transition-all duration-200 ${
                copiedType === "code"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-1 group-hover/btn:opacity-100 group-hover/btn:translate-y-0"
              }`}
            >
              {copiedType === "code" ? "Paste in your project" : "Copy code"}
            </span>
          </button>

          {/* View Preview */}
          <Link
            href={
              item.type === "block"
                ? `/blocks/${item.slug}`
                : `/components/${item.slug}`
            }
            onClick={() => play("tap")}
            aria-label={`View ${item.type === "block" ? "block" : "component"} preview for ${item.name}`}
            className="group/btn relative flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--pill-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 touch-manipulation active:scale-95"
          >
            <Eye className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
            {/* UI Tooltip */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.1] dark:bg-white dark:text-[#09090b] dark:border-black/[0.08] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-30 opacity-0 translate-y-1 group-hover/btn:opacity-100 group-hover/btn:translate-y-0 transition-all duration-200">
              Preview
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ComponentGrid() {
  const { play } = useCoreAudio();
  const [activeTab, setActiveTab] = useState<SwitcherTab>("components");

  const components = getAllComponents();
  const blocks = getAllBlocks();

  const isBlocksTab = activeTab === "blocks";
  const displayedItems = isBlocksTab
    ? blocks
    : components.slice(0, 6);

  const totalCount = isBlocksTab ? blocks.length : components.length;
  const viewAllLabel = isBlocksTab
    ? "View All Blocks"
    : "View All Components";
  const viewAllHref = isBlocksTab ? "/blocks" : "/components";

  return (
    <section
      id="components"
      className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 py-16 sm:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header with Liquid Segmented Switcher & View All Button */}
        <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-4">
          <LiquidSegmentedSwitcher
            activeTab={activeTab}
            onChange={(tab) => {
              if (tab !== "templates") {
                setActiveTab(tab);
              }
            }}
          />

          <Link
            href={viewAllHref}
            onClick={() => play("tap")}
            aria-label={`${viewAllLabel} (${totalCount})`}
            className="group/btn relative hidden sm:inline-flex items-center gap-2 rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] px-3.5 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 active:scale-95 cursor-pointer"
          >
            <span>{viewAllLabel}</span>
            <span className="flex h-5 items-center justify-center rounded-full bg-[var(--text-primary)]/10 dark:bg-white/10 px-2 text-[11px] font-semibold tabular-nums text-[var(--text-primary)]">
              {totalCount}
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>

        {/* Dynamic Grid on Homepage (Components or Blocks) */}
        <div
          id={isBlocksTab ? "blocks-panel" : "components-panel"}
          role="tabpanel"
          aria-labelledby={isBlocksTab ? "tab-blocks" : "tab-components"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
        >
          {displayedItems.map((item) => (
            <ComponentCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Bottom Explore Link */}
        <div className="mt-12 flex items-center justify-start">
          <Link
            href={viewAllHref}
            onClick={() => play("tap")}
            aria-label={`${viewAllLabel} (${totalCount})`}
            className="group/btn relative inline-flex items-center gap-2 rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] px-3.5 py-2 text-xs sm:text-sm font-medium text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer"
          >
            <span>{viewAllLabel}</span>
            <span className="flex h-5 items-center justify-center rounded-full bg-[var(--text-primary)]/10 dark:bg-white/10 px-2 text-[11px] font-semibold tabular-nums text-[var(--text-primary)]">
              {totalCount}
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
