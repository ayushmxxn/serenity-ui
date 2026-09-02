"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function TopViewportOverlay() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);

  const isPreviewPage =
    Boolean(pathname?.startsWith("/components/")) && pathname !== "/components";

  // Reset scroll state on pathname change
  useEffect(() => {
    setSkipTransition(true);
    setHasScrolled(false);
    const raf = requestAnimationFrame(() => {
      setSkipTransition(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    let rafId: number | null = null;
    let lastScrolled = false;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrolled = window.scrollY > 2;
        if (scrolled !== lastScrolled) {
          lastScrolled = scrolled;
          setHasScrolled(scrolled);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isPreviewPage) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(to bottom, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 96%, transparent) 12%, color-mix(in srgb, var(--bg-primary) 87%, transparent) 24%, color-mix(in srgb, var(--bg-primary) 73%, transparent) 36%, color-mix(in srgb, var(--bg-primary) 56%, transparent) 50%, color-mix(in srgb, var(--bg-primary) 38%, transparent) 64%, color-mix(in srgb, var(--bg-primary) 20%, transparent) 78%, color-mix(in srgb, var(--bg-primary) 7%, transparent) 90%, transparent 100%)",
      }}
      className={`pointer-events-none fixed inset-x-0 top-0 z-30 h-24 sm:h-28 ${
        skipTransition ? "" : "transition-opacity duration-300 ease-out"
      } ${hasScrolled ? "opacity-100" : "opacity-0"}`}
    />
  );
}
