"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { CgComponents } from "react-icons/cg";
import { TbBrandNextjs } from "react-icons/tb";
import { SiReact } from "react-icons/si";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BiLogoTypescript } from "react-icons/bi";
import { TbBrandFramerMotion } from "react-icons/tb";
import { GeistSans } from "geist/font";
import TypewriterShowcase from "./TypewriterShowcase";
import TestimonialWidget from "./TestimonialWidget";
import BookTestimonialShowcase from "./BookTestimonialShowcase"; // Direct import

const techItems = [
  {
    href: "https://nextjs.org/",
    label: "Next.js",
    icon: TbBrandNextjs,
    color: "hover:text-white",
  },
  {
    href: "https://react.dev/",
    label: "React",
    icon: SiReact,
    color: "hover:text-[#61DAFB]",
  },
  {
    href: "https://tailwindcss.com/",
    label: "Tailwind",
    icon: BiLogoTailwindCss,
    color: "hover:text-[#06B6D4]",
  },
  {
    href: "https://www.typescriptlang.org/",
    label: "TypeScript",
    icon: BiLogoTypescript,
    color: "hover:text-[#3178C6]",
  },
  {
    href: "https://www.framer.com/motion/",
    label: "Framer Motion",
    icon: TbBrandFramerMotion,
    color: "hover:text-[#F6EB2A]",
  },
];

const Hero = () => {
  const [iconSize, setIconSize] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 768 ? 16 : 20);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${GeistSans.className} bg-black sm:pt-8 sm:pb-28`}>
      <div className="hidden lg:flex">
        <Spotlight fill="white" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-6 lg:w-1/2">
            {/* Tech Stack Section */}
            <div className="flex justify-center lg:justify-start items-center mt-8 sm:mt-0">
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  {techItems.map(({ href, label, icon: Icon, color }) => (
                    <div key={label} className="relative group">
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          relative flex items-center justify-center
                          w-10 h-10 rounded-lg
                          bg-neutral-900/50 border border-neutral-800
                          backdrop-blur-sm
                          text-neutral-400 ${color}
                          transition-all duration-300 ease-out
                          group-hover:shadow-lg group-hover:shadow-neutral-900/25
                        `}
                        title={label}
                      >
                        <Icon size={iconSize} />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-neutral-700">
                          {label}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-neutral-800"></div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent mt-2" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 sm:px-20 lg:px-0 xl:px-0 2xl:px-0 leading-tight tracking-tight">
              Beautifully Crafted UI Components to Elevate your Web Projects
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mt-6 text-neutral-400 sm:px-40 lg:px-0 xl:px-0 2xl:px-0 max-w-2xl leading-relaxed font-normal">
              Build faster with ready-to-use components, templates, and
              boilerplates crafted just for you.
            </p>

            <div className="flex justify-center lg:justify-start items-center gap-5 mt-10">
              <a href="#installation">
                <button
                  className="text-sm font-medium bg-white text-gray-800 whiteshimmerbtn shadow hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Get started with installation"
                >
                  Get Started
                </button>
              </a>
              <button className="px-6 rounded-lg animatedButton bubbleeffectbtnserenity transition-all duration-200 hover:scale-105">
                <Link
                  prefetch
                  href={"components"}
                  className="flex items-center gap-2"
                >
                  <CgComponents className="text-white" size={18} />
                  <span className="text-sm font-medium">Explore</span>
                </Link>
              </button>
            </div>
            <TypewriterShowcase />
          </div>

          {/* BookTestimonialShowcase for desktop */}
          <div className="w-full lg:w-1/2 h-[400px] mt-10 lg:mt-5 justify-center magicpattern hidden lg:flex">
            <BookTestimonialShowcase />
          </div>
        </div>

        {/* BookTestimonialShowcase for mobile */}
        <div className="w-full h-[450px] my-10 flex justify-center magicpattern lg:hidden">
          <BookTestimonialShowcase />
        </div>
      </div>
      <TestimonialWidget />
    </div>
  );
};

export default React.memo(Hero);
