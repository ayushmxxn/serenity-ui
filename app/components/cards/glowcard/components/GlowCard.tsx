"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const cards = [
  {
    title: "Exploring Mountains",
    date: "Mar 06, 2024",
    imageSrc:
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Beautiful Beach View",
    date: "Jul 15, 2023",
    imageSrc:
      "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Mystical Forest",
    date: "Aug 22, 2024",
    imageSrc:
      "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "City at Night",
    date: "Sep 10, 2023",
    imageSrc:
      "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Serenity by the Sea",
    date: "Oct 15, 2023",
    imageSrc:
      "https://images.pexels.com/photos/3374347/pexels-photo-3374347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

type CardProps = {
  title: string;
  date: string;
  imageSrc: string;
  isHovered: boolean;
};

const Card: React.FC<CardProps> = ({ title, date, imageSrc, isHovered }) => (
  <motion.div
    className={`p-4 rounded-3xl flex flex-col items-start justify-between w-64 h-64 
      ${isHovered ? "shadow-xl border-blue-200" : "shadow-md border-gray-600"}
      border-2 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800`}
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
    <p className="text-sm text-neutral-400">{date}</p>
  </motion.div>
);

const GlowCard: React.FC<{ offset?: number }> = ({ offset = 40 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex items-center justify-center">
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const totalCards = cards.length;

          const centerIndex = (totalCards - 1) / 2;
          const relativeIndex = index - centerIndex;
          const xOffset =
            isClient && window.innerWidth >= 768 ? relativeIndex * offset : 0;
          const yOffset =
            isClient && window.innerWidth < 768 ? relativeIndex * offset : 0;

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
                x: xOffset,
                y: yOffset,
                filter: isHovered ? "blur(0px)" : "blur(2px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                zIndex: isHovered ? 100 : totalCards - index,
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
