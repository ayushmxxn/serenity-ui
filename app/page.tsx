'use client'
import Link from 'next/link';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import TechUsed from '@/components/serenity/TechUsed';
import HomeNav from '@/components/serenity/HomeNav';
import { Inter } from 'next/font/google';
import { Spotlight } from '@/components/ui/spotlight';
import { CgComponents } from "react-icons/cg";


const Spline = lazy(() => import('@splinetool/react-spline'));

const inter = Inter({ subsets: ['latin'], weight: '500' });

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${inter.className} h-screen bg-black`}>
      <HomeNav />  
      <div className="flex flex-col p-5 pt-12 md:pt-32">
        <div className='hidden lg:flex'>
          <Spotlight fill="gray"/>
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-6">
            <span className="text-3xl md:text-5xl font-bold py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 bg-opacity-50">
              Beautifully crafted UI components to elevate your web projects
            </span>
            <p className="text-sm sm:text-lg mt-4 text-[#ABAFB4]">
              Accelerate Your Workflow with Ready-to-Use Components. Fully Customizable and open source.
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-5 mt-8">
              <Link prefetch href={'docs/introduction'}>
                <button className="text-sm whiteshimmerbtn">Get Started</button>
              </Link>
              <button className='px-6 rounded-lg animatedButton bubbleeffectbtnserenity'>
                <Link prefetch href={'components'} className='flex items-center gap-2'>
                  <CgComponents className="text-white" size={18} />
                  <span className='text-sm'>Explore</span>
                </Link>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/1 lg:h-[400px] mt-10 lg:mt-0 flex justify-center magicpattern">
            {isLoading ? (
              <div className="w-44 h-44 md:w-80 md:h-80 flex items-center justify-center text-white"><span className="loader"></span></div>
            ) : (
              <Suspense fallback={<div className="w-44 h-44 md:w-80 md:h-80 flex items-center justify-center text-white"><span className="loader"></span></div>}>
                <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
              </Suspense>
            )}
          </div>
        </div>
        <div className="lg:mt-14 lg:pl-5 justify-start flex items-start">
          <TechUsed />
        </div>
        
      </div>
    </div>
  );
}

export default React.memo(Home);
