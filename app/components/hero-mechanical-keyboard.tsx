"use client";

import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
}

// ─── Customization Types ───────────────────────────────────────────────────────

interface KeyConfigItem {
  id: string;
  label: string;
  sub?: string;
  w?: number; // Width in units (1.0 = standard 1U)
  a?: boolean; // Accent keycap
  bump?: boolean; // Homing tactile bump
}

const KEYBOARD_CONFIG = {
  // ── Colors ────────────────────────────────────────────────────────────────
  colors: {
    keycap: "#f3f4f7", // Primary PBT keycap color
    accent: "#e6511b", // Accent keycaps, cable, and power switch
    chassis: "#d0d2d7", // CNC aluminum case body
    chassisHighlight: "#eceff6", // Chamfer light reflection
    plate: "#0c0d10", // Switch plate floor
    knob: "#18191c", // Machined rotary knobs
    displayBezel: "#08090b", // Smart display outer bezel
    pageBackground: "#ffffff", // Page / canvas background
    keyLegend: "#111215", // Deep high-contrast crisp legend text
    keySubLegend: "#3f444e", // Rich legible sub-label text
    accentLegend: "#ffffff", // Legend text on accent keys
  },

  // ── Keycap Styles ─────────────────────────────────────────────────────────
  keycaps: {
    unitSize: 0.228, // Base key width unit (U)
    gap: 0.004, // Space between adjacent keycaps
    height: 0.046, // Profile height
    dishDepth: 0.012, // Spherical dish depression
    pressTravel: 0.006, // Key depression depth when pressed
    roughness: 0.42,
    metalness: 0.03,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Roboto, sans-serif",
  },

  // ── Accent Keys ───────────────────────────────────────────────────────────
  accents: {
    cableColor: "#e6511b", // Braided rear USB-C cable
    switchColor: "#e6511b", // Top-left power switch
  },

  // ── Knob Styles ───────────────────────────────────────────────────────────
  knobs: {
    topZ: -0.552, // Position along Z axis
    bottomZ: -0.37,
    initialAngleTop: 0.75, // Starting angle (radians)
    initialAngleBottom: -0.48,
    radius: 0.082,
    height: 0.054,
    finWidth: 0.144, // Raised pointer fin dimensions
    finHeight: 0.026,
    finLength: 0.022,
    roughness: 0.48,
    metalness: 0.38,
  },

  // ── Display ───────────────────────────────────────────────────────────────
  display: {
    width: 0.176,
    height: 0.58,
    depthOffset: 0.124, // Z position aligned with Row 3
    defaultMode: "clock" as "clock" | "custom",
    customText: "SERENITY",
    gradientTop: "#e65500", // Top glowing amber accent
    gradientBottom: "#ffffff", // Base white
    capsuleStroke: "rgba(255, 106, 0, 0.85)", // Capsule glow outline
    timeColor: "#ffffff",
    dateColor: "#d2e82e", // LCD lime accent
  },

  // ── Key Labels & Layout (6 Rows) ──────────────────────────────────────────
  layout: [
    // Row 0: Function Row
    [
      { id: "esc", label: "esc", w: 1.35, a: true },
      { id: "f1", label: "F1", sub: "☼-" },
      { id: "f2", label: "F2", sub: "☼+" },
      { id: "f3", label: "F3", sub: "⊞" },
      { id: "f4", label: "F4", sub: "☷" },
      { id: "f5", label: "F5", sub: "⌨-" },
      { id: "f6", label: "F6", sub: "⌨+" },
      { id: "f7", label: "F7", sub: "◁◁" },
      { id: "f8", label: "F8", sub: "▷‖" },
      { id: "f9", label: "F9", sub: "▷▷" },
      { id: "f10", label: "F10", sub: "🔇" },
      { id: "f11", label: "F11", sub: "🔈" },
      { id: "f12", label: "F12", sub: "🔊" },
      { id: "del", label: "del", w: 1.4 },
    ],
    // Row 1: Number Row
    [
      { id: "grav", label: "`", sub: "~", w: 1.0 },
      { id: "k1", label: "1", sub: "!" },
      { id: "k2", label: "2", sub: "@" },
      { id: "k3", label: "3", sub: "#" },
      { id: "k4", label: "4", sub: "$" },
      { id: "k5", label: "5", sub: "%" },
      { id: "k6", label: "6", sub: "^" },
      { id: "k7", label: "7", sub: "&" },
      { id: "k8", label: "8", sub: "*" },
      { id: "k9", label: "9", sub: "(" },
      { id: "k0", label: "0", sub: ")" },
      { id: "min", label: "-", sub: "_" },
      { id: "equ", label: "=", sub: "+" },
      { id: "bsp", label: "backspace", w: 1.75 },
    ],
    // Row 2: QWERTY Row
    [
      { id: "tab", label: "tab", w: 1.5 },
      { id: "q", label: "Q" },
      { id: "w", label: "W" },
      { id: "e", label: "E" },
      { id: "r", label: "R" },
      { id: "t", label: "T" },
      { id: "y", label: "Y" },
      { id: "u", label: "U" },
      { id: "i", label: "I" },
      { id: "o", label: "O" },
      { id: "p", label: "P" },
      { id: "lb", label: "{", sub: "[" },
      { id: "rb", label: "}", sub: "]" },
      { id: "bsl", label: "\\", sub: "|", w: 1.25 },
    ],
    // Row 3: Home Row
    [
      { id: "caps", label: "caps", w: 1.75 },
      { id: "a", label: "A" },
      { id: "s", label: "S" },
      { id: "d", label: "D" },
      { id: "f", label: "F", bump: true },
      { id: "g", label: "G" },
      { id: "h", label: "H" },
      { id: "j", label: "J", bump: true },
      { id: "k", label: "K" },
      { id: "l", label: "L" },
      { id: "sem", label: ";", sub: ":" },
      { id: "quo", label: "'", sub: '"' },
      { id: "enter", label: "↵", w: 2.0 },
    ],
    // Row 4: Shift Row
    [
      { id: "lsh", label: "shift", w: 2.25 },
      { id: "z", label: "Z" },
      { id: "x", label: "X" },
      { id: "c", label: "C" },
      { id: "v", label: "V" },
      { id: "b", label: "B" },
      { id: "n", label: "N" },
      { id: "m", label: "M" },
      { id: "com", label: ",", sub: "<" },
      { id: "per", label: ".", sub: ">" },
      { id: "sla", label: "/", sub: "?" },
      { id: "rsh", label: "shift", w: 1.5 },
      { id: "up", label: "", a: true, w: 1.0, bump: true },
    ],
    // Row 5: Bottom Row
    [
      { id: "ctrl", label: "ctrl", sub: "⌃", w: 1.25 },
      { id: "fn1", label: "fn", w: 1.0 },
      { id: "lalt", label: "alt", sub: "⌥", w: 1.25 },
      { id: "cmd", label: "⌘", w: 1.25 },
      { id: "space", label: "", w: 6.0 },
      { id: "ralt", label: "alt", sub: "⌥", w: 1.0 },
      { id: "fn2", label: "fn", w: 1.0 },
      { id: "left", label: "", a: true, w: 1.0 },
      { id: "down", label: "", a: true, w: 1.0 },
      { id: "right", label: "", a: true, w: 1.0 },
    ],
  ] as KeyConfigItem[][],

  // ── Sound ─────────────────────────────────────────────────────────────────
  sound: {
    enabled: true,
    volume: 0.4, // Master keyclick volume (0 to 1)
    pitchVariation: 0.06, // Random pitch variation for natural typing feel
  },

  // ── Other Visual Settings ─────────────────────────────────────────────────
  visuals: {
    deskShadowOpacity: 0.32,
    chassisCornerRadius: 0.036,
    cameraFov: 26,
    cameraDistance: 4.18,
    lighting: {
      keyIntensity: 1.65,
      keyColor: "#fffaf5",
      fillIntensity: 0.6,
      fillColor: "#cce0fc",
      rimIntensity: 0.28,
      rimColor: "#ffe8d8",
      accentIntensity: 0.5,
      accentColor: "#f0f4fc",
      ambientIntensity: 0.58,
      ambientColor: "#eef1f8",
    },
  },
};

// ─── Component Types ──────────────────────────────────────────────────────────

interface KeyDefinition {
  id: string;
  label: string;
  subLabel?: string;
  col: number;
  row: number;
  wUnits: number;
  width: number;
  depth: number;
  isAccent?: boolean;
  hasHomingBump?: boolean;
}

interface MechanicalKeyboardProps {
  keycapColor?: string;
  accentColor?: string;
  interactive?: boolean;
  displayContent?: "clock" | "custom";
  customDisplayText?: string;
  typingInteraction?: boolean;
}

// ─── Derived Proportions ──────────────────────────────────────────────────────

const U = KEYBOARD_CONFIG.keycaps.unitSize;
const KEY_GAP = KEYBOARD_CONFIG.keycaps.gap;
const CHASSIS_THICK = 0.04;
const WELL_DEPTH = 0.012;
const WELL_PAD = 0.012;

const COLS_MAIN = 14.75;
const COLS_EXT = 15.75;
const ROWS = 6.0;
const RIM_LEFT = 0.068;
const RIM_RIGHT = 0.068;
const RIM_TOP = 0.068;
const RIM_BOT = 0.068;

const DISPLAY_W = KEYBOARD_CONFIG.display.width;
const DISPLAY_H = KEYBOARD_CONFIG.display.height;
const DISPLAY_Z = KEYBOARD_CONFIG.display.depthOffset;

const KEY_WELL_MAIN_W = COLS_MAIN * U + WELL_PAD * 2;
const KEY_WELL_EXT_W = COLS_EXT * U + WELL_PAD * 2;
const KEY_WELL_D = ROWS * U + WELL_PAD * 2;

const CHASSIS_W = RIM_LEFT + KEY_WELL_EXT_W + RIM_RIGHT;
const CHASSIS_D = RIM_TOP + KEY_WELL_D + RIM_BOT;

const CHASSIS_TOP_Y = 0.026;
const PLATE_Y = CHASSIS_TOP_Y - WELL_DEPTH;

const KW_X1 = -CHASSIS_W / 2 + RIM_LEFT;
const KW_MAIN_X2 = KW_X1 + KEY_WELL_MAIN_W;
const KW_EXT_X2 = KW_X1 + KEY_WELL_EXT_W;
const KW_Z1 = -KEY_WELL_D / 2;

const RIGHT_PANEL_X = KW_X1 + WELL_PAD + 15.25 * U;
const DISPLAY_X = RIGHT_PANEL_X + 0.015;

function buildKeyboardLayout(): KeyDefinition[] {
  const keys: KeyDefinition[] = [];

  KEYBOARD_CONFIG.layout.forEach((rowDefs, r) => {
    let curX = 0;
    for (const d of rowDefs) {
      const wUnits = d.w ?? 1.0;
      const keyW = wUnits * U - KEY_GAP;
      const keyD = U - KEY_GAP;
      keys.push({
        id: d.id,
        label: d.label,
        subLabel: d.sub,
        col: curX,
        row: r,
        wUnits,
        width: keyW,
        depth: keyD,
        isAccent: !!d.a,
        hasHomingBump: !!d.bump,
      });
      curX += wUnits * U;
    }
  });

  return keys;
}

const KEY_DEFINITIONS = buildKeyboardLayout();
const KEY_DEF_MAP = new Map<string, KeyDefinition>(
  KEY_DEFINITIONS.map((d) => [d.id, d]),
);

