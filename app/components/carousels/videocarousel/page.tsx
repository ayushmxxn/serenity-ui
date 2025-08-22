"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import VideoCarousel from "./components/VideoCarousel";

// Source code for VideoCarousel component
const sourcecode = `
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import Image from "next/image";

export interface Video {
  id: number;
  title: string;
  src: string;
  srcLow: string;
  description: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Cosmic Journey",
    src: "/video/video1-low.mp4",
    srcLow: "/video/video1-low.mp4",
    description:
      "A masked traveler ventures through the cosmos in search of an elusive truth.",
  },
  {
    id: 2,
    title: "Ocean Depths",
    src: "/video/video2-low.mp4",
    srcLow: "/video/video2-low.mp4",
    description:
      "A girl waits on a secluded shore, anticipating the arrival of the masked traveler.",
  },
  {
    id: 3,
    title: "Nature's Whisper",
    src: "/video/video3-low.mp4",
    srcLow: "/video/video3-low.mp4",
    description:
      "The traveler, immersed in nature, experiences profound emotions and goosebumps.",
  },
  {
    id: 4,
    title: "Urban Rhythm",
    src: "/video/video4-low.mp4",
    srcLow: "/video/video4-low.mp4",
    description: "A girl and boy eagerly wait for the traveler to arrive.",
  },
];

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const generateThumbnail = useCallback(
    (videoSrc: string): Promise<string> => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.muted = true;
        video.preload = "metadata";

        const canvas = document.createElement("canvas");
        canvas.width = isMobile ? 40 : 48;
        canvas.height = isMobile ? 26 : 32;
        const ctx = canvas.getContext("2d");

        const captureFrame = () => {
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg");
            video.removeEventListener("seeked", captureFrame);
            video.remove();
            resolve(dataUrl);
          } else {
            resolve("/thumbnails/placeholder.jpg");
          }
        };

        video.addEventListener("seeked", captureFrame);
        video.addEventListener("error", () => {
          resolve("/thumbnails/placeholder.jpg");
        });

        video.currentTime = 1;
      });
    },
    [isMobile]
  );

  useEffect(() => {
    const generateAllThumbnails = async () => {
      const thumbnailPromises = videos.map((video) =>
        generateThumbnail(isMobile ? video.srcLow : video.src)
      );
      const thumbnailUrls = await Promise.all(thumbnailPromises);
      setThumbnails(thumbnailUrls);
    };

    generateAllThumbnails();
  }, [isMobile, generateThumbnail]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && isPlaying) {
          video
            .play()
            .catch((error) => console.error("Video playback failed:", error));
        } else {
          video.pause();
          if (index !== currentIndex) {
            video.currentTime = 0;
          }
        }
      }
    });
  }, [currentIndex, isPlaying]);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setIsPlaying(true);
  };

  const prevVideo = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-screen rounded-lg flex items-center justify-center overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: \`
            @keyframes shine {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          \`,
        }}
      />
      <div className="absolute inset-0 bg-[url('/path/to/noise-texture.png')] opacity-5 mix-blend-overlay" />
      <AnimatePresence initial={false}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className={\`absolute w-[90%] md:w-[80%] h-[60%] md:h-[70%] bg-black bg-opacity-60 rounded-2xl shadow-2xl shadow-black flex items-center justify-center overflow-hidden
              \${index === currentIndex ? "z-20" : "z-10"}
              \${index === (currentIndex + 1) % videos.length ? "z-0" : ""}
              \${index === (currentIndex - 1 + videos.length) % videos.length ? "z-0" : ""}\`}
            initial={{
              scale: isMobile ? 0.9 : 0.8,
              x: index > currentIndex ? "100%" : "-100%",
              opacity: 0,
              rotateY: index > currentIndex ? 45 : -45,
            }}
            animate={{
              scale: index === currentIndex ? 1 : isMobile ? 0.9 : 0.8,
              x: index === currentIndex ? 0 : index > currentIndex ? "100%" : "-100%",
              opacity: index === currentIndex ? 1 : 0.3,
              rotateY: index === currentIndex ? 0 : index > currentIndex ? 45 : -45,
            }}
            exit={{
              scale: isMobile ? 0.9 : 0.8,
              x: index < currentIndex ? "-100%" : "100%",
              opacity: 0,
              rotateY: index < currentIndex ? -45 : 45,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full group">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={isMobile ? video.srcLow : video.src}
                className="w-full h-full object-cover"
                autoPlay={false}
                loop
                muted
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute max-w-[80%] md:max-w-96 bottom-0 left-0 right-0 p-4 md:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <span className="text-xl md:text-3xl font-bold">{video.title}</span>
                <p className="text-xs md:text-sm opacity-80 mt-1">{video.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-30 w-8 h-8 flex items-center justify-center bg-white/10 rounded-full shadow-sm text-white opacity-60 hover:opacity-100 transition-all duration-300"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" strokeWidth={2} />
        ) : (
          <Play className="w-4 h-4" strokeWidth={2} />
        )}
      </button>
      <div className="absolute bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 md:space-x-3 bg-black/30 rounded-lg p-2">
        <button
          onClick={prevVideo}
          aria-label="Previous video"
          className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full shadow-sm text-white opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <SkipBack className="w-4 h-4" strokeWidth={2} />
        </button>
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPlaying(true);
            }}
            className={\`relative w-10 md:w-12 h-6 md:h-8 rounded-lg overflow-hidden transition-all duration-300
              \${index === currentIndex ? "scale-110 border-1 border-white/50" : "scale-100 bg-black/40"}
              hover:scale-105 hover:bg-black/20 focus:outline-none focus:ring-1 focus:ring-white/50\`}
            aria-label={\`Go to video \${video.title}\`}
          >
            <Image
              width={100}
              height={100}
              src={thumbnails[index] || "/thumbnails/placeholder.jpg"}
              alt={\`\${video.title} thumbnail\`}
              className="w-full h-full object-cover"
            />
            {index === currentIndex && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  animation: "shine 2s linear infinite",
                  transform: "translateX(-100%)",
                }}
              />
            )}
            <span className="sr-only">{video.title}</span>
          </button>
        ))}
        <button
          onClick={nextVideo}
          aria-label="Next video"
          className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full shadow-sm text-white opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <SkipForward className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
`;

