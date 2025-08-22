"use client";

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

// Define testimonials data within the component
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
      const containerWidth = audioContainerRef.current.offsetWidth - 32 - 16; // Subtract button width (32px) and padding (8px * 2)
      const barWidth = 4; // Width (2px) + margin (1.5px * 2)
      const numBars = Math.max(10, Math.floor(containerWidth / barWidth)); // Ensure at least 10 bars
      setWaveVariants(WaveVariants(numBars));
    }
  }, []);

  // Handle audio elements
  useEffect(() => {
    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach((testimonial) => {
      if (testimonial.audio) {
        const audio = new Audio(`/audio/${testimonial.audio}`);
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
        <div className="flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden relative">
          {shouldShowLoadMore && !showAll && (
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
          )}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white border border-neutral-300 w-64 h-auto rounded-2xl p-4 relative ${
                !showAll && index >= 6 ? "testimonial-partially-visible" : ""
              }`}
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
                className="bg-stone-100  w-full h-10 mt-3 rounded-lg flex justify-between items-center p-2 relative"
              >
                {currentPlayingIndex !== index ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => handlePlay(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-neutral-600 size-8 "
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
                        flex: "1 1 0", // Distribute space evenly
                        height: `${Math.random() * 15 + 4}px`, // Random height
                        margin: "0 1px", // Reduced margin for spacing
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

export default VoiceTestimonial;
