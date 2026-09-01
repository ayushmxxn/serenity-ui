"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ComponentCard } from "../components/component-grid";
import Footer from "../components/footer";
import type { ProfileStatsData } from "../components/profile-stats";
import { useCoreAudio } from "../lib/use-core-audio";
import { BLOCKS_REGISTRY } from "../registry";

const emptySubscribe = () => () => {};

function ThemeToggleIcon({
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

export default function AllBlocksView({
  stats,
}: {
  stats?: ProfileStatsData | null;
}) {
  const { play } = useCoreAudio();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isFilterOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(target)
      ) {
        setIsFilterOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterOpen]);

  const { scrollY } = useScroll();

  const isMobile = useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => (typeof window !== "undefined" ? window.innerWidth < 640 : false),
    () => false,
  );

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 280,
    damping: 30,
    mass: 0.1,
    restDelta: 0.05,
  });

  const headerTop = useTransform(smoothScrollY, [0, 150], ["0px", "0px"]);
  const headerBgOpacity = useTransform(smoothScrollY, [0, 80], [1, 0]);
  const headerBgDisplay = useTransform(smoothScrollY, (v) =>
    v > 85 ? "none" : "block",
  );

  const notchMax = isMobile ? "356px" : "360px";
  const barMaxWidth = useTransform(
    smoothScrollY,
    [15, 150],
    ["1280px", notchMax],
  );
  const barHeight = useTransform(smoothScrollY, [0, 150], ["64px", "48px"]);
  const barPaddingX = useTransform(smoothScrollY, [15, 150], ["0px", "8px"]);
  const barPaddingY = useTransform(smoothScrollY, [0, 150], ["0px", "4px"]);
  const btnBorderRadius = useTransform(
    smoothScrollY,
    [0, 120],
    ["12px", "10px"],
  );
  const barGap = useTransform(smoothScrollY, [15, 150], ["16px", "6px"]);

  const notchBgOpacity = useTransform(smoothScrollY, [25, 110], [0, 1]);
  const backBtnSize = useTransform(smoothScrollY, [0, 150], ["38px", "34px"]);

  const leftSlotStart = isMobile ? "38px" : "176px";
  const leftSlotWidth = useTransform(
    smoothScrollY,
    [0, 80],
    [leftSlotStart, "34px"],
  );

  const searchMax = isMobile ? "208px" : "220px";
  const searchStartWidth = isMobile ? "208px" : "320px";
  const searchMaxWidth = useTransform(
    smoothScrollY,
    [15, 150],
    [searchStartWidth, searchMax],
  );
  const searchHeight = useTransform(smoothScrollY, [0, 150], ["38px", "34px"]);

  const rightSlotStart = isMobile ? "0px" : "132px";
  const rightSlotWidth = useTransform(
    smoothScrollY,
    [0, 80],
    [rightSlotStart, "34px"],
  );
  const countBadgeOpacity = useTransform(smoothScrollY, [0, 40], [1, 0]);
  const countBadgePointerEvents = useTransform(smoothScrollY, (v) =>
    !isMobile && v < 40 ? "auto" : "none",
  );
  const topBtnOpacity = useTransform(smoothScrollY, [45, 90], [0, 1]);
  const topBtnPointerEvents = useTransform(smoothScrollY, (v) =>
    v > 45 ? "auto" : "none",
  );

  const themeBtnSize = useTransform(smoothScrollY, [0, 150], ["38px", "34px"]);

  // Extract unique categories for blocks
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    for (const item of BLOCKS_REGISTRY) {
      if (item.category) {
        cats.add(item.category);
      }
    }
    return Array.from(cats);
  }, []);

  // Filter blocks by search & category
  const filteredBlocks = useMemo(() => {
    return BLOCKS_REGISTRY.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category &&
          item.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const scrollToTop = () => {
    play("tap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    if (!gridRef.current || typeof window === "undefined") return;
    if (window.scrollY < 40) return;

    const navbarOffset = 90;
    const elementPosition = gridRef.current.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset + elementPosition - navbarOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      scrollToResults();
    }
  };

  const totalCount = BLOCKS_REGISTRY.length;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col">
      {/* Scroll-Morphing Sticky Header */}
      <div
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
        className="sticky top-0 z-50 w-full pointer-events-none isolate"
      >
        <motion.div
          style={{
            opacity: headerBgOpacity,
            display: headerBgDisplay,
            transform: "translateZ(0)",
          }}
          className="absolute inset-0 h-16 bg-[var(--bg-primary)]/85 backdrop-blur-xl pointer-events-none -z-10"
        />

        <motion.header
          style={{
            paddingTop: headerTop,
            transform: "translate3d(0, 0, 0)",
          }}
          className="w-full max-w-7xl mx-auto pointer-events-none px-4 sm:px-8"
        >
          {/* Central Morphing Navbar Notch */}
          <motion.div
            style={{
              maxWidth: barMaxWidth,
              height: barHeight,
              paddingLeft: barPaddingX,
              paddingRight: barPaddingX,
              paddingTop: barPaddingY,
              paddingBottom: barPaddingY,
              gap: barGap,
              transform: "translate3d(0, 0, 0)",
            }}
            className="relative pointer-events-auto mx-auto flex items-center justify-between w-full will-change-[max-width,height,transform] isolate"
          >
            {/* Top Notch Background Plate */}
            <motion.div
              style={{
                opacity: notchBgOpacity,
                transform: "translate3d(0, 0, 0)",
              }}
              className="pointer-events-none absolute -inset-x-[18px] top-0 h-full -z-10 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.05)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] will-change-[opacity,transform]"
            >
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

              <div className="absolute left-[36px] right-[36px] top-0 h-full bg-[var(--bg-primary)] dark:bg-[#121214] border-b border-[var(--card-border)] dark:border-white/[0.12]" />

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
            </motion.div>

            {/* Left: Back to Home Link */}
            <motion.div
              style={{
                width: leftSlotWidth,
              }}
              className="flex shrink-0 items-center justify-start min-w-0"
            >
              <Link
                href="/"
                onClick={() => play("tap")}
                aria-label="Back to Home"
                className="group/back relative flex shrink-0 items-center justify-center font-medium text-[var(--text-primary)] bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 cursor-pointer rounded-xl overflow-hidden"
              >
                <motion.div
                  style={{
                    height: backBtnSize,
                    width: backBtnSize,
                    borderRadius: btnBorderRadius,
                  }}
                  className="flex items-center justify-center h-full w-full"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover/back:-translate-x-0.5" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Center: Search Input */}
            <motion.div
              style={{
                width: searchMaxWidth,
              }}
              className="relative shrink-0 flex items-center justify-center"
            >
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none z-10" />
              <motion.input
                style={{
                  height: searchHeight,
                  borderRadius: btnBorderRadius,
                }}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    scrollToResults();
                  }
                }}
                placeholder="Search blocks..."
                className={`w-full text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:text-xs focus:outline-none focus:border-[var(--card-hover-border)] focus:ring-0 transition-all pl-7.5 rounded-xl border border-[var(--card-border)] bg-[var(--pill-bg)] dark:bg-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] ${
                  searchQuery ? "pr-7" : "pr-3"
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer z-10 p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </motion.div>

            {/* Right Controls */}
            <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
              {categories.length > 1 && (
                <motion.button
                  ref={filterButtonRef}
                  type="button"
                  onClick={() => {
                    play("tap");
                    setIsFilterOpen((prev) => !prev);
                  }}
                  aria-label="Filter blocks by category"
                  aria-expanded={isFilterOpen}
                  style={{
                    height: themeBtnSize,
                    width: themeBtnSize,
                    borderRadius: btnBorderRadius,
                  }}
                  className="relative sm:hidden flex items-center justify-center bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] cursor-pointer active:scale-95 rounded-xl shrink-0"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </motion.button>
              )}

              {/* Count / Back-to-Top Morphing Slot */}
              <motion.div
                style={{
                  width: rightSlotWidth,
                }}
                className="relative hidden md:flex items-center justify-center shrink-0 h-9"
              >
                <motion.div
                  style={{
                    opacity: countBadgeOpacity,
                    pointerEvents: countBadgePointerEvents,
                    borderRadius: btnBorderRadius,
                  }}
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-xs font-medium text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] select-none whitespace-nowrap px-3.5"
                >
                  <span>
                    {totalCount} {totalCount === 1 ? "Block" : "Blocks"}
                  </span>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  style={{
                    opacity: topBtnOpacity,
                    pointerEvents: topBtnPointerEvents,
                    borderRadius: btnBorderRadius,
                  }}
                  className="absolute inset-0 flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] cursor-pointer active:scale-95 m-auto"
                >
                  <ArrowUp className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover/top:-translate-y-0.5" />
                </motion.button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.button
                type="button"
                onClick={() => {
                  play("tap");
                  setTheme(isDark ? "light" : "dark");
                }}
                aria-label="Toggle color theme"
                style={{
                  height: themeBtnSize,
                  width: themeBtnSize,
                  borderRadius: btnBorderRadius,
                }}
                className="flex items-center justify-center bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] cursor-pointer active:scale-95 rounded-xl shrink-0"
              >
                <ThemeToggleIcon isDark={isDark} />
              </motion.button>
            </div>

            {/* Mobile Category Filter Modal */}
            <AnimatePresence>
              {isFilterOpen && categories.length > 1 && (
                <motion.div
                  ref={filterMenuRef}
                  initial={{ opacity: 0, scale: 0.97, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 top-[calc(100%+8px)] sm:hidden rounded-2xl bg-[var(--bg-primary)]/95 dark:bg-[#141417]/95 backdrop-blur-2xl border border-[var(--card-border)]/80 dark:border-white/[0.1] p-2 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.45),0_4px_16px_-4px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)] z-50 overflow-hidden"
                >
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--card-border)]/70 dark:border-white/[0.08] mb-1.5 flex items-center justify-between">
                    <span>Filter by Category</span>
                    <span className="text-[10px] font-medium text-[var(--text-muted)]">
                      {categories.length} Categories
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 max-h-60 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsFilterOpen(false);
                            play("tap");
                            scrollToResults();
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl transition-colors text-left cursor-pointer active:scale-[0.99] ${
                            isSelected
                              ? "bg-black/[0.05] dark:bg-white/[0.08] text-[var(--text-primary)] font-semibold"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="truncate">{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.header>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 sm:pt-8 pb-12 sm:pb-16 lg:pb-20">
        {/* Centered Compact Liquid Segmented Category Switcher (Hidden on mobile, visible on sm and up) */}
        <div className="mb-6 sm:mb-8 hidden sm:flex items-center justify-center">
          <div className="relative inline-flex h-8 sm:h-9 items-center rounded-xl bg-[var(--pill-bg)] p-0.5 border border-[var(--card-border)] select-none max-w-full overflow-x-auto custom-scrollbar">
            <div
              role="tablist"
              aria-label="Filter blocks by category"
              className="relative flex items-center gap-0.5"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    id={`tab-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedCategory(cat);
                      play("tap");
                    }}
                    className={`relative z-10 inline-flex h-7 sm:h-8 items-center justify-center whitespace-nowrap rounded-[9px] sm:rounded-[10px] px-2.5 sm:px-3 text-[11px] sm:text-xs tracking-tight transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                      isSelected
                        ? "text-[var(--text-primary)] font-semibold"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeBlockCategoryPill"
                        className="absolute inset-0 z-[-1] rounded-[9px] sm:rounded-[10px] bg-white dark:bg-[#1e1e22] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 38,
                        }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Blocks Grid */}
        <div ref={gridRef} id="blocks-grid" className="scroll-mt-28">
          {filteredBlocks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
              {filteredBlocks.map((item) => (
                <ComponentCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-[var(--card-border)]">
              <Search className="h-10 w-10 text-[var(--text-muted)] mb-3 opacity-40" />
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                No blocks found
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm mb-4">
                We couldn&apos;t find any blocks matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  play("tap");
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="cursor-pointer rounded-full bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] px-4 py-2 text-xs font-medium text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] hover:bg-[var(--pill-hover)] dark:hover:from-[#26262b] dark:hover:to-[#1c1c20] dark:hover:border-white/[0.14] active:scale-95 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer stats={stats} />
    </div>
  );
}
