'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import PropsTable from '@/components/serenity/Table';
import SignInForm from './components/SignInForm';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';


// Source code
const sourcecode = `
'use client'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FormEvent } from 'react';

type ModeType = 'light' | 'dark';

interface ModeProps {
  mode: ModeType;
}

const SignInForm = ({ mode }: ModeProps) => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log({ username, password });
    event.currentTarget.reset();
    
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className={\`\${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} p-8 space-y-8 rounded shadow-md w-96 z-50\`}>
        <h2 className={\`\${mode === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold text-center\`}>Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className={\`\${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium\`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              maxLength={20}
              minLength={10}
              required
              className={\`\${mode === 'dark' ? 'bg-[#16171C] focus:ring-gray-600 placeholder-gray-500 ' : 'border bg-gray-100 border-gray-300 focus:ring-slate-500'} w-full px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-1 sm:text-sm\`}
            />
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <label htmlFor="password" className={\`\${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium\`}>
                Password
              </label>
              <span className={\`\${mode === 'dark' ? 'text-slate-400 hover:text-gray-100' : 'text-slate-600 hover:text-slate-900'} text-xs cursor-pointer flex justify-start mt-1\`}>Forgot password?</span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className={\`\${mode === 'dark' ? 'bg-[#16171C] focus:ring-gray-600 placeholder-gray-500' : 'border bg-gray-100 border-gray-300 focus:ring-slate-500'} w-full px-3 py-2 mt-1 mb-1 rounded-md focus:outline-none focus:ring-1 sm:text-sm\`}
            />
          </div>
          <div>
            <button
              type="submit"
              className={\`\${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none\`}
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center mt-6">
          <span className={\`\${mode === 'dark' ? 'text-gray-400 bg-black bg-opacity-50' : 'text-gray-500 bg-white'} absolute px-2\`}>or</span>
          <div className={\`\${mode === 'dark' ? 'border-gray-700' : 'border-gray-300'} w-full border-t\`}></div>
        </div>
        <div className="flex justify-around items-center">
          <button
            type="button"
            className={\`\${mode === 'dark' ? 'text-gray-100 bg-[#16171C] hover:bg-opacity-90' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm\`}
          >
            <FcGoogle className='h-5 w-5' />
          </button>
          <button
            type="button"
            className={\`\${mode === 'dark' ? 'text-gray-100 bg-[#16171C] hover:bg-opacity-90' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm\`}
          >
            <FaGithub className='h-5 w-5' />
          </button>
        </div>
        <div className='flex justify-center'>
          <span className={\`\${mode === 'dark' ? 'text-gray-400' : 'text-slate-600'} text-sm\`}>Don&apos;t have an account?
            <span className={\`\${mode === 'dark' ? 'text-white' : 'text-black'} text-sm ml-1 hover:underline cursor-pointer\`}>Sign Up</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
`;

// Props data
const propsData = [
    { name: 'mode', type: 'string', description: 'Specifies the color scheme. Possible values are light or dark.'}
  ]

function SignInFormPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');
  const [darkMode, setDarkMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  

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
      <span className='text-4xl font-semibold pl-1'>SignIn Form</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>This SignIn Form allows users to sign in <br /> with their username, password and social profiles.</p>
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
          <div className='flex justify-end items-center gap-2'>
            
            <div className='mr-1'>
             <motion.button
      whileTap={{ scale: 0.95 }}
      className="flex items-center rounded-full p-2  text-white focus:outline-none"
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
        <div className='bg-black  border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2'>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                  <SignInForm mode={darkMode? 'dark' : 'light'} />
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
          <div className='relative sm:pl-5'>
                  <pre className='bg-[#18181B] p-3 rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px] border border-zinc-700'>
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add sign-in-form</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add sign-in-form', 1)}
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

export default SignInFormPage;
