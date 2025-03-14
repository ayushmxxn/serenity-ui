"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

function ShineButton() {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonDimensions({
          width: rect.width,
          height: rect.height,
        });

        if (mousePosition.x === 0 && mousePosition.y === 0) {
          setMousePosition({
            x: rect.width / 2,
            y: rect.height / 2,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [mousePosition.x, mousePosition.y]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const codeString = `
"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FlameButton: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonDimensions({
          width: rect.width,
          height: rect.height,
        });

        if (mousePosition.x === 0 && mousePosition.y === 0) {
          setMousePosition({
            x: rect.width / 2,
            y: rect.height / 2,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [mousePosition.x, mousePosition.y]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative inline-block"
      ref={buttonRef}
      onMouseMove={handleMouseMove}
    >
      <Link
        href="/signup"
        className="transition-colors duration-200 uppercase font-bold flex items-center justify-center h-10 text-12 text-black -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] space-x-1 px-16 sm:pl-[59px] sm:pr-[52px]"
      >
        <motion.div
          className="absolute left-0 top-0 -z-10"
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <motion.div
            className="absolute bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%,_#FFAA81_26.5%,#FFDA9F_37.5%,rgba(255,170,129,0.50)_49%,rgba(210,106,58,0.00)_92.5%)]"
            style={{
              width: 121,
              height: 121,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
            animate={{
              x: mousePosition.x - 60,
              y: buttonDimensions.height / 2 - 60,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              mass: 0.5,
            }}
          />
          <motion.div
            className="absolute bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,_#FFFFF7_29%,_#FFFACD_48.5%,_#F4D2BF_60.71%,rgba(214,211,210,0.00)_100%)] blur-[5px]"
            style={{
              width: 204,
              height: 103,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
            animate={{
              x: mousePosition.x - 102,
              y: buttonDimensions.height / 2 - 51,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              mass: 0.5,
            }}
          />
        </motion.div>
        <span className="text-[#5A250A] text-sm">Try it Free</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 9"
          className="h-[9px] w-[17px] text-[#5A250A]"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default FlameButton;
`;

  const handleCopyCode = () => {
    const el = document.createElement("textarea");
    el.value = codeString.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="">
      <div className="flex flex-col items-start">
        <div className="relative bg-black flex justify-center items-center border rounded-lg border-zinc-800 w-full max-w-[24rem] h-auto py-10 mt-2">
          <div
            className="relative inline-block"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
          >
            <Link
              href="/signup"
              className="transition-colors duration-200 uppercase font-bold flex items-center justify-center h-10 text-12 text-black -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] space-x-1 px-16 sm:pl-[59px] sm:pr-[52px]"
            >
              <motion.div
                className="absolute left-0 top-0 -z-10"
                style={{
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  className="absolute bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%,_#FFAA81_26.5%,#FFDA9F_37.5%,rgba(255,170,129,0.50)_49%,rgba(210,106,58,0.00)_92.5%)]"
                  style={{
                    width: 121,
                    height: 121,
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                  animate={{
                    x: mousePosition.x - 60,
                    y: buttonDimensions.height / 2 - 60,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    mass: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,_#FFFFF7_29%,_#FFFACD_48.5%,_#F4D2BF_60.71%,rgba(214,211,210,0.00)_100%)] blur-[5px]"
                  style={{
                    width: 204,
                    height: 103,
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                  animate={{
                    x: mousePosition.x - 102,
                    y: buttonDimensions.height / 2 - 51,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    mass: 0.5,
                  }}
                />
              </motion.div>
              <span className="text-[#5A250A] text-sm">Try it Free</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 9"
                className="h-[9px] w-[17px] text-[#5A250A]"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleCopyCode}
          >
            {copied ? (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4ADE80"
                className="w-4 h-4 relative -left-1 top-1"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
                transition={{ duration: 0.6 }} // Adjust duration if needed
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </motion.svg>
            ) : (
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M9.75 12.25H14.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M9.75 15.25H14.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShineButton;
