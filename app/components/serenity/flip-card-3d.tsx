"use client";

import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Replace these with your own images
const DEFAULT_IMAGES = [
  {
    src: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sunset landscape",
  },
  {
    src: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Desert scene",
  },
  {
    src: "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Red building",
  },
  {
    src: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=600",
    alt: "Cactus close-up",
  },
  {
    src: "https://images.pexels.com/photos/70568/spotted-baumwaran-monitor-tree-monitor-lizard-70568.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Ocean view",
  },
];

// Card size — small and photo-like, no frame around them
const CARD_WIDTH_CLASS = "w-64 sm:w-72";
const CARD_HEIGHT_CLASS = "h-32 sm:h-36";

// How the stack peeks out from behind the front card before you even hover it.
// Each card behind sits a little further out and a little smaller, like a real pile of photos
const REST_PEEK_X = 7; // how far each card behind shifts sideways
const REST_PEEK_Y = 7; // how far each card behind shifts down
const REST_PEEK_SCALE_STEP = 0.025; // how much smaller each card behind gets
const REST_PEEK_ROTATIONS = [0, -3, 4, -2.5, 3]; // slight tilt per card, index 0 is the front one

// How much the whole stack rises when you hover it, so nothing gets clipped by the page
const FAN_LIFT_DESKTOP = -50;
const FAN_LIFT_MOBILE = -40;

// Gap between cards once they fan out
const FAN_SPREAD_X = 45; // sideways gap on desktop
const FAN_SPREAD_Y_MOBILE = 42; // downward gap on mobile

// How high a card rises when you click it to bring it fully to front
const POP_LIFT_DESKTOP = -130;
const POP_LIFT_MOBILE = -110;
const POP_SCALE = 1.18;

// Spring feel for each state. Higher stiffness snaps quicker, higher damping settles smoother.
// POP_SPRING carries extra `mass` so the click-to-center motion feels like it has real
// physical weight landing in place, rather than a light, snappy bounce.
const REST_SPRING: Transition = { type: "spring", stiffness: 300, damping: 22 };
const FAN_SPRING: Transition = { type: "spring", stiffness: 280, damping: 26 };
const POP_SPRING: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 1.6,
};

// Shadows modeled on light falling from above. They stay soft and low opacity at rest,
// and only grow bigger and softer as a card lifts further off the stack, like in real life
const SHADOW_REST = "0 2px 6px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
const SHADOW_POPPED =
  "0 30px 45px rgba(0,0,0,0.16), 0 10px 15px rgba(0,0,0,0.08)";
const fannedShadow = (depth: number) =>
  `0 ${6 + depth * 2}px ${16 + depth * 3}px rgba(0,0,0,${0.07 + depth * 0.015})`;

const MOBILE_BREAKPOINT = 768;

interface FlipImage {
  src: string;
  alt: string;
}

interface CardProps {
  image: FlipImage;
  index: number;
  isStackHovered: boolean;
  isMobile: boolean;
  isFront: boolean;
  anyCardIsFront: boolean;
  onClick: (index: number) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  index,
  isStackHovered,
  isMobile,
  isFront,
  anyCardIsFront,
  onClick,
}) => {
  const fanLift = isMobile ? FAN_LIFT_MOBILE : FAN_LIFT_DESKTOP;
  const popLift = isMobile ? POP_LIFT_MOBILE : POP_LIFT_DESKTOP;
  const peekRotation = REST_PEEK_ROTATIONS[index] ?? 0;

  // Each state is explicitly typed as `TargetAndTransition` so all three share one
  // consistent shape (including the optional `rotateY` field that only `fannedState`
  // and `poppedState` use). Without this, TS infers three structurally different
  // object types and the union assigned to `animate` no longer matches what
  // `motion.div` expects, which is the root cause of the original error.
  // While another card is popped to center, every non-front card dims down (in
  // addition to the existing blur) so the focused card visually "pops" against a
  // faded backdrop, matching the reference image.
  const backgroundOpacity = anyCardIsFront && !isFront ? 0.35 : 1;

  const restState: TargetAndTransition = {
    rotate: isMobile ? 0 : peekRotation,
    x: index * REST_PEEK_X,
    y: index * REST_PEEK_Y,
    scale: 1 - index * REST_PEEK_SCALE_STEP,
    opacity: backgroundOpacity,
    boxShadow: SHADOW_REST,
    transition: { ...REST_SPRING, delay: (4 - index) * 0.06 },
  };

  const fannedState: TargetAndTransition = {
    rotate: 0,
    rotateY: isMobile ? 0 : -45,
    x: isMobile ? 0 : index * FAN_SPREAD_X,
    y: (isMobile ? index * FAN_SPREAD_Y_MOBILE : index * -6) + fanLift,
    scale: 1.04,
    opacity: backgroundOpacity,
    boxShadow: fannedShadow(index),
    transition: { ...FAN_SPRING, delay: index * 0.07 },
  };

  const poppedState: TargetAndTransition = {
    rotate: 0,
    rotateY: 0,
    x: 0,
    y: popLift,
    scale: POP_SCALE,
    opacity: 1,
    boxShadow: SHADOW_POPPED,
    transition: POP_SPRING,
  };

  const animate: TargetAndTransition = isFront
    ? poppedState
    : isStackHovered
      ? fannedState
      : restState;

  return (
    <motion.div
      className={`absolute ${CARD_WIDTH_CLASS} ${CARD_HEIGHT_CLASS} rounded-2xl overflow-hidden cursor-pointer ${
        isFront ? "z-20" : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: isMobile ? "top center" : "left center",
        zIndex: isFront ? 20 : 5 - index,
        filter: isFront || !anyCardIsFront ? "none" : "blur(5px)",
      }}
      initial={restState}
      animate={animate}
      onClick={() => onClick(index)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover rounded-2xl"
        sizes="(max-width: 640px) 256px, 288px"
        loading="lazy"
      />
    </motion.div>
  );
};

interface FlipCard3DProps {
  images?: FlipImage[];
}

export const FlipCard3D: React.FC<FlipCard3DProps> = ({
  images = DEFAULT_IMAGES,
}) => {
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [frontIndex, setFrontIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkScreenSize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCardClick = (index: number) => {
    setFrontIndex((current) => (current === index ? null : index));
  };

  // Leaving the stack area closes a popped card AND un-fans the rest, in one place.
  // This is more reliable than listening on the popped card's own mouse-leave,
  // since that element is mid-animation (scaling/translating) right after a click —
  // tracking the whole stack's hover area avoids relying on a moving hitbox.
  const handleStackMouseLeave = () => {
    setIsStackHovered(false);
    setFrontIndex(null);
  };

  return (
    <div className="flex justify-center items-center py-24 sm:py-28 select-none">
      <div
        className={`relative ${CARD_WIDTH_CLASS} ${CARD_HEIGHT_CLASS}`}
        style={{ perspective: 1000 }}
        onMouseEnter={() => setIsStackHovered(true)}
        onMouseLeave={handleStackMouseLeave}
      >
        {images.map((image, index) => (
          <Card
            key={image.src}
            image={image}
            index={index}
            isStackHovered={isStackHovered}
            isMobile={isMobile}
            isFront={frontIndex === index}
            anyCardIsFront={frontIndex !== null}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FlipCard3D;
