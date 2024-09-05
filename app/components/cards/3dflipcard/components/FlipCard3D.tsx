'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types 
interface ImageCardProps {
  src: string;
  alt: string;
  index: number;
  isHovered: boolean;
  isFirstCard?: boolean;
  isMobile: boolean;
  isFront?: boolean;
  frontCardIndex: number | null;
  onClick: (index: number) => void;
}

// Animations
const Card: React.FC<ImageCardProps> = ({
  src, alt, index, isHovered, isFirstCard, isMobile, isFront, frontCardIndex, onClick
}) => {
  return (
    <motion.div
      className={`absolute w-80 h-48 rounded-xl overflow-hidden shadow-lg ${isFront ? 'z-20' : ''}`}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: isMobile ? 'top center' : 'left center',
        zIndex: isFront ? 20 : 5 - index,
        filter: isFront || frontCardIndex === null ? 'none' : 'blur(5px)', 
      }}
      initial={{
        rotateY: 0,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      }}
      animate={isFront
        ? {
            scale: 1.2,
            rotateY: 0,
            x: isMobile ? 0 : 0,
            y: isMobile ? 0 : -50,
            z: 50,
            boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.5)',
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          }
        : isHovered
        ? {
            rotateY: isMobile ? 0 : -45,
            x: isMobile ? 0 : index * 50,
            y: isMobile ? index * 50 : index * -5,
            z: index * 15,
            scale: 1.05,
            boxShadow: `10px 20px 30px rgba(0, 0, 0, ${0.2 + index * 0.05})`,
            transition: { type: 'spring', stiffness: 300, damping: 50, delay: index * 0.1 }
          }
        : {
            rotateY: 0,
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            transition: { type: 'spring', stiffness: 300, damping: 20, delay: (4 - index) * 0.1 }
          }
      }
      whileHover={{
        y: isFirstCard ? 0 : -100,
      }}
      onClick={() => onClick(index)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-xl"
      />
    </motion.div>
  );
};

// Prop types 
interface CardStack3DProps {
  images: { src: string; alt: string }[];
}

const FlipCard3D: React.FC<CardStack3DProps> = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setFrontCardIndex((prevIndex) => (prevIndex === index ? null : index)); 
  };

  return (
    <div className={`flex justify-center h-screen bg-white items-center py-32`}>
      <div
        className="relative w-80 h-48 perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            {...image}
            index={index}
            isHovered={isHovered}
            isFirstCard={index === 0}
            isMobile={isMobile}
            isFront={frontCardIndex === index} 
            frontCardIndex={frontCardIndex} 
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FlipCard3D;
