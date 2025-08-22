"use client";
import React from "react";
import Image from "next/image";
import FadeBlurInput from "./components/FadeBlurInput";
import RippleInput from "./components/RippleInput";
import SmokeInput from "./components/SmokeInput";
import PlaceHolderInput from "./components/PlaceHolderInput";

// Static array of input components
const InputComponentsContent = [
  {
    component: <FadeBlurInput />,
  },
  {
    component: <RippleInput />,
  },
  {
    component: <SmokeInput />,
  },
  {
    component: <PlaceHolderInput />,
  },
];

export default function InputsPage() {
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
            <h1 className="text-3xl font-semibold text-white mb-2">Inputs</h1>
            <p className="text-neutral-400 text-base">
              Copy-Paste these inputs into your projects and make them look
              cool.
            </p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {InputComponentsContent.map((input, index) => (
            <div
              key={index}
              className="flex flex-col bg-neutral-950 border border-neutral-800 rounded-lg"
            >
              {input.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
