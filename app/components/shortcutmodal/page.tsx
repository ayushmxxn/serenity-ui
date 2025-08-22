"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import ShortcutModal from "./components/ShortcutModal";

// Source code for shortcut modal component
const sourcecode = `"use client";
import React, { useState, ChangeEvent } from "react";
import { GeistSans } from "geist/font/sans";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdKeyboard } from "react-icons/md";

interface Shortcut {
  key: string;
  description: string;
}

const ShortcutModal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const shortcuts: Shortcut[] = [
    { key: "Ctrl+B", description: "Download canvas as a PNG image" },
    { key: "Ctrl+C", description: "Copy canvas to clipboard as a PNG image" },
    { key: "Ctrl+K", description: "Open quick access menu" },
    {
      key: "Ctrl+Shift+V",
      description:
        "Paste image from clipboard to add a new image annotation layer",
    },
    { key: "Ctrl+Shift+F", description: "Clear editor state" },
    { key: "Del", description: "Delete selected annotation layer" },
  ];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredShortcuts = shortcuts.filter(
    (shortcut) =>
      shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-h-[80vh] w-full overflow-y-auto">
      <div
        className={\`\${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl w-full shadow-2xl flex flex-col mx-auto mt-8\`}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#1A1A1A] border-b border-[#2D2D2D] rounded-t-xl flex items-center justify-between">
          <div className="flex items-center">
            <MdKeyboard className="text-neutral-400 w-5 h-5 mr-2" />
            <h1 className="text-neutral-100 text-sm font-medium">
              Keyboard Shortcuts
            </h1>
          </div>
          <IoMdClose
            className="text-neutral-400 w-5 h-5 cursor-pointer hover:text-neutral-100 transition-colors"
            onClick={() => setSearchQuery("")}
          />
        </div>

        {/* Searchbar */}
        <div className="px-4 py-3 bg-[#1A1A1A]">
          <div className="relative flex items-center">
            <IoMdSearch className="text-neutral-400 w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search shortcuts..."
              className="bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 w-full pl-8 pr-2 py-2 focus:outline-none text-sm font-normal rounded-lg"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 max-h-[300px]">
          {filteredShortcuts.length > 0 ? (
            filteredShortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="group hover:bg-[#2D2D2D] rounded-lg p-2 transition-all duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <p className="text-neutral-100 text-sm font-normal flex-1 overflow-hidden text-ellipsis">
                    {shortcut.description}
                  </p>
                  <div className="flex space-x-2 ml-4">
                    {shortcut.key.split("+").map((key, idx) => (
                      <span
                        key={idx}
                        className="bg-[#2D2D2D] hover:bg-[#4a4a4a] text-neutral-100 px-2 py-1 rounded-lg text-xs cursor-default border border-[#4a4a4a]"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center gap-2 py-10">
              <p className="text-neutral-100 text-sm font-normal text-center">
                No shortcuts found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortcutModal;`;

const LazySyntaxHighlighter = React.lazy(() =>
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }))
);

interface CustomButtonProps {
  label?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "light" | "dark";
  showTooltip?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  icon,
  variant = "dark",
  showTooltip = false,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleClick = () => {
    onClick();
    if (showTooltip) {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center font-medium justify-center px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
          variant === "light"
            ? "bg-neutral-200 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:text-neutral-700"
            : "bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 hover:bg-neutral-700/50 hover:text-neutral-100"
        } ${!label ? "p-2" : ""}`}
        onClick={handleClick}
      >
        {icon && <span className={label ? "mr-1" : ""}>{icon}</span>}
        {label}
      </button>
      {showTooltip && tooltipVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-200 text-neutral-900 text-xs rounded-md shadow-lg z-10">
          Copied!
        </div>
      )}
    </div>
  );
};

const ComponentShowcase: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedModalCode, setCopiedModalCode] = useState(false);

  const copyCLI = () => {
    navigator.clipboard.writeText(
      "npx @ayushmxxn/serenity-ui@latest add shortcutmodal"
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(sourcecode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyModalCode = () => {
    navigator.clipboard.writeText(sourcecode);
    setCopiedModalCode(true);
    setTimeout(() => setCopiedModalCode(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCode(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section className="min-h-screen bg-neutral-950 text-white pb-12 relative">
      {/* Profile Image */}
      <a
        href="https://ayushmxxn.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-50 hidden sm:flex"
      >
        <Image
          src="https://i.ibb.co/pBPsjfg2/myavatar.jpg"
          alt="Your Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </a>

      <div className=" mx-auto py-8 px-6 sm:px-8 lg:px-12">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Shortcut Modal
          </h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            A modal component displaying a searchable list of keyboard
            shortcuts.
          </p>
        </div>

        {/* Button Section */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <CustomButton
              label="Show Code"
              onClick={() => setShowCode(!showCode)}
              icon={<Code className="w-4 h-4" />}
              variant="light"
            />
          </div>
          <CustomButton
            label="Add with CLI"
            onClick={copyCLI}
            icon={<SquareTerminal className="w-4 h-4" />}
            variant="dark"
            showTooltip={true}
          />
        </div>

        <motion.div className="bg-neutral-950 w-full border-t border-neutral-900 overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full">
            <ShortcutModal />
          </div>
        </motion.div>

        {/* Custom Modal */}
        {showCode && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCode(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.div>

            {/* Modal */}
            <motion.div
              className={`${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] ring-4 ring-[#171717] rounded-xl w-full max-w-4xl h-auto max-h-[71vh] shadow-2xl flex flex-col z-50 mx-1 relative`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-[#2D2D2D]">
                <CustomButton
                  label="Go Back"
                  onClick={() => setShowCode(false)}
                  variant="dark"
                />
                <CustomButton
                  icon={
                    copiedModalCode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )
                  }
                  onClick={copyModalCode}
                  variant="dark"
                />
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pb-4 px-4">
                <Suspense fallback={<div>Loading code...</div>}>
                  <LazySyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    showLineNumbers
                    wrapLongLines={false}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "#1A1A1A",
                      fontSize: "0.875rem",
                      minHeight: "100%",
                      maxWidth: "100%",
                      overflowX: "auto",
                    }}
                  >
                    {sourcecode}
                  </LazySyntaxHighlighter>
                </Suspense>
              </div>

              {/* Scrollbar Styles */}
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #4a4a4a;
                  border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background-color: #6b6b6b;
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ComponentShowcase;
