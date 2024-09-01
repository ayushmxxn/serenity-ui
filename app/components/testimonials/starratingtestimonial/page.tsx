'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import PropsTable from '@/components/serenity/Table';
import StarRatingTestimonial from './components/StarRatingTestimonial';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';



// Props data for component
  const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'I\'m blown away by  the versatility of the components in this library. They make UI development a breeze!',
    name: 'Alice Johnson',
    jobtitle: 'Frontend Developer',
    rating: 2
  },
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!',
    name: 'David Smith',
    jobtitle: 'UI Designer',
    rating: 2
  },
  {
    image: 'https://i.imgur.com/kaDy9hV.jpeg',
    text: 'The components in this library are not just well-designed but also highly customizable. It\'s a developer\'s dream!',
    name: 'Emma Brown',
    jobtitle: 'Software Engineer',
    rating: 1
  },
  {
    image: 'https://i.imgur.com/cRwFxtE.png',
    text: 'I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.',
    name: 'James Wilson',
    jobtitle: 'Product Manager',
    rating: 2
  },
  {
    image: 'https://i.imgur.com/TQIqsob.png',
    text: 'Implementing this component library was a game-changer for our team. It has elevated our product\'s UI to a whole new level!',
    name: 'Sophia Lee',
    jobtitle: 'UX Specialist',
    rating: 3
  },
  {
    image: 'https://i.imgur.com/3ROmJ0S.png',
    text: 'Using this library has been a game-changer for our product development.',
    name: 'Michael Davis',
    jobtitle: 'Full Stack Developer',
    rating: 5
  },
  {
    image: 'https://i.imgur.com/6fKCuVC.png',
    text: 'The components are highly responsive and work seamlessly across different devices and screen sizes.',
    name: 'Emily Chen',
    jobtitle: 'Mobile App Developer',
    rating: 5
  },
  {
    image: 'https://i.imgur.com/Jjqe7St.png',
    text: 'I love how easy it is to customize the components  to fit our brand\'s style. The design is clean and modern.',
    name: 'Robert Lee',
    jobtitle: 'Graphic Designer',
    rating: 5
  },
  {
    image: 'https://i.imgur.com/bG88vHI.png',
    text: 'This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.',
    name: 'Sarah Taylor',
    jobtitle: 'Backend Developer',
    rating: 5
  },
  {
    image: 'https://i.imgur.com/tjmS77j.png',
    text: 'I appreciate the attention to detail in the design. The components are visually appealing and professional.',
    name: 'Kevin White',
    jobtitle: 'UI/UX Designer',
    rating: 5
  },
  {
    image: 'https://i.imgur.com/yTsomza.png',
    text: 'The components are highly customizable and can be easily integrated with our existing UI framework.',
    name: 'Rachel Patel',
    jobtitle: 'Full Stack Developer',
    rating: 4
  },
  {
    image: 'https://i.imgur.com/pnsLqpq.png',
    text: 'I love how the components are designed to be highly responsive and work well across different screen sizes.',
    name: 'Brian Kim',
    jobtitle: 'Mobile App Developer',
    rating: 5
  },
  
];


// Soure code 
const sourcecode = `
'use client';
import Image from 'next/image';
import React, { useState } from 'react';

type Mode = 'light' | 'dark';

interface Testimonial {
  image: string;
  name: string;
  jobtitle: string;
  text: string;
  rating: number;
}

interface TestimonialProps {
  testimonials: Testimonial[];
  mode?: Mode;
}

const StarRatingTestimonial: React.FC<TestimonialProps> = ({ testimonials, mode = 'light' }) => {
  const [showAll, setShowAll] = useState(false);
  const maxDisplayedTestimonials = 6;

  const handleLoadMore = () => {
    setShowAll(true);
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
        <div className={\`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden \${showAll || testimonials.length <= maxDisplayedTestimonials ? '' : 'max-h-[720px]'} relative\`}>
          {testimonials.slice(0, showAll || testimonials.length <= maxDisplayedTestimonials ? testimonials.length : maxDisplayedTestimonials).map((testimonial, index) => (
            <div
              key={index}
              className={\`\${mode === 'dark' ? 'bg-black' : 'bg-white'} border border-slate-400 w-80 h-auto rounded-2xl p-5 relative\`}
            >
              <div className='flex items-center'>
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={\`w-7 h-7 \${mode === 'dark' ? 'text-yellow-300' : 'text-black'}\`}
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                      clipRule='evenodd'
                    />
                  </svg>
                ))}
                {[...Array(Math.max(0, 5 - testimonial.rating))].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-7 h-7 text-slate-300'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                      clipRule='evenodd'
                    />
                  </svg>
                ))}
              </div>
              <div className='mt-5 mb-5'>
                <span className={\`\${mode === 'dark' ? 'text-slate-100' : 'text-black'}\`}>
                  {testimonial.text}
                </span>
              </div>
              <hr />
              <div className='flex items-center mt-5'>
                <Image
                  src={testimonial.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt='profile'
                  width={50}
                  height={50}
                  className='rounded-full'
                />
                <div className='flex flex-col pl-4'>
                  <span className={\`\${mode === 'dark' ? 'text-white' : 'text-black'}\`}>
                    {testimonial.name}
                  </span>
                  <span className={\`text-sm \${mode === 'dark' ? 'text-slate-400' : 'text-slate-500'}\`}>
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {testimonials.length > maxDisplayedTestimonials && !showAll && (
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
            <button
              className='bg-white text-black px-4 py-2 rounded getstarted'
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

export default StarRatingTestimonial;
`;



