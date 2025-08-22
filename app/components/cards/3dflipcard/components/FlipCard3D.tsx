"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  {
    src: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Sunset landscape",
  },
  {
    src: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Desert scene",
  },
  {
    src: "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Red building",
  },
  {
    src: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=600",
    alt: "Cactus close-up",
  },
  {
    src: "https://images.pexels.com/photos/70568/spotted-baumwaran-monitor-tree-monitor-lizard-70568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Ocean view",
  },
];

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

// Card Component
const Card: React.FC<ImageCardProps> = ({
  src,
  alt,
  index,
  isHovered,
  isFirstCard,
  isMobile,
  isFront,
  frontCardIndex,
  onClick,
}) => {
  return (
    <motion.div
      className={`absolute w-80 h-48 rounded-xl overflow-hidden shadow-lg ${
        isFront ? "z-20" : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: isMobile ? "top center" : "left center",
        zIndex: isFront ? 20 : 5 - index,
        filter: isFront || frontCardIndex === null ? "none" : "blur(5px)",
      }}
      initial={{
        rotateY: 0,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      }}
      animate={
        isFront
          ? {
              scale: 1.2,
              rotateY: 0,
              x: isMobile ? 0 : 0,
              y: isMobile ? 0 : -50,
              z: 50,
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.5)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : isHovered
          ? {
              rotateY: isMobile ? 0 : -45,
              x: isMobile ? 0 : index * 50,
              y: isMobile ? index * 50 : index * -5,
              z: index * 15,
              scale: 1.05,
              boxShadow: `10px 20px 30px rgba(0, 0, 0, ${0.2 + index * 0.05})`,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 50,
                delay: index * 0.1,
              },
            }
          : {
              rotateY: 0,
              x: 0,
              y: 0,
              z: 0,
              scale: 1,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: (4 - index) * 0.1,
              },
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
        style={{ objectFit: "cover" }}
        className="rounded-xl"
      />
    </motion.div>
  );
};

// Main Component
const FlipCard3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setFrontCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={`flex justify-center  items-center py-32`}>
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
