'use client'
import React, { useState } from 'react'
import PropsTable from '@/components/serenity/Table';
import Steps from './components/Steps';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { motion } from 'framer-motion';

// Source code
const sourcecode = `
'use client';
import React from 'react';
import { FC, useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

interface Step {
  title?: string;
  description?: string;
  code?: string;
  highlightLines?: number[];
}

interface StepsProps {
  steps: Step[];
}

const Steps: FC<StepsProps> = ({ steps }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (code: string | undefined, index: number) => {
    if (!code) return; 
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        () => setCopiedStep(index),
        (err) => console.error("Failed to copy code: ", err)
      );
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setCopiedStep(index);
        } else {
          console.error("Oops, unable to copy.");
        }
      } catch (err) {
        console.error("Oops, unable to copy.", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const renderCodeWithHighlight = (code: string | undefined, highlightLines?: number[]) => {
    if (!code) return null; 
    return code.split('\\n').map((line, index) => (
      <div
        key={index}
        className={\`py-1 px-2 \${highlightLines?.includes(index) ? 'bg-zinc-800' : 'bg-transparent'} whitespace-pre\`}
      >
        {line}
      </div>
    ));
  };

  return (
    <div className={\`\${inter.className} relative max-w-xl my-10 mx-auto px-3\`}>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute top-0 left-4 w-1 bg-zinc-900 h-full z-10"></div>

        <div className="flex flex-col space-y-8 relative z-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col space-y-4"
            >
              <div
                className={\`relative w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-lg\`}
                style={{ zIndex: 20 }}
              >
                {index + 1}
              </div>
              <div className="ml-12 flex-1">
                {step.title && <h3 className="text-lg text-zinc-200 font-semibold">{step.title}</h3>}
                {step.description && <p className="text-zinc-400 mt-1">{step.description}</p>}
                {step.code && (
                  <div className="relative mt-3 bg-zinc-900/70 backdrop-blur-lg p-4 rounded-md shadow-lg overflow-x-auto border border-zinc-700">
                    <pre className="text-white">
                      <code>
                        {renderCodeWithHighlight(step.code, step.highlightLines)}
                      </code>
                    </pre>
                    {/* Copy Button */}
                    <button
                      onClick={() => copyToClipboard(step.code, index)}
                      className="absolute top-3 right-2 bg-[#111113] text-white py-2 px-3 rounded flex items-center justify-center shadow-md transition-colors duration-200"
                      aria-label={\`Copy code for \${step.title || \`step \${index + 1}\`}\`}
                    >
                      {copiedStep === index ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;
`;

// Example code
const example = [
  {
    title: 'Example.tsx',
    code: `import Steps from './components/ui/Steps';

const steps = [
  {
    title: "Title",
    description: "Description",
    code: "Your code",
  },
  {
    title: "Highlight Code",
    description: "Highlighting specific lines in your code",
    code: \`/\\$import React from 'react';
import Component from './components/ComponentName';

function App() {
  return (
    <div>
      <Component/>
    </div>
  );
}

export default App;/\`,
    highlightLines: [1,6],
  },
];

function Page() {
  return (
    <div>
      <Steps steps={steps} />
    </div>
  )
}

export default Page;
`,
  },
];


// Props data
const propsData = [
    { name: 'title', type: 'string', description: 'Title of the step' },
    { name: 'description', type: 'string', description: 'Description of the step' },
    { name: 'code', type: 'string', description: 'Code of the step' },
    { name: 'highlightLines', type: 'number[]', description: 'Line numbers you want to highlight in your code' },
   
  ]

function StepsPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

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
      <span className='text-4xl font-semibold pl-1'>Steps</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 lg:mr-96'>Use this to showcase sequential instructions in your project with highlighted code snippets and copy code functionality.</p>
      </div>
      <div className='flex flex-col items-start mt-10'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-4'>
            <button
            className={`flex items-center text-white px-3 py-1 rounded ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Preview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Preview
          </button>
          <button
            className={`flex items-center text-white px-3 py-1 rounded ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Code')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
            Code
          </button>
          </div>
        </div>
        <div className='bg-black  border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2 '>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                  <Steps/>
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
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add steps</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add steps', 1)}
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
        <div className='flex items-center sm:ml-5 pt-20 py-3 text-xl font-semibold'>
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

export default StepsPage;
