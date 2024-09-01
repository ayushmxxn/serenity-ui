import React from 'react'

type mode = "light" | "dark"

interface Mode {
    mode: mode;
}

const handleAccept = () => {
// Here you can write your logic
}

const handleReject = () => {
// Here you can write your logic
}

function Cookie({mode}: Mode) {
  return (
    <div className='flex justify-center items-center py-20'>
      <div className={`${mode === 'dark'? 'bg-black border border-zinc-600' : 'bg-white'}  w-[350px]   text-white p-4 rounded-lg shadow-lg z-50`}>
        <div className='flex  justify-center gap-3'>
            <svg width="96" height="32" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_488_58)">
                <g clip-path="url(#clip1_488_58)">
                <path d="M87.8 43.96C80.64 43.84 73 36.16 77.08 27.08C65.16 31.08 54 20.72 56.32 8.84002C27.8 2.84002 8 26.32 8 48C8 70.08 25.92 88 48 88C71.56 88 90.16 67.68 87.8 43.96ZM34 60C30.68 60 28 57.32 28 54C28 50.68 30.68 48 34 48C37.32 48 40 50.68 40 54C40 57.32 37.32 60 34 60ZM42 40C38.68 40 36 37.32 36 34C36 30.68 38.68 28 42 28C45.32 28 48 30.68 48 34C48 37.32 45.32 40 42 40ZM60 64C57.8 64 56 62.2 56 60C56 57.8 57.8 56 60 56C62.2 56 64 57.8 64 60C64 62.2 62.2 64 60 64Z" fill={`${mode === 'dark'? '#D1D5DB' : '#6B7280'}`}/>
                </g>
                </g>
                <defs>
                <clipPath id="clip0_488_58">
                <rect width="96" height="96" fill="white"/>
                </clipPath>
                <clipPath id="clip1_488_58">
                <rect width="96" height="96" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <div>
                <span className={`text-sm ${mode === 'dark'? 'text-white' : 'text-black'}`}>This website uses cookies to ensure you get the best experience. By continuing to browse, you agree to our use of cookies.</span>
            <div className='flex items-center  gap-3 mt-3 '>
                <button onClick={handleAccept} className='whiteshimmerbtn  text-sm'>Accept</button>
                <button onClick={handleReject} className='bubbleeffectbtn text-sm'>Reject</button>
            </div>
            </div>
            
        </div>
        
      </div>
    </div>
  )
}

export default Cookie;
