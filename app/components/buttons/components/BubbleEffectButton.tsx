"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { GeistSans } from "geist/font/sans";

function BubbleEffectButton() {
  const [copied, setCopied] = useState(false);

  const codeString = `
'use client';

const BubbleEffectButton = () => {
  return (
    <div className="flex items-center justify-center">
      <button
        className="bubbleeffectbtn"
        type="button"
      >
        <style jsx>{\`
          .bubbleeffectbtn {
            min-width: 130px;
            height: 40px;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            outline: none;
            border-radius: 25px;
            border: none;
            background: linear-gradient(45deg, #212529, #343a40);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1;
            overflow: hidden;
          }

          .bubbleeffectbtn:before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
            transform: rotate(45deg);
            transition: all 0.5s ease;
            z-index: -1;
          }

          .bubbleeffectbtn:hover:before {
            top: -100%;
            left: -100%;
          }

          .bubbleeffectbtn:after {
            border-radius: 25px;
            position: absolute;
            content: "";
            width: 0;
            height: 100%;
            top: 0;
            z-index: -1;
            box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5), 7px 7px 20px 0px rgba(0, 0, 0, .1), 4px 4px 5px 0px rgba(0, 0, 0, .1);
            transition: all 0.3s ease;
            background: linear-gradient(45deg, #343a40, #495057);
            right: 0;
          }

          .bubbleeffectbtn:hover:after {
            width: 100%;
            left: 0;
          }

          .bubbleeffectbtn:active {
            top: 2px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            background: linear-gradient(45deg, #212529, #343a40);
          }

          .bubbleeffectbtn span {
            position: relative;
            z-index: 2;
          }
        \`}</style>

        <span className="text-sm font-semibold">Hover me</span>
      </button>
    </div>
  );
};

export default BubbleEffectButton;
`;

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
        className={`${GeistSans.className} relative flex flex-col items-center space-y-4 w-full max-w-lg md:max-w-md`}
      >
        <div className="relative w-full flex justify-center">
          <button className="bubbleeffectbtn" type="button">
            <style jsx>{`
              .bubbleeffectbtn {
                min-width: 130px;
                height: 40px;
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                display: inline-block;
                outline: none;
                border-radius: 25px;
                border: none;
                background: linear-gradient(45deg, #212529, #343a40);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 1;
                overflow: hidden;
              }

              .bubbleeffectbtn:before {
                content: "";
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(
                  45deg,
                  rgba(255, 255, 255, 0.1),
                  rgba(255, 255, 255, 0)
                );
                transform: rotate(45deg);
                transition: all 0.5s ease;
                z-index: -1;
              }

              .bubbleeffectbtn:hover:before {
                top: -100%;
                left: -100%;
              }

              .bubbleeffectbtn:after {
                border-radius: 25px;
                position: absolute;
                content: "";
                width: 0;
                height: 100%;
                top: 0;
                z-index: -1;
                box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
                  7px 7px 20px 0px rgba(0, 0, 0, 0.1),
                  4px 4px 5px 0px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                background: linear-gradient(45deg, #343a40, #495057);
                right: 0;
              }

              .bubbleeffectbtn:hover:after {
                width: 100%;
                left: 0;
              }

              .bubbleeffectbtn:active {
                top: 2px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                background: linear-gradient(45deg, #212529, #343a40);
              }

              .bubbleeffectbtn span {
                position: relative;
                z-index: 2;
              }
            `}</style>
            <span className="text-sm font-semibold">Hover me</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BubbleEffectButton;
