'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

type icon = 'success' | 'error' | 'warning' | 'info';
type position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type variant = 'default' | 'colored'
type mode = 'light' | 'dark'

interface ToastProps {
  title?: string;
  body?: string;
  icon?: icon | string; 
  mode?: mode; 
  variant?: variant;
  position?: position;
  timer?: number;
  loader?: number;
}

function SerenityToast({ title , body  , timer , loader,  icon, position, variant, mode} : ToastProps) {
  const [hidden, setHidden] = useState(false);
   const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => {
    setHidden(true)
    }, loader || 3000); // 3 seconds loader 

    return () => clearTimeout(timer);
  }, [loader]);



  // Checking for mobile device
   useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };

    handleResize(); // Checking on mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    setHidden(true);
  };

  if (hidden) {
    return null; 
  }
  

   const animation = 
    isMobile && (position === 'top-right' || position === 'top-left') 
    ? 'toast-center-top'
    : isMobile && (position === 'bottom-right' || position === 'bottom-left') 
    ? 'toast-center-bottom'
    : position === 'top-right'
    ? 'toast-top-right'
    : position === 'top-left'
    ? 'toast-top-left'
    : position === 'bottom-right'
    ? 'toast-bottom-right'
    : position === 'bottom-left'
    ? 'toast-bottom-left'
    : 'toast-center-right'; // Default


  return (
    <div className='flex justify-center items-center h-96'>
    <div className={` 
    ${position === 'bottom-right' &&  'absolute bottom-10 right-10'
    || 
    position === 'top-right' &&  'absolute top-10 right-10' 
    ||
    position === 'bottom-left' &&  'absolute bottom-10 left-10' 
    ||
    position === 'top-left' &&  'absolute top-10 left-10' 
   }
   ${mode === 'dark'? 'bg-black border border-zinc-400' : 'bg-white'}
     z-50 shadow-md h-auto max-w-80 w-80 p-1 
    ${animation}
    `}>
      <motion.div
        className={`
          ${variant === 'colored' && icon === 'success' && 'bg-green-500'
            ||
            variant === 'colored' && icon === 'error' && 'bg-red-500'
            ||
            variant === 'colored' && icon === 'warning' && 'bg-yellow-500'
            ||
            variant === 'colored' && icon === 'info' && 'bg-blue-500'
            ||
            variant === 'colored' && 'bg-green-500'
            ||
            variant === 'default' && 'bg-zinc-600'
          }
            h-1 absolute top-0 left-0 right-0 `}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: timer || 3 }}
      />
      <div className="flex items-start p-2 pt-3">
        {icon === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${mode === 'dark' ? (variant === 'colored' ? 'text-green-500' : 'text-slate-200') : 'text-black'} ${variant === 'colored' && 'text-green-500'}`}>
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
        )}
        {icon === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${mode === 'dark' ? (variant === 'colored' ? 'text-red-500' : 'text-slate-200') : 'text-black'} ${variant === 'colored' && 'text-red-500'}`}>
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
        )}
        {icon === 'warning' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${mode === 'dark' ? (variant === 'colored' ? 'text-yellow-500' : 'text-slate-200') : 'text-black'} ${variant === 'colored' && 'text-yellow-500'}`}>
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>

        )}
        {icon === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${mode === 'dark' ? (variant === 'colored' ? 'text-blue-500' : 'text-slate-200') : 'text-black'} ${variant === 'colored' && 'text-blue-500'}`}>
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
        )}
        {!icon && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${mode === 'dark' ? (variant === 'colored' ? 'text-green-500' : 'text-slate-200') : 'text-black'} ${variant === 'colored' && 'text-green-500'}`}>
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        )}
        <div className="ml-2">
	         <p className={`${inter.className} font-medium text-sm text-black ${mode === 'dark' && 'text-zinc-100'}`}>{title || 'Title'}</p> 
          <div className='max-w-60 flex flex-col ' style={{ maxHeight: '150px', overflowY: 'auto' }}>
            <p className={`${inter.className}  text-sm ${mode === 'dark'? 'text-zinc-300' : 'text-zinc-700'}`} style={{ overflowWrap: 'break-word' }}>{body || 'Message Body'}</p>
          </div>
        </div>
        <button className="focus:outline-none" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 absolute top-3 right-2 ${mode === 'dark'? 'text-zinc-300' : 'text-zinc-600'}`}>
            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59Z"/>
          </svg>
        </button>
      </div>
    </div>
    </div>
  );
}

export default SerenityToast;