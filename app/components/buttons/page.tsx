"use client";
import React from "react";
import Image from "next/image";
import ShimmerButton from "./components/ShimmerButton";
import BubbleEffectButton from "./components/BubbleEffectButton";
import FlameButton from "./components/FlameButton";

// Static array of button components
const ButtonComponentsContent = [
  {
    component: <ShimmerButton />,
  },
  {
    component: <BubbleEffectButton />,
  },
  {
    component: <FlameButton />,
  },
];

export default function ButtonsPage() {
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
            <h1 className="text-3xl font-semibold text-white mb-2">Buttons</h1>
            <p className="text-neutral-400 text-base">
              Animated buttons for you to drop into your projects, and give them
              a cool look.
            </p>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8">
          {ButtonComponentsContent.map((button, index) => (
            <div
              key={index}
              className="flex flex-col bg-neutral-950 border border-neutral-800 rounded-lg"
            >
              {button.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
