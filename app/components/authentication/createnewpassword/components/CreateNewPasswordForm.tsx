'use client';
import React, { useState } from 'react';
import Image from 'next/image';

type Mode = 'light' | 'dark';

interface Props {
  mode: Mode;
}

function CreateNewPasswordForm({ mode }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className={`${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} h-[515px] w-96 rounded-md p-8 z-50`}>
        <div className='flex justify-center items-center'>
          <div className='rounded-full'>
            <Image src={'https://i.imgur.com/Eepqa2C.png'} alt='Padlock' width={60} height={60} />
          </div>
        </div>
        <div className='mt-8'>
          <p className={`${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-2xl font-semibold text-center mb-3`}>Create New Password</p>
          <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center text-sm mb-8`}>Ensure that your new password is different from the previous one.</p>
          <form className='space-y-3'>
            <div className='relative'>
              <label htmlFor="new-password" className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium pl-1`}>
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='New Password'
                required
                className={`${mode === 'dark' ? 'bg-[#16171C] text-gray-200' : 'placeholder-gray-400 text-black border bg-gray-100 border-gray-300'} w-full px-3 py-2 mt-1 mb-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm`}
              />
            </div>
            <div className='relative'>
              <label htmlFor="confirm-password" className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium pl-1`}>
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                required
                className={`${mode === 'dark' ? 'bg-[#16171C] text-gray-200' : 'placeholder-gray-400 text-black border bg-gray-100 border-gray-300'} w-full px-3 py-2 mt-1 mb-10 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm`}
              />
            </div>
            <button
              type='submit'
              className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none`}
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              <span className='font-medium'>Reset Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPasswordForm;