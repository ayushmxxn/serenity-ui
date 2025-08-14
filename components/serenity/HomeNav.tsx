"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SiDiscord } from "react-icons/si";
import Image from "next/image";
import Logo from "@/app/images/serenitylogotransparent.svg";
import Search from "./Search";

import { MdKeyboardCommandKey } from "react-icons/md";
import { useSearch } from "./SearchContext";
const HomeNav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSearch } = useSearch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      <nav
        className={`  bg-[#0E0F11] border-t-2 border-neutral-900 backdrop-blur-md py-3 px-4 text-sm z-30 flex justify-between items-center rounded-2xl`}
      >
        {/* Left Section: Logo and Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-1">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              alt="Serenity Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>

          {/* Brand Name (Visible on sm and larger) */}
          <Link href="/">
            <span className="hidden sm:block text-lg text-neutral-200 font-medium pr-4">
              Serenity UI
            </span>
          </Link>

          {/* Navigation Links (Hidden on mobile, visible on sm and larger) */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-neutral-400 ml-2 sm:ml-6 font-medium">
            <Link href="/components" passHref>
              <span className="hover:text-neutral-100 cursor-pointer transition-colors duration-200">
                Components
              </span>
            </Link>
            <Link href="/components/templates" prefetch passHref>
              <span className="hover:text-neutral-100 cursor-pointer transition-colors duration-200">
                Templates
              </span>
            </Link>
            <Link href="/components/boilerplates" prefetch passHref>
              <span className="hover:text-neutral-100 cursor-pointer transition-colors duration-200">
                Boilerplates
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Bar (Hidden on mobile, visible on md and larger) */}
          <div className="hidden md:flex">
            <Search />
          </div>

          <div className="flex items-center sm:hidden">
            <MdKeyboardCommandKey
              onClick={openSearch}
              className="bg-zinc-800 rounded p-1 cursor-pointer"
              size={20}
            />
          </div>

          {/* Social Links (Hidden on mobile, visible on sm and larger) */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            <Link
              href="https://github.com/ayushmxxn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/50 border border-neutral-800 hover:bg-neutral-700/50 transition-all duration-300 group"
            >
              <FaGithub
                className="text-neutral-300 hover:text-neutral-100 transition-transform duration-300 group-hover:scale-110"
                size={16}
              />
            </Link>
            <Link
              href="https://discord.gg/kzk6uWey3g"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/50 border border-neutral-800 hover:bg-neutral-700/50 transition-all duration-300 group"
            >
              <SiDiscord
                className="text-neutral-300 hover:text-neutral-100 transition-transform duration-300 group-hover:scale-110"
                size={16}
              />
            </Link>
            <Link
              href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/50 border border-neutral-800 hover:bg-neutral-700/50 transition-all duration-300 group"
            >
              <RiTwitterXLine
                className="text-neutral-300 hover:text-neutral-100 transition-transform duration-300 group-hover:scale-110"
                size={16}
              />
            </Link>
          </div>

          {/* Mobile Menu Button (Visible only on mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden text-neutral-300 hover:text-neutral-100 transition-colors duration-200 p-1 "
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden text-sm absolute top-full left-0 right-0 mt-2 bg-[#0E0F11]/50  border-t-2 border-neutral-900 backdrop-blur-2xl rounded-2xl shadow-lg z-40 overflow-hidden px-2 font-medium">
          <div className="py-2">
            {/* Navigation Links */}
            <div className="py-2">
              <Link
                href="/components"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all duration-200 rounded-lg"
              >
                Components
              </Link>
              <Link
                href="/components/templates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all duration-200"
              >
                Templates
              </Link>
              <Link
                href="/components/boilerplates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all duration-200"
              >
                Boilerplates
              </Link>
            </div>

            {/* Social Links */}
            <div className="px-4 py-3 border-t border-neutral-800">
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/ayushmxxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative flex items-center justify-center w-9 h-9 rounded-full bg-neutral-800/50 border-t-2 border-neutral-800 hover:bg-neutral-700/50 transition-all duration-300 group"
                >
                  <FaGithub
                    className="text-neutral-300 hover:text-neutral-100 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />
                </Link>
                <Link
                  href="https://discord.gg/kzk6uWey3g"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative flex items-center justify-center w-9 h-9 rounded-full bg-neutral-800/50 border-t-2 border-neutral-800 hover:bg-neutral-700/50 transition-all duration-300 group"
                >
                  <SiDiscord
                    className="text-neutral-300 hover:text-neutral-100 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />
                </Link>
                <Link
                  href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative flex items-center justify-center w-9 h-9 rounded-full bg-neutral-800/50 border-t-2 border-neutral-800 hover:bg-neutral-700/50 transition-all duration-300 group"
                >
                  <RiTwitterXLine
                    className="text-neutral-300 hover:text-neutral-100 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeNav;
