import React from "react";
import { SiBuymeacoffee } from "react-icons/si";

const BuyMeACoffeeButton = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/ayushmxxn" // Replace with your actual Buy Me a Coffee profile link
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center  text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <SiBuymeacoffee className="h-7 w-7 bg-purple-600 p-1  rounded-full" />
    </a>
  );
};

export default BuyMeACoffeeButton;