const LazySyntaxHighlighter = React.lazy(() =>
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }))
);

interface CustomButtonProps {
  label?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "light" | "dark";
  showTooltip?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  icon,
  variant = "dark",
  showTooltip = false,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleClick = () => {
    onClick();
    if (showTooltip) {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center font-medium justify-center px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
          variant === "light"
            ? "bg-neutral-200 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:text-neutral-700"
            : "bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 hover:bg-neutral-700/50 hover:text-neutral-100"
        } ${!label ? "p-2" : ""}`}
        onClick={handleClick}
      >
        {icon && <span className={label ? "mr-1" : ""}>{icon}</span>}
        {label}
      </button>
      {showTooltip && tooltipVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-200 text-neutral-900 text-xs rounded-md shadow-lg z-10">
          Copied!
        </div>
      )}
    </div>
  );
};

const ComponentShowcase: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedModalCode, setCopiedModalCode] = useState(false);

  const copyCLI = () => {
    navigator.clipboard.writeText(
      "npx @ayushmxxn/serenity-ui@latest add video-carousel"
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(sourcecode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyModalCode = () => {
    navigator.clipboard.writeText(sourcecode);
    setCopiedModalCode(true);
    setTimeout(() => setCopiedModalCode(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCode(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section className="min-h-screen bg-neutral-950 text-white pb-12 relative">
      {/* Profile Image */}
      <a
        href="https://ayushmxxn.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-50 hidden sm:flex"
      >
        <Image
          src="https://i.ibb.co/pBPsjfg2/myavatar.jpg"
          alt="Your Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </a>

      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-8 lg:px-12">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Video Carousel
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            Video Carousel with automatic playback and manual navigation
            controls.
          </p>
        </div>

        {/* Button Section */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <CustomButton
              label="Show Code"
              onClick={() => setShowCode(!showCode)}
              icon={<Code className="w-4 h-4" />}
              variant="light"
            />
          </div>
          <CustomButton
            label="Add with CLI"
            onClick={copyCLI}
            icon={<SquareTerminal className="w-4 h-4" />}
            variant="dark"
            showTooltip={true}
          />
        </div>

        <motion.div className="bg-neutral-950 w-full border-t border-neutral-900 overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full">
            <VideoCarousel />
          </div>
        </motion.div>

        {/* Custom Modal */}
        {showCode && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCode(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.div>

            {/* Modal */}
            <motion.div
              className={`${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] ring-4 ring-[#171717] rounded-xl w-full max-w-4xl h-auto max-h-[71vh] shadow-2xl flex flex-col z-50 mx-1 relative`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-[#2D2D2D]">
                <CustomButton
                  label="Go Back"
                  onClick={() => setShowCode(false)}
                  variant="dark"
                />
                <CustomButton
                  icon={
                    copiedModalCode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )
                  }
                  onClick={copyModalCode}
                  variant="dark"
                />
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pb-4 px-4">
                <Suspense fallback={<div>Loading code...</div>}>
                  <LazySyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    showLineNumbers
                    wrapLongLines={false}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "#1A1A1A",
                      fontSize: "0.875rem",
                      minHeight: "100%",
                      maxWidth: "100%",
                      overflowX: "auto",
                    }}
                  >
                    {sourcecode}
                  </LazySyntaxHighlighter>
                </Suspense>
              </div>

              {/* Scrollbar Styles */}
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #4a4a4a;
                  border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background-color: #6b6b6b;
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ComponentShowcase;
