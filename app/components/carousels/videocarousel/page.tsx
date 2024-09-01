'use client'
import React, { useState } from 'react'
import VideoCarousel from './components/VideoCarousel';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import PropsTable from '@/components/serenity/Table';
import { motion } from 'framer-motion';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';


// Props data for component
 const videos = [
    { id: 1, title: 'Cosmic Journey', src: '/video/video1.mp4', srcLow: '/video/video1-low.mp4', description: 'A masked traveler ventures through the cosmos in search of an elusive truth.' },
    { id: 2, title: 'Ocean Depths', src: '/video/video2.mp4', srcLow: '/video/video2-low.mp4', description: 'A girl waits on a secluded shore, anticipating the arrival of the masked traveler.' },
    { id: 3, title: 'Nature\'s Whisper', src: '/video/video3.mp4', srcLow: '/video/video3-low.mp4', description: 'The traveler, immersed in nature, experiences profound emotions and goosebumps.' },
    { id: 4, title: 'Urban Rhythm', src: '/video/video4.mp4', srcLow: '/video/video4-low.mp4', description: 'A girl and boy eagerly wait for the traveler to arrive.'},
  ];

// Source code
const sourcecode = `
'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Video {
  id: number;
  title: string;
  src: string;
  srcLow: string; // Low quality video source
  description: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/path/to/noise-texture.png')] opacity-5 mix-blend-overlay"></div>
      <AnimatePresence initial={false}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className={\`absolute w-[80%] h-[70%] bg-black bg-opacity-60 rounded-2xl shadow-2xl shadow-black flex items-center justify-center overflow-hidden
                        \${index === currentIndex ? 'z-20' : 'z-10'} 
                        \${index === (currentIndex + 1) % videos.length ? 'z-0' : ''} 
                        \${index === (currentIndex - 1 + videos.length) % videos.length ? 'z-0' : ''}\`}
            initial={{ scale: 0.8, x: index > currentIndex ? '100%' : '-100%', opacity: 0, rotateY: index > currentIndex ? 45 : -45 }}
            animate={{ 
              scale: index === currentIndex ? 1 : 0.8, 
              x: index === currentIndex ? 0 : index > currentIndex ? '100%' : '-100%', 
              opacity: index === currentIndex ? 1 : 0.3,
              rotateY: index === currentIndex ? 0 : index > currentIndex ? 45 : -45
            }}
            exit={{ scale: 0.8, x: index < currentIndex ? '-100%' : '100%', opacity: 0, rotateY: index < currentIndex ? -45 : 45 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full group">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el!;
                }}
                src={isMobile ? video.srcLow : video.src} // Use low quality source on mobile
                className="w-full h-full object-cover"
                autoPlay={false}
                loop
                muted
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className={\`absolute max-w-96 bg-black/10 sm:bg-transparent backdrop-blur sm:backdrop-blur-none bottom-0 left-0 right-0 p-6 text-white transform \${ 
                isMobile ? '' : 'translate-y-full group-hover:translate-y-0'
              } transition-transform duration-300 ease-in-out\`}>
                <span className="text-3xl font-bold">{video.title}</span>
                <p className="text-sm opacity-80 mt-1">{video.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button 
        onClick={prevVideo} 
        aria-label="Previous video"
        className="absolute left-3 sm:left-8 z-30 text-white text-6xl opacity-50 hover:opacity-100 transition-opacity duration-300"
      >
        &#8249;
      </button>
      <button 
        onClick={nextVideo} 
        aria-label="Next video"
        className="absolute right-3 sm:right-8 z-30 text-white text-6xl opacity-50 hover:opacity-100 transition-opacity duration-300"
      >
        &#8250;
      </button>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={\`w-3 h-3 rounded-full \${index === currentIndex ? 'bg-white' : 'bg-gray-400'} transition-colors duration-300\`}
            aria-label={\`Go to video \${index + 1}\`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
`;



// Example code
  const example = [
  {
    title: 'Example.tsx',
    code: `import VideoCarousel from "@/components/3DVideoCarousel";

  
const App = () => {
  const videos = [
    { id: 1, title: 'Cosmic Journey', src: '/video/video1.mp4', srcLow: '/video/video1-low.mp4', description: 'A masked traveler ventures through the cosmos in search of an elusive truth.' },
    { id: 2, title: 'Ocean Depths', src: '/video/video2.mp4', srcLow: '/video/video2-low.mp4', description: 'A girl waits on a secluded shore, anticipating the arrival of the masked traveler.' },
    { id: 3, title: 'Nature Whisper', src: '/video/video3.mp4', srcLow: '/video/video3-low.mp4', description: 'The traveler, immersed in nature, experiences profound emotions and goosebumps.' },
    { id: 4, title: 'Urban Rhythm', src: '/video/video4.mp4', srcLow: '/video/video4-low.mp4', description: 'A girl and boy eagerly wait for the traveler to arrive.'},
  ];

  return (
    <div>
      <VideoCarousel videos={videos}  />
    </div>
  );
};

export default App;
`,
  },
];


// Props data
const propsData = [
  {
    name: 'id',
    type: 'number',
    description: 'Unique identifier for each video.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Title of the video.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Description of the video content.',
  },
  {
    name: 'src',
    type: 'string',
    description: 'Source URL of the video for high quality, typically used for larger devices.',
  },
  {
    name: 'srcLow',
    type: 'string',
    description: 'Source URL of the video for low quality, typically used for mobile devices.',
  },
];


function ImageCarouselPage() {
  
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
      <span className='text-4xl font-semibold pl-1'>Video Carousel</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>Video Carousel with automatic playback and manual navigation controls, <br /> providing an engaging way to present video content.</p>
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
        <div className='bg-black  border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2'>
          <div>
            {activeTab === 'Preview' && (
              <div>
                  <VideoCarousel videos={videos}/>
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
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add video-carousel</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add video-carousel', 1)}
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

export default ImageCarouselPage;
