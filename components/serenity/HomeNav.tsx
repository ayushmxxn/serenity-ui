import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import { SiDiscord } from 'react-icons/si';
import Image from 'next/image';
import Logo from '@/app/images/serenitylogotransparent.svg';
import Search from './Search';
import HamburgurNavbar from './HamburgerNavbar';
import CommandSearch from './CommandSearch';

const HomeNav: React.FC = () => {
  return (
    <>
      <div className="announcement-banner bg-indigo-600 sm:bg-purple-600 text-white text-sm py-2 px-4 flex justify-center items-center text-center [box-shadow:0_-20px_80px_-40px_#ffffff3f_inset,0_0_20px_-5px_rgba(255,255,255,0.1)]">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:w-6 md:h-6 text-yellow-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          <p className="leading-tight text-center">
            Looking for someone to build a landing page for you?{' '}
            <Link
              href="https://twitter.com/messages/compose?recipient_id=1475215762490941441"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline cursor-pointer text-white hover:text-purple-200">
                DM me
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-container bg-black border border-zinc-900 backdrop-blur-lg py-4 px-3 text-sm z-30 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={Logo} alt="Serenity Logo" width={40} height={20} className="rounded-full" />
          <Link href="/">
            <p className="hidden sm:flex text-lg text-white ml-1">Serenity UI</p>
          </Link>
          <div className="">
            <div className="items-center flex space-x-6 text-[#ABAFB4]">
              <Link href="/components" passHref>
                <span className="hover:text-zinc-300 cursor-pointer hidden sm:flex ml-10">Components</span>
              </Link>
              <Link href="/templates" prefetch passHref>
                <div className="flex items-center space-x-2">
                  <span className="hover:text-zinc-300 cursor-pointer">Templates</span>
                  <span className="text-xs border border-green-400 text-green-400 rounded-full px-2 py-[2px]">New</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* SearchBar */}
          <div className="hidden md:flex pr-5 sm:pr-2 md:pr-4">
            <Search />
          </div>
          {/* Command Search */}
          <CommandSearch />
          {/* Socials (Hide on smaller screens) */}
          <div className="hidden sm:flex space-x-5 mr-2 justify-center items-center">
            <Link href="https://github.com/ayushmxxn" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white" size={18} />
            </Link>
            <Link href="https://discord.gg/kzk6uWey3g" target="_blank" rel="noopener noreferrer">
              <SiDiscord className="text-white" size={18} />
            </Link>
            <Link
              href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXLine className="text-white" size={18} />
            </Link>
          </div>
          {/* Hamburger for Displaying Socials on Mobile Devices */}
          <HamburgurNavbar />
        </div>
      </div>
    </>
  );
};

export default HomeNav;
