'use client';
import { FC, useState } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ["latin"], weight: "500" });

interface Step {
  title?: string;
  description?: string;
  code?: string;
  highlightLines?: number[];
}

const steps: Step[] = [
  {
    title: "Title",
    description: "Description",
    code: "Your code",
  },
  {
    title: "Highlight Code",
    description: "Highlighting specific lines in your code",
    code: `import React from 'react';
import Component from './components/ComponentName';

function App() {
  return (
    <div>
      <Component/>
    </div>
  );
}

export default App;`,
  highlightLines: [1,6],
  },
];

const Steps: FC = () => {
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
    <div className={`${inter.className} relative  max-w-xl my-10 mx-auto px-3`}>
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
                      className="absolute top-3 right-2 bg-[#111113] text-white py-2 px-3 rounded flex items-center justify-center shadow-md transition-colors duration-200"
                      aria-label={`Copy code for ${step.title || `step ${index + 1}`}`}
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
