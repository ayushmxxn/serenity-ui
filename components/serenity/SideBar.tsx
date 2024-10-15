'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CgComponents } from "react-icons/cg";
import { GeistSans } from 'geist/font/sans';






// For Sidebar
const componentsList = [
  { name: 'Testimonials', url: '/components/testimonials', subComponents: ['Voice Testimonial', 'Star Rating Testimonial', 'Username Testimonial', '3D Book Testimonial', 'Typewriter Testimonial'] },
  { name: 'Pricing', url: '/components/pricing', subComponents: ['Pricing Section'] },
  { name: 'Authentication', url: '/components/authentication', subComponents: ['Signup Form', 'SignUp Form V2', 'SignIn Form', 'Forgot Password', 'Email', 'Otp', 'Create New Password', 'Password Changed'] },
  { name: 'Carousels', url: '/components/carousels', subComponents: ['Image Carousel', 'Video Carousel', 'Carousel 360'] },
  { name: 'Navbars', url: '/components/navbars', subComponents: ['Tubelight Navbar'] },
  { name: 'Cards', url: '/components/cards', subComponents: [ 'Spotlight Card', 'Swipe Card', 'Project Cards', 'Glow Card', '3D Flip Card']},

];

const additionalComponentsList = [
  { name: 'Inputs', url: '/components/inputs', subComponents: [] },
  { name: 'Dock', url: '/components/dock', subComponents: [] },
  { name: 'Feature Section', url: '/components/featuresection', subComponents: [] },
  { name: 'Shortcut Modal', url: '/components/shortcutmodal', subComponents: []},
  { name: 'Code Block', url: '/components/codeblock', subComponents: []},
  { name: 'Image Gallery', url: '/components/imagegallery', subComponents: []},
  { name: 'Film Roll', url: '/components/filmroll', subComponents: []},
  { name: 'Drawer', url: '/components/drawer', subComponents: []},
  { name: 'Footer', url: '/components/footer', subComponents: []},
  { name: 'NewsLetter', url: '/components/newsletter', subComponents: [] },
  { name: 'Cookie', url: '/components/cookie', subComponents: [] },
  { name: 'WaitList', url: '/components/waitlist', subComponents: [] },
  { name: 'TechStack', url: '/components/techstack', subComponents: [] },
  { name: 'Toast', url: '/components/toast', subComponents: [] },
  { name: 'Steps', url: '/components/steps', subComponents: [] },
  { name: 'Brands', url: '/components/brandsection', subComponents: [] },
  { name: 'Star Rating', url: '/components/starrating', subComponents: [] },
  { name: 'Buttons', url: '/components/buttons', subComponents: [] },
  { name: 'Toggle', url: '/components/toggle', subComponents: [] }
];

const SideBar: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSection = (name: string) => {
    if (expandedSection === name) {
      setExpandedSection(null);
    } else {
      setExpandedSection(name);
    }
  };

  const itemVariants = {
    hover: { scale: 1.05, x: 10, transition: { type: 'spring', stiffness: 300 } },
  };

  const subComponentVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
  };

  return (
    <aside
      className={`${GeistSans.className} bg-zinc-950 backdrop-blur-lg w-64 pt-24 pb-8 border-r border-zinc-900 text-white hidden md:flex flex-col h-screen`}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 40,
        overflow: 'hidden',
      }}
    >
      <div className="pl-5 h-full overflow-y-auto overflow-x-hidden pr-4">
        <nav>
          <motion.div className="flex flex-col space-y-1">
  <div className="flex items-center space-x-2 text-purple-300">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

    <h2 className="text-sm font-medium text-white mb-1 ">Getting Started</h2>
   
  </div>
  
  <div className="flex items-center space-x-2">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>

    <Link
      prefetch
      href="/docs/introduction"
      className={`hover:text-gray-300   py-1 rounded-md transition-colors text-sm ${pathname === '/docs/introduction' ? 'text-white' : 'text-gray-400'} block`}
    >
      Introduction
    </Link>
  </div>

  <div className="flex items-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
    </svg>
    <Link
      prefetch
      href="/docs/installation"
      className={`hover:text-gray-300 py-1 rounded-md transition-colors text-sm ${pathname === '/docs/installation' ? 'text-white' : 'text-gray-400'} block`}
    >
      Installation
    </Link>
  </div>
</motion.div>

          <div className="mt-8">
            <div className='flex  items-center mb-1 text-purple-300'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
              </svg>
            <h2 className="text-sm font-medium text-white pl-2 ">Components</h2>
            </div>
            
            
            {componentsList.map((component, index) => (
              <motion.div key={index}>
                <span
                  className="flex items-center justify-between py-1 rounded-md transition-colors text-sm text-gray-400 cursor-pointer"
                  onClick={() => toggleSection(component.name)}
                >
                  {component.name}
                  {expandedSection === component.name ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </span>
                {expandedSection === component.name && (
                  <motion.div
                    className="ml-1 mt-1 mb-5"
                    initial="hidden"
                    animate="visible"
                    variants={subComponentVariants}
                  >
                    {component.subComponents.map((subComponent, idx) => (
                      <Link prefetch key={idx} href={`${component.url}/${subComponent.replace(/\s+/g, '').toLowerCase()}`}>
                        <motion.span
                          className={`flex items-center hover:text-gray-300 py-1 rounded-md transition-colors text-xs ${pathname === `${component.url}/${subComponent.replace(/\s+/g, '').toLowerCase()}` ? 'text-white' : 'text-gray-400'}`}
                          
                          variants={itemVariants}
                        >
                         <CgComponents className="mr-1 h-4 w-4"/>

                          
                          {subComponent}
                        </motion.span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="">
           
            {additionalComponentsList.map((component, index) => (
              <motion.div key={index}  variants={itemVariants}>
                <Link prefetch href={component.url}>
                  <span className={`hover:text-gray-300  py-1 rounded-md transition-colors text-sm ${pathname === component.url ? 'text-white' : 'text-gray-400'} block`}>
                    {component.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
