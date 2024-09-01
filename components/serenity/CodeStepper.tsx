'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';

interface Step {
  title?: string;
  description?: string;
  code?: string;
  highlightLines?: number[];
}

const steps: Step[] = [
  {
    title: "Initialize Your Project",
    description: "Start by setting up your project with Serenity UI. Run the following command in your terminal:",
    code: "npx @ayushmxxn/serenity-ui@latest init",
  },
  {
    title: "Add Components",
    description: "Now that your project is ready, you can start adding components. To add a specific component, use:",
    code: `npx @ayushmxxn/serenity-ui@latest add [componentname]`,
  },
  {
    title: "Use the Component",
    description: "The added component will be available in your project’s components/ui directory. Here’s an example of how you can use the component:",
    code: `import React from 'react';
import Component from './components/ui/Component';

function Page() {
  return (
    <div>
      <Component/>
    </div>
  );
}

export default Page;`,
    highlightLines: [1, 6], 
  },
  {
    title: "Explore Available Components",
    description: "To see a list of all available components, run:",
    code: `npx @ayushmxxn/serenity-ui@latest add`,
  },
  {
    title: "Select and Add Components",
    description: "After running the command above, you'll be presented with a list of components to choose from. Use the spacebar to select the components you want, and press enter to add them to your project:",
    code: `Which components would you like to add? 
( ) voice-testimonial
( ) tubelight-navbar
( ) spotlight-card
( ) video-carousel
( ) shortcutmodal
( ) imagegallary
( ) dock`,
  },
];

const CodeStepper: FC = () => {
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
    return code.split('\n').map((line, index) => (
      <div
        key={index}
        className={`py-1 px-2 ${highlightLines?.includes(index) ? 'bg-zinc-800' : 'bg-transparent'} whitespace-pre`}
      >
        {line}
      </div>
    ));
  };

  return (
    <div className="relative max-w-5xl mx-auto my-10  lg:px-8">
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
                className={`relative w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-lg`}
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
                      className="absolute top-3 right-0 lg:right-2 bg-[#111113] text-white py-2 px-3 rounded flex items-center justify-center  transition-colors duration-200"
                      aria-label={`Copy code for ${step.title || `step ${index + 1}`}`}
                    >
                      {copiedStep === index ? (
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#4ADE80"
                          className="w-5 h-5 relative -left-1"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
                          transition={{ duration: 0.6 }} 
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

export default CodeStepper;