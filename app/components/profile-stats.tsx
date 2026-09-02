"use client";

import { Bookmark, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface ProfileStatsData {
  views: string;
  bookmarks: string;
}

export function Profile21stCard({
  views,
  bookmarks,
}: {
  views: string;
  bookmarks: string;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://github.com/ayushmxxn.png?size=96",
  );

  useEffect(() => {
    fetch("https://api.github.com/users/ayushmxxn", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.avatar_url) {
          const url = data.avatar_url;
          const separator = url.includes("?") ? "&" : "?";
          setAvatarUrl(`${url}${separator}s=96`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full select-none cursor-default rounded-2xl bg-white/95 dark:bg-[#121214]/98 backdrop-blur-2xl p-5 text-left transition-colors">
      {/* Top Row: Avatar + Name/Subtitle on Left, 21ST Link on Top-Right */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={avatarUrl}
            alt="Ayushmaan Singh"
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            onError={() => setAvatarUrl("/logo.webp")}
            className="h-11 w-11 rounded-xl object-cover bg-neutral-900 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base sm:text-[17px] font-bold tracking-tight text-[var(--text-primary)] font-heading leading-tight">
              Ayushmaan Singh
            </h3>
            <p className="truncate text-xs font-normal text-[var(--text-muted)] mt-0.5">
              @ayushmxxn · since 2025
            </p>
          </div>
        </div>

        {/* 21st.dev Profile Link Badge pinned to Top-Right */}
        <a
          href="https://21st.dev/@ayushmxxn"
          target="_blank"
          rel="noreferrer"
          aria-label="Ayushmaan's 21st.dev Profile"
          className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity flex-shrink-0 pt-0.5 cursor-pointer"
        >
          <img
            src="/21st-icon.png"
            alt="21st.dev Profile"
            className="h-4 w-4 rounded-[4px] object-cover"
          />
          <span className="text-xs font-semibold tracking-tight text-[var(--text-primary)]">
            21ST
          </span>
        </a>
      </div>

      {/* Bio matching reference screenshot */}
      <p className="mt-3.5 text-[13px] sm:text-[13.5px] leading-relaxed text-[var(--text-muted)] font-normal cursor-default">
        Designing and building marketing websites for SaaS founders who care
        about the details.
      </p>

      {/* Bottom Row: Rank 1 + Views + Bookmarks + Divider + Social Links */}
      <div className="mt-4 flex items-center justify-between gap-3 text-xs cursor-default">
        <div className="flex items-center gap-2.5">
          {/* Rank 1 Badge using provided SVG */}
          <div className="flex items-center gap-1 font-bold text-[#FFD700] flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              width="13"
              height="13"
              className="text-current flex-shrink-0"
            >
              <circle
                cx="12"
                cy="10"
                r="7.5"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <path
                d="M8 16.5V22L12 21L16 22V16.5"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0391 6C12.5913 6 13.0391 6.44772 13.0391 7V13.0352C13.0391 13.568 12.6071 14 12.0742 14C11.5414 14 11.1094 13.568 11.1094 13.0352V7.84127C11.1094 7.82106 11.093 7.80469 11.0728 7.80469C11.0661 7.80469 11.0595 7.80655 11.0537 7.81006L10.361 8.23357C9.88471 8.52474 9.27344 8.18199 9.27344 7.62378C9.27344 7.37676 9.40099 7.14725 9.61076 7.01682L10.7611 6.30155C11.0781 6.10446 11.4439 6 11.8172 6H12.0391Z"
                fill="#FFD700"
              />
            </svg>
            <span className="text-[10.5px] font-bold">1</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1 text-[var(--text-muted)] text-[10.5px] whitespace-nowrap flex-shrink-0">
            <Eye className="h-3 w-3 opacity-70" />
            <span>
              <span className="font-semibold text-[var(--text-primary)]">
                {views}
              </span>{" "}
              views
            </span>
          </div>

          {/* Bookmarks */}
          <div className="flex items-center gap-1 text-[var(--text-muted)] text-[10.5px] whitespace-nowrap flex-shrink-0">
            <Bookmark className="h-3 w-3 opacity-70" />
            <span>
              <span className="font-semibold text-[var(--text-primary)]">
                {bookmarks}
              </span>{" "}
              bookmarks
            </span>
          </div>
        </div>

        {/* Right side: Separator + Social Links */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Separator */}
          <div className="h-3 w-[1px] bg-black/10 dark:bg-white/10 flex-shrink-0" />

          {/* Social Links */}
          <div className="flex items-center gap-1.5 text-[var(--text-muted)] flex-shrink-0">
            {/* X (Twitter) */}
            <a
              href="https://x.com/ayushmxxn"
              target="_blank"
              rel="noreferrer"
              aria-label="X Profile"
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ayushmxxn"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>

            {/* Website / Portfolio */}
            <a
              href="https://ayushmxxn.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Personal Website"
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileStatsTrigger({
  views,
  bookmarks,
  align = "right",
  placement = "bottom",
  size = "normal",
  showCard = true,
}: {
  views: string;
  bookmarks: string;
  align?: "left" | "right" | "center";
  placement?: "top" | "bottom";
  size?: "normal" | "large";
  showCard?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !showCard) return;

    const handlePointerDownOutside = (
      e: PointerEvent | MouseEvent | TouchEvent,
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [isOpen, showCard]);

  const placementClasses =
    placement === "top"
      ? align === "center"
        ? "left-1/2 -translate-x-1/2 bottom-full mb-3 sm:mb-4 origin-bottom"
        : align === "right"
          ? "right-0 bottom-full mb-3 sm:mb-4 origin-bottom-right"
          : "left-0 bottom-full mb-3 sm:mb-4 origin-bottom-left"
      : align === "center"
        ? "left-1/2 -translate-x-1/2 top-full mt-2 sm:mt-3 origin-top"
        : align === "right"
          ? "right-0 -top-2 sm:-top-3 origin-top-right"
          : "left-0 -top-2 sm:-top-3 origin-top-left";

  const numClasses =
    size === "large"
      ? "text-3xl sm:text-4xl lg:text-[42px]"
      : "text-2xl sm:text-3xl lg:text-4xl";

  const labelClasses =
    size === "large"
      ? "text-xs sm:text-sm lg:text-[14px]"
      : "text-xs sm:text-sm";

  const dividerClasses = size === "large" ? "h-8 sm:h-10" : "h-7 sm:h-9";

  const statColClasses =
    align === "center"
      ? "flex flex-col items-center text-center"
      : "flex flex-col items-center sm:items-start text-center sm:text-left";

  const content = (
    <div
      className={`flex items-center gap-6 sm:gap-7 lg:gap-8 select-none ${
        align === "center" ? "text-center" : "text-center sm:text-left"
      }`}
    >
      {/* Stat 1: Views */}
      <div className={statColClasses}>
        <span
          className={`${numClasses} font-bold font-heading text-[var(--text-primary)] dark:text-white tracking-tight leading-none`}
        >
          {views}
        </span>
        <span
          className={`${labelClasses} font-medium text-[var(--text-muted)] mt-1.5 tracking-tight leading-tight`}
        >
          Views
        </span>
      </div>

      {/* Subtle Vertical Divider */}
      <div
        aria-hidden="true"
        className={`${dividerClasses} w-px bg-black/[0.08] dark:bg-white/[0.12] shrink-0 self-center`}
      />

      {/* Stat 2: Bookmarks */}
      <div className={statColClasses}>
        <span
          className={`${numClasses} font-bold font-heading text-[var(--text-primary)] dark:text-white tracking-tight leading-none`}
        >
          {bookmarks}
        </span>
        <span
          className={`${labelClasses} font-medium text-[var(--text-muted)] mt-1.5 tracking-tight leading-tight`}
        >
          Bookmarks
        </span>
      </div>
    </div>
  );

  if (!showCard) {
    return <div className="inline-block">{content}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative group/stats inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Minimal Stats Trigger (Number on top, Label underneath, Side-by-side) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="View 21st.dev creator profile stats"
        className="bg-transparent border-0 p-0 m-0 cursor-pointer select-none focus-visible:outline-none transition-opacity duration-200 group-hover/stats:opacity-90"
      >
        {content}
      </button>

      {/* Floating 21st.dev Profile Card */}
      <div
        className={`absolute z-50 w-[340px] sm:w-[350px] xl:w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${placementClasses} ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10 shadow-none">
          <Profile21stCard views={views} bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
}
