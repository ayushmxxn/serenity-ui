'use client'
import React from 'react';
import CodeStepper from '@/components/serenity/CodeStepper';


function Installation() {

  return (
    <div className={`text-white backdrop-blur-md w-full h-full pt-28 p-5 relative`}>
      <span className={`text-4xl font-extrabold pl-4`}>Installation</span>
      <div>
        <p className={`sm:text-base max-w-md mt-5 pl-4 text-zinc-400 `}>
          Follow these simple steps to integrate Serenity UI into your project.
        </p>
      </div>
      <div className={`mt-10 relative`}>
        <CodeStepper/>
      </div>
    </div>
  );
}

export default Installation;
