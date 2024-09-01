'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useMediaQuery } from '@react-hook/media-query';
import SerenityLogo from '@/app/images/serenitylogotransparent.svg'

interface Testimonial {
  image?: string;
  text: string;
  name: string;
  jobtitle: string;
  rating: number;
}

interface BookTestimonial3DProps {
  testimonials: Testimonial[];
}

function BookTestimonial3D({ testimonials }: BookTestimonial3DProps) {

  const book = useRef<typeof HTMLFlipBook>(null);

  const isSmallScreen = useMediaQuery('(min-width: 640px)');
  const smallerDevice = isSmallScreen ? false : true;

  const handleFlip = (pageNum: number) => {
    (book.current as any)?.pageFlip()?.flip(pageNum);
    (book.current as any)?.pageFlip()?.flipNext(false);

  }

  return (
    <div className="w-full text-black h-500px flex justify-center items-center py-10">
      <HTMLFlipBook ref={book} width={300} height={450} showCover={true} usePortrait={smallerDevice} onFlip={(e) => console.log(e.data)} onChangeState={(e) => console.log(e.data)}>
      {/* Cover Page */}
      <div className="relative bg-black border rounded-lg p-8 text-white flex flex-col items-center justify-center shadow-lg shadow-gray-600 cursor-grab">
      {/* Company Logo */}
      <div className="flex justify-center items-center ">
        <Image src={SerenityLogo} alt="Serenity UI Logo" width={100} height={100} />
      </div>
      {/* Company Name */}
      <h1 className="text-4xl mb-36 text-center relative z-10">Serenity UI</h1>
      <div className="w-full h-1 bg-white mb-6 relative z-10"></div>
      <div className='text-center'>
        <span className="text-lg text-white text-center hover:text-gray-300 transition-colors duration-300 relative z-10">
          Read what virtual people are saying about us
        </span>
      </div>
    </div>


        {/* Index Page */}
        <div className="w-full h-full flex justify-center items-center bg-zinc-200 border border-gray-300 box-border">
          <div className="page-front text-start text-white p-3 bg-gray-400">Index</div>
          <div className="flex flex-col justify-start items-start p-8 space-y-3">
            <div>
              <ol className="grid grid-cols-2 gap-2 ">
                {testimonials.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    <li onClick={() => handleFlip(index + 2)} className="flex justify-start items-center text-xs cursor-pointer">
                      <Image src={testimonial.image || ''} alt='image' width={20} height={20} className='rounded-full mr-2' />
                      {testimonial.name}
                    </li>
                    <li className="flex justify-end text-xs items-center">{index + 2}</li>
                  </React.Fragment>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Testimonials Pages */}
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full h-full flex justify-center items-center bg-gray-200 border border-gray-300 box-border cursor-grab">
            <div className="page-front text-end text-white p-3 bg-gray-400">{index + 2}</div>
            <div className='flex justify-center items-center mt-7 '>
              <Image src={testimonial.image || ''} alt='image' width={100} height={100} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-center items-center mt-3'>
              <span>{testimonial.name}</span>
              <span className='text-gray-500 text-sm'>{testimonial.jobtitle}</span>
            </div>
            <div className='p-5 font-serif font-semibold text-center mt'>{testimonial.text}</div>
            <div className='flex justify-center items-center mt-3 '>
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFA800" className="size-8">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#CBD5E1" className="size-8">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
        ))}

        {/* Back Cover */}
        <div className="bg-black border p-8  text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center font-serif">Thank You!</h1>
          <p className="text-lg text-center">We appreciate your feedback</p>
        </div>
        
      </HTMLFlipBook>
    </div>
  );
}

export default BookTestimonial3D;