// SideBar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SiDiscord } from "react-icons/si";
import {
  Component,
  Folder,
  FolderOpen,
  ArrowRight,
  PanelsTopLeft,
  Code2,
} from "lucide-react";
import { MdKeyboardCommandKey } from "react-icons/md";
import Image from "next/image";
import Logo from "@/app/images/serenitylogotransparent.svg";
import { GeistSans } from "geist/font/sans";
import { useSearch } from "./SearchContext";

// Components List
const componentsList = [
  {
    name: "Testimonials",
    url: "/components/testimonials",
    subComponents: [
      "Voice Testimonial",
      "Star Rating Testimonial",
      "Username Testimonial",
      "3D Book Testimonial",
      "Typewriter Testimonial",
    ],
  },
  {
    name: "Pricing",
    url: "/components/pricing",
    subComponents: ["Pricing Section"],
  },
  {
    name: "Authentication",
    url: "/components/authentication",
    subComponents: [
      "Signup Form",
      "SignUp Form V2",
      "SignIn Form",
      "Forgot Password",
      "Email",
      "Otp",
      "Create New Password",
      "Password Changed",
    ],
  },
  {
    name: "Carousels",
    url: "/components/carousels",
    subComponents: ["Image Carousel", "Video Carousel", "Carousel 360"],
  },
  {
    name: "Navbars",
    url: "/components/navbars",
    subComponents: ["Tubelight Navbar"],
  },
  {
    name: "Cards",
    url: "/components/cards",
    subComponents: [
      "Spotlight Card",
      "Swipe Card",
      "Project Cards",
      "Glow Card",
      "3D Flip Card",
    ],
  },
];

// Additional Components List
const additionalComponentsList = [
  { name: "Inputs", url: "/components/inputs", subComponents: [] },
  { name: "Dock", url: "/components/dock", subComponents: [] },
  {
    name: "Feature Section",
    url: "/components/featuresection",
    subComponents: [],
  },
  {
    name: "Shortcut Modal",
    url: "/components/shortcutmodal",
    subComponents: [],
  },
  { name: "Code Block", url: "/components/codeblock", subComponents: [] },
  { name: "Image Gallery", url: "/components/imagegallery", subComponents: [] },
  { name: "Film Roll", url: "/components/filmroll", subComponents: [] },
  { name: "Drawer", url: "/components/drawer", subComponents: [] },
  { name: "Footer", url: "/components/footer", subComponents: [] },
  { name: "NewsLetter", url: "/components/newsletter", subComponents: [] },
  { name: "Cookie", url: "/components/cookie", subComponents: [] },
  { name: "WaitList", url: "/components/waitlist", subComponents: [] },
  { name: "TechStack", url: "/components/techstack", subComponents: [] },
  { name: "Toast", url: "/components/toast", subComponents: [] },
  { name: "Steps", url: "/components/steps", subComponents: [] },
  { name: "Brands", url: "/components/brandsection", subComponents: [] },
  { name: "Star Rating", url: "/components/starrating", subComponents: [] },
  { name: "Buttons", url: "/components/buttons", subComponents: [] },
  { name: "Toggle", url: "/components/toggle", subComponents: [] },
];

