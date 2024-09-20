'use client';
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ toast: Toast; position: ToastPosition }[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', position: ToastPosition = 'bottom-right') => {
    const id = Date.now();
    setToasts(prev => [...prev, { toast: { id, message, type }, position }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(({ toast }) => toast.id !== id));
    }, 5000);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'].map((position) => (
        <ToastContainer key={position} toasts={toasts.filter(t => t.position === position)} position={position as ToastPosition} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: { toast: Toast; position: ToastPosition }[];
  position: ToastPosition;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, position }) => {
  const isMobile = window.innerWidth <= 640; 
  const adjustedPosition = isMobile ? (position.startsWith('top') ? 'top' : 'bottom') : position;

  const getPositionClasses = () => {
    switch (adjustedPosition) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return '';
    }
  };

  const getInitialY = () => {
    if (adjustedPosition.startsWith('top')) {
      return -50; 
    } else if (adjustedPosition === 'center') {
      return 0; 
    } else {
      return 50; 
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} w-full max-w-full sm:max-w-sm px-4 sm:px-0 space-y-2`}>
      <AnimatePresence>
        {toasts.map(({ toast }) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: getInitialY() }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: getInitialY() }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <ToastComponent {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastComponent: React.FC<Toast> = ({ message, type }) => {
  const typeConfig = {
    success: { icon: CircleCheck, bgColor: 'bg-green-50', textColor: 'text-green-800', borderColor: 'border-green-200' },
    error: { icon: AlertCircle, bgColor: 'bg-red-50', textColor: 'text-red-800', borderColor: 'border-red-200' },
    warning: { icon: AlertTriangle, bgColor: 'bg-yellow-50', textColor: 'text-yellow-800', borderColor: 'border-yellow-200' },
    info: { icon: Info, bgColor: 'bg-blue-50', textColor: 'text-blue-800', borderColor: 'border-blue-200' }
  };

  const { icon: Icon, bgColor, textColor, borderColor } = typeConfig[type];

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg shadow-lg p-4 flex items-center justify-between max-w-full`}>
      <div className="flex items-center space-x-3">
        <Icon className={`${textColor} w-5 h-5`} />
        <p className={`${textColor} font-medium`}>{message}</p>
      </div>
    </div>
  );
};
