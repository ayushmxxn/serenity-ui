"use client";
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
        console.log(`Navigating to page ${pageNum}`);
        pageFlipInstance.flip(pageNum);
      } else {
        console.error(
          `Invalid page number: ${pageNum}. Total pages: ${totalPages}`
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
            backgroundImage: `url('https://www.transparenttextures.com/patterns/leather.png')`,
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
            backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-pixels.png')`,
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
                      alt={`${testimonial.name}'s image`}
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
              backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-pixels.png')`,
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
                    alt={`${testimonial.name}'s image`}
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
            backgroundImage: `url('https://www.transparenttextures.com/patterns/leather.png')`,
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

export default BookTestimonial3D;
