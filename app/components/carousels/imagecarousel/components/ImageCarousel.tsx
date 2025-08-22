"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

const imgs = [
  "https://images.unsplash.com/photo-1719977325297-e3f142f2f171?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1692177367567-e8fcff0a82ba?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1586122891856-5f90886b0cee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718966148389-a0fcf76af078?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719176372917-6c96c3608161?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719965249785-bc1bd672b07d?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1718406922369-50ac826bab33?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 5;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const ImageCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((prevIndex) =>
          prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className=" flex items-center justify-center overflow-hidden">
      <div className="relative overflow-hidden w-[384px] py-8 ">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${imgIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="flex cursor-grab active:cursor-grabbing"
        >
          <Images imgIndex={imgIndex} />
        </motion.div>

        <ThumbnailIndicators imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </div>
    </div>
  );
};

interface ImagesProps {
  imgIndex: number;
}

const Images: React.FC<ImagesProps> = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <ImageItem key={idx} imgSrc={imgSrc} imgIndex={imgIndex} idx={idx} />
      ))}
    </>
  );
};

interface ImageProps {
  imgSrc: string;
  imgIndex: number;
  idx: number;
}

const ImageItem: React.FC<ImageProps> = ({ imgSrc, imgIndex, idx }) => {
  return (
    <motion.div
      animate={{
        scale: imgIndex === idx ? 0.95 : 0.85,
      }}
      transition={SPRING_OPTIONS}
      className="w-[384px] h-[384px] shrink-0 rounded-xl overflow-hidden"
    >
      <Image
        src={imgSrc}
        alt={`Image ${idx}`}
        fill
        style={{ objectFit: "cover" }}
      />
    </motion.div>
  );
};

interface ThumbnailIndicatorsProps {
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbnailIndicators: React.FC<ThumbnailIndicatorsProps> = ({
  imgIndex,
  setImgIndex,
}) => {
  return (
    <div className="mt-4 flex gap-2 justify-center">
      {imgs.map((imgSrc, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`relative h-16 w-16 rounded-lg overflow-hidden transition-all duration-300 ${
            idx === imgIndex
              ? "scale-110 border-2 border-white shadow-lg opacity-100"
              : "opacity-70 hover:opacity-90"
          }`}
        >
          <Image
            src={imgSrc}
            alt={`Thumbnail ${idx}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </button>
      ))}
    </div>
  );
};

export default ImageCarousel;
