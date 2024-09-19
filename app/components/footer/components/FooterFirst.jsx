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