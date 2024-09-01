'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

const placeholders = [
  "Who will be the next OpenAI CEO?",
  "Are we living in a simulation?",
  "How do vampires deal with insomnia?",
  "Can we achieve AGI by 2030?",
  "Who is Beeple’s next target meme?"
];

const PlaceHolderInput = () => {
  const [message, setMessage] = useState<string>(''); 
  const [isSending, setIsSending] = useState<boolean>(false); 
  const [ripples, setRipples] = useState<Array<{ x: number, y: number }>>([]);
  const [placeholder, setPlaceholder] = useState<string>(placeholders[0]);
  const [isFocused, setIsFocused] = useState<boolean>(false); 
  const [copied, setCopied] = useState(false);

  // Update placeholder every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 4000); // Placeholder Timer

    return () => clearInterval(intervalId); 
  }, []);

  // Handle sending the message
  const handleSend = (x?: number, y?: number) => {
    if (message.trim() !== '') { 
      setIsSending(true);

    
      if (x !== undefined && y !== undefined) {
        setRipples([...ripples, { x, y }]);
        setTimeout(() => setRipples(ripples.slice(1)), 500);
      }

      setTimeout(() => {
        setIsSending(false); 
        setMessage(''); 
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const buttonRect = document.getElementById('send-button')?.getBoundingClientRect();
      if (buttonRect) {
        const x = buttonRect.width / 2;
        const y = buttonRect.height / 2;
        handleSend(x, y);
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handleSend(x, y);
  };

  const messageCharacters = Array.from(message);

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

const codeString = `
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

const placeholders = [
  "Who will be the next OpenAI CEO?",
  "Are we living in a simulation?",
  "How do vampires deal with insomnia?",
  "Can we achieve AGI by 2030?",
  "Who is Beeple’s next target meme?"
];

const PlaceholderInput = () => {
  const [message, setMessage] = useState<string>(''); // State managing input message
  const [isSending, setIsSending] = useState<boolean>(false); // State managing sending status
  const [ripples, setRipples] = useState<Array<{ x: number, y: number }>>([]);
  const [placeholder, setPlaceholder] = useState<string>(placeholders[0]);
  const [isFocused, setIsFocused] = useState<boolean>(false); // State managing focus

  // Update placeholder every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 4000); // Placeholder Timer

    return () => clearInterval(intervalId); 
  }, []);

  // Handle sending the message
  const handleSend = (x?: number, y?: number) => {
    if (message.trim() !== '') { 
      setIsSending(true);

      if (x !== undefined && y !== undefined) {
        setRipples([...ripples, { x, y }]);
        setTimeout(() => setRipples(ripples.slice(1)), 500);
      }

      setTimeout(() => {
        setIsSending(false); 
        setMessage(''); 
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const buttonRect = document.getElementById('send-button')?.getBoundingClientRect();
      if (buttonRect) {
        const x = buttonRect.width / 2;
        const y = buttonRect.height / 2;
        handleSend(x, y);
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handleSend(x, y);
  };

  const messageCharacters = Array.from(message);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 p-4">
      <div className="relative flex flex-col items-center space-y-4 w-full max-w-lg md:max-w-md">
        <div className="relative w-full">
          <div className="relative w-full">
            <AnimatePresence>
              {!message && ( 
                <motion.div
                  key={placeholder} 
                  className={\`\${inter.className} absolute inset-0 flex items-center justify-start \${isFocused ? 'ml-6' : 'ml-5'} active:ml-6 text-zinc-400 pointer-events-none\`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  {placeholder}
                </motion.div>
              )}
            </AnimatePresence>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)} 
              onBlur={() => setIsFocused(false)} 
              className={\`\${inter.className} w-full p-2 pr-10 pl-5 bg-zinc-800 border border-zinc-700 rounded-full focus:outline-none \${isSending ? 'text-transparent' : 'text-gray-100'}\`}
              disabled={isSending}
            />
          </div>
          <button
            id="send-button"
            onClick={handleButtonClick}
            className={\`absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-white rounded-full focus:outline-none \${isSending ? 'bg-white/40' : message.trim() !== '' ? 'bg-white/30 hover:bg-white/40' : 'bg-white/20 '}\`}
            disabled={isSending}
          >
            <FaArrowRight size={28} className={\`backdrop-blur-sm rounded-full p-2 \`} />
            {/* Ripple effect */}
            {ripples.map((ripple, index) => (
              <motion.span
                key={index}
                className="absolute rounded-full bg-white opacity-30"
                style={{
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  transform: \`translate(\${ripple.x - 28}px, \${ripple.y - 28}px)\`,
                }}
                animate={{ scale: [0, 2], opacity: [1, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </button>

          {/* Animation */}
          {isSending && (
            <motion.div
              className="absolute inset-1 flex items-center pl-5 pr-10 font-medium overflow-hidden pointer-events-none rounded-full whitespace-pre"
              initial={{ opacity: 1 }} 
              animate={{
                opacity: [1, 0.5, 0], 
                filter: ['blur(0px)', 'blur(5px)', 'blur(10px)'], 
                transition: { duration: 2, ease: 'linear' }, 
              }}
            >
              {messageCharacters.map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-white"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{
                    opacity: [1, 0.7, 0], 
                    transition: {
                      delay: index * 0.02, 
                      ease: 'linear',
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceholderInput;
`;

  

  return (
    <div className="relative flex items-center justify-centerpy-10 px-5 py-5 sm:px-10 sm:py-10 bg-black rounded-lg border border-zinc-800 p-4">
        {/* Copy Icon */}
      <div className="absolute top-3 right-3 cursor-pointer" onClick={handleCopyCode}>
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
              transition={{ duration: 0.6 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </motion.svg>
          ) : (
            <svg fill="none" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              <path d="M9.75 12.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
              <path d="M9.75 15.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
            </svg>
          )}
      </div>
      <div className="relative flex flex-col items-center space-y-4 w-full max-w-lg md:max-w-md">
        <span>Placeholder</span>
        <div className="relative w-full">
          <div className="relative w-full">
            <AnimatePresence>
              {!message && ( 
                <motion.div
                  key={placeholder} 
                  className={`${inter.className} absolute inset-0 flex items-center justify-start ${isFocused ? 'ml-6' : 'ml-5'} active:ml-6 text-zinc-400 pointer-events-none`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  {placeholder}
                </motion.div>
              )}
            </AnimatePresence>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)} 
              onBlur={() => setIsFocused(false)} 
              className={`${inter.className} w-full p-2 pr-10 pl-5 bg-zinc-800 sm:bg-zinc-900 border border-zinc-700 sm:border-zinc-800 rounded-full focus:outline-none ${
                isSending ? 'text-transparent' : 'text-gray-100'
              }`}
              disabled={isSending}
            />
          </div>
          <button
            id="send-button"
            onClick={handleButtonClick}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-white rounded-full focus:outline-none ${
              isSending
                ? 'bg-white/40'
                : message.trim() !== ''
                ? 'bg-white/30 hover:bg-white/40'
                : 'bg-white/20 '
            }`}
            disabled={isSending}
          >
            <FaArrowRight size={28} className={`backdrop-blur-sm rounded-full p-2 `} />
            {/* Ripple effect */}
            {ripples.map((ripple, index) => (
              <motion.span
                key={index}
                className="absolute rounded-full bg-white opacity-30"
                style={{
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  transform: `translate(${ripple.x - 28}px, ${ripple.y - 28}px)`,
                }}
                animate={{ scale: [0, 2], opacity: [1, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </button>

          {/* Animation */}
          {isSending && (
            <motion.div
              className="absolute inset-1 flex items-center pl-5 pr-10 font-medium overflow-hidden pointer-events-none rounded-full whitespace-pre"
              initial={{ opacity: 1 }} 
              animate={{
                opacity: [1, 0.5, 0], 
                filter: ['blur(0px)', 'blur(5px)', 'blur(10px)'], 
                transition: { duration: 2, ease: 'linear' }, 
              }}
            >
              {messageCharacters.map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-white"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{
                    opacity: [1, 0.7, 0], 
                    transition: {
                      delay: index * 0.02, 
                      ease: 'linear',
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceHolderInput;
