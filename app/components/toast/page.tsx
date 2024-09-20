'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { useToast } from './components/Toast';

// Source code
const sourcecode = `
'use client';
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ toast: Toast; position: ToastPosition }[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', position: ToastPosition = 'bottom-right') => {
    const id = Date.now();
    setToasts(prev => [...prev, { toast: { id, message, type }, position }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(({ toast }) => toast.id !== id));
    }, 5000);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'].map((position) => (
        <ToastContainer key={position} toasts={toasts.filter(t => t.position === position)} position={position as ToastPosition} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: { toast: Toast; position: ToastPosition }[];
  position: ToastPosition;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, position }) => {
  const isMobile = window.innerWidth <= 640; 
  const adjustedPosition = isMobile ? (position.startsWith('top') ? 'top' : 'bottom') : position;

  const getPositionClasses = () => {
    switch (adjustedPosition) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return '';
    }
  };

  const getInitialY = () => {
    if (adjustedPosition.startsWith('top')) {
      return -50; 
    } else if (adjustedPosition === 'center') {
      return 0; 
    } else {
      return 50; 
    }
  };

  return (
    <div className={\`fixed \${getPositionClasses()} w-full max-w-full sm:max-w-sm px-4 sm:px-0 space-y-2\`}>
      <AnimatePresence>
        {toasts.map(({ toast }) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: getInitialY() }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: getInitialY() }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <ToastComponent {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastComponent: React.FC<Toast> = ({ message, type }) => {
  const typeConfig = {
    success: { icon: CircleCheck, bgColor: 'bg-green-50', textColor: 'text-green-800', borderColor: 'border-green-200' },
    error: { icon: AlertCircle, bgColor: 'bg-red-50', textColor: 'text-red-800', borderColor: 'border-red-200' },
    warning: { icon: AlertTriangle, bgColor: 'bg-yellow-50', textColor: 'text-yellow-800', borderColor: 'border-yellow-200' },
    info: { icon: Info, bgColor: 'bg-blue-50', textColor: 'text-blue-800', borderColor: 'border-blue-200' }
  };

  const { icon: Icon, bgColor, textColor, borderColor } = typeConfig[type];

  return (
    <div className={\`\${bgColor} \${borderColor} border rounded-lg shadow-lg p-4 flex items-center justify-between max-w-full\`}>
      <div className="flex items-center space-x-3">
        <Icon className={\`\${textColor} w-5 h-5\`} />
        <p className={\`\${textColor} font-medium\`}>{message}</p>
      </div>
    </div>
  );
};
`;

// Example code
const example = [
  {
    title: 'Example.tsx',
    code: `'use client';
import { useToast } from './components/ui/Toast';

function Page() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <button 
        onClick={() => showToast("Operation successful.", "success", "top-right")} 
        className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full">
        Show Success Toast
      </button>

      <button 
        onClick={() => showToast("There was an error.", "error", "bottom-left")} 
        className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full">
        Show Error Toast
      </button>

      <button 
        onClick={() => showToast("Check this warning.", "warning", "top-left")} 
        className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full">
        Show Warning Toast
      </button>

      <button 
        onClick={() => showToast("Here is some info.", "info", "bottom-right")} 
        className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full">
        Show Info Toast
      </button>
    </div>
  );
}

export default Page;
`,
  },
  {
    title: 'Layout.tsx',
    code: `import { ToastProvider } from "./components/ui/Toast";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
        <ToastProvider>
        <main>
          {children}
        </main>
        </ToastProvider>
      </body>
    </html>
  );
}
`,
  },
];



function ToastPage() {
  const [activeTab, setActiveTab] = useState('Preview');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const { showToast } = useToast();

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
      <span className='text-4xl font-semibold pl-1'>Toast</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 max-w-lg'>Easy to use Toast component with pre-built positioning for all edges of the screen.</p>
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
              <div >
                <div className="flex flex-col sm:block sm:space-x-5 justify-center items-center  space-y-4 py-10">
                  <button 
                    onClick={() => showToast("Operation successful.", "success", "bottom-right")} 
                    className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full"
                  >
                    Success Toast
                  </button>

                  <button 
                    onClick={() => showToast("There was an error.", "error", "bottom-right")} 
                    className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full"
                  >
                    Error Toast
                  </button>

                  <button 
                    onClick={() => showToast("Check this warning.", "warning", "bottom-right")} 
                    className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full"
                  >
                    Warning Toast
                  </button>

                  <button 
                    onClick={() => showToast("Here is some info.", "info", "bottom-right")} 
                    className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full"
                  >
                    Info Toast
                  </button>
                </div>
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
    </div>
  )
}

export default ToastPage;