function getKeyDisplayName(id: string): { label: string; isAccent: boolean } {
  const def = KEY_DEF_MAP.get(id);
  const isAccent = !!def?.isAccent;

  switch (id) {
    case "space":
      return { label: "space", isAccent };
    case "up":
      return { label: "↑", isAccent };
    case "down":
      return { label: "↓", isAccent };
    case "left":
      return { label: "←", isAccent };
    case "right":
      return { label: "→", isAccent };
    case "enter":
      return { label: "↵", isAccent };
    case "bsp":
      return { label: "⌫", isAccent };
    case "tab":
      return { label: "⇥", isAccent };
    case "cmd":
      return { label: "⌘", isAccent };
    case "lalt":
    case "ralt":
      return { label: "⌥", isAccent };
    case "ctrl":
      return { label: "⌃", isAccent };
    case "lsh":
    case "rsh":
      return { label: "⇧", isAccent };
    case "esc":
      return { label: "esc", isAccent: true };
    default:
      return { label: def?.label || id.toUpperCase(), isAccent };
  }
}

// ─── Live Keystroke Display ───────────────────────────────────────────────────

function KeystrokeDisplay({
  activeKeys,
  hasInteracted,
  keycapColor = KEYBOARD_CONFIG.colors.keycap,
  accentColor = KEYBOARD_CONFIG.colors.accent,
}: {
  activeKeys: Set<string>;
  hasInteracted: boolean;
  keycapColor?: string;
  accentColor?: string;
}) {
  const keys = Array.from(activeKeys);
  const isKeyActive = keys.length > 0;
  const showPrompt = !hasInteracted && !isKeyActive;

  if (showPrompt) {
    return (
      <span
        style={{
          opacity: 1,
          pointerEvents: "none",
          fontFamily: KEYBOARD_CONFIG.keycaps.fontFamily,
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: "0.01em",
          color: "var(--text-muted, #a1a1aa)",
          transition:
            "opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        Press any key
      </span>
    );
  }

  return (
    <div
      style={{
        transform: isKeyActive
          ? "translateY(0) scale(1)"
          : "translateY(4px) scale(0.96)",
        opacity: isKeyActive ? 1 : 0,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        transition:
          "opacity 0.12s ease, transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {keys.map((id) => {
        const { label, isAccent } = getKeyDisplayName(id);
        const bg = isAccent ? accentColor : keycapColor;
        const color = isAccent
          ? KEYBOARD_CONFIG.colors.accentLegend
          : KEYBOARD_CONFIG.colors.keyLegend;
        const edgeColor = isAccent ? "rgba(0, 0, 0, 0.2)" : "#cfd2d8";

        return (
          <div
            key={id}
            style={{
              height: 30,
              minWidth: 30,
              padding: "0 9px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: bg,
              color,
              borderRadius: 6,
              fontFamily: KEYBOARD_CONFIG.keycaps.fontFamily,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.02em",
              boxShadow: `0 2px 0 ${edgeColor}, 0 2px 5px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, ${isAccent ? 0.3 : 0.9})`,
              border: `1px solid ${isAccent ? "rgba(0, 0, 0, 0.12)" : "rgba(0, 0, 0, 0.06)"}`,
              transform: "translateY(1px)",
              userSelect: "none",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

// ─── Keycap Texture & Dish Shading (Aspect-Aware, Crisp SF Typography) ────────

function drawVisualCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
) {
  const metrics = ctx.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent ?? 0;
  const descent = metrics.actualBoundingBoxDescent ?? 0;
  const visualOffset = (ascent - descent) / 2;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, centerX, centerY + visualOffset);
}

const keyTextureCache = new Map<string, THREE.CanvasTexture>();

function getKeyTexture(
  id: string,
  label: string,
  subLabel: string | undefined,
  isAccent: boolean,
  accentColor: string,
  keycapColor: string,
  aspectRatio: number,
  hasHomingBump?: boolean,
): THREE.CanvasTexture {
  const cacheKey = `${id}_${label}_${subLabel}_${isAccent}_${accentColor}_${keycapColor}_${aspectRatio.toFixed(2)}_${hasHomingBump}_v14`;
  if (keyTextureCache.has(cacheKey)) return keyTextureCache.get(cacheKey)!;

  const SW = Math.round(512 * Math.max(1, aspectRatio));
  const SH = 512;
  const canvas = document.createElement("canvas");
  canvas.width = SW;
  canvas.height = SH;
  const ctx = canvas.getContext("2d")!;

  const baseColor = isAccent ? accentColor : keycapColor;

  // 1. Solid authentic matte PBT base color
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, SW, SH);

  // 2. Ultra-fine molded PBT plastic pebble micro-grain
  ctx.globalAlpha = 0.016;
  for (let y = 0; y < SH; y += 4) {
    for (let x = 0; x < SW; x += 4) {
      const n = (x * 17 + y * 37) % 7;
      if (n === 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, 2, 2);
      } else if (n === 1) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }
  ctx.globalAlpha = 1.0;

  // 3. Molded inner bevel contour & spherical concave dish matching reference photo
  const marginX = SW * 0.125;
  const marginY = SH * 0.125;
  const bevelW = SW - marginX * 2;
  const bevelH = SH - marginY * 2;
  const bevelR = Math.min(84, bevelW * 0.26, bevelH * 0.26);

  ctx.save();
  // Soft ambient shading around inner bevel perimeter
  ctx.lineWidth = 10;
  ctx.strokeStyle = isAccent ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.048)";
  ctx.beginPath();
  ctx.roundRect(marginX, marginY, bevelW, bevelH, bevelR);
  ctx.stroke();

  // Subtle rear/top bevel drop shadow (defines the recessed top slope)
  const gradTop = ctx.createLinearGradient(0, marginY - 4, 0, marginY + 38);
  gradTop.addColorStop(0, isAccent ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.075)");
  gradTop.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradTop;
  ctx.beginPath();
  ctx.roundRect(marginX, marginY - 2, bevelW, 40, bevelR);
  ctx.fill();

  // Luminous front/bottom inner bevel rim highlight (soft specular reflection)
  const gradBot = ctx.createLinearGradient(
    0,
    marginY + bevelH - 30,
    0,
    marginY + bevelH + 6,
  );
  gradBot.addColorStop(0, "rgba(255,255,255,0)");
  gradBot.addColorStop(
    1,
    isAccent ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.48)",
  );
  ctx.fillStyle = gradBot;
  ctx.beginPath();
  ctx.roundRect(marginX, marginY + bevelH - 30, bevelW, 36, bevelR);
  ctx.fill();

  // Soft spherical center dish scoop (subtle radial depth)
  const radGrad = ctx.createRadialGradient(
    SW / 2,
    SH / 2,
    24,
    SW / 2,
    SH / 2,
    SW * 0.44,
  );
  radGrad.addColorStop(0, isAccent ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.022)");
  radGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, SW, SH);
  ctx.restore();

  // Typographic legends
  const textColor = isAccent
    ? KEYBOARD_CONFIG.colors.accentLegend
    : KEYBOARD_CONFIG.colors.keyLegend;
  const subColor = isAccent
    ? "rgba(255,255,255,0.92)"
    : KEYBOARD_CONFIG.colors.keySubLegend;
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";

  const fontSans = KEYBOARD_CONFIG.keycaps.fontFamily;

  const isFunctionKey = /^F([1-9]|1[0-2])$/.test(label);
  const isModifierKey = ["ctrl", "alt"].includes(label.toLowerCase());

  if (isFunctionKey) {
    // Function keys: F-number centered in upper portion, media/system symbol below
    ctx.font = `600 50px ${fontSans}`;
    ctx.fillStyle = textColor;
    drawVisualCenteredText(ctx, label, SW / 2, SH * 0.37);

    if (label === "F10") {
      // F10 mute speaker with clean coral-red slash matching reference photo
      ctx.font = `600 40px ${fontSans}`;
      ctx.fillStyle = subColor;
      drawVisualCenteredText(ctx, "🔈", SW / 2, SH * 0.64);
      ctx.save();
      ctx.strokeStyle = "#e24838";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(SW / 2 - 16, SH * 0.64 - 16);
      ctx.lineTo(SW / 2 + 16, SH * 0.64 + 16);
      ctx.stroke();
      ctx.restore();
    } else if (subLabel) {
      ctx.font = `600 40px ${fontSans}`;
      ctx.fillStyle = label === "F11" || label === "F12" ? "#3b6a9e" : subColor;
      drawVisualCenteredText(ctx, subLabel, SW / 2, SH * 0.64);
    }
  } else if (isModifierKey && subLabel) {
    // Mac modifier keys (ctrl ⌃, alt ⌥): word in upper portion, symbol below
    ctx.font = `500 48px ${fontSans}`;
    ctx.fillStyle = textColor;
    drawVisualCenteredText(ctx, label, SW / 2, SH * 0.38);

    ctx.font = `600 44px ${fontSans}`;
    ctx.fillStyle = subColor;
    drawVisualCenteredText(ctx, subLabel, SW / 2, SH * 0.64);
  } else if (subLabel) {
    // Dual-legend keys (Numbers, Punctuation):
    // Primary characters/numbers centered in the upper portion, secondary symbols centered below
    ctx.font = `600 62px ${fontSans}`;
    ctx.fillStyle = textColor;
    drawVisualCenteredText(ctx, label, SW / 2, SH * 0.38);

    ctx.font = `600 48px ${fontSans}`;
    ctx.fillStyle = subColor;
    drawVisualCenteredText(ctx, subLabel, SW / 2, SH * 0.64);
  } else if (
    [
      "shift",
      "ctrl",
      "alt",
      "caps",
      "backspace",
      "tab",
      "del",
      "fn",
      "esc",
    ].includes(label.toLowerCase())
  ) {
    const size = label.length > 5 ? 42 : 46;
    ctx.font = `500 ${size}px ${fontSans}`;
    ctx.fillStyle = textColor;
    drawVisualCenteredText(ctx, label, SW / 2, SH * 0.5);
  } else if (label === "⌘") {
    ctx.font = `600 76px ${fontSans}`;
    ctx.fillStyle = textColor;
    drawVisualCenteredText(ctx, "⌘", SW / 2, SH * 0.5);
  } else if (label === "↵") {
    ctx.font = `600 74px ${fontSans}`;
    ctx.fillStyle = textColor;
    drawVisualCenteredText(ctx, "↵", SW / 2, SH * 0.5);
  } else if (label) {
    if (hasHomingBump) {
      // Homing keys (F & J): letter matching standard letter size, tactile bar below
      ctx.font = `600 74px ${fontSans}`;
      ctx.fillStyle = textColor;
      drawVisualCenteredText(ctx, label, SW / 2, SH * 0.44);

      const barW = 52;
      const barH = 9;
      ctx.beginPath();
      ctx.roundRect(SW / 2 - barW / 2, SH * 0.73 - barH / 2, barW, barH, 4.5);
      ctx.fillStyle = textColor;
      ctx.fill();
    } else {
      // Standard single-letter keys (Q, W, E, R... A, S... Z...)
      ctx.font = `600 74px ${fontSans}`;
      ctx.fillStyle = textColor;
      drawVisualCenteredText(ctx, label, SW / 2, SH * 0.5);
    }
  } else if (hasHomingBump && isAccent) {
    // Tactile molded bar on the orange Up arrow key
    const barW = 48;
    const barH = 7.5;
    ctx.beginPath();
    ctx.roundRect(SW / 2 - barW / 2, SH * 0.5 - barH / 2, barW, barH, 3.5);
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(SW / 2 - barW / 2, SH * 0.5 + barH / 2 - 1, barW, 2, 1);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  keyTextureCache.set(cacheKey, texture);
  return texture;
}

// ─── Materials Hook ───────────────────────────────────────────────────────────

let knobGrainTexCache: THREE.CanvasTexture | null = null;
function getKnobGrainTexture(): THREE.CanvasTexture | null {
  if (knobGrainTexCache) return knobGrainTexCache;
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(256, 256);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = 120 + Math.floor(Math.random() * 20);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 16);
  knobGrainTexCache = tex;
  return knobGrainTexCache;
}

function useKeyboardMaterials(keycapColor?: string, accentColor?: string) {
  const kColor = keycapColor || KEYBOARD_CONFIG.colors.keycap;
  const aColor = accentColor || KEYBOARD_CONFIG.colors.accent;

  return useMemo(() => {
    const chassis = new THREE.MeshStandardMaterial({
      color: KEYBOARD_CONFIG.colors.chassis,
      metalness: 0.82,
      roughness: 0.24,
      envMapIntensity: 1.6,
    });

    const chamferHighlight = new THREE.MeshStandardMaterial({
      color: KEYBOARD_CONFIG.colors.chassisHighlight,
      metalness: 0.95,
      roughness: 0.1,
    });

    const plate = new THREE.MeshStandardMaterial({
      color: KEYBOARD_CONFIG.colors.plate,
      metalness: 0.05,
      roughness: 0.96,
    });

    const keySkirt = new THREE.MeshStandardMaterial({
      color: kColor,
      metalness: 0.01,
      roughness: 0.58,
    });

    const accentSkirt = new THREE.MeshStandardMaterial({
      color: aColor,
      metalness: 0.01,
      roughness: 0.58,
    });

    const grainTex = getKnobGrainTexture();
    const knob = new THREE.MeshStandardMaterial({
      color: KEYBOARD_CONFIG.colors.knob,
      metalness: KEYBOARD_CONFIG.knobs.metalness,
      roughness: KEYBOARD_CONFIG.knobs.roughness,
      bumpMap: grainTex,
      bumpScale: 0.00015,
      envMapIntensity: 1.1,
    });

    const bezel = new THREE.MeshStandardMaterial({
      color: KEYBOARD_CONFIG.colors.displayBezel,
      metalness: 0.2,
      roughness: 0.7,
    });

    return {
      chassis,
      chamferHighlight,
      plate,
      keySkirt,
      accentSkirt,
      knob,
      bezel,
    };
  }, [kColor, aColor]);
}

// ─── Base64 Mechanical Key Sound (Pure OGG Audio Buffer) ────────────────────

const KEY_SOUND_BASE64 =
  "T2dnUwACAAAAAAAAAABsztj5AAAAAMmilWYBHgF2b3JiaXMAAAAAAoC7AAAAAAAAgLUBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAbM7Y+QEAAACNU0bgET////////////////////8HA3ZvcmJpcwwAAABMYXZmNjEuNy4xMDABAAAAHwAAAGVuY29kZXI9TGF2YzYxLjE5LjEwMSBsaWJ2b3JiaXMBBXZvcmJpcyVCQ1YBAEAAACRzGCpGpXMWhBAaQlAZ4xxCzmvsGUJMEYIcMkxbyyVzkCGkoEKIWyiB0JBVAABAAACHQXgUhIpBCCGEJT1YkoMnPQghhIg5eBSEaUEIIYQQQgghhBBCCCGERTlokoMnQQgdhOMwOAyD5Tj4HIRFOVgQgydB6CCED0K4moOsOQghhCQ1SFCDBjnoHITCLCiKgsQwuBaEBDUojILkMMjUgwtCiJqDSTX4GoRnQXgWhGlBCCGEJEFIkIMGQcgYhEZBWJKDBjm4FITLQagahCo5CB+EIDRkFQCQAACgoiiKoigKEBqyCgDIAAAQQFEUx3EcyZEcybEcCwgNWQUAAAEACAAAoEiKpEiO5EiSJFmSJVmSJVmS5omqLMuyLMuyLMsyEBqyCgBIAABQUQxFcRQHCA1ZBQBkAAAIoDiKpViKpWiK54iOCISGrAIAgAAABAAAEDRDUzxHlETPVFXXtm3btm3btm3btm3btm1blmUZCA1ZBQBAAAAQ0mlmqQaIMAMZBkJDVgEACAAAgBGKMMSA0JBVAABAAACAGEoOogmtOd+c46BZDppKsTkdnEi1eZKbirk555xzzsnmnDHOOeecopxZDJoJrTnnnMSgWQqaCa0555wnsXnQmiqtOeeccc7pYJwRxjnnnCateZCajbU555wFrWmOmkuxOeecSLl5UptLtTnnnHPOOeecc84555zqxekcnBPOOeecqL25lpvQxTnnnE/G6d6cEM4555xzzjnnnHPOOeecIDRkFQAABABAEIaNYdwpCNLnaCBGEWIaMulB9+gwCRqDnELq0ehopJQ6CCWVcVJKJwgNWQUAAAIAQAghhRRSSCGFFFJIIYUUYoghhhhyyimnoIJKKqmooowyyyyzzDLLLLPMOuyssw47DDHEEEMrrcRSU2011lhr7jnnmoO0VlprrbVSSimllFIKQkNWAQAgAAAEQgYZZJBRSCGFFGKIKaeccgoqqIDQkFUAACAAgAAAAABP8hzRER3RER3RER3RER3R8RzPESVREiVREi3TMjXTU0VVdWXXlnVZt31b2IVd933d933d+HVhWJZlWZZlWZZlWZZlWZZlWZYgNGQVAAACAAAghBBCSCGFFFJIKcYYc8w56CSUEAgNWQUAAAIACAAAAHAUR3EcyZEcSbIkS9IkzdIsT/M0TxM9URRF0zRV0RVdUTdtUTZl0zVdUzZdVVZtV5ZtW7Z125dl2/d93/d93/d93/d93/d9XQdCQ1YBABIAADqSIymSIimS4ziOJElAaMgqAEAGAEAAAIriKI7jOJIkSZIlaZJneZaomZrpmZ4qqkBoyCoAABAAQAAAAAAAAIqmeIqpeIqoeI7oiJJomZaoqZoryqbsuq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq4LhIasAgAkAAB0JEdyJEdSJEVSJEdygNCQVQCADACAAAAcwzEkRXIsy9I0T/M0TxM90RM901NFV3SB0JBVAAAgAIAAAAAAAAAMybAUy9EcTRIl1VItVVMt1VJF1VNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVN0zRNEwgNWQkAkAEAkBBTLS3GmgmLJGLSaqugYwxS7KWxSCpntbfKMYUYtV4ah5RREHupJGOKQcwtpNApJq3WVEKFFKSYYyoVUg5SIDRkhQAQmgHgcBxAsixAsiwAAAAAAAAAkDQN0DwPsDQPAAAAAAAAACRNAyxPAzTPAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAA0DwP8DwR8EQRAAAAAAAAACzPAzTRAzxRBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAAsDwP8EQR0DwRAAAAAAAAACzPAzxRBDzRAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEOAAABBgIRQasiIAiBMAcEgSJAmSBM0DSJYFTYOmwTQBkmVB06BpME0AAAAAAAAAAAAAJE2DpkHTIIoASdOgadA0iCIAAAAAAAAAAAAAkqZB06BpEEWApGnQNGgaRBEAAAAAAAAAAAAAzzQhihBFmCbAM02IIkQRpgkAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAGHAAAAgwoQwUGrIiAIgTAHA4imUBAIDjOJYFAACO41gWAABYliWKAABgWZooAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAYcAAACDChDBQashIAiAIAcCiKZQHHsSzgOJYFJMmyAJYF0DyApgFEEQAIAAAocAAACLBBU2JxgEJDVgIAUQAABsWxLE0TRZKkaZoniiRJ0zxPFGma53meacLzPM80IYqiaJoQRVE0TZimaaoqME1VFQAAUOAAABBgg6bE4gCFhqwEAEICAByKYlma5nmeJ4qmqZokSdM8TxRF0TRNU1VJkqZ5niiKommapqqyLE3zPFEURdNUVVWFpnmeKIqiaaqq6sLzPE8URdE0VdV14XmeJ4qiaJqq6roQRVE0TdNUTVV1XSCKpmmaqqqqrgtETxRNU1Vd13WB54miaaqqq7ouEE3TVFVVdV1ZBpimaaqq68oyQFVV1XVdV5YBqqqqruu6sgxQVdd1XVmWZQCu67qyLMsCAAAOHAAAAoygk4wqi7DRhAsPQKEhKwKAKAAAwBimFFPKMCYhpBAaxiSEFEImJaXSUqogpFJSKRWEVEoqJaOUUmopVRBSKamUCkIqJZVSAADYgQMA2IGFUGjISgAgDwCAMEYpxhhzTiKkFGPOOScRUoox55yTSjHmnHPOSSkZc8w556SUzjnnnHNSSuacc845KaVzzjnnnJRSSuecc05KKSWEzkEnpZTSOeecEwAAVOAAABBgo8jmBCNBhYasBABSAQAMjmNZmuZ5omialiRpmud5niiapiZJmuZ5nieKqsnzPE8URdE0VZXneZ4oiqJpqirXFUXTNE1VVV2yLIqmaZqq6rowTdNUVdd1XZimaaqq67oubFtVVdV1ZRm2raqq6rqyDFzXdWXZloEsu67s2rIAAPAEBwCgAhtWRzgpGgssNGQlAJABAEAYg5BCCCFlEEIKIYSUUggJAAAYcAAACDChDBQashIASAUAAIyx1lprrbXWQGettdZaa62AzFprrbXWWmuttdZaa6211lJrrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmstpZRSSimllFJKKaWUUkoppZRSSgUA+lU4APg/2LA6wknRWGChISsBgHAAAMAYpRhzDEIppVQIMeacdFRai7FCiDHnJKTUWmzFc85BKCGV1mIsnnMOQikpxVZjUSmEUlJKLbZYi0qho5JSSq3VWIwxqaTWWoutxmKMSSm01FqLMRYjbE2ptdhqq7EYY2sqLbQYY4zFCF9kbC2m2moNxggjWywt1VprMMYY3VuLpbaaizE++NpSLDHWXAAAd4MDAESCjTOsJJ0VjgYXGrISAAgJACAQUooxxhhzzjnnpFKMOeaccw5CCKFUijHGnHMOQgghlIwx5pxzEEIIIYRSSsaccxBCCCGEkFLqnHMQQgghhBBKKZ1zDkIIIYQQQimlgxBCCCGEEEoopaQUQgghhBBCCKmklEIIIYRSQighlZRSCCGEEEIpJaSUUgohhFJCCKGElFJKKYUQQgillJJSSimlEkoJJYQSUikppRRKCCGUUkpKKaVUSgmhhBJKKSWllFJKIYQQSikFAAAcOAAABBhBJxlVFmGjCRcegEJDVgIAZAAAkKKUUiktRYIipRikGEtGFXNQWoqocgxSzalSziDmJJaIMYSUk1Qy5hRCDELqHHVMKQYtlRhCxhik2HJLoXMOAAAAQQCAgJAAAAMEBTMAwOAA4XMQdAIERxsAgCBEZohEw0JweFAJEBFTAUBigkIuAFRYXKRdXECXAS7o4q4DIQQhCEEsDqCABByccMMTb3jCDU7QKSp1IAAAAAAADADwAACQXAAREdHMYWRobHB0eHyAhIiMkAgAAAAAABcAfAAAJCVAREQ0cxgZGhscHR4fICEiIyQBAIAAAgAAAAAggAAEBAQAAAAAAAIAAAAEBE9nZ1MABAAeAAAAAAAAbM7Y+QIAAADfXWKKJ0Y6RkY+QkM6/yAyMzM0Mi8yPj89LzIwMj9DQEdHQz3/JP8N/wr/BIxK/qc+VSEzN9Sl5/76m597l9kvyBpz/M8mLubr+8/vn/95LNWn6eGnv/zslc10OG5z8uUff1VV7Tjf6zOS9+vXPif//7U0U6SRX6poMXxnTI8ImRHTnEPMWWfb6ezFRZOcuBbCySD3OhlIaRvriOUd8xpVH1J1ae+K6mpS5LsAhG/TOMG3so4a9gGGkvG536OFyqcsbr67t1JZj1MzzXKtTr/ThPvjt9328NrArbxeiPbbj98Jw4+XNuy+ptSvti3af37bFoTxpmB2S/OcQqIfYKFkzh8vgWLNYMlQfFrd5x/187+x57KWk6zI2x/zz88Prh/h+pRYoUNVy6rSvFdaWRbcUf5q80K8zkhU51aA3mtsCsg+ACMj6M8Avc7fY4v8lVro0GgJli+88MLT0wud5QudfsYYcZ8/Hi9kBz9/QrMMvvlyvNzdE4xt1El3azEqi3sBWgiHPXXI5/+t/hiFsR7eGj3LoyvG+8V5WdEO82CFE8H5wfRCFI+epaxLpW2uEm3apvkr3+m8AnR1jVQy/6XJUpf5HoApOqBnLwYuOb7M9DCmSIWBF8uX5ePLN/bTbNWuPpVaPj8tnBIvG70p1WmDdJs2VC/M8ROBHQBUbXJf+93ruKdegKGI/QFig7Vv7ZzMCY8y3YLOCi8+VY/FY2r84/rbZXGoKq6Rp7ibkkh3py/bezc40goee4lmyXm5VMePmslseV96ZKaMy0NWEdeGvwAAZ+/vivR295LRSDFmVRWpiOLWnNYZNvY+23fSiF087cfnk5rWhl8Plfm2z93mXw67/sQjHs6t3U264befVlx9mSRvtN3yekj/y6IWYz+Vs5ejLm6sjjP3bWacV3JPd5yKEZz0tE9f+yF5hvgFyiJf5mOxKzBL7IIEzPTwJl2R0RgRM+fZSYQLqq1BRwvbXIans65xXs+xR039r07apl4vzdxvQ/Zk1XQzFD3ZftVAQbopcyH1EiKR85mhp0cZSLt4Mhxy9NHBVaZppVtgSduUpaSv6rYox6B4L+v7CwOpfVK2VdVo1J5CtFj2hdjR7E4kAwe7iBLCCVUvZ8UV+g7YqgosZTt5FM3Z1lw9AJEy/8nPgPefVmdLNjS/ru47/0ZxEGQ97zpx0fJCjMKaNR9tN8WCBwxLU1MMunTTTSX1ADTMDPAP9AVcosz8g5lMBkYx5Hry3n9nTt65GJqx4jUdYybGvHTABwzRkgir5xuuk/cDjFB+ulpaeO+b539/WIum/b+MU+9Rfk2U/mpmzmx2t5ihFY9wqC8IAAzdNF4ZXDIO1VcfoIFq7WWA19suWVfXJqx/PE33ecZtrua/w1TeWuDR68/23tHPtm/j2Tf01lbkH+UTtvL+yAMQhgp8ePkE3pHOMM2pzE15C5oPS2xHHkra8jwLiEO1zARPbnN1AyTVeCMTpe9JmnsAIkECm28F/H1T+hUxt6dWA2vBWSXlzlg1YF2+8WsDDLXIDfsDLGEr7+x/2YY61w9ApPouN7D+NmAt15+vO9cMd6ydEz/uOcE9k29SWH95+y7mh29o9Qg0WVBOfk8YYRv9Ufcf7asrTR8pJZXtXvLst2976qnz9OPauFyuz/F+1nt+/e5Cd/1e3xrpFwmvz8186ywDDTRfFGS8JAtPtj7rvbe5EnssjJiMqwWfdk1vLbudl2BpyiuWpyc95tVq5cnyQhlsqrl6qTd9PDrx8QuqqbSrBTTZRG2keNqV9a3zH7+47ObDiMdUPGM3J4t/36p3vZi5Wu0/rrNOr1On/jVFv7tY6LZV0rdUZrkCVH1p2gY0YXv/kSIccz74ASBi9cskLe796YuB61Mjse4CByKqiUDRh6c/stgrfD+L6dMoeAxTrvL4l62V9FsPQKMMXF1ZoND18WeFtlz9mzVdzPh4fcsxco2mPMfc+GrxI5fGGJ8C/Fgh8FO5lK2kz/oARCpw3foAc2YODg2ztnN7hZy16s41YlK+X2Vsn48dBhbiAmoADFvo44/DtYRT4Tw97AVIKgBPTaCvOx5NudsWZvP01pA71FI3+2TvwYu2Pmg+prIfsgIES3Q09xiHwp/8AVpaJPwBB3CRHscHQu9Be7afR9I7F8tjPfdjek6fi9d/Gq3hi+BaVGItvgw6nbRtwZ/XLwAERdSSLluuMMQvQJMRzNd5QEt+b5vUCVdtk5eGpNqLwx/3z9t5f23Vz79zV1cqqVPXVPOTaFvffBmT1xlatcKyOccJXF8Ja0pXWNa3xve13WqFzIYiCdU7d9LLtHVqsejtvegvl02yPKduz3veWvM+8deVZtlEO2E9HOtv65GrgYIAAExf2biNXJ1nEU15AQYSVjvfQNO6zd7eGd0GMbMZB6+3+Hr6i97q62f3TL8/WLjekG5F2zb++Tvvz1XSMqMrm5I2v/5YMoQCVOkW4Oddjc2WJSloD0AzsECPp4Nzn3k1sGveSuR+g4KrHovlyuW+aA6xdTfpbaSKSm+WvbnvPuT//yvtU2/25Krhbr4ibAE0Y118YgqT0fwvwMIwdw8rwPIYx8/WRVNj4+eczFN7UGG77UotNvPtdu+8KjlzrNqpfoRfNanmr39WSdVHANaOq4MeROlg99FPOtR90g/QdkWBd+wEt0u7vjroCbqr1t3+/PH43luj9GeuuL5VK/o3EEaP5ztUp5Uw2NcKqmXFANppdeO88ALL/DCSa5imest+xoSikhZZaWpEvo5/++K/fmWyOB7KuGnd9DH6t8Xzm6vLMe+jDxeej3wU+imzZHDMuYZkUxUBieS7O9ea0M7zmKB7sME4p/sq31veM6auHUZG3u/TvZ+z/sOsPfaP11vxX+9pvno89sE+88bcuiGinilgKOKTj2dAppFbLhmRHB+ls25PA4Bpsi4YVYK3X2MRYD6UMs1b751eMgCo6Z2fJ1Esa83DVDrFZBTmnRhBT98vfx9TVS0G5/1+avb1Z8uIS68V0qhZOgMW4qkonU4z2RYa9AFEfbG4Ja/rBGSTg3rJ0gKQLK+LkbdIubziPer97aPKz6p+gSb1XoEUWcxVQH87YBcAh7DreLAXeYklhswFAJ65rOOY0sVl2Z+yImqIbmbbsi29CeHSt7VSS+3oLwAATbJGjkanaRZLqgGViwC83lsAuVv+2J2artCj5ZWLLLl9w66Z+L81S3Zia1ssFzafev789Prj+rCa5cPr68O8zYz7+H7Lr927rMYAlKZq4Zp49zBUAUBdfZlPj5+o17f+drbM7aiyPv6hzAlOf5vrDye1FQo5eT/1dtZnLwYAoabjnA6Lkxw4mf7v7WHCrDxXG0y6N7lGHK97e1V1BaZw5IjAxBfUFUXTqYjOWzrALvoskyPPxe0RJVdNSwisMBJaPjfo+50NrZLY6RDmMfCVReTtvSJij1yDkLjt7RcclEAAoI+RAAftFKbZHh4+yazLGQ9BZHYq1Bgzqctxi2iIzmv0iuTa4cd+vV9++E8A8GBHODlGzxIq50qEIoVcsfm5f6l4rdDbTsh7H/fP/SeEosNETLVhD44vkqmni6WRB1217YV6w4zPposf71Lvy10NFIJl5vCJBYcBYJ/ce7O/LCZzw6j9tjn1fhk15pgAqz37ztn79n411mdSw5ivH69jsce5cwBFQpX8b3BkFSQ9PURxW0llZZxAQcaBgUK7Ot0wnPu4/HZRISyQBZZ1KTm8zLYB4Xl7nA39qJcAcXezAA6VkWav6iuJkxyAzbDPEc7CjmxHIWABwvrrlQVAMm+ikx13Zt8CBjDeJss2FUOgzYvHAA4AnrY8lxvQb/Q+DEXU8ePdcnv9gJg7LovmGHR1/Pg8i6cvT1hA4fhRWKKemTQWc9VQCEIAbDc32v2z1f5B09NKvxdC9/JhsnI08lFn7fpsKmHw4NFT44/fenzosq8/bCfLpraSgOIIB/EoTipLb+Nl7Yz1r3/NOsAc8zS9D69XzXzbB3o63bsrzxvduysLIIsoFPO8zfSApuRzuYeenmaeofcZFYqTO3IzzT7s6uF5u/6Pr5u8s8gCyI4+X13V1CMLppln+9mlMeS+R8J9ROWW+SAA1D1S5VYev8rySO6feiSnHjiAdg3P5V1XBnRLmWzm0xcUBkbrY2QBuF8eABhQUNiyAQ==";

let audioCtx: AudioContext | null = null;
let keyAudioBuffer: AudioBuffer | null = null;
let isDecodingAudio = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function initKeyAudioBuffer(
  ctx: AudioContext,
  onReady?: (buf: AudioBuffer) => void,
) {
  if (keyAudioBuffer) {
    if (onReady) onReady(keyAudioBuffer);
    return;
  }
  if (isDecodingAudio) return;
  isDecodingAudio = true;
  try {
    const binary = atob(KEY_SOUND_BASE64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    ctx.decodeAudioData(
      bytes.buffer.slice(0),
      (buffer) => {
        keyAudioBuffer = buffer;
        isDecodingAudio = false;
        if (onReady) onReady(buffer);
      },
      () => {
        isDecodingAudio = false;
      },
    );
  } catch {
    isDecodingAudio = false;
  }
}

let masterGainNode: GainNode | null = null;
const activeKeyVoices: AudioBufferSourceNode[] = [];
let lastKeySoundTime = 0;
let lastKeySoundId = "";

function getMasterGain(ctx: AudioContext): GainNode {
  if (!masterGainNode || masterGainNode.context !== ctx) {
    masterGainNode = ctx.createGain();
    masterGainNode.gain.value = KEYBOARD_CONFIG.sound.volume;
    masterGainNode.connect(ctx.destination);
  }
  return masterGainNode;
}

function playKeySound(keyId?: string) {
  if (!KEYBOARD_CONFIG.sound.enabled) return;
  const now = performance.now();
  if (keyId && keyId === lastKeySoundId && now - lastKeySoundTime < 35) {
    return;
  }
  lastKeySoundId = keyId || "";
  lastKeySoundTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const master = getMasterGain(ctx);

    const play = (buffer: AudioBuffer) => {
      // Keep max 5 concurrent voices to prevent audio thread starvation
      while (activeKeyVoices.length >= 5) {
        const oldest = activeKeyVoices.shift();
        try {
          oldest?.stop();
          oldest?.disconnect();
        } catch {}
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value =
        1.0 -
        KEYBOARD_CONFIG.sound.pitchVariation / 2 +
        Math.random() * KEYBOARD_CONFIG.sound.pitchVariation;

      source.connect(master);
      source.onended = () => {
        const idx = activeKeyVoices.indexOf(source);
        if (idx !== -1) activeKeyVoices.splice(idx, 1);
      };
      activeKeyVoices.push(source);
      source.start();
    };

    if (keyAudioBuffer) {
      play(keyAudioBuffer);
    } else {
      initKeyAudioBuffer(ctx, play);
    }
  } catch {}
}


const KEY_MAP: Record<string, string> = {
  Escape: "esc",
  Backspace: "bsp",
  Tab: "tab",
  Enter: "enter",
  Space: "space",
  " ": "space",
  CapsLock: "caps",
  ShiftLeft: "lsh",
  ShiftRight: "rsh",
  ControlLeft: "ctrl",
  ControlRight: "ctrl",
  AltLeft: "lalt",
  AltRight: "ralt",
  MetaLeft: "cmd",
  MetaRight: "cmd",
  ArrowUp: "up",
  ArrowLeft: "left",
  ArrowDown: "down",
  ArrowRight: "right",
  Delete: "del",
  Digit1: "k1",
  Digit2: "k2",
  Digit3: "k3",
  Digit4: "k4",
  Digit5: "k5",
  Digit6: "k6",
  Digit7: "k7",
  Digit8: "k8",
  Digit9: "k9",
  Digit0: "k0",
  Backquote: "grav",
  Minus: "min",
  Equal: "equ",
  BracketLeft: "lb",
  BracketRight: "rb",
  Backslash: "bsl",
  Semicolon: "sem",
  Quote: "quo",
  Comma: "com",
  Period: "per",
  Slash: "sla",
};

// ─── Contact Shadow Texture Cache ───────────────────────────────────────────

let knobContactShadowTexCache: THREE.CanvasTexture | null = null;
function getKnobContactShadowTexture(): THREE.CanvasTexture | null {
  if (knobContactShadowTexCache) return knobContactShadowTexCache;
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const rad = ctx.createRadialGradient(64, 64, 18, 64, 64, 62);
  rad.addColorStop(0, "rgba(0, 0, 0, 0.95)");
  rad.addColorStop(0.35, "rgba(0, 0, 0, 0.70)");
  rad.addColorStop(0.65, "rgba(0, 0, 0, 0.25)");
  rad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, 128, 128);
  knobContactShadowTexCache = new THREE.CanvasTexture(canvas);
  return knobContactShadowTexCache;
}

// ─── Procedural Sculpted Keycap Geometry Generator ───────────────────────────
// Creates a tall, sculpted mechanical keycap with drafted side walls,
// generous continuous top bevel, and smooth concave dish matching target reference.

function getRoundedRectPoints(
  w: number,
  d: number,
  r: number,
  count: number = 48,
): THREE.Vector2[] {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;
  const kr = Math.max(0.002, Math.min(r, hw * 0.45, hd * 0.45));
  shape.moveTo(-hw + kr, hd);
  shape.lineTo(hw - kr, hd);
  shape.quadraticCurveTo(hw, hd, hw, hd - kr);
  shape.lineTo(hw, -hd + kr);
  shape.quadraticCurveTo(hw, -hd, hw - kr, -hd);
  shape.lineTo(-hw + kr, -hd);
  shape.quadraticCurveTo(-hw, -hd, -hw, -hd + kr);
  shape.lineTo(-hw, hd - kr);
  shape.quadraticCurveTo(-hw, hd, -hw + kr, hd);
  const pts = shape.getSpacedPoints(count);
  return pts.slice(0, count);
}

const sculptedGeoCache = new Map<string, THREE.BufferGeometry>();

function getSculptedKeycapGeometry(w: number, d: number): THREE.BufferGeometry {
  const key = `${w.toFixed(4)}_${d.toFixed(4)}_v9`;
  if (sculptedGeoCache.has(key)) return sculptedGeoCache.get(key)!;

  const H = 0.044; // Low-profile molded PBT keycap height matching reference
  const isWide = w / d > 1.4;
  const numPerimeter = Math.max(48, Math.round(48 * ((w + d) / (2 * U))));

  // ─── Complete 4-Sided Sculpted Mechanical Keycap Profile ───────────────────
  // Matches reference: chunky softly-rounded sides, generous all-around bevel, concave dish
  const rings = [
    // 1. Drafted Side Walls (inward taper from base up)
    { y: H * 0.0, s: 1.0, rS: 1.0 }, // Ring 0: Base footprint
    { y: H * 0.22, s: 0.972, rS: 1.02 }, // Ring 1: Lower skirt
    { y: H * 0.5, s: 0.94, rS: 1.06 }, // Ring 2: Mid skirt
    { y: H * 0.7, s: 0.906, rS: 1.12 }, // Ring 3: Upper shoulder fillet starts

    // 2. Outer Rounded Edge (Crown Rim)
    { y: H * 0.88, s: 0.87, rS: 1.18 }, // Ring 4: Outer bevel curve
    { y: H * 0.97, s: 0.838, rS: 1.24 }, // Ring 5: Outer bevel crest
    { y: H * 1.0, s: 0.808, rS: 1.28 }, // Ring 6: Outer top rim peak (highest point)

    // 3. Inner Bevel (All 4 sides)
    { y: H * 0.91, s: 0.748, rS: 1.22 }, // Ring 7: Upper inner bevel slope
    { y: H * 0.82, s: 0.688, rS: 1.15 }, // Ring 8: Mid inner bevel slope
    { y: H * 0.77, s: 0.638, rS: 1.11 }, // Ring 9: Inner bevel floor boundary

    // 4. Recessed Center Surface (concave dish)
    { y: H * 0.762, s: 0.442, rS: 1.07 }, // Ring 10: Outer center floor
    { y: H * 0.752, s: 0.222, rS: 1.03 }, // Ring 11: Mid center floor
  ];

  // Softer, rounder corners matching reference keycap sculpt
  const baseRadius = isWide
    ? Math.min(0.042, d * 0.22)
    : Math.min(0.05, w * 0.24, d * 0.24);

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let rIdx = 0; rIdx < rings.length; rIdx++) {
    const ring = rings[rIdx];
    const curD = d * ring.s;
    const curW = isWide ? Math.max(w * 0.4, w - (d - curD)) : w * ring.s;
    const curR = baseRadius * ring.rS;
    const y = ring.y;
    const pts = getRoundedRectPoints(curW, curD, curR, numPerimeter);

    for (let i = 0; i < numPerimeter; i++) {
      const x = pts[i].x;
      const z = pts[i].y;

      positions.push(x, y, z);

      // UV Coordinates:
      // Center floor and inner bevel map cleanly onto [0, 1] texture coordinates
      if (rIdx >= 4) {
        const topW = isWide ? w - d * 0.22 : w * 0.78;
        const topD = d * 0.78;
        const u = (x / topW) * 0.48 + 0.5;
        const v = 0.5 - (z / topD) * 0.48;
        uvs.push(Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
      } else {
        uvs.push(0.02, 0.02);
      }
    }
  }

  // Top center dish vertex (subtle concave dip at floor of keycap)
  const topCenterY = H * 0.745;
  const centerIdx = positions.length / 3;
  positions.push(0, topCenterY, 0);
  uvs.push(0.5, 0.5);

  // Bottom center cap vertex
  const bottomCenterIdx = positions.length / 3;
  positions.push(0, 0, 0);
  uvs.push(0.02, 0.02);

  // Connect adjacent rings with quads (two triangles each)
  for (let rIdx = 0; rIdx < rings.length - 1; rIdx++) {
    const ringA = rIdx * numPerimeter;
    const ringB = (rIdx + 1) * numPerimeter;
    for (let i = 0; i < numPerimeter; i++) {
      const next = (i + 1) % numPerimeter;
      const a1 = ringA + i;
      const a2 = ringA + next;
      const b1 = ringB + i;
      const b2 = ringB + next;

      indices.push(a1, a2, b1);
      indices.push(a2, b2, b1);
    }
  }

  // Top dish fan
  const innerRing = (rings.length - 1) * numPerimeter;
  for (let i = 0; i < numPerimeter; i++) {
    const next = (i + 1) % numPerimeter;
    indices.push(innerRing + i, innerRing + next, centerIdx);
  }

  // Bottom cap fan
  for (let i = 0; i < numPerimeter; i++) {
    const next = (i + 1) % numPerimeter;
    indices.push(bottomCenterIdx, next, i);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();

  sculptedGeoCache.set(key, geo);
  return geo;
}

// ─── Chunky Sculpted Keycap Component ─────────────────────────────────────────

const keycapMaterialCache = new Map<string, THREE.MeshStandardMaterial>();

function getKeycapMaterial(
  texture: THREE.CanvasTexture,
  isAccent: boolean,
): THREE.MeshStandardMaterial {
  const cacheKey = `${texture.id}_${isAccent}`;
  let mat = keycapMaterialCache.get(cacheKey);
  if (!mat) {
    mat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: isAccent ? 0.38 : KEYBOARD_CONFIG.keycaps.roughness,
      metalness: KEYBOARD_CONFIG.keycaps.metalness,
      envMapIntensity: 1.1,
    });
    keycapMaterialCache.set(cacheKey, mat);
  }
  return mat;
}

function KeycapComponent({
  def,
  keycapColor,
  accentColor,
  interactive,
  isPhysicallyPressed,
  originX,
  originZ,
  onKeyActive,
}: {
  def: KeyDefinition;
  keycapColor: string;
  accentColor: string;
  interactive: boolean;
  isPhysicallyPressed?: boolean;
  originX: number;
  originZ: number;
  onKeyActive?: (id: string, active: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const curY = useRef(0);

  const w = def.width;
  const d = def.depth;
  const isAccent = !!def.isAccent;

  const keyBaseY = PLATE_Y + 0.003;
  const keyX = originX + def.col + (def.wUnits * U) / 2;
  const keyZ = originZ + (def.row + 0.5) * U;
  const aspectRatio = w / d;

  const texture = useMemo(
    () =>
      getKeyTexture(
        def.id,
        def.label,
        def.subLabel,
        isAccent,
        accentColor,
        keycapColor,
        aspectRatio,
        def.hasHomingBump,
      ),
    [
      def.id,
      def.label,
      def.subLabel,
      isAccent,
      accentColor,
      keycapColor,
      aspectRatio,
      def.hasHomingBump,
    ],
  );

  const geometry = useMemo(() => getSculptedKeycapGeometry(w, d), [w, d]);
  const mat = useMemo(() => getKeycapMaterial(texture, isAccent), [texture, isAccent]);

  const isDown = pressed || !!isPhysicallyPressed;

  // Reset pressed state on pointer release
  useEffect(() => {
    if (!pressed) return;
    const timer = setTimeout(() => {
      setPressed(false);
      onKeyActive?.(def.id, false);
    }, 160);
    const handleGlobalUp = () => {
      setPressed(false);
      onKeyActive?.(def.id, false);
    };
    window.addEventListener("pointerup", handleGlobalUp);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerup", handleGlobalUp);
    };
  }, [pressed, def.id, onKeyActive]);

  useFrame((_, delta) => {
    const target = isDown
      ? -KEYBOARD_CONFIG.keycaps.pressTravel
      : hovered
        ? 0.0015
        : 0;
    const diff = target - curY.current;
    if (Math.abs(diff) > 0.00005) {
      curY.current += diff * Math.min(1, delta * 32);
      if (groupRef.current) groupRef.current.position.y = keyBaseY + curY.current;
    } else if (curY.current !== target) {
      curY.current = target;
      if (groupRef.current) groupRef.current.position.y = keyBaseY + target;
    }
  });

  return (
    <group ref={groupRef} position={[keyX, keyBaseY, keyZ]}>
      <mesh
        geometry={geometry}
        material={mat}
        castShadow
        onPointerDown={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          setPressed(true);
          onKeyActive?.(def.id, true);
          playKeySound(def.id);
        }}
        onPointerUp={() => {
          if (!interactive) return;
          setPressed(false);
          onKeyActive?.(def.id, false);
        }}
        onPointerEnter={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          setHovered(false);
          setPressed(false);
          onKeyActive?.(def.id, false);
        }}
      />
    </group>
  );
}

const Keycap = React.memo(KeycapComponent, (prev, next) => {
  return (
    prev.def.id === next.def.id &&
    prev.isPhysicallyPressed === next.isPhysicallyPressed &&
    prev.interactive === next.interactive &&
    prev.keycapColor === next.keycapColor &&
    prev.accentColor === next.accentColor &&
    prev.originX === next.originX &&
    prev.originZ === next.originZ &&
    prev.onKeyActive === next.onKeyActive
  );
});


// ─── Display Texture Generator ────────────────────────────────────────────────

// ─── Stadium Pill Shape Helper ────────────────────────────────────────────────

// ─── Display Contour Helper (Exact Reference Silhouette) ──────────────────────
// Flat horizontal top with rounded corners (not a pill), long straight vertical sides,
// and heavily rounded bottom corners with flat bottom edge.

function drawDisplayContour(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.closePath();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, (3 * Math.PI) / 2, false);
  ctx.closePath();
}

