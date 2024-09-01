'use client'
import React, { useState } from 'react'
import ProjectCardSlate from './components/ProjectCardSlate';
import ProjectCardGlass from './components/ProjectCardGlass';
import ProjectCardBlack from './components/ProjectCardBlack';
import PropsTable from '@/components/serenity/Table';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { motion } from 'framer-motion';



// Porps data for component
const ProjectCardContentBlack = [
  {
    title: "Project Name",
    description: "Beautifully crafted UI components to elevate your web projects",
    technologies: ['Next.js', 'Tailwind', 'TypeScript'],
    techColors: ['#818CF8', '#38B2AC', '#3178C6'],
    imageUrl: "https://images.unsplash.com/photo-1717954681473-2b3c638fbd19?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    projectUrl: "https://i.imgur.com/VRtqhGC.png",
    githubUrl: "https://i.imgur.com/VRtqhGC.png"
  },
]

const ProjectCardContentSlate = [
  
  {
    title: "Project Name",
    description: "Beautifully crafted UI components to elevate your web projects",
    technologies: ['Next.js', 'Tailwind', 'TypeScript'],
    techColors: ['#818CF8', '#38B2AC', '#3178C6'],
    imageUrl: "https://images.unsplash.com/photo-1714547808442-e4199a7f8e09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
    projectUrl: "https://i.imgur.com/VRtqhGC.png",
    githubUrl: "https://i.imgur.com/VRtqhGC.png"
  },
 
]
const ProjectCardContentGlass = [
  {
    title: "Project Name",
    description: "Beautifully crafted UI components to elevate your web projects",
    technologies: ['Next.js', 'Tailwind', 'TypeScript'],
    techColors: ['#818CF8', '#38B2AC', '#3178C6'],
    imageUrl: "https://images.unsplash.com/photo-1698334982217-9c64fee58f9f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==",
    projectUrl: "https://i.imgur.com/VRtqhGC.png",
    githubUrl: "https://i.imgur.com/VRtqhGC.png"
  }
]



// Source code for black card
const sourcecodeblack = `
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

interface ProjectCard {
  title: string;
  description: string;
  technologies: string[];
  techColors: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  ProjectCardContent: ProjectCard[];
}

const ProjectCardBlack = ({ ProjectCardContent }: ProjectCardProps) => {
  return (
    <div className='flex justify-center items-center py-10'>
      {ProjectCardContent.map((project, index) => (
        <div key={index} className="bg-black bg-opacity-30 border border-zinc-500 w-[350px] shadow-lg rounded-xl overflow-hidden backdrop-filter backdrop-blur-lg">
          <div>
            <div className="relative h-60 overflow-hidden rounded-t-xl">
              <Link href={project.projectUrl} target='_blank'>
                <span className="block h-full w-full">
                  <Image
                    src={project.imageUrl}
                    alt="Project Thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                </span>
              </Link>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-2 text-slate-100">{project.title}</h2>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 cursor-pointer hover:text-gray-500">
                  <FaGithub />
                </a>
              </div>
              <div className="flex flex-wrap items-center">
                {project.technologies.map((techstack, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center text-gray-400 px-3 text-xs py-1 border border-gray-500 rounded-full mr-2 mb-2"
                  >
                    <div
                      className="rounded-full h-2 w-2 mr-2"
                      style={{ backgroundColor: project.techColors[techIndex % project.techColors.length] }}
                    ></div>
                    {techstack}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-zinc-400 mb-3">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCardBlack;
`;

// Source code for Slate card
const sourcecodeslate = `
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

interface ProjectCard {
  title: string;
  description: string;
  technologies: string[];
  techColors: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  ProjectCardContent: ProjectCard[];
}

const ProjectCardSlate = ({ ProjectCardContent }: ProjectCardProps) => {
  return (
    <div className='flex justify-center items-center py-10'>
      {ProjectCardContent.map((project, index) => (
        <div key={index} className="bg-gray-900 bg-opacity-50 border border-gray-700 w-[350px] shadow-lg rounded-xl overflow-hidden backdrop-filter backdrop-blur-lg">
          <div>
            <div className="relative h-60 overflow-hidden rounded-t-xl">
              <Link href={project.projectUrl} target='_blank'>
                <span className="block h-full w-full">
                  <Image
                    src={project.imageUrl}
                    alt="Project Thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                </span>
              </Link>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-2 text-slate-100">{project.title}</h2>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 cursor-pointer hover:text-gray-500">
                  <FaGithub />
                </a>
              </div>
              <div className="flex flex-wrap items-center">
                {project.technologies.map((techstack, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center text-gray-400 bg-gray-800 px-3 text-xs py-1 rounded-full mr-2 mb-2"
                  >
                    <div
                      className="rounded-full h-2 w-2 mr-2"
                      style={{ backgroundColor: project.techColors[techIndex % project.techColors.length] }}
                    ></div>
                    {techstack}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-zinc-400 mb-3">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCardSlate;

`;


