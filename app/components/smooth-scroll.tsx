"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const [isTouch, setIsTouch] = useState(false);
  const isPreviewPage = Boolean(pathname?.startsWith("/components/"));

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouch || isPreviewPage) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 0.9,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        respectReducedMotion: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
