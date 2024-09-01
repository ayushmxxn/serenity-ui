'use client'
import VoiceTestimonial from '@/app/components/testimonials/voicetestimonial/components/VoiceTestimonial';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import VoiceTestimonialAnimate from './components/VoiceTestimonialAnimate';
import PropsTable from '@/components/serenity/Table';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';


// Props data for component
const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'I\'m blown away by  the versatility of the components in this library. They make UI development a breeze!',
    name: 'Alice Johnson',
    jobtitle: 'Frontend Developer',
    audio: 'Alice.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!',
    name: 'David Smith',
    jobtitle: 'UI Designer',
    audio: 'David.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
    
  },
  {
    image: 'https://i.imgur.com/kaDy9hV.jpeg',
    text: 'The components in this library are not just well-designed but also highly customizable. It\'s a developer\'s dream!',
    name: 'Emma Brown',
    jobtitle: 'Software Engineer',
    audio: 'Emma.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/cRwFxtE.png',
    text: 'I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.',
    name: 'James Wilson',
    jobtitle: 'Product Manager',
    audio: 'James.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/TQIqsob.png',
    text: 'Implementing this component library was a game-changer for our team. It has elevated our product\'s UI to a whole new level!',
    name: 'Sophia Lee',
    jobtitle: 'UX Specialist',
    audio: 'Sophia.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/3ROmJ0S.png',
    text: 'Using this library has been a game-changer for our product development.',
    name: 'Michael Davis',
    jobtitle: 'Full Stack Developer',
    audio: 'Michael.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/6fKCuVC.png',
    text: 'The components are highly responsive and work seamlessly across different devices and screen sizes.',
    name: 'Emily Chen',
    jobtitle: 'Mobile App Developer',
    audio: 'Emily.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/Jjqe7St.png',
    text: 'I love how easy it is to customize the components  to fit our brand\'s style. The design is clean and modern.',
    name: 'Robert Lee',
    jobtitle: 'Graphic Designer',
    audio: 'Robert.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/bG88vHI.png',
    text: 'This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.',
    name: 'Sarah Taylor',
    jobtitle: 'Backend Developer',
    audio: 'Sarah.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/tjmS77j.png',
    text: 'I appreciate the attention to detail in the design. The components are visually appealing and professional.',
    name: 'Kevin White',
    jobtitle: 'UI/UX Designer',
    audio: 'Kevin.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/yTsomza.png',
    text: 'The components are highly customizable and can be easily integrated with our existing UI framework.',
    name: 'Rachel Patel',
    jobtitle: 'Full Stack Developer',
    audio: 'Rachel.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/pnsLqpq.png',
    text: 'I love how the components are designed to be highly responsive and work well across different screen sizes.',
    name: 'Brian Kim',
    jobtitle: 'Mobile App Developer',
    audio: 'Brian.mp3',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
];


