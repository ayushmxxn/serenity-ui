"use client";

import { Gaegu, Patrick_Hand } from "next/font/google";
import React, { useCallback, useMemo, useState } from "react";

const handwriting = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwriting",
});
const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
});

// One project card shown on the "Selected Work" page
export interface ProjectItem {
  number: string; // shows as "01", "02", etc. next to the title
  title: string; // project name
  category: string; // not shown on the card itself, but handy for your own reference
  description: string; // one short line under the title
  imageUrl?: string; // path/URL to the project thumbnail
  link?: string; // clicking the card opens this (falls back to liveUrl/githubUrl)
  githubUrl?: string;
  liveUrl?: string;
}

export interface PortfolioBookProps {
  className?: string;

  // ---- Front cover & general identity ----
  authorName?: string; // your name
  authorRole?: string; // your title/tagline, shown under "PORTFOLIO" on the cover
  avatarUrl?: string; // your photo — used on the cover, about page, and back cover

  // ---- About Me page ----
  bioIntro?: string; // first line of your bio
  bioFocus?: string; // second line of your bio
  services?: string[]; // list shown in the "What I do" sticky note

  // ---- My Skills page ----
  skills?: { name: string; level: number }[]; // level is 0–100, fills the bar that much
  quote?: string; // your personal quote/motto in the sticky note

  // ---- Selected Work page ----
  projects?: ProjectItem[]; // only the first 4 are shown (2x2 grid)
  moreProjectsUrl?: string; // link at the bottom of the projects page, e.g. your full portfolio site

  // ---- Experience & Contact page ----
  experience?: {
    period: string; // e.g. "2023 – Present"
    role: string; // job title / role
    description: string; // one line about what you did
    link?: string;
  }[];
  education?: { degree: string; school: string; period: string };
  tools?: string[]; // currently unused by the layout, reserved for future use
  contact?: {
    email?: string;
    website?: string;
    social?: string; // your handle, e.g. "@yourname" (used to build the Twitter/X link)
    github?: string;
    linkedin?: string;
  };
}

/* ------------------------------------------------------------------------ */
/* Decorative sketches (sparkles, pen, spiral binding, photo frame)         */
/* You usually don't need to touch these — they're just visual flourishes. */
/* ------------------------------------------------------------------------ */

function SparkleDoodle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1 text-[#181818] pointer-events-none ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#181818">
        <path d="M12 2 C12 8, 14 12, 22 12 C14 12, 12 16, 12 22 C12 16, 10 12, 2 12 C10 12, 12 8, 12 2 Z" />
      </svg>
      <svg
        width="9"
        height="9"
        viewBox="0 0 24 24"
        fill="#181818"
        className="-mt-2"
      >
        <path d="M12 2 C12 7, 13 12, 22 12 C13 12, 12 17, 12 22 C12 17, 11 12, 2 12 C11 12, 12 7, 12 2 Z" />
      </svg>
    </div>
  );
}

