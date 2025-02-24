import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";
import Logo from "@/app/images/serenitylogotransparent.svg";
import Image from "next/image";
import Search from "./Search";
import HamburgurNavbar from "./HamburgerNavbar";
import { Inter } from "next/font/google";
import CommandSearch from "./CommandSearch";

const inter = Inter({ subsets: ["latin"], weight: "500" });

function Navbar() {
  return (
    <div
      className={`navbar-container fixed top-0 left-0 right-0  bg-zinc-950 flex justify-between backdrop-blur-lg border-b border-zinc-900  h-auto sm:py-3 py-4 px-3 text-sm z-50 ${inter.className}`}
    >
      <span className="flex items-center">
        <Link href={"/"} className="flex justify-center items-center">
          <Image src={Logo} alt="SerenityLogo" width={40} height={20} />
          <span className={`hidden sm:flex  sm:text-lg pr-20 pl-1`}>
            Serenity UI
          </span>
        </Link>

        <div className="items-center flex space-x-6 text-[#ABAFB4]">
          <Link href="/components" passHref>
            <span className="hover:text-zinc-300 cursor-pointer hidden sm:flex ml-10 md:ml-0">
              Components
            </span>
          </Link>
          <Link href="/templates" prefetch passHref>
            <div className="flex items-center space-x-2">
              <span className="hover:text-zinc-300 cursor-pointer">
                Templates
              </span>
              <span className="text-xs  border border-green-400 text-green-400 rounded-full px-2 py-[2px]">
                New
              </span>
            </div>
          </Link>
        </div>
      </span>
      <div className="flex justify-center items-center gap-1">
        {/* Searchbar */}
        <div className="hidden sm:flex pr-5 sm:pr-2 md:pr-4">
          <Search />
        </div>
        {/* Command Search */}
        <div className="sm:hidden">
          <CommandSearch />
        </div>
        {/* Hide on smaller screens */}
        <div className="hidden sm:flex space-x-5 mr-2 justify-center items-center">
          <Link href={"https://github.com/ayushmxxn"} target="_blank">
            <FaGithub className="text-white" size={18} />
          </Link>
          <Link href={"https://discord.gg/kzk6uWey3g"} target="_blank">
            <SiDiscord className="text-white" size={18} />
          </Link>
          <Link href={"https://twitter.com/ayushmxxn"} target="_blank">
            <RiTwitterXLine className="text-white" size={18} />
          </Link>
        </div>
        <HamburgurNavbar />
      </div>
    </div>
  );
}

export default Navbar;
