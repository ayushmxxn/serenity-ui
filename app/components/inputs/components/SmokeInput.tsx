"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { GeistSans } from "geist/font/sans";

const SmokeInput = () => {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Static placeholder
  const placeholder = "Type your message...";

  // Handle sending the message
  const handleSend = () => {
    if (message.trim() !== "") {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setMessage("");
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleCopyCode = () => {
    const el = document.createElement("textarea");
    el.value = codeString.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Source code of this component
  const codeString = `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { GeistSans } from "geist/font/sans";

const SmokeInput = () => {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Static placeholder
  const placeholder = "Type your message...";

  // Handle sending the message
  const handleSend = () => {
    if (message.trim() !== "") {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setMessage("");
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleCopyCode = () => {
    const el = document.createElement("textarea");
    el.value = codeString.trim();
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex items-center justify-center px-5 py-5 sm:px-10 sm:py-10 rounded-lg">
      <div
        className="absolute top-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full transition-colors duration-200"
        onClick={handleCopyCode}
        title="Copy Code"
      >
        {copied ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#FFFFFF"
            className="w-4 h-4"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
            transition={{ duration: 0.6 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </motion.svg>
        ) : (
          <svg
            fill="none"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-300 hover:text-neutral-100 transition-colors duration-200"
          >
            <path
              d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M9.75 12.25H14.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M9.75 15.25H14.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </div>
      <div
        className={\`\${GeistSans.className} relative flex flex-col items-center space-y-4 w-full max-w-lg md:max-w-md\`}
      >
        <span>Smoke</span>
        <div className="relative w-full">
          <div className="relative w-full">
            <AnimatePresence>
              {!message && (
                <motion.div
                  key={placeholder}
                  className={\`\${GeistSans.className} absolute inset-0 flex items-center justify-start \${
                    isFocused ? "ml-6" : "ml-5"
                  } active:ml-6 text-zinc-400 pointer-events-none\`}
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
              className={\`\${GeistSans.className} w-full p-2 pr-10 pl-5 \${
                isSending ? "text-transparent" : "text-neutral-100"
              } bg-zinc-800 sm:bg-zinc-900 border border-zinc-700 sm:border-zinc-800 rounded-full focus:outline-none\`}
              disabled={isSending}
            />
          </div>
          <button
            id="send-button"
            onClick={handleSend}
            className={\`absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-white rounded-full focus:outline-none \${
              isSending
                ? "bg-white/40"
                : message.trim() !== ""
                ? "bg-white/30 hover:bg-white/40"
                : "bg-white/20"
            }\`}
            disabled={isSending}
          >
            <FaArrowRight size={28} className="backdrop-blur-sm rounded-full p-2" />
          </button>
          {isSending && (
            <motion.div
              className="absolute inset-0 flex items-center pl-5 pr-10 font-medium overflow-hidden pointer-events-none rounded-full whitespace-pre"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.5, 0],
                filter: ["blur(0px)", "blur(5px)", "blur(10px)"],
                transition: { duration: 2, ease: "linear" },
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                {[...Array(40)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-full bg-gradient-to-r from-white via-zinc-400 to-slate-400"
                    style={{
                      width: \`\${Math.random() * 8 + 4}px\`,
                      height: \`\${Math.random() * 8 + 4}px\`,
                      top: \`\${Math.random() * 100}%\`,
                      left: \`\${Math.random() * 100}%\`,
                      opacity: Math.random() * 0.5 + 0.5,
                    }}
                    initial={{ opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                      opacity: [1, 0],
                      scale: [1, 2],
                      rotate: [0, 360],
                      y: [\`\${Math.random() * 30 - 15}px\`, \`\${Math.random() * 30 - 15}px\`],
                      x: [\`\${Math.random() * 30 - 15}px\`, \`\${Math.random() * 30 - 15}px\`],
                      transition: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: Math.random() * 1.5 + 1,
                        ease: "easeInOut",
                      },
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmokeInput;
`;

  return (
    <div className="relative flex items-center justify-center px-5 py-5 sm:px-10 sm:py-10 rounded-lg">
      <div
        className="absolute top-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full transition-colors duration-200"
        onClick={handleCopyCode}
        title="Copy Code"
      >
        {copied ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#FFFFFF"
            className="w-4 h-4"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
            transition={{ duration: 0.6 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </motion.svg>
        ) : (
          <svg
            fill="none"
            height="20"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-300 hover:text-neutral-100 transition-colors duration-200"
          >
            <path
              d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M9.75 12.25H14.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M9.75 15.25H14.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </div>
      <div
        className={`${GeistSans.className} relative flex flex-col items-center space-y-4 w-full max-w-lg md:max-w-md`}
      >
        <span>Smoke</span>
        <div className="relative w-full">
          <div className="relative w-full">
            <AnimatePresence>
              {!message && (
                <motion.div
                  key={placeholder}
                  className={`${
                    GeistSans.className
                  } absolute inset-0 flex items-center justify-start ${
                    isFocused ? "ml-6" : "ml-5"
                  } active:ml-6 text-zinc-400 pointer-events-none`}
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
              className={`${GeistSans.className} w-full p-2 pr-10 pl-5 ${
                isSending ? "text-transparent" : "text-neutral-100"
              } bg-zinc-800 sm:bg-zinc-900 border border-zinc-700 sm:border-zinc-800 rounded-full focus:outline-none`}
              disabled={isSending}
            />
          </div>
          <button
            id="send-button"
            onClick={handleSend}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-white rounded-full focus:outline-none ${
              isSending
                ? "bg-white/40"
                : message.trim() !== ""
                ? "bg-white/30 hover:bg-white/40"
                : "bg-white/20"
            }`}
            disabled={isSending}
          >
            <FaArrowRight
              size={28}
              className="backdrop-blur-sm rounded-full p-2"
            />
          </button>
          {isSending && (
            <motion.div
              className="absolute inset-0 flex items-center pl-5 pr-10 font-medium overflow-hidden pointer-events-none rounded-full whitespace-pre"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.5, 0],
                filter: ["blur(0px)", "blur(5px)", "blur(10px)"],
                transition: { duration: 2, ease: "linear" },
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                {[...Array(40)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-full bg-gradient-to-r from-white via-zinc-400 to-slate-400"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.5,
                    }}
                    initial={{ opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                      opacity: [1, 0],
                      scale: [1, 2],
                      rotate: [0, 360],
                      y: [
                        `${Math.random() * 30 - 15}px`,
                        `${Math.random() * 30 - 15}px`,
                      ],
                      x: [
                        `${Math.random() * 30 - 15}px`,
                        `${Math.random() * 30 - 15}px`,
                      ],
                      transition: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: Math.random() * 1.5 + 1,
                        ease: "easeInOut",
                      },
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmokeInput;
