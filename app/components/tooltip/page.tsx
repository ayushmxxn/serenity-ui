'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import Tooltip from './Tooltip';

// Source code
const sourcecode = `
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
  theme?: 'light' | 'dark';
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className = '',
  theme = 'dark',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = useCallback(() => {
    timerRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideTooltip]);

  const classes = {
    position: {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    },
    theme: {
      light: 'bg-white text-gray-800 shadow-lg border-b-2 border-gray-200',
      dark: 'bg-gray-900 text-white',
    },
    animation: {
      enter: 'transition-all duration-350 ease-cubic-bezier(0.4, 0, 0.2, 1)',
      enterFrom: 'opacity-0 scale-90',
      enterTo: 'opacity-100 scale-100',
      leave: 'transition-all duration-300 ease-cubic-bezier(0.4, 0, 0.2, 1)',
      leaveFrom: 'opacity-100 scale-100',
      leaveTo: 'opacity-0 scale-90',
    },
  };

  const translate = {
    top: 'translate-y-4',
    right: '-translate-x-4',
    bottom: '-translate-y-4',
    left: 'translate-x-4',
  };

  const tooltipClasses = \`\${classes.position[position]} \${classes.theme[theme]} \${className} 
    \${isVisible ? 'visible' : 'invisible'} 
    \${classes.animation.enter} \${isVisible ? classes.animation.enterTo : \`\${classes.animation.enterFrom} \${translate[position]}\`}\`;

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      <div
        ref={tooltipRef}
        className={\`absolute z-10 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap max-w-none \${tooltipClasses}\`}
      >
        {content}
        <div
          className={\`absolute w-3 h-3 transform rotate-45 \${
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          } \${position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2' :
            position === 'right' ? 'left-[-6px] top-1/2 -translate-y-1/2' :
            position === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2' :
            'right-[-6px] top-1/2 -translate-y-1/2'}\`}
        />
      </div>
    </div>
  );
};

export default Tooltip;
`;

// Example code
const example = [
  {
    title: 'Example.tsx',
    code: `import Tooltip from "./components/Tooltip";
    
const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center">
    <Tooltip content="This is a tooltip" position="top" theme="light">
      <button className="px-4 py-2 bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors">
        Hover me
      </button>
    </Tooltip>
    </div>

  );
};
export default Page;
`,
  },
];



function ToastPage() {
  const [activeTab, setActiveTab] = useState('Preview');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

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
      <span className='text-4xl font-semibold pl-1'>Tooltip</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 max-w-xl'>Tooltip that displays informative text when hovering over its child elements, with customizable position, theme, and styling options.</p>
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
        </div>
        
        <div className='bg-black border rounded-lg border-zinc-800 w-full mt-2 overflow-auto flex justify-around items-center'>
          <div>
            {activeTab === 'Preview' && (
              <div className='flex justify-center items-center py-20 gap-20 flex-col sm:flex-row' >
                <Tooltip content="This is a tooltip" position="top" theme="light">
                    <button className="px-4 py-2 bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors">
                        Hover me
                    </button>
                </Tooltip>
                <Tooltip content="This is a tooltip" position="bottom" theme="light">
                    <button className="px-4 py-2 bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors">
                        Hover me
                    </button>
                </Tooltip>
                <Tooltip content="This is a tooltip" position="left" theme="light">
                    <button className="px-4 py-2 bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors">
                        Hover me
                    </button>
                </Tooltip>
                <Tooltip content="This is a tooltip" position="right" theme="light">
                    <button className="px-4 py-2 bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors">
                        Hover me
                    </button>
                </Tooltip>
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
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add tooltip</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add tooltip', 1)}
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
    </div>
  )
}

export default ToastPage;