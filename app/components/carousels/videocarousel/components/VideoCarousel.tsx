'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Video {
  id: number;
  title: string;
  src: string;
  srcLow: string; // Low quality video source
  description: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative w-full h-screen rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/path/to/noise-texture.png')] opacity-5 mix-blend-overlay"></div>
      <AnimatePresence initial={false}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className={`absolute w-[80%] h-[70%] bg-black bg-opacity-60 rounded-2xl shadow-2xl shadow-black flex items-center justify-center overflow-hidden
                        ${index === currentIndex ? 'z-20' : 'z-10'} 
                        ${index === (currentIndex + 1) % videos.length ? 'z-0' : ''} 
                        ${index === (currentIndex - 1 + videos.length) % videos.length ? 'z-0' : ''}`}
            initial={{ scale: 0.8, x: index > currentIndex ? '100%' : '-100%', opacity: 0, rotateY: index > currentIndex ? 45 : -45 }}
            animate={{ 
              scale: index === currentIndex ? 1 : 0.8, 
              x: index === currentIndex ? 0 : index > currentIndex ? '100%' : '-100%', 
              opacity: index === currentIndex ? 1 : 0.3,
              rotateY: index === currentIndex ? 0 : index > currentIndex ? 45 : -45
            }}
            exit={{ scale: 0.8, x: index < currentIndex ? '-100%' : '100%', opacity: 0, rotateY: index < currentIndex ? -45 : 45 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full group">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el!;
                }}
                src={isMobile ? video.srcLow : video.src} // Use low quality source on mobile
                className="w-full h-full object-cover"
                autoPlay={false}
                loop
                muted
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className={`absolute max-w-96 bg-black/10 sm:bg-transparent backdrop-blur sm:backdrop-blur-none bottom-0 left-0 right-0 p-6 text-white transform ${
                isMobile ? '' : 'translate-y-full group-hover:translate-y-0'
              } transition-transform duration-300 ease-in-out`}>
                <span className="text-3xl font-bold">{video.title}</span>
                <p className="text-sm opacity-80 mt-1">{video.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button 
        onClick={prevVideo} 
        aria-label="Previous video"
        className="absolute left-3 sm:left-8 z-30 text-white text-6xl opacity-50 hover:opacity-100 transition-opacity duration-300"
      >
        &#8249;
      </button>
      <button 
        onClick={nextVideo} 
        aria-label="Next video"
        className="absolute right-3 sm:right-8 z-30 text-white text-6xl opacity-50 hover:opacity-100 transition-opacity duration-300"
      >
        &#8250;
      </button>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'} transition-colors duration-300`}
            aria-label={`Go to video ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
