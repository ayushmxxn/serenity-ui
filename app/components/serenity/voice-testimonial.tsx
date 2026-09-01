"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiArrowDown } from "react-icons/hi2";
import { RiTwitterXLine } from "react-icons/ri";

// This is one testimonial card's data.
// Swap in your own name, role, quote, photo, audio file, video file and social link.
export interface Testimonial {
  image?: string; // avatar photo url
  name?: string;
  jobtitle?: string;
  text?: string; // the quote shown on the card
  audio?: string; // filename inside your /public/audio folder (used when media="voice")
  video?: string; // video url or filename (used when media="video")
  social?: string; // link opened when the social icon is clicked
  socialIcon?: React.ReactNode; // want a different icon just for this person? pass it here
}

// Sample data so the component works out of the box.
// Delete this and pass your own list via the `testimonials` prop.
const defaultTestimonials: Testimonial[] = [
  {
    image: "/images/avatars/punk-ape.png",
    text: "I'm blown away by the versatility of the components in this library. They make UI development a breeze!",
    name: "Alice Johnson",
    jobtitle: "Frontend Developer",
    audio: "Alice.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "/images/avatars/punk-alien.png",
    text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
    name: "David Smith",
    jobtitle: "UI Designer",
    audio: "David.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "/images/avatars/punk-hoodie.png",
    text: "The components in this library are not just well-designed but also highly customizable. It's a developer's dream!",
    name: "Emma Brown",
    jobtitle: "Software Engineer",
    audio: "Emma.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "/images/avatars/punk-beanie.png",
    text: "The components are highly responsive and work seamlessly across different devices and screen sizes.",
    name: "Emily Chen",
    jobtitle: "Mobile App Developer",
    audio: "Emily.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "/images/avatars/punk-pipe.png",
    text: "This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.",
    name: "Sarah Taylor",
    jobtitle: "Backend Developer",
    audio: "Sarah.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "/images/avatars/punk-headband.png",
    text: "I appreciate the attention to detail in the design. The components are visually appealing and professional.",
    name: "Kevin White",
    jobtitle: "UI/UX Designer",
    audio: "Kevin.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "/images/avatars/punk-zombie.png",
    text: "I love how the components are designed to be highly responsive and work well across different screen sizes.",
    name: "Brian Kim",
    jobtitle: "Mobile App Developer",
    audio: "Brian.mp3",
    video: "/video/testimonial-demo.mp4",
    social: "https://x.com/ayushmxxn",
  },
];

// Soundwave bar heights. Change these numbers to change the waveform shape.
const WAVE_BARS = [
  6, 12, 22, 16, 8, 14, 20, 24, 16, 10, 18, 24, 20, 12, 16, 22, 26, 18, 10, 14,
  24, 18, 8, 14, 22, 26, 16, 10, 18, 24, 14, 8, 16, 22, 18, 12, 16, 22, 10, 6,
];

type SeededTestimonial = Testimonial & { _cycleKey: string };

// Repeats your testimonials so each row is always long enough to loop
// without a gap. You don't need to touch this.
function buildRow(
  source: Testimonial[],
  startIndex: number,
  count: number,
): SeededTestimonial[] {
  if (source.length === 0) return [];
  const row: SeededTestimonial[] = [];
  for (let i = 0; i < count; i++) {
    const t = source[(startIndex + i) % source.length];
    row.push({ ...t, _cycleKey: `${startIndex + i}` });
  }
  return row;
}

// What shows below the quote on every card:
// "none" = nothing, just the text. "voice" = the audio player. "video" = a video.
export type TestimonialMedia = "none" | "voice" | "video";