function PenDoodle({ className = "" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 100 30"
        className="w-21 sm:w-24 h-auto overflow-visible select-none drop-shadow-[0.5px_0.5px_0px_rgba(0,0,0,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 28 8 L 82 8 C 85 8, 86 11, 86 15 C 86 19, 85 22, 82 22 L 28 22 Z"
          fill="#faf7f0"
          stroke="#181818"
          strokeWidth="2"
        />
        <line
          x1="38"
          y1="8"
          x2="38"
          y2="22"
          stroke="#181818"
          strokeWidth="1.5"
        />
        <line
          x1="44"
          y1="8"
          x2="44"
          y2="22"
          stroke="#181818"
          strokeWidth="1.5"
        />
        <line
          x1="50"
          y1="8"
          x2="50"
          y2="22"
          stroke="#181818"
          strokeWidth="1.5"
        />
        <path
          d="M 72 8 L 72 3 C 72 1, 74 1, 76 1 L 84 1 C 86 1, 86 3, 86 8"
          stroke="#181818"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M 28 8 L 10 15 L 28 22 Z"
          fill="#181818"
          stroke="#181818"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M 10 15 L 4 15"
          stroke="#181818"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 2 17 Q -4 20, 0 24 T 8 26"
          stroke="#181818"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function SpiralBinding() {
  // Number of ring loops drawn down the spine — raise/lower for a denser or sparser spiral
  const loops = 21;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[2.5%] bottom-[2.5%] -translate-x-1/2 z-60 flex flex-col justify-between select-none w-5.5 sm:w-6.25"
    >
      {/* Continuous vertical spine rod */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-[#181818] rounded-full z-0 opacity-90" />

      {Array.from({ length: loops }).map((_, i) => (
        <div
          key={i}
          className="relative flex items-center justify-center h-[10.5px] sm:h-3 z-10"
        >
          <svg
            className="w-full h-full drop-shadow-[0_1.2px_1px_rgba(0,0,0,0.32)] overflow-visible"
            viewBox="0 0 24 14"
            fill="none"
          >
            {/* Left & Right punched hole notches on paper */}
            <rect
              x="1.5"
              y="3.5"
              width="1.8"
              height="7"
              rx="0.9"
              fill="#14100c"
              opacity="0.85"
            />
            <rect
              x="20.7"
              y="3.5"
              width="1.8"
              height="7"
              rx="0.9"
              fill="#14100c"
              opacity="0.85"
            />

            {/* Symmetrical Oval Ring Loop (Matching reference) */}
            <ellipse
              cx="12"
              cy="7"
              rx="9.5"
              ry="4.3"
              stroke="#181818"
              strokeWidth="2.3"
              fill="none"
            />
            {/* Subtle inner 3D metallic highlight */}
            <ellipse
              cx="12"
              cy="6.4"
              rx="8.6"
              ry="3.5"
              stroke="#7a7065"
              strokeWidth="0.6"
              opacity="0.6"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function PhotoFrame({
  src = "https://i.postimg.cc/YL3q3Dw7/profile-avatar.png", // default photo path if you don't pass avatarUrl
  alt = "Photo",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={`border-2 border-[#181818] bg-[#181818] rounded-sm overflow-hidden flex items-center justify-center shadow-[2px_2px_0px_rgba(24,24,24,0.18)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center select-none"
        style={{ filter: "none", mixBlendMode: "normal", opacity: 1 }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* SHEET 1, SIDE A — Front Cover                                            */
/* Customize with: authorName, authorRole, avatarUrl                        */
/* ------------------------------------------------------------------------ */

function PortfolioCoverFace({
  authorName = "Kuro", // your name, shown at the bottom of the cover
  authorRole = "Visual Design • Creative Chaos", // your tagline/title under "PORTFOLIO"
  avatarUrl = "https://i.postimg.cc/YL3q3Dw7/profile-avatar.png", // your photo
}: {
  authorName?: string;
  authorRole?: string;
  avatarUrl?: string;
}) {
  return (
    <div className="coverSketch relative h-full w-full overflow-hidden select-none p-3.5 sm:p-7 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <SparkleDoodle />
        <div className="text-right">
          {/* "Vol. 2026" badge — change the year/label here if you want */}
          <span className="font-handwriting text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#181818] font-bold">
            Vol. 2026
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-2 sm:mb-4">
          <PhotoFrame
            src={avatarUrl}
            alt={authorName}
            className="h-19.5 w-16 sm:h-27 sm:w-21.5 p-0.5"
          />
          <svg
            viewBox="0 0 24 24"
            className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-[#181818] transform -rotate-12 pointer-events-none overflow-visible"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Big "PORTFOLIO" title — change the text here if you want a different cover title */}
        <h1 className="font-gaegu text-[28px] sm:text-[40px] font-bold text-[#181818] tracking-tight leading-none">
          PORTFOLIO
        </h1>
        <div className="h-0.5 w-12 sm:w-16 bg-[#181818] my-1.5 sm:my-2" />
        <p className="font-handwriting text-[11.5px] sm:text-[15px] text-[#181818] leading-tight max-w-45 sm:max-w-52.5">
          {authorRole}
        </p>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-handwriting text-[10px] sm:text-[12px] text-[#181818]">
          {authorName} • Designer
        </span>
        {/* Hint text in the corner — feel free to reword */}
        <span className="font-handwriting text-[10px] sm:text-[12px] text-[#181818] underline cursor-pointer">
          Flip to see the goods ➔
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* SHEET 1, SIDE B — About Me                                               */
/* Customize with: avatarUrl, bioIntro, bioFocus, services                  */
/* ------------------------------------------------------------------------ */

function AboutMePage({
  avatarUrl = "https://i.postimg.cc/YL3q3Dw7/profile-avatar.png",
  bioIntro = "Kuro here. I turn wild ideas into sharp visual stories.", // first line of your bio
  bioFocus = "Clean aesthetics, bold details, and way too much caffeine.", // second line of your bio
  services = [
    // your list of services — add/remove/edit as many lines as you want
    "Brand Identity & Vibe",
    "Logo & Iconography",
    "Print & Merch",
    "Social & Digital Art",
    "UI/UX & Interactive",
  ],
}: {
  avatarUrl?: string;
  bioIntro?: string;
  bioFocus?: string;
  services?: string[];
}) {
  return (
    <div className="paper relative h-full w-full overflow-hidden select-none pl-3 sm:pl-5 pr-6 sm:pr-8 pt-3 sm:pt-5 pb-3 sm:pb-5 flex flex-col justify-between">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="relative shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="absolute -top-1.5 -left-1 sm:-top-2 sm:-left-1.5 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-[#181818] transform -rotate-12 pointer-events-none z-10 overflow-visible"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <PhotoFrame
            src={avatarUrl}
            alt="About Me"
            className="h-17 w-14 sm:h-23.5 sm:w-19.5 p-0.5"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-gaegu text-[20px] sm:text-[28px] font-bold text-[#181818] leading-none mb-0.5 sm:mb-1">
            ABOUT ME
          </h2>
          <p className="font-handwriting text-[10.5px] sm:text-[13.5px] text-[#181818] leading-[1.15] sm:leading-[1.2]">
            {bioIntro}
          </p>
          <p className="font-handwriting text-[10.5px] sm:text-[13.5px] text-[#181818] leading-[1.15] sm:leading-[1.2] mt-0.5 sm:mt-1">
            {bioFocus}
          </p>
        </div>
      </div>

      <div className="mt-1.5 sm:mt-2.5 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-1 sm:gap-0">
        {/* "What I do" sticky note — 2-column horizontal on mobile, original vertical on desktop */}
        <div className="relative w-full sm:w-35 bg-[#fbf8f0] border-[1.4px] sm:border-[1.6px] border-[#181818] rounded-sm p-1.5 sm:p-2 shadow-[1.5px_1.5px_0px_rgba(24,24,24,0.15)] font-handwriting text-[#181818]">
          <div
            className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 border-l border-b border-[#181818] bg-[#e4dac7] pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
          />
          <h3 className="text-[11px] sm:text-[14px] font-bold tracking-tight mb-0.5 sm:mb-1 border-b border-[#181818]/30 pb-0.5">
            What I do
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-2 gap-y-0.5 text-[9.5px] sm:text-[12.5px] leading-tight">
            {services.map((item) => (
              <li key={item} className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-[5px] sm:text-[6px]">●</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Small "drawn by hand" label + pen doodle — purely decorative, safe to leave alone */}
        <div className="flex flex-col items-end pb-0.5 sm:pb-1 pointer-events-none scale-85 sm:scale-100 origin-bottom-right">
          <span className="font-handwriting text-[8px] sm:text-[9.5px] text-[#181818]/75 mb-0.5 mr-1.5 sm:mr-2 -rotate-3">
            drawn by hand ↺
          </span>
          <PenDoodle />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* SHEET 2, SIDE A — My Skills                                              */
/* Customize with: skills (name + level 0-100), quote                      */
/* ------------------------------------------------------------------------ */

function SkillsPage({
  skills = [
    // "level" is a percentage (0-100) that controls how full the bar looks
    { name: "Photoshop", level: 88 },
    { name: "Illustrator", level: 92 },
    { name: "InDesign", level: 75 },
    { name: "Figma", level: 90 },
    { name: "After Effects", level: 80 },
  ],
  quote = "Currently designing instead of sleeping.", // your personal quote/motto
}: {
  skills?: { name: string; level: number }[];
  quote?: string;
}) {
  return (
    <div className="paper relative h-full w-full overflow-hidden select-none pl-6 sm:pl-8 pr-3 sm:pr-5 pt-3 sm:pt-5 pb-3 sm:pb-5 flex flex-col justify-between">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <SparkleDoodle />
        <h2 className="font-gaegu text-[22px] sm:text-[30px] font-bold text-[#181818] leading-none">
          MY SKILLS
        </h2>
      </div>

      <div className="my-1 sm:my-2 space-y-1 sm:space-y-1.5 font-handwriting">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center justify-between gap-1.5 sm:gap-2"
          >
            <span className="text-[11px] sm:text-[14px] font-medium text-[#181818] w-15.5 sm:w-21.25 shrink-0 truncate">
              {skill.name}
            </span>
            <div className="flex-1 h-2.75 sm:h-3.75 border-[1.4px] sm:border-[1.6px] border-[#181818] rounded-sm bg-[#faf7f0] p-0.5 overflow-hidden shadow-[1px_1px_0px_rgba(24,24,24,0.12)]">
              <div
                className="h-full sketch-hatch border-r border-[#181818]"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-0.5 sm:mt-1 flex items-center justify-between">
        {/* Quote bubble */}
        <div className="relative flex-1 bg-[#fdfbf7] border-[1.4px] sm:border-[1.5px] border-dashed border-[#181818] rounded-sm p-1.5 sm:p-2 shadow-[1.5px_1.5px_0px_rgba(24,24,24,0.1)] font-handwriting">
          <div className="absolute -top-3 sm:-top-3.5 left-2 pointer-events-none scale-90 sm:scale-100">
            <svg width="14" height="28" viewBox="0 0 14 28" fill="none">
              <path
                d="M 4 8 L 4 22 C 4 25, 10 25, 10 22 L 10 4 C 10 1, 1 1, 1 7 L 1 20"
                stroke="#181818"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-[10px] sm:text-[13.5px] text-[#181818] leading-tight pl-2.5 sm:pl-3 font-semibold">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {/* "chaos" doodle face — purely decorative, safe to leave alone */}
        <div className="flex flex-col items-center gap-0.5 pl-1.5 sm:pl-2.5 pointer-events-none scale-85 sm:scale-100 origin-right">
          <span className="font-handwriting text-[8px] sm:text-[9px] text-[#181818]/80 whitespace-nowrap">
            chaos ✦
          </span>
          <div className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 rounded-full border-[1.4px] sm:border-[1.6px] border-[#181818] flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="sm:w-3.75 sm:h-3.75"
            >
              <circle cx="8" cy="9" r="1.5" fill="#181818" />
              <circle cx="16" cy="9" r="1.5" fill="#181818" />
              <path
                d="M 7 15 C 9 18, 15 18, 17 15"
                stroke="#181818"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* SHEET 2, SIDE B — Selected Work                                         */
/* Customize with: projects (only the first 4 show), moreProjectsUrl       */
/* ------------------------------------------------------------------------ */

// Placeholder projects — replace via the `projects` prop with your own work.
// Only the first 4 items are displayed (laid out as a 2x2 grid).
const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    number: "01",
    title: "Brand Identity",
    category: "Branding",
    description: "Coffee brand with serious character.",
    imageUrl:
      "https://i.postimg.cc/1VH5H7Zs/Warm-Brewly-Coffee-Branding-Mockup.png",
  },
  {
    number: "02",
    title: "Poster Design",
    category: "Print",
    description: "Think Create Inspire — studio prints.",
    imageUrl: "https://i.postimg.cc/9wpFpgjc/Opus-Studio-Exhibition-Poster.png",
  },
  {
    number: "03",
    title: "Packaging",
    category: "Packaging",
    description: "Minimal skincare packaging & box.",
    imageUrl:
      "https://i.postimg.cc/9wpFpgjV/Minimalist-NUDE-Skincare-Still-Life.png",
  },
  {
    number: "04",
    title: "Social Media",
    category: "Digital",
    description: "High-engagement editorial drops.",
    imageUrl:
      "https://i.postimg.cc/LYjsq6CJ/Verve-Studio-Branding-Stationery-Mockup.png",
  },
];

function ProjectsPage({
  projects = DEFAULT_PROJECTS,
  moreProjectsUrl, // link at the bottom of the page, e.g. your full case-study site
}: {
  projects?: ProjectItem[];
  moreProjectsUrl?: string;
}) {
  // Only the first 4 projects fit the grid — trim to 4 no matter how many are passed in
  const displayProjects = projects.slice(0, 4);

  return (
    <div className="paper relative h-full w-full overflow-hidden select-none pl-3 sm:pl-5 pr-6 sm:pr-8 pt-3 sm:pt-5 pb-3 sm:pb-5 flex flex-col justify-between">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <h2 className="font-gaegu text-[22px] sm:text-[30px] font-bold text-[#181818] leading-none">
          SELECTED WORK
        </h2>
        <SparkleDoodle />
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 my-auto">
        {displayProjects.map((p, idx) => {
          // Each card links out to link -> liveUrl -> githubUrl, in that order of priority
          const projectHref = p.link || p.liveUrl || p.githubUrl;
          const imgSrc =
            p.imageUrl ||
            DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length]?.imageUrl ||
            "https://i.postimg.cc/1VH5H7Zs/Warm-Brewly-Coffee-Branding-Mockup.png";
          // Slight random-looking tilt for a "pinned to a corkboard" feel
          const rotations = [
            "-rotate-[0.8deg]",
            "rotate-[0.7deg]",
            "rotate-[0.6deg]",
            "-rotate-[0.7deg]",
          ];
          const tapeRotations = [
            "-rotate-3",
            "rotate-2",
            "-rotate-2",
            "rotate-3",
          ];

          const CardContent = (
            <div
              className={`relative flex flex-col border-[1.4px] sm:border-[1.5px] border-[#181818] rounded-xs bg-[#fcfaf2] p-1 sm:p-1.5 pt-1.5 sm:pt-2 shadow-[1.5px_1.5px_0px_rgba(24,24,24,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:rotate-0 hover:shadow-[2px_2px_0px_rgba(24,24,24,0.18)] ${rotations[idx % 4]}`}
            >
              {/* Washi tape strip on top of each card */}
              <div
                className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-7 h-2 sm:h-2.5 washi-tape ${tapeRotations[idx % 4]} pointer-events-none z-10`}
              />

              <div className="h-9 sm:h-12 border border-[#181818] bg-[#f4ece0] rounded-xs overflow-hidden flex items-center justify-center relative shadow-[0.5px_0.5px_0px_rgba(24,24,24,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={p.title}
                  className="w-full h-full object-cover object-center select-none"
                  style={{ filter: "none", mixBlendMode: "normal", opacity: 1 }}
                />
              </div>
              <span className="font-handwriting font-bold text-[9.5px] sm:text-[11.5px] text-[#181818] mt-0.5 sm:mt-1 leading-tight flex items-center justify-between">
                <span>
                  {p.number}. {p.title}
                </span>
                {projectHref && (
                  <span className="text-[8px] sm:text-[8.5px] opacity-70">
                    ↗
                  </span>
                )}
              </span>
              <span className="font-handwriting text-[8px] sm:text-[10px] text-[#181818]/85 leading-tight line-clamp-1 sm:line-clamp-2">
                {p.description}
              </span>
            </div>
          );

          return projectHref ? (
            <a
              key={idx}
              href={projectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer block no-underline focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              {CardContent}
            </a>
          ) : (
            <div key={idx}>{CardContent}</div>
          );
        })}
      </div>

      <div className="flex items-center justify-between font-handwriting text-[9.5px] sm:text-[12.5px] text-[#181818] pt-0.5 sm:pt-1 border-t border-[#181818]/20">
        {moreProjectsUrl ? (
          <a
            href={moreProjectsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center justify-between w-full cursor-pointer text-[#181818]"
            onClick={(e) => e.stopPropagation()}
          >
            <span>More secret work on request or site.</span>
            <span className="font-bold">➔</span>
          </a>
        ) : (
          <>
            <span>More secret work on request or site.</span>
            <span className="font-bold">➔</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* SHEET 3, SIDE A — Experience & Contact                                   */
/* Customize with: experience, education, contact (portfolio/twitter/discord) */
/* ------------------------------------------------------------------------ */

function ExperienceContactPage({
  experience = [
    // Add/remove roles freely — each needs a period, role, and short description
    {
      period: "2023 – Present",
      role: "Freelance Visual Designer & Art Director",
      description:
        "Crafting bold brand identities, posters & digital visual systems.",
    },
    {
      period: "2022 – 2023",
      role: "Studio Designer & Visual Artist",
      description:
        "Designed editorial layouts, brand collateral & social drops.",
    },
  ],
  education = {
    degree: "Bachelor of Design",
    school: "Independent Study & Creative Practice",
  },
  contact = {
    // These 3 links appear in the contact box at the bottom — replace with your own
    portfolio: "https://www.ayushmxxn.com/",
    twitter: "https://x.com/ayushmxxn",
    discord: "https://discord.com/invite/kzk6uWey3g",
  },
}: {
  experience?: {
    period?: string;
    role: string;
    description: string;
    link?: string;
  }[];
  education?: { degree: string; school?: string; period?: string };
  contact?: {
    portfolio?: string;
    twitter?: string;
    discord?: string;
    email?: string;
    website?: string;
    social?: string; // if set instead of `twitter`, builds the link as x.com/<social>
    github?: string;
  };
}) {
  // Fallback chain: use the specific field if given, else build a sensible default
  const portfolioUrl =
    contact.portfolio || contact.website || "https://www.ayushmxxn.com/";
  const twitterUrl =
    contact.twitter ||
    (contact.social
      ? `https://x.com/${contact.social.replace(/^@/, "")}`
      : "https://x.com/ayushmxxn");
  const discordUrl = contact.discord || "https://discord.com/invite/kzk6uWey3g";

  return (
    <div className="paper relative h-full w-full overflow-hidden select-none pl-6 sm:pl-8 pr-3 sm:pr-5 pt-3 sm:pt-5 pb-3 sm:pb-5 flex flex-col justify-between">
      {/* Top: Experience list */}
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="sm:w-4 sm:h-4"
          >
            <rect
              x="3"
              y="7"
              width="18"
              height="14"
              rx="2"
              fill="#faf8f2"
              stroke="#181818"
              strokeWidth="1.8"
            />
            <path
              d="M 8 7 L 8 4 C 8 3, 16 3, 16 4 L 16 7"
              stroke="#181818"
              strokeWidth="1.8"
            />
          </svg>
          <h3 className="font-gaegu text-[16px] sm:text-[20px] font-bold text-[#181818] leading-none">
            EXPERIENCE
          </h3>
        </div>

        <div className="font-handwriting text-[9.5px] sm:text-[12.5px] text-[#181818] space-y-0.5 sm:space-y-1">
          {experience.map((exp, idx) => (
            <div key={idx}>
              <span className="font-bold">
                ● {exp.period ? `${exp.period}: ` : ""}
                {exp.role}
              </span>
              <p className="text-[8.5px] sm:text-[11px] text-[#181818]/85 pl-1.5 sm:pl-2 leading-tight">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Education — degree, optional period, optional school */}
      <div className="space-y-0.5 sm:space-y-1.5 my-0.5 sm:my-1">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="sm:w-4 sm:h-4"
          >
            <path
              d="M 12 3 L 2 8 L 12 13 L 22 8 Z"
              fill="#faf8f2"
              stroke="#181818"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M 6 10.5 L 6 16 C 6 18, 12 20, 18 16 L 18 10.5"
              stroke="#181818"
              strokeWidth="1.8"
            />
            <line
              x1="22"
              y1="8"
              x2="22"
              y2="15"
              stroke="#181818"
              strokeWidth="1.8"
            />
          </svg>
          <h3 className="font-gaegu text-[16px] sm:text-[20px] font-bold text-[#181818] leading-none">
            EDUCATION
          </h3>
        </div>

        <div className="font-handwriting text-[9.5px] sm:text-[12.5px] text-[#181818] space-y-0.5">
          <div>
            <span className="font-bold">● {education.degree}</span>
            {education.period && (
              <span className="text-[8.5px] sm:text-[10px] text-[#181818]/70 ml-1">
                ({education.period})
              </span>
            )}
            {education.school && (
              <p className="text-[8.5px] sm:text-[11px] text-[#181818]/85 pl-1.5 sm:pl-2 leading-tight">
                {education.school}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: Contact box — the 3 links below open in a new tab when clicked */}
      <div className="relative bg-[#faf7ef] border-[1.4px] sm:border-[1.5px] border-[#181818] rounded-sm p-1.5 sm:p-2 shadow-[1.5px_1.5px_0px_rgba(24,24,24,0.15)] font-handwriting text-[#181818]">
        <div className="absolute -top-1.5 -left-1.5 sm:-left-2 w-5 sm:w-7 h-2.5 sm:h-3 washi-tape transform -rotate-12 pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 sm:-right-2 w-5 sm:w-7 h-2.5 sm:h-3 washi-tape transform rotate-12 pointer-events-none" />

        <div className="text-center font-gaegu text-[12.5px] sm:text-[16px] font-bold tracking-tight mb-0.5 sm:mb-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[#181818]">
          <span>LET&apos;S BUILD SOMETHING</span>
          <span className="text-[10px] sm:text-[11px] text-[#181818]/80 font-normal">
            ✦
          </span>
        </div>

        <div className="font-handwriting text-[9px] sm:text-[11.5px] space-y-0.5 sm:space-y-1 pl-0.5 text-[#181818]">
          {/* Website / portfolio link */}
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 hover:underline cursor-pointer group text-[#181818]"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#181818"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-3 sm:h-3 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {/* Displayed website text — update to match your own URL */}
            <span className="font-medium">ayushmxxn.com</span>
            <span className="text-[8px] sm:text-[9px] opacity-70 ml-auto group-hover:translate-x-0.5 transition-transform">
              ➔
            </span>
          </a>

          {/* Twitter / X link */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 hover:underline cursor-pointer group text-[#181818]"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="9.5"
              height="9.5"
              viewBox="0 0 24 24"
              fill="#181818"
              className="sm:w-[11.5px] sm:h-[11.5px] shrink-0"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {/* Displayed handle — update to match your own @handle */}
            <span className="font-medium">@ayushmxxn</span>
            <span className="text-[8px] sm:text-[9px] opacity-70 ml-auto group-hover:translate-x-0.5 transition-transform">
              ➔
            </span>
          </a>

          {/* Discord link */}
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 hover:underline cursor-pointer group text-[#181818]"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#181818"
              className="sm:w-3 sm:h-3 shrink-0"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="font-medium">Discord</span>
            <span className="text-[8px] sm:text-[9px] opacity-70 ml-auto group-hover:translate-x-0.5 transition-transform">
              ➔
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* SHEET 3, SIDE B — Back Cover                                             */
/* Customize with: avatarUrl (name/tagline are hardcoded below, edit here)  */
/* ------------------------------------------------------------------------ */

function BackCoverFace({
  avatarUrl = "https://i.postimg.cc/YL3q3Dw7/profile-avatar.png",
}: {
  avatarUrl?: string;
}) {
  return (
    <div className="sketchBack relative flex h-full w-full flex-col items-center justify-between p-3.5 sm:p-7 select-none">
      <div className="absolute inset-2.5 sm:inset-4 border-[1.4px] sm:border-[1.6px] border-[#181818] rounded-sm pointer-events-none" />

      <div className="w-full flex justify-between items-center text-[#181818]">
        <SparkleDoodle />
        <span className="font-handwriting text-[10px] sm:text-[12px] font-bold tracking-[0.2em] uppercase">
          VOL. 2026
        </span>
      </div>

      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-2 sm:mb-3">
          <PhotoFrame
            src={avatarUrl}
            alt="Kuro"
            className="h-20 w-16 sm:h-29.5 sm:w-23.5 p-0.5 shadow-[2px_2px_0px_rgba(24,24,24,0.18)]"
          />
          <svg
            viewBox="0 0 24 24"
            className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-[#181818] transform -rotate-12 pointer-events-none overflow-visible"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Name shown on the back cover — currently hardcoded, edit directly here */}
        <h3 className="font-gaegu text-[19px] sm:text-[26px] font-bold text-[#181818] tracking-tight leading-none">
          KURO
        </h3>
        {/* Closing tagline — edit directly here */}
        <p className="font-handwriting text-[11px] sm:text-[13.5px] text-[#181818] leading-tight mt-0.5 sm:mt-1">
          Good design. Questionable decisions. ✦
        </p>
      </div>

      <div className="w-full flex items-center justify-between font-handwriting text-[9.5px] sm:text-[11.5px] text-[#181818]">
        <span>That&apos;s all folks.</span>
        <span className="underline cursor-pointer">Flip back to start ↺</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Internal: assembles all the pages above into flip-able sheets            */
/* You don't need to edit anything below this line to customize content.   */
/* ------------------------------------------------------------------------ */

interface Leaf {
  front: React.ReactNode;
  back: React.ReactNode;
}

function buildLeaves(props: PortfolioBookProps): Leaf[] {
  return [
    {
      front: (
        <PortfolioCoverFace
          authorName={props.authorName}
          authorRole={props.authorRole}
          avatarUrl={props.avatarUrl}
        />
      ),
      back: (
        <AboutMePage
          avatarUrl={props.avatarUrl}
          bioIntro={props.bioIntro}
          bioFocus={props.bioFocus}
          services={props.services}
        />
      ),
    },
    {
      front: <SkillsPage skills={props.skills} quote={props.quote} />,
      back: (
        <ProjectsPage
          projects={props.projects}
          moreProjectsUrl={props.moreProjectsUrl}
        />
      ),
    },
    {
      front: (
        <ExperienceContactPage
          experience={props.experience}
          education={props.education}
          contact={props.contact}
        />
      ),
      back: <BackCoverFace avatarUrl={props.avatarUrl} />,
    },
  ];
}

/* ------------------------------------------------------------------------ */
/* Main component — this is what you import and render                     */
/* Usage: <PortfolioBook authorName="..." projects={[...]} ... />          */
/* ------------------------------------------------------------------------ */

type Anim = { index: number; dir: "fwd" | "back" } | null;

// Shades used for the stacked-pages illusion on either side of the open book
const BASE_TONES = [
  "#f5eedf",
  "#f2e8d7",
  "#efe3cf",
  "#ebdcc6",
  "#e7d6be",
  "#e3cfb6",
  "#dfc8ad",
];

export function PortfolioBook({
  className = "",
  ...props
}: PortfolioBookProps) {
  const leaves = useMemo(() => buildLeaves(props), [props]);
  const total = leaves.length;

  const [flipped, setFlipped] = useState(0);
  const [anim, setAnim] = useState<Anim>(null);

  const flipNext = useCallback(() => {
    if (anim || flipped >= total) return;
    setAnim({ index: flipped, dir: "fwd" });
  }, [anim, flipped, total]);

  const flipPrev = useCallback(() => {
    if (anim || flipped <= 0) return;
    setAnim({ index: flipped - 1, dir: "back" });
  }, [anim, flipped]);

  const handleAnimEnd = useCallback(
    (e?: React.AnimationEvent) => {
      if (e && e.target !== e.currentTarget) return;
      if (!anim) return;
      setFlipped((f) => (anim.dir === "fwd" ? f + 1 : f - 1));
      setAnim(null);
    },
    [anim],
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flipNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        flipPrev();
      }
    },
    [flipNext, flipPrev],
  );

  const closedFront = flipped === 0 && !anim;
  const closedBack = flipped === total && !anim;

  const shiftClass = closedFront
    ? "-translate-x-[25%]"
    : closedBack
      ? "translate-x-[25%]"
      : "translate-x-0";

  const groundWidth = closedFront || closedBack ? "38%" : "78%";

  // Right-side stack: physical sheets remaining unread under active right page
  const rightStackLayers = useMemo(() => {
    const count = Math.max(0, total - 1 - flipped);
    if (count <= 0) return [];

    return Array.from({ length: count }, (_, i) => {
      const layerIndex = i + 1;
      const bg = BASE_TONES[Math.min(i, BASE_TONES.length - 1)];
      return {
        id: `r-${i}`,
        offsetX: layerIndex * 2.4,
        offsetSmX: layerIndex * 3,
        zIndex: -layerIndex,
        bg,
      };
    });
  }, [total, flipped]);

  // Left-side stack: physical sheets accumulated under active left page
  const leftStackLayers = useMemo(() => {
    const count = Math.max(0, flipped - 1);
    if (count <= 0) return [];

    return Array.from({ length: count }, (_, i) => {
      const layerIndex = i + 1;
      const bg = BASE_TONES[Math.min(i, BASE_TONES.length - 1)];
      return {
        id: `l-${i}`,
        offsetX: -(layerIndex * 2.4),
        offsetSmX: -(layerIndex * 3),
        zIndex: -layerIndex,
        bg,
      };
    });
  }, [flipped]);

  return (
    <div
      className={`${handwriting.variable} ${gaegu.variable} flex w-full items-center justify-center py-4 sm:py-8 overflow-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="stage relative w-full max-w-160 px-0 sm:px-4">
          <div
            className={`bookWrap ${shiftClass} relative mx-auto`}
            style={{
              width: "min(100%, 640px)",
              height:
                "clamp(340px, calc(min(100vw - 32px, 640px) * 0.75), 480px)",
            }}
          >
            <div className="book h-full w-full">
              {/* Left Page Stack (Accumulated turned pages) */}
              {leftStackLayers.length > 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 select-none"
                >
                  {leftStackLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className="absolute top-0 bottom-0 right-1/2 w-1/2 border-[1.8px] sm:border-2 border-[#181818] rounded-l-xs sm:rounded-l-[3px] shadow-[inset_1px_0_0_rgba(24,24,24,0.06)] translate-x-(--stack-x) sm:translate-x-(--stack-sm-x) transition-all duration-300"
                      style={
                        {
                          "--stack-x": `${layer.offsetX}px`,
                          "--stack-sm-x": `${layer.offsetSmX}px`,
                          backgroundColor: layer.bg,
                          zIndex: layer.zIndex,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              )}

              {/* Right Page Stack (Dynamically mapped to remaining page count) */}
              {rightStackLayers.length > 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 select-none"
                >
                  {rightStackLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className="absolute top-0 bottom-0 left-1/2 w-1/2 border-[1.8px] sm:border-2 border-[#181818] rounded-r-xs sm:rounded-r-[3px] shadow-[inset_-1px_0_0_rgba(24,24,24,0.06)] translate-x-(--stack-x) sm:translate-x-(--stack-sm-x) transition-all duration-300"
                      style={
                        {
                          "--stack-x": `${layer.offsetX}px`,
                          "--stack-sm-x": `${layer.offsetSmX}px`,
                          backgroundColor: layer.bg,
                          zIndex: layer.zIndex,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              )}

              <SpiralBinding />
              {leaves.map((leaf, i) => {
                const isAnimating = anim?.index === i;
                const isFlipped = i < flipped;

                let animClass = "";
                if (isAnimating)
                  animClass = anim!.dir === "fwd" ? "animFwd" : "animBack";

                const staticTransform = !isAnimating
                  ? isFlipped
                    ? "rotateY(-180deg)"
                    : "rotateY(0deg)"
                  : undefined;

                const zIndex = isAnimating
                  ? total * 2
                  : isFlipped
                    ? i
                    : total - i;

                const isTopRight = !isFlipped && i === flipped;
                const isTopLeft = isFlipped && i === flipped - 1;
                const clickable = (isTopRight || isTopLeft) && !anim;

                return (
                  <div
                    key={i}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : -1}
                    aria-label={
                      isTopRight
                        ? "Turn page forward"
                        : isTopLeft
                          ? "Turn page back"
                          : undefined
                    }
                    onKeyDown={clickable ? handleKey : undefined}
                    onClick={(e) => {
                      if (!clickable) return;
                      // Do not flip page when clicking an interactive link or button
                      const target = e.target as HTMLElement;
                      if (
                        target.closest("a, button, input, textarea, select")
                      ) {
                        return;
                      }
                      if (isTopRight) flipNext();
                      else flipPrev();
                    }}
                    onAnimationEnd={isAnimating ? handleAnimEnd : undefined}
                    className={`sheet ${animClass}`}
                    style={{
                      zIndex,
                      transform: staticTransform,
                      cursor: clickable ? "pointer" : "default",
                      pointerEvents: clickable ? "auto" : "none",
                    }}
                  >
                    <div className="face">
                      {leaf.front}
                      {(isTopRight || isAnimating) && (
                        <div className="cornerHint" />
                      )}
                    </div>
                    <div className="face back">
                      {leaf.back}
                      {isTopLeft && (
                        <div className="cornerHint cornerHintLeft" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="groundShadow" style={{ width: groundWidth }} />
          </div>
        </div>
      </div>

      {/* Styles: page-flip animation, paper textures, and decorative bits below.
          Change the ink color #181818 or paper tones (#f7f1e6, #faf7f0, etc.)
          here if you want a different color scheme. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Patrick+Hand&display=swap');

        .font-handwriting {
          font-family: var(--font-handwriting), 'Patrick Hand', cursive, sans-serif;
        }
        .font-gaegu {
          font-family: var(--font-gaegu), 'Gaegu', cursive, sans-serif;
        }
        .stage {
          perspective: 2400px;
          perspective-origin: 50% 45%;
        }
        .bookWrap {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .book {
          position: relative;
          transform-style: preserve-3d;
        }
        .sheet {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          transform-style: preserve-3d;
          transform-origin: left center;
          cursor: pointer;
        }
        .sheet:focus-visible {
          outline: 2px dashed #181818;
          outline-offset: 4px;
        }
        .face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          border: 2px solid #181818;
          border-radius: 2px;
          background-color: #f6efe2;
        }
        .face.back {
          transform: rotateY(180deg);
        }
        @keyframes flipFwd {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(-180deg);
          }
        }
        @keyframes flipBack {
          from {
            transform: rotateY(-180deg);
          }
          to {
            transform: rotateY(0deg);
          }
        }
        .animFwd {
          animation: flipFwd 900ms cubic-bezier(0.45, 0, 0.2, 1) forwards;
        }
        .animBack {
          animation: flipBack 900ms cubic-bezier(0.45, 0, 0.2, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animFwd,
          .animBack {
            animation-duration: 1ms;
          }
          .bookWrap {
            transition-duration: 1ms;
          }
        }
        .groundShadow {
          position: absolute;
          left: 50%;
          bottom: -5%;
          transform: translateX(-50%);
          height: 18%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(24, 20, 16, 0.18) 0%,
            rgba(24, 20, 16, 0.06) 55%,
            rgba(24, 20, 16, 0) 75%
          );
          filter: blur(1.5px);
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }
        .paper {
          background-color: #f7f1e6;
          background-image:
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.2, 0 0 0 0 0.15, 0 0 0 0 0.08, 0 0 0 0.03 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }
        .coverSketch {
          background-color: #f6eedf;
          background-image:
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.2, 0 0 0 0 0.15, 0 0 0 0 0.08, 0 0 0 0.035 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }
        .sketchBack {
          background-color: #f3ebdb;
          background-image:
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.2, 0 0 0 0 0.15, 0 0 0 0 0.08, 0 0 0 0.035 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }
        .cornerHint {
          position: absolute;
          width: 22px;
          height: 22px;
          right: 0;
          bottom: 0;
          z-index: 7;
          pointer-events: none;
          border-left: 1.5px solid #181818;
          border-top: 1.5px solid #181818;
          background-color: #e8ded0;
          opacity: 0;
          transition: opacity 0.2s ease;
          clip-path: polygon(0 100%, 100% 0, 100% 100%);
        }
        .sheet:hover .cornerHint {
          opacity: 1;
        }
        .cornerHintLeft {
          right: auto;
          left: 0;
          border-left: none;
          border-right: 1.5px solid #181818;
          clip-path: polygon(0 0, 100% 100%, 0 100%);
        }

        /* Real Photos / Screenshots */
        .sketch-photo,
        .sketch-image,
        .book img,
        .book image {
          opacity: 1;
        }

        /* Real Icons Hand-Drawn Monochromatic Style */
        .sketch-icon {
          stroke: #181818;
          color: #181818;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Washi Tape Accent */
        .washi-tape {
          background-color: rgba(226, 218, 204, 0.85);
          border: 1px dashed rgba(24, 24, 24, 0.25);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        }

        /* Sketched Hatched Progress / Fill */
        .sketch-hatch {
          background-image: repeating-linear-gradient(
            -45deg,
            #181818 0px,
            #181818 1.5px,
            transparent 1.5px,
            transparent 5px
          );
        }

        /* Sketched Software Badge */
        .sketch-badge {
          border: 1.6px solid #181818;
          border-radius: 3px;
          background-color: #faf7f0;
          font-family: var(--font-gaegu), 'Gaegu', cursive, sans-serif;
          box-shadow: 1px 1px 0px rgba(24, 24, 24, 0.15);
        }
      `}</style>
    </div>
  );
}

export default PortfolioBook;
