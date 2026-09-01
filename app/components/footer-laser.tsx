"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Laser } from "./effects/Laser";

const emptySubscribe = () => () => {};
const subscribeMobile = (callback: () => void) => {
  const mql = window.matchMedia("(max-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};
const getMobileSnapshot = () => window.matchMedia("(max-width: 768px)").matches;
const getMobileServerSnapshot = () => false;

export function FooterLaser() {
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
  const isDark = mounted && resolvedTheme === "dark";

  if (!isDark) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-px left-0 right-0 z-20 overflow-visible"
    >
      <div
        className="relative w-full"
        style={{
          height: isMobile ? 150 : 240,
          marginTop: isMobile ? -150 : -240,
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
    </div>
  );
}

export default FooterLaser;
