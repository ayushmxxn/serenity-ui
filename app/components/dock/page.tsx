'use client'
import React, { useState } from 'react'
import PropsTable from '@/components/serenity/Table';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import Dock from './components/Dock';
import { FaGithub, FaTwitter, FaInstagram, FaDiscord, FaLinkedin } from 'react-icons/fa';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { motion } from 'framer-motion';


// Props data for component
const items = [
  {
    link: 'https://github.com',
    target: '_blank',
    Icon: <FaGithub size={22} />,
    defaultBgColor: 'bg-zinc-700',
    hoverBgColor: 'bg-zinc-700',
    tooltip: 'GitHub', 
  },
  {
    link: 'https://x.com',
    target: '_blank',
    Icon: <FaTwitter size={22} />,
    defaultBgColor: 'bg-zinc-700',
    hoverBgColor: 'bg-zinc-700',
    tooltip: 'Twitter', 
  },
  {
    link: 'https://instagram.com',
    target: '_blank',
    Icon: <FaInstagram size={22} />,
    defaultBgColor: 'bg-zinc-700',
    hoverBgColor: 'bg-zinc-700',
    tooltip: 'Instagram', 
  },
  {
    link: 'https://discord.com/',
    target: '_blank',
    Icon: <FaDiscord size={22} />,
    defaultBgColor: 'bg-zinc-700',
    hoverBgColor: 'bg-zinc-700',
    tooltip: 'Discord', 
  },
  {
    link: 'https://linkedin.com',
    target: '_blank',
    Icon: <FaLinkedin size={22} />,
    defaultBgColor: 'bg-zinc-700',
    hoverBgColor: 'bg-zinc-700',
    tooltip: 'LinkedIn', 
  },          
];


// Source Code
const sourcecode = `
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

interface DockProps {
  className?: string;
  items?: {
    link?: string;
    Icon?: React.ReactNode;
    target?: string;
    defaultBgColor?: string;
    hoverBgColor?: string;
    tooltip?: string; 
  }[];
  position?: 'left' | 'right' | 'top' | 'bottom';
}

const Dock = ({ className = '', items = [], position = 'bottom' }: DockProps) => {
  let mouseX = useMotionValue(Infinity);
  let mouseY = useMotionValue(Infinity);

  const containerStyles = {
    left: 'left-0 ml-2 top-1/2 transform -translate-y-1/2',
    right: 'right-0 mr-2 top-1/2 transform -translate-y-1/2',
    top: 'top-0 mt-2 left-1/2 transform -translate-x-1/2',
    bottom: 'bottom-0 mb-2 left-1/2 transform -translate-x-1/2',
  }[position];

  const dockLayout = position === 'top' || position === 'bottom' ? 'flex-row' : 'flex-col';

  
  const tooltipVariants = {
    top: { opacity: 1, y: 0 },
    bottom: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
  };

  const tooltipInitial = {
    top: { opacity: 0, y: -10 },
    bottom: { opacity: 0, y: 10 },
    left: { opacity: 0, x: -10 },
    right: { opacity: 0, x: 10 },
  };

  const tooltipTransition = { duration: 0.3, ease: 'easeOut' };

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      className={cn(
        \`flex \${dockLayout} items-center gap-2 sm:gap-3 md:gap-4 rounded-full bg-zinc-800/70 border border-white border-opacity-5 absolute \${containerStyles}\`,
        className
      )}
    >
      {items.map((item, index) => {
        let ref = useRef<HTMLDivElement>(null);
        const [hovered, setHovered] = useState(false);

        let distance;
        if (position === 'top' || position === 'bottom') {
          distance = useTransform(mouseX, (val) => {
            let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
            return val - bounds.x - bounds.width / 2;
          });
        } else {
          distance = useTransform(mouseY, (val) => {
            let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
            return val - bounds.y - bounds.height / 2;
          });
        }

        let scaleSync = useTransform(distance, [-150, 0, 150], [0.8, 1.2, 0.8]);
        let scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

        // Tooltip position classes (You will need to adjust this based on the title size of your tooltip)
        const tooltipPositionClasses = {
          top: 'top-full mt-2 -left-2 transform -translate-x-1/2',
          bottom: 'bottom-full mb-2 -left-2 transform -translate-x-1/2',
          left: 'left-full ml-2 top-2 transform -translate-y-1/2',
          right: 'right-full mr-2 top-2 transform -translate-y-1/2',
        };

        return (
          <div key={index} className="relative">
            {item.tooltip && (
              <motion.div
                initial={tooltipInitial[position]}
                animate={hovered ? tooltipVariants[position] : tooltipInitial[position]}
                transition={tooltipTransition}
                className={\`absolute whitespace-nowrap bg-zinc-800 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 \${tooltipPositionClasses[position]}\`}
                style={{ visibility: hovered ? 'visible' : 'hidden' }}
              >
                {item.tooltip}
              </motion.div>
            )}
            <motion.div
              ref={ref}
              style={{ scale }}
              className={\`aspect-square h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300 \${hovered ? item.hoverBgColor || 'bg-zinc-700' : item.defaultBgColor || 'bg-zinc-700'}\`}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <Link
                href={item.link || '#'}
                target={item.target || '_self'}
                className="flex items-center justify-center w-10 h-10"
              >
                {item.Icon}
              </Link>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
export default Dock;
`;


