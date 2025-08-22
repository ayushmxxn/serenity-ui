import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// testimonials data
const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
    name: "David Smith",
    jobtitle: "UI Designer",
    audio: "David.mp3",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/6fKCuVC.png",
    text: "The components are highly responsive and work seamlessly across different devices and screen sizes.",
    name: "Emily Chen",
    jobtitle: "Mobile App Developer",
    audio: "Emily.mp3",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/bG88vHI.png",
    text: "This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.",
    name: "Sarah Taylor",
    jobtitle: "Backend Developer",
    audio: "Sarah.mp3",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/tjmS77j.png",
    text: "I appreciate the attention to detail in the design. The components are visually appealing and professional.",
    name: "Kevin White",
    jobtitle: "UI/UX Designer",
    audio: "Kevin.mp3",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/pnsLqpq.png",
    text: "I love how the components are designed to be highly responsive and work well across different screen sizes.",
    name: "Brian Kim",
    jobtitle: "Mobile App Developer",
    audio: "Brian.mp3",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
];

const TypewriterTestimonial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleProfileHover = (index: number) => {
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
      typewriterRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioPlayer(null);
    }

    setActiveIndex(index);

    const audio = new Audio(`/audio/${testimonials[index].audio}`);
    audio.play().catch((error) => {
      console.log("Audio playback failed:", error);
    });
    setAudioPlayer(audio);

    startTypewriter(testimonials[index].text);
  };

  const startTypewriter = (text: string) => {
    setIsTyping(true);
    setTypedText("");
    let i = 0;

    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterRef.current = setTimeout(() => {
          animationFrameRef.current = requestAnimationFrame(type);
        }, 35);
      } else {
        setIsTyping(false);
        typewriterRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(type);
  };

  return (
    <div className="p-8 rounded-2xl max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-32 w-full max-w-sm flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeIndex !== null && (
              <motion.div
                className="bg-white text-gray-800 rounded-lg px-4 py-3 shadow-lg border border-gray-200 w-full relative"
                key={activeIndex}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="min-h-[60px]">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {typedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="font-medium text-xs text-gray-800">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonials[activeIndex].jobtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Images */}
        <div className="flex items-center relative">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              onMouseEnter={() => handleProfileHover(index)}
              className="relative focus:outline-none rounded-full"
              style={{
                marginLeft: index > 0 ? "-12px" : "0",
                zIndex: index === activeIndex ? 20 : 10 - index,
              }}
              whileHover={{ zIndex: 25 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  index === activeIndex
                    ? "border-red-500 shadow-lg"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                animate={{
                  scale: index === activeIndex ? 1.1 : 1,
                  borderWidth: index === activeIndex ? 3 : 2,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypewriterTestimonial;
