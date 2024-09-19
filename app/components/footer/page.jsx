'use client'
import React, { useState } from 'react'
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import FooterFirst from './components/FooterFirst'
import FooterSecond from './components/FooterSecond'
import FooterThird from './components/FooterThird'

// Source Code for each footer
const sourceCodeFirst = `
import React from 'react';
import { Twitter, Facebook, Youtube, Linkedin, Github } from 'lucide-react';

// Change this with your own data
const footerData = {
  brandName: 'BrandName',
  columns: [
    {
      title: 'About Us',
      links: [
        { text: 'Our Story', href: '#' },
        { text: 'Leadership', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Consulting', href: '#' },
        { text: 'Development', href: '#' },
        { text: 'Design', href: '#' },
        { text: 'Support', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: '#' },
        { text: 'Webinars', href: '#' },
        { text: 'Case Studies', href: '#' },
        { text: 'Documentation', href: '#' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        { text: 'Sales', href: '#' },
        { text: 'Support', href: '#' },
        { text: 'General Inquiries', href: '#' },
        { text: 'Feedback', href: '#' },
      ],
    },
  ],
  socialLinks: [
    { href: 'https://x.com/ayushmxxn', icon: <Twitter size={20} /> },
    { href: '#', icon: <Facebook size={20} /> },
    { href: '#', icon: <Youtube size={20} /> },
    { href: '#', icon: <Linkedin size={20} /> },
    { href: 'https://github.com/ayushmxxn', icon: <Github size={20} /> },
  ],
};

const FooterLink = ({ href, children, target, rel }) => (
  <a href={href} className="text-gray-700 hover:text-gray-600 text-sm" target={target} rel={rel}>
    {children}
  </a>
);

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col space-y-2">
    <h3 className="text-gray-800 font-semibold mb-1">{title}</h3>
    {links.map((link, index) => (
      <FooterLink key={index} href={link.href}>
        {link.text}
      </FooterLink>
    ))}
  </div>
);

const Footer = () => {
  const { brandName, columns, socialLinks } = footerData;

  return (
    <footer className="bg-white text-gray-800 py-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">{brandName}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-14 xl:gap-16 mb-3">
            {columns.map((column, index) => (
              <FooterColumn key={index} title={column.title} links={column.links} />
            ))}
          </div>
        </div>

        {/* Centered Brand Name, Year, and Icons */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:justify-between">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} {brandName}, Inc.
            </div>
            <div className="flex space-x-4 md:space-x-6">
              {socialLinks.map((social, index) => (
                <FooterLink key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
`;

const sourceCodeSecond = `
import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaDiscord, FaHome } from 'react-icons/fa';
import { RiTwitterXFill } from "react-icons/ri";

const FooterSecond = () => {

  const brandDetails = {
    brandIcon: <FaHome className="w-6 h-6 text-gray-600" />,
    brandName: 'BrandName',
    address: '2261 Market Street #5039 San <br /> Francisco, CA 94114',
  };

  const socialIcons = [
    { name: 'Twitter', icon: <RiTwitterXFill className="w-5 h-5" />, link: 'https://x.com/ayushmxxn' },
    { name: 'GitHub', icon: <FaGithub className="w-5 h-5" />, link: 'https://github.com/ayushmxxn' },
    { name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" />, link: 'https://linkedin.com' },
    { name: 'Discord', icon: <FaDiscord className="w-5 h-5" />, link: 'https://discord.com/invite/kzk6uWey3g' },
  ];

  const footerSections = [
    {
      title: 'Product',
      links: [
        { text: 'Features', url: '/features' },
        { text: 'Pricing', url: '/pricing' },
        { text: 'Case Studies', url: '/case-studies' },
        { text: 'Reviews', url: '/reviews' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', url: '/about' },
        { text: 'Careers', url: '/careers' },
        { text: 'Contact', url: '/contact' },
        { text: 'Blog', url: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', url: '/documentation' },
        { text: 'Help Center', url: '/help-center' },
        { text: 'API Reference', url: '/api-reference' },
        { text: 'Status', url: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', url: '/privacy-policy' },
        { text: 'Terms of Service', url: '/terms-of-service' },
        { text: 'Cookie Policy', url: '/cookie-policy' },
        { text: 'GDPR', url: '/gdpr' },
      ],
    },
  ];

  
  return (
    <footer className="bg-white text-gray-800 py-8 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              {brandDetails.brandIcon}
              <span className="text-xl font-bold ml-2">{brandDetails.brandName}</span>
            </div>
            <p className="text-sm mb-4" dangerouslySetInnerHTML={{ __html: brandDetails.address }} />
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.name}
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8 ">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.url} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSecond;
`;

const sourceCodeThird = `
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

// Chnage this with your own data
const defaultNavigationLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const defaultSocialLinks = [
  { href: "https://facebook.com", icon: <Facebook size={24} />, hoverColor: "text-gray-600" },
  { href: "https://x.com/ayushmxxn", icon: <Twitter size={24} />, hoverColor: "text-gray-600" },
  { href: "https://linkedin.com", icon: <Linkedin size={24} />, hoverColor: "text-gray-600" },
  { href: "https://github.com/ayushmxxn", icon: <Github size={24} />, hoverColor: "text-gray-600" },
];

const FooterThird = ({
  brandName = "BrandName",
  navigationLinks = defaultNavigationLinks,
  socialLinks = defaultSocialLinks,
}) => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/" className="text-gray-900 hover:text-gray-600">
              {brandName}
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gray-600">
                {link.label}
              </Link>
            ))}
          </div>
          {/* Social Icons */}
          <div className="flex flex-wrap justify-center space-x-4 text-gray-700">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={\`hover:\${social.hoverColor || 'text-gray-600'}\`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 mt-5">
        <div className="mt-5 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        </div>
        </div>
        
      </div>
    </footer>
  );
};

export default FooterThird;
`;

function BrandsSectionPage() {
  const [activeTabFirst, setActiveTabFirst] = useState('Preview');
  const [activeTabSecond, setActiveTabSecond] = useState('Preview');
  const [activeTabThird, setActiveTabThird] = useState('Preview');

  const handleTabChange = (tab, setActiveTab) => {
    setActiveTab(tab);
  };

  const renderFooterSection = (activeTab, setActiveTab, FooterComponent, sourceCode) => (
    <div className='flex flex-col items-start mt-10'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center space-x-4'>
          <button
            className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Preview', setActiveTab)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Preview
          </button>
          <button
            className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
            onClick={() => handleTabChange('Code', setActiveTab)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
            Code
          </button>
        </div>
      </div>
      <div className='bg-black border rounded-lg border-zinc-800 w-full h-auto mt-3'>
        <div>
          {activeTab === 'Preview' && (
            <div>
              <FooterComponent />
            </div>
          )}
          {activeTab === 'Code' && (
            <div>
              <SerenitySourceCodeBlock codeString={sourceCode} language="javascript" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className='bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Footer</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 max-w-lg'>Fully Customizable Footer Sections ready to get copy-pasted into your apps.</p>
      </div>
      {renderFooterSection(activeTabFirst, setActiveTabFirst, FooterFirst, sourceCodeFirst)}
      {renderFooterSection(activeTabSecond, setActiveTabSecond, FooterSecond, sourceCodeSecond)}
      {renderFooterSection(activeTabThird, setActiveTabThird, FooterThird, sourceCodeThird)}
    </div>
  )
}

export default BrandsSectionPage;