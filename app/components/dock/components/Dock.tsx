/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

interface AnimatedDockProps {
  className?: string;
  items?: {
    link?: string;
    Icon?: React.ReactNode;
    target?: string;
    defaultBgColor?: string;
    hoverBgColor?: string;
    tooltip?: string; // Optional tooltip text
  }[];
  position?: 'left' | 'right' | 'top' | 'bottom';
}

const Dock = ({ className = '', items = [], position = 'bottom' }: AnimatedDockProps) => {
  let mouseX = useMotionValue(Infinity);
  let mouseY = useMotionValue(Infinity);

  const containerStyles = {
    left: 'left-0 ml-2 top-1/2 transform -translate-y-1/2',
    right: 'right-0 mr-2 top-1/2 transform -translate-y-1/2',
    top: 'top-0 mt-2 left-1/2 transform -translate-x-1/2',
    bottom: 'bottom-0 mb-2 left-1/2 transform -translate-x-1/2',
  }[position];

  const dockLayout = position === 'top' || position === 'bottom' ? 'flex-row' : 'flex-col';

  // Tooltip animation variants based on position
  const tooltipVariants = {
    top: { opacity: 1, y: 0 },
    bottom: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
  };

  const tooltipInitial = {
    top: { opacity: 0, y: -10 },
    bottom: { opacity: 0, y: 10 },
    left: { opacity: 0, x: -10 },
    right: { opacity: 0, x: 10 },
  };

  const tooltipTransition = { duration: 0.3, ease: 'easeOut' };

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      className={cn(
        `flex ${dockLayout} items-center gap-2 sm:gap-3 md:gap-4 rounded-full bg-zinc-800/70 border border-white border-opacity-5 absolute ${containerStyles}`,
        className
      )}
    >
      {items.map((item, index) => {
        let ref = useRef<HTMLDivElement>(null);
        const [hovered, setHovered] = useState(false);

        let distance;
        if (position === 'top' || position === 'bottom') {
          distance = useTransform(mouseX, (val) => {
            let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
            return val - bounds.x - bounds.width / 2;
          });
        } else {
          distance = useTransform(mouseY, (val) => {
            let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
            return val - bounds.y - bounds.height / 2;
          });
        }

        let scaleSync = useTransform(distance, [-150, 0, 150], [0.8, 1.2, 0.8]);
        let scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

        // Tooltip position classes (You will need to adjust this based on the title size of your tooltip)
        const tooltipPositionClasses = {
          top: 'top-full mt-2 -left-2 transform -translate-x-1/2',
          bottom: 'bottom-full mb-2 -left-2 transform -translate-x-1/2',
          left: 'left-full ml-2 top-2 transform -translate-y-1/2',
          right: 'right-full mr-2 top-2 transform -translate-y-1/2',
        };

        return (
          <div key={index} className="relative">
            {item.tooltip && (
              <motion.div
                initial={tooltipInitial[position]}
                animate={hovered ? tooltipVariants[position] : tooltipInitial[position]}
                transition={tooltipTransition}
                className={`absolute whitespace-nowrap bg-zinc-800 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ${tooltipPositionClasses[position]}`}
                style={{ visibility: hovered ? 'visible' : 'hidden' }}
              >
                {item.tooltip}
              </motion.div>
            )}
            <motion.div
              ref={ref}
              style={{ scale }}
              className={`aspect-square h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 ${hovered ? item.hoverBgColor || 'bg-zinc-700' : item.defaultBgColor || 'bg-zinc-700'}`}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <Link
                href={item.link || '#'}
                target={item.target || '_self'}
                className="flex items-center justify-center w-10 h-10"
              >
                {item.Icon}
              </Link>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
