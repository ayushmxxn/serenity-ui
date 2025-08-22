"use client";
import React, { useState } from "react";
import { ArrowBigDownDash, Copy, Check } from "lucide-react";

// Installation card data with step numbers
const installationData = [
  {
    step: 1,
    title: "Initialize Your Project",
    description:
      "Start by setting up your project with Serenity UI. Run the following command in your terminal:",
    command: "npx @ayushmxxn/serenity-ui@latest init",
  },
  {
    step: 2,
    title: "Add Components",
    description:
      "Now that your project is ready, you can start adding components. To add a specific component, use:",
    command: "npx @ayushmxxn/serenity-ui@latest add [componentName]",
  },
  {
    step: 3,
    title: "Use the Component",
    description:
      "The added component will be available in your project's components/ui directory.",
    code: `import React from 'react';
import Component from './components/ui/Component';

function Page() {
  return (
    <div>
      <Component />
    </div>
  );
}

export default Page;`,
  },
];

export default function InstallationPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Function to handle copying text to clipboard
  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };

  return (
    <div id="installation" className="bg-black text-white flex flex-col">
      <div className="flex-1 px-4 sm:px-0">
        {/* Installation Header (Adapted from SerenityFAQ) */}
        <div className="border-t border-b border-dashed border-neutral-800">
          <div className="max-w-6xl 2xl:max-w-7xl mx-auto sm:border-l sm:border-r border-dashed border-neutral-800 px-0 sm:px-4 py-12 sm:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-neutral-800 border border-dashed border-neutral-700 rounded-lg mb-4 shadow-lg">
                <ArrowBigDownDash className="w-5 h-5 text-neutral-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-neutral-100 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Installation Guide
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">
                Get started in a few simple steps
              </p>
            </div>
          </div>
        </div>

        {/* Installation Cards (Grid Layout) */}
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto sm:border-l sm:border-r border-dashed border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {installationData.map((item, index) => (
              <div
                key={index}
                className={`
                  border border-dashed border-neutral-800 bg-neutral-800/50 
                  p-4 sm:p-6
                  transition-all duration-200 
                  hover:bg-neutral-800/50 hover:shadow-md hover:border-dashed hover:border-neutral-800
                `}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-neutral-700 text-neutral-100 rounded-full font-medium text-xs">
                    {item.step}
                  </div>
                  <h3 className="text-neutral-100 font-semibold text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300">
                    {item.title}
                  </h3>
                </div>
                <div className="pt-2">
                  <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {/* Command Display */}
                  {item.command && (
                    <div className="relative mb-4">
                      <div className="bg-neutral-800/80 border border-dashed border-[#404040] rounded-lg p-4">
                        <code className="text-sm font-mono text-green-400 break-all">
                          {item.command}
                        </code>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(item.command, `command-${index}`)
                        }
                        className="absolute -top-3 -right-3 p-1 bg-neutral-900 border border-dashed border-neutral-800 hover:bg-neutral-700/50 transition-colors rounded-lg"
                        title={
                          copiedIndex === `command-${index}`
                            ? "Copied"
                            : "Copy command"
                        }
                      >
                        {copiedIndex === `command-${index}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  )}
                  {/* Code Display */}
                  {item.code && (
                    <div className="relative">
                      <div className="bg-neutral-800/80 border border-dashed border-[#404040] rounded-lg p-4 overflow-x-auto max-h-64">
                        <pre className="text-xs font-mono text-blue-300 whitespace-pre-wrap">
                          {item.code}
                        </pre>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(item.code, `code-${index}`)
                        }
                        className="absolute -top-3 -right-3 p-1 rounded-lg bg-neutral-900 border border-dashed border-neutral-800 hover:bg-neutral-700/50 transition-colors"
                        title={
                          copiedIndex === `code-${index}`
                            ? "Copied"
                            : "Copy code"
                        }
                      >
                        {copiedIndex === `code-${index}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
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
    </div>
  );
}
