'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
  theme?: 'light' | 'dark';
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className = '',
  theme = 'dark',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = useCallback(() => {
    timerRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideTooltip]);

  const classes = {
    position: {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    },
    theme: {
      light: 'bg-white text-gray-800 shadow-lg border-b-2 border-gray-200',
      dark: 'bg-gray-900 text-white',
    },
    animation: {
      enter: 'transition-all duration-350 ease-cubic-bezier(0.4, 0, 0.2, 1)',
      enterFrom: 'opacity-0 scale-90',
      enterTo: 'opacity-100 scale-100',
      leave: 'transition-all duration-300 ease-cubic-bezier(0.4, 0, 0.2, 1)',
      leaveFrom: 'opacity-100 scale-100',
      leaveTo: 'opacity-0 scale-90',
    },
  };

  const translate = {
    top: 'translate-y-4',
    right: '-translate-x-4',
    bottom: '-translate-y-4',
    left: 'translate-x-4',
  };

  const tooltipClasses = `${classes.position[position]} ${classes.theme[theme]} ${className} 
    ${isVisible ? 'visible' : 'invisible'} 
    ${classes.animation.enter} ${isVisible ? classes.animation.enterTo : `${classes.animation.enterFrom} ${translate[position]}`}`;

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      <div
        ref={tooltipRef}
        className={`absolute z-10 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap max-w-none ${tooltipClasses}`}
      >
        {content}
        <div
          className={`absolute w-3 h-3 transform rotate-45 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          } ${position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2' :
            position === 'right' ? 'left-[-6px] top-1/2 -translate-y-1/2' :
            position === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2' :
            'right-[-6px] top-1/2 -translate-y-1/2'}`}
        />
      </div>
    </div>
  );
};

export default Tooltip;
