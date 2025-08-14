"use client";
import Link from "next/link";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  // Hide footer if path is /templates
  if (pathname === "/templates") {
    return null;
  }

  return (
    <footer
      className={`${GeistSans.className} font-medium text-sm text-neutral-400 bg-[#0E0F11] border-t border-neutral-800 py-6 px-4 sm:px-6`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p>
          Built by
          <Link
            href="https://ayushmxxn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-neutral-300 hover:text-neutral-100 underline underline-offset-2 transition-colors duration-200"
          >
            Ayushmaan Singh
          </Link>
          . The source code is available on
          <Link
            href="https://github.com/ayushmxxn/serenity-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-neutral-300 hover:text-neutral-100 underline underline-offset-2 transition-colors duration-200"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
