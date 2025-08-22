"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

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
  const [toasts, setToasts] = useState<
    { toast: Toast; position: ToastPosition }[]
  >([]);
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
      }, 5000);
    },
    []
  );

  if (!isMounted) {
    return null;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {["top-left", "top-right", "bottom-left", "bottom-right", "center"].map(
        (position) => (
          <ToastContainer
            key={position}
            toasts={toasts.filter((t) => t.position === position)}
            position={position as ToastPosition}
          />
        )
      )}
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: { toast: Toast; position: ToastPosition }[];
  position: ToastPosition;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position,
}) => {
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
    <div
      className={`fixed ${getPositionClasses()} w-full max-w-full sm:max-w-xs px-4 sm:px-0 space-y-2`} // Reduced max-w-sm to max-w-xs
    >
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
    <div className="bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-lg shadow-lg p-3 max-w-full">
      {" "}
      {/* Reduced p-4 to p-3 */}
      <p className="font-medium text-sm">{message}</p> {/* Added text-sm */}
    </div>
  );
};

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

export { ToastProvider };
