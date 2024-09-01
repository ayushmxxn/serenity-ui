'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';

function ShimmerButton() {
  const [copied, setCopied] = useState(false);

const codeString = `
'use client';

const ShineButton = () => {
  return (
    <div className="flex items-center justify-center  ">
      <button
        className="relative inline-flex items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-2 text-white shadow-2xl transition-all duration-1000 ease-out focus:outline-none shine-effect tap-effect"
        type="button"
      >
        <style jsx>{\`
          @keyframes shine {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .shine-effect {
            background: linear-gradient(45deg, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0) 75%);
            background-size: 200% 100%;
            transition: background-position 0.5s ease-out;
          }

          .shine-effect:hover {
            animation: shine 1s ease-out forwards;
          }

          .tap-effect:active {
            transform: scale(0.95);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
          }
        \`}</style>

        <span className="text-sm font-medium">Hover me</span>
      </button>
    </div>
  );
};

export default ShineButton;
`;


  const handleCopyCode = () => {
    const el = document.createElement('textarea');
    el.value = codeString.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=''>
      <div className='flex flex-col items-start'>
        <div className='relative bg-black flex justify-center items-center border rounded-lg border-zinc-800 w-full max-w-[24rem] h-auto py-10 mt-2'>
         <button
        className="relative inline-flex items-center justify-center rounded-3xl  border border-neutral-800 bg-neutral-950 px-6 py-2 text-white shadow-2xl transition-all duration-1000 ease-out focus:outline-none shine-effect tap-effect"
        type="button"
      >
        <style jsx>{`
          @keyframes shine {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .shine-effect {
            background: linear-gradient(45deg, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0) 75%);
            background-size: 200% 100%;
            transition: background-position 0.5s ease-out;
          }

          .shine-effect:hover {
            animation: shine 1s ease-out forwards;
          }

          .tap-effect:active {
            transform: scale(0.95);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
          }
        `}</style>

        <span className="text-sm font-medium">Hover me</span>
      </button>
          <div className="absolute top-2 right-2 cursor-pointer" onClick={handleCopyCode}>
            {copied ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#4ADE80"
              className="w-4 h-4 relative -left-1 top-1"
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShimmerButton;
