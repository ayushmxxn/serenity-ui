import React from 'react';
import Image from 'next/image';

type Mode = 'light' | 'dark';

interface Props {
  mode: Mode;
}

const EmailForm: React.FC<Props> = ({ mode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} h-[515px] w-96 rounded-md p-8 z-50`}>
        <div className="flex justify-center items-center">
          <Image src="https://i.imgur.com/2OJ5KPK.png" alt="EmailSentIcon" width={100} height={100} />
        </div>
        <div className="mt-8">
          <p className={`${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-2xl font-semibold text-center mb-3`}>Check your email</p>
          <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center text-sm mb-6`}>We have sent a password reset link to johndoe@gmail.com</p>
        </div>
        <button
          type="submit"
          className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none`}
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <span className="font-medium">Open email app</span>
        </button>
        <div className="flex gap-1 mt-10 justify-center items-center">
          <span className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Didn&apos;t receive the email?</span>
          <span className={`${mode === 'dark' ? 'text-white' : 'text-black'} text-sm cursor-pointer`}>Resend</span>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;