import Image from 'next/image';
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Tech {
  name: string;
  url: string;
  color: string;
}

interface TechStackProps {
  techStack: Tech[];
}

const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightSize = 80; 

  const lightX = useTransform(x, (value) => value - lightSize / 2);
  const lightY = useTransform(y, (value) => value - lightSize / 2);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <div className='flex justify-center items-center py-20 '>
        <div
      className="relative bg-black/50 overflow-hidden w-96 h-60 pb-3 rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <Image
        src="https://images.unsplash.com/photo-1695883701435-7bd88f796e05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ4NHxDRHd1d1hKQWJFd3x8ZW58MHx8fHx8"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-3xl  "
        width={96}
        height={96}
      />

      
      <div className="absolute inset-0 bg-black/50 rounded-lg border border-zinc-600 backdrop-blur-xl "></div>

      
      {isHovered && (
        <motion.div
          className="absolute rounded-full pointer-events-none "
          style={{
            width: lightSize,
            height: lightSize,
            background: 'rgba(255, 255, 255, 0.2)',
            filter: 'blur(30px)',
            x: lightX,
            y: lightY,
          }}
        ></motion.div>
      )}

      
      <div className="relative z-10 flex flex-col justify-between p-6 ">
        <div className="flex justify-between ">
          <div className="flex items-center gap-2 mb-2 text-sm text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-code mb-4"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="m10 13-2 2 2 2"></path>
              <path d="m14 17 2-2-2-2"></path>
            </svg>
            <p className="font-medium mb-3 text-base">Techstack</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, index) => (
            <a key={index} target="_blank" rel="noopener noreferrer" href={tech.url}>
              <div className="inline-flex items-center rounded-full border border-zinc-800 px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white hover:bg-white/10">
                <div className="w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: tech.color }}></div>
                {tech.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TechStack;