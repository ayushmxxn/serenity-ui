'use client'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FormEvent } from 'react';

type ModeType = 'light' | 'dark';

interface ModeProps {
  mode?: ModeType;
}

const SignInForm = ({ mode }: ModeProps) => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log({ username, password });
    event.currentTarget.reset();
    
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className={`${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} p-8 space-y-8 rounded shadow-md w-96 z-50`}>
        <h2 className={`${mode === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold text-center`}>Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              maxLength={20}
              minLength={10}
              required
              className={`${mode === 'dark' ? 'bg-[#16171C] focus:ring-gray-600 placeholder-gray-500 ' : 'border bg-gray-100 border-gray-300 focus:ring-slate-500'} w-full px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-1 sm:text-sm`}
            />
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <label htmlFor="password" className={`${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium`}>
                Password
              </label>
              <span className={`${mode === 'dark' ? 'text-slate-400 hover:text-gray-100' : 'text-slate-600 hover:text-slate-900'} text-xs cursor-pointer flex justify-start mt-1`}>Forgot password?</span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className={`${mode === 'dark' ? 'bg-[#16171C] focus:ring-gray-600 placeholder-gray-500' : 'border bg-gray-100 border-gray-300 focus:ring-slate-500'} w-full px-3 py-2 mt-1 mb-1 rounded-md focus:outline-none focus:ring-1 sm:text-sm`}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none`}
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center mt-6">
          <span className={`${mode === 'dark' ? 'text-gray-400 bg-black bg-opacity-50' : 'text-gray-500 bg-white'} absolute px-2`}>or</span>
          <div className={`${mode === 'dark' ? 'border-gray-700' : 'border-gray-300'} w-full border-t`}></div>
        </div>
        <div className="flex justify-around items-center">
          <button
            type="button"
            className={`${mode === 'dark' ? 'text-gray-100 bg-[#16171C] hover:bg-opacity-90' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm`}
          >
            <FcGoogle className='h-5 w-5' />
          </button>
          <button
            type="button"
            className={`${mode === 'dark' ? 'text-gray-100 bg-[#16171C] hover:bg-opacity-90' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm`}
          >
            <FaGithub className='h-5 w-5' />
          </button>
        </div>
        <div className='flex justify-center'>
          <span className={`${mode === 'dark' ? 'text-gray-400' : 'text-slate-600'} text-sm`}>Don&apos;t have an account?
            <span className={`${mode === 'dark' ? 'text-white' : 'text-black'} text-sm ml-1 hover:underline cursor-pointer`}>Sign Up</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
