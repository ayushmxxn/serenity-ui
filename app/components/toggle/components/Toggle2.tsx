'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


function SlidingToggle() {
  const [copied, setCopied] = useState(false);

  const [darkmode, setDarkMode] = useState(true)

        const handleToggle = () => {
        setDarkMode(!darkmode);
        console.log(darkmode)
    };

    useEffect(() => {
        document.body.style.backgroundColor = darkmode ? '#000000' : '#FFFFFF';
    }, [darkmode]);


const codeString = `
'use client';
import React, { useState, useEffect } from 'react';

function DarkModeToggleV2() {
    const [darkmode, setDarkMode] = useState(true);

    const handleToggle = () => {
        setDarkMode(!darkmode);
    };

    useEffect(() => {
        document.body.style.backgroundColor = darkmode ? '#000000' : '#FFFFFF';
    }, [darkmode]);

    return (
        <div className='h-screen flex justify-center items-center'>
            <div
                className={\`flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 \${
                    darkmode ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'
                }\`}
                onClick={handleToggle}
            >
                <div className='flex justify-between items-center w-full'>
                    <div
                        className={\`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 \${
                            darkmode ? 'transform translate-x-0 bg-zinc-800' : 'transform translate-x-8 bg-gray-200'
                        }\`}
                    >
                        {darkmode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-white"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-gray-700"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                            </svg>
                        )}
                    </div>
                    <div
                        className={\`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 \${
                            darkmode ? 'bg-transparent' : 'transform -translate-x-8'
                        }\`}
                    >
                        {darkmode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-gray-500"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-black"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DarkModeToggleV2;

`;

  const handleCopyCode = () => {
    const el = document.createElement('textarea');
    el.value = codeString.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className='flex flex-col items-start'>
        <div className='relative bg-black flex justify-center items-center border rounded-lg border-zinc-900 w-full max-w-[40rem] h-auto py-10 px-10  mt-2'>
         <div
                className={`flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 ${
                    darkmode ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'
                }`}
                onClick={handleToggle}
            >
                <div className='flex justify-between items-center w-full'>
                    <div
                        className={`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 ${
                            darkmode ? 'transform translate-x-0 bg-zinc-800' : 'transform translate-x-8 bg-gray-200'
                        }`}
                    >
                        {darkmode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-white"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-gray-700"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                            </svg>
                        )}
                    </div>
                    <div
                        className={`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 ${
                            darkmode ? 'bg-transparent' : 'transform -translate-x-8'
                        }`}
                    >
                        {darkmode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-gray-500"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-black"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                            </svg>
                        )}
                    </div>
                </div>
            </div>
    <div className="absolute top-2 right-2 cursor-pointer" onClick={handleCopyCode}>
            {copied ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#4ADE80"
              className="w-4 h-4 relative -left-1 top-1"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
              transition={{ duration: 0.6 }} // Adjust duration if needed
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </motion.svg>
          ) : (
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              <path d="M9.75 12.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              <path d="M9.75 15.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
            </svg>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlidingToggle;