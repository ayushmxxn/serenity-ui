import React from 'react';
import ShimmerButton from './components/ShimmerButton';
import BubbleEffectButton from './components/BubbleEffectButton';
import ShineButton from './components/ShineButton';

function Page() {
  return (
    <div className='bg-black w-full min-h-screen flex flex-col items-start p-6 pt-24'>
      <div className='max-w-screen-lg'>
        <h1 className='text-4xl font-semibold'>Buttons</h1>
        <p className='text-base text-gray-400 mt-4'>
          Modern Buttons with stunning effects that <br /> you can copy-paste into your apps.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-screen-lg'>
        <ShimmerButton />
        <BubbleEffectButton />
        <ShineButton/>
      </div>
    </div>
  );
}

export default Page;
