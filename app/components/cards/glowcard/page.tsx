"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import GlowCard from "./components/GlowCard";

// Source code for GlowCard component
const sourcecode = `
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const cards = [
  {
    title: "Exploring Mountains",
    date: "Mar 06, 2024",
    imageSrc:
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Beautiful Beach View",
    date: "Jul 15, 2023",
    imageSrc:
      "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Mystical Forest",
    date: "Aug 22, 2024",
    imageSrc:
      "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "City at Night",
    date: "Sep 10, 2023",
    imageSrc:
      "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Serenity by the Sea",
    date: "Oct 15, 2023",
    imageSrc:
      "https://images.pexels.com/photos/3374347/pexels-photo-3374347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

type CardProps = {
  title: string;
  date: string;
  imageSrc: string;
  isHovered: boolean;
};

const Card: React.FC<CardProps> = ({ title, date, imageSrc, isHovered }) => (
  <motion.div
    className={\`p-4 rounded-3xl flex flex-col items-start justify-between w-64 h-64 
      \${isHovered ? "shadow-xl border-blue-200" : "shadow-md border-gray-600"}
      border-2 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800\`}
    animate={{
      scale: isHovered ? 1.1 : 1,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
  >
    <Image
      src={imageSrc}
      alt={title}
      width={256}
      height={256}
      className="mb-4 object-cover rounded-3xl"
    />
    <h2 className="text-lg font-bold text-gray-200">{title}</h2>
    <p className="text-sm text-neutral-400">{date}</p>
  </motion.div>
);

const GlowCard: React.FC<{ offset?: number }> = ({ offset = 40 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex items-center justify-center">
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const totalCards = cards.length;

          const centerIndex = (totalCards - 1) / 2;
          const relativeIndex = index - centerIndex;
          const xOffset =
            isClient && window.innerWidth >= 768 ? relativeIndex * offset : 0;
          const yOffset =
            isClient && window.innerWidth < 768 ? relativeIndex * offset : 0;

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                scale: 0.85,
                opacity: 0.8,
                filter: "blur(3px)",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: xOffset,
                y: yOffset,
                filter: isHovered ? "blur(0px)" : "blur(2px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                zIndex: isHovered ? 100 : totalCards - index,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                title={card.title}
                date={card.date}
                imageSrc={card.imageSrc}
                isHovered={isHovered}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GlowCard;
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
      "npx @ayushmxxn/serenity-ui@latest add glowcard"
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
          <h1 className="text-3xl font-semibold text-white mb-2">Glow Card</h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            Cards that glow when you hover over them.
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
            <GlowCard />
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
