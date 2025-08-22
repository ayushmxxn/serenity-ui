"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import VoiceTestimonial from "./components/VoiceTestimonial";

// Source code for VoiceTestimonial component
const sourcecode = `"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { motion, Variants } from "framer-motion";

interface Testimonial {
  image?: string;
  name?: string;
  jobtitle?: string;
  text?: string;
  audio?: string;
  social?: string;
}

// testimonials data 
const testimonials: Testimonial[] = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I'm blown away by the versatility of the components in this library. They make UI development a breeze!",
    name: "Alice Johnson",
    jobtitle: "Frontend Developer",
    audio: "Alice.mp3",
    social: "https://x.com/ayushmxxn",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
    name: "David Smith",
    jobtitle: "UI Designer",
    audio: "David.mp3",
    social: "https://x.com/ayushmxxn",
  },
  {
    image: "https://i.imgur.com/kaDy9hV.jpeg",
    text: "The components in this library are not just well-designed but also highly customizable. It's a developer's dream!",
    name: "Emma Brown",
    jobtitle: "Software Engineer",
    audio: "Emma.mp3",
    social: "https://x.com/ayushmxxn",
  },
];

const WaveVariants = (numBars: number): Variants[] => {
  const waveVariants: Variants[] = [];
  for (let i = 0; i < numBars; i++) {
    waveVariants.push({
      initial: {
        scaleY: 1.5,
        transition: {
          duration: 0.5,
        },
      },
      animate: {
        scaleY: [1, Math.random() * 1.2 + 1, 1],
        transition: {
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 0.5,
        },
      },
    });
  }
  return waveVariants;
};

const VoiceTestimonial: React.FC = () => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  );
  const [audioElements, setAudioElements] = useState<
    (HTMLAudioElement | null)[]
  >([]);
  const [showAll, setShowAll] = useState(false);
  const [waveVariants, setWaveVariants] = useState<Variants[]>([]);
  const audioContainerRef = useRef<HTMLDivElement>(null);

  // Calculate number of wave bars based on container width
  useEffect(() => {
    if (audioContainerRef.current) {
      const containerWidth = audioContainerRef.current.offsetWidth - 32 - 16; 
      const barWidth = 4; // Width (2px) + margin (1.5px * 2)
      const numBars = Math.max(10, Math.floor(containerWidth / barWidth));
      setWaveVariants(WaveVariants(numBars));
    }
  }, []);

  // Handle audio elements
  useEffect(() => {
    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach((testimonial) => {
      if (testimonial.audio) {
        const audio = new Audio(\`/audio/\${testimonial.audio}\`);
        audio.addEventListener("ended", handleAudioEnded);
        elements.push(audio);
      } else {
        elements.push(null);
      }
    });
    setAudioElements(elements);

    return () => {
      elements.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.removeEventListener("ended", handleAudioEnded);
        }
      });
    };
  }, []);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      stopAudio(currentPlayingIndex);
    }

    const audio = audioElements[index];
    if (audio) {
      audio
        .play()
        .catch((error) => console.error("Audio playback error:", error));
      setCurrentPlayingIndex(index);
    }
  };

  const stopAudio = (index: number) => {
    const audio = audioElements[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentPlayingIndex(null);
    }
  };

  const handlePause = (index: number) => {
    stopAudio(index);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingIndex(null);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const openInNewTab = (url: string) => {
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
    }
  };

  const shouldShowLoadMore = testimonials.length > 6;

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8"></div>
      </div>
      <div className="relative">
        <div
          className={\`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden \${
            showAll ? "max-h-full" : "max-h-[720px]"
          } relative\`}
        >
          {shouldShowLoadMore && !showAll && (
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
          )}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={\`bg-white border border-neutral-300 w-64 h-auto rounded-2xl p-4 relative \${
                !showAll && index >= 6 ? "testimonial-partially-visible" : ""
              }\`}
            >
              <div
                onClick={() => openInNewTab(testimonial.social || "")}
                className="absolute top-4 right-4"
              >
                <RiTwitterXLine
                  className="text-neutral-800 cursor-pointer"
                  size={18}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "https://via.placeholder.com/40"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col pl-3">
                  <span className="text-black text-sm">{testimonial.name}</span>
                  <span className="text-neutral-600 text-xs">
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
              <div className="mt-4 mb-1">
                <span className="text-black text-sm">{testimonial.text}</span>
              </div>
              <div
                ref={audioContainerRef}
                className="bg-stone-100 w-full h-10 mt-3 rounded-lg flex justify-between items-center p-2 relative"
              >
                {currentPlayingIndex !== index ? (
                  <span classname="cursor-pointer" onClick={() => handlePlay(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-neutral-600 size-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span onClick={() => handlePause(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-neutral-600 size-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                      />
                    </svg>
                  </span>
                )}
                <div className="flex flex-1 items-center justify-between">
                  {waveVariants.map((variant, i) => (
                    <motion.div
                      key={i}
                      className="bg-neutral-600"
                      style={{
                        flex: "1 1 0",
                        height: "20px",
                        margin: "0 1px",
                        borderRadius: "1px",
                      }}
                      variants={variant}
                      initial="initial"
                      animate={
                        currentPlayingIndex === index ? "animate" : "initial"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {shouldShowLoadMore && !showAll && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <button
              onClick={handleLoadMore}
              className="whiteshimmerbtn py-2 px-4 rounded-full"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceTestimonial;`;

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
      "npx @ayushmxxn/serenity-ui@latest add voice-testimonial"
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
            Voice Testimonial
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            A reusable, customizable testimonial component with audio playback,
            built for seamless integration into your Next.js projects.
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
            <VoiceTestimonial />
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
