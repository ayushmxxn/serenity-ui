"use client";

import React, { useState, useEffect, useRef } from "react";
import { Pen } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaReddit,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Testimonial {
  name: string;
  profession: string;
  text: string;
  socialPlatform:
    | "github"
    | "twitter"
    | "linkedin"
    | "instagram"
    | "facebook"
    | "discord"
    | "reddit";
  socialHandle: string;
}

const socialIcons: Record<Testimonial["socialPlatform"], React.ReactNode> = {
  github: <FaGithub className="inline-block mr-2 h-4 w-4 text-gray-300" />,
  twitter: <FaXTwitter className="inline-block mr-2 h-4 w-4 text-white" />,
  linkedin: (
    <FaLinkedin
      className="inline-block mr-2 h-4 w-4"
      style={{ color: "#0080B4" }}
    />
  ),
  instagram: (
    <FaInstagram className="inline-block mr-2 h-4 w-4 text-pink-500" />
  ),
  facebook: (
    <FaFacebook
      className="inline-block mr-2 h-4 w-4"
      style={{ color: "#1094F5" }}
    />
  ),
  discord: (
    <FaDiscord
      className="inline-block mr-2 h-4 w-4"
      style={{ color: "#5766EE" }}
    />
  ),
  reddit: <FaReddit className="inline-block mr-2 h-4 w-4 text-orange-500" />,
};

interface DropdownOption {
  value: Testimonial["socialPlatform"];
  label: string;
  icon: React.ReactNode;
}

