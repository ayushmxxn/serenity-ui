"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Search, Filter } from "lucide-react";
import Image from "next/image";

const ShowcaseCardContent = [
  {
    title: "TubeLight Navbar",
    description:
      "Trendy and Responsive navigation bar with tabbed links and a dynamic tubelight effect.",
    imageUrl:
      "https://i.postimg.cc/HnzGNKP0/Tube-Light-Navbar-Thumbnailtest.png",
    projectUrl: "/components/tubelightnavbar",
    category: "Navigation",
  },
  {
    title: "Voice Testimonial",
    description:
      "This VoiceTestimonial component displays user testimonials with audio playback and animated visual effects.",
    imageUrl:
      "https://i.postimg.cc/QChG0sSx/Voice-Testimonial-Card-Thumbnail.png",
    projectUrl: "/components/testimonials/voicetestimonial",
    category: "Testimonials",
  },

  {
    title: "Typewriter Testimonial",
    description:
      "This Typewriter Testimonial displays your testimonials in an interactive way. Combining audio and a typewriter effect.",
    imageUrl: "https://i.postimg.cc/tTBW1vLk/Screenshot-2025-08-21-103749.png",
    projectUrl: "/components/testimonials/typewritertestimonial",
    category: "Testimonials",
  },
  {
    title: "3D Book Testimonial",
    description:
      "This Book Testimonial is a unique way to showcase testimonials. Allowing Users to flip through pages of a book.",
    imageUrl: "https://i.postimg.cc/NFYGcQNP/Screenshot-2025-08-21-104308.png",
    projectUrl: "/components/testimonials/booktestimonial",
    category: "Testimonials",
  },
  {
    title: "Carousel 360",
    description:
      "Stunning 3D rotating image carousel with navigation controls.",
    imageUrl: "https://i.postimg.cc/Lsz2Qsf7/Screenshot-2025-08-21-114240.png",
    projectUrl: "/components/carousels/carousel360",
    category: "Gallery",
  },
  {
    title: "Dock",
    description:
      "Animated Dock component with pre-built positioning setup for all 4 positions of the screen.",
    imageUrl: "https://i.postimg.cc/pL2HX0Jy/Screenshot-2025-08-21-105508.png",
    projectUrl: "/components/dock",
    category: "Navigation",
  },
  {
    title: "Video Carousel",
    description:
      "Video Carousel with automatic playback and manual navigation controls, providing an engaging way to present video content.",
    imageUrl: "https://i.postimg.cc/WpQvkG06/Screenshot-2025-08-21-112231.png",
    projectUrl: "/components/carousels/videocarousel",
    category: "Carousels",
  },
  {
    title: "Image Carousel",
    description:
      "Image carousel with smooth transitions and previews of adjacent images.",
    imageUrl: "https://i.postimg.cc/cJ4RB8fX/Screenshot-2025-08-21-113033.png",
    projectUrl: "/components/carousels/imagecarousel",
    category: "Carousels",
  },
  {
    title: "Inputs",
    description:
      "Copy-Paste these inputs into your projects and make them look cool.",
    imageUrl: "https://i.postimg.cc/VkDF0F2K/Screenshot-2025-08-21-110709.png",
    projectUrl: "/components/inputs",
    category: "Forms",
  },
  {
    title: "Swipe Cards",
    description: "Swipe Card to add some fun to your website.",
    imageUrl: "https://i.postimg.cc/fR3V5T1x/Screenshot-2025-08-21-104841.png",
    projectUrl: "/components/cards/swipecard",
    category: "Cards",
  },
  {
    title: "Glow Cards",
    description: "Cards that glow when you hover over them.",
    imageUrl: "https://i.postimg.cc/rpMLsfGK/Screenshot-2025-08-21-105114.png",
    projectUrl: "/components/cards/glowcard",
    category: "Cards",
  },
  {
    title: "3D Flip Card",
    description:
      "A 3D card stack with cool 3D hover effects. Make your stuff look cool.",
    imageUrl: "https://i.postimg.cc/kgpC90Mf/Flip-Card3-DThumbnail.png",
    projectUrl: "/components/cards/3dflipcard",
    category: "Cards",
  },
  {
    title: "Spotlight Card",
    description:
      "Use this card for highlighting product features or services with a dynamic and interactive spotlight effect.",
    imageUrl: "https://i.postimg.cc/FzqPSH2T/Screenshot-2025-08-21-104550.png",
    projectUrl: "/components/cards/spotlightcard",
    category: "Cards",
  },

  {
    title: "Shortcut Modal",
    description:
      "Use the ShortcutModal component to display and manage keyboard shortcuts, with support for light and dark themes.",
    imageUrl: "https://i.postimg.cc/ydCnsG0b/Screenshot-2025-08-21-105832.png",
    projectUrl: "/components/shortcutmodal",
    category: "Modals",
  },

  {
    title: "Image Gallery",
    description:
      "Interactive image gallery that displays images in a grid, click on an image to view it in a modal with a smooth transition.",
    imageUrl: "https://i.postimg.cc/cLNyCdfs/Screenshot-2025-08-21-113358.png",
    projectUrl: "/components/imagegallery",
    category: "Gallery",
  },
];

interface Project {
  imageUrl: any;
  projectUrl: string;
  title: string;
  description: string;
  category: string;
}

const IndividualShowcaseCard: React.FC<{ project: Project }> = ({
  project,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
    <motion.div
      className="relative bg-neutral-950 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-neutral-800/30 transition-all duration-300 group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
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

      <div className="relative z-20 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={project.imageUrl.src || project.imageUrl}
            alt={`${project.title} Thumbnail`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-neutral-800/80 border border-neutral-700/50 rounded-lg text-xs font-mono text-neutral-300">
            {project.category}
          </div>

          {/* Redirect Button */}
          <a
            href={project.projectUrl}
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/80 border border-neutral-700/50 hover:bg neutral-700/50 transition-all duration-200 flex-shrink-0 z-20"
            aria-label={`View ${project.title} component`}
          >
            <ExternalLink className="w-4 h-4 text-neutral-300 hover:text-neutral-100 transition-colors duration-200" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ShowcaseCard: React.FC<{
  showcaseCardContent: Project[];
  searchTerm: string;
  selectedCategory: string;
}> = ({ showcaseCardContent, searchTerm, selectedCategory }) => {
  const filteredContent = showcaseCardContent.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {filteredContent.map((project, index) => (
        <IndividualShowcaseCard key={index} project={project} />
      ))}
    </div>
  );
};

export default function ComponentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(ShowcaseCardContent.map((item) => item.category))),
  ];

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

      <div className=" mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-white mb-2">
              Components
            </h1>
            <p className="text-neutral-400 text-base">
              Collection of modern, customizable components built with React and
              Tailwind CSS.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800/20 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-400 focus:outline-none transition-colors duration-200 text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-neutral-800/20 border border-neutral-700/50 rounded-lg text-white focus:outline-none transition-colors duration-200 text-sm appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-neutral-900 text-white "
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-neutral-400">
            Showing{" "}
            {
              ShowcaseCardContent.filter((project) => {
                const matchesSearch =
                  project.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  project.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                const matchesCategory =
                  selectedCategory === "All" ||
                  project.category === selectedCategory;
                return matchesSearch && matchesCategory;
              }).length
            }{" "}
            components
          </div>
        </div>

        {/* Components Grid */}
        <ShowcaseCard
          showcaseCardContent={ShowcaseCardContent}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
