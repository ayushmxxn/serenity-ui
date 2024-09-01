'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';

type Mode = 'light' | 'dark';

interface Testimonial {
  image: string;
  name: string;
  username: string;
  text: string;
  social: string;
}

interface TestimonialProps {
  testimonials: Testimonial[];
  mode?: Mode;
}

const UsernameTestimonial: React.FC<TestimonialProps> = ({ testimonials, mode = 'light' }) => {
  const [showAll, setShowAll] = useState(false);
  const maxDisplayedTestimonials = 6;

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center pt-5'>
        <div className='flex flex-col gap-5 mb-8'>
          <span className='text-center text-4xl'>Read what people are saying</span>
          <span className='text-center text-slate-300'>Dummy feedback from virtual customers <br /> using our component library.</span>
        </div>
      </div>
      <div className='relative'>
        <div className={`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden ${showAll || testimonials.length <= maxDisplayedTestimonials ? '' : 'max-h-[720px]'} relative`}>
          {testimonials.slice(0, showAll || testimonials.length <= maxDisplayedTestimonials ? testimonials.length : maxDisplayedTestimonials).map((testimonial, index) => (
            <div
              key={index}
              className={`${mode === 'dark' ? 'bg-black' : 'bg-white'} border border-slate-300 w-80 h-auto rounded-2xl p-5 relative`}
            >
              <div className='flex items-center'>
                <Image
                  src={testimonial.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt='profile'
                  width={50}
                  height={50}
                  className='rounded-full'
                />
                <div className='flex flex-col pl-4'>
                  <span className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                    {testimonial.name}
                  </span>
                  <span className={`text-sm ${mode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {testimonial.username}
                  </span>
                </div>
              </div>
              <div className='mt-5 mb-5'>
                <span className={`${mode === 'dark' ? 'text-slate-200' : 'text-black'}`}>
                  {testimonial.text}
                </span>
              </div>
              <div onClick={() => openInNewTab(testimonial.social || '')} className='absolute top-5 right-5 cursor-pointer'>
                <RiTwitterXLine className={`${mode === 'dark' ? 'text-white' : 'text-slate-800'}`} size={20} />
              </div>
            </div>
          ))}
        </div>
        {testimonials.length > maxDisplayedTestimonials && !showAll && (
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
            <button
              className='bg-white text-black px-4 py-2 rounded whiteshimmerbtn'
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
        {!showAll && (
          <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent'></div>
        )}
      </div>
    </div>
  );
};

export default UsernameTestimonial;