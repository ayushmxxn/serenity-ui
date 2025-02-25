// ProductCard.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Monitor,
  Users,
  Star,
  Palette,
  SearchCheck,
  Sparkles,
  LucideIcon,
} from "lucide-react";

// Types
interface Technology {
  iconUrl: string;
  alt: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Constants
const INITIAL_SPOTS = 5;
const THREE_DAYS_IN_SECONDS = 3 * 24 * 3600;
const MIN_ACTIVE_BUYERS = 1;
const MAX_ACTIVE_BUYERS = 50;

const technologies: Technology[] = [
  { iconUrl: "/image/nextjs.svg", alt: "Next.js" },
  { iconUrl: "/image/tailwind.svg", alt: "Tailwind" },
  { iconUrl: "/image/typescript.svg", alt: "TypeScript" },
  { iconUrl: "/image/motion.svg", alt: "React" },
  { iconUrl: "/image/gsap.svg", alt: "GSAP" },
];

const features: Feature[] = [
  {
    icon: Palette,
    title: "Easily Customizable",
    description:
      "Customize colors, layouts, and components to match your brand identity perfectly",
  },
  {
    icon: Monitor,
    title: "Responsive Design",
    description:
      "Flawlessly adapts to any screen size from mobile devices to large desktops",
  },
  {
    icon: SearchCheck,
    title: "SEO Optimized",
    description:
      "Built with best practices for search engine optimization and faster indexing",
  },
  {
    icon: Sparkles,
    title: "Beautiful Animations",
    description:
      "Smooth, performant animations and transitions that enhance user experience",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Technology icon component
const TechnologyIcon: React.FC<Technology> = ({ iconUrl, alt }) => (
  <div className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all">
    <Image
      src={iconUrl}
      alt={alt}
      width={24}
      height={24}
      className="w-6 h-6"
      priority
    />
  </div>
);

const ProductCard: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [activeBuyers, setActiveBuyers] = useState(
    () =>
      Math.floor(Math.random() * (MAX_ACTIVE_BUYERS - MIN_ACTIVE_BUYERS)) +
      MIN_ACTIVE_BUYERS
  );
  const [remainingSpots, setRemainingSpots] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    document.title = "Templates";
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initializeTimer = (): void => {
      const storedEndTime = localStorage.getItem("offerEndTime");
      const storedSpots = localStorage.getItem("remainingSpots");

      if (!storedEndTime) {
        const endTime = Date.now() + THREE_DAYS_IN_SECONDS * 1000;
        localStorage.setItem("offerEndTime", endTime.toString());
        localStorage.setItem("remainingSpots", INITIAL_SPOTS.toString());
        setRemainingSpots(INITIAL_SPOTS);
      } else {
        const currentSpots = parseInt(storedSpots || INITIAL_SPOTS.toString());
        setRemainingSpots(currentSpots);
      }
    };

    const updateTimer = (): void => {
      const endTime = parseInt(localStorage.getItem("offerEndTime") || "0");
      const now = Date.now();
      const difference = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(difference);

      if (difference <= 0) {
        localStorage.removeItem("offerEndTime");
        localStorage.removeItem("remainingSpots");
        initializeTimer();
      }
    };

    const updateActiveBuyers = (): void => {
      setActiveBuyers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.min(
          Math.max(prev + change, MIN_ACTIVE_BUYERS),
          MAX_ACTIVE_BUYERS
        );
      });
    };

    const decreaseSpots = (): void => {
      const currentSpots = parseInt(
        localStorage.getItem("remainingSpots") || INITIAL_SPOTS.toString()
      );
      if (currentSpots > 1) {
        const newSpots = currentSpots - 1;
        localStorage.setItem("remainingSpots", newSpots.toString());
        setRemainingSpots(newSpots);
      }
    };

    initializeTimer();
    updateTimer();

    const timerInterval = setInterval(updateTimer, 1000);
    const buyerInterval = setInterval(updateActiveBuyers, 15000);
    const spotDecreaseInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        decreaseSpots();
      }
    }, 30 * 60 * 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(buyerInterval);
      clearInterval(spotDecreaseInterval);
    };
  }, [isClient]);

  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return "Loading...";
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-4 sm:p-8"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/15 rounded-full filter blur-[120px] animate-pulse"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/15 rounded-full filter blur-[120px] animate-pulse"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Status banner */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-3 mb-8 backdrop-blur-sm border border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-emerald-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                {activeBuyers} people are viewing this template
              </span>
            </div>
            <div className="hidden sm:block text-white/30">|</div>
            <span className="text-sm font-medium text-amber-400">
              Only {remainingSpots} spots left at this price!
            </span>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
              >
                SaaSFlow Landing Page
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 flex-wrap"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-400">4.9/5</span>
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg sm:text-xl leading-relaxed"
            >
              A Modern and Stunning SaaS Template for High-Converting Websites.
              Launch Your SaaS Faster!
            </motion.p>

            {/* Technologies section */}
            <div className="space-y-4">
              <h3 className="text-gray-400 font-medium">
                Built with modern tech stack
              </h3>
              <div className="flex flex-wrap gap-4">
                {technologies.map((tech, index) => (
                  <TechnologyIcon key={index} {...tech} />
                ))}
              </div>
            </div>

            {/* Timer and CTA section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white">
                <div className="bg-emerald-500/10 px-4 py-2 rounded-lg">
                  <span className="font-mono text-emerald-400">
                    Special Launch Price
                  </span>
                </div>
                <div className="text-gray-400">
                  Offer ends in:{" "}
                  <span className="text-white font-mono">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://ayushmxxn.gumroad.com/l/saas-template/t0bwno0"
                    target="blank"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="bg-white px-6 sm:px-8 py-4 rounded-xl font-medium flex items-center justify-center hover:bg-gray-100 transition-all group border border-gray-300 w-full sm:w-auto"
                    >
                      <span className="text-gray-900 flex items-center">
                        <span className="text-gray-500 line-through mr-2">
                          $79
                        </span>
                        <span className="font-semibold text-gray-900">
                          Buy Now $39
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-900 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </a>
                  <a
                    href="https://ayushmxxn-saas-template.netlify.app/"
                    target="blank"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="border border-white/10 bg-white/5 text-white px-6 sm:px-8 py-4 rounded-xl font-medium backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto"
                    >
                      Live Preview
                    </motion.button>
                  </a>
                </div>

                {/* Affiliate Program Link */}
                <a
                  href="https://ayushmxxn.gumroad.com/affiliates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="flex px-5 items-center justify-start gap-2 text-purple-400 hover:text-purple-300 transition-colors p-2 rounded-lg border border-purple-400/20 hover:border-purple-400/30 bg-purple-400/5 backdrop-blur-sm w-fit"
                  >
                    <span className="font-medium">
                      Join our affiliate program and earn 20% on every sale!
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 sm:space-y-8"
          >
            {/* Video preview */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -inset-0.5 rounded-2xl blur opacity-30"></div>
              <div className="relative w-full h-fit rounded-xl overflow-hidden bg-black/50 border border-white/10">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full"
                >
                  <source src="/video/saas-template.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            {/* Features grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <feature.icon className="w-8 h-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-medium">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
