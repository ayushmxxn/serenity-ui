"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Eye, Search, Link2 } from "lucide-react";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";

// Boilerplate card content array with Unsplash image URLs and preview images
const BoilerplateCardContent = [
  {
    title: "Next.js + Clerk Auth",
    description:
      "Ready to go Next.js 15 starter with Clerk authentication and dark mode.",
    imageUrl: "https://i.ibb.co/1SsyMLx/next-clerk-boilerplate-thumbnail.png",
    repoUrl: "https://github.com/ayushmxxn/next.js-clerk-boilerplate",
    previewImages: [
      "https://i.postimg.cc/50SHy4Rw/Screenshot-2025-08-22-124030.png",
      "https://i.postimg.cc/bvQrVY8K/Screenshot-2025-08-22-124146.png",
      "https://i.postimg.cc/BQ0C6b7V/Screenshot-2025-08-22-131914.png",
    ],
  },
];

interface Boilerplate {
  imageUrl: string;
  repoUrl: string;
  title: string;
  description: string;
  previewImages: string[];
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}> = ({ isOpen, onClose, images }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Close modal on click outside
  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={handleClickOutside}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className={`${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] ring-4 ring-[#171717] rounded-xl w-full max-w-[90vw] h-auto max-h-[90vh] shadow-2xl flex flex-col z-50 mx-4 relative`}
      >
        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  width={1200}
                  height={1012.5}
                  className="w-full h-auto object-contain  transition-all duration-200"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4a4a4a;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #6b6b6b;
          }
        `}</style>
      </div>
    </div>
  );
};

const IndividualBoilerplateCard: React.FC<{ boilerplate: Boilerplate }> = ({
  boilerplate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightSize = 80;

  const lightX = useTransform(x, (value) => value - lightSize / 2);
  const lightY = useTransform(y, (value) => value - lightSize / 2);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <>
      <motion.div
        className="relative bg-neutral-950 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-neutral-900/50 transition-all duration-300 group h-80 flex flex-col border border-[#2D2D2D] ring-4 ring-[#171717] shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container (Top Section) */}
        <div className="relative h-1/2 overflow-hidden">
          {isHovered && (
            <motion.div
              className="absolute rounded-full pointer-events-none z-10"
              style={{
                width: lightSize,
                height: lightSize,
                background: "rgba(255, 255, 255, 0.1)",
                filter: "blur(30px)",
                x: lightX,
                y: lightY,
              }}
            />
          )}
          <Image
            width={1000}
            height={1000}
            src={boilerplate.imageUrl}
            alt={`${boilerplate.title} Thumbnail`}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent"></div>
        </div>

        {/* Content Container (Bottom Section) */}
        <div className="relative z-20 flex flex-col justify-between flex-1 p-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {boilerplate.title}
            </h3>
            <p className="text-sm text-neutral-300 mb-3 line-clamp-2">
              {boilerplate.description}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center font-medium justify-center px-3 py-1.5 bg-neutral-200 border border-neutral-200 hover:bg-neutral-100 rounded-lg text-sm text-neutral-900 hover:text-neutral-700 transition-all duration-200"
              aria-label={`View preview images of ${boilerplate.title}`}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
            <a
              href={boilerplate.repoUrl}
              className="flex items-center font-medium justify-center px-3 py-1.5 bg-neutral-800/80 border border-neutral-700/50 hover:bg-neutral-700/50 rounded-lg text-sm text-neutral-300 hover:text-neutral-100 transition-all duration-200"
              aria-label={`View repository for ${boilerplate.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link2 className="w-4 h-4 mr-1" />
              Repository
            </a>
          </div>
        </div>
      </motion.div>

      {/* Modal for Preview Images */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={boilerplate.previewImages}
      />
    </>
  );
};

const BoilerplateCard: React.FC<{
  boilerplateCardContent: Boilerplate[];
  searchTerm: string;
}> = ({ boilerplateCardContent, searchTerm }) => {
  const filteredContent = boilerplateCardContent.filter(
    (boilerplate) =>
      boilerplate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boilerplate.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mt-8">
      {filteredContent.map((boilerplate, index) => (
        <IndividualBoilerplateCard key={index} boilerplate={boilerplate} />
      ))}
    </div>
  );
};

export default function BoilerplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Profile Image */}
      <a
        href="https://ayushmxxn.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-50 hidden sm:flex"
      >
        <Image
          src="https://i.ibb.co/pBPsjfg2/myavatar.jpg"
          alt="Your Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </a>

      <div className="mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-white mb-2">
              Boilerplates
            </h1>
            <p className="text-neutral-400 text-base">
              Collection of boilerplate templates for your projects, no need to
              start from scratch again.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search boilerplates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800/20 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-400 focus:outline-none transition-colors duration-200 text-sm"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-neutral-400">
            Showing{" "}
            {
              BoilerplateCardContent.filter(
                (boilerplate) =>
                  boilerplate.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  boilerplate.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              ).length
            }{" "}
            boilerplates
          </div>
        </div>

        {/* Boilerplates Grid */}
        <BoilerplateCard
          boilerplateCardContent={BoilerplateCardContent}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
