"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1725017710297-d923d3102984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1725449670931-b53a7cb689b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1724182558400-5bc438d5db52?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1724849306184-cba5daac68a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1613169620329-6785c004d900?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Carousel360: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [centerImage, setCenterImage] = useState(images[0]);
  const numimages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 360 / numimages);
    }, 2000);
    return () => clearInterval(interval);
  }, [numimages]);

  useEffect(() => {
    const index = Math.round((rotation % 360) / (360 / numimages)) % numimages;
    setCenterImage(images[index < 0 ? numimages + index : index]);
  }, [rotation, numimages]);

  const rotateCarousel = (direction: "left" | "right") => {
    const newRotation =
      rotation + (direction === "left" ? -360 / numimages : 360 / numimages);
    setRotation(newRotation);
  };

  return (
    <div className="relative h-screen w-full bg-neutral-950 text-white overflow-hidden">
      {/* Carousel Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-[90vw] max-w-[600px] h-[60vw] max-h-[400px]"
          style={{ perspective: 500 }}
        >
          {images.map((item, index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{
                rotateY: `${rotation + (360 / numimages) * index}deg`,
                rotateX: `${-40}deg`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              animate={{
                rotateY: `${rotation + (360 / numimages) * index}deg`,
              }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
            >
              <div
                className="rounded-xl overflow-hidden shadow-lg transform-gpu"
                style={{
                  transform: `translateZ(350px) rotateY(${
                    -rotation - (360 / numimages) * index
                  }deg)`,
                  boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Image
                  src={item}
                  alt={`Carousel Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </motion.div>
          ))}
          {/* Central Image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 px-5 sm:px-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="rounded-xl overflow-hidden shadow-lg"
              style={{
                transform: `translateZ(0px) rotateX(20deg)`,
                boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Image
                src={centerImage}
                alt="Central Large Image"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Buttons */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="bg-white/20 text-white px-8 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/30 hover:bg-white/30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={() => rotateCarousel("left")}
        >
          <FaArrowLeft className="text-white" />
        </button>
        <button
          className="bg-white/20 text-white px-8 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/30 hover:bg-white/30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={() => rotateCarousel("right")}
        >
          <FaArrowRight className="text-white " />
        </button>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />
    </div>
  );
};

export default Carousel360;
