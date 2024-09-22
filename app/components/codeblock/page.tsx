'use client'
import React, { useState } from 'react'
import PropsTable from '@/components/serenity/Table';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import CodeBlock from './components/CodeBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { motion } from 'framer-motion';


// Props data for component
const codefile = [
  {
    title: 'index.tsx',
    code: `import CodeBlock from '../components/CodeBlock';

const files = {
  'index.tsx': \`import CodeBlock from '../components/CodeBlock';\`
};

const MyComponent = () => <CodeBlock files={files} />;

export default MyComponent;`,
  },
  {
    title: 'index.css',
    code: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
}

.footer {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
}
`,
  },
];

// Source Code
const sourcecode = `
'use client';
import { useState } from 'react';
import { FaFile, FaFileCode, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
import { FaCss3 } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'; // try out this one if you do not have a custom theme
import React from 'react';

const inter = Inter({ subsets: ["latin"], weight: "500" });

interface FileBlock {
  title: string;
  code: string;
}

interface CodeBlockProps {
  files: FileBlock[];
  defaultTitle?: string;
}

const fileIcons: { [key: string]: JSX.Element } = {
  '.js': <FaFileCode />,
  '.tsx': <FaReact />,
  '.html': <FaFileCode />,
  '.css': <FaCss3 />,
  '.pdf': <FaFilePdf />,
  '.xls': <FaFileExcel />,
  '.xlsx': <FaFileExcel />,
  'default': <FaFile />
};

const CodeBlock: React.FC<CodeBlockProps> = ({ files, defaultTitle }) => {
  const [activeTitle, setActiveTitle] = useState(defaultTitle || (files[0]?.title || ''));
  const [copied, setCopied] = useState(false);

  const activeFile = files.find(file => file.title === activeTitle);
  const code = activeFile?.code || '';

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    } else {
    
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop();
    return fileIcons[\`.\${ext}\`] || fileIcons['default'];
  };

  return (
    <div className={\`\${inter.className} bg-opacity-30 bg-black text-white p-4 rounded relative backdrop-blur-md border border-zinc-700\`}>
      <div className="flex items-center justify-between mb-2 border-b border-zinc-700 pb-2">
        <div className="flex space-x-2">
          {files.map(({ title }) => (
            <button
              key={title}
              onClick={() => setActiveTitle(title)}
              className={\`flex border-t items-center px-3 py-1 rounded-full text-sm \${title === activeTitle ? 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-white border-zinc-600' : 'bg-zinc-950 text-gray-400 border-zinc-800'} transition-colors duration-300\`}
            >
              <span className="mr-2">{getFileIcon(title)}</span>
              {title}
            </button>
          ))}
        </div>
        <button
          aria-label="Copy code"
          onClick={() => copyToClipboard(code)}
          className="text-gray-400 hover:text-white rounded-md transition relative sm:-top-1 sm:-left-2"
        >
          {copied ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#4ADE80"
              className="w-4 h-4 relative -left-1"
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
        </button>
      </div>
      <div className="overflow-x-auto max-h-[256px] overflow-auto">
        <SyntaxHighlighter
          language="javascript" // Adjust based on your code language
          style={nightOwl} // Use your custom theme here or from the react-syntax-highlighter
          wrapLines
          customStyle={{ padding: '1rem' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
`;

// Example code
const example = [
  {
    title: 'Example.tsx',
    code: `import React from "react";
import CodeBlock from "./components/ui/CodeBlock";

const files = [
  {
    title: 'customtheme.js',
    code: \`const CustomTheme = {
  'code[class*="language-"]': {
    color: '#e0e0e0',
    background: '#000000',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '1em',
    lineHeight: '1.5',
  },
  'pre[class*="language-"]': {
    background: '#000000',
    padding: '1em',
    borderRadius: '5px',
    overflow: 'auto',
  },
  comment: {
    color: '#7C7C7C',
  },
  prolog: {
    color: '#7C7C7C',
  },
  doctype: {
    color: '#7C7C7C',
  },
  cdata: {
    color: '#7C7C7C',
  },
  punctuation: {
    color: '#c5c8c6',
  },
  '.namespace': {
    opacity: '.7',
  },
  property: {
    color: '#96CBFE',
  },
  keyword: {
    color: '#96CBFE',
  },
  tag: {
    color: '#96CBFE',
  },
  'class-name': {
    color: '#FFFFB6',
    textDecoration: 'underline',
  },
  boolean: {
    color: '#99CC99',
  },
  constant: {
    color: '#99CC99',
  },
  symbol: {
    color: '#f92672',
  },
  deleted: {
    color: '#f92672',
  },
  number: {
    color: '#FF73FD',
  },
  selector: {
    color: '#A8FF60',
  },
  'attr-name': {
    color: '#A8FF60',
  },
  string: {
    color: '#76ff7f',
  },
  char: {
    color: '#A8FF60',
  },
  builtin: {
    color: '#A8FF60',
  },
  inserted: {
    color: '#A8FF60',
  },
  variable: {
    color: '#C6C5FE',
  },
  operator: {
    color: '#EDEDED',
  },
  entity: {
    color: '#FFFFB6',
    cursor: 'help',
  },
  url: {
    color: '#96CBFE',
  },
  '.language-css .token.string': {
    color: '#87C38A',
  },
  '.style .token.string': {
    color: '#87C38A',
  },
  atrule: {
    color: '#F9EE98',
  },
  'attr-value': {
    color: '#F9EE98',
  },
  function: {
    color: '#f0abfc',
  },
  regex: {
    color: '#E9C062',
  },
  important: {
    color: '#fd971f',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};

export default CustomTheme;
\`,
  },
];


const HomePage = () => {
  return (
    <div className="p-5">
      <CodeBlock codefile={files} defaultfile="index.tsx" />
    </div>
  );
};

export default HomePage;

`,
  },
];


// Props data 
const propsData = [
  { name: 'title', type: 'string', description: 'Title of the file' },
  { name: 'code', type: 'string', description: 'Code of the file' },
  { name: 'defaultfile', type: 'string', description: 'Default active file' },
  { name: 'codefile', type: 'FileBlock[]', description: 'Array of file objects, each containing a title and code to be displayed.' },
  
];

function CodeBlockPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

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
    <div className='bg-black/80 text-white backdrop-blur-md w-full  pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Code Block</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 max-w-xl'>CodeBlock component for switching between multiple code files, with syntax highlighting, file icons, and copy code functionality.</p>
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
          
          
        </div>
        <div className='bg-black  border rounded-lg border-zinc-800 w-full h-auto mt-2 '>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed py-20'>
                <CodeBlock codefile={codefile} defaultfile="index.tsx" />
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
                  <pre className='bg-[#18181B] p-3 sm:ml-4 rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px] border border-zinc-700'>
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add codeblock</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add codeblock', 1)}
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

export default CodeBlockPage;
