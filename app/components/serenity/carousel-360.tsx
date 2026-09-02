"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// ─────────────────────────────────────────────
// Customize here — images, timing, sizes, geometry
// ─────────────────────────────────────────────

const images = [
  "https://images.unsplash.com/photo-1725017710297-d923d3102984?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1725449670931-b53a7cb689b9?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1724182558400-5bc438d5db52?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1724849306184-cba5daac68a8?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613169620329-6785c004d900?q=75&w=600&auto=format&fit=crop",
];

// How often the carousel auto-rotates (ms)
const AUTOPLAY_INTERVAL_MS = 2400;

// Spring physics for the ring rotation
const springTransition = {
  type: "spring",
  stiffness: 60,
  damping: 16,
  mass: 0.7,
} as const;

// Ring depth (radius) bounds and how much of the container width it uses
const RADIUS_MIN = 120;
const RADIUS_MAX = 320;
const RADIUS_WIDTH_RATIO = 0.55;
const PERSPECTIVE_MULTIPLIER = 2.4; // how strong the 3D perspective looks
const RING_TILT_DEG = 38; // tilt angle of ring thumbnails

// Center image crossfade
const CROSSFADE_DURATION_S = 0.45;
const CROSSFADE_EASE = [0.22, 1, 0.36, 1] as const;

// Size classes — thumbnails on the ring
const THUMB_SIZE_CLASSES =
  "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24";
const THUMB_SIZES_ATTR =
  "(max-width: 640px) 48px, (max-width: 768px) 64px, 96px";

// Size classes — active center image
const CENTER_SIZE_CLASSES =
  "w-44 h-44 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80";
const CENTER_SIZES_ATTR =
  "(max-width: 640px) 176px, (max-width: 768px) 192px, 320px";

// Nav button size
const BUTTON_SIZE_CLASSES = "w-9 h-9 sm:w-10 sm:h-10";

// ─────────────────────────────────────────────

// Small spinner shown while an image is loading
const ImageLoader: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
    <div className="w-1/4 aspect-square rounded-full border-2 border-black/15 dark:border-white/20 border-t-black/50 dark:border-t-white/60 animate-spin" />
  </div>
);

export const Carousel360: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(220);
  const [loadedThumbs, setLoadedThumbs] = useState<boolean[]>(() =>
    images.map(() => false),
  );

  const numImages = images.length;
  const angleStep = 360 / numImages;

  const steps = Math.round(rotation / angleStep);
  const centerIndex = ((-steps % numImages) + numImages) % numImages;
  const centerImage = images[centerIndex];

  // Reset the center loader whenever we land on a new image. Done during
  // render (not in an effect) so it doesn't trigger an extra render pass.
  const [prevCenterIndex, setPrevCenterIndex] = useState(centerIndex);
  const [centerLoaded, setCenterLoaded] = useState(false);
  if (centerIndex !== prevCenterIndex) {
    setPrevCenterIndex(centerIndex);
    setCenterLoaded(false);
  }

  useEffect(() => {
    const updateRadius = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setRadius(
        Math.max(RADIUS_MIN, Math.min(RADIUS_MAX, width * RADIUS_WIDTH_RATIO)),
      );
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + angleStep);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [angleStep]);

  const rotateCarousel = useCallback(
    (direction: "left" | "right") => {
      setRotation(
        (prev) => prev + (direction === "left" ? -angleStep : angleStep),
      );
    },
    [angleStep],
  );

  const markThumbLoaded = useCallback((index: number) => {
    setLoadedThumbs((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-6 sm:py-10">
      <div
        ref={containerRef}
        className="relative w-[92%] max-w-150 aspect-5/3 flex items-center justify-center"
      >
        <div
          className="relative w-full h-full"
          style={{ perspective: radius * PERSPECTIVE_MULTIPLIER }}
        >
          {images.map((item, index) => {
            const targetAngle = rotation + angleStep * index;
            return (
              <motion.div
                key={item}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: targetAngle }}
                transition={springTransition}
              >
                <motion.div
                  className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    rotateY: -targetAngle,
                    rotateX: RING_TILT_DEG,
                    z: radius,
                  }}
                  transition={springTransition}
                >
                  {!loadedThumbs[index] && <ImageLoader />}
                  <Image
                    src={item}
                    alt={`Carousel item ${index + 1}`}
                    width={96}
                    height={96}
                    sizes={THUMB_SIZES_ATTR}
                    onLoad={() => markThumbLoaded(index)}
                    className={`object-cover ${THUMB_SIZE_CLASSES} opacity-90 transition-opacity duration-300 ${
                      loadedThumbs[index] ? "opacity-90" : "opacity-0"
                    }`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={centerIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: CROSSFADE_DURATION_S,
                ease: CROSSFADE_EASE,
              }}
              className="relative rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.18)]"
            >
              {!centerLoaded && <ImageLoader />}
              <Image
                src={centerImage}
                alt="Featured"
                width={320}
                height={320}
                sizes={CENTER_SIZES_ATTR}
                loading="lazy"
                onLoad={() => setCenterLoaded(true)}
                className={`object-cover ${CENTER_SIZE_CLASSES} transition-opacity duration-300 ${
                  centerLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 sm:mt-8 z-30">
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => rotateCarousel("left")}
          className={`group relative flex items-center justify-center ${BUTTON_SIZE_CLASSES} rounded-full overflow-hidden
                     shadow-sm shadow-black/10 dark:shadow-black/30
                     transition-transform duration-200 active:scale-90 cursor-pointer`}
        >
          <span
            className="absolute inset-0 rounded-full
                       bg-linear-to-b from-white/70 to-white/20 dark:from-white/20 dark:to-white/3
                       backdrop-blur-lg backdrop-saturate-150 border border-white/40 dark:border-white/15
                       [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.06)]
                       dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_2px_rgba(0,0,0,0.3)]
                       transition-all duration-200
                       group-hover:from-white/80 group-hover:to-white/25 dark:group-hover:from-white/25 dark:group-hover:to-white/5"
          />
          <FaArrowLeft className="relative z-10 h-3 w-3 text-black/60 dark:text-white/80 group-hover:text-black/80 dark:group-hover:text-white transition-colors duration-200" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={() => rotateCarousel("right")}
          className={`group relative flex items-center justify-center ${BUTTON_SIZE_CLASSES} rounded-full overflow-hidden
                     shadow-sm shadow-black/10 dark:shadow-black/30
                     transition-transform duration-200 active:scale-90 cursor-pointer`}
        >
          <span
            className="absolute inset-0 rounded-full
                       bg-linear-to-b from-white/70 to-white/20 dark:from-white/20 dark:to-white/3
                       backdrop-blur-lg backdrop-saturate-150 border border-white/40 dark:border-white/15
                       [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.06)]
                       dark:[box-shadow:inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_2px_rgba(0,0,0,0.3)]
                       transition-all duration-200
                       group-hover:from-white/80 group-hover:to-white/25 dark:group-hover:from-white/25 dark:group-hover:to-white/5"
          />
          <FaArrowRight className="relative z-10 h-3 w-3 text-black/60 dark:text-white/80 group-hover:text-black/80 dark:group-hover:text-white transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
};

export default Carousel360;
