"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TemplatesPage() {
  const variants = {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    },
    text: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    },
    button: {
      hidden: { opacity: 0, scale: 0.98 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
      },
      hover: { scale: 1.02, transition: { duration: 0.2 } },
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-8">
      <motion.div
        className="text-center max-w-2xl"
        variants={variants.container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl sm:text-4xl font-semibold text-white mb-4"
          variants={variants.text}
        >
          Templates Coming Soon
        </motion.h1>
        <motion.p className="text-neutral-400 mb-6" variants={variants.text}>
          I&apos;m working on templates. Follow me on{" "}
          <a
            href="https://x.com/ayushmxxn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-neutral-300 hover:text-neutral-100"
          >
            Twitter
          </a>{" "}
          for updates!
        </motion.p>
        <motion.a
          href="/components"
          className="inline-flex px-6 py-3 bg-neutral-800/20 border border-neutral-700/50 rounded-lg text-white hover:bg-neutral-700/50 text-sm font-medium"
          variants={variants.button}
        >
          Explore Components
        </motion.a>
      </motion.div>
    </div>
  );
}
