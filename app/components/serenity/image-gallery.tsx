"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export interface ImageType {
  id: number;
  src: string;
  alt: string;
  description: string;
  /** intrinsic pixel size — used so the tile matches the photo's real
   * proportions instead of cropping it. Defaults to DEFAULT_WIDTH/HEIGHT below. */
  width?: number;
  height?: number;
}

export interface ImageGalleryProps {
  images?: ImageType[];
  className?: string;
}

/* ------------------------------------------------------------------
   Customize the gallery here — everything below is used by the
   component further down and doesn't change how it works.
------------------------------------------------------------------ */

// fallback size used when an image doesn't specify width/height
const DEFAULT_WIDTH = 1260;
const DEFAULT_HEIGHT = 750;

// grid layout
const GRID_MAX_WIDTH = "max-w-5xl md:max-w-6xl";
const GRID_PADDING = "p-4 sm:p-6 lg:p-8";
const GRID_COLUMNS = "columns-2 sm:columns-3 md:columns-4"; // columns per breakpoint
const GRID_GAP = "gap-3 sm:gap-4 lg:gap-5";

// tile appearance
const TILE_RADIUS = "rounded-xl";
const TILE_BG = "bg-neutral-900";
const TILE_MARGIN_BOTTOM = "mb-3 sm:mb-4 lg:mb-5";
const TILE_HOVER_SCALE = "group-hover:scale-[1.06]";

// modal (lightbox) appearance
const MODAL_RADIUS = "rounded-2xl";
const MODAL_BG = "bg-neutral-900";
const MODAL_BACKDROP = "bg-black/70 backdrop-blur-xl";
const MODAL_PADDING = "p-4 sm:p-10 lg:p-16"; // space around the opened image
const MODAL_MAX_SIZE =
  "max-w-[90vw] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px] max-h-[70vh] sm:max-h-[75vh]";

// animation timing
const ENTRANCE_DURATION = 0.6; // grid tile fade/blur-in duration (seconds)
const ENTRANCE_STAGGER = 0.05; // delay added per tile (seconds)
const ENTRANCE_STAGGER_MAX = 12; // cap so later tiles don't wait too long
const ENTRANCE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HOVER_LIFT = -3; // px the tile rises on hover
const MODAL_SPRING = { stiffness: 260, damping: 28 }; // open/close spring
const BACKDROP_DURATION = 0.25; // backdrop fade in/out
const CAPTION_DELAY = 0.2; // modal caption fade-in delay
const CAPTION_DURATION = 0.35;
const CLOSE_BUTTON_DELAY = 0.15;

/* ------------------------------------------------------------------ */

const defaultImages: ImageType[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Mountains",
    description: "19 July 2024",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Bridge",
    description: "11 Nov 2022",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "River",
    description: "18 Oct 2023",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Forest",
    description: "22 Mar 2024",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/18275080/pexels-photo-18275080.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Desert",
    description: "29 July 2026",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
];

const emptySubscribe = () => () => {};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = defaultImages,
  className = "",
}) => {
  const [selected, setSelected] = useState<ImageType | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const prefersReducedMotion = useReducedMotion();

  // lock scroll + close on escape while the viewer is open
  useEffect(() => {
    if (!selected) return;

    // compensate for the scrollbar disappearing so the page doesn't
    // shift sideways and throw off the centering while the modal is open
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const modal = (
    <AnimatePresence>
      {selected && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${MODAL_BACKDROP} ${MODAL_PADDING}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: BACKDROP_DURATION }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            layoutId={`photo-${selected.id}`}
            className={`relative overflow-hidden ${MODAL_RADIUS} shadow-2xl ${MODAL_BG}`}
            transition={{ type: "spring", ...MODAL_SPRING }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width ?? DEFAULT_WIDTH}
              height={selected.height ?? DEFAULT_HEIGHT}
              quality={85}
              className={`block w-auto h-auto ${MODAL_MAX_SIZE} object-contain`}
              sizes="(max-width: 640px) 90vw, 560px"
              loading="lazy"
            />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: CAPTION_DELAY, duration: CAPTION_DURATION }}
              className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-5"
            >
              <p className="text-base font-medium text-white">{selected.alt}</p>
              <p className="text-sm text-white/70">{selected.description}</p>
            </motion.div>

            <motion.button
              type="button"
              aria-label="Close"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: CLOSE_BUTTON_DELAY }}
              className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center my-auto ${GRID_PADDING} overflow-x-hidden select-none ${className}`}
    >
      <div
        className={`w-full ${GRID_MAX_WIDTH} mx-auto ${GRID_COLUMNS} ${GRID_GAP} [column-fill:balance]`}
      >
        {images.map((image, i) => {
          const w = image.width ?? DEFAULT_WIDTH;
          const h = image.height ?? DEFAULT_HEIGHT;
          return (
            <motion.button
              key={image.id}
              type="button"
              layoutId={`photo-${image.id}`}
              onClick={() => setSelected(image)}
              className={`group relative ${TILE_MARGIN_BOTTOM} block w-full min-w-0 overflow-hidden ${TILE_RADIUS} ${TILE_BG} text-left cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white`}
              style={{ breakInside: "avoid" }}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 16, filter: "blur(6px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: ENTRANCE_DURATION,
                delay: (i % ENTRANCE_STAGGER_MAX) * ENTRANCE_STAGGER,
                ease: ENTRANCE_EASE,
              }}
              whileHover={prefersReducedMotion ? undefined : { y: HOVER_LIFT }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={w}
                height={h}
                quality={80}
                className={`block w-full h-auto transition-transform duration-700 ease-out ${TILE_HOVER_SCALE}`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{image.alt}</p>
                <p className="text-xs text-white/70">{image.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {mounted ? createPortal(modal, document.body) : null}
    </div>
  );
};

export default ImageGallery;
