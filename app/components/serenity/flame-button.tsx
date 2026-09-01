"use client";

import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface FlameButtonProps {
  text?: string;
  showArrow?: boolean;
  height?: number;
  textColor?: string;
  borderColor?: string;
  href?: string;
  onClick?: () => void;
}

export const FlameButton: React.FC<FlameButtonProps> = ({
  text = "FOLLOW ON X",
  showArrow = true,
  height = 44,
  textColor = "#5a250a",
  borderColor = "transparent",
  href = "https://x.com/ayushmxxn",
  onClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [width, setWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [displayOpacity, setDisplayOpacity] = useState(0);
  const targetOpacityRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current)
        setWidth(wrapperRef.current.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const safeMouseX = mouseX ?? width / 2;
  const normX = width ? safeMouseX / width : 0.5;
  const isRightSide = normX >= 0.5;
  const edgeProximity = Math.pow(Math.min(1, Math.abs(normX - 0.5) * 2), 1.6);
  const targetOpacity = isHovering ? edgeProximity : 0;

  useEffect(() => {
    targetOpacityRef.current = targetOpacity;
  }, [targetOpacity]);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      setDisplayOpacity((prev) => {
        const target = targetOpacityRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.002) return target;
        return prev + diff * 0.15;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const edgePercent = isRightSide ? 88 : 12;

  const hot = "255, 214, 130";
  const core = "255, 106, 45";
  const edge = "255, 45, 85";

  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    onClick?.();
  };

  return (
    <div
      className="relative inline-block select-none isolate"
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute pointer-events-none z-0"
        style={{
          inset: "-6px",
          borderRadius: 9999,
          background: `radial-gradient(ellipse 44% 85% at ${edgePercent}% 50%,
            rgba(${hot}, 1) 0%,
            rgba(${core}, 0.95) 28%,
            rgba(${edge}, 0.5) 50%,
            rgba(${edge}, 0.12) 68%,
            transparent 80%)`,
          filter: "blur(7px) saturate(1.4)",
          opacity: displayOpacity,
        }}
      />

      <button
        type="button"
        onClick={handleClick}
        style={{
          height: `${height}px`,
          border: `1px solid ${borderColor}`,
          borderRadius: 9999,
          outline: "none",
          WebkitTapHighlightColor: "transparent",
          background: `linear-gradient(100deg,
            #cfcfcf 0%,
            #d6d6d6 40%,
            #e4e2e0 70%,
            #f0eeec 100%)`,
        }}
        className="flex items-center justify-center relative z-10 overflow-hidden uppercase font-bold text-xs cursor-pointer space-x-2 px-8 sm:pl-10 sm:pr-8 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 appearance-none"
      >
        <div
          className="absolute left-0 top-0 -z-10"
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: isHovering ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 121,
              height: 121,
              left: safeMouseX - 60.5,
              top: "50%",
              transform: "translateY(-50%)",
              background: `radial-gradient(50% 50% at 50% 50%, #FFFFF5 3.5%, rgba(${core},1) 26.5%, #FFDA9F 37.5%, rgba(${core},0.5) 49%, rgba(${edge},0) 92.5%)`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 204,
              height: 103,
              left: safeMouseX - 102,
              top: "50%",
              transform: "translateY(-50%)",
              filter: "blur(5px)",
              background: `radial-gradient(43.3% 44.23% at 50% 49.51%, #FFFFF7 29%, #FFFACD 48.5%, #F4D2BF 60.71%, rgba(214,211,210,0) 100%)`,
            }}
          />
        </div>

        <span
          style={{ color: textColor }}
          className="text-sm font-semibold tracking-wider"
        >
          {text}
        </span>

        {showArrow && (
          <ArrowRight
            className="w-3.5 h-3.5"
            style={{ color: textColor }}
            strokeWidth={2.5}
          />
        )}
      </button>
    </div>
  );
};

export default FlameButton;
