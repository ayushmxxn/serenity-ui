"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code, Copy, SquareTerminal } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistSans } from "geist/font/sans";
import { useToast } from "./components/Toast";

// Source code for toast navbar component
const sourcecode = `// 1. Wrap your app or component tree with ToastProvider to enable toast functionality.
// 2. Use the useToast hook to trigger toasts from any component within the ToastProvider.
// 3. Trigger toasts with an onClick handler on a button, specifying the message and position
// Example: <button onClick={() => showToast("Simple message", "top-right")}>Show Toast</button>

"use client";
import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";


type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";


interface Toast {
  id: number;
  message: string;
}


interface ToastContextType {
  showToast: (message: string, position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);


export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};


interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<{ toast: Toast; position: ToastPosition }[]>([]);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);


  const showToast = useCallback(
    (message: string, position: ToastPosition = "bottom-right") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { toast: { id, message }, position }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter(({ toast }) => toast.id !== id));
      }, 5000); // 5 seconds timer
    },
    []
  );

  if (!isMounted) {
    return null;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {["top-left", "top-right", "bottom-left", "bottom-right", "center"].map((position) => (
        <ToastContainer
          key={position}
          toasts={toasts.filter((t) => t.position === position)}
          position={position as ToastPosition}
        />
      ))}
    </ToastContext.Provider>
  );
};


interface ToastContainerProps {
  toasts: { toast: Toast; position: ToastPosition }[];
  position: ToastPosition;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, position }) => {

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
  const adjustedPosition = isMobile
    ? position.startsWith("top")
      ? "top"
      : "bottom"
    : position;

  
  const getPositionClasses = () => {
    switch (adjustedPosition) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "top":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      default:
        return "";
    }
  };


  const getInitialY = () => {
    if (adjustedPosition.startsWith("top")) {
      return -50;
    } else if (adjustedPosition === "center") {
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ToastComponent {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


const ToastComponent: React.FC<Toast> = ({ message }) => {
  return (
    <div className="bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-lg shadow-lg p-4 max-w-full">
      <p className="font-medium">{message}</p>
    </div>
  );
};

// Example usage in a component
export const ToastDemo: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <button
        onClick={() => showToast("Notification triggered!", "top-right")}
        className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-4 rounded-full"
      >
        Show Toast
      </button>
    </div>
  );
};

// To use in your app:
// 1. Import ToastProvider and wrap your app or component tree
// Example:
// import { ToastProvider } from './path-to-toast-component';
//
// function App() {
//   return (
//     <ToastProvider>
//       <YourAppComponents />
//     </ToastProvider>
//   );
// }
//
// 2. Use the useToast hook in any component to trigger toasts
// Example:
// import { useToast } from './path-to-toast-component';
//
// function MyComponent() {
//   const { showToast } = useToast();
//   return (
//     <button onClick={() => showToast("Hello, World!", "top-right")}>
//       Show Toast
//     </button>
//   );
// }

export { ToastProvider };
`;

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
  const { showToast } = useToast(); // Use the useToast hook

  const copyCLI = () => {
    navigator.clipboard.writeText(
      "npx @ayushmxxn/serenity-ui@latest add toast"
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

  // Handler for the "Click me" button to trigger a toast
  const handleClickMe = () => {
    showToast("Button clicked!", "top-right");
  };

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

      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-8 lg:px-12">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white mb-2">Toast</h1>
          <p className="text-neutral-400 text-base max-w-2xl">
            Custom toast notification for quick alerts. Use the useToast hook to
            show messages anywhere.
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
            <button
              onClick={() => showToast("Button Clicked")}
              className="bg-neutral-100 hover:bg-opacity-90 text-black font-medium py-2 px-6 rounded-full mt-10"
            >
              Click me
            </button>
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