// ─── Display Texture Generator (Authentic LCD Capsule with Dot Matrix) ────────

let displayCanvasRef: HTMLCanvasElement | null = null;
let displayCtxRef: CanvasRenderingContext2D | null = null;
let displayDotPattern: CanvasPattern | null = null;
let displayCanvasTex: THREE.CanvasTexture | null = null;

function getDisplayTexture(
  timeStr: string,
  dateStr: string,
  displayContent: "clock" | "custom",
  customText: string,
): THREE.CanvasTexture {
  const W = 360;
  const H = 1186;

  if (!displayCanvasRef && typeof document !== "undefined") {
    displayCanvasRef = document.createElement("canvas");
    displayCanvasRef.width = W;
    displayCanvasRef.height = H;
    displayCtxRef = displayCanvasRef.getContext("2d")!;

    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = 4;
    dotCanvas.height = 4;
    const dctx = dotCanvas.getContext("2d")!;
    dctx.fillStyle = "rgba(20, 10, 0, 0.08)";
    dctx.fillRect(0, 0, 4, 1);
    dctx.fillRect(0, 0, 1, 4);
    dctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    dctx.fillRect(2, 2, 1, 1);
    displayDotPattern = displayCtxRef.createPattern(dotCanvas, "repeat");
  }

  if (displayCtxRef && displayCanvasRef) {
    const ctx = displayCtxRef;
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // 1. Symmetrical Stadium Capsule Contour with True Circular Arc Corners
    const R_CORNER = Math.round(W * 0.2611); // 94px
    drawDisplayContour(ctx, 0, 0, W, H, R_CORNER);
    ctx.clip();

    // 2. Solid Outer Bezel
    ctx.fillStyle = KEYBOARD_CONFIG.colors.displayBezel;
    ctx.fillRect(0, 0, W, H);

    // 3. Inner Active Screen Area
    const bezelSide = 18;
    const bezelTop = 18;
    const bezelBot = 18;
    const screenX = bezelSide;
    const screenY = bezelTop;
    const screenW = W - bezelSide * 2;
    const screenH = H - bezelTop - bezelBot;
    const screenR = R_CORNER - 14;

    ctx.save();
    drawDisplayContour(ctx, screenX, screenY, screenW, screenH, screenR);
    ctx.clip();

    // 4. Radiant Vertical Screen Gradient
    const grad = ctx.createLinearGradient(0, screenY, 0, screenY + screenH);
    grad.addColorStop(0.0, KEYBOARD_CONFIG.display.gradientTop);
    grad.addColorStop(0.12, "#ea6502");
    grad.addColorStop(0.26, "#f18610");
    grad.addColorStop(0.42, "#f6a724");
    grad.addColorStop(0.6, "#f9c858");
    grad.addColorStop(0.76, "#fae194");
    grad.addColorStop(0.88, "#fdf2d4");
    grad.addColorStop(0.97, "#fefcf6");
    grad.addColorStop(1.0, KEYBOARD_CONFIG.display.gradientBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(screenX, screenY, screenW, screenH);

    // 5. Authentic LCD Dot-Matrix Micro-Grid Texture
    if (displayDotPattern) {
      ctx.fillStyle = displayDotPattern;
      ctx.fillRect(screenX, screenY, screenW, screenH);
    }

    // 6. Floating Deep Black Clock Capsule
    const capPadX = 22;
    const capX = screenX + capPadX;
    const capY = screenY + 22;
    const capW = screenW - capPadX * 2;
    const capH = 182;
    const capR = 56;

    ctx.fillStyle = "#050608";
    drawDisplayContour(ctx, capX, capY, capW, capH, capR);
    ctx.fill();

    // Glowing capsule stroke outline
    ctx.lineWidth = 2.0;
    ctx.strokeStyle = KEYBOARD_CONFIG.display.capsuleStroke;
    drawDisplayContour(ctx, capX, capY, capW, capH, capR);
    ctx.stroke();

    // Subtle dot matrix texture inside black pill
    ctx.save();
    drawDisplayContour(ctx, capX, capY, capW, capH, capR);
    ctx.clip();
    ctx.fillStyle = "rgba(255, 255, 255, 0.024)";
    for (let y = capY; y < capY + capH; y += 4) {
      ctx.fillRect(capX, y, capW, 1);
    }
    for (let x = capX; x < capX + capW; x += 4) {
      ctx.fillRect(x, capY, 1, capH);
    }
    ctx.restore();

    // 7. Typography inside Capsule
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const fontSans = KEYBOARD_CONFIG.keycaps.fontFamily;

    if (displayContent === "clock") {
      ctx.fillStyle = KEYBOARD_CONFIG.display.timeColor;
      ctx.font = `700 70px ${fontSans}`;
      ctx.fillText(timeStr || "9:42", W / 2, capY + 68);

      ctx.fillStyle = KEYBOARD_CONFIG.display.dateColor;
      ctx.font = `600 28px ${fontSans}`;
      ctx.fillText(dateStr || "Wed, Aug 9", W / 2, capY + 128);
    } else {
      ctx.fillStyle = KEYBOARD_CONFIG.display.timeColor;
      ctx.font = `700 48px ${fontSans}`;
      ctx.fillText(customText.slice(0, 8), W / 2, capY + 68);

      ctx.fillStyle = KEYBOARD_CONFIG.display.dateColor;
      ctx.font = `600 24px ${fontSans}`;
      ctx.fillText("SERENITY", W / 2, capY + 128);
    }

    if (displayDotPattern) {
      ctx.save();
      drawDisplayContour(ctx, capX, capY, capW, capH, capR);
      ctx.clip();
      ctx.fillStyle = displayDotPattern;
      ctx.fillRect(capX, capY, capW, capH);
      ctx.restore();
    }

    // 8. Smooth Glass Reflection
    const glassGrad = ctx.createLinearGradient(
      screenX,
      screenY,
      screenX + screenW * 0.85,
      screenY + screenH * 0.42,
    );
    glassGrad.addColorStop(0, "rgba(255, 255, 255, 0.14)");
    glassGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.03)");
    glassGrad.addColorStop(0.6, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = glassGrad;
    ctx.fillRect(screenX, screenY, screenW, screenH);

    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    drawDisplayContour(ctx, screenX, screenY, screenW, screenH, screenR);
    ctx.stroke();

    ctx.restore();

    // 9. Outer Black Border
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.75)";
    drawDisplayContour(ctx, 1.2, 1.2, W - 2.4, H - 2.4, R_CORNER - 1.2);
    ctx.stroke();
    ctx.restore();
  }

  if (!displayCanvasTex && displayCanvasRef) {
    displayCanvasTex = new THREE.CanvasTexture(displayCanvasRef);
    displayCanvasTex.colorSpace = THREE.SRGBColorSpace;
    displayCanvasTex.generateMipmaps = true;
    displayCanvasTex.minFilter = THREE.LinearMipmapLinearFilter;
    displayCanvasTex.magFilter = THREE.LinearFilter;
    displayCanvasTex.anisotropy = 8;
  }
  if (displayCanvasTex) {
    displayCanvasTex.needsUpdate = true;
  }
  return displayCanvasTex!;
}