// Example code 
const example = [
  {
    title: 'Example.tsx',
    code: `import React from 'react'
import StarRatingTestimonial from './components/ui/StarRatingTestimonial';


  const testimonials = [
  {
    image: 'https://via.placeholder.com/150',
    text: 'Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!',
    name: 'David Smith',
    jobtitle: 'UI Designer',
    rating: 2
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.',
    name: 'James Wilson',
    jobtitle: 'Product Manager',
    rating: 2
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'Using this library has been a game-changer for our product development.',
    name: 'Michael Davis',
    jobtitle: 'Full Stack Developer',
    rating: 5
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'The components are highly responsive and work seamlessly across different devices and screen sizes.',
    name: 'Emily Chen',
    jobtitle: 'Mobile App Developer',
    rating: 5
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.',
    name: 'Sarah Taylor',
    jobtitle: 'Backend Developer',
    rating: 5
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'I appreciate the attention to detail in the design. The components are visually appealing and professional.',
    name: 'Kevin White',
    jobtitle: 'UI/UX Designer',
    rating: 5
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'The components are highly customizable and can be easily integrated with our existing UI framework.',
    name: 'Rachel Patel',
    jobtitle: 'Full Stack Developer',
    rating: 4
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'I love how the components are designed to be highly responsive and work well across different screen sizes.',
    name: 'Brian Kim',
    jobtitle: 'Mobile App Developer',
    rating: 5
  },
  
];


function page() {
  return (
    <div>
      <StarRatingTestimonial mode='light' testimonials={testimonials}/>
    </div>
  )
}

export default page;`,
  },
];



// Props data
const propsData = [
    { name: 'image', type: 'string', description: 'Represents the URL or path to an avatar image' },
    { name: 'name', type: 'string', description: 'Specifies the name of the person' },
    { name: 'jobtitle', type: 'string', description: 'Specifies the job title of the person' },
    { name: 'text', type: 'string', description: 'Specifies the testimonial that the person has given' },
    { name: 'rating', type: 'number', description: 'Specifies the Star rating given by a person.'},
    { name: 'mode', type: 'string', description: 'Specifies the color scheme. Possible values are light or dark.'}
  ]

function StarRatingTestimonialPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');
  const [darkMode, setDarkMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);
  

  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStep(step);
        setTimeout(() => setCopiedStep(null), 2000);
      },
      () => alert('Failed to copy.')
    );
  } else {
    
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  
    textarea.style.opacity = '0'; 
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedStep(step);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      alert('Failed to copy.');
    }
    
    document.body.removeChild(textarea);
  }
};

  

  return (
    <div className='bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Star Rating Testimonial</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>This Star Rating Testimonial Displays user <br /> testimonials with star ratings, job titles, and feedback text.</p>
      </div>
      <div className='flex flex-col items-start mt-10'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-4'>
            <button
            className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Preview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Preview
          </button>
          <button
            className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Code')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
            Code
          </button>
          </div>
          <div className='flex justify-end items-center gap-2'>
            
            <div className='mr-1'>
             <motion.button
      whileTap={{ scale: 0.95 }}
      className="flex items-center rounded-full p-2 text-white focus:outline-none"
      onClick={toggleDarkMode}
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.svg
            key="dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
            initial={hasMounted ? { opacity: 0, rotate: -90 } : false}
            animate={hasMounted ? { opacity: 1, rotate: 0 } : false}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.1 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="light"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
            initial={hasMounted ? { opacity: 0, rotate: -90 } : false}
            animate={hasMounted ? { opacity: 1, rotate: 0 } : false}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.1 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
            </div>
          </div>
          
        </div>
        <div className='bg-black  border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2 '>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                  <StarRatingTestimonial mode={`${darkMode? 'dark' : 'light'}`} testimonials={testimonials} />
              </div>
            )}
            {activeTab === 'Code' && (
              <div>
                <SerenitySourceCodeBlock codeString={sourcecode} language="javascript"/>
              </div>
            )}
          </div>
        </div>
        <div className='pt-20 py-3 text-xl font-semibold'>
        <div className='flex items-center'>
            <div className='mr-2 sm:pl-4'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            </div>
            Installation
        </div>
        </div>
        <div>
          <div className='relative'>
                  <pre className='bg-zinc-900/70 backdrop-blur-lg p-3 sm:ml-4 border border-zinc-700 shadow-lg rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px]'>
                    <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add star-rating-testimonial</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npx @ayushmxxn/serenity-ui@latest add star-rating-testimonial', 1)}
                    className='absolute right-0 top-2 p-2 w-10 h-auto bg-[#111113] rounded border-r border-zinc-700'
                    aria-label='Copy command'
                  >
                    {copiedStep ? (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#4ADE80"
                      className="w-4 h-4"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
                      transition={{ duration: 0.6 }} // Adjust duration if needed
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </motion.svg>
                  ) : (
                    <span className='relative -top-1 -left-1'>
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M9.75 12.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M9.75 15.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      </svg>
                    </span>
            
                  )}
                  </button>
            </div>
        </div>
        <div className='flex items-center pt-20 py-3 sm:pl-4 text-xl font-semibold'>
           <div className='mr-2'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>
            </div>
            Usage        
        </div>
        <SerenityExampleBlock files={example}/>
      </div>
      <div className="container mx-auto p-1 sm:p-4 mt-20">
        <div className='flex items-center mb-3'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <h1 className="text-xl font-semibold ml-2">Props</h1>
        </div>
        <PropsTable propsData={propsData} />
      </div>
    </div>
  )
}

export default StarRatingTestimonialPage;
