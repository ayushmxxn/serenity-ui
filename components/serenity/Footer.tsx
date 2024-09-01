import Link from 'next/link'
import React from 'react'
import { Inter } from 'next/font/google';

const poppin = Inter({ subsets: ["latin"], weight: "500" });

function Footer() {
  return (
    <div className={`${poppin.className}`}>
      <div className="p-5 text-center bg-zinc-950 border-t border-zinc-900 shadow-lg ">
  <div className="text-sm text-zinc-400">
    Built by
    <Link href={'https://twitter.com/ayushmxxn'} target='_blank'>
      <span className="ml-1 underline underline-offset-4 text-zinc-300 hover:text-white transition duration-300">
        Ayushmaan Singh
      </span>
    </Link>
    . The source code is available on
    <Link href={'https://github.com/ayushmxxn/serenity-ui'} target='_blank'>
      <span className="ml-1 underline underline-offset-4 text-zinc-300 hover:text-white transition duration-300">
        Github
      </span>
    </Link>
  </div>
</div>
    </div>
  )
}

export default Footer;
