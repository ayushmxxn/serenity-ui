'use client'
import React from 'react'
import { OTPInput, SlotProps } from 'input-otp'
import { cn } from '@/lib/utils'

type Mode = 'light' | 'dark'

interface Props {
  mode: Mode
}

function OtpForm({ mode }: Props) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className={`${mode === 'dark' ? 'bg-black border border-zinc-600' : 'bg-white'} h-[515px] w-96 rounded-lg p-8 z-50`}>
        <div className='flex justify-center items-center'>
          {mode === 'dark' ? 
            <svg width="120" height="120" viewBox="0 0 246 246" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M109.378 60.3047C112.657 45.7872 133.343 45.7872 136.622 60.3047V60.3047C138.747 69.7135 149.544 74.1858 157.7 69.0356V69.0356C170.284 61.0889 184.911 75.7156 176.964 88.2998V88.2998C171.814 96.4557 176.287 107.253 185.695 109.378V109.378C200.213 112.657 200.213 133.343 185.695 136.622V136.622C176.287 138.747 171.814 149.544 176.964 157.7V157.7C184.911 170.284 170.284 184.911 157.7 176.964V176.964C149.544 171.814 138.747 176.287 136.622 185.695V185.695C133.343 200.213 112.657 200.213 109.378 185.695V185.695C107.253 176.287 96.4557 171.814 88.2998 176.964V176.964C75.7156 184.911 61.0889 170.284 69.0356 157.7V157.7C74.1858 149.544 69.7135 138.747 60.3047 136.622V136.622C45.7872 133.343 45.7872 112.657 60.3047 109.378V109.378C69.7135 107.253 74.1858 96.4557 69.0356 88.2998V88.2998C61.0889 75.7156 75.7156 61.0889 88.2998 69.0356V69.0356C96.4557 74.1858 107.253 69.7135 109.378 60.3047V60.3047Z" fill="white"/>
              <path d="M96 126L111 142" stroke="black" strokeWidth="10" strokeLinecap="round"/>
              <path d="M111 142L155 106" stroke="black" strokeWidth="10" strokeLinecap="round"/>
            </svg>
          :
            <svg width="120" height="120" viewBox="0 0 246 246" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M109.378 60.3047C112.657 45.7872 133.343 45.7872 136.622 60.3047V60.3047C138.747 69.7135 149.544 74.1858 157.7 69.0356V69.0356C170.284 61.0889 184.911 75.7156 176.964 88.2998V88.2998C171.814 96.4557 176.287 107.253 185.695 109.378V109.378C200.213 112.657 200.213 133.343 185.695 136.622V136.622C176.287 138.747 171.814 149.544 176.964 157.7V157.7C184.911 170.284 170.284 184.911 157.7 176.964V176.964C149.544 171.814 138.747 176.287 136.622 185.695V185.695C133.343 200.213 112.657 200.213 109.378 185.695V185.695C107.253 176.287 96.4557 171.814 88.2998 176.964V176.964C75.7156 184.911 61.0889 170.284 69.0356 157.7V157.7C74.1858 149.544 69.7135 138.747 60.3047 136.622V136.622C45.7872 133.343 45.7872 112.657 60.3047 109.378V109.378C69.7135 107.253 74.1858 96.4557 69.0356 88.2998V88.2998C61.0889 75.7156 75.7156 61.0889 88.2998 69.0356V69.0356C96.4557 74.1858 107.253 69.7135 109.378 60.3047V60.3047Z" fill="black"/>
              <path d="M96 126L111 142" stroke="white" strokeWidth="10" strokeLinecap="round"/>
              <path d="M111 142L155 106" stroke="white" strokeWidth="10" strokeLinecap="round"/>
            </svg>
          }
        </div>
        <div className='mt-8'>
          <p className={`${mode === 'dark' ? 'text-slate-100' : 'text-black'} text-2xl font-semibold text-center mb-3`}>Verify your code</p>
          <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center text-sm mb-6`}>We have sent a code to your email johndoe@gmail.com</p>
        </div>
        <div className='flex justify-center mb-6'>
          <OTPInput
            maxLength={6}
            containerClassName="group flex items-center has-[:disabled]:opacity-30"
            render={({ slots }) => (
              <>
                <div className="flex">
                  {slots.slice(0, 3).map((slot, idx) => (
                    <Slot key={idx} {...slot} mode={mode} />
                  ))}
                </div>
                <FakeDash />
                <div className="flex">
                  {slots.slice(3).map((slot, idx) => (
                    <Slot key={idx} {...slot} mode={mode} />
                  ))}
                </div>
              </>
            )}
          />
        </div>
        <button
          type='submit'
          className={`${mode === 'dark' ? 'bg-gradient-to-b from-gray-100 to-gray-300 text-black' : 'bg-gray-800 text-white'} w-full py-2 rounded-md hover:bg-gradient-to-r hover:bg-gray-900 focus:outline-none`}
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <span className='font-medium'>Verify</span>
        </button>
        <div className='flex gap-1 mt-10 justify-center items-center'>
          <span className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Didn&lsquo;t receive code?</span>
          <span className={`${mode === 'dark' ? 'text-white' : 'text-black'} text-sm cursor-pointer`}>Resend</span>
        </div>
      </div>
    </div>
  )
}

function Slot(props: SlotProps & { mode: Mode }) {
  return (
    <div
      className={cn(
        props.mode === 'dark' ? 'text-white border-slate-300 group-hover:border-gray-200' : 'text-black border-slate-300 group-hover:border-gray-500',
        'relative w-10 h-14 text-[2rem]',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
        'group-focus-within:border-accent-foreground/20',
        'outline outline-0 outline-accent-foreground/20',
        { 'outline-2 outline-accent-foreground': props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret mode={props.mode} />}
    </div>
  )
}

function FakeCaret({ mode }: { mode: Mode }) {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className={`w-px h-8 ${mode === 'dark' ? 'bg-white' : 'bg-black'}`} />
    </div>
  )
}

function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border" />
    </div>
  )
}

export default OtpForm;