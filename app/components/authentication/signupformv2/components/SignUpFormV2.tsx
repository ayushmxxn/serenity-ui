import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FormEvent } from 'react';

type mode = 'light' | 'dark'

interface Mode {
  mode: mode
}

const SignUpFormV2 = ({mode}: Mode) => {


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const email = formData.get('email')
    const password = formData.get('password')
    console.log({ firstname, lastname, email, password });
    event.currentTarget.reset();
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className={`${mode === 'dark'? 'bg-black border border-zinc-600' : 'bg-white'} p-8 space-y-8 border  rounded shadow-md w-96 z-50`}>
        <h2 className={`${mode === 'dark'? 'text-slate-100' : 'text-black'} text-2xl font-bold text-center text-black`}>Create My Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className='flex gap-5'>
            <div>
            <label htmlFor="firstname" className={`${mode === 'dark'? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium`}>
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="firstname"
              placeholder='First Name'
              required
              className={` ${mode === 'dark'? 'bg-[#16171C] ' : 'bg-gray-100 border border-gray-300 text-black'}  w-full  px-3 py-2 mt-1   rounded-md  focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm`}
            />
          </div>
            <div>
            <label htmlFor="lastname" className={`${mode === 'dark'? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium`}>
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="lastname"
              placeholder='Last Name'
              required
              className={`${mode === 'dark'? 'bg-[#16171C] ' : 'bg-gray-100 border border-gray-300 text-black'} w-full  px-3 py-2 mt-1  rounded-md  focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm`}
            />
          </div>
        </div>
          
          <div>
            <label htmlFor="email" className={`${mode === 'dark'? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium`}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder='Email address'
              required
              className={`${mode === 'dark'? 'bg-[#16171C] ' : 'bg-gray-100 border border-gray-300 text-black'} w-full px-3 py-2 mt-1 rounded-md  focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm`}
            />
          </div>
          <div>
            <label htmlFor="password" className={`${mode === 'dark'? 'text-gray-300' : 'text-gray-700'} block text-sm font-medium`}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder='Password'
              required
              className={`${mode === 'dark'? 'bg-[#16171C] ' : 'bg-gray-100 border border-gray-300 text-black'} w-full px-3 py-2 mt-1 mb-1  rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm`}
            />
           
          </div>
          <div>
            <button
              type="submit"
              className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none`}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center mt-6">
         <span className={`${mode === 'dark'? 'text-gray-400 bg-black bg-opacity-50' : 'text-gray-500 bg-white'} absolute px-2 `}>or</span>
          <div className={`${mode === 'dark'? 'border-gray-700' : 'border-gray-300'} w-full border-t `}></div>
        </div>
        <div className="flex justify-around  items-center">
          <button
            type="button"
            className={` ${mode === 'dark'? 'text-gray-100 bg-[#16171C] hover:bg-opacity-80' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm`}
          >
            <FcGoogle className='h-5 w-5' />
          </button>
          <button
            type="button"
            className={`${mode === 'dark'? 'text-gray-100 bg-[#16171C] hover:bg-opacity-80' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'} w-32 flex justify-center px-4 py-2 font-medium rounded-md shadow-sm`}
          >
            <FaGithub className='h-5 w-5'/>
          </button>
        </div>
        <div className='flex justify-center'>
             <span className={`${mode === 'dark'?  'text-gray-400' : 'text-slate-600'} text-sm`}>Already have an account?
            <span className={`${mode === 'dark'? 'text-slate-100' : 'text-black '} text-sm ml-1 hover:underline cursor-pointer`}>Sign In</span>
            </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormV2;
