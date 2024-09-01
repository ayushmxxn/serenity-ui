import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

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
    <div className={`${inter.className} flex justify-center items-center py-10`}> 
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
                <h2 className="text-lg font-medium text-white">{project.title}</h2>
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