interface CustomDropdownProps {
  value: Testimonial["socialPlatform"];
  onChange: (value: Testimonial["socialPlatform"]) => void;
  options: DropdownOption[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: Testimonial["socialPlatform"]) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-neutral-700/50 text-neutral-100 border border-[#2D2D2D] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#404040] transition-all duration-200 text-sm flex items-center justify-between h-10"
      >
        <div className="flex items-center">
          {selectedOption?.icon && (
            <span className="mr-2">{selectedOption.icon}</span>
          )}
          <span>{selectedOption?.label || "Select Platform"}</span>
        </div>
        <svg
          className={`w-4 h-4 text-neutral-400 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg shadow-xl z-50 overflow-hidden">
          {options.map((option, index) => (
            <div key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full flex items-center px-4 py-3 text-left text-neutral-100 hover:bg-[#2D2D2D] transition-colors duration-150 text-sm"
              >
                {option.icon && <span className="mr-3">{option.icon}</span>}
                <span>{option.label}</span>
              </button>
              {index < options.length - 1 && (
                <div className="mx-4 border-b border-[#2D2D2D]/50" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TestimonialWidget: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Testimonial>({
    name: "",
    profession: "",
    text: "",
    socialPlatform: "twitter",
    socialHandle: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (!formData.name || !formData.profession || !formData.text) {
      setError("Please fill in all fields: name, profession, and testimonial.");
      return;
    }
    if (!formData.socialHandle) {
      setError("Please provide a social profile URL.");
      return;
    }

    // Validate URL format
    const urlValidation: Record<Testimonial["socialPlatform"], RegExp> = {
      twitter: /^https:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/,
      github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      linkedin:
        /^https:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/,
      instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
      facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
      discord: /^https:\/\/(www\.)?discord\.(gg|com)\/[a-zA-Z0-9_-]+\/?$/,
      reddit: /^https:\/\/(www\.)?reddit\.com\/(u|user)\/[a-zA-Z0-9_-]+\/?$/,
    };

    if (!urlValidation[formData.socialPlatform].test(formData.socialHandle)) {
      setError(
        `Invalid ${
          formData.socialPlatform
        } URL. Please use a valid profile URL (e.g., https://${
          formData.socialPlatform === "twitter"
            ? "x.com"
            : formData.socialPlatform
        }.com/username).`
      );
      return;
    }

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Failed to submit testimonial due to an unknown server error."
        );
        return;
      }

      setSuccess("Testimonial submitted successfully!");
      setFormData({
        name: "",
        profession: "",
        text: "",
        socialPlatform: "twitter",
        socialHandle: "",
      });
      setTimeout(() => setIsModalOpen(false), 1500);
    } catch (error) {
      setError(
        "Network error: Could not connect to the server. Please check your internet connection and try again."
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#2D2D2D] text-neutral-100 hover:bg-[#3D3D3D] rounded-full p-3 shadow-2xl transition-all duration-200 border border-[#404040] ring-2 ring-[#171717]"
        aria-label="Open testimonial form"
      >
        <Pen className="h-5 w-5" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div
            className="bg-[#1A1A1A] border border-[#2D2D2D] ring-4 ring-[#171717] rounded-xl w-full max-w-md shadow-2xl flex flex-col z-50 mx-4 relative"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-form-title"
          >
            <form
              id="testimonial-form"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4"
            >
              <h2 id="testimonial-form-title" className="sr-only">
                Submit a Testimonial
              </h2>

              <div>
                <label
                  htmlFor="name"
                  className="block text-neutral-400 text-xs uppercase tracking-wider font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 border border-[#2D2D2D] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#404040] transition-all duration-200 text-sm h-10"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="profession"
                  className="block text-neutral-400 text-xs uppercase tracking-wider font-medium mb-2"
                >
                  Profession
                </label>
                <input
                  id="profession"
                  name="profession"
                  type="text"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 border border-[#2D2D2D] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#404040] transition-all duration-200 text-sm h-10"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-neutral-400 text-xs uppercase tracking-wider font-medium mb-2"
                >
                  Testimonial
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 border border-[#2D2D2D] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#404040] transition-all duration-200 text-sm resize-none"
                  placeholder="Share your thoughts about Serenity UI"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="socialPlatform"
                  className="block text-neutral-400 text-xs uppercase tracking-wider font-medium mb-2"
                >
                  Social
                </label>
                <CustomDropdown
                  value={formData.socialPlatform}
                  onChange={(value) =>
                    setFormData({ ...formData, socialPlatform: value })
                  }
                  options={[
                    {
                      value: "twitter",
                      label: "Twitter",
                      icon: <FaXTwitter className="h-4 w-4 text-white" />,
                    },
                    {
                      value: "github",
                      label: "GitHub",
                      icon: <FaGithub className="h-4 w-4 text-gray-300" />,
                    },
                    {
                      value: "linkedin",
                      label: "LinkedIn",
                      icon: (
                        <FaLinkedin
                          className="h-4 w-4"
                          style={{ color: "#0080B4" }}
                        />
                      ),
                    },
                    {
                      value: "instagram",
                      label: "Instagram",
                      icon: <FaInstagram className="h-4 w-4 text-pink-500" />,
                    },
                    {
                      value: "facebook",
                      label: "Facebook",
                      icon: (
                        <FaFacebook
                          className="h-4 w-4"
                          style={{ color: "#1094F5" }}
                        />
                      ),
                    },
                    {
                      value: "discord",
                      label: "Discord",
                      icon: (
                        <FaDiscord
                          className="h-4 w-4"
                          style={{ color: "#5766EE" }}
                        />
                      ),
                    },
                    {
                      value: "reddit",
                      label: "Reddit",
                      icon: <FaReddit className="h-4 w-4 text-orange-500" />,
                    },
                  ]}
                />
              </div>

              <div>
                <label
                  htmlFor="socialHandle"
                  className="block text-neutral-400 text-xs uppercase tracking-wider font-medium mb-2"
                >
                  Profile URL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {socialIcons[formData.socialPlatform]}
                  </div>
                  <input
                    id="socialHandle"
                    name="socialHandle"
                    type="url"
                    value={formData.socialHandle}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-700/50 text-neutral-100 placeholder-neutral-400 border border-[#2D2D2D] rounded-lg p-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-[#404040] transition-all duration-200 text-sm h-10"
                    placeholder={`https://${
                      formData.socialPlatform === "twitter"
                        ? "x.com"
                        : formData.socialPlatform === "github"
                        ? "github.com"
                        : formData.socialPlatform === "linkedin"
                        ? "linkedin.com/in"
                        : formData.socialPlatform === "instagram"
                        ? "instagram.com"
                        : formData.socialPlatform === "facebook"
                        ? "facebook.com"
                        : formData.socialPlatform === "discord"
                        ? "discord.com"
                        : "reddit.com/u"
                    }/username`}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm" role="alert">
                    {error}
                  </p>
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-green-400 text-sm" role="alert">
                    {success}
                  </p>
                </div>
              )}
            </form>

            <div className="px-4 py-3 bg-[#1A1A1A] sticky bottom-0 z-10 rounded-b-xl border-t border-[#2D2D2D]">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#2D2D2D] text-neutral-300 rounded-lg hover:bg-[#3D3D3D] hover:text-neutral-100 transition-all duration-200 text-sm font-normal border border-[#404040]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="testimonial-form"
                  className="px-4 py-2 bg-gradient-to-r from-neutral-50 to-neutral-200 hover:opacity-90 text-neutral-800 rounded-lg transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform font-medium"
                >
                  Submit
                </button>
              </div>
            </div>

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
      )}
    </>
  );
};

export default TestimonialWidget;