// Soure code for voice testimonial 
const sourcecode = `
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { motion, Variants } from 'framer-motion';

type Mode = 'light' | 'dark';

interface Testimonial {
  image?: string;
  name?: string;
  jobtitle?: string;
  text?: string;
  audio?: string;
  social?: string;
}

interface VoiceTestimonialProps {
  mode: Mode;
  testimonials: Testimonial[];
}

const WaveVariants = (): Variants[] => {
  const waveVariants: Variants[] = [];
  for (let i = 0; i < 30; i++) {
    waveVariants.push({
      initial: {
        scaleY: 1.5,
        transition: {
          duration: 0.5,
        },
      },
      animate: {
        scaleY: [1, Math.random() * 1.2 + 1, 1],
        transition: {
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 0.5,
        },
      },
    });
  }
  return waveVariants;
};

const waveVariants = WaveVariants();

const VoiceTestimonial: React.FC<VoiceTestimonialProps> = ({ mode, testimonials }) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<(HTMLAudioElement | null)[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    
    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach((testimonial) => {
      if (testimonial.audio) {
        const audio = new Audio(\`/audio/\${testimonial.audio}\`);
        audio.addEventListener('ended', handleAudioEnded);
        elements.push(audio);
      } else {
        elements.push(null);
      }
    });
    setAudioElements(elements);

    
    return () => {
      elements.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', handleAudioEnded);
        }
      });
    };
  }, [testimonials]);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      stopAudio(currentPlayingIndex);
    }

    const audio = audioElements[index];
    if (audio) {
      audio.play().catch((error) => console.error('Audio playback error:', error));
      setCurrentPlayingIndex(index);
    }
  };

  const stopAudio = (index: number) => {
    const audio = audioElements[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentPlayingIndex(null);
    }
  };

  const handlePause = (index: number) => {
    stopAudio(index);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingIndex(null);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  const shouldShowLoadMore = testimonials.length > 6; // Here you can set the number of testimonials you want to display at a time

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <span className="text-center text-4xl">Read what people are saying</span>
          <span className="text-center text-slate-300">
            Dummy feedback from virtual customers <br /> using our component library.
          </span>
        </div>
      </div>
      <div className="relative">
        <div className={\`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden \${showAll ? 'max-h-full' : 'max-h-[720px]'} relative\`}>
          {shouldShowLoadMore && !showAll && <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10"></div>}
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={\`\${
                mode === 'dark' ? 'bg-black' : 'bg-white'
              } border border-zinc-400 w-80 h-auto rounded-2xl p-5 relative \${
                !showAll && index >= 6 ? 'testimonial-partially-visible' : ''
              }\`}>
              <div onClick={() => openInNewTab(testimonial.social || '')} className="absolute top-5 right-5">
                <RiTwitterXLine
                  className={\`\${mode === 'dark' ? 'text-white' : 'text-slate-800'} cursor-pointer\`}
                  size={20}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || 'https://via.placeholder.com/50'}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col pl-4">
                  <span className={\`\${mode === 'dark' ? 'text-white' : 'text-black'}\`}>{testimonial.name}</span>
                  <span className={\`\${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-sm\`}>
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
              <div className="mt-5 mb-1">
                <span className={\`\${mode === 'dark' ? 'text-slate-200' : 'text-black'}\`}>{testimonial.text}</span>
              </div>
              <div className={\`\${mode === 'dark'? 'bg-zinc-200' : 'bg-slate-100'}  w-full h-12 mt-4 rounded-lg flex justify-between items-center p-2 relative\`}>
                {currentPlayingIndex !== index ? (
                  <span onClick={() => handlePlay(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`\${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 \`}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span onClick={() => handlePause(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={\`\${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 \`}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                      />
                    </svg>
                  </span>
                )}
                <div className="flex">
                  {waveVariants.map((variant, i) => (
                    <motion.div
                      key={i}
                      className={\`\${mode === 'dark'? 'bg-zinc-900' : 'bg-slate-600'}\`}
                      style={{
                        width: '3px',
                        height: \`\${Math.random() * 20 + 5}px\`,
                        margin: '0 2px',
                        borderRadius: '2px',
                      }}
                      variants={variant}
                      initial="initial"
                      animate={currentPlayingIndex === index ? 'animate' : 'initial'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {shouldShowLoadMore && !showAll && (
          <div className="flex justify-center mt-8">
            <button
              className="px-5 py-2 bg-zinc-200 text-black rounded-md hover:bg-zinc-300 transition"
              onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceTestimonial;
`;

// Source code
const sourcecodeanimate = `
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { RiTwitterXLine } from 'react-icons/ri'
import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type Mode = 'light' | 'dark';

interface Testimonial {
  image?: string;
  name: string;
  jobtitle: string;
  text: string;
  audio?: string;
  social?: string;
}

interface VoiceTestimonialProps {
  mode: Mode;
  testimonials: Testimonial[];
}

type WaveVariant = Variants;

const generateWaveVariants = (): WaveVariant[] => {
  const waveVariants: WaveVariant[] = [];
  for (let i = 0; i < 30; i++) {
    waveVariants.push({
      initial: {
        scaleY: 1.5,
        transition: {
          duration: 0.5,
        },
      },
      animate: {
        scaleY: [1, Math.random() * 1.2 + 1, 1],
        transition: {
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 0.5,
        },
      },
    });
  }
  return waveVariants;
};

const waveVariants = generateWaveVariants();

const VoiceTestimonialAnimate: React.FC<VoiceTestimonialProps> = ({ mode, testimonials }) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<(HTMLAudioElement | null)[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    
    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach(testimonial => {
      if (testimonial.audio) {
        const audio = new Audio(\`/audio/\${testimonial.audio}\`);
        audio.addEventListener('ended', handleAudioEnded);
        elements.push(audio);
      } else {
        elements.push(null);
      }
    });
    setAudioElements(elements);

    
    return () => {
      elements.forEach(audio => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', handleAudioEnded);
        }
      });
    };
  }, [testimonials]);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      stopAudio(currentPlayingIndex);
    }

    const audio = audioElements[index];
    if (audio) {
      audio.play().catch(error => console.error('Audio playback error:', error));
      setCurrentPlayingIndex(index);
    }
  };

  const stopAudio = (index: number) => {
    const audio = audioElements[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentPlayingIndex(null);
    }
  };

  const handlePause = (index: number) => {
    stopAudio(index);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingIndex(null);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  if (win) {
    win.focus();
  }
  };

  const shouldShowLoadMore = testimonials.length > 6;

  return (
    <div>
      <div className='flex flex-col items-center justify-center pt-5'>
        <div className='flex flex-col gap-5 mb-8'>
          <span className='text-center text-4xl'>Read what people are saying</span>
          <span className='text-center text-slate-300'>Dummy feedback from virtual customers <br /> using our component library. </span>
        </div>
      </div>
      <div className='relative'>
        <div className={\`flex justify-center items-center gap-5 flex-wrap bg-black shadow-black overflow-hidden \${showAll ? 'max-h-full' : 'max-h-[720px]'} relative\`}>
          {shouldShowLoadMore && !showAll && <div className='absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10'></div>}
          {testimonials.map((testimonial, index) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={\`\${
                  mode === 'dark' ? 'bg-black' : 'bg-white'
                } border border-zinc-400 w-80 h-auto rounded-2xl p-5 relative
                  \${!showAll && index >= 6 ? 'testimonial-partially-visible' : ''}
                }\`}
              >
                <div onClick={() => openInNewTab(testimonial.social || '')} className='absolute top-5 right-5'>
                  <RiTwitterXLine
                    className={\`\${mode === 'dark' ? 'text-white' : 'text-slate-800'} cursor-pointer\`}
                    size={20}
                  />
                </div>
                <div className='flex items-center'>
                  <Image
                    src={testimonial.image || 'https://via.placeholder.com/50'}
                    alt='profile'
                    width={50}
                    height={50}
                    className='rounded-full'
                  />
                  <div className='flex flex-col pl-4'>
                    <span className={\`\${mode === 'dark' ? 'text-white' : 'text-black'}\`}>{testimonial.name}</span>
                    <span className={\`\${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-sm\`}>
                      {testimonial.jobtitle}
                    </span>
                  </div>
                </div>
                <div className='mt-5 mb-1'>
                  <span className={\`\${mode === 'dark' ? 'text-slate-200' : 'text-black'}\`}>{testimonial.text}</span>
                </div>
                <div className={\`$\{mode === 'dark'? 'bg-zinc-200' : 'bg-slate-100'}  w-full h-12 mt-4 rounded-lg flex justify-between items-center p-2 relative\`}>
                  {currentPlayingIndex !== index ? (
                    <span onClick={() => handlePlay(index)}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={\`\${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 \`}>
                        <path
                          fillRule='evenodd'
                          d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z'
                        />
                      </svg>
                    </span>
                  ) : (
                    <span onClick={() => handlePause(index)}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={\`\${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10\`}>
                        <path
                          fillRule='evenodd'
                          d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z'
                        />
                      </svg>
                    </span>
                  )}
                  <div className='flex'>
                    {waveVariants.map((variant, i) => (
                      <motion.div
                        key={i}
                        className={\`$\{mode === 'dark'? 'bg-zinc-900' : 'bg-slate-600'}\`}
                        style={{
                          width: '3px',
                          height: \`${Math.random() * 20 + 5}px\`,
                          margin: '0 2px',
                          borderRadius: '2px',
                        }}
                        variants={variant}
                        animate={currentPlayingIndex === index ? 'animate' : 'initial'}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {shouldShowLoadMore && !showAll && (
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
            <button
              onClick={handleLoadMore}
              className="whiteshimmerbtn py-2 px-4 rounded-full"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceTestimonialAnimate;
`;

// Example code 
const example = [
  {
    title: 'Example.tsx',
    code: `import React from 'react'
import VoiceTestimonial from './components/ui/VoiceTestimonial'

const testimonials = [

  {
    image: 'https://via.placeholder.com/150',
    text: 'Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!',
    name: 'David Smith',
    jobtitle: 'UI Designer',
    audio: 'David.mp3',
    social: 'https://x.com'
    
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.',
    name: 'James Wilson',
    jobtitle: 'Product Manager',
    audio: 'James.mp3',
    social: 'https://x.com'
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'Using this library has been a game-changer for our product development.',
    name: 'Michael Davis',
    jobtitle: 'Full Stack Developer',
    audio: 'Michael.mp3',
    social: 'https://x.com'
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'The components are highly responsive and work seamlessly across different devices and screen sizes.',
    name: 'Emily Chen',
    jobtitle: 'Mobile App Developer',
    audio: 'Emily.mp3',
    social: 'https://x.com'
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.',
    name: 'Sarah Taylor',
    jobtitle: 'Backend Developer',
    audio: 'Sarah.mp3',
    social: 'https://x.com'
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'I appreciate the attention to detail in the design. The components are visually appealing and professional.',
    name: 'Kevin White',
    jobtitle: 'UI/UX Designer',
    audio: 'Kevin.mp3',
    social: 'https://x.com'
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'The components are highly customizable and can be easily integrated with our existing UI framework.',
    name: 'Rachel Patel',
    jobtitle: 'Full Stack Developer',
    audio: 'Rachel.mp3',
    social: 'https://x.com'
  },
  {
    image: 'https://via.placeholder.com/150',
    text: 'I love how the components are designed to be highly responsive and work well across different screen sizes.',
    name: 'Brian Kim',
    jobtitle: 'Mobile App Developer',
    audio: 'Brian.mp3',
    social: 'https://x.com'
  },
];

function Home() {
  return (
    <div>
      <VoiceTestimonial mode='light' testimonials={testimonials} />
    </div>
  )
}

export default Home;`,
  },
];

// Props data
const propsData = [
    { name: 'image', type: 'string', description: 'URL of the avatar image' },
    { name: 'name', type: 'string', description: 'Name of the person' },
    { name: 'jobtitle', type: 'string', description: 'Job title of the person' },
    { name: 'text', type: 'string', description: 'Testimonial of the person' },
    { name: 'audio', type: 'string', description: 'Path to an audio file' },
    { name: 'social', type: 'string', description: 'URL of the social media profile' },
    { name: 'mode', type: 'string', description: 'Specifies the color scheme. Possible values are light or dark.'}
  ];

function VoiceTestimonailPage() {
  
  const [activeTab, setActiveTab] = useState('Preview');
  const [darkMode, setDarkMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };


  const handleAnimate = () => {
    setAnimate((prev) => (!prev))
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  }
  
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
    <div className={`bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5`}>
      <span className='text-4xl font-semibold pl-1'>Voice Testimonial</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>This VoiceTestimonial component displays <br /> user testimonials with audio playback and animated visual effects.</p>
      </div>
      <div className='flex flex-col items-start mt-10'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-4'>
            <button
            className={`flex items-center text-white px-3 py-1 rounded ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Preview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Preview
          </button>
          <button
            className={`flex items-center text-white px-3 py-1 rounded ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Code')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
            Code
          </button>
          </div>
          <div className='flex justify-end items-center gap-2'>
            <div onClick={() => handleAnimate()} className='cursor-pointer relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
              </svg>
              <AnimatePresence>
                {showTooltip && (
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: -12 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className={`absolute -top-4 -left-1 transform -translate-x-1/2 ${animate ? 'bg-green-800' : 'bg-red-800'} bg-opacity-80 text-white text-xs py-1 px-2 rounded`}
                    style={{ zIndex: 10 }} 
                  >
                    {animate ? 'ON' : 'OFF'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>  

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
        <div className='bg-black border rounded-lg border-zinc-800 w-full  h-auto mt-2 '>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                {animate? (
                  <VoiceTestimonialAnimate mode={`${darkMode? 'dark' : 'light'}`} testimonials={testimonials}  />
                ) 
                : 
                (
                  <VoiceTestimonial mode={`${darkMode? 'dark' : 'light'}`} testimonials={testimonials} />
                )
                }
              </div>
            )}
            {activeTab === 'Code' && (
              <div>
                {animate? (
                  <SerenitySourceCodeBlock codeString={sourcecodeanimate} language="javascript"/>
                ) 
                : 
                (
                  <SerenitySourceCodeBlock codeString={sourcecode} language="javascript"/>
                )
                }
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
                  <pre className={`bg-zinc-900/70 backdrop-blur-lg p-3 sm:ml-4 border border-zinc-700 shadow-lg rounded-md overflow-auto text-sm sm:text-base w-[350px] ${animate? 'sm:w-[650px]' : 'sm:w-[600px]'}`}>
                    <code className='text-zinc-300'>{animate? 'npx @ayushmxxn/serenity-ui@latest add voice-testimonial-animate' : 'npx @ayushmxxn/serenity-ui@latest add voice-testimonial'}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(animate? 'npx @ayushmxxn/serenity-ui@latest add voice-testimonial-animate' : 'npx @ayushmxxn/serenity-ui@latest add voice-testimonial', 1)}
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

export default VoiceTestimonailPage;
