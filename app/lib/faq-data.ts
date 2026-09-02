export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "commercial-use",
    question: "Is Serenity UI free for commercial use?",
    answer:
      "Yes, completely. It's licensed under MIT, so you can use any component in personal projects, client work, or commercial apps without restrictions or attribution requirements.",
  },
  {
    id: "how-to-install",
    question: "How do I add components to my project?",
    answer:
      "You can add them straight to your codebase using the shadcn CLI or copy-paste the source code directly from the site. Since the code lives in your project, there's no runtime package or vendor lock-in.",
  },
  {
    id: "framework-support",
    question: "Which frameworks work with Serenity UI?",
    answer:
      "Anything running React and Tailwind CSS. It works seamlessly with Next.js (both App Router and Pages Router), Vite, Remix, Astro, and React 18 or 19.",
  },
  {
    id: "customization",
    question: "How customizable are the components?",
    answer:
      "Every component is just plain React, Tailwind CSS, and Framer Motion. You have full control over the source code, so you can adjust styling, change animation timings, modify props, or swap icons as needed.",
  },
  {
    id: "performance",
    question: "Do the animations cause performance issues?",
    answer:
      "No. Animations rely on GPU-accelerated CSS transforms and lightweight motion drivers. Canvas-based components pause their render loops when scrolled out of view so they don't waste CPU cycles.",
  },
  {
    id: "dependencies",
    question: "Do I need to install heavy dependencies?",
    answer:
      "No. Most components only require Framer Motion and Lucide icons alongside your existing Tailwind setup. Any extra utility is kept minimal and declared directly in the component.",
  },
];
