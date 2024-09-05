'use client'
import ShowcaseCard from "@/components/serenity/ShowcaseCard";
import VoiceTestimonialCardThumbnail from '@/app/images/thumbnails/VoiceTestimonialCardThumbnail.png';
import PricingThumbnail from '@/app/images/thumbnails/PricingThumbnail.png';
import AuthenticationThumbnail from '@/app/images/thumbnails/AuthenticationThumbnail.png';
import TestimonialVoiceTipThumbnail from '@/app/images/thumbnails/TestimonialVoiceTipThumbnail.png';
import BookTestimonialThumbnail from '@/app/images/thumbnails/3DBookThumbnailtest.png';
import TubeLightNavbarThumbnail from '@/app/images/thumbnails/TubeLightNavbarThumbnailtest.png';
import TechStackThumbnail from '@/app/images/thumbnails/TechStackThumbnailtest.png';
import WaitlistThumbnail from '@/app/images/thumbnails/WaitlistThumbnailtest.png';
import CarouselThumbnail from '@/app/images/thumbnails/CarouselThumbnailtest.png';
import NewsletterThumbnail from '@/app/images/thumbnails/NewsletterThumbnailtest.png';
import SpotLightCardThumbnail from '@/app/images/thumbnails/SpotLightCardThumbnail.png';
import SwipeCardThumbnail from '@/app/images/thumbnails/SwipeCardThumbnail.png';
import GlowCardThumbnail from '@/app/images/thumbnails/GlowCardThumbnail.png';
import DockThumbnail from '@/app/images/thumbnails/DockThumbnail.png';
import ShortcutModalThumbnail from '@/app/images/thumbnails/ShortcutModalThumbnail.png';
import CodeBlockThumbnail from '@/app/images/thumbnails/CodeBlockThumbnail.png';
import ImageGallaryThumbnail from '@/app/images/thumbnails///ImageGallaryThumbnail.png';
import InputsThumbnail from '@/app/images/thumbnails/InputsThumbnail.png';
import VideoCarousel from '@/app/images/thumbnails/VideoCarousel.png';
import FlipCard3D from '@/app/images/thumbnails/FlipCard3DThumbnail.png';
import Link from "next/link";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin'] });


