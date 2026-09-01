"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FaAmazon,
  FaApple,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaMicrosoft,
  FaTwitter,
} from "react-icons/fa";

type Brand = {
  name: string;
  logo: IconType;
};

// ================================
// 👋 EDIT YOUR BRANDS HERE
// Add or remove a brand by adding/removing a line below.
// "name" is the text shown next to the logo.
// "logo" is the icon — pick any icon from react-icons (e.g. FaSpotify, FaNetflix).
// ================================
const brands: Brand[] = [
  { name: "Apple", logo: FaApple },
  { name: "Microsoft", logo: FaMicrosoft },
  { name: "Google", logo: FaGoogle },
  { name: "Amazon", logo: FaAmazon },
  { name: "Facebook", logo: FaFacebook },
  { name: "Twitter", logo: FaTwitter },
  { name: "LinkedIn", logo: FaLinkedin },
  { name: "Instagram", logo: FaInstagram },
];

// ================================
// 👋 EASY SETTINGS — change these numbers/colors to restyle everything.
// You don't need to touch any code below this section.
// ================================

// The heading text shown above the logos. Set to "" (empty) to hide it completely.
const HEADING_TEXT = "Trusted by teams at";

// Size of the heading text. Try "text-sm", "text-base", "text-lg", or "text-xl".
const HEADING_SIZE = "text-sm";

// Color of the heading text.
const HEADING_COLOR_LIGHT = "text-neutral-500";
const HEADING_COLOR_DARK = "dark:text-neutral-400";

// How fast the logos scroll. Bigger number = slower. Smaller number = faster.
const SCROLL_DURATION_S = 28;

// Should the scrolling stop when the user hovers their mouse over it?
const PAUSE_ON_HOVER = true;

// Space between each logo and the next one (in pixels).
const SPACE_BETWEEN_LOGOS = 12;

// Show the thin vertical line between logos? Set to false to hide it.
const SHOW_DIVIDER = true;

// Size of the logo icons. Try "text-sm", "text-base", "text-lg", or "text-xl".
const ICON_SIZE = "text-base";

// Size of the brand name text. Try "text-xs", "text-[13px]", "text-sm", or "text-base".
const TEXT_SIZE = "text-[13px]";

// Color of the icon + text. Use any Tailwind text color class.
const LOGO_COLOR_LIGHT = "text-neutral-500";
const LOGO_COLOR_DARK = "dark:text-neutral-400";
const TEXT_COLOR_LIGHT = "text-neutral-700";
const TEXT_COLOR_DARK = "dark:text-neutral-300";

// Color of the divider line between logos.
const DIVIDER_COLOR_LIGHT = "bg-neutral-200/70";
const DIVIDER_COLOR_DARK = "dark:bg-white/8";

// Fade effect on the left/right edges (so logos fade in/out instead of cutting off sharply).
// Set to false for a hard edge with no fade.
const SHOW_EDGE_FADE = true;

// ================================
// You don't need to edit anything past this point —
// this part just builds the component using the settings above.
// ================================

const BrandChip: React.FC<{ brand: Brand }> = ({ brand }) => {
  const Icon = brand.logo;

  return (
    <div
      className="flex shrink-0 items-center h-10 px-2 relative"
      style={{ gap: 8 }}
    >
      <Icon
        className={`${ICON_SIZE} shrink-0 ${LOGO_COLOR_LIGHT} ${LOGO_COLOR_DARK}`}
      />
      <span
        className={`${TEXT_SIZE} font-medium ${TEXT_COLOR_LIGHT} ${TEXT_COLOR_DARK} whitespace-nowrap`}
      >
        {brand.name}
      </span>
    </div>
  );
};

const Divider: React.FC = () => (
  <div
    className={`shrink-0 self-center w-px h-5 ${DIVIDER_COLOR_LIGHT} ${DIVIDER_COLOR_DARK}`}
  />
);

export const BrandMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const track = [...brands, ...brands]; // duplicated once so the scroll loop looks seamless

  return (
    <section className="py-10 w-full flex flex-col items-center justify-center select-none">
      {HEADING_TEXT && (
        <p
          className={`${HEADING_SIZE} font-medium ${HEADING_COLOR_LIGHT} ${HEADING_COLOR_DARK} mb-6 text-center`}
        >
          {HEADING_TEXT}
        </p>
      )}

      <div className="relative w-full max-w-4xl mx-auto px-4">
        <div
          className="overflow-hidden"
          style={
            SHOW_EDGE_FADE
              ? {
                  maskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }
              : undefined
          }
        >
          <div
            className="flex w-max items-center py-1"
            style={{
              gap: SPACE_BETWEEN_LOGOS,
              animation: `brand-marquee ${SCROLL_DURATION_S}s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
            onMouseEnter={() => PAUSE_ON_HOVER && setIsPaused(true)}
            onMouseLeave={() => PAUSE_ON_HOVER && setIsPaused(false)}
          >
            {track.map((brand, index) => (
              <React.Fragment key={`${brand.name}-${index}`}>
                <BrandChip brand={brand} />
                {SHOW_DIVIDER && index !== track.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes brand-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default BrandMarquee;
