'use client'
import Link from 'next/link';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import TechUsed from '@/components/serenity/TechUsed';
import HomeNav from '@/components/serenity/HomeNav';
import { Inter } from 'next/font/google';
import { Spotlight } from '@/components/ui/spotlight';
import { CgComponents } from "react-icons/cg";
import NewComponent from '@/components/serenity/NewComponent';
import FlipCard3D from '@/app/images/thumbnails/FlipCard3DThumbnail.png';

const Spline = lazy(() => import('@splinetool/react-spline'));

const inter = Inter({ subsets: ['latin'], weight: '500' });

function Home() {
  const [isLoading, setIsLoading] = useState(true);
   const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); 

    return () => clearTimeout(timer);
  }, []);


  const showNotification = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000); 
  };


  useEffect(() => {
    showNotification();
  }, []);

  return (
    <div className={`${inter.className} bg-black`}>
      <HomeNav />  
      <div className="flex flex-col p-5 pt-28 md:pt-24 lg:pt-32">
    
        <div className='hidden lg:flex'>
          <Spotlight fill="gray"/>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-6">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 bg-opacity-50 sm:px-20 lg:px-0 xl:px-0 2xl:px-0">
              Beautifully crafted UI components to elevate your web projects
            </span>
            <p className="text-sm sm:text-lg mt-4 text-[#ABAFB4] sm:px-40 lg:px-0 xl:px-0 2xl:px-0">
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
              <div className="w-44 h-44 md:w-80 md:h-80 items-center justify-center text-white hidden lg:flex">
                <span className="loader"></span>
              </div>
            ) : (
              <Suspense fallback={<div className="w-44 h-44 md:w-80 md:h-80 items-center justify-center text-white hidden lg:flex"><span className="loader"></span></div>}>
                <Spline 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                  className="w-full h-full hidden lg:block" // Hidden on mobile, shown on lg screens
                />
              </Suspense>
            )}
          </div>
        </div>

    
        <div className="justify-center lg:justify-start xl:justify-start 2xl:justify-start flex items-start pt-24 pb-5 lg:pl-5 xl:pl-5 lg:pt-10 xl:pb-5">
          <TechUsed />
        </div>
        <NewComponent
        imageUrl= {FlipCard3D}
        link='/components/cards/3dflipcard'
        message="New component is out! ✨"
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
      </div>
    </div>
  );
}

export default React.memo(Home);
