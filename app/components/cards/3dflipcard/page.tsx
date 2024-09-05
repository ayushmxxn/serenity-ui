'use client'
import React, { useState } from 'react'
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import PropsTable from '@/components/serenity/Table';
import { motion } from 'framer-motion';

import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import FlipCard3D from './components/FlipCard3D';


// Props for component
 const images = [
    { src: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Sunset landscape" },
    { src: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Desert scene" },
    { src: "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Red building" },
    { src: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=600", alt: "Cactus close-up" },
    { src: "https://images.pexels.com/photos/70568/spotted-baumwaran-monitor-tree-monitor-lizard-70568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Ocean view" },
  ];

// Source code
const sourcecode = `
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types 
interface ImageCardProps {
  src: string;
  alt: string;
  index: number;
  isHovered: boolean;
  isFirstCard?: boolean;
  isMobile: boolean;
  isFront?: boolean;
  frontCardIndex: number | null;
  onClick: (index: number) => void;
}

// Animations
const Card: React.FC<ImageCardProps> = ({
  src, alt, index, isHovered, isFirstCard, isMobile, isFront, frontCardIndex, onClick
}) => {
  return (
    <motion.div
      className={\`absolute w-80 h-48 rounded-xl overflow-hidden shadow-lg \${isFront ? 'z-20' : ''}\`}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: isMobile ? 'top center' : 'left center',
        zIndex: isFront ? 20 : 5 - index,
        filter: isFront || frontCardIndex === null ? 'none' : 'blur(5px)', 
      }}
      initial={{
        rotateY: 0,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      }}
      animate={isFront
        ? {
            scale: 1.2,
            rotateY: 0,
            x: isMobile ? 0 : 0,
            y: isMobile ? 0 : -50,
            z: 50,
            boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.5)',
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          }
        : isHovered
        ? {
            rotateY: isMobile ? 0 : -45,
            x: isMobile ? 0 : index * 50,
            y: isMobile ? index * 50 : index * -5,
            z: index * 15,
            scale: 1.05,
            boxShadow: \`10px 20px 30px rgba(0, 0, 0, \${0.2 + index * 0.05})\`,
            transition: { type: 'spring', stiffness: 300, damping: 50, delay: index * 0.1 }
          }
        : {
            rotateY: 0,
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            transition: { type: 'spring', stiffness: 300, damping: 20, delay: (4 - index) * 0.1 }
          }
      }
      whileHover={{
        y: isFirstCard ? 0 : -100,
      }}
      onClick={() => onClick(index)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-xl"
      />
    </motion.div>
  );
};

// Prop types 
interface CardStack3DProps {
  images: { src: string; alt: string }[];
}

const FlipCard3D: React.FC<CardStack3DProps> = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setFrontCardIndex((prevIndex) => (prevIndex === index ? null : index)); 
  };

  return (
    <div className={\`flex justify-center items-center py-32\`}>
      <div
        className="relative w-80 h-48 perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            {...image}
            index={index}
            isHovered={isHovered}
            isFirstCard={index === 0}
            isMobile={isMobile}
            isFront={frontCardIndex === index} 
            frontCardIndex={frontCardIndex} 
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FlipCard3D;
`;


// Example code
  const example = [
  {
    title: 'Example.tsx',
    code: `import React from 'react';
import FlipCard3D from './components/ui/FlipCard3D'; 

function Page () {
  const images = [
    { src: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Rabbit" },
    { src: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Monkey" },
    { src: "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Donkey" },
    { src: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=600", alt: "Cow" },
    { src: "https://images.pexels.com/photos/70568/spotted-baumwaran-monitor-tree-monitor-lizard-70568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Chameleon" },
  ];

  return (
    <div>
      <FlipCard3D images={images} />
    </div>
  );
};

export default Page;
`,
  },
];

// Props data
const propsData = [
  {
    name: 'src',
    type: 'string',
    description: 'URL or path to the image',
  },
  {
    name: 'alt',
    type: 'string',
    description: 'The alternative text for the image',
  },
];

function FlipCard3DPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');
 
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStep(step);
        setTimeout(() => setCopiedStep(null), 2000);
      },
      () => alert('Failed to copy.')
    );
  } else {
    
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  
    textarea.style.opacity = '0'; 
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedStep(step);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      alert('Failed to copy.');
    }
    
    document.body.removeChild(textarea);
  }
};


  return (
    <div className='bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>3D Flip Card</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>A 3D card stack with cool 3D hover effects. Make your stuff look cool.</p>
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
        <div className='bg-black border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2'>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                 <FlipCard3D images={images}/>
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
          <div className='absolute sm:ml-3'>
                  <pre className='bg-[#18181B] p-3 rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px] border border-zinc-700'>
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add flipcard3d</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add flipcard3d', 1)}
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
             <div className='flex items-center mt-28 py-3 sm:pl-4 text-xl font-semibold'>
           <div className='mr-2'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>
            </div>
            Usage        
        </div>
       
        </div>
         <SerenityExampleBlock files={example}/>
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
    </div>
  )
}

export default FlipCard3DPage;
