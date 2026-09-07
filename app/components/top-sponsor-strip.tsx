"use client";

import Link from "next/link";
import { useCoreAudio } from "../lib/use-core-audio";

export interface AdvertisedProduct {
  name: string;
  description?: string;
  url?: string;
}

interface TopSponsorStripProps {
  product?: AdvertisedProduct | null;
  className?: string;
}

export function TopSponsorStrip({
  product,
  className = "",
}: TopSponsorStripProps) {
  const { play } = useCoreAudio();

  // 1. Active Advertised Product Strip
  if (product && product.name) {
    return (
      <a
        href={
          product.url
            ? product.url.startsWith("http")
              ? product.url
              : `https://${product.url}`
            : "#"
        }
        target="_blank"
        rel="noreferrer"
        className={`group relative z-20 flex h-10 w-full items-center justify-center border-b border-[var(--card-border)] bg-[var(--bg-primary)] px-2.5 sm:px-4 text-center text-xs sm:text-[13px] tracking-tight transition-colors hover:bg-[var(--card-bg)] ${className}`}
      >
        <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)] max-w-full overflow-hidden">
          <span className="font-semibold text-[var(--text-primary)] shrink-0">
            {product.name}
          </span>
          {product.description && (
            <>
              <span className="text-[var(--text-muted)]/40 shrink-0">
                -
              </span>
              <span className="text-[var(--text-muted)] truncate">
                {product.description}
              </span>
            </>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--card-bg)] group-hover:bg-[var(--pill-hover)] px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-[var(--text-primary)] border border-[var(--card-border)] shrink-0 transition-all">
            <span>Visit</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </span>
      </a>
    );
  }

  // 2. Default Slot Reservation Strip on Homepage
  return (
    <Link
      href="/advertise"
      onClick={() => play("tap")}
      className={`group relative z-20 flex h-10 w-full items-center justify-center border-b border-[var(--card-border)] bg-[var(--bg-primary)] px-4 text-center text-xs sm:text-[13px] tracking-tight transition-colors hover:bg-[var(--card-bg)] ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)]">
        <span className="font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
          Get your product featured here for
        </span>
        <span className="font-semibold text-[var(--text-primary)]">
          $99/m
        </span>
        <span className="text-[var(--text-muted)]/40">·</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--card-bg)] group-hover:bg-[var(--pill-hover)] px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-[var(--text-primary)] border border-[var(--card-border)] transition-all">
          <span>Reserve slot</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
