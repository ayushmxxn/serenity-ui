'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '500' });

export interface Image {
  id: number;
  src: string;
  alt: string;
  description: string;
}

const Modal: React.FC<{ image: Image; originRect: DOMRect | null; onClose: () => void }> = ({ image, originRect, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const initial = {
    x: originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
    y: originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 0,
    scale: originRect ? originRect.width / window.innerWidth : 0.8,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 backdrop-blur bg-black bg-opacity-50 flex justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        onTouchEnd={handleBackdropClick}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative max-w-3xl max-h-[40%] w-full h-full overflow-hidden"
          initial={initial}
          animate={{ scale: 1, x: 0, y: 0 }}
          exit={{ scale: initial.scale, x: initial.x, y: initial.y }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.5,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="contain"
              quality={100}
              className="rounded-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ImageGallery: React.FC<{ images: Image[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = React.useState<Image | null>(null);
  const [originRect, setOriginRect] = React.useState<DOMRect | null>(null);
  const imageRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleImageClick = (image: Image, ref: HTMLDivElement | null) => {
    if (isMobile) {
      return; // Do nothing on mobile
    }

    if (ref) {
      setOriginRect(ref.getBoundingClientRect());
    }
    setSelectedImage(image);
  };

  return (
    <div className={`relative w-full bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 flex flex-col items-center ${inter.className}`}>
      <div className="absolute inset-0 bg-[url('/path/to/noise-texture.png')] opacity-5 mix-blend-overlay"></div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full">
        {images.map((image) => (
          <motion.div
            key={image.id}
            ref={(el) => {
              if (el) {
                imageRefs.current.set(image.id, el);
              } else {
                imageRefs.current.delete(image.id);
              }
            }}
            className={`relative w-full h-64 group cursor-pointer overflow-hidden rounded-lg shadow-lg ${
              selectedImage?.id === image.id ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}
            onClick={() => handleImageClick(image, imageRefs.current.get(image.id) || null)}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              quality={75}
              className="transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 bg text-white text-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              <p className='font-semibold'>{image.alt}</p>
              <p className=" text-sm font-normal">{image.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedImage && originRect && !isMobile && (
        <Modal image={selectedImage} originRect={originRect} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default ImageGallery;
