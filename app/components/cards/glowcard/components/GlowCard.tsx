'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type CardProps = {
  title: string;
  date: string;
  imageSrc: string;
  isHovered: boolean;
};

const Card: React.FC<CardProps> = ({ title, date, imageSrc, isHovered }) => (
  <motion.div
    className={`p-4 rounded-3xl flex flex-col items-start justify-between w-64 h-64 
      ${isHovered ? 'shadow-xl border-blue-200' : 'shadow-md border-gray-600'}
      ${isHovered ? 'border-2' : 'border-2'}
      bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800`}
    animate={{
      scale: isHovered ? 1.1 : 1,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
  >
    <Image
      src={imageSrc}
      alt={title}
      width={256}
      height={256}
      className="mb-4 object-cover rounded-3xl"
    />
    <h2 className="text-lg font-bold text-gray-200">{title}</h2>
    <p className="text-sm text-gray-400">{date}</p>
  </motion.div>
);

type CardStackProps = {
  cards: Array<{
    title: string;
    date: string;
    imageSrc: string;
  }>;
  offset?: number;
};

const GlowCard: React.FC<CardStackProps> = ({ cards, offset = 40 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`${inter.className} flex items-center justify-center h-[600px] sm:h-[300px] bg-black overflow-hidden`}>
      <div className="relative flex flex-col md:flex-row justify-center items-center mb-40 sm:m-0 md:m-0 lg:m-0">
        {cards.map((card, index) => {
          const yOffset = index * offset;
          const xOffset = index * offset;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                scale: 0.85,
                opacity: 0.8,
                filter: "blur(3px)",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: yOffset,
                x: 0,
                filter: isHovered ? "blur(0px)" : "blur(2px)",
                ...(isClient && window.innerWidth >= 768 ? { x: xOffset, y: 0 } : {}),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                zIndex: isHovered ? 100 : cards.length - index,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                title={card.title}
                date={card.date}
                imageSrc={card.imageSrc}
                isHovered={isHovered}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GlowCard;
