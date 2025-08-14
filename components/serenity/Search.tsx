// Search.tsx
import React from "react";
import { useSearch } from "./SearchContext";

function Search() {
  const { openSearch } = useSearch();

  return (
    <div
      onClick={openSearch}
      className="flex justify-center items-center cursor-pointer"
      role="button"
      aria-label="Open search modal"
    >
      <div className="bg-black/50 border border-zinc-900 relative flex items-center shadow-md rounded-full w-52 h-10">
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-zinc-400 w-4 h-4 absolute left-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m1.72-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Search Input */}
        <input
          name="SearchBar"
          id="Searchbar"
          placeholder="Press / to search"
          readOnly
          onClick={openSearch}
          className="placeholder-zinc-400 w-full bg-transparent outline-none flex-grow pl-10 pr-10 py-2 rounded-full text-sm cursor-pointer"
        />

        {/* Modern Backslash Icon */}
        <span className="absolute right-3 bg-zinc-800 text-zinc-300 p-1 rounded flex items-center justify-center w-5 h-5 text-xs font-semibold">
          /
        </span>
      </div>
    </div>
  );
}

export default Search;