const SideBar: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { openSearch } = useSearch();

  const toggleSection = (name: string) => {
    setExpandedSection(expandedSection === name ? null : name);
  };

  const handleSearchClick = () => {
    console.log("Search bar clicked"); // Debug log
    openSearch();
  };

  const itemVariants = {
    hover: {
      x: 5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const subComponentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <aside
      className={`${GeistSans.className} bg-[#1A1A1A] rounded-r-3xl border-r border-[#2D2D2D] ring-4 ring-[#171717] w-72 text-neutral-100 hidden md:flex flex-col h-screen py-8 relative overflow-hidden custom-scrollbar`}
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 40,
      }}
    >
      <div className="pl-5 h-full overflow-y-auto overflow-x-hidden pr-4 relative z-10">
        {/* Header with Logo and Social Icons */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2D2D2D]">
          <Link
            href="/"
            className="flex items-center p-1 bg-[#1A1A1A]/50 border border-[#2D2D2D] rounded-lg hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
          >
            <Image
              src={Logo}
              alt="Serenity Logo"
              width={32}
              height={32}
              className="rounded-sm"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/ayushmxxn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A]/50 border border-[#2D2D2D] hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
            >
              <FaGithub
                className="text-neutral-400 hover:text-neutral-100"
                size={14}
              />
            </Link>
            <Link
              href="https://discord.gg/kzk6uWey3g"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A]/50 border border-[#2D2D2D] hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
            >
              <SiDiscord
                className="text-neutral-400 hover:text-neutral-100"
                size={14}
              />
            </Link>
            <Link
              href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A]/50 border border-[#2D2D2D] hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
            >
              <RiTwitterXLine
                className="text-neutral-400 hover:text-neutral-100"
                size={14}
              />
            </Link>
          </div>
        </div>

        <nav>
          {/* Search Bar */}
          <div className="mb-6 pb-4 border-b border-[#2D2D2D]">
            <div
              className="relative flex items-center bg-[#1A1A1A]/50 border border-[#2D2D2D] rounded-lg px-3 py-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out cursor-pointer"
              onClick={handleSearchClick}
            >
              <MdKeyboardCommandKey
                className="text-neutral-400 w-4 h-4 mr-2"
                size={14}
              />
              <span className="text-neutral-400 placeholder-neutral-400 w-full text-sm font-normal">
                Search documentation...
              </span>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs bg-[#1A1A1A]/50 border border-[#2D2D2D] rounded text-neutral-400">
                  /
                </kbd>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 pb-4 border-b border-[#2D2D2D]">
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-0 text-sm">
              <Link
                href="/components"
                className={`flex items-center py-1 px-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                  pathname === "/components"
                    ? "text-neutral-100 bg-[#2D2D2D]"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                <Component className="w-4 h-4 mr-2 text-neutral-400" />
                <span>Components</span>
              </Link>
              <Link
                href="/components/templates"
                prefetch
                className={`flex items-center py-1 px-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                  pathname === "/templates"
                    ? "text-neutral-100 bg-[#2D2D2D]"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                <PanelsTopLeft className="w-4 h-4 mr-2 text-neutral-400" />
                <span>Templates</span>
              </Link>
              <Link
                href="/components/boilerplates"
                prefetch
                className={`flex items-center py-1 px-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                  pathname === "/boilerplates"
                    ? "text-neutral-100 bg-[#2D2D2D]"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                <Code2 className="w-4 h-4 mr-2 text-neutral-400" />
                <span>Boilerplates</span>
              </Link>
            </div>
          </div>

          {/* Components Section */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">
              Components
            </h3>

            {/* Components with subcomponents */}
            <div className="space-y-0 text-sm">
              {componentsList.map((component, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleSection(component.name)}
                    className="flex items-center w-full py-1 px-2 text-neutral-400 hover:text-neutral-100 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg text-sm"
                  >
                    <span className="mr-2 text-neutral-400 w-4 text-center">
                      {expandedSection === component.name ? (
                        <FolderOpen size={14} />
                      ) : (
                        <Folder size={14} />
                      )}
                    </span>
                    <span>{component.name}</span>
                  </button>

                  {expandedSection === component.name && (
                    <motion.div
                      className="ml-6 space-y-0"
                      initial="hidden"
                      animate="visible"
                      variants={subComponentVariants}
                    >
                      {component.subComponents.map((subComponent, idx) => (
                        <Link
                          prefetch
                          key={idx}
                          href={`${component.url}/${subComponent
                            .replace(/\s+/g, "")
                            .toLowerCase()}`}
                          className={`flex items-center py-1 px-2 transition-all duration-200 ease-in-out rounded-lg text-sm ${
                            pathname ===
                            `${component.url}/${subComponent
                              .replace(/\s+/g, "")
                              .toLowerCase()}`
                              ? "text-neutral-100 bg-[#2D2D2D]"
                              : "text-neutral-400 hover:text-neutral-100 hover:bg-[#2D2D2D]"
                          }`}
                        >
                          <span className="mr-2 text-neutral-400 w-4 text-center">
                            <ArrowRight size={14} />
                          </span>
                          <span>{subComponent}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Additional components without subcomponents */}
              {additionalComponentsList.map((component, index) => (
                <div key={index}>
                  <Link
                    prefetch
                    href={component.url}
                    className={`flex items-center py-1 px-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg text-sm ${
                      pathname === component.url
                        ? "text-neutral-100 bg-[#2D2D2D]"
                        : "text-neutral-400 hover:text-neutral-100"
                    }`}
                  >
                    <span className="mr-2 text-neutral-400 w-4 text-center">
                      <ArrowRight size={14} />
                    </span>
                    <span>{component.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
