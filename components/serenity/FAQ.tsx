"use client";
import React, { useState, useEffect } from "react";
import { Plus, Minus, MessagesSquare, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { FaGithub } from "react-icons/fa";

// Define types for card data and supporters
interface Card {
  title: string;
  description: string | JSX.Element;
}

interface Supporter {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

// Footer Component
function Footer() {
  return (
    <footer
      className={`${GeistSans.className} w-full font-medium text-sm text-neutral-400 bg-neutral-800/50 border-t border-dashed border-neutral-800 py-5 px-4 sm:px-6`}
    >
      <div className="mx-auto text-center">
        <p>
          Built by
          <Link
            href="https://ayushmxxn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-neutral-300 hover:text-neutral-100 underline underline-offset-2 transition-colors duration-200"
          >
            Ayushmaan Singh
          </Link>
          . The source code is available on
          <Link
            href="https://github.com/ayushmxxn/serenity-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-neutral-300 hover:text-neutral-100 underline underline-offset-2 transition-colors duration-200"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

// FAQ card data
const cardData: Card[] = [
  {
    title: "What is Serenity UI?",
    description:
      "Serenity UI is a collection of customizable and open-source components built with Next.js, Tailwind, TypeScript, and Framer Motion.",
  },
  {
    title: "How does Serenity UI work?",
    description:
      "You can use it via CLI command that grabs all the dependencies for you, or just copy-paste the code and install the dependencies manually.",
  },
  {
    title: "Can I use this in my project?",
    description:
      "Absolutely! Serenity UI is free for both personal and commercial projects. I'd love to see what you create with it.",
  },
  {
    title: "Can I customize the components?",
    description:
      "Yes, all components are highly customizable to fit your needs.",
  },
  {
    title: "Which frameworks are compatible?",
    description:
      "Serenity UI is primarily designed for use with React and Next.js.",
  },
  {
    title: "Join Community",
    description: (
      <>
        Join our{" "}
        <a
          href="https://discord.com/invite/kzk6uWey3g"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline transition-colors"
        >
          discord community
        </a>{" "}
        for support, component suggestions, or to connect with others.
      </>
    ),
  },
];

export default function SerenityFAQ() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chunkSize, setChunkSize] = useState<number>(20);

  // Fetching supporters from API
  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        const response = await fetch("/api/stargazers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          let errorData: { error?: string } = {};
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            errorData = await response.json();
          } else {
            const text = await response.text();
            console.error("Non-JSON response:", text);
            errorData = {
              error: `Non-JSON response received (status: ${response.status})`,
            };
          }
          throw new Error(
            errorData.error || `Failed to fetch supporters: ${response.status}`
          );
        }

        const allSupporters: Supporter[] = await response.json();
        setSupporters(allSupporters);
        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load supporters. Please try again later.";
        setError(errorMessage);
        setIsLoading(false);
        console.error("Client fetch error:", err);
      }
    };

    fetchSupporters();
  }, []);

  useEffect(() => {
    const updateChunkSize = () => {
      const isMobile = window.innerWidth <= 640;
      setChunkSize(isMobile ? 15 : 20);
    };

    updateChunkSize();

    window.addEventListener("resize", updateChunkSize);

    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const chunkSupporters = (
    supporters: Supporter[],
    size: number
  ): Supporter[][] => {
    const chunks: Supporter[][] = [];
    for (let i = 0; i < supporters.length; i += size) {
      chunks.push(supporters.slice(i, i + size));
    }
    return chunks;
  };

  const supporterRows = chunkSupporters(supporters, chunkSize);

  return (
    <div>
      <div className="bg-black text-white flex flex-col">
        <div className="flex-1 px-4 sm:px-0">
          {/* FAQ Header */}
          <div className="border-t border-b border-dashed border-neutral-800 mb-0">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto sm:border-l sm:border-r border-dashed border-neutral-800 px-0 sm:px-4 py-12 sm:p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-neutral-800 border border-dashed border-neutral-700 rounded-lg mb-4 shadow-lg">
                  <MessagesSquare className="w-5 h-5 text-neutral-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-neutral-100 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Frequently Asked Questions
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Everything you need to know about Serenity UI
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Cards */}
          <div className="max-w-6xl 2xl:max-w-7xl mx-auto sm:border-l sm:border-r border-dashed border-neutral-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {cardData.map((item, index) => (
                <div
                  key={index}
                  className={`
                    border border-dashed border-neutral-800 bg-neutral-800/50 sm:border-0 sm:border-b sm:border-dashed sm:border-neutral-800 
                    mb-4 sm:mb-0
                    transition-all duration-200 
                    hover:bg-neutral-800/50 hover:shadow-md hover:border-neutral-800 
                    ${
                      index % 2 === 1
                        ? "lg:border-l lg:border-t-0 lg:border-r-0 lg:border-b lg:border-dashed lg:border-neutral-800"
                        : "lg:border-t-0 lg:border-l-0 lg:border-r-0 lg:border-b lg:border-dashed lg:border-neutral-800"
                    }
                    ${index === 0 ? "border-t-0 sm:border-t-0" : ""}
                  `}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between focus:outline-none group hover:bg-neutral-800/50 transition-colors"
                    aria-expanded={expandedItem === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <h3 className="text-neutral-100 font-medium text-sm sm:text-base group-hover:text-white transition-colors pr-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300">
                      {item.title}
                    </h3>
                    <div className="flex-shrink-0">
                      {expandedItem === index ? (
                        <Minus className="w-4 h-4 text-neutral-400 group-hover:text-neutral-200 transition-colors" />
                      ) : (
                        <Plus className="w-4 h-4 text-neutral-400 group-hover:text-neutral-200 transition-colors" />
                      )}
                    </div>
                  </button>
                  {expandedItem === index && (
                    <div
                      id={`faq-content-${index}`}
                      className="px-4 pb-4 sm:px-6 sm:pb-5 border-t border-dashed border-neutral-800/50"
                    >
                      <div className="pt-3">
                        <p className="text-neutral-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Community Section */}

          <div className="border-t border-dashed border-neutral-800 mt-4 sm:mt-0">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto sm:border-l sm:border-r border-dashed border-neutral-800 px-4 sm:px-6 py-12 sm:py-16">
              <div className="text-center">
                <Heart className="w-10 h-10 text-pink-400 fill-pink-400 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-neutral-100 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300">
                  Loved by the Community
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base mb-8">
                  Join them and be part of the Serenity UI community!
                </p>

                {isLoading ? (
                  <p className="text-neutral-400 text-sm sm:text-base animate-pulse">
                    Loading supporters...
                  </p>
                ) : error ? (
                  <p className="text-red-400 text-sm sm:text-base">{error}</p>
                ) : supporters.length === 0 ? (
                  <p className="text-neutral-400 text-sm sm:text-base">
                    No supporters yet. Be the first to star{" "}
                    <a
                      href="https://github.com/ayushmxxn/serenity-ui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                      Serenity UI
                    </a>
                    !
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-6">
                    {/* Supporter Avatars Rows */}
                    <div className="flex flex-wrap justify-center gap-y-4 gap-x-0 max-w-5xl mx-auto">
                      {supporters.map((user, index) => (
                        <a
                          key={user.id}
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={user.login}
                          aria-label={`Visit GitHub profile of ${user.login}`}
                          className="group relative flex items-center justify-center"
                          style={{
                            marginLeft: index % 20 !== 0 ? "-12px" : "0",
                          }}
                        >
                          <Image
                            width={48}
                            height={48}
                            src={user.avatar_url}
                            alt={`Avatar of GitHub user ${user.login}`}
                            loading="lazy"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-neutral-700 group-hover:border-pink-500 transition-all duration-300 transform group-hover:shadow-lg object-cover"
                            style={{ zIndex: supporters.length - index }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/48";
                            }}
                          />
                          <span className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 hidden group-hover:block text-xs text-neutral-100 bg-neutral-800 px-2 py-1 rounded-md shadow-md whitespace-nowrap z-50">
                            {user.login}
                          </span>
                        </a>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col items-center gap-3 text-neutral-400 text-sm sm:text-base">
                      <p>Become part of the community!</p>
                      <a
                        href="https://github.com/ayushmxxn/serenity-ui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 text-sm font-medium"
                      >
                        <FaGithub className="w-4 h-4 text-neutral-800" />
                        Star on GitHub
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
}
