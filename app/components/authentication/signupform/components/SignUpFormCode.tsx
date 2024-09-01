import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'; 
import xml from 'highlight.js/lib/languages/xml'; 
import CopyButton from '@/components/serenity/Copy';
import 'highlight.js/styles/github-dark.css'; 


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const codeString = `
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

type mode = 'light' | 'dark';

interface Mode {
  mode?: mode;
}

const SignUpForm = ({ mode }: Mode) => {

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email')
    const password = formData.get('password')
    console.log({ username, email, password });
    event.currentTarget.reset();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className={\`\${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} p-8 space-y-8 rounded shadow-md w-96 z-50\`}>
        <h2 className={\`\${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-2xl font-bold text-center\`}>Create My Account</h2>
        <form onSubmit={handleSubmit}  className="space-y-6">
          <div>
            <label htmlFor="username" className={\`\${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium\`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              required
              className={\`\${mode === 'dark' ? 'bg-[#16171C]' : 'bg-gray-100 border border-gray-300 text-black'} w-full px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm\`}
            />
          </div>
          <div>
            <label htmlFor="email" className={\`\${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium\`}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder="Email address"
              required
              className={\`\${mode === 'dark' ? 'bg-[#16171C]' : 'bg-gray-100 border border-gray-300 text-black'} w-full px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm\`}
            />
          </div>
          <div>
            <label htmlFor="password" className={\`\${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium\`}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              className={\`\${mode === 'dark' ? 'bg-[#16171C]' : 'bg-gray-100 border border-gray-300 text-black'} w-full px-3 py-2 mt-1 mb-1 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm\`}
            />
          </div>
          <div>
            <button
              type="submit"
              className={\`\${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none\`}
            >
              Sign Up
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
            className={\`\${mode === 'dark' ? 'text-gray-100 bg-[#16171C] hover:bg-opacity-80' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm\`}
          >
            <FcGoogle className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={\`\${mode === 'dark' ? 'text-gray-100 bg-[#16171C] hover:bg-opacity-80' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm\`}
          >
            <FaGithub className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center">
          <span className={\`\${mode === 'dark' ? 'text-gray-400' : 'text-slate-600'} text-sm\`}>Already have an account?
            <span className={\`\${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-sm ml-1 hover:underline cursor-pointer\`}>Sign In</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
`;

const SignUpFormCode = () => {
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

export default SignUpFormCode;
