import React from 'react';
import { Inter } from 'next/font/google';
import Spline from '@splinetool/react-spline';
import IntroCards from '@/components/serenity/IntroCards';


const inter = Inter({ subsets: ['latin'], weight: '500' });

const cardData = [
  {
    title: 'What is Serenity UI?',
    description: 'Serenity UI is a collection of customizable and open-source components built with Next.js, Tailwind, TypeScript and Framer Motion.',
  },
  {
    title: 'How does Serenity UI work?',
    description: 'It offers a CLI tool for easy component integration or you can copy and paste the components directly into your project.',
  },
  {
    title: 'Can I use this in my project?',
    description: 'Absolutely! Serenity UI is free for both personal and commercial projects. I’d love to see what you create with it.',
  },
  {
    title: 'Can I customize the components?',
    description: 'Yes. all components are highly customizable to fit your needs.',
  },
  {
    title: 'Which frameworks are compatible with Serenity UI?',
    description: 'Serenity UI is primarily designed for use with React and Next.js.',
  },
  {
    title: 'Community',
    description: 'Join our Discord community for support, sharing projects, reporting bugs and suggesting components.',
  },
];

function Introduction() {
  return (
    <div className={`${inter.className} text-white backdrop-blur-lg bg-gradient-to-br from-zinc-950 to-black w-full h-full pt-28 overflow-auto p-3 relative`}>
      {/* Container for Spline and IntroductionSerenity */}
      <div className="relative w-full h-full">
        {/* Spline component */}
        <div className="absolute inset-0 z-10">
          <Spline scene="https://prod.spline.design/jkiOe6OSWymmKUMb/scene.splinecode" />
          <div className="absolute inset-0  opacity-20 mix-blend-multiply z-0"></div>
        </div>

        {/* IntroductionSerenity component */}
        <div className="relative z-20 flex flex-col justify-between items-center max-w-[1200px] w-full mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Introduction
            </h1>
          </div>
          
          {/* Content Section */}
          <div className="w-full p-6 lg:px-4 lg:py-6 rounded-xl shadow-lg lg:mt-0">
            <IntroCards cards={cardData}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
