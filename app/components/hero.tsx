"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useCoreAudio } from "../lib/use-core-audio";
import { ProfileStatsTrigger } from "./profile-stats";
import { VintageKeyboard } from "./vintage-keyboard";

const emptySubscribe = () => () => {};
const subscribeResize = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const getIsMobileSnapshot = () => window.innerWidth < 640;
const getServerMobileSnapshot = () => false;

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.71437 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584ZM11.0181 11.5382C11.0395 11.5713 11.0615 11.6051 11.0838 11.6392C11.2169 11.843 11.3487 12.0385 11.4508 12.1809C11.8475 12.0916 12.352 11.8818 12.8361 11.5917C13.3795 11.2661 13.8098 10.8918 14.0177 10.5739C13.9852 9.06758 13.7993 7.50369 13.4773 6.21648C13.38 5.82759 13.2038 5.27021 12.9903 4.74117C12.7893 4.24326 12.5753 3.82162 12.388 3.5792C11.7376 3.24219 10.7129 2.88582 10.0454 2.78987C10.0308 2.79839 10.0113 2.81102 9.98675 2.82955C9.91863 2.881 9.84018 2.95666 9.76111 3.04945C9.71959 3.09817 9.68166 3.1471 9.64768 3.19449C9.953 3.25031 10.2253 3.3171 10.4662 3.39123C11.1499 3.6016 11.6428 3.89039 11.884 4.212C12.0431 4.42408 12.0001 4.72494 11.788 4.884C11.5759 5.04306 11.2751 5.00008 11.116 4.788C11.0572 4.70961 10.8001 4.4984 10.1838 4.30877C9.58933 4.12585 8.71356 3.98 7.5 3.98C6.28644 3.98 5.41067 4.12585 4.81616 4.30877C4.19988 4.4984 3.94279 4.70961 3.884 4.788C3.72494 5.00008 3.42408 5.04306 3.212 4.884C2.99992 4.72494 2.95694 4.42408 3.116 4.212C3.35721 3.89039 3.85011 3.6016 4.53383 3.39123C4.77418 3.31727 5.04571 3.25062 5.35016 3.19488C5.31611 3.14738 5.27808 3.09831 5.23645 3.04945C5.15738 2.95666 5.07893 2.881 5.01081 2.82955C4.98628 2.81102 4.96674 2.79839 4.95217 2.78987C4.28464 2.88582 3.25999 3.24219 2.60954 3.5792C2.42226 3.82162 2.20825 4.24326 2.00729 4.74117C1.79376 5.27021 1.61752 5.82759 1.52025 6.21648C1.19829 7.50369 1.01236 9.06758 0.97986 10.5739C1.18772 10.8918 1.61807 11.2661 2.16148 11.5917C2.64557 11.8818 3.15003 12.0916 3.5468 12.1809C3.64885 12.0385 3.78065 11.843 3.9138 11.6392C3.93626 11.6048 3.95838 11.5708 3.97996 11.5375C3.19521 11.2591 2.77361 10.8758 2.50064 10.4664C2.35359 10.2458 2.4132 9.94778 2.63377 9.80074C2.85435 9.65369 3.15236 9.71329 3.29941 9.93387C3.56077 10.3259 4.24355 11.0201 7.50002 11.0201C10.7565 11.0201 11.4392 10.326 11.7006 9.93386C11.8477 9.71329 12.1457 9.65369 12.3663 9.80074C12.5869 9.94779 12.6465 10.2458 12.4994 10.4664C12.2262 10.8762 11.8041 11.2598 11.0181 11.5382ZM4.08049 7.01221C4.32412 6.74984 4.65476 6.60162 5.00007 6.59998C5.34538 6.60162 5.67603 6.74984 5.91966 7.01221C6.16329 7.27459 6.30007 7.62974 6.30007 7.99998C6.30007 8.37021 6.16329 8.72536 5.91966 8.98774C5.67603 9.25011 5.34538 9.39833 5.00007 9.39998C4.65476 9.39833 4.32412 9.25011 4.08049 8.98774C3.83685 8.72536 3.70007 8.37021 3.70007 7.99998C3.70007 7.62974 3.83685 7.27459 4.08049 7.01221ZM9.99885 6.59998C9.65354 6.60162 9.3229 6.74984 9.07926 7.01221C8.83563 7.27459 8.69885 7.62974 8.69885 7.99998C8.69885 8.37021 8.83563 8.72536 9.07926 8.98774C9.3229 9.25011 9.65354 9.39833 9.99885 9.39998C10.3442 9.39833 10.6748 9.25011 10.9184 8.98774C11.1621 8.72536 11.2989 8.37021 11.2989 7.99998C11.2989 7.62974 11.1621 7.27459 10.9184 7.01221C10.6748 6.74984 10.3442 6.60162 9.99885 6.59998Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DiscordHappyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.71437 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584ZM11.0181 11.5382C11.0395 11.5713 11.0615 11.6051 11.0838 11.6392C11.2169 11.843 11.3487 12.0385 11.4508 12.1809C11.8475 12.0916 12.352 11.8818 12.8361 11.5917C13.3795 11.2661 13.8098 10.8918 14.0177 10.5739C13.9852 9.06758 13.7993 7.50369 13.4773 6.21648C13.38 5.82759 13.2038 5.27021 12.9903 4.74117C12.7893 4.24326 12.5753 3.82162 12.388 3.5792C11.7376 3.24219 10.7129 2.88582 10.0454 2.78987C10.0308 2.79839 10.0113 2.81102 9.98675 2.82955C9.91863 2.881 9.84018 2.95666 9.76111 3.04945C9.71959 3.09817 9.68166 3.1471 9.64768 3.19449C9.953 3.25031 10.2253 3.3171 10.4662 3.39123C11.1499 3.6016 11.6428 3.89039 11.884 4.212C12.0431 4.42408 12.0001 4.72494 11.788 4.884C11.5759 5.04306 11.2751 5.00008 11.116 4.788C11.0572 4.70961 10.8001 4.4984 10.1838 4.30877C9.58933 4.12585 8.71356 3.98 7.5 3.98C6.28644 3.98 5.41067 4.12585 4.81616 4.30877C4.19988 4.4984 3.94279 4.70961 3.884 4.788C3.72494 5.00008 3.42408 5.04306 3.212 4.884C2.99992 4.72494 2.95694 4.42408 3.116 4.212C3.35721 3.89039 3.85011 3.6016 4.53383 3.39123C4.77418 3.31727 5.04571 3.25062 5.35016 3.19488C5.31611 3.14738 5.27808 3.09831 5.23645 3.04945C5.15738 2.95666 5.07893 2.881 5.01081 2.82955C4.98628 2.81102 4.96674 2.79839 4.95217 2.78987C4.28464 2.88582 3.25999 3.24219 2.60954 3.5792C2.42226 3.82162 2.20825 4.24326 2.00729 4.74117C1.79376 5.27021 1.61752 5.82759 1.52025 6.21648C1.19829 7.50369 1.01236 9.06758 0.97986 10.5739C1.18772 10.8918 1.61807 11.2661 2.16148 11.5917C2.64557 11.8818 3.15003 12.0916 3.5468 12.1809C3.64885 12.0385 3.78065 11.843 3.9138 11.6392C3.93626 11.6048 3.95838 11.5708 3.97996 11.5375C3.19521 11.2591 2.77361 10.8758 2.50064 10.4664C2.35359 10.2458 2.4132 9.94778 2.63377 9.80074C2.85435 9.65369 3.15236 9.71329 3.29941 9.93387C3.56077 10.3259 4.24355 11.0201 7.50002 11.0201C10.7565 11.0201 11.4392 10.326 11.7006 9.93386C11.8477 9.71329 12.1457 9.65369 12.3663 9.80074C12.5869 9.94779 12.6465 10.2458 12.4994 10.4664C12.2262 10.8762 11.8041 11.2598 11.0181 11.5382ZM4.08049 7.01221C4.32412 6.74984 4.65476 6.60162 5.00007 6.59998C5.34538 6.60162 5.67603 6.74984 5.91966 7.01221C6.16329 7.27459 6.30007 7.62974 6.30007 7.99998C6.30007 8.37021 6.16329 8.72536 5.91966 8.98774C5.67603 9.25011 5.34538 9.39833 5.00007 9.39998C4.65476 9.39833 4.32412 9.25011 4.08049 8.98774C3.83685 8.72536 3.70007 8.37021 3.70007 7.99998C3.70007 7.62974 3.83685 7.27459 4.08049 7.01221ZM9.99885 6.59998C9.65354 6.60162 9.3229 6.74984 9.07926 7.01221C8.83563 7.27459 8.69885 7.62974 8.69885 7.99998C8.69885 8.37021 8.83563 8.72536 9.07926 8.98774C9.3229 9.25011 9.65354 9.39833 9.99885 9.39998C10.3442 9.39833 10.6748 9.25011 10.9184 8.98774C11.1621 8.72536 11.2989 8.37021 11.2989 7.99998C11.2989 7.62974 11.1621 7.27459 10.9184 7.01221C10.6748 6.74984 10.3442 6.60162 9.99885 6.59998Z"
        fill="currentColor"
      />
      {/* Smiling Happy Clyde Eyes ^ ^ cutouts */}
      <path
        d="M3.7 8.5C4.1 7.2 5.5 7.2 5.9 8.5 M8.7 8.5C9.1 7.2 10.5 7.2 10.9 8.5"
        fill="none"
        stroke="var(--bg-primary)"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThemeToggleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
      className="h-4 w-4 pointer-events-none transition-transform duration-200 ease-out rotate-180 scale-95 dark:rotate-0 dark:scale-100"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 18" />
      <path d="M12 9l4.65 -4.65" />
      <path d="M12 14.3l7.37 -7.37" />
      <path d="M12 19.6l8.85 -8.85" />
    </svg>
  );
}

