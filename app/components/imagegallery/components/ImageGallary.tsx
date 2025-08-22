"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface ImageType {
  id: number;
  src: string;
  alt: string;
  description: string;
}

const images: ImageType[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Mountains",
    description: "19 July 2024",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Bridge",
    description: "11 Nov 2022",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "River",
    description: "18 Oct 2023",
  },
];

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`relative w-full py-4 flex flex-col items-center `}>
      <div className="absolute inset-0 opacity-5 mix-blend-overlay"></div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full h-full">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="relative w-full h-64 group overflow-hidden rounded-lg shadow-lg transition-opacity duration-300 cursor-pointer"
            transition={{ duration: 0.3 }}
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              quality={75}
              className="transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white text-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              <p className="font-semibold">{image.alt}</p>
              <p className="text-sm font-normal">{image.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="relative max-w-3xl w-full h-auto max-h-[80vh]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              quality={85}
              className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageGallery;
