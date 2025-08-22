/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaTiktok,
  FaReddit,
} from "react-icons/fa";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

interface AnimatedDockProps {
  className?: string;
  position?: "left" | "right" | "top" | "bottom";
}

const Dock = ({ className = "", position = "bottom" }: AnimatedDockProps) => {
  const items = [
    {
      link: "https://github.com",
      target: "_blank",
      Icon: (
        <FaGithub size={22} className="text-white group-hover:text-gray-100" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor: "bg-gradient-to-br from-zinc-600 to-zinc-800",
      tooltip: "GitHub",
    },
    {
      link: "https://x.com",
      target: "_blank",
      Icon: (
        <FaTwitter size={22} className="text-white group-hover:text-white" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor: "bg-gradient-to-br from-sky-500 to-blue-600",
      tooltip: "Twitter",
    },
    {
      link: "https://instagram.com",
      target: "_blank",
      Icon: (
        <FaInstagram size={22} className="text-white group-hover:text-white" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor:
        "bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400",
      tooltip: "Instagram",
    },
    {
      link: "https://discord.com/",
      target: "_blank",
      Icon: (
        <FaDiscord size={22} className="text-white group-hover:text-white" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
      tooltip: "Discord",
    },

    {
      link: "https://youtube.com",
      target: "_blank",
      Icon: (
        <FaYoutube size={22} className="text-white group-hover:text-white" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor: "bg-gradient-to-br from-red-500 to-red-700",
      tooltip: "YouTube",
    },
    {
      link: "https://tiktok.com",
      target: "_blank",
      Icon: (
        <FaTiktok size={22} className="text-white group-hover:text-white" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor: "bg-gradient-to-br from-black to-gray-800",
      tooltip: "TikTok",
    },
    {
      link: "https://reddit.com",
      target: "_blank",
      Icon: (
        <FaReddit size={22} className="text-white group-hover:text-white" />
      ),
      defaultBgColor: "bg-zinc-700",
      hoverBgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      tooltip: "Reddit",
    },
  ];

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const containerStyles = {
    left: "left-0 ml-2 top-1/2 transform -translate-y-1/2",
    right: "right-0 mr-2 top-1/2 transform -translate-y-1/2",
    top: "top-0 mt-2 left-1/2 transform -translate-x-1/2",
    bottom: "bottom-0 mb-2 left-1/2 transform -translate-x-1/2 ",
  }[position];

  const dockLayout =
    position === "top" || position === "bottom" ? "flex-row" : "flex-col";

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

  const tooltipTransition = { duration: 0.3, ease: "easeOut" };

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
        `flex ${dockLayout} items-center gap-0.5 sm:gap-1 md:gap-2 rounded-xl bg-zinc-800/70 border border-white border-opacity-5 absolute ${containerStyles}`,
        className
      )}
    >
      {items.map((item, index) => {
        const ref = useRef<HTMLDivElement>(null);
        const [hovered, setHovered] = useState(false);

        const distance =
          position === "top" || position === "bottom"
            ? useTransform(mouseX, (val) => {
                const bounds = ref.current?.getBoundingClientRect() ?? {
                  x: 0,
                  width: 0,
                };
                return val - bounds.x - bounds.width / 2;
              })
            : useTransform(mouseY, (val) => {
                const bounds = ref.current?.getBoundingClientRect() ?? {
                  y: 0,
                  height: 0,
                };
                return val - bounds.y - bounds.height / 2;
              });

        const scaleSync = useTransform(
          distance,
          [-150, 0, 150],
          [0.8, 1.05, 0.8]
        );
        const scale = useSpring(scaleSync, {
          mass: 0.1,
          stiffness: 200,
          damping: 15,
        });

        // Tooltip position classes
        const tooltipPositionClasses = {
          top: "top-full mt-2 -left-2 transform -translate-x-1/2 border border-zinc-700 rounded-lg text-xs",
          bottom:
            "bottom-full mb-2 -left-2 transform -translate-x-1/2 border border-zinc-700 rounded-lg text-xs",
          left: "left-full ml-2 top-2 transform -translate-y-1/2 border border-zinc-700 rounded-lg text-xs",
          right:
            "right-full mr-2 top-2 transform -translate-y-1/2 border border-zinc-700 rounded-lg text-xs",
        };

        return (
          <div key={index} className="relative group">
            {item.tooltip && (
              <motion.div
                initial={tooltipInitial[position]}
                animate={
                  hovered ? tooltipVariants[position] : tooltipInitial[position]
                }
                transition={tooltipTransition}
                className={cn(
                  `absolute whitespace-nowrap bg-zinc-800 text-white text-xs px-2 py-1 rounded transition-opacity duration-300`,
                  tooltipPositionClasses[position]
                )}
                style={{ visibility: hovered ? "visible" : "hidden" }}
              >
                {item.tooltip}
              </motion.div>
            )}
            <motion.div
              ref={ref}
              style={{ scale }}
              className={cn(
                `aspect-square h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-300`,
                hovered ? item.hoverBgColor : item.defaultBgColor
              )}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Link
                href={item.link}
                target={item.target}
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
