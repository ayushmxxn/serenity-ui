"use client";
import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { SiNextdotjs, SiFramer } from "react-icons/si";
import { FaReact } from "react-icons/fa";

interface CardData {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SpotlightItem: React.FC<CardData> = ({ title, description, icon }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => controls.start({ opacity: 1 });
  const handleMouseLeave = () => controls.start({ opacity: 0 });

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 rounded-3xl border border-neutral-800 bg-neutral-950 p-6"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl"
        animate={controls}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.25), transparent 40%)`,
        }}
      />
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 font-medium text-neutral-100">{title}</h3>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  );
};

const SpotlightCard: React.FC = () => {
  const cardData: CardData[] = [
    {
      title: "Next.js",
      description:
        "A React framework for server-rendered or statically-exported React apps.",
      icon: <SiNextdotjs size={40} />,
    },
    {
      title: "React",
      description: "A JavaScript library for building user interfaces.",
      icon: <FaReact size={40} />,
    },
    {
      title: "Framer Motion",
      description: "A production-ready motion library for React.",
      icon: <SiFramer size={40} />,
    },
  ];

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 mt-10">
      {cardData.map((card, index) => (
        <SpotlightItem
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default SpotlightCard;
