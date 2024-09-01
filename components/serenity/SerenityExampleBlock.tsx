'use client';
import { useState } from 'react';
import { FaFile, FaFileCode, FaFilePdf, FaFileExcel, FaReact, FaCss3 } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Inter } from 'next/font/google';
import CustomTheme from '@/app/themes/customTheme'; 
import { motion } from 'framer-motion';

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

const SerenityExampleBlock: React.FC<CodeBlockProps> = ({ files, defaultTitle }) => {
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
    return fileIcons[`.${ext}`] || fileIcons['default'];
  };

  return (
    <div className={`${inter.className} bg-opacity-30 bg-black text-white p-4 rounded relative backdrop-blur-md border border-zinc-700 max-w-full sm:w-[700px] max-h-96 sm:ml-4`}>
      <div className="flex items-center justify-between mb-2 border-b border-zinc-700 pb-2 ">
        <div className="flex space-x-2  ">
          {files.map(({ title }) => (
            <button
              key={title}
              onClick={() => setActiveTitle(title)}
              className={`flex border-t  items-center px-3 py-1 rounded-full text-sm ${title === activeTitle ? 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-white border-zinc-600' : 'bg-zinc-950 text-gray-400 border-zinc-800'} transition-colors duration-300`}
            >
              <span className="mr-2">{getFileIcon(title)}</span>
              {title}
            </button>
          ))}
        </div>
        <button
          aria-label="Copy code"
          onClick={() => copyToClipboard(code)}
          className="text-gray-400  hover:text-white rounded-md transition relative sm:-top-1 sm:-left-2"
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
      <div className="max-w-full overflow-auto max-h-80 mx-auto">
        <SyntaxHighlighter
          language="javascript" 
          style={CustomTheme} 
          wrapLines
          customStyle={{ padding: '1rem' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SerenityExampleBlock;