// Example code
const example = [
  {
    title: 'Example.tsx',
    code: `'use client';
import React from 'react';
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Dock from './components/ui/dock';

const Home = () => {
  const items = [
    {
      link: 'https://github.com',
      target: '_blank',
      Icon: <FaGithub size={22} />,
      defaultBgColor: 'bg-zinc-700',
      hoverBgColor: 'bg-zinc-700',
      tooltip: 'GitHub', 
    },
    {
      link: 'https://x.com',
      target: '_blank',
      Icon: <FaTwitter size={22} />,
      defaultBgColor: 'bg-zinc-700',
      hoverBgColor: 'bg-zinc-700',
      tooltip: 'Twitter', 
    },
    {
      link: 'https://instagram.com',
      target: '_blank',
      Icon: <FaInstagram size={22} />,
      defaultBgColor: 'bg-zinc-700',
      hoverBgColor: 'bg-zinc-700',
      tooltip: 'Instagram', 
    },
    {
      link: 'https://discord.com/',
      target: '_blank',
      Icon: <FaDiscord size={22} />,
      defaultBgColor: 'bg-zinc-700',
      hoverBgColor: 'bg-zinc-700',
      tooltip: 'Discord', 
    },
    {
      link: 'https://linkedin.com',
      target: '_blank',
      Icon: <FaLinkedin size={22} />,
      defaultBgColor: 'bg-zinc-700',
      hoverBgColor: 'bg-zinc-700',
      tooltip: 'LinkedIn', 
    },
  ];

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <Dock position="bottom" items={items} />
    </main>
  );
};

export default Home;
`,
  },
];

 // Props data
const propsData = [
  { name: 'icon', type: 'React.ReactNode / string', description: 'Icon of the dock item' },
  { name: 'position', type: 'top / bottom / left / right', description: 'Icon of the dock item' },
  { name: 'link', type: 'string', description: 'URL to navigate to' },
  { name: 'target', type: "_blank / _self / _parent / _top", description: 'Where to open the link' },
  { name: 'defaultBgColor', type: 'string', description: 'Background color of the dock items' },
  { name: 'hoverBgColor', type: 'string', description: 'Background color of the dock item on hover' },
  { name: 'tooltip', type: 'string', description: 'Tooltip for the dock item' },
];


function DockPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStep(step);
        setTimeout(() => setCopiedStep(null), 2000);
      },
      () => alert('Failed to copy.')
    );
  };


  return (
    <div className='bg-black/80 text-white backdrop-blur-md w-full  pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Dock</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 md:pr-96'>Animated Dock component with pre-built positioning setup for all 4 positions of the screen.</p>
      </div>
      <div className='flex flex-col items-start mt-10'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-4'>
            <button
            className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Preview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Preview
          </button>
          <button
            className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Code')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
            Code
          </button>
          </div>
          
          
        </div>
        <div className='bg-black  border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2 '>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed py-20'>
                  <Dock items={items}/>
              </div>
            )}
            {activeTab === 'Code' && (
              <div>
                <SerenitySourceCodeBlock codeString={sourcecode} language="javascript"/>
              </div>
            )}
          </div>
        </div>
        <div className='pt-20 py-3 text-xl font-semibold'>
        <div className='flex items-center'>
            <div className='mr-2 sm:pl-4'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            </div>
            Installation
        </div>
        </div>
        <div>
          <div className='relative'>
                  <pre className='bg-[#18181B] p-3 sm:ml-4 rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px] border border-zinc-700'>
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add dock</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add dock', 1)}
                    className='absolute right-0 top-2 p-2 w-10 h-auto bg-[#18181B] rounded border-r border-zinc-700'
                    aria-label='Copy command'
                  >
                    {copiedStep ? (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#4ADE80"
                      className="w-4 h-4"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
                      transition={{ duration: 0.6 }} // Adjust duration if needed
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </motion.svg>
                  ) : (
                    <span className='relative -top-1 -left-1'>
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M9.75 12.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M9.75 15.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      </svg>
                    </span>
                  )}
                  </button>
            </div>
        </div>
        <div className='flex items-center pt-20 py-3 sm:pl-4 text-xl font-semibold'>
           <div className='mr-2'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>
            </div>
            Usage        
        </div>
        <SerenityExampleBlock files={example}/>
      </div>
      <div className="container mx-auto p-1 sm:p-4 mt-20">
        <div className='flex items-center mb-3'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <h1 className="text-xl font-semibold ml-2">Props</h1>
        </div>
        <PropsTable propsData={propsData} />
      </div>
    </div>
  )
}

export default DockPage;
