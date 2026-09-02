export interface ComponentSeoData {
  description: string;
  keywords: string[];
  features: string[];
  frameworks: string[];
  category: string;
}

export const COMPONENT_SEO_DATA: Record<string, ComponentSeoData> = {
  "portfolio-book": {
    description:
      "Interactive flippable sketch portfolio book component for React and Tailwind CSS featuring realistic page-turning physics, handwritten typography, and sound effects.",
    keywords: [
      "Portfolio Book React",
      "Interactive Book Component React",
      "Page Flip Animation React",
      "Framer Motion Book Flip",
      "Tailwind CSS Portfolio Component",
      "Interactive Sketchbook UI",
      "Creative Developer Portfolio",
    ],
    features: [
      "Realistic multi-sheet 3D page flip physics",
      "Custom handwriting typography and doodle animations",
      "Integrated audio feedback on page turning",
      "Fully responsive stacked paper depth illusion",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Interactive",
  },
  "vintage-keyboard": {
    description:
      "Retro mechanical typewriter and keyboard interactive simulator for React with synthesized mechanical key sounds, tactile keypress states, and Tailwind CSS.",
    keywords: [
      "Vintage Keyboard React",
      "Mechanical Keyboard Simulator",
      "Interactive Typing React",
      "Keyboard Sound Effects React",
      "Retro UI Component",
      "Tailwind Mechanical Keyboard",
      "Audio Web Component",
    ],
    features: [
      "Tactile 3D keypress states with smooth spring response",
      "Zero-dependency synthesized mechanical sound effects",
      "Live keyboard event listeners and active key highlighting",
      "Dark and light mode compatible design tokens",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Web Audio API"],
    category: "Interactive",
  },
  "flame-button": {
    description:
      "Organic flame and particle fire button component for React featuring GPU-accelerated canvas shaders, dynamic hover physics, and customizable glow.",
    keywords: [
      "Flame Button React",
      "Fire Particle Button",
      "Canvas Shader Button React",
      "Animated Glow Button",
      "Creative CTA Component",
      "Tailwind CSS Animated Button",
      "WebGL Particle Effects",
    ],
    features: [
      "GPU-accelerated organic fire particle simulation",
      "Interactive cursor tracking and intensity flare on hover",
      "Configurable flame color palette, speed, and particle count",
      "Lightweight canvas implementation with auto-pause off-screen",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "HTML5 Canvas"],
    category: "Buttons & CTAs",
  },
  "flip-card-3d": {
    description:
      "3D perspective hover flip card component for React with smooth spring-animated rotational tilt, dual-sided content reveal, and Tailwind CSS transforms.",
    keywords: [
      "3D Flip Card React",
      "Framer Motion Flip Card",
      "Perspective Hover Card",
      "Tailwind 3D Transform",
      "Interactive Card Component",
      "Dual Sided Card React",
    ],
    features: [
      "Hardware-accelerated 3D transform and perspective depth",
      "Smooth cursor hover rotation and click-to-flip interaction",
      "Customizable front and back faces with seamless layout transitions",
      "Touch device gesture compatibility",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Cards",
  },
  "brand-marquee": {
    description:
      "High-performance continuous logo marquee component for React with smooth edge-fade gradient masks, pause on hover, and dark mode support.",
    keywords: [
      "Brand Marquee React",
      "Infinite Logo Carousel",
      "Smooth Scrolling Marquee",
      "Tailwind CSS Marquee",
      "Social Proof Logo Ticker",
      "Pause on Hover Marquee",
    ],
    features: [
      "Silky 60fps CSS transform marquee animation",
      "Seamless gradient alpha masking on container edges",
      "Pause-on-hover interaction for better accessibility",
      "Flexible icon, SVG, and brand image support",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS"],
    category: "Social Proof",
  },
  "swipe-card": {
    description:
      "Interactive gesture-based swipeable stack card component for React with physics-driven drag velocity, auto-rotation, and touch gesture support.",
    keywords: [
      "Swipe Cards React",
      "Tinder Card Stack React",
      "Gesture Swipe Component",
      "Framer Motion Drag Cards",
      "Interactive Card Deck",
      "Mobile Gesture UI",
    ],
    features: [
      "Inertia and velocity-based gesture swipe physics",
      "Card stack depth illusion with rotation during drag",
      "Programmatic swipe left/right triggers and callback events",
      "Fluid spring reset animations for non-committal drags",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Interactive",
  },
  "image-carousel": {
    description:
      "Smooth 3D rotational perspective image carousel component for React with interactive dragging, depth scaling, and responsive layout.",
    keywords: [
      "3D Image Carousel React",
      "Perspective Carousel",
      "Framer Motion Carousel",
      "Interactive Image Slider",
      "Tailwind Photo Carousel",
      "Touch Image Slider",
    ],
    features: [
      "Curved 3D perspective layout with depth scale fading",
      "Smooth drag and mouse swipe navigation",
      "Keyboard arrow navigation and accessible focus management",
      "Next.js optimized image loading with blurred placeholders",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Media & Galleries",
  },
  "image-gallery": {
    description:
      "Modern masonry photo gallery component for React with fluid expand-to-fullscreen layout animations and high-resolution lightbox preview.",
    keywords: [
      "Image Gallery React",
      "Masonry Gallery Component",
      "Framer Motion Shared Layout",
      "Expandable Lightbox React",
      "Photo Grid Animation",
      "Tailwind CSS Image Grid",
    ],
    features: [
      "Smooth layoutId shared element expansion animations",
      "Responsive masonry column layout with automatic aspect ratio sizing",
      "Keyboard Escape to close and backdrop blur transitions",
      "Zero layout shift during image loading",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Media & Galleries",
  },
  "tubelight-navbar": {
    description:
      "Apple-inspired floating tubelight navigation bar for React with smooth spring-physics glowing indicator, audio feedback, and dark mode.",
    keywords: [
      "Tubelight Navbar React",
      "Floating Navbar Component",
      "Glow Indicator Navbar",
      "Framer Motion Navigation",
      "Apple Style Navbar",
      "Tailwind CSS Header",
    ],
    features: [
      "Fluid spring-physics active tab glow pill tracking",
      "Subtle sound feedback on tab switching",
      "Compact floating frosted glass aesthetic with backdrop blur",
      "Fully accessible ARIA tablist and roving keyboard focus",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Navigation",
  },
  "typewriter-testimonial": {
    description:
      "Animated typewriter customer testimonial quote card for React with realistic typing cadence, avatar badge, and author verification.",
    keywords: [
      "Typewriter Testimonial React",
      "Typing Text Animation",
      "Customer Review Card",
      "Social Proof Component",
      "Framer Motion Typewriter",
      "Verified Testimonial UI",
    ],
    features: [
      "Dynamic character-by-character typing with natural jitter",
      "Blinking cursor with configurable speed and loop settings",
      "Verified avatar and author credibility badges",
      "Smooth fade-in transitions for multi-testimonial rotators",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Social Proof",
  },
  "carousel-360": {
    description:
      "360-degree cylinder 3D carousel component for React with spatial depth perspective, continuous rotational dragging, and interactive item inspection.",
    keywords: [
      "Carousel 360 React",
      "3D Cylinder Carousel",
      "360 Degree Slider",
      "Three.js Style React Carousel",
      "Framer Motion 3D Carousel",
      "Spatial UI Component",
    ],
    features: [
      "True 3D cylinder spatial projection using CSS 3D transforms",
      "Continuous rotational momentum drag with damping physics",
      "Interactive click-to-focus on foreground items",
      "Optimized for 60fps across desktop and mobile browsers",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS"],
    category: "Interactive",
  },
  testimonial: {
    description:
      "Audio voice note testimonial section block for React featuring interactive audio waveforms, play/pause controls, duration counters, and verified creator badges.",
    keywords: [
      "Voice Testimonial Block React",
      "Audio Note Testimonial",
      "Waveform Player Component",
      "Customer Voice Review",
      "Social Proof Section",
      "Web Audio Testimonial",
    ],
    features: [
      "Interactive audio playback with animated waveform equalizer bars",
      "Timestamp progress tracking and time remaining indicators",
      "Author avatar, verified badge, and attribution details",
      "Available as a full-width block section or standalone component",
    ],
    frameworks: ["React 18 & 19", "Next.js", "Tailwind CSS", "Web Audio API"],
    category: "Blocks & Sections",
  },
};

export function getComponentSeo(slug: string): ComponentSeoData {
  if (slug === "voice-testimonial" && COMPONENT_SEO_DATA.testimonial) {
    return COMPONENT_SEO_DATA.testimonial;
  }
  return (
    COMPONENT_SEO_DATA[slug] || {
      description:
        "Free, open-source animated React and Tailwind CSS component with copy-paste code and CLI installation.",
      keywords: [
        "React Component",
        "Tailwind CSS Component",
        "Animated UI Component",
        "Interactive UI Component",
        "Serenity UI",
      ],
      features: [
        "Copy-paste source code",
        "CLI installation",
        "Tailwind CSS styling",
        "Accessible and responsive",
      ],
      frameworks: ["React", "Next.js", "Tailwind CSS"],
      category: "Component",
    }
  );
}
