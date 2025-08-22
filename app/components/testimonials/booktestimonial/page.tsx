"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import BookTestimonial3D from "./components/BookTestimonial3D";

// Source code for book testimonial component
const sourcecode = `"use client";
import Image from "next/image";
import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useMediaQuery } from "@react-hook/media-query";
import SerenityLogo from "@/app/images/serenitylogotransparent.svg";

interface PageFlip {
  pageFlip: () => {
    flip: (page: number) => void;
    getPageCount: () => number;
  };
}

interface Testimonial {
  image?: string;
  text: string;
  name: string;
  jobtitle: string;
  rating: number;
}

function BookTestimonial3D() {
  const testimonials: Testimonial[] = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "I'm blown away by the versatility of the components in this library. They make UI development a breeze!",
      name: "Alice Johnson",
      jobtitle: "Frontend Developer",
      rating: 2,
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
      name: "David Smith",
      jobtitle: "UI Designer",
      rating: 2,
    },
    {
      image: "https://i.imgur.com/kaDy9hV.jpeg",
      text: "The components in this library are not just well-designed but also highly customizable. It's a developer's dream!",
      name: "Emma Brown",
      jobtitle: "Software Engineer",
      rating: 1,
    },
    {
      image: "https://i.imgur.com/cRwFxtE.png",
      text: "I love how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.",
      name: "James Wilson",
      jobtitle: "Product Manager",
      rating: 2,
    },
    {
      image: "https://i.imgur.com/TQIqsob.png",
      text: "Implementing this component library was a game-cher for our team. It has elevated our product's UI to a whole new level!",
      name: "Sophia Lee",
      jobtitle: "UX Specialist",
      rating: 3,
    },
    {
      image: "https://i.imgur.com/3ROmJ0S.png",
      text: "Using this library has been a game-changer for our product development.",
      name: "Michael Davis",
      jobtitle: "Full Stack Developer",
      rating: 5,
    },
    {
      image: "https://i.imgur.com/6fKCuVC.png",
      text: "The components are highly responsive and work seamlessly across different devices and screen sizes.",
      name: "Emily Chen",
      jobtitle: "Mobile App Developer",
      rating: 5,
    },
    {
      image: "https://i.imgur.com/Jjqe7St.png",
      text: "I love how easy it is to customize the components to fit our brand's style. The design is clean and modern.",
      name: "Robert Lee",
      jobtitle: "Graphic Designer",
      rating: 5,
    },
    {
      image: "https://i.imgur.com/bG88vHI.png",
      text: "This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.",
      name: "Sarah Taylor",
      jobtitle: "Backend Developer",
      rating: 5,
    },
    {
      image: "https://i.imgur.com/tjmS77j.png",
      text: "I appreciate the attention to detail in the design. The components are visually appealing and professional.",
      name: "Kevin White",
      jobtitle: "UI/UX Designer",
      rating: 5,
    },
    {
      image: "https://i.imgur.com/yTsomza.png",
      text: "The components are highly customizable and can be easily integrated with our existing UI framework.",
      name: "Rachel Patel",
      jobtitle: "Full Stack Developer",
      rating: 4,
    },
    {
      image: "https://i.imgur.com/pnsLqpq.png",
      text: "I love how the components are designed to be highly responsive and work well across different screen sizes.",
      name: "Brian Kim",
      jobtitle: "Mobile App Developer",
      rating: 5,
    },
  ];

  const book = useRef<PageFlip>(null);
  const isSmallScreen = useMediaQuery("(min-width: 640px)");
  const smallerDevice = !isSmallScreen;

  const handleFlip = (pageNum: number) => {
    if (book.current && book.current.pageFlip) {
      const pageFlipInstance = book.current.pageFlip();
      const totalPages = pageFlipInstance.getPageCount();

      if (pageNum >= 0 && pageNum < totalPages) {
        console.log(\`Navigating to page \${pageNum}\`);
        pageFlipInstance.flip(pageNum);
      } else {
        console.error(
          \`Invalid page number: \${pageNum}. Total pages: \${totalPages}\`
        );
      }
    } else {
      console.error("pageFlip is not available or ref is not initialized");
    }
  };

  return (
    <div className="w-full h-[500px] flex justify-center items-center py-10 bg-neutral-950">
      <HTMLFlipBook
        ref={book}
        width={300}
        height={450}
        showCover={true}
        usePortrait={smallerDevice}
        onFlip={(e) => console.log("Flipped to page:", e.data)}
        onChangeState={(e) => console.log("State changed:", e.data)}
        className=""
        style={{}}
        startPage={0}
        size="fixed"
        minWidth={0}
        maxWidth={0}
        minHeight={0}
        maxHeight={0}
        drawShadow={true}
        flippingTime={1000}
        startZIndex={0}
        autoSize={false}
        maxShadowOpacity={0.2}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {/* Cover Page */}
        <div
          className="relative bg-gradient-to-br from-black to-neutral-900 border border-neutral-700 p-8 flex flex-col items-center justify-center shadow-[5px_5px_15px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(255,255,255,0.1)] cursor-grab z-10"
          style={{
            backgroundImage: \`url('https://www.transparenttextures.com/patterns/leather.png')\`,
            backgroundBlendMode: "overlay",
          }}
        >
          <div
            className="absolute left-0 top-0 h-full w-[1px] bg-neutral-800 border-r border-neutral-600 rounded-l-lg z-20"
            style={{
              boxShadow:
                "inset -1px 0 2px rgba(0,0,0,0.4), 1px 0 1px rgba(0,0,0,0.2)",
            }}
          ></div>
          <div className="flex justify-center items-center">
            <Image
              src={SerenityLogo}
              alt="Serenity UI Logo"
              width={1000}
              height={1000}
              className="filter w-20 h-20 drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]"
            />
          </div>
          <h1
            className="text-4xl font-semibold text-white mt-6 text-center"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Serenity UI
          </h1>
          <div className="text-center mt-4">
            <span className="text-lg text-neutral-300">
              Read what people are saying about us
            </span>
          </div>
          <div className="absolute inset-2 border border-neutral-600 rounded-md opacity-30 z-0"></div>
        </div>

        {/* Index Page */}
        <div
          className="w-full h-full flex flex-col items-center bg-gradient-to-b from-[#f8f5e8] to-[#e8e2d0] border border-[#d4c9a8] box-border"
          style={{
            backgroundImage: \`url('https://www.transparenttextures.com/patterns/cream-pixels.png')\`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            boxShadow:
              "inset 0 0 10px rgba(0,0,0,0.05), 2px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="w-full flex flex-col items-center p-6 space-y-2 overflow-y-auto">
            <h2 className="text-lg font-serif font-semibold text-[#2b221e] text-center tracking-wide">
              Table of Contents
            </h2>
            <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4a017] to-transparent"></div>
            <ul className="w-full space-y-2">
              {testimonials.map((testimonial, index) => (
                <li
                  key={index}
                  onClick={() => handleFlip(index + 4)}
                  className="flex justify-between mt-2 items-center text-xs text-[#3c2f2f] cursor-pointer hover:text-[#d4a017] transition-colors duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={testimonial.image || ""}
                      alt={\`\${testimonial.name}'s image\`}
                      width={20}
                      height={20}
                      className="rounded-full border border-[#d4c9a8] shadow-sm"
                    />
                    <span className="font-serif font-medium tracking-wide truncate max-w-[150px]">
                      {testimonial.name}
                    </span>
                  </div>
                  <span className="font-serif font-medium tracking-wide">
                    {index + 2}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testimonials Pages */}
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full h-full relative bg-gradient-to-b from-[#f8f5e8] to-[#e8e2d0] border border-[#d4c9a8] box-border cursor-grab"
            style={{
              backgroundImage: \`url('https://www.transparenttextures.com/patterns/cream-pixels.png')\`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              boxShadow:
                "inset 0 0 10px rgba(0,0,0,0.05), 2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div className="w-full flex justify-end p-3 bg-[#e8e2d0] text-[#2b221e] text-sm font-serif tracking-wide">
              {index + 2}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center max-w-[260px] mx-auto p-6">
              <div className="flex flex-col items-center h-[340px] mt-12 justify-between">
                <div>
                  <Image
                    src={testimonial.image || ""}
                    alt={\`\${testimonial.name}'s image\`}
                    width={90}
                    height={90}
                    className="rounded-full border border-[#d4a017] shadow-md transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col items-center h-[60px] justify-center">
                  <span className="text-[#2b221e] font-serif font-semibold text-lg text-center tracking-wide">
                    {testimonial.name}
                  </span>
                  <span className="text-[#7b5e4e] text-xs font-serif italic text-center tracking-wide">
                    {testimonial.jobtitle}
                  </span>
                </div>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4a017] to-transparent"></div>
                <div className="font-serif text-[#3c2f2f] text-center text-sm leading-relaxed tracking-wide h-[120px] overflow-hidden">
                  <span className="text-xl text-[#d4a017">&ldquo;</span>
                  <span className="line-clamp-5">{testimonial.text}</span>
                  <span className="text-xl text-[#d4a017">&rdquo;</span>
                </div>
                <div className="flex justify-center items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#d4a017"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#d4c9a8"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Back Cover */}
        <div
          className="relative bg-gradient-to-br from-black to-neutral-900 border border-neutral-700 p-8 flex flex-col items-center justify-center shadow-[5px_5px_15px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(255,255,255,0.1)] cursor-grab z-10"
          style={{
            backgroundImage: \`url('https://www.transparenttextures.com/patterns/leather.png')\`,
            backgroundBlendMode: "overlay",
          }}
        >
          <div
            className="absolute right-0 top-0 h-full w-[1px] bg-neutral-800 border-l border-neutral-600 rounded-r-lg z-20"
            style={{
              boxShadow:
                "inset 1px 0 2px rgba(0,0,0,0.4), -1px 0 1px rgba(0,0,0,0.2)",
            }}
          ></div>
          <h1
            className="text-3xl font-sans font-semibold text-white mb-4 text-center"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Thank You!
          </h1>
          <p className="text-base text-neutral-300 text-center">
            We appreciate your feedback
          </p>
          <div className="absolute inset-2 border border-neutral-600 rounded-md opacity-30 z-0"></div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default BookTestimonial3D;`;

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
      "npx @ayushmxxn/serenity-ui@latest add book-testimonial-3D"
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
            Book Testimonial
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            This Book Testimonial is a unique way to showcase testimonials.
            Allowing Users to flip through pages of a book.
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
            <BookTestimonial3D />
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
