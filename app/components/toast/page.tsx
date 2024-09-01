'use client'
import React, { useEffect, useState } from 'react'
import PropsTable from '@/components/serenity/Table';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './components/Toast';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';

// Source code
const sourcecode = `
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

function Toast({ title , body  , timer , loader,  icon, position, variant, mode} : ToastProps) {
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
    <div className={\` 
    \${position === 'bottom-right' &&  'absolute bottom-10 right-10'
    || 
    position === 'top-right' &&  'absolute top-10 right-10' 
    ||
    position === 'bottom-left' &&  'absolute bottom-10 left-10' 
    ||
    position === 'top-left' &&  'absolute top-10 left-10' 
   }
   \${mode === 'dark'? 'bg-black border border-zinc-400' : 'bg-white'}
     z-50 shadow-md h-auto max-w-80 w-80 p-1 
    \${animation}
    \`}>
      <motion.div
        className={\`
          \${variant === 'colored' && icon === 'success' && 'bg-green-500'
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
            h-1 absolute top-0 left-0 right-0\`}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: timer || 3 }}
      />
      <div className="flex items-start p-2 pt-3">
        {icon === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`size-5 \${mode === 'dark' ? (variant === 'colored' ? 'text-green-500' : 'text-slate-200') : 'text-black'} \${variant === 'colored' && 'text-green-500'}\`}>
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
        )}
        {icon === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`size-5 \${mode === 'dark' ? (variant === 'colored' ? 'text-red-500' : 'text-slate-200') : 'text-black'} \${variant === 'colored' && 'text-red-500'}\`}>
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
        )}
        {icon === 'warning' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`size-5 \${mode === 'dark' ? (variant === 'colored' ? 'text-yellow-500' : 'text-slate-200') : 'text-black'} \${variant === 'colored' && 'text-yellow-500'}\`}>
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>

        )}
        {icon === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`size-5 \${mode === 'dark' ? (variant === 'colored' ? 'text-blue-500' : 'text-slate-200') : 'text-black'} \${variant === 'colored' && 'text-blue-500'}\`}>
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
        )}
        {!icon && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`size-5 \${mode === 'dark' ? (variant === 'colored' ? 'text-green-500' : 'text-slate-200') : 'text-black'} \${variant === 'colored' && 'text-green-500'}\`}>
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        )}
        <div className="ml-2">
	         <p className={\`\${inter.className} font-medium text-sm text-black \${mode === 'dark' && 'text-zinc-100'}\`}>{title || 'Title'}</p> 
          <div className='max-w-60 flex flex-col ' style={{ maxHeight: '150px', overflowY: 'auto' }}>
            <p className={\`\${inter.className}  text-sm \${mode === 'dark'? 'text-zinc-300' : 'text-zinc-700'}\`} style={{ overflowWrap: 'break-word' }}>{body || 'Message Body'}</p>
          </div>
        </div>
        <button className="focus:outline-none" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`w-4 h-4 absolute top-3 right-2 \${mode === 'dark'? 'text-zinc-300' : 'text-zinc-600'}\`}>
            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59Z"/>
          </svg>
        </button>
      </div>
    </div>
    </div>
  );
}

export default Toast;
`;

// Example code
const example = [
  {
    title: 'Example.tsx',
    code: `import React from 'react'
import Toast from './components/ui/Toast'

function Page() {
  return (
    <div>
      <Toast
          position='top-right'
          variant='default'
          mode='light'
          timer={10}
          loader={10000}
          icon='success'
          title='Title'
          body='Message Body'
        />
    </div>
  )
}

export default Page;
`,
  },
];

// Props data
  const propsData = [
    { name: 'title', type: 'string', description: 'Title of Notification' },
    { name: 'body', type: 'string', description: 'Message body of Notification' },
    { name: 'icon', type: 'string', description: 'success / error / warning / info' },
    { name: 'varient', type: 'string', description: 'default / colored' },
    { name: 'position', type: 'string', description: 'top-right / top-left / bottom-right / bottom-left' },
    { name: 'timer', type: 'number', description: 'How much time the notification should be displayed' },
    { name: 'mode', type: 'string', description: 'Specifies the color scheme. Possible values are light or dark.'}
  ];


function ToastPage() {
  const [activeTab, setActiveTab] = useState('Preview');
  const [activeColor, setActiveColor] = useState('default');
  const [activeIcon, setActiveIcon] = useState('success');
  const [darkMode, setDarkMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };


  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleColorChange = (color: React.SetStateAction<string>) => {
    setActiveColor(color);
  };

  const handleIcon = (e:any) => {
    setActiveIcon(e.target.value)
  }

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
      <span className='text-4xl font-semibold pl-1'>Toast</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>Toast component with pre-built positioning, different icons, themes and support for <br /> light and dark mode.</p>
      </div>
      <div className='flex flex-col items-start mt-10'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-4'>
            <button
              className={`flex items-center text-white px-3 py-1 rounded-md text-sm sm:text-base ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
              onClick={() => handleTabChange('Preview')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Preview
            </button>
            <button
              className={`flex items-center text-white px-3 py-1 rounded-md text-sm sm:text-base ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
              onClick={() => handleTabChange('Code')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>
              Code
            </button>
          </div>
          <div className='flex justify-end items-center gap-2'>
            <div className='flex justify-end items-center gap-2'> 
          </div>
            <select id="cars" name="cars" className="block w-full text-xs py-2 px-3 mr-2 rounded-md bg-black border border-zinc-600 text-white focus:outline-none focus:border-zinc-700" onChange={handleIcon}>
        <option value="icon" disabled selected hidden>
           Icon
        </option>
        <option value="success">Success</option>
        <option value="error">Error</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
      </select>
            <div className=''>
              <div className='flex items-center justify-center gap-2'>
                <div onClick={() => handleColorChange('default')} className={`bg-white rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'White' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
                <div onClick={() => handleColorChange('colored')} className={`bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'White' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
              </div>
            </div>
            <div className='mr-1'>
             <motion.button
      whileTap={{ scale: 0.95 }}
      className="flex items-center rounded-full p-2 text-white focus:outline-none"
      onClick={toggleDarkMode}
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.svg
            key="dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
            initial={hasMounted ? { opacity: 0, rotate: -90 } : false}
            animate={hasMounted ? { opacity: 1, rotate: 0 } : false}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.1 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="light"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
            initial={hasMounted ? { opacity: 0, rotate: -90 } : false}
            animate={hasMounted ? { opacity: 1, rotate: 0 } : false}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.1 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
            </div>
          </div>
          
        </div>
        
        <div className='bg-black border rounded-lg border-zinc-800 w-full max-w-[63rem] mt-2 overflow-auto'>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                <Toast mode={`${darkMode? 'dark' : 'light'}`} variant={`${activeColor === 'colored'? 'colored' : 'default'}`} icon={activeIcon}/>
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
                  <pre className='bg-zinc-900/70 backdrop-blur-lg p-3 sm:ml-4 border border-zinc-700 shadow-lg rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px]'>
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add toast</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add toast', 1)}
                    className='absolute right-0 top-2 p-2 w-10 h-auto bg-[#111113] rounded border-r border-zinc-700'
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

export default ToastPage;
