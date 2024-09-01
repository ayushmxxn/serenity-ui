'use client'

import Toggle1 from "./components/Toggle1";
import Toggle2 from "./components/Toggle2";


function TogglePage() {
  
  return (
    <div className={`bg-black w-full min-h-screen flex flex-col items-start p-6 pt-24`}>
      <div className='max-w-screen-lg'>
        <h1 className={`text-4xl font-semibold `}>Toggle</h1>
        <p className={`text-base text-gray-400 mt-4`}>
          Cool Toggles with framer motion animations that you can <br /> copy-paste into your apps.
        </p>
      </div>
      <div className='w-full max-w-screen-lg'>
        <div className='flex justify-end items-center gap-2 mb-4'>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full'>
          <Toggle1/>
          <Toggle2/>
        </div>
      </div>
    </div>
  );
}

export default TogglePage;