// ─── Recessed Display Component ───────────────────────────────────────────────

const RecessedDisplay = React.memo(function RecessedDisplay({
  displayContent,
  customText,
  position,
}: {
  displayContent: "clock" | "custom";
  customText: string;
  position: [number, number, number];
}) {
  const [timeStr, setTimeStr] = useState("9:42");
  const [dateStr, setDateStr] = useState("Wed, Aug 9");
  const lastTimeRef = useRef(timeStr);
  const lastDateRef = useRef(dateStr);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const mins = now.getMinutes().toString().padStart(2, "0");
      const nextTime = `${hours}:${mins}`;
      const nextDate = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      if (nextTime !== lastTimeRef.current || nextDate !== lastDateRef.current) {
        lastTimeRef.current = nextTime;
        lastDateRef.current = nextDate;
        setTimeStr(nextTime);
        setDateStr(nextDate);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const texture = useMemo(
    () => getDisplayTexture(timeStr, dateStr, displayContent, customText),
    [timeStr, dateStr, displayContent, customText],
  );


  return (
    <group position={position}>
      {/* 1. Deep matte black cavity floor inside the recessed pocket (12mm below top surface) */}
      <mesh
        position={[0, -WELL_DEPTH + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[DISPLAY_W, DISPLAY_H]} />
        <meshBasicMaterial color="#050608" />
      </mesh>

      {/* 2. Display glass with true circular rounded corners and anti-aliased texture */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[DISPLAY_W, DISPLAY_H]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          alphaTest={0.02}
          toneMapped={false}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
});

// ─── Precision Machined Rotary Control Knob ──────────────────────────────────
// Authentic physical machined control knob matching reference image:
// - Tapered cylindrical body with drafted side walls and beveled top rim
// - Prominent raised rectangular grip fin / pointer ridge spanning the top face
// - Deep matte black bead-blasted anodized aluminum finish
// - Sharp cast shadows from fin onto flat top circular surface
// - Rich ambient occlusion contact shadows underneath each knob

let cachedKnobBodyGeo: THREE.BufferGeometry | null = null;
function getMachinedKnobGeometry(): THREE.BufferGeometry {
  if (cachedKnobBodyGeo) return cachedKnobBodyGeo;

  const R_BASE = 0.082;
  const R_RIM = 0.076;
  const R_TOP = 0.072;
  const H_BODY = 0.052;
  const H_RIM = 0.048;

  const N_PHI = 96;
  const N_SIDE = 12;
  const N_BEVEL = 6;

  const positions: number[] = [];
  const indices: number[] = [];

  // 1. Flat top circular face (y = H_BODY, r from 0 to R_TOP)
  const topCenterIdx = 0;
  positions.push(0, H_BODY, 0);

  const topRingStart = positions.length / 3;
  for (let j = 0; j < N_PHI; j++) {
    const phi = (j / N_PHI) * Math.PI * 2;
    positions.push(R_TOP * Math.cos(phi), H_BODY, R_TOP * Math.sin(phi));
  }

  for (let j = 0; j < N_PHI; j++) {
    const j1 = (j + 1) % N_PHI;
    indices.push(topCenterIdx, topRingStart + j1, topRingStart + j);
  }

  // 2. Beveled Shoulder Fillet
  const bevelStartIdx = positions.length / 3;
  for (let b = 0; b <= N_BEVEL; b++) {
    const t = b / N_BEVEL;
    const ang = t * (Math.PI / 2);
    const r = R_TOP + (R_RIM - R_TOP) * Math.sin(ang);
    const y = H_BODY - (H_BODY - H_RIM) * (1 - Math.cos(ang));

    for (let j = 0; j < N_PHI; j++) {
      const phi = (j / N_PHI) * Math.PI * 2;
      positions.push(r * Math.cos(phi), y, r * Math.sin(phi));
    }
  }

  for (let b = 0; b < N_BEVEL; b++) {
    const rowA = bevelStartIdx + b * N_PHI;
    const rowB = bevelStartIdx + (b + 1) * N_PHI;
    for (let j = 0; j < N_PHI; j++) {
      const j1 = (j + 1) % N_PHI;
      indices.push(rowA + j, rowA + j1, rowB + j);
      indices.push(rowA + j1, rowB + j1, rowB + j);
    }
  }

  // 3. Drafted Side Wall (from y = H_RIM down to y = 0)
  const sideStartIdx = positions.length / 3;
  for (let k = 0; k <= N_SIDE; k++) {
    const t = k / N_SIDE;
    const y = H_RIM * (1 - t);
    const r = R_RIM + (R_BASE - R_RIM) * t;

    for (let j = 0; j < N_PHI; j++) {
      const phi = (j / N_PHI) * Math.PI * 2;
      positions.push(r * Math.cos(phi), y, r * Math.sin(phi));
    }
  }

  for (let k = 0; k < N_SIDE; k++) {
    const rowA = sideStartIdx + k * N_PHI;
    const rowB = sideStartIdx + (k + 1) * N_PHI;
    for (let j = 0; j < N_PHI; j++) {
      const j1 = (j + 1) % N_PHI;
      indices.push(rowA + j, rowA + j1, rowB + j);
      indices.push(rowA + j1, rowB + j1, rowB + j);
    }
  }

  // 4. Bottom Cap (y = 0)
  const botRingStart = positions.length / 3;
  for (let j = 0; j < N_PHI; j++) {
    const phi = (j / N_PHI) * Math.PI * 2;
    positions.push(R_BASE * Math.cos(phi), 0, R_BASE * Math.sin(phi));
  }

  const botCenterIdx = positions.length / 3;
  positions.push(0, 0, 0);

  for (let j = 0; j < N_PHI; j++) {
    const j1 = (j + 1) % N_PHI;
    indices.push(botCenterIdx, botRingStart + j, botRingStart + j1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();

  cachedKnobBodyGeo = geo;
  return cachedKnobBodyGeo;
}

const CylindricalKnob = React.memo(function CylindricalKnob({
  pos,
  mat,
  interactive,
  initialAngle = 0,
}: {
  pos: [number, number, number];
  mat: THREE.MeshStandardMaterial;
  interactive: boolean;
  initialAngle?: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const angle = useRef(initialAngle);

  const R_BASE = KEYBOARD_CONFIG.knobs.radius;
  const knobGeo = useMemo(() => getMachinedKnobGeometry(), []);

  useFrame(() => {
    if (groupRef.current && (isDragging.current || groupRef.current.rotation.y !== angle.current)) {
      groupRef.current.rotation.y = angle.current;
    }
  });

  return (
    <group position={pos}>
      <mesh position={[0.003, 0.0008, 0.005]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[R_BASE * 2.5, R_BASE * 2.5]} />
        <meshBasicMaterial
          map={getKnobContactShadowTexture() ?? undefined}
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </mesh>

      <group
        ref={groupRef}
        position={[0, 0.0005, 0]}
        onPointerDown={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          isDragging.current = true;
          lastX.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (!isDragging.current) return;
          const delta = (e.clientX - lastX.current) * 0.035;
          angle.current += delta;
          lastX.current = e.clientX;
        }}
        onPointerUp={() => (isDragging.current = false)}
        onPointerLeave={() => (isDragging.current = false)}
      >
        <mesh geometry={knobGeo} castShadow receiveShadow>
          <primitive object={mat} attach="material" />
        </mesh>

        <RoundedBox
          args={[
            KEYBOARD_CONFIG.knobs.finWidth,
            KEYBOARD_CONFIG.knobs.finHeight,
            KEYBOARD_CONFIG.knobs.finLength,
          ]}
          radius={0.0035}
          smoothness={4}
          position={[0, 0.052 + KEYBOARD_CONFIG.knobs.finHeight / 2 - 0.001, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={mat} attach="material" />
        </RoundedBox>
      </group>
    </group>
  );
});


// ─── Seamless CNC Aluminum Unibody Chassis with Milled Cavity ─────────────────

const UnibodyChassis = React.memo(function UnibodyChassis({
  chassisMat,
  plateMat,
}: {
  chassisMat: THREE.MeshStandardMaterial;
  plateMat: THREE.MeshStandardMaterial;
}) {

  // Top deck: a thin aluminum sheet with cutouts for the key well and display.
  // Extruded from the top surface (y=CHASSIS_TOP_Y) downward by WELL_DEPTH.
  // This is the ONLY layer of aluminum visible from above.
  const topDeckGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const hw = CHASSIS_W / 2;
    const hd = CHASSIS_D / 2;
    const r = KEYBOARD_CONFIG.visuals.chassisCornerRadius;

    // Outer contour
    shape.moveTo(-hw + r, -hd);
    shape.lineTo(hw - r, -hd);
    shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
    shape.lineTo(hw, hd - r);
    shape.quadraticCurveTo(hw, hd, hw - r, hd);
    shape.lineTo(-hw + r, hd);
    shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
    shape.lineTo(-hw, -hd + r);
    shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);

    // Hole 1: Key Well Cutout (L-shaped pocket with Row 5 extension under display)
    // Note: shape_Y = -world_Z
    const yTop = KEY_WELL_D / 2;
    const ySplit = KEY_WELL_D / 2 - WELL_PAD - 5.0 * U;
    const yBot = -KEY_WELL_D / 2;

    const kwHole = new THREE.Path();
    const kr = 0.016;

    kwHole.moveTo(KW_X1 + kr, yTop);
    kwHole.lineTo(KW_MAIN_X2 - kr, yTop);
    kwHole.quadraticCurveTo(KW_MAIN_X2, yTop, KW_MAIN_X2, yTop - kr);
    kwHole.lineTo(KW_MAIN_X2, ySplit + kr);
    kwHole.quadraticCurveTo(KW_MAIN_X2, ySplit, KW_MAIN_X2 + kr, ySplit);
    kwHole.lineTo(KW_EXT_X2 - kr, ySplit);
    kwHole.quadraticCurveTo(KW_EXT_X2, ySplit, KW_EXT_X2, ySplit - kr);
    kwHole.lineTo(KW_EXT_X2, yBot + kr);
    kwHole.quadraticCurveTo(KW_EXT_X2, yBot, KW_EXT_X2 - kr, yBot);
    kwHole.lineTo(KW_X1 + kr, yBot);
    kwHole.quadraticCurveTo(KW_X1, yBot, KW_X1, yBot + kr);
    kwHole.lineTo(KW_X1, yTop - kr);
    kwHole.quadraticCurveTo(KW_X1, yTop, KW_X1 + kr, yTop);
    shape.holes.push(kwHole);

    // Hole 2: CNC Milled Recessed Pocket for the Smart Display
    const dispHole = new THREE.Path();
    const dw = DISPLAY_W + 0.01;
    const dh = DISPLAY_H + 0.01;
    const dhw = dw / 2;
    const dhh = dh / 2;
    const dcx = DISPLAY_X;
    const dcy = -DISPLAY_Z;
    const rDisp = dw * 0.2611;
    const k = rDisp * 0.5522847498;

    dispHole.moveTo(dcx - dhw + rDisp, dcy + dhh);
    dispHole.lineTo(dcx + dhw - rDisp, dcy + dhh);
    dispHole.bezierCurveTo(
      dcx + dhw - rDisp + k,
      dcy + dhh,
      dcx + dhw,
      dcy + dhh - rDisp + k,
      dcx + dhw,
      dcy + dhh - rDisp,
    );
    dispHole.lineTo(dcx + dhw, dcy - dhh + rDisp);
    dispHole.bezierCurveTo(
      dcx + dhw,
      dcy - dhh + rDisp - k,
      dcx + dhw - rDisp + k,
      dcy - dhh,
      dcx + dhw - rDisp,
      dcy - dhh,
    );
    dispHole.lineTo(dcx - dhw + rDisp, dcy - dhh);
    dispHole.bezierCurveTo(
      dcx - dhw + rDisp - k,
      dcy - dhh,
      dcx - dhw,
      dcy - dhh + rDisp - k,
      dcx - dhw,
      dcy - dhh + rDisp,
    );
    dispHole.lineTo(dcx - dhw, dcy + dhh - rDisp);
    dispHole.bezierCurveTo(
      dcx - dhw,
      dcy + dhh - rDisp + k,
      dcx - dhw + rDisp - k,
      dcy + dhh,
      dcx - dhw + rDisp,
      dcy + dhh,
    );
    shape.holes.push(dispHole);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: WELL_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 3,
      curveSegments: 24,
    });
    geo.computeBoundingBox();
    geo.computeBoundingSphere();
    return geo;
  }, []);

  const keyCenterX = (KW_X1 + KW_MAIN_X2) / 2;
  const keyCenterZ = 0;

  // The lower base slab sits under the top deck from PLATE_Y down to CHASSIS_TOP_Y - CHASSIS_THICK
  const baseThick = CHASSIS_THICK - WELL_DEPTH;
  const baseCenterY = PLATE_Y - baseThick / 2;

  return (
    <group>
      {/* 1. Base Aluminum Chassis Slab beneath the key well and display well */}
      <RoundedBox
        args={[CHASSIS_W, baseThick, CHASSIS_D]}
        radius={0.016}
        smoothness={6}
        position={[0, baseCenterY, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={chassisMat} attach="material" />
      </RoundedBox>

      {/* 2. Seamless CNC Aluminum Top Deck with Key Well + Display Cutouts */}
      {/* Sits at the top surface (CHASSIS_TOP_Y) and extrudes down by WELL_DEPTH to meet base slab at PLATE_Y */}
      <mesh
        geometry={topDeckGeometry}
        position={[0, CHASSIS_TOP_Y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={chassisMat} attach="material" />
      </mesh>

      {/* 3. Matte Black Switch Plate — shallow inset at the key well floor */}
      {/* Main switch plate under Rows 0-4 and Row 5 */}
      <group position={[keyCenterX, PLATE_Y + 0.002, keyCenterZ]}>
        <RoundedBox
          args={[KEY_WELL_MAIN_W + 0.008, 0.005, KEY_WELL_D + 0.008]}
          radius={0.012}
          smoothness={4}
          position={[0, 0, 0]}
          receiveShadow
        >
          <primitive object={plateMat} attach="material" />
        </RoundedBox>

        {/* Ambient occlusion shadow around well walls */}
        <mesh position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[KEY_WELL_MAIN_W + 0.014, KEY_WELL_D + 0.014]} />
          <meshBasicMaterial
            color="#000000"
            opacity={0.32}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Switch plate extension under Right Arrow key (Row 5 under display) */}
      <group
        position={[RIGHT_PANEL_X, PLATE_Y + 0.002, KW_Z1 + WELL_PAD + 5.5 * U]}
      >
        <RoundedBox
          args={[U + WELL_PAD * 2 + 0.006, 0.005, U + WELL_PAD * 2 + 0.006]}
          radius={0.008}
          smoothness={3}
          position={[0, 0, 0]}
          receiveShadow
        >
          <primitive object={plateMat} attach="material" />
        </RoundedBox>
      </group>

      {/* 4. Slim Rubber Feet — four tiny nubs on the underside */}
      {[
        [-CHASSIS_W * 0.38, CHASSIS_D * 0.38],
        [CHASSIS_W * 0.38, CHASSIS_D * 0.38],
        [-CHASSIS_W * 0.38, -CHASSIS_D * 0.38],
        [CHASSIS_W * 0.38, -CHASSIS_D * 0.38],
      ].map(([fx, fz], idx) => (
        <RoundedBox
          key={idx}
          args={[0.18, 0.006, 0.032]}
          radius={0.003}
          smoothness={3}
          position={[fx, CHASSIS_TOP_Y - CHASSIS_THICK - 0.002, fz]}
        >
          <meshStandardMaterial
            color="#141517"
            roughness={0.94}
            metalness={0.05}
          />
        </RoundedBox>
      ))}
    </group>
  );
});


// ─── Shadow Optimization Manager ──────────────────────────────────────────────

function ShadowManager({ isInteracting }: { isInteracting: boolean }) {
  const gl = useThree((state) => state.gl);
  const activeTicks = useRef(15);

  useFrame(() => {
    if (isInteracting) {
      gl.shadowMap.autoUpdate = true;
      activeTicks.current = 15;
    } else if (activeTicks.current > 0) {
      gl.shadowMap.autoUpdate = true;
      activeTicks.current--;
    } else {
      gl.shadowMap.autoUpdate = false;
    }
  });

  return null;
}

// ─── Main Scene Assembly ──────────────────────────────────────────────────────

const Scene = React.memo(function Scene({
  keycapColor,
  accentColor,
  interactive,
  displayContent,
  customDisplayText,
  activeKeys,
  hasInteracted,
  onKeyActive,
}: Required<Omit<MechanicalKeyboardProps, "typingInteraction">> & {
  activeKeys: Set<string>;
  hasInteracted: boolean;
  onKeyActive: (id: string, active: boolean) => void;
}) {
  const mats = useKeyboardMaterials(keycapColor, accentColor);

  const knobZ1 = KEYBOARD_CONFIG.knobs.topZ;
  const knobZ2 = KEYBOARD_CONFIG.knobs.bottomZ;
  const displayZ = DISPLAY_Z;
  const isInteracting = activeKeys.size > 0;

  return (
    <group>
      <ShadowManager isInteracting={isInteracting} />
      <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <UnibodyChassis chassisMat={mats.chassis} plateMat={mats.plate} />

        {/* Top-left power switch */}
        <RoundedBox
          args={[0.046, 0.02, 0.022]}
          radius={0.006}
          smoothness={3}
          position={[
            KW_X1 + 0.26,
            CHASSIS_TOP_Y + 0.002,
            -CHASSIS_D / 2 - 0.006,
          ]}
          castShadow
        >
          <meshStandardMaterial
            color={accentColor || KEYBOARD_CONFIG.accents.switchColor}
            roughness={0.4}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Keycaps */}
        {KEY_DEFINITIONS.map((def) => (
          <Keycap
            key={def.id}
            def={def}
            keycapColor={keycapColor}
            accentColor={accentColor}
            interactive={interactive}
            isPhysicallyPressed={activeKeys.has(def.id)}
            originX={KW_X1 + WELL_PAD}
            originZ={KW_Z1 + WELL_PAD}
            onKeyActive={onKeyActive}
          />
        ))}

        {/* Control knobs */}
        <CylindricalKnob
          pos={[DISPLAY_X, CHASSIS_TOP_Y, knobZ1]}
          mat={mats.knob}
          interactive={interactive}
          initialAngle={KEYBOARD_CONFIG.knobs.initialAngleTop}
        />
        <CylindricalKnob
          pos={[DISPLAY_X, CHASSIS_TOP_Y, knobZ2]}
          mat={mats.knob}
          interactive={interactive}
          initialAngle={KEYBOARD_CONFIG.knobs.initialAngleBottom}
        />

        {/* Recessed smart display */}
        <RecessedDisplay
          position={[DISPLAY_X, CHASSIS_TOP_Y, displayZ]}
          displayContent={displayContent}
          customText={customDisplayText}
        />


        {/* Live Keystroke Display positioned with generous clearance above the keyboard */}
        <Html
          position={[0, CHASSIS_TOP_Y, -CHASSIS_D / 2 - 0.28]}
          center
          zIndexRange={[100, 0]}
          pointerEvents="none"
        >
          <KeystrokeDisplay
            activeKeys={activeKeys}
            hasInteracted={hasInteracted}
            keycapColor={keycapColor}
            accentColor={accentColor}
          />
        </Html>
      </group>

      {/* Desk contact shadow */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, CHASSIS_TOP_Y - CHASSIS_THICK - 0.006, 0]}
        receiveShadow
        raycast={() => null}
      >
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={KEYBOARD_CONFIG.visuals.deskShadowOpacity} />
      </mesh>
    </group>
  );
});

// ─── Responsive Camera Controller ─────────────────────────────────────────────

function ResponsiveCamera() {
  const { size, camera } = useThree();
  const controls = useThree((state) => state.controls) as {
    update?: () => void;
  } | null;

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const isDesktop = size.width >= 1024;
    const isTablet = size.width >= 640 && size.width < 1024;

    // Sized generously to maximize hero keyboard presence
    const targetWidth = isDesktop ? CHASSIS_W * 0.95 : isTablet ? CHASSIS_W * 0.98 : CHASSIS_W * 1.02;
    const targetHeight = isDesktop ? CHASSIS_D * 1.15 : CHASSIS_D * 1.15;

    const vFovRad = (KEYBOARD_CONFIG.visuals.cameraFov * Math.PI) / 180;
    const distForWidth = targetWidth / (2 * Math.tan(vFovRad / 2) * aspect);
    const distForHeight = targetHeight / (2 * Math.tan(vFovRad / 2));
    const dist = Math.max(distForWidth, distForHeight);

    const baseDistance = KEYBOARD_CONFIG.visuals.cameraDistance;
    const scale = dist / baseDistance;

    camera.position.set(0, 4.4 * scale, 0.88 * scale);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    controls?.update?.();
  }, [size.width, size.height, camera, controls]);

  return null;
}

function FrameReadyNotifier({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      onReady();
    }
  });
  return null;
}

