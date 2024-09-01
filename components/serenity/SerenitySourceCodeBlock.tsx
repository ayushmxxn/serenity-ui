'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CustomTheme from '@/app/themes/customTheme';
import CopyButton from './Copy';

interface CodeBlockProps {
  codeString: string;
  language?: 'javascript' | 'xml'; 
}

const SerenitySourceCodeBlock: React.FC<CodeBlockProps> = ({ codeString, language = 'javascript' }) => {
  const handleCopyCode = () => {
    const el = document.createElement('textarea');
    el.value = codeString.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className="overflow-y-auto max-h-600px w-full max-w-[63rem] max-h-[600px] rounded-lg relative">
      <button
        className="absolute top-2 right-2 px-3 py-1"
        onClick={handleCopyCode}
      >
        <CopyButton />
      </button>
      <SyntaxHighlighter
        language={language}
        style={CustomTheme} // Apply your custom theme
        customStyle={{ padding: '1rem' }} // Optional: Add custom styles
      >
        {codeString.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default SerenitySourceCodeBlock;
