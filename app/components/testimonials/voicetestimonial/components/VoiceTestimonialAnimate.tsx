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
        const audio = new Audio(`/audio/${testimonial.audio}`);
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
        <div className={`flex justify-center items-center gap-5 flex-wrap bg-black shadow-black overflow-hidden ${showAll ? 'max-h-full' : 'max-h-[720px]'} relative`}>
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
                className={`${
                  mode === 'dark' ? 'bg-black' : 'bg-white'
                } border border-zinc-400 w-80 h-auto rounded-2xl p-5 relative
                  ${!showAll && index >= 6 ? 'testimonial-partially-visible' : ''}
                }`}
              >
                <div onClick={() => openInNewTab(testimonial.social || '')} className='absolute top-5 right-5'>
                  <RiTwitterXLine
                    className={`${mode === 'dark' ? 'text-white' : 'text-slate-800'} cursor-pointer`}
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
                    <span className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>{testimonial.name}</span>
                    <span className={`${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-sm`}>
                      {testimonial.jobtitle}
                    </span>
                  </div>
                </div>
                <div className='mt-5 mb-1'>
                  <span className={`${mode === 'dark' ? 'text-slate-200' : 'text-black'}`}>{testimonial.text}</span>
                </div>
                <div className={`${mode === 'dark'? 'bg-zinc-200' : 'bg-slate-100'}  w-full h-12 mt-4 rounded-lg flex justify-between items-center p-2 relative`}>
                  {currentPlayingIndex !== index ? (
                    <span onClick={() => handlePlay(index)}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                        <path
                          fillRule='evenodd'
                          d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z'
                        />
                      </svg>
                    </span>
                  ) : (
                    <span onClick={() => handlePause(index)}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
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
                        className={`${mode === 'dark'? 'bg-zinc-900' : 'bg-slate-600'}`}
                        style={{
                          width: '3px',
                          height: `${Math.random() * 20 + 5}px`,
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