// Source code for Glass card
const sourcecodeglass = `
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardContent {
  title: string;
  description: string;
  technologies: Array<string>;
  techColors: Array<string>;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  ProjectCardContent: Array<ProjectCardContent>;
}

const ProjectCardGlass: React.FC<ProjectCardProps> = ({ ProjectCardContent }) => {
  return (
    <div className='flex justify-center items-center py-10'> 
      {ProjectCardContent.map((project, index) => (
        <div key={index} className="relative bg-gray-800/30 border border-gray-600 w-[350px] shadow-lg rounded-xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src={project.imageUrl} 
              alt="Project Background" 
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
  
          {/* Content Area */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header Section */}
            <div className="p-4">
              <Link href={project.projectUrl} target='_blank'>
                <div className="relative h-52 overflow-hidden rounded-xl">
                  <Image 
                    src={project.imageUrl} 
                    alt="Project Thumbnail" 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </Link>  
            </div>
  
            {/* Footer Section */}
            <div className="p-4 flex flex-col bg-gray-800/30 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-b-xl">
              {/* Footer Content */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                <Link href={project.githubUrl} target='_blank'>
                  <FaGithub className="text-gray-400 cursor-pointer hover:text-gray-500" />
                </Link>
              </div>
  
              {/* Technologies */}
              <div className='flex justify-start items-center flex-wrap'>
                {project.technologies.map((techstack, index) => (
                  <div key={index} className='flex items-center text-gray-400 px-3 text-xs py-1 border border-gray-500 rounded-full mr-2 mb-2'>
                    <div className="rounded-full h-2 w-2 mr-2" style={{ backgroundColor: project.techColors[index % project.techColors.length] }}></div>
                    {techstack}
                  </div>
                ))}
              </div>
              {/* Description */}
              <div className='mt-3'>
                <p className="text-gray-300 mb-3">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCardGlass;
`;


// Props Data
const propsData = [
    { name: 'title', type: 'string', description: 'Name of the project'},
    { name: 'description', type: 'string', description: 'Description of the project' },
    { name: 'technologies', type: 'string[]', description: 'Technologies used in a project' },
    { name: 'techColors', type: 'string[]', description: 'Color symbol for each technology' },
    { name: 'imageUrl', type: 'number', description: 'Image of the project'},
    { name: 'projectUrl', type: 'string', description: 'Link to your project'},
    { name: 'githubUrl', type: 'string', description: 'Github URL of your project'}
  ]


