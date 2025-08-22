"use client";
import React, { useState, ChangeEvent } from "react";
import { GeistSans } from "geist/font/sans";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdKeyboard } from "react-icons/md";

interface Shortcut {
  key: string;
  description: string;
}

const ShortcutModal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const shortcuts: Shortcut[] = [
    { key: "Ctrl+B", description: "Download canvas as a PNG image" },
    { key: "Ctrl+C", description: "Copy canvas to clipboard as a PNG image" },
    { key: "Ctrl+K", description: "Open quick access menu" },
    {
      key: "Ctrl+Shift+V",
      description:
        "Paste image from clipboard to add a new image annotation layer",
    },
    { key: "Ctrl+Shift+F", description: "Clear editor state" },
    { key: "Del", description: "Delete selected annotation layer" },
  ];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredShortcuts = shortcuts.filter(
    (shortcut) =>
      shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-h-[80vh] w-full overflow-y-auto">
      <div
        className={`${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl w-full shadow-2xl flex flex-col mx-auto mt-8`}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#1A1A1A] border-b border-[#2D2D2D] rounded-t-xl flex items-center justify-between">
          <div className="flex items-center">
            <MdKeyboard className="text-neutral-400 w-5 h-5 mr-2" />
            <h1 className="text-neutral-100 text-sm font-medium">
              Keyboard Shortcuts
            </h1>
          </div>
          <IoMdClose
            className="text-neutral-400 w-5 h-5 cursor-pointer hover:text-neutral-100 transition-colors"
            onClick={() => setSearchQuery("")}
          />
        </div>

        {/* Searchbar */}
        <div className="px-4 py-3 bg-[#1A1A1A]">
          <div className="relative flex items-center">
            <IoMdSearch className="text-neutral-400 w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search shortcuts..."
              className="bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 w-full pl-8 pr-2 py-2 focus:outline-none text-sm font-normal rounded-lg"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 max-h-[300px]">
          {filteredShortcuts.length > 0 ? (
            filteredShortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="group hover:bg-[#2D2D2D] rounded-lg p-2 transition-all duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <p className="text-neutral-100 text-sm font-normal flex-1 overflow-hidden text-ellipsis">
                    {shortcut.description}
                  </p>
                  <div className="flex space-x-2 ml-4">
                    {shortcut.key.split("+").map((key, idx) => (
                      <span
                        key={idx}
                        className="bg-[#2D2D2D] hover:bg-[#4a4a4a] text-neutral-100 px-2 py-1 rounded-lg text-xs cursor-default border border-[#4a4a4a]"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center gap-2 py-10">
              <p className="text-neutral-100 text-sm font-normal text-center">
                No shortcuts found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortcutModal;
