'use client';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

type RatingProps = {
  totalStars?: number;
  onRate?: (rating: number) => void;
};

const StarRating: React.FC<RatingProps> = ({ totalStars = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleRating = (star: number) => {
    setRating(star);
    onRate && onRate(star);
    setUserRating(star);
  };

  console.log(`User Rating: ${userRating}`);
   
  return (
    <div className="flex justify-center items-center space-x-2 h-full py-20">
      {Array.from({ length: totalStars }, (_, index) => index + 1).map((star) => (
        <motion.button
          key={star}
          type="button"
          className="relative text-3xl focus:outline-none"
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          whileHover={{ scale: 1.3, rotate: -10 }}
          whileTap={{ scale: 0.9, rotate: 15 }}
        >
          <motion.div
            className={`transition-colors duration-300 ${
              (hover || rating) >= star ? 'text-yellow-300' : 'text-gray-300'
            }`}
            animate={{
              scale: (hover || rating) >= star ? 1.2 : 1,
              transition: { duration: 0.3 },
            }}
          >
            <FaStar />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};

export default StarRating;