function ProjectCardPage() {
  const [activeTab, setActiveTab] = useState('Preview');
  const [activeColor, setActiveColor] = useState('Black');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleColorChange = (color: React.SetStateAction<string>) => {
    setActiveColor(color);
  };

  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStep(step);
        setTimeout(() => setCopiedStep(null), 2000);
      },
      () => alert('Failed to copy.')
    );
  };

  const getCommand = () => {
  if (activeTab === 'Preview') {
    switch (activeColor) {
      case 'Black':
        return 'npx @ayushmxxn/serenity-ui@latest add projectcard-black';
      case 'Slate':
        return 'npx @ayushmxxn/serenity-ui@latest add projectcard-slate';
      case 'Glass':
        return 'npx @ayushmxxn/serenity-ui@latest add projectcard-glass';
      default:
        return '';
    }
  }
  return '';
};


  const files = [
  {
    title: 'Example.tsx',
    code: `import React from 'react'
import ProjectCardBlack from './components/ui/ProjectcardBlack'

const ProjectCardContentBlack = [
  {
    title: "Serenity UI",
    description: "Stunning, customizable and open-source components for your next app. Time to give your code a vacation.",
    technologies: ['Next.js', 'Tailwind', 'TypeScript'],
    techColors: ['#818CF8', '#38B2AC', '#3178C6'],
    imageUrl: "https://images.unsplash.com/photo-1717954681473-2b3c638fbd19?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    projectUrl: "https://i.imgur.com/VRtqhGC.png",
    githubUrl: "https://i.imgur.com/VRtqhGC.png"
  },
]

function page() {
  return (
    <div>
      <ProjectCardBlack ProjectCardContent={ProjectCardContentBlack}/>
    </div>
  )
}

export default page;
`,
  },
];

  return (
    <div className='bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Project Cards</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400'>Project Card Component that you can use in your portfolio websites <br /> to showcase what you have built.</p>
      </div>
      <div className='flex flex-col items-start mt-10'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center space-x-4'>
            <button
              className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Preview' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
              onClick={() => handleTabChange('Preview')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Preview
            </button>
            <button
              className={`flex items-center text-white px-3 py-1 rounded-md ${activeTab === 'Code' ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-800 text-white border-b-2 border-zinc-600' : ''}`}
              onClick={() => handleTabChange('Code')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>
              Code
            </button>
          </div>
          <div className='flex justify-end items-center gap-2'>
            <div className='mr-3'>
              <div className='flex items-center justify-center gap-2'>
                <div onClick={() => handleColorChange('Black')} className={`bg-black rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'Black' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
                <div onClick={() => handleColorChange('Slate')} className={`bg-slate-800 rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'Blue' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
                <div onClick={() => handleColorChange('Glass')} className={`bg-white/20 rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'Pink' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2'>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                {activeColor === 'Black' && <ProjectCardBlack ProjectCardContent={ProjectCardContentBlack}/>}
                {activeColor === 'Slate' && <ProjectCardSlate ProjectCardContent={ProjectCardContentSlate}/>}
                {activeColor === 'Glass' && <ProjectCardGlass ProjectCardContent={ProjectCardContentGlass}/>}
              </div>
            )}
            {activeTab === 'Code' && (
              <div>
                {activeColor === 'Black' && <SerenitySourceCodeBlock codeString={sourcecodeblack} language="javascript"/>}
                {activeColor === 'Slate' && <SerenitySourceCodeBlock codeString={sourcecodeslate} language="javascript"/>}
                {activeColor === 'Glass' && <SerenitySourceCodeBlock codeString={sourcecodeglass} language="javascript"/>}
              </div>
            )}
          </div>
        </div>
        <div className='pt-20 py-3 text-xl font-semibold'>
        <div className='flex items-center'>
            <div className='mr-2 sm:pl-4'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            </div>
            Installation
        </div>
        </div>
        <div>
          <div className='relative'>
                  <pre className='bg-[#18181B] p-3 sm:ml-4 rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px] border border-zinc-700'>
                    {activeTab === 'Preview' && (
                    <div>
                      {activeColor === 'Black' && <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add projectcard-black</code>}
                      {activeColor === 'Slate' && <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add projectcard-slate</code>}
                      {activeColor === 'Glass' &&  <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add projectcard-glass</code>}
                    </div>
                    )}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(getCommand(), 1)}
                    className='absolute right-0 top-2 p-2 w-10 h-auto bg-[#18181B] rounded border-r border-zinc-700'
                    aria-label='Copy command'
                  >
                    {copiedStep ? (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#4ADE80"
                      className="w-4 h-4"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 1.1, 1], opacity: [1, 1, 1] }}
                      transition={{ duration: 0.6 }} // Adjust duration if needed
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </motion.svg>
                  ) : (
                    <span className='relative -top-1 -left-1'>
                      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M9.75 12.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        <path d="M9.75 15.25H14.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      </svg>
                    </span>
                  )}
                  </button>
            </div>
        </div>
         <div className='flex items-center pt-20 py-3 sm:pl-4 text-xl font-semibold'>
           <div className='mr-2'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>
            </div>
            Usage        
        </div>
        <SerenityExampleBlock files={files}/>
      </div>
      <div className="container mx-auto p-1 sm:p-4 mt-20">
        <div className='flex items-center mb-3'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <h1 className="text-xl font-semibold ml-2">Props</h1>
        </div>
        <PropsTable propsData={propsData} />
      </div>
    </div>
  )
}

export default ProjectCardPage;
