'use client'
import React from 'react';
import FadeBlurInput from './components/FadeBlurInput';
import RippleInput from './components/RippleInput';
import SmokeInput from './components/SmokeInput';
import PlaceHolderInput from './components/PlaceHolderInput';

function Page() {

  return (
    <div className={`bg-black w-full min-h-screen flex flex-col items-start p-6 pt-24`}>
      <div className='max-w-screen-lg'>
        <h1 className={`text-4xl font-semibold `}>Inputs</h1>
        <p className={`text-base text-gray-400 mt-4`}>
          Copy-Paste these inputs into your projects and make them <br /> look cool.
        </p>
      </div>
      <div className='w-full max-w-screen-lg mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2  gap-6  w-full'>
          <FadeBlurInput/>
          <RippleInput/>
          <SmokeInput/>
          <PlaceHolderInput/>
        </div>
      </div>
    </div>
  );
}

export default Page;
