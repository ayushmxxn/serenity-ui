'use client';
import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { MdKeyboard } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';

const inter = Inter({ subsets: ['latin'], weight: '500' });

interface Shortcut {
  key: string;
  description: string;
}

interface ShortcutModalProps {
  shortcuts: Shortcut[];
  mode?: 'light' | 'dark';
}

const ShortcutModal: React.FC<ShortcutModalProps> = ({ shortcuts, mode= 'dark'}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredShortcuts = shortcuts.filter(shortcut =>
    shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shortcut.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

  return (
    <div className=" z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div className=" bg-black/70 backdrop-blur-md"></div>

      {/* Modal */}
      <div className={`${inter.className} ${mode === 'dark' ? 'bg-black border-zinc-800' : 'bg-white border-zinc-300'} w-[550px] h-auto max-h-[500px] border rounded-lg shadow-lg flex flex-col z-50 mx-2`}>
        <div className={`${mode === 'dark' ? 'bg-black border-zinc-800' : 'bg-white border-zinc-300'} flex items-center justify-between px-6 border-b rounded-t-lg`}>
          <div className="flex items-center justify-center">
            <MdKeyboard size={20} className={mode === 'dark' ? 'text-white' : 'text-zinc-800'} />
            <h1 className={`${mode === 'dark' ? 'text-white' : 'text-zinc-800'} px-2 py-5 font-semibold`}>Keyboard Shortcuts</h1>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${mode === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-700'} w-5 h-5 transition-colors cursor-pointer`}
            
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {/* Searchbar */}
        <div className={`px-6 py-2 ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>
          <div className="relative py-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={mode === 'dark' ? '#A1A1AA' : '#71717A'} className="size-4 sm:size-5 absolute left-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search shortcuts..."
              className={`${mode === 'dark' ? 'bg-black text-white border-zinc-800 placeholder-zinc-400' : 'bg-white text-black border-zinc-300 placeholder-zinc-500'} w-full border-b  py-2 px-4 pl-10 focus:outline-none`}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto rounded-b-lg custom-scrollbar">
          <div>
            {filteredShortcuts.length > 0 ? (
              filteredShortcuts.map((shortcut, index) => (
                <motion.div
                  key={index}
                  className={`p-4 flex flex-col`}
                >
                  <div className="flex justify-between items-center">
                    <p className={`${mode === 'dark' ? 'text-white' : 'text-black'} text-sm flex-1 overflow-hidden text-ellipsis`}>
                      {shortcut.description}
                    </p>
                    <div className={`${mode === 'dark' ? 'text-white' : 'text-black'} font-medium ml-4 whitespace-nowrap`}>
                      <div className="flex space-x-2">
                        {shortcut.key.split('+').map((key, idx) => (
                          <span key={idx} className="bg-zinc-700 hover:bg-zinc-800 border-b border-zinc-400 text-white px-2 py-1 rounded-lg text-xs cursor-pointer">
                            {key}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className='flex justify-center items-center gap-1'>
                <IoMdSearch className={`${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`} size={20} />
                <p className={`${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-center py-10`}>No shortcuts found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${mode === 'dark' ? '#27272A' : '#27272A'};
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: ${mode === 'dark' ? '#5555' : '#555'};
        }
      `}</style>
    </div>
  );
}

export default ShortcutModal;
