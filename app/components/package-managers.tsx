"use client";

import type React from "react";

export function NpmIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="none" aria-hidden="true">
      <rect width="256" height="256" rx="40" fill="#CB3837" />
      <path d="M48 48h160v160h-80V88h-40v120H48V48z" fill="#FFFFFF" />
    </svg>
  );
}

export function PnpmIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.2" fill="#F69220" />
      <rect x="9" y="1.5" width="6" height="6" rx="1.2" fill="#F69220" />
      <rect x="16.5" y="1.5" width="6" height="6" rx="1.2" fill="#F69220" />
      <rect x="1.5" y="9" width="6" height="6" rx="1.2" fill="#F69220" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" fill="#4E4E4E" />
      <rect x="16.5" y="9" width="6" height="6" rx="1.2" fill="#F69220" />
      <rect x="9" y="16.5" width="6" height="6" rx="1.2" fill="#4E4E4E" />
      <rect x="16.5" y="16.5" width="6" height="6" rx="1.2" fill="#F69220" />
    </svg>
  );
}

export function BunIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21.5c5.5 0 10.2-3.8 10.2-8.5 0-3-1.8-5.6-4.6-7-1-.5-1.9-1.1-2.6-1.6C13.7 3.4 12.8 2.8 12 2.8s-1.7.6-3 1.6c-.7.5-1.6 1.1-2.6 1.6-2.8 1.4-4.6 4-4.6 7 0 4.7 4.7 8.5 10.2 8.5z"
        fill="#FBF0DF"
        stroke="#2E282A"
        strokeWidth="1.2"
      />
      <ellipse cx="8.5" cy="13.2" rx="1.2" ry="1.4" fill="#2E282A" />
      <ellipse cx="15.5" cy="13.2" rx="1.2" ry="1.4" fill="#2E282A" />
      <path
        d="M10.8 15.6c.7.6 1.7.6 2.4 0"
        stroke="#2E282A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="6.5" cy="14.5" rx="1" ry="0.6" fill="#F472B6" opacity="0.85" />
      <ellipse cx="17.5" cy="14.5" rx="1" ry="0.6" fill="#F472B6" opacity="0.85" />
    </svg>
  );
}

export function YarnIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 518 518" className={className} fill="none" aria-hidden="true">
      <path
        fill="#2C8EBB"
        d="M259 0c143 0 259 116 259 259S402 518 259 518 0 402 0 259 116 0 259 0z"
      />
      <path
        fill="#FFFFFF"
        d="M435.2 337.5c-1.8-14.2-13.8-24-29.2-23.8-23 .3-42.3 12.2-55.1 20.1-5 3.1-9.3 5.4-13 7.1.8-11.6.1-26.8-5.9-43.5-7.3-20-17.1-32.3-24.1-39.4 8.1-11.8 19.2-29 24.4-55.6 4.5-22.7 3.1-58-7.2-77.8-2.1-4-5.6-6.9-10-8.1-1.8-.5-5.2-1.5-11.9.4C293.1 96 289.6 93.8 286.9 92c-5.6-3.6-12.2-4.4-18.4-2.1-8.3 3-15.4 11-22.1 25.2-1 2.1-1.9 4.1-2.7 6.1-12.7.9-32.7 5.5-49.6 23.8-2.1 2.3-6.2 4-10.5 5.6h.1c-8.8 3.1-12.8 10.3-17.7 23.3-6.8 18.2.2 36.1 7.1 47.7-9.4 8.4-21.9 21.8-28.5 37.5-8.2 19.4-9.1 38.4-8.8 48.7-7 7.4-17.8 21.3-19 36.9-1.6 21.8 6.3 36.6 9.8 42 1 1.6 2.1 2.9 3.3 4.2-.4 2.7-.5 5.6.1 8.6 1.3 7 5.7 12.7 12.4 16.3 13.2 7 31.6 10 45.8 2.9 5.1 5.4 14.4 10.6 31.3 10.6h1c4.3 0 58.9-2.9 74.8-6.8 7.1-1.7 12-4.7 15.2-7.4 10.2-3.2 38.4-12.8 65-30 18.8-12.2 25.3-14.8 39.3-18.2 13.6-3.3 22.1-15.7 20.4-29.4zm-23.8 14.7c-16 3.8-24.1 7.3-43.9 20.2-30.9 20-64.7 29.3-64.7 29.3s-2.8 4.2-10.9 6.1c-14 3.4-66.7 6.3-71.5 6.4-12.9.1-20.8-3.3-23-8.6-6.7-16 9.6-23 9.6-23s-3.6-2.2-5.7-4.2c-1.9-1.9-3.9-5.7-4.5-4.3-2.5 6.1-3.8 21-10.5 27.7-9.2 9.3-26.6 6.2-36.9.8-11.3-6 .8-20.1.8-20.1s-6.1 3.6-11-3.8c-4.4-6.8-8.5-18.4-7.4-32.7 1.2-16.3 19.4-32.1 19.4-32.1s-3.2-24.1 7.3-48.8c9.5-22.5 35.1-40.6 35.1-40.6s-21.5-23.8-13.5-45.2c5.2-14 7.3-13.9 9-14.5 6-2.3 11.8-4.8 16.1-9.5 21.5-23.2 48.9-18.8 48.9-18.8s13-39.5 25-31.8c3.7 2.4 17 32 17 32s14.2-8.3 15.8-5.2c8.6 16.7 9.6 48.6 5.8 68-6.4 32-22.4 49.2-28.8 60-1.5 2.5 17.2 10.4 29 43.1 10.9 29.9 1.2 55 2.9 57.8.3.5.4.7.4.7s12.5 1 37.6-14.5c13.4-8.3 29.3-17.6 47.4-17.8 17.5-.3 18.4 20.2 5.2 23.4z"
      />
    </svg>
  );
}

export interface PackageManagerOption {
  id: string;
  label: string;
  getCommand: (slug: string) => string;
  Icon: React.ComponentType<{ className?: string }>;
}

export const PACKAGE_MANAGERS: readonly PackageManagerOption[] = [
  {
    id: "pnpm",
    label: "pnpm",
    getCommand: (slug: string) => `pnpm dlx shadcn@latest add ayushmxxn/serenity-ui/${slug}`,
    Icon: PnpmIcon,
  },
  {
    id: "npm",
    label: "npm",
    getCommand: (slug: string) => `npx shadcn@latest add ayushmxxn/serenity-ui/${slug}`,
    Icon: NpmIcon,
  },
  {
    id: "yarn",
    label: "yarn",
    getCommand: (slug: string) => `yarn dlx shadcn@latest add ayushmxxn/serenity-ui/${slug}`,
    Icon: YarnIcon,
  },
  {
    id: "bun",
    label: "bun",
    getCommand: (slug: string) => `bunx --bun shadcn@latest add ayushmxxn/serenity-ui/${slug}`,
    Icon: BunIcon,
  },
] as const;
