import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], weight: "500" });

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
    <div className={`${inter.className} flex justify-center items-center py-10`}>
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
                <h2 className="text-lg font-medium mb-2 text-slate-100">{project.title}</h2>
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
