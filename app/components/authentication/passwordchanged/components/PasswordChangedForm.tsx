'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Mode = 'light' | 'dark';

interface Props {
  mode: Mode;
}

function PasswordChangedForm({ mode }: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} h-[515px] w-96 rounded-lg p-8 flex flex-col justify-center items-center space-y-4 z-50`}
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
          className='rounded-full overflow-hidden p-2'
        >
          <Image 
            src={'https://i.imgur.com/ZuoBVDq.png'} 
            alt='EmailSentIcon' 
            width={100} 
            height={100} 
          />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          className={`${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-2xl font-semibold text-center`}
        >
          Password Changed!
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
          className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center text-sm pb-5`}
        >
          Your password has been changed successfully.
        </motion.p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
          className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white '} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none mt-8`}
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <span className='font-medium'>Back To Login</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PasswordChangedForm;