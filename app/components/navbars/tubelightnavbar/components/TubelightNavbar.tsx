import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUser, FaFileAlt } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import Link from 'next/link';


function TubeLightNavbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);
  const tabs = [
    { name: 'Home', url: '#', icon: <GoHomeFill /> },
    { name: 'About', url: '#', icon: <FaUser /> },
    { name: 'Projects', url: '#', icon: <FaBriefcase /> },
    { name: 'Resume', url: '#', icon: <FaFileAlt /> }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const getLeftPosition = (tabName:string) => {
    // Adjust the positioning of the lamp according to your content
    if (isMobile) {
      // Mobile view
      switch (tabName) {
        case 'Home':
          return 'calc(0% + 16px)';
        case 'About':
          return 'calc(23% + 2px)';
        case 'Projects':
          return 'calc(22% + 2px)';
        case 'Resume':
          return 'calc(22% + 2px)';
      }
    } else {
      // Desktop view
      switch (tabName) {
        case 'Home':
          return 'calc(0% + 44px)';
        case 'About':
          return 'calc(30% + 2px)';
        case 'Projects':
          return 'calc(32% + 2px)';
        case 'Resume':
          return 'calc(32% + 2px)';
      }
    }
  };

  return (
    <div className="z-50 py-20 flex justify-center">
      <div className="flex items-center gap-3 bg-white/5 border border-gray-500/20 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg shadow-black">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.url}
            onClick={() => setActiveTab(tab.name)}
            className={`relative cursor-pointer text-sm text-white px-6 py-2 rounded-full ${
              activeTab === tab.name ? 'bg-zinc-500' : ''
            }`}
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor:
                activeTab === tab.name ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
            }}
          >
            <span className="hidden md:inline">{tab.name}</span>
            <span className="md:hidden">{tab.icon}</span>
            {activeTab === tab.name && (
              <motion.div
                layoutId="lamp"
                className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-8 h-1 bg-white rounded-t-md"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                style={{ left: getLeftPosition(tab.name) }}
              >
                {/* Lamp elements */}
                <motion.div className="absolute w-10 h-12 bg-white rounded-full blur shadow-lg opacity-10 -top-3" />
                <motion.div className="absolute w-12 h-12 bg-white rounded-full blur shadow-lg opacity-20 -top-3 -left-1" />
                <motion.div className="absolute w-8 h-8 bg-white rounded-full blur shadow-lg opacity-10 -top-2" />
                <motion.div className="absolute w-6 h-6 bg-white rounded-full blur shadow-lg opacity-10 -top-1" />
              </motion.div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TubeLightNavbar;
