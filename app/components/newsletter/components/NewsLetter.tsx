'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Mode = "light" | "dark";

interface Props {
    mode: Mode;
}

const imageUrls = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const zIndices = [5, 4, 3, 2, 1];

const NewsLetter: React.FC<Props> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email) {
            setSubscribed(true);
        }
    };

    return (
        <div className='flex justify-center items-center py-20'>
            <div className={`${mode === 'dark'? 'bg-black border border-zinc-600' : 'bg-white'} w-96 h-80 rounded-lg p-5 overflow-hidden z-50`}>
                <AnimatePresence>
                    {!subscribed ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col justify-center items-center h-full'
                        >
                            <div className='flex justify-center items-center gap-1 mt-5 relative'>
                                {imageUrls.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        alt='Image'
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                        style={{ marginLeft: '-10px', zIndex: zIndices[index] }}
                                    />
                                ))}
                            </div>
                            <div className='flex flex-col justify-center items-center mt-5 gap-2'>
                                <span className={`${mode === 'dark'? 'text-white' : 'text-black'} text-lg font-semibold`}>Subscribe to our newsletter</span>
                                <span className={`${mode === 'dark'? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>Subscribe to our newsletter and never miss an update. Get the latest news, articles, and exclusive offers straight to your inbox!</span>
                            </div>
                            <div>
                                <div className="flex justify-center items-center mt-5">
                                    <div className={`${mode === 'dark'? 'bg-black border-gray-600' : 'bg-white border-gray-300'} border relative flex items-center shadow-md rounded-full w-80 h-10`}>
                                        <svg width="20" height="20" viewBox="0 0 80 64" fill="#6B7280" xmlns="http://www.w3.org/2000/svg" className='absolute left-3'>
                                            <path d="M72 0H8C3.6 0 0.04 3.6 0.04 8L0 56C0 60.4 3.6 64 8 64H72C76.4 64 80 60.4 80 56V8C80 3.6 76.4 0 72 0ZM72 16L40 36L8 16V8L40 28L72 8V16Z" fill="#4B5563" />
                                        </svg>
                                        <input
                                            type="email"
                                            name="EmailInput"
                                            id="EmailInput"
                                            placeholder="Enter email"
                                            className={`${mode === 'dark'? 'text-gray-200' : 'text-gray-700 placeholder-gray-500'} bg-transparent outline-none flex-grow pl-10 py-2 rounded-full text-sm ml-1`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center mt-2'>
                                <button onClick={handleSubscribe} className={`${mode === 'dark'? 'bg-white text-black' : 'bg-black text-white'} w-80 p-2 rounded-full`}>Subscribe</button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="thank-you"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col justify-center items-center mt-10 gap-2'
                        >
                            <span>
                                <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M40 0C17.92 0 0 17.92 0 40C0 62.08 17.92 80 40 80H60V72H40C22.64 72 8 57.36 8 40C8 22.64 22.64 8 40 8C57.36 8 72 22.64 72 40V45.72C72 48.88 69.16 52 66 52C62.84 52 60 48.88 60 45.72V40C60 28.96 51.04 20 40 20C28.96 20 20 28.96 20 40C20 51.04 28.96 60 40 60C45.52 60 50.56 57.76 54.16 54.12C56.76 57.68 61.24 60 66 60C73.88 60 80 53.6 80 45.72V40C80 17.92 62.08 0 40 0ZM40 52C33.36 52 28 46.64 28 40C28 33.36 33.36 28 40 28C46.64 28 52 33.36 52 40C52 46.64 46.64 52 40 52Z" fill={`${mode === 'dark' ? '#F3F4F6' : '#1E1E1E'}`} />
                                </svg>
                            </span>
                            <span className={`${mode === 'dark'? 'text-white' : 'text-black'} text-2xl font-semibold mt-1`}>Email Sent!</span>
                            <span className={`${mode === 'dark'? 'text-gray-400' : 'text-gray-600'} text-center text-sm`}>We have sent a confirmation email to your email address. Check your inbox for more details.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default NewsLetter;