"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import FlipCard3D from "./components/FlipCard3D";

// Source code for FlipCard3D component
const sourcecode = `
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  {
    src: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Sunset landscape",
  },
  {
    src: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Desert scene",
  },
  {
    src: "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Red building",
  },
  {
    src: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=600",
    alt: "Cactus close-up",
  },
  {
    src: "https://images.pexels.com/photos/70568/spotted-baumwaran-monitor-tree-monitor-lizard-70568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Ocean view",
  },
];

// Types
interface ImageCardProps {
  src: string;
  alt: string;
  index: number;
  isHovered: boolean;
  isFirstCard?: boolean;
  isMobile: boolean;
  isFront?: boolean;
  frontCardIndex: number | null;
  onClick: (index: number) => void;
}

// Card Component
const Card: React.FC<ImageCardProps> = ({
  src,
  alt,
  index,
  isHovered,
  isFirstCard,
  isMobile,
  isFront,
  frontCardIndex,
  onClick,
}) => {
  return (
    <motion.div
      className={\`absolute w-80 h-48 rounded-xl overflow-hidden shadow-lg \${
        isFront ? "z-20" : ""
      }\`}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: isMobile ? "top center" : "left center",
        zIndex: isFront ? 20 : 5 - index,
        filter: isFront || frontCardIndex === null ? "none" : "blur(5px)",
      }}
      initial={{
        rotateY: 0,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      }}
      animate={
        isFront
          ? {
              scale: 1.2,
              rotateY: 0,
              x: isMobile ? 0 : 0,
              y: isMobile ? 0 : -50,
              z: 50,
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.5)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : isHovered
          ? {
              rotateY: isMobile ? 0 : -45,
              x: isMobile ? 0 : index * 50,
              y: isMobile ? index * 50 : index * -5,
              z: index * 15,
              scale: 1.05,
              boxShadow: \`10px 20px 30px rgba(0, 0, 0, \${0.2 + index * 0.05})\`,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 50,
                delay: index * 0.1,
              },
            }
          : {
              rotateY: 0,
              x: 0,
              y: 0,
              z: 0,
              scale: 1,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: (4 - index) * 0.1,
              },
            }
      }
      whileHover={{
        y: isFirstCard ? 0 : -100,
      }}
      onClick={() => onClick(index)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-xl"
      />
    </motion.div>
  );
};

// Main Component
const FlipCard3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setFrontCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={\`flex justify-center items-center py-32\`}>
      <div
        className="relative w-80 h-48 perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            {...image}
            index={index}
            isHovered={isHovered}
            isFirstCard={index === 0}
            isMobile={isMobile}
            isFront={frontCardIndex === index}
            frontCardIndex={frontCardIndex}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FlipCard3D;
`;

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

  const copyCLI = () => {
    navigator.clipboard.writeText(
      "npx @ayushmxxn/serenity-ui@latest add flipcard3d"
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(sourcecode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
            3D Flip Card
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            3D card stack component with interactive hover/click effects.
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
            <FlipCard3D />
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
              className={`${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] ring-4 ring-[#171717] rounded-xl w-full max-w-4xl h-auto max-h-[80vh] shadow-2xl flex flex-col z-50 mx-4 relative`}
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
                    copiedCode ? (
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
                  onClick={copyCode}
                  variant="dark"
                  showTooltip={true}
                />
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pb-4 px-4">
                <Suspense fallback={<div>Loading code...</div>}>
                  <SyntaxHighlighter
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
                  </SyntaxHighlighter>
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
