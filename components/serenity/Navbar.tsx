"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SiDiscord } from "react-icons/si";
import {
  PanelRight,
  Folder,
  FolderOpen,
  ArrowRight,
  Component,
  PanelsTopLeft,
  Code2,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/app/images/serenitylogotransparent.svg";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardCommandKey } from "react-icons/md";
import { GeistSans } from "geist/font/sans";
import { useSearch } from "./SearchContext";

// Component data
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

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >(null);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useSearch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setExpandedMobileSection(null);
    }
  };

  const toggleMobileSection = (name: string) => {
    setExpandedMobileSection(expandedMobileSection === name ? null : name);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setExpandedMobileSection(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const subComponentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: "0%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Fixed Navbar (Unchanged) */}
      <div className="fixed top-0 left-0 w-full z-50 border-b border-neutral-900 sm:hidden">
        <nav className="bg-neutral-950 py-3 px-4 text-sm flex justify-between items-center">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Serenity Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>
          </div>

          {/* Right Section: Command Search and Menu Button */}
          <div className="flex items-center gap-2">
            <div className="md:hidden sm:mr-5">
              <MdKeyboardCommandKey
                onClick={openSearch}
                className="bg-zinc-800 rounded p-1"
                size={20}
              />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-300 hover:text-neutral-100 transition-colors duration-200 p-2 rounded-md hover:bg-neutral-800/30"
              aria-label="Toggle mobile menu"
            >
              <PanelRight size={20} />
            </button>
          </div>
        </nav>
      </div>

      {/* Placeholder to push content down */}
      <div className="h-[60px] sm:hidden"></div>

      {/* Mobile Sidebar with Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
            />

            {/* Sidebar */}
            <motion.div
              ref={sidebarRef}
              className={`${GeistSans.className} fixed top-0 right-0 h-full w-3/4 bg-[#1A1A1A] border-l border-[#2D2D2D] ring-4 ring-[#171717] shadow-xl z-50 overflow-y-auto custom-scrollbar rounded-l-3xl `}
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-4 flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={toggleMobileMenu}
                    className="text-neutral-400 hover:text-neutral-100 transition-all duration-200 ease-in-out p-2 rounded-lg hover:bg-[#2D2D2D]"
                    aria-label="Close sidebar"
                  >
                    <PanelRight size={20} />
                  </button>
                </div>

                {/* Social Links */}
                <div className="mb-6 pb-4 border-b border-[#2D2D2D]">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3">
                    Connect
                  </h3>
                  <div className="flex items-center gap-4">
                    <Link
                      href="https://github.com/ayushmxxn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1A1A]/50 border border-[#2D2D2D] hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
                    >
                      <FaGithub
                        className="text-neutral-400 hover:text-neutral-100"
                        size={18}
                      />
                    </Link>
                    <Link
                      href="https://discord.gg/kzk6uWey3g"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1A1A]/50 border border-[#2D2D2D] hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
                    >
                      <SiDiscord
                        className="text-neutral-400 hover:text-neutral-100"
                        size={18}
                      />
                    </Link>
                    <Link
                      href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1A1A]/50 border border-[#2D2D2D] hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out"
                    >
                      <RiTwitterXLine
                        className="text-neutral-400 hover:text-neutral-100"
                        size={18}
                      />
                    </Link>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mb-6 pb-4 border-b border-[#2D2D2D]">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3">
                    Navigation
                  </h3>
                  <div className="space-y-0 text-sm font-normal">
                    <Link
                      href="/components"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center p-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                        pathname === "/components"
                          ? "text-neutral-100 bg-[#2D2D2D]"
                          : "text-neutral-400 hover:text-neutral-100"
                      }`}
                    >
                      <span className="mr-2 text-neutral-400 w-4 text-center">
                        <Component size={14} />
                      </span>
                      <span>Components</span>
                    </Link>
                    <Link
                      href="/components/templates"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center p-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                        pathname === "/templates"
                          ? "text-neutral-100 bg-[#2D2D2D]"
                          : "text-neutral-400 hover:text-neutral-100"
                      }`}
                    >
                      <span className="mr-2 text-neutral-400 w-4 text-center">
                        <PanelsTopLeft size={14} />
                      </span>
                      <span>Templates</span>
                    </Link>
                    <Link
                      href="/components/boilerplates"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center p-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                        pathname === "/boilerplates"
                          ? "text-neutral-100 bg-[#2D2D2D]"
                          : "text-neutral-400 hover:text-neutral-100"
                      }`}
                    >
                      <span className="mr-2 text-neutral-400 w-4 text-center">
                        <Code2 size={14} />
                      </span>
                      <span>Boilerplates</span>
                    </Link>
                  </div>
                </div>

                {/* Components Section */}
                <div className="flex-1 custom-scrollbar">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3">
                    Components
                  </h3>
                  <div className="space-y-0 text-sm font-normal">
                    {componentsList.map((component, index) => (
                      <div key={index}>
                        <button
                          onClick={() => toggleMobileSection(component.name)}
                          className="flex items-center w-full py-2 px-2 text-neutral-400 hover:text-neutral-100 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg"
                        >
                          <span className="mr-2 text-neutral-400 w-4 flex justify-center">
                            {expandedMobileSection === component.name ? (
                              <FolderOpen size={14} />
                            ) : (
                              <Folder size={14} />
                            )}
                          </span>
                          <span>{component.name}</span>
                        </button>
                        {expandedMobileSection === component.name && (
                          <motion.div
                            className="space-y-0 pl-6" // Adjusted padding for hierarchy, less aggressive than ml-8
                            initial="hidden"
                            animate="visible"
                            variants={subComponentVariants}
                          >
                            {component.subComponents.map(
                              (subComponent, idx) => (
                                <Link
                                  key={idx}
                                  href={`${component.url}/${subComponent
                                    .replace(/\s+/g, "")
                                    .toLowerCase()}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`flex items-center py-2 px-2 transition-all duration-200 ease-in-out rounded-lg ${
                                    pathname ===
                                    `${component.url}/${subComponent
                                      .replace(/\s+/g, "")
                                      .toLowerCase()}`
                                      ? "text-neutral-100 bg-[#2D2D2D]"
                                      : "text-neutral-400 hover:text-neutral-100 hover:bg-[#2D2D2D]"
                                  }`}
                                >
                                  <span className="mr-2 text-neutral-400 w-4 flex justify-center">
                                    <ArrowRight size={14} />
                                  </span>
                                  <span>{subComponent}</span>
                                </Link>
                              )
                            )}
                          </motion.div>
                        )}
                      </div>
                    ))}
                    {additionalComponentsList.map((component, index) => (
                      <div key={index}>
                        <Link
                          href={component.url}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center py-2 px-2 hover:bg-[#2D2D2D] transition-all duration-200 ease-in-out rounded-lg ${
                            pathname === component.url
                              ? "text-neutral-100 bg-[#2D2D2D]"
                              : "text-neutral-400 hover:text-neutral-100"
                          }`}
                        >
                          <span className="mr-2 text-neutral-400 w-4 flex justify-center">
                            <ArrowRight size={14} />
                          </span>
                          <span>{component.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