const ShowcaseCardContent = [
     {
      title: "NewsLetter Card",
      description: "NewsLetter component designed to display a newsletter subscription form with animation transitions using Framer Motion.",
      imageUrl: NewsletterThumbnail,
      projectUrl: "/components/newsletter"
    },
    {
      title: "WaitList",
      description: "Streamline Your User Engagement with Our Modern Waitlist Component. With Light and Dark Mode Support.",
      imageUrl: WaitlistThumbnail,
      projectUrl: "/components/waitlist"
    },
    {
      title: "TubeLight Navbar",
      description: "Trendy and Responsive navigation bar with tabbed links and a dynamic tubelight effect.",
      imageUrl: TubeLightNavbarThumbnail,
      projectUrl: "/components/navbars/tubelightnavbar"
    },
    {
      title: "Pricing Section",
      description: "Modern Pricing Sections designed to convert your customers. Available in 3 different Themes.",
      imageUrl: PricingThumbnail,
      projectUrl: "/components/pricing/pricingsection"
    },
    {
      title: "Voice Testimonial",
      description: "This VoiceTestimonial component displays user testimonials with audio playback and animated visual effects.",
      imageUrl: VoiceTestimonialCardThumbnail,
      projectUrl: "/components/testimonials/voicetestimonial"
    },
    {
      title: "Authentication Kit",
      description: "Complete Authentication Kit to Build a Seamless Auth Workflow with Light and Dark Mode Support.",
      imageUrl: AuthenticationThumbnail,
      projectUrl: "/components/authentication/signupform"
    },
    {
      title: "Typewriter Testimonial",
      description: "This Typewriter Testimonial displays your testimonials in an interactive way. Combining audio and a typewriter effect.",
      imageUrl: TestimonialVoiceTipThumbnail,
      projectUrl: "/components/testimonials/typewritertestimonial"
    },
    {
      title: "3D Book Testimonial",
      description: "This Book Testimonial is a unique way to showcase testimonials. Allowing Users to flip through pages of a book.",
      imageUrl: BookTestimonialThumbnail,
      projectUrl: "/components/testimonials/3dbooktestimonial"
    },
   
    {
      title: "TechStack Card",
      description: "Techstack component displaying a list of technologies you are good at with an interactive hover effect.",
      imageUrl: TechStackThumbnail,
      projectUrl: "/components/techstack"
    },
    {
      title: "3D Flip Card",
      description: "A 3D card stack with cool 3D hover effects. Make your stuff look cool",
      imageUrl: FlipCard3D,
      projectUrl: "/components/cards/3dflipcard"
    },
    {
      title: "Spotlight Card",
      description: "Use this card for highlighting product features or services with a dynamic and interactive spotlight effect.",
      imageUrl: SpotLightCardThumbnail,
      projectUrl: "/components/cards/spotlightcard"
    },
    {
      title: "Swipe Cards",
      description: "Swipe Card to add to add some fun to your website.",
      imageUrl: SwipeCardThumbnail,
      projectUrl: "/components/cards/swipecard"
    },
    {
      title: "Glow Cards",
      description: "Cards that glow when you hover over them.",
      imageUrl: GlowCardThumbnail,
      projectUrl: "/components/cards/glowcard"
    },
    {
      title: "Dock",
      description: "Animated Dock component with pre-built positioning setup for all 4 positions of the screen.",
      imageUrl: DockThumbnail,
      projectUrl: "/components/dock"
    },
    {
      title: "Shortcut Modal",
      description: "Use the ShortcutModal component to display and manage keyboard shortcuts, with support for light and dark themes.",
      imageUrl: ShortcutModalThumbnail,
      projectUrl: "/components/shortcutmodal"
    },
    {
      title: "CodeBlock",
      description: "CodeBlock component for switching between multiple code files, with syntax highlighting, file icons, and copy code functionality.",
      imageUrl: CodeBlockThumbnail,
      projectUrl: "/components/codeblock"
    },
    {
      title: "Inputs",
      description: "Copy-Paste these inputs into your projects and make them look cool.",
      imageUrl: InputsThumbnail,
      projectUrl: "/components/inputs"
    },
    {
      title: "Video Carousel",
      description: "Video Carousel with automatic playback and manual navigation controls, providing an engaging way to present video content.",
      imageUrl: VideoCarousel,
      projectUrl: "/components/carousels/videocarousel"
    },
    {
      title: "Image Carousel",
      description: "Image carousel with smooth transitions and previews of adjacent images.",
      imageUrl: CarouselThumbnail,
      projectUrl: "/components/carousels/imagecarousel"
    },
    {
      title: "Image Gallary",
      description: "Interactive image gallery that displays images in a grid, click on an image to view it in a modal with a smooth transition.",
      imageUrl: ImageGallaryThumbnail,
      projectUrl: "/components/imagegallery"
    },
  ];


function ComponentsPage() {

  return (
   <div className={`${inter.className} bg-black text-white backdrop-blur-md w-full h-full pt-28 overflow-auto p-5`}>
      <div className='max-w-screen-lg mx-auto'>
        <h1 className={`text-4xl font-bold text-center `}>Explore Components</h1>
        <div className='flex  justify-center mt-5 '>
          <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
            <span>
              <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-800" />
            <Link  href={'https://discord.gg/kzk6uWey3g'} target="_blank" className="z-10 py-0.5 text-sm text-neutral-100 flex justify-center items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-yellow-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span>Request a component</span>
            </Link>
          </button>
        </div>
      </div>
      <ShowcaseCard ShowcaseCardContent={ShowcaseCardContent}/>
    </div>
  )
}

export default ComponentsPage;
