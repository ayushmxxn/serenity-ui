import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '500' });

type DrawerPosition = 'top' | 'bottom' | 'left' | 'right';

interface DrawerProps {
  isOpen: boolean; 
  onOpenChange: (isOpen: boolean) => void;
  position: DrawerPosition; 
  children: React.ReactNode; 
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onOpenChange, position, children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    controls.start(isOpen ? 'open' : 'closed');
  }, [isOpen, controls]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen, onOpenChange]);

  const drawerVariants: Variants = {
    open: { [position === 'left' || position === 'right' ? 'x' : 'y']: '0%' },
    closed: { 
      [position === 'left' || position === 'right' ? 'x' : 'y']: 
      position === 'left' || position === 'top' ? '-100%' : '100%' 
    },
  };

  const drawerSizes: Record<DrawerPosition, string> = {
    top: isMobile ? 'h-[70%]' : 'h-2/3',
    bottom: isMobile ? 'h-[70%]' : 'h-2/3',
    left: isMobile ? 'w-[70%]' : 'w-1/3',
    right: isMobile ? 'w-[70%]' : 'w-1/3',
  };

  return (
    <>
      {/* Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>
      {/* Drawer */}
      <motion.div
        className={`${inter.className} absolute bg-white text-black shadow-lg overflow-hidden z-50 ${drawerSizes[position]}`}
        style={{
          [position]: 0,
          ...(position === 'top' || position === 'bottom' ? { left: 0, right: 0 } : { top: 0, bottom: 0 }),
        }}
        variants={drawerVariants}
        initial="closed"
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-6 h-full overflow-auto">
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Drawer;