interface Stargazer {
  login: string;
  avatar_url: string;
}

interface HeroProps {
  stats?: {
    views: string;
    bookmarks: string;
  } | null;
  githubStars?: string | null;
  stargazers?: Stargazer[] | null;
  initialDiscordStats?: {
    presenceCount: number;
    instantInvite?: string;
  } | null;
}

export default function Hero({
  stats,
  githubStars,
  stargazers,
  initialDiscordStats,
}: HeroProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [email, setEmail] = useState("");
  const [discordCount, setDiscordCount] = useState<number | null>(
    initialDiscordStats?.presenceCount ?? null,
  );
  const [discordInvite, setDiscordInvite] = useState<string>(
    initialDiscordStats?.instantInvite ||
      "https://discord.com/invite/kzk6uWey3g",
  );

  const { play } = useCoreAudio();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1278780582481891339/widget.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.code && data.id) {
          if (typeof data.presence_count === "number") {
            setDiscordCount(data.presence_count);
          }
          if (data.instant_invite) {
            setDiscordInvite(data.instant_invite);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Split stargazers into two marquee rows — no fallback, rows will be absent if GitHub fails
  const avatarRow1 = stargazers
    ? stargazers
        .slice(0, Math.ceil(stargazers.length / 2))
        .map((s) => s.avatar_url)
    : null;
  const avatarRow2 = stargazers
    ? stargazers
        .slice(Math.ceil(stargazers.length / 2))
        .map((s) => s.avatar_url)
    : null;

  const isMobile = useSyncExternalStore(
    subscribeResize,
    getIsMobileSnapshot,
    getServerMobileSnapshot,
  );


  const { scrollY } = useScroll();

  // Ultra-responsive, smooth organic spring physics tuned for 60-120Hz display refresh without lingering physics calculations
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 280,
    damping: 30,
    mass: 0.1,
    restDelta: 0.05,
  });

  // Staggered choreography values across [0px -> 120px]
  const headerContainerTop = useTransform(
    smoothScrollY,
    [0, 40],
    ["40px", "0px"],
  );
  const headerTop = useTransform(smoothScrollY, [0, 120], ["0px", "0px"]);
  const headerBgOpacity = useTransform(smoothScrollY, [0, 60], [1, 0]);
  const headerBgDisplay = useTransform(smoothScrollY, (v) =>
    v > 65 ? "none" : "block",
  );

  // Brand logo & name: text collapses smoothly while logo icon scales to sit compactly in notch
  const brandNameWidth = useTransform(smoothScrollY, [0, 60], ["86px", "0px"]);
  const brandNameOpacity = useTransform(smoothScrollY, [0, 40], [1, 0]);
  const logoSize = useTransform(smoothScrollY, [0, 100], ["32px", "28px"]);

  // Phase 2: Notch container converges inward smoothly into compact top notch
  const notchMax = isMobile ? "320px" : "356px";
  const barMaxWidth = useTransform(
    smoothScrollY,
    [0, 120],
    ["1440px", notchMax],
  );
  const barHeight = useTransform(smoothScrollY, [0, 120], ["64px", "48px"]);
  const barPaddingX = useTransform(smoothScrollY, [0, 120], ["0px", "10px"]);
  const barPaddingY = useTransform(smoothScrollY, [0, 120], ["0px", "4px"]);
  const barGap = useTransform(smoothScrollY, [0, 80], ["16px", "6px"]);

  // Notch glass background & layered shadow (smooth cross-dissolve with top blur)
  const notchBgOpacity = useTransform(smoothScrollY, [25, 90], [0, 1]);

  // Button sizes & shapes in notch
  const btnHeight = useTransform(smoothScrollY, [0, 120], ["40px", "34px"]);
  const btnPadStart = isMobile ? "10px" : "14px";
  const btnPaddingX = useTransform(
    smoothScrollY,
    [0, 120],
    [btnPadStart, "10px"],
  );
  const btnGapStart = isMobile ? "6px" : "8px";
  const btnGap = useTransform(smoothScrollY, [0, 120], [btnGapStart, "6px"]);
  const btnBorderRadius = useTransform(
    smoothScrollY,
    [0, 120],
    ["12px", "10px"],
  );
  const themeBtnSize = useTransform(smoothScrollY, [0, 120], ["40px", "34px"]);
  const rightControlsGap = useTransform(
    smoothScrollY,
    [0, 120],
    [btnGapStart, "6px"],
  );

  // Back to Top button expansion in notch
  const topBtnWidth = useTransform(smoothScrollY, [30, 90], ["0px", "34px"]);
  const topBtnOpacity = useTransform(smoothScrollY, [30, 80], [0, 1]);
  const topBtnDisplay = useTransform(smoothScrollY, (v) =>
    v > 15 ? "flex" : "none",
  );

  // Tooltip dynamic vertical position: top by default at scroll 0, bottom when notch activates
  const tooltipTop = useTransform(smoothScrollY, [0, 80], ["-28px", "54px"]);

  const toggleTheme = () => {
    play("tap");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    play("tap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      play("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        play("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Subscription failed. Please try again.");
        play("error");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
      play("error");
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Sponsor Strip */}
      <div className="relative z-20 flex h-10 w-full items-center justify-center border-b border-[var(--card-border)] bg-[var(--bg-primary)] px-4 text-center text-xs sm:text-[13px] tracking-tight">
        <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-muted)]">
            Get your product featured here for
          </span>
          <span className="font-semibold text-[var(--text-primary)]/80">
            $99/m
          </span>
          <span className="text-[var(--text-muted)]/40">·</span>
          <span className="inline-flex items-center rounded-full bg-[var(--card-bg)] px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] border border-[var(--card-border)]">
            Coming soon
          </span>
        </span>
      </div>

      {/* Fixed Header Spacer in document flow to prevent layout shift */}
      <div className="h-16 w-full shrink-0 pointer-events-none" />

      {/* Scroll-Morphing Fixed Header that persists across the entire page */}
      <motion.div
        style={{
          top: headerContainerTop,
          transform: "translate3d(0, 0, 0)",
        }}
        className="fixed left-0 right-0 z-50 pointer-events-none isolate"
      >
        {/* Full-width header backdrop blur when at the very top (no bottom border line) */}
        <motion.div
          style={{
            opacity: headerBgOpacity,
            display: headerBgDisplay,
            transform: "translateZ(0)",
          }}
          className="absolute inset-0 h-16 bg-[var(--bg-primary)]/85 backdrop-blur-xl pointer-events-none -z-10"
        />

        <motion.header
          style={{
            paddingTop: headerTop,
            transform: "translate3d(0, 0, 0)",
          }}
          className="w-full pointer-events-none px-4 sm:px-10"
        >
          {/* Central Morphing Navbar Notch */}
          <motion.div
            style={{
              maxWidth: barMaxWidth,
              height: barHeight,
              paddingLeft: barPaddingX,
              paddingRight: barPaddingX,
              paddingTop: barPaddingY,
              paddingBottom: barPaddingY,
              gap: barGap,
              transform: "translate3d(0, 0, 0)",
            }}
            className="relative pointer-events-auto mx-auto flex items-center justify-between w-full will-change-[max-width,height,transform] isolate"
          >
            {/* Top Notch Seamless Background Plate with Inverted Shoulder Ears */}
            <motion.div
              style={{
                opacity: notchBgOpacity,
                transform: "translate3d(0, 0, 0)",
              }}
              className="pointer-events-none absolute -inset-x-[18px] top-0 h-full -z-10 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.05)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] will-change-[opacity,transform]"
            >
              {/* Left Inverted Notch Ear Cap */}
              <div className="absolute left-0 top-0 h-full w-[39px] overflow-visible">
                <svg
                  viewBox="0 0 38 48"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                >
                  <path
                    d="M 0 0 A 18 18 0 0 1 18 18 L 18 28 A 20 20 0 0 0 38 48 L 39 48 L 39 0 L 0 0 Z"
                    className="fill-[var(--bg-primary)] dark:fill-[#121214]"
                  />
                  <path
                    d="M 0 0 A 18 18 0 0 1 18 18 L 18 28 A 20 20 0 0 0 38 48"
                    fill="none"
                    stroke="var(--card-border)"
                    strokeWidth="1"
                    className="dark:stroke-white/[0.12]"
                  />
                </svg>
              </div>

              {/* Middle Body */}
              <div className="absolute left-[36px] right-[36px] top-0 h-full bg-[var(--bg-primary)] dark:bg-[#121214] border-b border-[var(--card-border)] dark:border-white/[0.12]" />

              {/* Right Inverted Notch Ear Cap */}
              <div className="absolute right-0 top-0 h-full w-[39px] overflow-visible">
                <svg
                  viewBox="0 0 38 48"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                >
                  <path
                    d="M 0 48 A 20 20 0 0 0 20 28 L 20 18 A 18 18 0 0 1 38 0 L -1 0 L -1 48 Z"
                    className="fill-[var(--bg-primary)] dark:fill-[#121214]"
                  />
                  <path
                    d="M 0 48 A 20 20 0 0 0 20 28 L 20 18 A 18 18 0 0 1 38 0"
                    fill="none"
                    stroke="var(--card-border)"
                    strokeWidth="1"
                    className="dark:stroke-white/[0.12]"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Brand Logo & Name (Logo scales down nicely to stay on left inside notch, Acme style) */}
            <Link
              href="/"
              onClick={() => play("tap")}
              aria-label="Serenity UI"
              className="flex items-center shrink-0 select-none whitespace-nowrap gap-1.5 sm:gap-2 group/brand"
            >
              <motion.img
                style={{
                  width: logoSize,
                  height: logoSize,
                }}
                src="/logo.webp"
                alt="Serenity UI Logo"
                className="shrink-0 object-contain rounded-[22%]"
              />
              <motion.span
                style={{
                  maxWidth: brandNameWidth,
                  opacity: brandNameOpacity,
                }}
                className="overflow-hidden whitespace-nowrap text-sm sm:text-base font-bold tracking-tight font-heading text-[var(--text-primary)]"
              >
                Serenity UI
              </motion.span>
            </Link>

            {/* Right Controls */}
            <motion.div
              style={{ gap: rightControlsGap }}
              className="flex items-center shrink-0 ml-auto gap-1.5 sm:gap-2"
            >
              {/* GitHub Button */}
              <div className="relative group shrink-0">
                <motion.a
                  style={{
                    height: btnHeight,
                    paddingLeft: btnPaddingX,
                    paddingRight: btnPaddingX,
                    gap: btnGap,
                    borderRadius: btnBorderRadius,
                  }}
                  href="https://github.com/ayushmxxn/serenity-ui"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repository"
                  data-lenis-prevent
                  onClick={() => play("tap")}
                  className="group/btn relative flex h-10 items-center justify-center rounded-xl bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-[var(--pill-text)] transition-colors duration-200 outline-none select-none cursor-pointer text-xs sm:text-sm font-medium overflow-hidden px-2.5 sm:px-3.5 gap-1.5 sm:gap-2"
                >
                  {/* Top Notch Enhanced Button Plate (fades in on scroll) */}
                  <motion.div
                    style={{
                      opacity: notchBgOpacity,
                      borderRadius: btnBorderRadius,
                    }}
                    className="pointer-events-none absolute inset-0 dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />

                  <div className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 flex items-center justify-center">
                    {/* GitHub Icon */}
                    <GithubIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 ease-out group-hover/btn:opacity-0 group-hover/btn:scale-0 group-hover/btn:-rotate-90" />

                    {/* Animated Star with Soft Rounded Edges */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-0 scale-0 rotate-90 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:rotate-0"
                    >
                      <path d="M12 2.5l2.6 5.8a1 1 0 0 0 .8.6l6.3.7a.8.8 0 0 1 .5 1.4l-4.7 4.3a1 1 0 0 0-.3.9l1.3 6.2a.8.8 0 0 1-1.2.9L12.5 20a1 1 0 0 0-1 0l-4.8 2.8a.8.8 0 0 1-1.2-.9l1.3-6.2a1 1 0 0 0-.3-.9L1.8 10.5a.8.8 0 0 1 .5-1.4l6.3-.7a1 1 0 0 0 .8-.6L12 2.5z" />
                    </svg>

                    {/* Micro Sparkle 1 */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-1.5 -right-1.5 h-2 w-2 opacity-0 scale-0 transition-all duration-300 delay-75 group-hover/btn:opacity-100 group-hover/btn:scale-100"
                    >
                      <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
                    </svg>

                    {/* Micro Sparkle 2 */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-1 -left-1.5 h-1.5 w-1.5 opacity-0 scale-0 transition-all duration-300 delay-100 group-hover/btn:opacity-100 group-hover/btn:scale-100"
                    >
                      <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
                    </svg>
                  </div>
                  <span className="relative z-10">{githubStars || "Star"}</span>
                </motion.a>

                {/* Compact Tooltip (Top at default, Bottom in notch mode) */}
                <motion.div
                  style={{ top: tooltipTop }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[8px] bg-[#18181b] text-white dark:bg-white dark:text-[#09090b] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-[100] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 hidden sm:flex items-center gap-1.5"
                >
                  <span>Star the repo</span>
                </motion.div>
              </div>

              {/* Discord Community Live Notch Button */}
              <div className="relative group shrink-0">
                <motion.a
                  style={{
                    height: btnHeight,
                    paddingLeft: btnPaddingX,
                    paddingRight: btnPaddingX,
                    gap: btnGap,
                    borderRadius: btnBorderRadius,
                  }}
                  href={discordInvite}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord Community"
                  data-lenis-prevent
                  onClick={() => play("tap")}
                  className="group/btn relative flex h-10 items-center justify-center rounded-xl bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-[var(--pill-text)] transition-colors duration-200 outline-none select-none cursor-pointer text-xs sm:text-sm font-medium overflow-hidden px-2.5 sm:px-3.5 gap-1.5 sm:gap-2"
                >
                  {/* Top Notch Enhanced Button Plate (fades in on scroll) */}
                  <motion.div
                    style={{
                      opacity: notchBgOpacity,
                      borderRadius: btnBorderRadius,
                    }}
                    className="pointer-events-none absolute inset-0 dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />

                  <div className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 flex items-center justify-center">
                    {/* Discord Regular Clyde Icon */}
                    <DiscordIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-opacity duration-200 group-hover/btn:opacity-0" />

                    {/* Discord Welcoming Happy Clyde Icon (^ ^ smiling eyes) */}
                    <DiscordHappyIcon className="pointer-events-none absolute inset-0 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100" />
                  </div>
                  <span className="relative z-10 flex items-center gap-1 font-medium">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#22c55e]" />
                    </span>
                    <span>
                      {discordCount !== null
                        ? discordCount.toLocaleString()
                        : "Discord"}
                    </span>
                  </span>
                </motion.a>

                {/* Compact Tooltip (Top at default, Bottom in notch mode) */}
                <motion.div
                  style={{ top: tooltipTop }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[8px] bg-[#18181b] text-white dark:bg-white dark:text-[#09090b] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-[100] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 hidden sm:flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] inline-block" />
                  <span>
                    {discordCount !== null
                      ? `${discordCount.toLocaleString()} online · Come say hi`
                      : "Come say hi"}
                  </span>
                </motion.div>
              </div>

              {/* Theme Toggle Button */}
              <div className="relative group shrink-0">
                <motion.button
                  style={{
                    height: themeBtnSize,
                    width: themeBtnSize,
                    borderRadius: btnBorderRadius,
                  }}
                  aria-label="Toggle theme"
                  type="button"
                  onClick={toggleTheme}
                  className="group/btn relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-[var(--pill-text)] transition-colors duration-200 outline-none cursor-pointer select-none shrink-0 overflow-hidden"
                >
                  {/* Top Notch Enhanced Button Plate (fades in on scroll) */}
                  <motion.div
                    style={{
                      opacity: notchBgOpacity,
                      borderRadius: btnBorderRadius,
                    }}
                    className="pointer-events-none absolute inset-0 dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />

                  <div className="relative z-10 flex items-center justify-center">
                    <ThemeToggleIcon />
                  </div>
                </motion.button>

                {/* Compact Tooltip (Top at default, Bottom in notch mode) */}
                <motion.span
                  style={{ top: tooltipTop }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[8px] bg-[#18181b] text-white dark:bg-white dark:text-[#09090b] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-[100] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 hidden sm:block"
                >
                  Theme
                </motion.span>
              </div>

              {/* Back to Top Button (smoothly expands when floating notch activates) */}
              <motion.div
                style={{
                  width: topBtnWidth,
                  opacity: topBtnOpacity,
                  display: topBtnDisplay,
                }}
                className="relative group shrink-0 items-center justify-center"
              >
                <motion.button
                  style={{
                    height: themeBtnSize,
                    width: themeBtnSize,
                    borderRadius: btnBorderRadius,
                  }}
                  aria-label="Back to top"
                  type="button"
                  onClick={scrollToTop}
                  className="group/btn relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--pill-bg)] hover:bg-[var(--pill-hover)] text-[var(--pill-text)] transition-colors duration-200 outline-none cursor-pointer select-none shrink-0 overflow-hidden"
                >
                  {/* Top Notch Enhanced Button Plate */}
                  <motion.div
                    style={{
                      opacity: notchBgOpacity,
                      borderRadius: btnBorderRadius,
                    }}
                    className="pointer-events-none absolute inset-0 dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />

                  <div className="relative z-10 flex items-center justify-center">
                    <ArrowUp className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover/btn:-translate-y-0.5" />
                  </div>
                </motion.button>

                {/* Compact Tooltip (Bottom in notch mode) */}
                <motion.span
                  style={{ top: tooltipTop }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[8px] bg-[#18181b] text-white dark:bg-white dark:text-[#09090b] px-2 py-0.5 text-[10px] font-semibold shadow-xl whitespace-nowrap z-[100] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 hidden sm:block"
                >
                  Back to top
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.header>
      </motion.div>

      {/* Main Hero Composition Container (max-w: 1440px, centered horizontally) */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1440px] flex-1 flex-col pt-2 sm:pt-0">
        <div className="relative z-10 flex flex-1 items-center px-4 pt-12 sm:pt-8 md:pt-10 pb-8 sm:px-10 sm:pb-12">
          {/* Desktop 21st.dev Creator Stats Card Trigger (Pinned directly under header social icons) */}
          <div className="hidden lg:block absolute top-3 sm:top-4 lg:top-4 right-4 sm:right-10 z-30">
            <ProfileStatsTrigger
              views={stats?.views || "1.2M"}
              bookmarks={stats?.bookmarks || "8.3K"}
              align="right"
            />
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-10 sm:gap-12 lg:flex-row lg:gap-8">
            {/* Left Side: Headline & Custom Email Signup Form */}
            <div className="w-full max-w-2xl">
              <h1 className="text-[2.2rem] font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-[3.2rem]">
                <span className="sm:hidden">
                  Components that
                  <br />
                  make the web
                  <br />
                  feel alive
                </span>

                <span className="hidden sm:inline">
                  Components that make
                  <br />
                  the web feel alive
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm text-[var(--text-muted)] sm:mt-5 sm:text-lg">
                Free, open source React, Canvas & WebGL components. Add them
                with the shadcn CLI or copy the code directly.
              </p>

              {/* Custom Email Signup Form */}
              <div className="mt-6 w-full max-w-xl sm:mt-8">
                <form onSubmit={handleSubscribe} className="w-full">
                  <div className="flex w-full flex-col gap-4 sm:w-fit sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-[280px] sm:flex-none">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") {
                            setStatus("idle");
                            setErrorMessage("");
                          }
                        }}
                        disabled={status === "loading" || status === "success"}
                        placeholder="Enter your email"
                        aria-label="Email address"
                        className="w-full rounded-2xl bg-[var(--pill-bg)] dark:bg-gradient-to-b dark:from-[#202024] dark:to-[#18181b] border border-[var(--card-border)] dark:border-white/[0.08] py-3 px-5 text-sm text-[var(--pill-text)] placeholder-[var(--text-muted)] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_2px_4px_rgba(0,0,0,0.4)] disabled:opacity-60"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading" || status === "success"}
                      className="flex w-full sm:w-[140px] sm:flex-none items-center justify-center rounded-2xl bg-gradient-to-b from-[#FF6B35] via-[#FF5A1F] to-[#EA4E15] border border-[#ff7b47]/40 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.15),0_2px_8px_rgba(255,90,31,0.25),0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-200 enabled:hover:from-[#ff7542] enabled:hover:via-[#ff6329] enabled:hover:to-[#f0531a] enabled:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_16px_rgba(255,90,31,0.35),0_2px_4px_rgba(0,0,0,0.25)] enabled:active:scale-[0.98] enabled:active:from-[#f0531a] enabled:active:to-[#db430d] enabled:active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] disabled:opacity-75 disabled:cursor-not-allowed enabled:cursor-pointer touch-manipulation whitespace-nowrap"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Joining...</span>
                        </span>
                      ) : status === "success" ? (
                        "You're in!"
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>

                  {/* Supporting copy aligned with left edge of input */}
                  <p className="mt-2.5 px-3 text-xs font-medium text-[var(--text-muted)]">
                    Get new components, updates and launches.
                  </p>

                  {/* Feedback message for errors */}
                  {status === "error" && errorMessage && (
                    <p className="mt-2 px-3 text-xs font-medium text-red-500">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* Loved by the Community */}
              <div className="mt-10 flex w-full max-w-xl flex-col items-start">
                {/* Heart Icon & Title */}
                <div className="flex items-center gap-2">
                  <h2 className="flex items-center gap-2 text-base font-bold tracking-tight font-heading text-[var(--text-primary)] sm:text-lg">
                    <span>Loved by the Community</span>
                    <img
                      src="/heart.webp"
                      alt="Heart"
                      className="h-5 w-5 sm:h-5.5 sm:w-5.5 object-contain select-none pointer-events-none"
                    />
                  </h2>
                </div>

                {/* Avatar marquee rows — only shown when GitHub stargazers loaded successfully */}
                {avatarRow1 && avatarRow2 && (
                  <div className="relative mt-4 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-12 bg-gradient-to-r from-[var(--fade-gradient)] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-12 bg-gradient-to-l from-[var(--fade-gradient)] to-transparent" />

                    <div className="flex flex-col gap-2 py-1 w-full">
                      {/* Row 1 - Moving Right */}
                      <div className="flex w-max items-center gap-1.5 animate-marquee-right">
                        {[...avatarRow1, ...avatarRow1].map((url, index) => (
                          <img
                            key={`row1-${index}`}
                            src={url}
                            alt={`Stargazer ${index + 1}`}
                            className="h-7 w-7 flex-shrink-0 rounded-lg border border-[var(--card-border)] object-cover shadow-sm sm:h-8 sm:w-8"
                          />
                        ))}
                      </div>

                      {/* Row 2 - Moving Left */}
                      <div className="flex w-max items-center gap-1.5 animate-marquee-left">
                        {[...avatarRow2, ...avatarRow2].map((url, index) => (
                          <img
                            key={`row2-${index}`}
                            src={url}
                            alt={`Stargazer ${index + 15}`}
                            className="h-7 w-7 flex-shrink-0 rounded-lg border border-[var(--card-border)] object-cover shadow-sm sm:h-8 sm:w-8"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 21st.dev Creator Stats Card Trigger (Mobile Only) */}
                <div className="mt-8 w-full max-w-[360px] block lg:hidden">
                  <ProfileStatsTrigger
                    views={stats?.views || "1.2M"}
                    bookmarks={stats?.bookmarks || "8.3K"}
                    align="left"
                  />
                </div>
              </div>
            </div>

            {/* Vintage Keyboard Displayed on Right 80% Coming From Right Edge */}
            <div className="relative flex w-full lg:flex-1 items-start justify-start lg:justify-end overflow-visible pointer-events-auto mt-6 sm:mt-8 lg:mt-0 lg:self-end">
              <div className="relative w-[480px] min-w-[480px] sm:w-[590px] sm:min-w-[590px] md:w-[660px] md:min-w-[660px] lg:w-[680px] lg:min-w-[680px] xl:w-[780px] xl:min-w-[780px] 2xl:w-[860px] 2xl:min-w-[860px] ml-[20%] lg:ml-0 translate-x-0 lg:translate-x-[12%] xl:translate-x-[15%] 2xl:translate-x-[18%] -translate-y-2 sm:-translate-y-4 lg:translate-y-0 xl:translate-y-0 transition-transform duration-300 select-none">
                <VintageKeyboard embedded />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
