import React from 'react';
import Image from 'next/image'

type Mode = 'light' | 'dark';

interface ModeProps {
  mode?: Mode;
}

function ForgotPassword({ mode }: ModeProps) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className={`${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} h-[515px] w-96 rounded-md p-8 z-50`}>
        <div className="flex justify-center items-center">
          <div className="rounded-full p-4">
           <Image src={'https://i.imgur.com/TM94NQl.png'} alt='EmailSentIcon' width={60} height={60} />
          </div>
        </div>
        <div className="mt-8">
          <p className={`${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-2xl font-semibold text-center mb-3`}>Forgot Password?</p>
          <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center text-sm mb-6`}>
            Don&apos;t worry, it happens to the best of us.<br />
            Type your email to reset your password.
          </p>
          <form className="space-y-4">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                required
                className={`${mode === 'dark' ? 'text-gray-200 bg-[#16171C] border border-gray-600' : 'bg-gray-100 border border-gray-300'} w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500`}
              />
            </div>
            <button
              type="submit"
              className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none`}
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              <span className="font-medium">Send Code</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;