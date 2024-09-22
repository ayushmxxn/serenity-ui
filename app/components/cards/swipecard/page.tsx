'use client'
import React, { useState } from 'react'
import PropsTable from '@/components/serenity/Table';
import SwipeCards from './components/SwipeCard';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { motion } from 'framer-motion';


// Props data for component
const Cards = [
    {
      id: 4,
      z: 4,
      img: "https://images.unsplash.com/photo-1697468792373-ad4181550a5a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      z: 5,
      img: "https://images.unsplash.com/photo-1697577504575-5bee362e57a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      z: 3,
      img: "https://images.unsplash.com/photo-1653199898411-b93028f1a916?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 1,
      z: 1,
      img: "https://images.unsplash.com/photo-1712820504667-8952366b02d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      z: 2,
      img: "https://images.unsplash.com/photo-1719776555224-75afcc74d03b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

// Source Code
  const sourcecode = `
'use client'
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface SwipeCardProps {
  children: React.ReactNode;
  onSendToBack: () => void;
}

function SwipeCard({ children, onSendToBack }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [shadow, setShadow] = useState<string>("0px 0px 15px rgba(0,0,0,0.3)");

  const rotateX = useTransform(y, [-200, 200], [30, -30]);
  const rotateY = useTransform(x, [-200, 200], [-30, 30]);

  useEffect(() => {
    const unsubscribeX = x.onChange(latestX => {
      const latestY = y.get();
      setShadow(\`\${latestX / 10}px \${latestY / 10}px 15px rgba(0,0,0,0.3)\`);
    });

    const unsubscribeY = y.onChange(latestY => {
      const latestX = x.get();
      setShadow(\`\${latestX / 10}px \${latestY / 10}px 15px rgba(0,0,0,0.3)\`);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  function handleDragEnd(_: any, info: PanInfo) {
    const threshold = 150;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute h-80 w-80 cursor-grab rounded-xl"
      style={{ x, y, rotateX, rotateY, boxShadow: shadow }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

interface SwipeCardsProps {
  cards: { id: number; zindex: number; image: string }[];
}

export default function SwipeCards({ cards }: SwipeCardsProps) {
  const [currentCards, setCards] = useState(cards);

  const moveToBack = (id: number) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const cardIndex = updatedCards.findIndex((card) => card.id === id);
      const [movedCard] = updatedCards.splice(cardIndex, 1);
      updatedCards.unshift(movedCard);
      return updatedCards;
    });
  };

  return (
    <div className="relative h-80 w-80 mx-auto" style={{ perspective: 1200 }}>
      {currentCards.map((card, index) => (
        <SwipeCard key={card.id} onSendToBack={() => moveToBack(card.id)}>
          <motion.div
            className="h-full w-full rounded-xl overflow-hidden"
            animate={{
              rotateZ: (currentCards.length - index - 1) * 7,
              scale: 1 + index * 0.1 - currentCards.length * 0.1,
              transformOrigin: "80% 80%",
              zIndex: card.zindex,
            }}
            initial={false}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            <Image
              src={card.image}
              alt={\`card-\${card.id}\`}
              layout="fill"
              objectFit="cover"
              className="pointer-events-none"
            />
          </motion.div>
        </SwipeCard>
      ))}
    </div>
  );
}
`;

// Example code
  const example = [
  {
    title: 'Example.tsx',
    code: `import React from 'react';
import SwipeCards from './components/ui/SwipeCards';

const Cards = [
    {
      id: 1,
      z: 1,
      img: "https://images.unsplash.com/photo-1712820504667-8952366b02d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      z: 2,
      img: "https://images.unsplash.com/photo-1719776555224-75afcc74d03b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      z: 3,
      img: "https://images.unsplash.com/photo-1653199898411-b93028f1a916?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      z: 4,
      img: "https://images.unsplash.com/photo-1697468792373-ad4181550a5a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      z: 5,
      img: "https://images.unsplash.com/photo-1697577504575-5bee362e57a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

const Page = () => {
  return (
    <div className='mt-10'>
      <SwipeCards cards={Cards} />
    </div>
  );
};

export default Page;

`,
  },
];


// Props data
const propsData = [
  { name: 'id', type: 'number', description: 'Unique identifier for the card' },
  { name: 'z', type: 'number', description: 'Stack order of the card' },
  { name: 'img', type: 'string', description: 'URL of the image displayed on the card' },
];

function UsernameTestimonialPage() {
  
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
    <div className='bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Swipe Card</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 max-w-lg 2xl:max-w-xl'>Use this card for highlighting Product Showcases, Images, and Flashcards with an interactive, swipeable card interface.</p>
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
        <div className='bg-black  border rounded-lg border-zinc-800 w-full h-auto mt-2 '>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed py-10'>
                  <SwipeCards cards={Cards}/>
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
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add swipecard</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add swipecard', 1)}
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

export default UsernameTestimonialPage;
