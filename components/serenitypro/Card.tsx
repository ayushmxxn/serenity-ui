'use client';
import React from 'react';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react'; 
import { GeistSans } from 'geist/font/sans'; 

const geistClassName = GeistSans.className; 

type PortfolioTemplateProps = {
  title: string;
  description: string;
  price: number;
  features: string[];
  imageUrl: string;
  hoverImageUrl: string; 
  previewUrl: string;
  buyUrl: string; 
};

const PortfolioTemplateCard: React.FC<PortfolioTemplateProps> = ({
  title,
  description,
  price,
  features,
  imageUrl,
  hoverImageUrl,
  previewUrl,
  buyUrl, 
}) => {
  return (
    <div className={`relative w-full max-w-none mx-auto bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 backdrop-blur-md ${geistClassName}`}>
      <div className="flex flex-col md:flex-row md:gap-6 w-full">
        {/* Image Section */}
        <div className="relative w-full h-48 sm:h-56 md:h-auto md:w-1/2 overflow-hidden">
          {/* Default Image */}
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0"
            priority
          />
          {/* Hover Image */}
          <Image
            src={hoverImageUrl}
            alt={`Hover ${title}`}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 rounded-t-lg md:rounded-tr-none md:rounded-l-lg transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100"
          />
        </div>

        {/* Content Section */}
        <div className="relative p-5 md:w-1/2 flex flex-col justify-between space-y-4">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-100 mb-2">{title}</h3>

          {/* Description */}
          <p className="text-neutral-300 text-base mb-5 leading-relaxed">{description}</p>

          {/* Features List */}
          <ul className="space-y-2 mb-5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-neutral-400 text-sm">
                <CircleCheck className="h-5 w-5 text-green-400 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {/* Buy Now Button */}
            <a
              href={buyUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-100 text-neutral-900 font-semibold py-2 px-6 rounded-md shadow-md hover:bg-neutral-200 transition duration-300 flex-1 flex items-center justify-center"
            >
              <span className="mr-2">Buy Now</span>
              <span className="text-neutral-800">${price}</span>
            </a>

            {/* View Live Button */}
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-700 text-neutral-100 font-medium py-2 px-6 rounded-md shadow-md hover:bg-neutral-600 transition duration-300 flex-1 flex items-center justify-center"
            >
              <span className="mr-2">Preview</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplateCard;
