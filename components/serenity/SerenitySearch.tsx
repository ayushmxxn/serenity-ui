// SerenitySearch.tsx
"use client";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { GeistSans } from "geist/font/sans";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
import { Component, PanelsTopLeft, ArrowRight, Code2 } from "lucide-react";
import { useSearch } from "./SearchContext";

interface Page {
  title: string;
  url: string;
  icon?: ReactNode;
  category?: string;
}

interface SearchModalProps {
  pages?: Page[];
}

const defaultPages: Page[] = [
  {
    title: "Components",
    url: "/components",
    icon: <Component size={16} />,
    category: "Navigation",
  },
  {
    title: "Templates",
    url: "/components/templates",
    icon: <PanelsTopLeft size={16} />,
    category: "Navigation",
  },
  {
    title: "Boilerplates",
    url: "/components/boilerplates",
    icon: <Code2 size={16} />,
    category: "Navigation",
  },
  {
    title: "Carousel 360",
    url: "/components/carousels/carousel360",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Feature Section",
    url: "/components/featuresection",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Film Roll",
    url: "/components/filmroll",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Voice Testimonial",
    url: "/components/testimonials/voicetestimonial",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Star Rating Testimonial",
    url: "/components/testimonials/starratingtestimonial",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Username Testimonial",
    url: "/components/testimonials/usernametestimonial",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "3D Book Testimonial",
    url: "/components/testimonials/3dbooktestimonial",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Typewriter Testimonial",
    url: "/components/testimonials/typewritertestimonial",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Pricing Section",
    url: "/components/pricing/pricingsection",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "SignUp Form",
    url: "/components/authentication/signup信息技术form",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "SignUp Form V2",
    url: "/components/authentication/signupformv2",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "SignIn Form",
    url: "/components/authentication/signinform",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Forgot Password",
    url: "/components/authentication/forgotpassword",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Email",
    url: "/components/authentication/email",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "OTP",
    url: "/components/authentication/otp",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Create New Password",
    url: "/components/authentication/createnewpassword",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Password Changed",
    url: "/components/authentication/passwordchanged",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Image Carousel",
    url: "/components/carousels/imagecarousel",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Video Carousel",
    url: "/components/carousels/videocarousel",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Tubelight Navbar",
    url: "/components/navbars/tubelightnavbar",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "SpotLight Card",
    url: "/components/cards/spotlightcard",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Swipe Card",
    url: "/components/cards/swipecard",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Star Rating",
    url: "/components/starrating",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Project Cards",
    url: "/components/cards/projectcards",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Dock",
    url: "/components/dock",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Shortcut Modal",
    url: "/components/shortcutmodal",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Code Block",
    url: "/components/codeblock",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Image Gallary",
    url: "/components/imagegallery",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "NewsLetter",
    url: "/components/newsletter",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Glow card",
    url: "/components/cards/glowcard",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "3D Flip card",
    url: "/components/cards/3dflipcard",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Drawer",
    url: "/components/drawer",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Footer",
    url: "/components/footer",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Cookie",
    url: "/components/cookie",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "WaitList",
    url: "/components/waitlist",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "TechStack",
    url: "/components/techstack",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Toast",
    url: "/components/toast",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Brands",
    url: "/components/brandsection",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Buttons",
    url: "/components/buttons",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Inputs",
    url: "/components/inputs",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
  {
    title: "Toggle",
    url: "/components/toggle",
    icon: <ArrowRight size={16} />,
    category: "Components",
  },
];

const SerenitySearch: React.FC<SearchModalProps> = ({
  pages = defaultPages,
}) => {
  const { isSearchOpen, closeSearch, openSearch } = useSearch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (page.category &&
        page.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchOpen) {
        closeSearch();
      } else if (event.key === "/" && !isSearchOpen) {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, closeSearch, openSearch]);

  const closeModal = () => {
    closeSearch();
    setSearchQuery("");
  };

  if (!isSearchOpen) return null;

  // Group pages by category
  const groupedPages = filteredPages.reduce((acc, page) => {
    const category = page.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(page);
    return acc;
  }, {} as { [key: string]: Page[] });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div
        className={`${GeistSans.className} bg-[#1A1A1A] border border-[#2D2D2D] ring-4 ring-[#171717] rounded-xl w-full max-w-md h-auto max-h-[62vh] sm:max-h-[71vh] shadow-2xl flex flex-col z-50 mx-4 relative`}
      >
        {/* Searchbar */}
        <div className="px-4 py-3 bg-[#1A1A1A] rounded-xl">
          <div className="relative flex items-center">
            <IoMdSearch className="text-neutral-400 w-5 h-5 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              ref={inputRef}
              placeholder="Search documentation..."
              className="bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 w-full pl-8 pr-2 py-2 focus:outline-none text-sm font-normal rounded-lg"
            />
            <span
              onClick={closeModal}
              className="text-neutral-400 ml-3 text-xs cursor-pointer select-none"
            >
              Esc
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {Object.keys(groupedPages).length > 0 ? (
            Object.keys(groupedPages).map((category, index) => (
              <div key={category}>
                {category !== "Uncategorized" && (
                  <h3
                    className={`text-neutral-400 text-xs px-2 py-1 uppercase tracking-wider font-medium ${
                      index > 0 ? "mt-4" : ""
                    }`}
                  >
                    {category}
                  </h3>
                )}
                {groupedPages[category].map((page, idx) => (
                  <div
                    key={`${category}-${page.title}-${idx}`}
                    className="group hover:bg-[#2D2D2D] rounded-lg p-2 transition-all duration-200 ease-in-out"
                  >
                    <Link
                      onClick={closeModal}
                      href={page.url}
                      className="text-neutral-100 text-sm font-normal flex items-center"
                    >
                      {page.icon && (
                        <span className="text-neutral-400 mr-2">
                          {page.icon}
                        </span>
                      )}
                      {page.title}
                    </Link>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center gap-2 py-10">
              <p className="text-neutral-100 text-sm font-normal text-center">
                No results found.
              </p>
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div
          className="px-4 py-3 border-t border-[#2D2D2D] bg-[#1A1A1A] sticky bottom-0 z-10 rounded-b-xl"
          style={{ height: "22px" }}
        ></div>

        {/* Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4a4a4a;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #6b6b6b;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SerenitySearch;
