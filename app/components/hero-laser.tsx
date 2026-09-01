"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Laser } from "./effects/Laser";

const emptySubscribe = () => () => {};
const subscribeMobile = (callback: () => void) => {
  const mql = window.matchMedia("(max-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};
const getMobileSnapshot = () => window.matchMedia("(max-width: 768px)").matches;
const getMobileServerSnapshot = () => false;

export function HeroLaser() {
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
  const { resolvedTheme } = useTheme();
  const [hasScrolled, setHasScrolled] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setHasScrolled(window.scrollY > 15);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isDark) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 transition-opacity duration-300 ease-out ${
        hasScrolled ? "opacity-0" : "opacity-100"
      }`}
      style={{
        height: isMobile ? 150 : 240,
        willChange: "opacity",
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
  );
}

export default HeroLaser;
