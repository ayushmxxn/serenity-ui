'use client'
import React, { useState } from 'react'
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import PropsTable from '@/components/serenity/Table';
import { motion } from 'framer-motion';
import { FaApple, FaMicrosoft, FaGoogle, FaAmazon, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import BrandSection from './components/BrandSection';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';


// Prop data for component
const Brands = [
  { name: 'Apple', logo: FaApple },
  { name: 'Microsoft', logo: FaMicrosoft },
  { name: 'Google', logo: FaGoogle },
  { name: 'Amazon', logo: FaAmazon },
  { name: 'Facebook', logo: FaFacebook },
  { name: 'Twitter', logo: FaTwitter },
  { name: 'LinkedIn', logo: FaLinkedin },
  { name: 'Instagram', logo: FaInstagram },
];


// Source Code
const sourcecode = `
'use client'
import React, { useState, useEffect, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { IconType } from 'react-icons'; 

const inter = Inter({ subsets: ['latin'] });

type BrandType = {
  name: string;
  logo: string | IconType; 
};

interface BrandSectionProps {
  brands: BrandType[];
  scrollSpeed?: number;
  scrollInterval?: number;
}

const BrandCard: React.FC<{ brand: BrandType; onHover: (isHovered: boolean) => void; className?: string }> = React.memo(
  ({ brand, onHover, className }) => (
    <motion.div
      className={\`\${inter.className} flex-shrink-0 w-auto text-zinc-800 rounded-3xl overflow-hidden flex flex-col items-start justify-center p-6 \${className}\`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex items-center space-x-2">
        {typeof brand.logo === 'string' ? (
          <Image src={brand.logo} alt={brand.name} width={50} height={50} className="text-3xl text-white" />
        ) : typeof brand.logo === 'function' ? (
          React.createElement(brand.logo, { className: 'text-3xl text-white' })
        ) : (
          React.cloneElement(brand.logo, { className: 'text-3xl text-white' })
        )}
        <h3 className="text-lg font-semibold text-white">{brand.name}</h3>
      </div>
    </motion.div>
  )
);

BrandCard.displayName = 'BrandCard';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const BrandSection: React.FC<BrandSectionProps> = ({
  brands,
  scrollSpeed = 0.1,
  scrollInterval = 30,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const effectiveScrollSpeed = isMobile ? scrollSpeed * 2 : scrollSpeed;
  const effectiveScrollInterval = isMobile ? scrollInterval / 2 : scrollInterval;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setScrollPosition((prevPosition) => (prevPosition + effectiveScrollSpeed) % 100);
      }, effectiveScrollInterval);
    }

    return () => clearInterval(interval);
  }, [isPaused, effectiveScrollSpeed, effectiveScrollInterval]);

  const handleHover = (isHovered: boolean) => {
    setIsPaused(isHovered);
  };

  return (
    <section className="py-16 bg-black relative">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence>
            <motion.div
              className="flex space-x-5"
              style={{ transform: \`translateX(-\${scrollPosition}%)\` }}
              transition={{ duration: 0.5 }}
            >
              {brands.concat(brands).map((brand, index) => (
                <BrandCard key={index} brand={brand} onHover={handleHover} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
`;


// Example Code
const example = [
  {
    title: 'Example.tsx',
    code: `'use client'
import React from 'react';
import BrandScrollSection from './components/ui/BrandSection';
import { FaApple, FaMicrosoft, FaGoogle, FaAmazon, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Brands = [
  { name: 'Apple', logo: FaApple },
  { name: 'Microsoft', logo: FaMicrosoft },
  { name: 'Google', logo: FaGoogle },
  { name: 'Amazon', logo: FaAmazon },
  { name: 'Facebook', logo: FaFacebook },
  { name: 'Twitter', logo: FaTwitter },
  { name: 'LinkedIn', logo: FaLinkedin },
  { name: 'Instagram', logo: FaInstagram },
];

const App = () => {
  return (
    <BrandSection brands={Brands} scrollSpeed={0.1} scrollInterval={30}/>
  );
};

export default App;
`,
  },
];


// Props data 
const propsData = [
  {
    name: 'name',
    type: 'string',
    description: 'name of the company',
  },
  {
    name: 'logo',
    type: 'string | IconType',
    description: 'logo of the company',
  },
  {
    name: 'scrollSpeed',
    type: 'number',
    description: 'Controls the speed at which the brands scroll horizontally.',
  },
  {
    name: 'scrollInterval',
    type: 'number',
    description: 'Defines the interval (in milliseconds) at which the scroll position updates.',
  },
];



function BrandsSectionPage() {
  
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
      <span className='text-4xl font-semibold pl-1'>Brand Section</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 max-w-xl'>BrandSection component is designed to display a horizontally scrolling list of brands in a visually engaging manner.</p>
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
                <BrandSection  brands={Brands} scrollSpeed={0.1} scrollInterval={30} /> 
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
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add brandsection</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add brandsection', 1)}
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

export default BrandsSectionPage;
