"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Code2, Copy, Terminal, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useCoreAudio } from "../../lib/use-core-audio";
import type { RegistryEntry } from "../../registry";
import { CodeHighlight } from "../code-highlight";
import { Laser } from "../effects/Laser";

const emptySubscribe = () => () => {};
const subscribeMobile = (callback: () => void) => {
  const mql = window.matchMedia("(max-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};
const getMobileSnapshot = () => window.matchMedia("(max-width: 768px)").matches;
const getMobileServerSnapshot = () => false;

function ThemeToggleIcon({
  isDark,
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement> & { isDark?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
      className={`h-4 w-4 pointer-events-none transition-transform duration-300 ease-out ${
        isDark ? "rotate-0 scale-100" : "rotate-180 scale-95"
      } ${className}`}
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

import { PACKAGE_MANAGERS } from "../package-managers";

const safeCopy = async (text: string): Promise<boolean> => {
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

export function ComponentPreviewView({ item }: { item: RegistryEntry }) {
  const router = useRouter();
  const { play } = useCoreAudio();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );
  const isDark = mounted ? (resolvedTheme || theme) === "dark" : false;

  const [activeVariant, setActiveVariant] = useState<string>(
    item.defaultVariant || item.variants?.[0]?.id || "voice",
  );

  const currentVariant = item.variants?.find((v) => v.id === activeVariant);
  const currentCode = currentVariant?.code || item.code || "";
  const currentCliSlug = currentVariant?.cliSlug || item.slug;

  const [copiedType, setCopiedType] = useState<
    "cli" | "code" | "modal-code" | null
  >(null);
  const [copiedPackageManager, setCopiedPackageManager] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<
    "back" | "code" | "cli" | "source" | "theme" | null
  >(null);
  const [hoveredPm, setHoveredPm] = useState<string | null>(null);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isCliMenuOpen, setIsCliMenuOpen] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cliMenuRef = useRef<HTMLDivElement | null>(null);
  const cliButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    play("tap");
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(item.type === "block" ? "/blocks" : "/components");
    }
  };

  const handleCopyPackageManager = async (pmId: string, command: string) => {
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
    }, 1400);
  };

  const handleCopyCode = async (type: "code" | "modal-code" = "code") => {
    play("copy");
    setCopiedType(type);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedType(null), 1300);
    const success = await safeCopy(currentCode);
    if (!success) {
      setCopiedType(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSourceOpen(false);
        setIsCliMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cliMenuRef.current &&
        !cliMenuRef.current.contains(e.target as Node) &&
        cliButtonRef.current &&
        !cliButtonRef.current.contains(e.target as Node)
      ) {
        setIsCliMenuOpen(false);
      }
    };
    if (isCliMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCliMenuOpen]);

  const Component = item.component;

  return (
    <div className="relative h-screen min-h-[100dvh] w-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] select-none">
      {/* Laser at the bottom on dark-mode */}
      {isDark && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 left-0 right-0 z-0 overflow-hidden"
          style={{
            height: isMobile ? 150 : 240,
          }}
        >
          <Laser
            speed={0.25}
            offset={0}
            thickness={isMobile ? 0.35 : 0.5}
            core={isMobile ? 0.4 : 0.55}
            radius={isMobile ? 14 : 24}
            glow={isMobile ? 0.55 : 0.85}
            wave={isMobile ? 1.5 : 2}
            width={1}
            flicker={0.65}
            reveal={isMobile ? 150 : 320}
            heat={isMobile ? 0.75 : 1.15}
            shimmer={isMobile ? 4 : 8}
            sparkle={isMobile ? 0.4 : 0.7}
            reactivity={0.8}
            color={[1, 0.3529, 0.1216]}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Laser>
        </div>
      )}

      {/* Fullscreen Live Component Canvas with background glassmorphism blur when modal is open */}
      <main
        className={`relative z-10 h-full w-full flex items-center justify-center p-4 sm:p-8 pb-20 sm:pb-24 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-all duration-300 ${
          isSourceOpen
            ? "blur-md sm:blur-lg scale-[0.99] opacity-60 pointer-events-none"
            : ""
        }`}
      >
        {item.slug === "3d-flip-card" && item.videoPreview ? (
          <div className="relative max-w-2xl w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--pill-bg)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <video
              src={item.videoPreview}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <Component
            activeVariant={activeVariant}
            onVariantChange={(val: string) => setActiveVariant(val)}
          />
        )}
      </main>

      {/* Fixed Bottom Notch Controls - Always visible at z-50 */}
      <motion.div
        onMouseLeave={() => setHoveredButton(null)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex h-12 items-center justify-center gap-0.5 sm:gap-1 px-3 sm:px-4 select-none isolate"
      >
        {/* Bottom Notch Seamless Background Plate with Inverted Shoulder Ears */}
        <div
          style={{ transform: "translateZ(0)" }}
          className="pointer-events-none absolute -inset-x-[18px] bottom-0 h-full -z-10 filter drop-shadow-[0_-4px_16px_rgba(0,0,0,0.05)] drop-shadow-[0_-1px_3px_rgba(0,0,0,0.04)] dark:drop-shadow-[0_-6px_20px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_-1px_4px_rgba(0,0,0,0.3)] will-change-[transform]"
        >
          {/* Left Inverted Notch Ear Cap */}
          <div className="absolute left-0 bottom-0 h-full w-[39px] overflow-visible">
            <svg
              viewBox="0 0 38 48"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <path
                d="M 0 48 A 18 18 0 0 0 18 30 L 18 20 A 20 20 0 0 1 38 0 L 39 0 L 39 48 L 0 48 Z"
                className="fill-[var(--bg-primary)] dark:fill-[#121214]"
              />
              <path
                d="M 0 48 A 18 18 0 0 0 18 30 L 18 20 A 20 20 0 0 1 38 0"
                fill="none"
                stroke="var(--card-border)"
                strokeWidth="1"
                className="dark:stroke-white/[0.12]"
              />
            </svg>
          </div>

          {/* Middle Body */}
          <div className="absolute left-[36px] right-[36px] bottom-0 h-full bg-[var(--bg-primary)] dark:bg-[#121214] border-t border-[var(--card-border)] dark:border-white/[0.12]" />

          {/* Right Inverted Notch Ear Cap */}
          <div className="absolute right-0 bottom-0 h-full w-[39px] overflow-visible">
            <svg
              viewBox="0 0 38 48"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <path
                d="M 0 0 A 20 20 0 0 1 20 20 L 20 30 A 18 18 0 0 0 38 48 L -1 48 L -1 0 Z"
                className="fill-[var(--bg-primary)] dark:fill-[#121214]"
              />
              <path
                d="M 0 0 A 20 20 0 0 1 20 20 L 20 30 A 18 18 0 0 0 38 48"
                fill="none"
                stroke="var(--card-border)"
                strokeWidth="1"
                className="dark:stroke-white/[0.12]"
              />
            </svg>
          </div>
        </div>

        {/* Back Button */}
        <motion.button
          type="button"
          onClick={handleBack}
          onMouseEnter={() => setHoveredButton("back")}
          whileTap={{ scale: 0.93 }}
          aria-label="Back to Serenity UI Components"
          className="group/btn relative flex h-8 sm:h-8.5 items-center gap-1.5 rounded-lg px-2 sm:px-2.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          {hoveredButton === "back" && (
            <motion.div
              layoutId="notch-hover-pill"
              className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] dark:bg-white/[0.09]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10 inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back</span>
          </span>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredButton === "back" && (
              <motion.span
                initial={{ opacity: 0, y: 4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 3, scale: 0.92 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
              >
                {item.type === "block"
                  ? "Back to Blocks"
                  : "Back to Components"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="h-4 w-px bg-[var(--card-border)] dark:bg-white/[0.12] mx-0.5" />

        {/* Copy Code Button */}
        <motion.button
          type="button"
          onClick={() => handleCopyCode("code")}
          onMouseEnter={() => setHoveredButton("code")}
          whileTap={{ scale: 0.93 }}
          aria-label="Copy component source code"
          className="group/btn relative flex h-8 sm:h-8.5 items-center gap-1.5 rounded-lg px-2 sm:px-2.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          {hoveredButton === "code" && (
            <motion.div
              layoutId="notch-hover-pill"
              className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] dark:bg-white/[0.09]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}

          <span className="relative z-10 inline-flex items-center gap-1.5 text-[var(--text-muted)] group-hover/btn:text-[var(--text-primary)]">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
              <AnimatePresence initial={false}>
                {copiedType === "code" ? (
                  <motion.span
                    key="check-code"
                    initial={{ scale: 0.1, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.1, rotate: 20, opacity: 0 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[2.5]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy-icon"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.2, opacity: 0 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="hidden sm:inline">Copy Code</span>
          </span>

          {/* Tooltip */}
          <AnimatePresence>
            {copiedType === "code" ? (
              <motion.span
                key="copied-code-tooltip"
                initial={{ opacity: 0, y: 4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 3, scale: 0.92 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
              >
                Paste in your project
              </motion.span>
            ) : (
              hoveredButton === "code" && (
                <motion.span
                  key="hover-code-tooltip"
                  initial={{ opacity: 0, y: 4, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 3, scale: 0.92 }}
                  transition={{ duration: 0.12 }}
                  className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
                >
                  Copy Code
                </motion.span>
              )
            )}
          </AnimatePresence>
        </motion.button>

        {/* Copy CLI Button & Package Managers Popover */}
        <div className="relative">
          <motion.button
            ref={cliButtonRef}
            type="button"
            onClick={() => {
              play("tap");
              setHoveredPm(null);
              setCopiedPackageManager(null);
              setIsCliMenuOpen((prev) => !prev);
            }}
            onMouseEnter={() => setHoveredButton("cli")}
            whileTap={{ scale: 0.93 }}
            aria-label="Copy CLI command options"
            className={`group/btn relative flex h-8 sm:h-8.5 items-center gap-1.5 rounded-lg px-2 sm:px-2.5 text-xs font-medium transition-colors cursor-pointer ${
              isCliMenuOpen
                ? "text-[var(--text-primary)] font-semibold"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {hoveredButton === "cli" && !isCliMenuOpen && (
              <motion.div
                layoutId="notch-hover-pill"
                className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] dark:bg-white/[0.09]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {isCliMenuOpen && (
              <motion.div
                layoutId="notch-hover-pill"
                className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] shadow-2xs"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            <span className="relative z-10 inline-flex items-center gap-1.5">
              <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
                <AnimatePresence initial={false}>
                  {copiedType === "cli" ? (
                    <motion.span
                      key="check-cli"
                      initial={{ scale: 0.1, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.1, rotate: 20, opacity: 0 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[2.5]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="terminal-icon"
                      initial={{ scale: 0.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.2, opacity: 0 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Terminal className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="hidden sm:inline">CLI</span>
            </span>

            {/* Tooltip */}
            <AnimatePresence>
              {!isCliMenuOpen && (
                copiedType === "cli" ? (
                  <motion.span
                    key="copied-cli-tooltip"
                    initial={{ opacity: 0, y: 4, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 3, scale: 0.92 }}
                    transition={{ duration: 0.12 }}
                    className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
                  >
                    Paste in your terminal
                  </motion.span>
                ) : (
                  hoveredButton === "cli" && (
                    <motion.span
                      key="hover-cli-tooltip"
                      initial={{ opacity: 0, y: 4, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 3, scale: 0.92 }}
                      transition={{ duration: 0.12 }}
                      className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
                    >
                      Install via CLI
                    </motion.span>
                  )
                )
              )}
            </AnimatePresence>
          </motion.button>

          {/* Compact Package Manager Popover */}
          <AnimatePresence>
            {isCliMenuOpen && (
              <motion.div
                ref={cliMenuRef}
                onMouseLeave={() => setHoveredPm(null)}
                initial={{ opacity: 0, y: 8, scale: 0.92, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 6, scale: 0.94, filter: "blur(2px)" }}
                transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.7 }}
                className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-36 rounded-2xl bg-[var(--bg-primary)]/95 dark:bg-[#141417]/95 backdrop-blur-xl border border-[var(--card-border)] dark:border-white/[0.08] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.08),0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_14px_34px_-8px_rgba(0,0,0,0.6),0_2px_8px_-2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08)] p-1 z-50 select-none"
              >
                <div className="flex flex-col gap-0.5">
                  {PACKAGE_MANAGERS.map((pm) => {
                    const cmd = pm.getCommand(currentCliSlug);
                    const isCopied = copiedPackageManager === pm.id;
                    const Icon = pm.Icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => handleCopyPackageManager(pm.id, cmd)}
                        onMouseEnter={() => setHoveredPm(pm.id)}
                        className={`group/pm relative flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer outline-none focus:outline-none ${
                          isCopied
                            ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {hoveredPm === pm.id && !isCopied && (
                          <motion.div
                            layoutId="cli-pm-hover-pill"
                            className="absolute inset-0 rounded-xl bg-[var(--pill-hover)] dark:bg-white/[0.09]"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}

                        {isCopied && (
                          <motion.div
                            layoutId="cli-pm-hover-pill"
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

        {/* View Source Code Button (Toggles Modal) */}
        <motion.button
          type="button"
          onClick={() => {
            play("tap");
            setIsSourceOpen((prev) => !prev);
          }}
          onMouseEnter={() => setHoveredButton("source")}
          whileTap={{ scale: 0.93 }}
          aria-label="Toggle source code view"
          className={`group/btn relative flex h-8 sm:h-8.5 items-center gap-1.5 rounded-lg px-2 sm:px-2.5 text-xs font-medium transition-colors cursor-pointer ${
            isSourceOpen
              ? "text-[var(--text-primary)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          {hoveredButton === "source" && !isSourceOpen && (
            <motion.div
              layoutId="notch-hover-pill"
              className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] dark:bg-white/[0.09]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}

          {isSourceOpen && (
            <motion.div
              layoutId="notch-hover-pill"
              className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] shadow-2xs"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}

          <span className="relative z-10 inline-flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Source</span>
          </span>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredButton === "source" && (
              <motion.span
                initial={{ opacity: 0, y: 4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 3, scale: 0.92 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
              >
                Source Code
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="h-4 w-px bg-[var(--card-border)] dark:bg-white/[0.12] mx-0.5" />

        {/* Theme Toggle */}
        <motion.button
          type="button"
          onClick={() => {
            play("tap");
            setTheme(isDark ? "light" : "dark");
          }}
          onMouseEnter={() => setHoveredButton("theme")}
          whileTap={{ scale: 0.88, rotate: isDark ? 45 : -45 }}
          aria-label="Toggle theme"
          className="group/btn relative flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          {hoveredButton === "theme" && (
            <motion.div
              layoutId="notch-hover-pill"
              className="absolute inset-0 rounded-lg bg-[var(--pill-hover)] dark:bg-white/[0.09]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}

          <div className="relative z-10 flex items-center justify-center">
            <ThemeToggleIcon isDark={isDark} />
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredButton === "theme" && (
              <motion.span
                initial={{ opacity: 0, y: 4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 3, scale: 0.92 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute -top-8.5 left-1/2 -translate-x-1/2 rounded-lg bg-[#18181b] text-white border border-white/[0.12] dark:bg-[#f4f4f5] dark:text-[#09090b] dark:border-black/[0.08] px-2.5 py-0.5 text-[11px] font-medium shadow-md whitespace-nowrap z-50"
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Source Code Modal - Floating cleanly ABOVE the dock */}
      {isSourceOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          aria-label={`${item.name} Source Code`}
          className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 pb-20 sm:pb-24 bg-black/40 dark:bg-black/75 backdrop-blur-2xl animate-fade-in overscroll-contain"
          onClick={() => setIsSourceOpen(false)}
        >
          <div
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-full max-h-[calc(100vh-6.5rem)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_8px_24px_-8px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] flex flex-col overflow-hidden animate-zoom-in overscroll-contain"
          >
            {/* Fixed Sticky Header */}
            <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-[var(--card-border)] bg-[var(--card-bg)] px-4 sm:px-5 py-3">
              <span className="text-xs sm:text-sm font-mono font-medium text-[var(--text-primary)]">
                {currentVariant?.fileName ||
                  (item.variants && activeVariant && activeVariant !== "none"
                    ? `${item.slug}-${activeVariant}.tsx`
                    : `${item.slug}.tsx`)}
              </span>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  play("tap");
                  setIsSourceOpen(false);
                }}
                aria-label="Close source code dialog"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 transition-colors cursor-pointer active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Independently Scrollable Code Content Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-auto py-4 sm:py-5 pl-2 sm:pl-3 pr-4 sm:pr-6 custom-scrollbar overscroll-contain select-text cursor-auto"
            >
              <CodeHighlight code={currentCode} lang="tsx" isDark={isDark} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
