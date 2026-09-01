"use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

// Your images live here. Swap these out or pass your own via the `cards` prop.
const defaultCards = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1712820504667-8952366b02d3?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1719776555224-75afcc74d03b?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1653199898411-b93028f1a916?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1697468792373-ad4181550a5a?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1697577504575-5bee362e57a2?q=80&w=1887&auto=format&fit=crop",
  },
];

// Change how the stack looks and feels here — no need to touch the logic below.
const defaultSettings = {
  width: 320, // card width in px (this is the desktop/base size)
  height: 320, // card height in px (this is the desktop/base size)
  radius: 16, // corner roundness in px
  swipeThreshold: 120, // how far someone has to drag before the card flies off
  stackRotation: 5, // degrees each card behind the front one tilts
  stackScale: 0.035, // how much smaller each card behind the front one gets
  tiltStrength: 25, // how far the card tilts while dragging (3D effect)
  springStiffness: 300, // how snappy the drag/return animation feels
  springDamping: 30, // how quickly the bounce settles
  // Below this viewport width, cards shrink by mobileScale. Tweak either value
  // to control how small (or whether) the stack shrinks on phones.
  mobileBreakpoint: 480,
  mobileScale: 0.8,
};

export type SwipeCardsSettings = typeof defaultSettings;

export interface SwipeCardItem {
  id: number | string;
  img: string;
}

interface SwipeCardProps {
  children: React.ReactNode;
  isFront: boolean;
  zIndex: number;
  onSendToBack: () => void;
  settings: SwipeCardsSettings;
}

function SwipeCard({
  children,
  isFront,
  zIndex,
  onSendToBack,
  settings,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // These turn your drag distance into a 3D tilt. Bigger tiltStrength = more dramatic tilt.
  const rotateX = useTransform(
    y,
    [-200, 200],
    [settings.tiltStrength, -settings.tiltStrength],
  );
  const rotateY = useTransform(
    x,
    [-200, 200],
    [-settings.tiltStrength, settings.tiltStrength],
  );

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    const draggedFarEnough =
      Math.abs(info.offset.x) > settings.swipeThreshold ||
      Math.abs(info.offset.y) > settings.swipeThreshold;

    if (draggedFarEnough) {
      onSendToBack();
    } else {
      // Didn't drag far enough — snap back to center.
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab select-none active:cursor-grabbing"
      style={{
        width: settings.width,
        height: settings.height,
        x: isFront ? x : 0,
        y: isFront ? y : 0,
        rotateX: isFront ? rotateX : 0,
        rotateY: isFront ? rotateY : 0,
        zIndex,
      }}
      drag={isFront}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      whileHover={isFront ? { scale: 1.03 } : {}}
      transition={{
        type: "spring",
        stiffness: settings.springStiffness,
        damping: settings.springDamping,
      }}
    >
      {children}
    </motion.div>
  );
}

interface SwipeCardsProps {
  cards?: SwipeCardItem[];
  // Override any of the defaults above without touching this file again.
  settings?: Partial<SwipeCardsSettings>;
  className?: string;
}

// Shrinks the stack a bit on small screens so it doesn't feel oversized on mobile.
// Returns 1 on the server / before mount to avoid a layout jump on first paint.
function useResponsiveScale(breakpoint: number, mobileScale: number) {
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setScale(mq.matches ? mobileScale : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint, mobileScale]);

  return scale;
}

export function SwipeCards({
  cards = defaultCards,
  settings,
  className = "",
}: SwipeCardsProps) {
  const baseConfig = { ...defaultSettings, ...settings };
  const scale = useResponsiveScale(
    baseConfig.mobileBreakpoint,
    baseConfig.mobileScale,
  );
  const config = {
    ...baseConfig,
    width: Math.round(baseConfig.width * scale),
    height: Math.round(baseConfig.height * scale),
  };
  const [cardList, setCardList] = useState(cards);

  // Sends the front card to the back of the pile after a swipe.
  const moveToBack = (id: number | string) => {
    setCardList((prev) => {
      const updated = [...prev];
      const cardIndex = updated.findIndex((card) => card.id === id);
      if (cardIndex !== -1) {
        const [movedCard] = updated.splice(cardIndex, 1);
        updated.push(movedCard);
      }
      return updated;
    });
  };

  return (
    <div
      className={`flex items-center justify-center p-6 select-none ${className}`}
    >
      <div
        className="relative mx-auto"
        style={{
          width: config.width,
          height: config.height,
          perspective: 1200,
        }}
      >
        {cardList.map((card, index) => {
          const isFront = index === 0;
          const zIndex = cardList.length - index;

          return (
            <SwipeCard
              key={card.id}
              isFront={isFront}
              zIndex={zIndex}
              settings={config}
              onSendToBack={() => moveToBack(card.id)}
            >
              <motion.div
                className="relative h-full w-full overflow-hidden bg-neutral-900 shadow-xl"
                style={{ borderRadius: config.radius }}
                animate={{
                  rotateZ: index * config.stackRotation,
                  scale: 1 - index * config.stackScale,
                  transformOrigin: "85% 85%",
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <Image
                  src={card.img}
                  alt={`card-${card.id}`}
                  fill
                  className="pointer-events-none object-cover"
                  sizes={`${config.width}px`}
                  priority={isFront}
                />
              </motion.div>
            </SwipeCard>
          );
        })}
      </div>
    </div>
  );
}

export default SwipeCards;