export interface TestimonialProps {
  // Your own testimonials. If you skip this, the sample ones show up.
  testimonials?: Testimonial[];
  // More testimonials to reveal when "load more" is clicked.
  // If you skip this, it just cycles through `testimonials` again.
  moreTestimonials?: Testimonial[];
  // The big title above the cards.
  heading?: string;
  // Show the title or not.
  showHeading?: boolean;
  // The little social icon in the corner of every card (unless a card sets its own).
  defaultSocialIcon?: React.ReactNode;
  // Show or hide the social icon button entirely.
  showSocialIcon?: boolean;
  // Show or hide the "load more" button + fade at the bottom.
  showLoadMore?: boolean;
  // How many cards minimum in one row, so the scroll never shows a gap.
  minRowItems?: number;
  // Runs when someone clicks "load more".
  onLoadMore?: () => void;
  // Where your audio files live, e.g. "/audio/". Put a trailing slash.
  audioBasePath?: string;
  // "none" | "voice" | "video" — what shows under each quote. Defaults to "voice".
  media?: TestimonialMedia;
}

export type VoiceTestimonialProps = TestimonialProps;

export const TestimonialBlock: React.FC<TestimonialProps> = ({
  testimonials = defaultTestimonials,
  moreTestimonials,
  heading = "Don't just take our word for it",
  showHeading = true,
  defaultSocialIcon = <RiTwitterXLine size={14} />,
  showSocialIcon = true,
  showLoadMore = true,
  minRowItems = 10,
  onLoadMore,
  audioBasePath = "/audio/",
  media = "voice",
}) => {
  // Which card is currently playing audio.
  const [currentPlaying, setCurrentPlaying] = useState<{
    key: string;
    index: number;
  } | null>(null);
  const audioElementsRef = useRef<(HTMLAudioElement | null)[]>([]);

  // Turns true once "load more" is clicked, revealing the extra rows.
  const [expanded, setExpanded] = useState(false);

  // Split your testimonials into a top row and bottom row, and make sure
  // each row is long enough to scroll without showing a gap.
  const half = Math.max(1, Math.ceil(testimonials.length / 2));
  const rowTarget = Math.max(minRowItems, half);
  const topRow = buildRow(testimonials, 0, rowTarget);
  const bottomRow = buildRow(testimonials, half, rowTarget);

  // The extra rows shown after clicking "load more".
  const extraSource =
    moreTestimonials && moreTestimonials.length > 0
      ? moreTestimonials
      : testimonials;
  const extraHalf = Math.max(1, Math.ceil(extraSource.length / 2));
  const extraRowTarget = Math.max(minRowItems, extraHalf);
  const extraTopRow = buildRow(extraSource, 0, extraRowTarget);
  const extraBottomRow = buildRow(extraSource, extraHalf, extraRowTarget);

  // One audio element per testimonial you passed in. Only needed for voice mode,
  // but built either way so switching modes on the fly doesn't lose anything.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements: (HTMLAudioElement | null)[] = testimonials.map(
      (testimonial, i) => {
        if (!testimonial.audio) return null;
        try {
          const audio = new Audio(`${audioBasePath}${testimonial.audio}`);
          audio.preload = "auto";
          audio.onended = () =>
            setCurrentPlaying((prev) => (prev?.index === i ? null : prev));
          return audio;
        } catch {
          return null;
        }
      },
    );
    audioElementsRef.current = elements;

    return () => {
      elements.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          audio.onended = null;
        }
      });
    };
  }, [testimonials, audioBasePath]);

  const stopAudio = (key: string, index: number) => {
    const audio = audioElementsRef.current[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setCurrentPlaying((prev) => (prev?.key === key ? null : prev));
  };

  const handlePlay = (key: string, index: number) => {
    if (currentPlaying && currentPlaying.key !== key) {
      stopAudio(currentPlaying.key, currentPlaying.index);
    }
    const audio = audioElementsRef.current[index];
    if (audio) {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setCurrentPlaying({ key, index }))
        .catch(() => setCurrentPlaying({ key, index }));
    } else {
      setCurrentPlaying({ key, index });
    }
  };

  const handlePause = (key: string, index: number) => stopAudio(key, index);

  const openInNewTab = (url: string) => {
    const win = window.open(url, "_blank");
    if (win) win.focus();
  };

  const handleLoadMoreClick = () => {
    setExpanded(true);
    onLoadMore?.();
  };

  // One card. Everything shown here comes from the testimonial object
  // above — edit that object to change what shows up.
  const renderCard = (
    testimonial: SeededTestimonial,
    originalIndex: number,
    dupKey: string,
  ) => {
    const isPlaying = currentPlaying?.key === dupKey;
    return (
      <div
        key={dupKey}
        className="bg-white dark:bg-[#0e0e11] border border-neutral-200/80 dark:border-white/[0.08] w-[230px] sm:w-[240px] shrink-0 rounded-2xl p-3 sm:p-3.5 relative"
      >
        {showSocialIcon && testimonial.social && (
          <button
            type="button"
            aria-label="View social profile"
            onClick={() => openInNewTab(testimonial.social || "")}
            className="absolute top-3.5 right-3.5 text-neutral-400 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-white transition-colors cursor-pointer"
          >
            {testimonial.socialIcon ?? defaultSocialIcon}
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <Image
            src={testimonial.image || "https://via.placeholder.com/32"}
            alt={testimonial.name || "profile"}
            width={32}
            height={32}
            className="w-8 h-8 shrink-0 aspect-square rounded-[30%] object-cover ring-2 ring-black/[0.03] dark:ring-white/[0.06]"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[var(--text-primary)] font-semibold text-[13px] leading-tight truncate">
              {testimonial.name}
            </span>
            <span className="text-[var(--text-muted)] text-[11px] leading-tight truncate">
              {testimonial.jobtitle}
            </span>
          </div>
        </div>

        {media !== "video" && testimonial.text && (
          <p className="mt-2 text-[var(--text-primary)]/80 text-[12px] leading-relaxed line-clamp-3">
            {testimonial.text}
          </p>
        )}

        {/* media="voice" -> audio player bar (unchanged from before) */}
        {media === "voice" && (
          <div className="bg-neutral-50/60 dark:bg-white/[0.02] w-full h-9 mt-2.5 rounded-xl flex items-center px-2 relative">
            <button
              type="button"
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              onClick={() =>
                isPlaying
                  ? handlePause(dupKey, originalIndex)
                  : handlePlay(dupKey, originalIndex)
              }
              className={`cursor-pointer transition-colors shrink-0 flex items-center justify-center ${
                isPlaying
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {!isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                  />
                </svg>
              )}
            </button>

            <div className="flex flex-1 items-center justify-between ml-2 h-6">
              {WAVE_BARS.map((baseHeight, i) => (
                <motion.div
                  key={i}
                  className={`w-[2px] rounded-full transition-colors ${
                    isPlaying
                      ? "bg-neutral-950 dark:bg-white"
                      : "bg-[#404040] dark:bg-[#a3a3a3]"
                  }`}
                  style={{ height: `${baseHeight * 0.75}px` }}
                  animate={
                    isPlaying
                      ? {
                          scaleY: [
                            1,
                            1.22 + Math.sin((i / 4) * Math.PI) * 0.3,
                            0.72 + Math.cos((i / 5) * Math.PI) * 0.18,
                            1.18 + Math.sin((i / 3) * Math.PI + 1) * 0.22,
                            0.88,
                            1,
                          ],
                          transition: {
                            duration: 1.45 + (i % 4) * 0.15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (i % 12) * 0.08,
                          },
                        }
                      : { scaleY: 1, transition: { duration: 0.3 } }
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* media="video" -> plain video player */}
        {media === "video" && testimonial.video && (
          <div className="w-full mt-2.5 rounded-xl overflow-hidden bg-black border-0">
            <video
              src={testimonial.video}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full aspect-video object-cover border-0 border-none outline-none ring-0 block"
            />
          </div>
        )}
      </div>
    );
  };

  // One scrolling row of cards.
  const renderRow = (
    row: SeededTestimonial[],
    indexOffset: number,
    direction: "left" | "right",
    keyPrefix: string,
    source: Testimonial[],
  ) => {
    if (row.length === 0) return null;
    const duration = row.length * 8; // bigger row = slightly slower scroll
    return (
      <div className="marquee-row-mask overflow-hidden">
        <div
          className={`flex items-start gap-4 w-max ${
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          }`}
          style={{ animationDuration: `${duration}s` }}
        >
          {[...row, ...row].map((t, i) =>
            renderCard(
              t,
              (indexOffset + (i % row.length)) % source.length,
              `${keyPrefix}-${direction}-${t._cycleKey}-${i}`,
            ),
          )}
        </div>
      </div>
    );
  };

  // The arrow moves down and back up while you hover the button.
  const arrowVariants = {
    rest: { y: 0 },
    hover: {
      y: [0, 5, 0],
      transition: {
        duration: 0.7,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="w-full select-none py-4">
      {showHeading && (
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {heading}
          </h2>
        </div>
      )}

      <div className="relative md:mx-10 lg:mx-16">
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />
        <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

        <div className="flex flex-col gap-4">
          {renderRow(topRow, 0, "left", "base", testimonials)}
          {renderRow(bottomRow, half, "right", "base", testimonials)}

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="extra-rows"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-4 overflow-hidden"
              >
                {renderRow(extraTopRow, 0, "left", "extra", extraSource)}
                {renderRow(
                  extraBottomRow,
                  extraHalf,
                  "right",
                  "extra",
                  extraSource,
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* This whole block disappears for good once someone clicks it */}
        {showLoadMore && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-transparent z-20 flex items-end justify-center pb-1">
            <motion.button
              type="button"
              onClick={handleLoadMoreClick}
              aria-label="Load more testimonials"
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.92 }}
              animate="rest"
              className="pointer-events-auto cursor-pointer flex items-center justify-center size-9 rounded-full bg-white dark:bg-[#0e0e11] border border-neutral-200/70 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-white/[0.14] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)] transition-[color,border-color,box-shadow] duration-200"
            >
              <motion.span
                variants={arrowVariants}
                className="flex items-center justify-center"
              >
                <HiArrowDown size={14} />
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>

      <style>{`
        .marquee-row-mask:hover .animate-marquee-left,
        .marquee-row-mask:hover .animate-marquee-right {
          animation-play-state: paused;
        }
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation-name: marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-marquee-right {
          animation-name: marquee-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export const Testimonial = TestimonialBlock;
export const VoiceTestimonial = TestimonialBlock;
export default Testimonial;

export interface TestimonialDemoProps {
  activeVariant?: TestimonialMedia | string;
  onVariantChange?: (variant: TestimonialMedia) => void;
}

export const TestimonialDemo: React.FC<TestimonialDemoProps> = ({
  activeVariant,
  onVariantChange,
}) => {
  const initialMedia =
    activeVariant === "none" || activeVariant === "video"
      ? (activeVariant as TestimonialMedia)
      : "voice";

  const [media, setMedia] = useState<TestimonialMedia>(initialMedia);

  useEffect(() => {
    if (
      activeVariant &&
      (activeVariant === "none" ||
        activeVariant === "voice" ||
        activeVariant === "video") &&
      activeVariant !== media
    ) {
      setMedia(activeVariant as TestimonialMedia);
    }
  }, [activeVariant]);

  const handleSelect = (val: TestimonialMedia) => {
    setMedia(val);
    onVariantChange?.(val);
  };

  const options: { label: string; value: TestimonialMedia }[] = [
    { label: "None", value: "none" },
    { label: "Voice", value: "voice" },
    { label: "Video", value: "video" },
  ];

  return (
    <div className="w-full my-auto flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              media === opt.value
                ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white"
                : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 dark:bg-[#0e0e11] dark:text-neutral-300 dark:border-white/[0.08] dark:hover:bg-white/[0.04]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Testimonial media={media} />
    </div>
  );
};

export const VoiceTestimonialDemo = TestimonialDemo;
