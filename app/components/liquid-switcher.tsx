"use client";

import { useState } from "react";
import { useCoreAudio } from "../lib/use-core-audio";

export type SwitcherTab = "components" | "blocks" | "templates";

interface LiquidSegmentedSwitcherProps {
  activeTab?: SwitcherTab;
  onChange?: (tab: SwitcherTab) => void;
}

export function LiquidSegmentedSwitcher({
  activeTab: controlledActiveTab,
  onChange,
}: LiquidSegmentedSwitcherProps) {
  const [internalTab, setInternalTab] = useState<SwitcherTab>("components");
  const { play } = useCoreAudio();

  const activeTab = controlledActiveTab ?? internalTab;

  const handleTabClick = (tab: SwitcherTab) => {
    if (tab === "templates") return;
    play("tap");
    if (controlledActiveTab === undefined) {
      setInternalTab(tab);
    }
    onChange?.(tab);
  };

  return (
    <div className="relative inline-flex h-11 items-center rounded-2xl bg-[var(--pill-bg)] p-1 border border-[var(--card-border)] select-none">
      {/* Grid container with smooth sliding squircle indicator across 3 tabs */}
      <div
        role="tablist"
        aria-label="Content view selection"
        data-state={activeTab}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            if (activeTab === "components") handleTabClick("blocks");
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            if (activeTab === "blocks") handleTabClick("components");
          }
        }}
        className="group relative inline-grid grid-cols-3 items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/3 after:rounded-[12px] sm:after:rounded-[14px] after:bg-white dark:after:bg-[#1e1e22] after:border after:border-black/[0.06] dark:after:border-white/[0.08] after:shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] dark:after:shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-1px_0_rgba(0,0,0,0.3)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=components]:after:translate-x-0 data-[state=blocks]:after:translate-x-full data-[state=templates]:after:translate-x-[200%]"
      >
        {/* Components Tab */}
        <button
          type="button"
          role="tab"
          id="tab-components"
          aria-selected={activeTab === "components"}
          aria-controls="components-panel"
          onClick={() => handleTabClick("components")}
          className={`relative z-10 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
            activeTab === "components"
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          Components
        </button>

        {/* Blocks Tab */}
        <button
          type="button"
          role="tab"
          id="tab-blocks"
          aria-selected={activeTab === "blocks"}
          aria-controls="blocks-panel"
          onClick={() => handleTabClick("blocks")}
          className={`relative z-10 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
            activeTab === "blocks"
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          Blocks
        </button>

        {/* Templates Tab (Disabled with tooltip) */}
        <div role="presentation" className="relative group/templates inline-flex h-9 items-center justify-center">
          <button
            type="button"
            role="tab"
            id="tab-templates"
            aria-selected={activeTab === "templates"}
            aria-disabled="true"
            disabled
            className="relative z-10 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 text-xs sm:text-sm font-medium text-[var(--text-muted)] opacity-40 cursor-not-allowed select-none transition-colors duration-200 focus-visible:outline-none"
          >
            Templates
          </button>

          {/* Accessible Tooltip on hover */}
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-xl bg-zinc-950 text-white border border-white/[0.1] dark:bg-white dark:text-zinc-950 dark:border-black/[0.08] px-2.5 py-1 text-[11px] font-semibold shadow-2xl whitespace-nowrap z-40 opacity-0 translate-y-1 group-hover/templates:opacity-100 group-hover/templates:translate-y-0 transition-all duration-200"
          >
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}
