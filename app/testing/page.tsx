'use client'
import { useState } from 'react';
import Drawer from '../components/drawer/Drawer';


const YourComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='h-screen flex justify-center items-center bg-white'>
      <button className='bg-black font-medium text-sm text-white px-4 py-2 rounded-full' onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} position="right">
        <div className='flex justify-center items-center flex-col'>
            <h2 className="text-2xl font-bold mb-4">Drawer Content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </Drawer>
    </div>
  );
};

export default YourComponent;