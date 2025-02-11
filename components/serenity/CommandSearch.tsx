"use client";
import React, { useState } from "react";
import { CgComponents } from "react-icons/cg";
import { MdKeyboardCommandKey } from "react-icons/md";
import SerenityMobileSearch from "./SerenityMobileSearch";

function CommandSearch() {
  const [showModal, setShowModal] = useState(false);

  const handleShortcutClick = () => {
    setShowModal((prev) => !prev);
  };

  const IntroductionIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    );
  };
  const InstallationIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
    );
  };

  // For mobile
  const pages = [
    {
      title: "Introduction",
      url: "/docs/introduction",
      icon: <IntroductionIcon />,
    },
    {
      title: "Installation",
      url: "/docs/installation",
      icon: <InstallationIcon />,
    },
    {
      title: "Carousel 360",
      url: "/components/carousels/carousel360",
      icon: <CgComponents />,
    },
    {
      title: "Feature Section",
      url: "/components/featuresection",
      icon: <CgComponents />,
    },
    { title: "Film Roll", url: "/components/filmroll", icon: <CgComponents /> },
    {
      title: "Voice Testimonial",
      url: "/components/testimonials/voicetestimonial",
      icon: <CgComponents />,
    },
    {
      title: "Star Rating Testimonial",
      url: "/components/testimonials/starratingtestimonial",
      icon: <CgComponents />,
    },
    {
      title: "Username Testimonial",
      url: "/components/testimonials/usernametestimonial",
      icon: <CgComponents />,
    },
    {
      title: "3D Book Testimonial",
      url: "/components/testimonials/3dbooktestimonial",
      icon: <CgComponents />,
    },
    {
      title: "Typewriter Testimonial",
      url: "/components/testimonials/typewritertestimonial",
      icon: <CgComponents />,
    },
    {
      title: "Pricing Section",
      url: "/components/pricing/pricingsection",
      icon: <CgComponents />,
    },
    {
      title: "SignUp Form",
      url: "/components/authentication/signupform",
      icon: <CgComponents />,
    },
    {
      title: "SignUp Form V2",
      url: "/components/authentication/signupformv2",
      icon: <CgComponents />,
    },
    {
      title: "SignIn Form",
      url: "/components/authentication/signinform",
      icon: <CgComponents />,
    },
    {
      title: "Forgot Password",
      url: "/components/authentication/forgotpassword",
      icon: <CgComponents />,
    },
    {
      title: "Email",
      url: "/components/authentication/email",
      icon: <CgComponents />,
    },
    {
      title: "OTP",
      url: "/components/authentication/otp",
      icon: <CgComponents />,
    },
    {
      title: "Create New Password",
      url: "/components/authentication/createnewpassword",
      icon: <CgComponents />,
    },
    {
      title: "Password Changed",
      url: "/components/authentication/passwordchanged",
      icon: <CgComponents />,
    },
    {
      title: "Image Carousel",
      url: "/components/carousels/imagecarousel",
      icon: <CgComponents />,
    },
    {
      title: "Video Carousel",
      url: "/components/carousels/videocarousel",
      icon: <CgComponents />,
    },
    {
      title: "Tubelight Navbar",
      url: "/components/navbars/tubelightnavbar",
      icon: <CgComponents />,
    },
    {
      title: "SpotLight Card",
      url: "/components/cards/spotlightcard",
      icon: <CgComponents />,
    },
    {
      title: "Swipe Card",
      url: "/components/cards/swipecard",
      icon: <CgComponents />,
    },
    {
      title: "Star Rating",
      url: "/components/starrating",
      icon: <CgComponents />,
    },
    {
      title: "Project Cards",
      url: "/components/cards/projectcards",
      icon: <CgComponents />,
    },
    { title: "Dock", url: "/components/dock", icon: <CgComponents /> },
    {
      title: "Shortcut Modal",
      url: "/components/shortcutmodal",
      icon: <CgComponents />,
    },
    {
      title: "Code Block",
      url: "/components/codeblock",
      icon: <CgComponents />,
    },
    {
      title: "Image Gallery",
      url: "/components/imagegallery",
      icon: <CgComponents />,
    },
    {
      title: "NewsLetter",
      url: "/components/newsletter",
      icon: <CgComponents />,
    },
    {
      title: "Glow Card",
      url: "/components/cards/glowcard",
      icon: <CgComponents />,
    },
    {
      title: "3D Flip card",
      url: "/components/cards/3dflipcard",
      icon: <CgComponents />,
    },
    { title: "Drawer", url: "/components/drawer", icon: <CgComponents /> },
    { title: "Footer", url: "/components/footer", icon: <CgComponents /> },
    { title: "Cookie", url: "/components/cookie", icon: <CgComponents /> },
    { title: "WaitList", url: "/components/waitlist", icon: <CgComponents /> },
    {
      title: "TechStack",
      url: "/components/techstack",
      icon: <CgComponents />,
    },
    { title: "Toast", url: "/components/toast", icon: <CgComponents /> },
    {
      title: "Brands",
      url: "/components/brandsection",
      icon: <CgComponents />,
    },
    { title: "Buttons", url: "/components/buttons", icon: <CgComponents /> },
    { title: "Inputs", url: "/components/inputs", icon: <CgComponents /> },
    { title: "Toggle", url: "/components/toggle", icon: <CgComponents /> },
  ];

  return (
    <div>
      {/* Command Icon   */}
      <div className="md:hidden sm:mr-5">
        <MdKeyboardCommandKey
          onClick={handleShortcutClick}
          className="bg-zinc-800 rounded p-1"
          size={20}
        />
      </div>
      {/* Search Modal */}
      {showModal && (
        <SerenityMobileSearch
          showmodal={showModal}
          setshowmodal={setShowModal}
          pages={pages}
        />
      )}
    </div>
  );
}

export default CommandSearch;
