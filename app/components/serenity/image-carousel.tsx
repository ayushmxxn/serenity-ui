"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// ---- Customize here ----
const imgs = [
  "https://images.unsplash.com/photo-1719977325297-e3f142f2f171?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1692177367567-e8fcff0a82ba?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586122891856-5f90886b0cee?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718966148389-a0fcf76af078?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719176372917-6c96c3608161?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719965249785-bc1bd672b07d?q=75&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718406922369-50ac826bab33?q=75&w=600&auto=format&fit=crop",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 5; // time between auto-advances (ms)
const DRAG_BUFFER = 50; // how far (px) user must drag to change slide

const SPRING_OPTIONS = {
  type: "spring" as const,
  mass: 3,
  stiffness: 400,
  damping: 50,
};

// Slide size (Tailwind classes)
const SLIDE_SIZE_CLASSES = "w-[320px] sm:w-[384px] h-[320px] sm:h-[384px]";
const SLIDE_WIDTH_CLASSES = "w-[320px] sm:w-[384px]"; // used for the outer wrapper (no height)

// Scale applied to active vs. inactive slides
const ACTIVE_SCALE = 0.95;
const INACTIVE_SCALE = 0.85;

// Thumbnail size (Tailwind classes)
const THUMB_SIZE_CLASSES = "h-11 w-11 sm:h-13 sm:w-13";

// Active thumbnail border (ring) color
const ACTIVE_THUMB_RING_CLASSES = "ring-2 ring-white/60";
// ---- End customize ----

export const ImageCarousel: React.FC = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((prevIndex) =>
          prevIndex === imgs.length - 1 ? 0 : prevIndex + 1,
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden select-none py-2">
      <div className={`relative ${SLIDE_WIDTH_CLASSES} py-4`}>
        <div className="relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragX }}
            animate={{ translateX: `-${imgIndex * 100}%` }}
            transition={SPRING_OPTIONS}
            onDragEnd={onDragEnd}
            className="flex"
          >
            <Images imgIndex={imgIndex} />
          </motion.div>
        </div>

        <ThumbnailIndicators imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </div>
    </div>
  );
};

interface ImagesProps {
  imgIndex: number;
}

const Images: React.FC<ImagesProps> = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <ImageItem key={idx} imgSrc={imgSrc} imgIndex={imgIndex} idx={idx} />
      ))}
    </>
  );
};

interface ImageProps {
  imgSrc: string;
  imgIndex: number;
  idx: number;
}

const ImageItem: React.FC<ImageProps> = ({ imgSrc, imgIndex, idx }) => {
  return (
    <motion.div
      animate={{
        scale: imgIndex === idx ? ACTIVE_SCALE : INACTIVE_SCALE,
      }}
      transition={SPRING_OPTIONS}
      className={`relative ${SLIDE_SIZE_CLASSES} shrink-0 rounded-2xl overflow-hidden shadow-md dark:shadow-2xl`}
    >
      <Image
        src={imgSrc}
        alt={`Carousel slide ${idx + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 320px, 384px"
      />
    </motion.div>
  );
};

interface ThumbnailIndicatorsProps {
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbnailIndicators: React.FC<ThumbnailIndicatorsProps> = ({
  imgIndex,
  setImgIndex,
}) => {
  return (
    <div className="mt-4 flex gap-2 justify-center items-center overflow-x-auto overflow-y-visible p-1 pb-2">
      {imgs.map((imgSrc, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setImgIndex(idx)}
          aria-label={`Go to slide ${idx + 1}`}
          className={`relative ${THUMB_SIZE_CLASSES} rounded-lg overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
            idx === imgIndex
              ? `scale-110 ${ACTIVE_THUMB_RING_CLASSES} shadow-md opacity-100`
              : "opacity-60 hover:opacity-90"
          }`}
        >
          <Image
            src={imgSrc}
            alt={`Thumbnail ${idx + 1}`}
            fill
            className="object-cover"
            sizes="52px"
          />
        </button>
      ))}
    </div>
  );
};

export default ImageCarousel;