function KeyboardCreativeLoader({ isReady }: { isReady: boolean }) {
  return (
    <div
      aria-label="Connecting keyboard"
      className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ease-out z-20 ${
        isReady ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl select-none">
        {/* Apple-style Command Keycap */}
        <div className="apple-keycap-tap flex items-center justify-center w-[19px] h-[19px] rounded-[5px] border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.03] dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-200 text-[10px] font-mono font-medium select-none will-change-transform">
          <span>⌘</span>
        </div>

        {/* Apple-style Connecting text with animated ellipsis */}
        <div className="flex items-center gap-1">
          <span className="text-[12px] font-medium tracking-tight text-neutral-600 dark:text-neutral-300">
            Connecting keyboard
          </span>
          <span className="inline-flex items-center gap-[2.5px] ml-0.5">
            <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 apple-dot-1" />
            <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 apple-dot-2" />
            <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 apple-dot-3" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes appleKeyTap {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.8;
          }
          35% {
            transform: translateY(1.5px);
            opacity: 1;
          }
        }
        @keyframes appleDotFade {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .apple-keycap-tap {
          animation: appleKeyTap 1.6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .apple-dot-1 {
          animation: appleDotFade 1.2s ease-in-out 0s infinite;
        }
        .apple-dot-2 {
          animation: appleDotFade 1.2s ease-in-out 0.2s infinite;
        }
        .apple-dot-3 {
          animation: appleDotFade 1.2s ease-in-out 0.4s infinite;
        }
      `}</style>
    </div>
  );
}

export function HeroMechanicalKeyboard({
  keycapColor = KEYBOARD_CONFIG.colors.keycap,
  accentColor = KEYBOARD_CONFIG.colors.accent,
  interactive = true,
  displayContent = KEYBOARD_CONFIG.display.defaultMode,
  customDisplayText = KEYBOARD_CONFIG.display.customText,
  typingInteraction = true,
}: MechanicalKeyboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const mountTimeRef = useRef<number | null>(null);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const check = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isWide = window.innerWidth >= 1024;
      setIsDesktop(hasFinePointer && isWide);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleReady = useCallback(() => {
    const elapsed = mountTimeRef.current ? Date.now() - mountTimeRef.current : 0;
    const minWait = Math.max(0, 300 - elapsed);
    setTimeout(() => {
      setIsReady(true);
    }, minWait);
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShowLoader(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // 1. Pause animations and WebGL rendering when tab is backgrounded
  useEffect(() => {
    const handleVis = () => {
      setIsTabVisible(document.visibilityState !== "hidden");
    };
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, []);

  // 2. Pause when scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "120px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isVisible = isInView && isTabVisible;

  const handleKeyActive = useCallback((id: string, active: boolean) => {
    if (active) {
      setHasInteracted(true);
    }
    setActiveKeys((prev) => {
      if (active) {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      } else {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      }
    });
  }, []);

  useEffect(() => {
    const ctx = getAudioContext();
    if (ctx) initKeyAudioBuffer(ctx);
  }, []);

  // 3. Only attach global key listeners when visible and interactive
  useEffect(() => {
    if (!typingInteraction || !interactive || !isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      setHasInteracted(true);
      if (e.metaKey || (e.ctrlKey && (e.key === "r" || e.key === "R"))) return;

      const code = e.code;
      let targetId = KEY_MAP[code];
      if (!targetId && code.startsWith("Key")) {
        targetId = code.replace("Key", "").toLowerCase();
      }
      if (targetId) {
        setActiveKeys((prev) => {
          if (prev.has(targetId)) return prev;
          const next = new Set(prev);
          next.add(targetId);
          return next;
        });
        playKeySound(targetId);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      let targetId = KEY_MAP[code];
      if (!targetId && code.startsWith("Key")) {
        targetId = code.replace("Key", "").toLowerCase();
      }
      if (targetId) {
        setActiveKeys((prev) => {
          if (!prev.has(targetId)) return prev;
          const next = new Set(prev);
          next.delete(targetId);
          return next;
        });
      }
    };

    const handleBlur = () => setActiveKeys(new Set());

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [typingInteraction, interactive, isVisible]);

  useEffect(() => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.style.touchAction = "pan-y";
    }
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      onPointerDown={() => setHasInteracted(true)}
      className="mech-kb-wrapper relative w-full h-full select-none touch-pan-y"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "pan-y",
      }}
    >
      <style>{`
        .mech-kb-wrapper,
        .mech-kb-wrapper canvas {
          touch-action: pan-y !important;
        }
      `}</style>
      {/* Fun & Creative Mechanical Keyboard Loader */}
      {showLoader && <KeyboardCreativeLoader isReady={isReady} />}

      <Canvas
        className={`transition-opacity duration-700 ease-out touch-pan-y ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={typeof window !== "undefined" ? Math.min(Math.max(window.devicePixelRatio, 2), 3) : 2}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={isVisible ? "always" : "never"}
        style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
      >
        <FrameReadyNotifier onReady={handleReady} />
        <PerspectiveCamera
          makeDefault
          position={[0, 4.4, 0.88]}
          fov={KEYBOARD_CONFIG.visuals.cameraFov}
          near={0.01}
          far={100}
        />
        <ResponsiveCamera />
        {isDesktop && (
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.25}
            maxPolarAngle={1.30}
            minAzimuthAngle={-Math.PI / 7}
            maxAzimuthAngle={Math.PI / 7}
            minDistance={1.8}
            maxDistance={50.0}
            target={[0, 0, 0]}
          />
        )}

        {/* Studio Key Light */}
        <directionalLight
          position={[2.4, 5.5, 1.8]}
          intensity={KEYBOARD_CONFIG.visuals.lighting.keyIntensity}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={24}
          shadow-camera-left={-4.0}
          shadow-camera-right={4.0}
          shadow-camera-top={3.5}
          shadow-camera-bottom={-3.5}
          shadow-bias={0.00004}
          color={KEYBOARD_CONFIG.visuals.lighting.keyColor}
        />

        {/* Fill Light */}
        <directionalLight
          position={[-2.8, 4.0, -0.8]}
          intensity={KEYBOARD_CONFIG.visuals.lighting.fillIntensity}
          color={KEYBOARD_CONFIG.visuals.lighting.fillColor}
        />

        {/* Rim Light */}
        <pointLight
          position={[0, 2.2, -2.0]}
          intensity={KEYBOARD_CONFIG.visuals.lighting.rimIntensity}
          color={KEYBOARD_CONFIG.visuals.lighting.rimColor}
        />

        {/* Accent Sheen Light */}
        <directionalLight
          position={[1.6, 4.2, -1.0]}
          intensity={KEYBOARD_CONFIG.visuals.lighting.accentIntensity}
          color={KEYBOARD_CONFIG.visuals.lighting.accentColor}
        />

        {/* Ambient environment fill */}
        <ambientLight
          intensity={KEYBOARD_CONFIG.visuals.lighting.ambientIntensity}
          color={KEYBOARD_CONFIG.visuals.lighting.ambientColor}
        />

        <Suspense fallback={null}>
          <Scene
            keycapColor={keycapColor}
            accentColor={accentColor}
            interactive={interactive}
            displayContent={displayContent}
            customDisplayText={customDisplayText}
            activeKeys={activeKeys}
            hasInteracted={hasInteracted}
            onKeyActive={handleKeyActive}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroMechanicalKeyboard;


