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
    <div className='navbar-container fixed top-0 left-0 right-0 bg-black border border-zinc-900 backdrop-blur-lg h-auto py-4 px-3 text-sm z-30 sm:mt-5 sm:mx-8 sm:rounded-full sm:py-3 flex justify-between items-center'>
      <div className='flex items-center sm:pl-3'>
        <Image src={Logo} alt='Serenity Logo' width={40} height={20} className='rounded-full' />
        <Link href='/'>
          <p className='hidden sm:flex text-lg text-white ml-1'>Serenity UI</p>
        </Link>
        <div className='hidden sm:flex items-center ml-10 space-x-8 text-[#ABAFB4]'>
          <Link href='/docs/introduction' passHref>
            <span className='hover:text-zinc-300 cursor-pointer'>Docs</span>
          </Link>
          <Link href='/components' prefetch passHref>
            <span className='hover:text-zinc-300 cursor-pointer'>Components</span>
          </Link>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        {/* SearchBar */}
        <div className='hidden md:flex pr-5 sm:pr-2 md:pr-4'>
          <Search />
        </div>
        {/* Command Search */}
        <CommandSearch />
        {/* Socials (Hide on smaller screens) */}
        <div className='hidden sm:flex space-x-5 mr-2 justify-center items-center'>
          <Link href='https://github.com/ayushmxxn' target='_blank' rel='noopener noreferrer'>
            <FaGithub className='text-white' size={18} />
          </Link>
          <Link href='https://discord.gg/kzk6uWey3g' target='_blank' rel='noopener noreferrer'>
            <SiDiscord className='text-white' size={18} />
          </Link>
          <Link href='https://twitter.com/ayushmxxn' target='_blank' rel='noopener noreferrer'>
            <RiTwitterXLine className='text-white' size={18} />
          </Link>
        </div>
        {/* Hamburger for Displaying Socials on Mobile Devices */}
        <HamburgurNavbar />
      </div>
    </div>
  );
};

export default HomeNav;
