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
