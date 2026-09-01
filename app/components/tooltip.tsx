"use client";

import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delayMs?: number;
  open?: boolean;
  className?: string;
  disabled?: boolean;
}

function CurvedPointer({
  side,
}: {
  side: "top" | "bottom" | "left" | "right";
}) {
  if (side === "top") {
    return (
      <svg
        className="absolute left-1/2 -bottom-[3.5px] -translate-x-1/2 overflow-visible text-[#161618]/95 dark:text-white/95"
        width="10"
        height="4"
        viewBox="0 0 10 4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 0 C2 0 3.3 0.6 4.2 2.6 C4.5 3.3 5.5 3.3 5.8 2.6 C6.7 0.6 8 0 10 0 Z" />
      </svg>
    );
  }
  if (side === "bottom") {
    return (
      <svg
        className="absolute left-1/2 -top-[3.5px] -translate-x-1/2 overflow-visible text-[#161618]/95 dark:text-white/95"
        width="10"
        height="4"
        viewBox="0 0 10 4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 4 C2 4 3.3 3.4 4.2 1.4 C4.5 0.7 5.5 0.7 5.8 1.4 C6.7 3.4 8 4 10 4 Z" />
      </svg>
    );
  }
  if (side === "left") {
    return (
      <svg
        className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 overflow-visible text-[#161618]/95 dark:text-white/95"
        width="4"
        height="10"
        viewBox="0 0 4 10"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 0 C0 2 0.6 3.3 2.6 4.2 C3.3 4.5 3.3 5.5 2.6 5.8 C0.6 6.7 0 8 0 10 Z" />
      </svg>
    );
  }
  return (
    <svg
      className="absolute top-1/2 -left-[3.5px] -translate-y-1/2 overflow-visible text-[#161618]/95 dark:text-white/95"
      width="4"
      height="10"
      viewBox="0 0 4 10"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 0 C4 2 3.4 3.3 1.4 4.2 C0.7 4.5 0.7 5.5 1.4 5.8 C3.4 6.7 4 8 4 10 Z" />
    </svg>
  );
}

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 8,
  delayMs = 150,
  open: controlledOpen,
  className = "",
  disabled = false,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = disabled
    ? false
    : isControlled
      ? controlledOpen
      : uncontrolledOpen;

  const tooltipId = useId();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const handlePointerEnter = (e: React.PointerEvent) => {
    // Disable hover tooltips on touch devices
    if (e.pointerType === "touch" || disabled) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }

    clearTimer();
    if (delayMs > 0) {
      timerRef.current = setTimeout(() => {
        setUncontrolledOpen(true);
      }, delayMs);
    } else {
      setUncontrolledOpen(true);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    clearTimer();
    setUncontrolledOpen(false);
  };

  const handleFocus = () => {
    if (disabled) return;
    clearTimer();
    setUncontrolledOpen(true);
  };

  const handleBlur = () => {
    clearTimer();
    setUncontrolledOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      clearTimer();
      setUncontrolledOpen(false);
    }
  };

  if (!isValidElement(children)) {
    return children;
  }

  // Positioning & arrow alignments
  const positionClasses = {
    top: `bottom-full left-1/2 -translate-x-1/2 mb-[${sideOffset}px]`,
    bottom: `top-full left-1/2 -translate-x-1/2 mt-[${sideOffset}px]`,
    left: `right-full top-1/2 -translate-y-1/2 mr-[${sideOffset}px]`,
    right: `left-full top-1/2 -translate-y-1/2 ml-[${sideOffset}px]`,
  }[side];

  // Motion animation offsets based on side
  const motionClasses = {
    top: isOpen
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 translate-y-1.5 scale-95 pointer-events-none",
    bottom: isOpen
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 -translate-y-1.5 scale-95 pointer-events-none",
    left: isOpen
      ? "opacity-100 translate-x-0 scale-100"
      : "opacity-0 translate-x-1.5 scale-95 pointer-events-none",
    right: isOpen
      ? "opacity-100 translate-x-0 scale-100"
      : "opacity-0 -translate-x-1.5 scale-95 pointer-events-none",
  }[side];

  const trigger = cloneElement(
    children as React.ReactElement<Record<string, unknown>>,
    {
      onPointerEnter: (e: React.PointerEvent) => {
        handlePointerEnter(e);
        const childProps = children.props as {
          onPointerEnter?: (e: React.PointerEvent) => void;
        };
        childProps?.onPointerEnter?.(e);
      },
      onPointerLeave: (e: React.PointerEvent) => {
        handlePointerLeave(e);
        const childProps = children.props as {
          onPointerLeave?: (e: React.PointerEvent) => void;
        };
        childProps?.onPointerLeave?.(e);
      },
      onFocus: (e: React.FocusEvent) => {
        handleFocus();
        const childProps = children.props as {
          onFocus?: (e: React.FocusEvent) => void;
        };
        childProps?.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent) => {
        handleBlur();
        const childProps = children.props as {
          onBlur?: (e: React.FocusEvent) => void;
        };
        childProps?.onBlur?.(e);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        handleKeyDown(e);
        const childProps = children.props as {
          onKeyDown?: (e: React.KeyboardEvent) => void;
        };
        childProps?.onKeyDown?.(e);
      },
      "aria-describedby": isOpen ? tooltipId : undefined,
    },
  );

  return (
    <div className="relative inline-flex items-center justify-center">
      {trigger}
      <div
        id={tooltipId}
        role="tooltip"
        aria-hidden={!isOpen}
        style={{
          margin:
            side === "top"
              ? `0 0 ${sideOffset}px 0`
              : side === "bottom"
                ? `${sideOffset}px 0 0 0`
                : undefined,
        }}
        className={`pointer-events-none absolute z-50 select-none whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-medium tracking-tight transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${positionClasses} ${motionClasses} bg-[#161618]/95 text-white border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-md dark:bg-white/95 dark:text-[#09090b] dark:border-black/[0.08] dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)] ${className}`}
      >
        {content}
        {/* Curved Organic Pointer */}
        <CurvedPointer side={side} />
      </div>
    </div>
  );
}

export default Tooltip;
