import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'; 
import xml from 'highlight.js/lib/languages/xml'; 
import CopyButton from '@/components/serenity/Copy';
import 'highlight.js/styles/github-dark.css'; 


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const codeString = `
'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

type mode = 'light' | 'dark'

interface Mode {
    mode: mode
}

function ChatWidget({mode} : Mode) {
  const [showFirstScreen, setShowFirstScreen] = useState(true);

  const handleSendMessage = () => {
    // Handle send message logic here
  }
 
  return (
    <div className='flex justify-center items-center h-full py-20'>
        <div className={\`\${mode === 'dark'? 'bg-black' : 'bg-white'} border border-zinc-500 w-72 h-auto rounded-2xl p-5 overflow-hidden z-50\`}>
            <div className="relative h-[260px]"> {/* Fixed height container */}
                <AnimatePresence initial={false} mode="wait">
                    {showFirstScreen ? (
                    <motion.div
                        key="firstScreen"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center absolute inset-0"
                    >
                        {/* First Screen */}
                        <motion.div className='flex justify-center items-center pt-5' layout>
                            <Image src={'https://i.imgur.com/yTsomza.png'} alt='image' width={80} height={80} className='rounded-full'/>
                        </motion.div>
                        <motion.div className='flex flex-col justify-center items-center gap-1 mt-5' layout>
                            <span className={\`\${mode === 'dark'? 'text-white' : 'text-black'} text-xl\`}>Rachel Patel</span>
                            <span className={\`\${mode === 'dark'? 'text-slate-400' : 'text-slate-500'}  text-sm\`}>Fashion Model</span>
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className={\`\${mode === 'dark'? 'bg-white text-black' : 'bg-black text-white'}   px-4 py-2 w-full rounded-md mt-14\`}
                            onClick={() => setShowFirstScreen(false)}
                        >
                            Let&apos;s Chat
                        </motion.button>
                    </motion.div>
                    ) : (
                    <motion.div
                        key="secondScreen"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center absolute inset-0"
                    >
                        {/* Second Screen */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='flex items-center justify-between w-full mb-4'
                        >
                            <IoIosArrowRoundBack
                                className={\`\${mode === 'dark'? 'text-white' : 'text-black'} cursor-pointer\`}
                                size={30}
                                onClick={() => setShowFirstScreen(true)}
                            />
                            <motion.div className='flex items-center gap-4'>
                                <Image src={'https://i.imgur.com/yTsomza.png'} alt='image' width={40} height={40} className='rounded-full'/>
                                <div className='flex flex-col justify-center'>
                                    <span className={\`\${mode === 'dark'? 'text-white' : 'text-black'} text-black text-md\`}>Rachel Patel</span>
                                    <span className={\`\${mode === 'dark'? 'text-slate-300' : 'text-slate-500'} text-xs\`}>Fashion Model</span>
                                </div>
                            </motion.div>
                            <div className='w-8'></div> {/* Placeholder div for spacing */}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='w-full flex flex-col items-center gap-4'
                        >
                            <motion.input
                                type='email'
                                placeholder='Your Email'
                                className={\`\${mode === 'dark'? 'bg-zinc-900 border-zinc-500' : 'bg-white border-gray-300'} text-sm sm:text-base w-full py-2 px-3 placeholder:text-gray-400 text-blue-400 border  rounded-md outline-none\`}
                            />
                            <motion.textarea
                                placeholder='Type your message'
                                className={\`\${mode === 'dark'? 'bg-zinc-900 text-slate-300 border-zinc-500' : 'bg-white text-slate-600 border-gray-300'} text-sm sm:text-base w-full p-2 border placeholder:text-gray-400   rounded-md outline-none resize-none\`}
                                rows={3}
                            ></motion.textarea>
                        </motion.div>
                        <motion.button
                            onClick={handleSendMessage}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className={\`\${mode === 'dark'? 'bg-white text-black' : 'bg-black text-white'}  px-4 py-2 w-full rounded-md mt-5\`}
                        >
                            Send Message
                        </motion.button>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
}

export default ChatWidget;

`;

console.log(codeString);


const ChatWidgetCode = () => {
  const codeRef = useRef(null);

  useEffect(() => {
    // Highlight code when component mounts
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, []);

  const handleCopyCode = () => {
    if (codeRef.current) {
      const el = document.createElement('textarea');
      el.value = codeString.trim();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      // TODO: Show a copied confirmation message (tooltip or similar)
    }
  };

  return (
    <div className="overflow-y-auto max-h-600px w-full max-w-[63rem] max-h-[600px] rounded-lg relative">
      <button
        className="absolute top-2 right-2  px-3 py-1 "
        onClick={handleCopyCode}
      >
        
<CopyButton/>
      </button>
      <pre className="overflow-x-auto">
        <code ref={codeRef} className="javascript">
          {codeString.trim()}
        </code>
      </pre>
    </div>
  );
};

export default ChatWidgetCode;
