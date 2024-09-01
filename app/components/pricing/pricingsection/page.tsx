'use client'
import React, { useState } from 'react'
import PricingSectionWhite from './components/PricingSectionWhite';
import PricingSectionBlack from './components/PricingSectionBlack';
import PricingSectionBlue from './components/PricingSectionBlue';
import SerenityExampleBlock from '@/components/serenity/SerenityExampleBlock';
import SerenitySourceCodeBlock from '@/components/serenity/SerenitySourceCodeBlock';
import { motion } from 'framer-motion';




function StarRatingTestimonialPage() {
  const [activeTab, setActiveTab] = useState('Preview');
  const [activeColor, setActiveColor] = useState('White');

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleColorChange = (color: React.SetStateAction<string>) => {
    setActiveColor(color);
  };

  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStep(step);
        setTimeout(() => setCopiedStep(null), 2000);
      },
      () => alert('Failed to copy.')
    );
  } else {
    
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  
    textarea.style.opacity = '0'; 
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedStep(step);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      alert('Failed to copy.');
    }
    
    document.body.removeChild(textarea);
  }
};

  const getCommand = () => {
  if (activeTab === 'Preview') {
    switch (activeColor) {
      case 'White':
        return 'npx @ayushmxxn/serenity-ui@latest add pricing-section-white';
      case 'Black':
        return 'npx @ayushmxxn/serenity-ui@latest add pricing-section-black';
      case 'Blue':
        return 'npx @ayushmxxn/serenity-ui@latest add pricing-section-blue';
      default:
        return '';
    }
  }
  return '';
};


// Source code for white pricing page
const sourcecodewhite = `
'use client';
import Link from 'next/link';
import React, { useState } from 'react';

function PricingSectionWhite() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const discountRate = 20; // Define the discount rate in percentage

  const pricingPlans = [
    {
      name: 'Basic Plan',
      monthlyPrice: 10,
      description: 'Basic features for up to 10 users.',
      features: [
        'Access to essential tools',
        'Basic chat and email support',
        'Limited storage capacity',
        'Monthly usage reports',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Business Plan',
      monthlyPrice: 25,
      description: 'Advanced tools for up to 20 users.',
      features: [
        'Advanced tools for power users',
        'Priority support with live chat',
        'More storage and bandwidth',
        'Detailed analytics',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Enterprise Plan',
      monthlyPrice: 40,
      description: 'Advanced features + unlimited users.',
      features: [
        'Custom solutions for big teams',
        'Dedicated account manager',
        'Unlimited storage and bandwidth',
        'Advanced analytics and reporting',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
  ];

  // Function to calculate the annual price
  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * (1 - discountRate / 100);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 mt-5">
        <div className="text-4xl sm:text-6xl">Our Pricing Plans</div>
        <span className="text-center text-gray-300 text-sm sm:text-base">
          Select from our range of affordable plans <br /> tailored to suit every budget.
        </span>
      </div>

      <div className="flex justify-center items-center mt-5">
        <div
          className={\`\${billingCycle === 'annually' ? 'bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600' : 'bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600'} w-56 h-9 rounded-full flex justify-between items-center px-1 z-50\`}
        >
          <span
            className={\`px-5 py-1 rounded-full text-sm cursor-pointer \${billingCycle === 'monthly' ? 'bg-black text-white' : ''}\`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <span
            className={\`px-2 py-1 rounded-full text-sm cursor-pointer \${billingCycle === 'annually' ? 'bg-black text-white' : ''}\`}
            onClick={() => setBillingCycle('annually')}
          >
            Annually<span className="bg-white text-black rounded-full px-1 ml-1 text-xs">-{discountRate}%</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 px-2 mb-3 mt-6">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="bg-white w-80 rounded-2xl h-auto pb-10 shadow-lg z-50">
            <div className="p-5 rounded-2xl">
              <span className="text-black">{plan.name}</span>
              <div className="mt-3 mb-2">
                <span className="text-black text-3xl">
                  \${billingCycle === 'monthly' ? plan.monthlyPrice : calculateAnnualPrice(plan.monthlyPrice).toFixed(2)}{' '}
                  <span className="text-xs">{billingCycle === 'annually' ? 'annually' : 'per month'}</span>
                </span>
              </div>
              <span className="text-slate-600 text-sm">{plan.description}</span>
              <div className="mt-5">
              <Link href={plan.link} target='_blank'>
                <button
                  className="bg-black animatedButton text-white w-full h-10 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  aria-label={\`Get started with the \${plan.name}\`}
                >
                  Get started
                </button>
              </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl pl-5 pt-2">
              <span className="text-black">Features</span>
              {plan.features.map((feature, index) => (
                <span key={index} className="text-slate-600 text-sm flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingSectionWhite;
`;


// Souce code for black pricing page
const sourcecodeblack = `
'use client';
import Link from 'next/link';
import React, { useState } from 'react';

function PricingSectionBlack() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const discountRate = 20; // Define the discount rate in percentage

  const pricingPlans = [
    {
      name: 'Basic Plan',
      monthlyPrice: 10,
      description: 'Basic features for up to 10 users.',
      features: [
        'Access to essential tools',
        'Basic chat and email support',
        'Limited storage capacity',
        'Monthly usage reports',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Business Plan',
      monthlyPrice: 25,
      description: 'Advanced tools for up to 20 users.',
      features: [
        'Advanced tools for power users',
        'Priority support with live chat',
        'More storage and bandwidth',
        'Detailed analytics',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Enterprise Plan',
      monthlyPrice: 40,
      description: 'Advanced features + unlimited users.',
      features: [
        'Custom solutions for big teams',
        'Dedicated account manager',
        'Unlimited storage and bandwidth',
        'Advanced analytics and reporting',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
  ];

  // Function to calculate the annual price
  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * (1 - discountRate / 100);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 mt-5">
        <div className="text-4xl sm:text-6xl">Our Pricing Plans</div>
        <span className="text-center text-gray-300 text-sm sm:text-base">
          Select from our range of affordable plans <br /> tailored to suit every budget.
        </span>
      </div>

      <div className="flex justify-center items-center mt-5">
        <div className="bg-white w-56 h-9 rounded-full flex justify-between items-center px-1 z-50">
          <span
            className={\`px-5 py-1 rounded-full text-sm cursor-pointer text-black \${billingCycle === 'monthly' ? 'bg-black text-white' : ''}\`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <span
            className={\`px-2 py-1 rounded-full text-sm cursor-pointer text-black \${billingCycle === 'annually' ? 'bg-black text-white' : ''}\`}
            onClick={() => setBillingCycle('annually')}
          >
            Annually<span className="bg-slate-200 text-black rounded-full px-1 ml-1 text-xs">-{discountRate}%</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 pb-3 px-2 mt-6">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="bg-black border w-80 rounded-2xl h-auto pb-10 shadow-lg z-50">
            <div className="p-5 rounded-2xl">
              <span className="text-white">{plan.name}</span>
              <div className="mt-3 mb-2">
                <span className="text-white text-3xl">
                  \${billingCycle === 'monthly' ? plan.monthlyPrice : calculateAnnualPrice(plan.monthlyPrice).toFixed(2)}{' '}
                  <span className="text-xs">{billingCycle === 'annually' ? 'annually' : 'per month'}</span>
                </span>
              </div>
              <span className="text-slate-300 text-sm">{plan.description}</span>
              <div className="mt-5">
              <Link href={plan.link} target='_blank'>
                <button
                  className="bg-white getstarted text-black w-full h-10 rounded-lg"
                  aria-label={\`Get started with the \${plan.name}\`}
                >
                  Get started
                </button>
              </Link>
              </div>
            </div>
            <div className="bg-black rounded-2xl pl-5 pt-3">
              <span className="text-white">Features</span>
              {plan.features.map((feature, index) => (
                <span key={index} className="text-slate-300 text-sm flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingSectionBlack;
`;


// Source code for blue pricing page
const sourcecodeblue = `
'use client';
import Link from 'next/link';
import React, { useState } from 'react';

function PricingSectionBlue() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const discountRate = 20; // Define the discount rate in percentage

  const pricingPlans = [
    {
      name: 'Basic Plan',
      monthlyPrice: 10,
      description: 'Basic features for up to 10 users.',
      features: [
        'Access to essential tools',
        'Basic chat and email support',
        'Limited storage capacity',
        'Monthly usage reports',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Business Plan',
      monthlyPrice: 25,
      description: 'Advanced tools for up to 20 users.',
      features: [
        'Advanced tools for power users',
        'Priority support with live chat',
        'More storage and bandwidth',
        'Detailed analytics',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Enterprise Plan',
      monthlyPrice: 40,
      description: 'Advanced features + unlimited users.',
      features: [
        'Custom solutions for big teams',
        'Dedicated account manager',
        'Unlimited storage and bandwidth',
        'Advanced analytics and reporting',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
  ];

  // Function to calculate the annual price
  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * (1 - discountRate / 100);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 mt-5">
        <div className="text-4xl sm:text-6xl">Our Pricing Plans</div>
        <span className="text-center text-gray-300 text-sm sm:text-base">
          Select from our range of affordable plans <br /> tailored to suit every budget.
        </span>
      </div>

      <div className="flex justify-center items-center mt-5">
        <div className="bg-white w-56 h-9 rounded-full flex justify-between items-center px-1 z-50">
          <span
            className={\`px-5 py-1 rounded-full text-sm cursor-pointer text-black \${billingCycle === 'monthly' ? 'bg-gray-900 text-white' : ''}\`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <span
            className={\`px-2 py-1 rounded-full text-sm cursor-pointer text-black \${billingCycle === 'annually' ? 'bg-gray-900 text-white' : ''}\`}
            onClick={() => setBillingCycle('annually')}
          >
            Annually<span className="bg-slate-200 text-black rounded-full px-1 ml-1 text-xs">-{discountRate}%</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 px-2 pb-3 mt-6">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="border-2 border-gray-700 w-80 rounded-2xl h-auto pb-10 shadow-lg bg-gradient-to-r from-black to-gray-900 z-50">
            <div className="p-5 rounded-2xl">
              <span className="text-white">{plan.name}</span>
              <div className="mt-3 mb-2">
                <span className="text-white text-3xl">
                  \${billingCycle === 'monthly' ? plan.monthlyPrice : calculateAnnualPrice(plan.monthlyPrice).toFixed(2)}{' '}
                  <span className="text-xs">{billingCycle === 'annually' ? 'annually' : 'per month'}</span>
                </span>
              </div>
              <span className="text-slate-300 text-sm">{plan.description}</span>
              <div className="mt-5">
              <Link href={plan.link} target='_blank'>
                <button
                  className="bg-sky-500 buttonPress hover:bg-sky-400 text-white w-full h-10 rounded-full"
                  aria-label={\`Get started with the \${plan.name}\`}
                >
                  Get started
                </button>
                </Link>
              </div>
            </div>
            <div className="bg-black rounded-2xl pl-5 pt-3 bg-gradient-to-r from-black to-gray-900">
              <span className="text-white">Features</span>
              {plan.features.map((feature, index) => (
                <span key={index} className="text-slate-300 text-sm flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingSectionBlue;
`;

const example = [
  {
    title: 'Example.tsx',
    code: `import React from 'react'
import PricingSectionWhite from './components/ui/PricingSectionWhite'


function page() {
  return (
    <div>
      <PricingSectionWhite/>
    </div>
  )
}

export default page;`,
  },
];

  return (
    <div className='bg-black/80 text-white backdrop-blur-md w-full pt-24 overflow-auto p-5'>
      <span className='text-4xl font-semibold pl-1'>Pricing Section</span>
      <div>
        <p className='sm:text-base mt-4 pl-1 text-gray-400 md:pr-96'>Modern Pricing Sections designed to convert your customers. Available in 3 different Themes.</p>
      </div>
      <div className='flex flex-col items-start mt-10 mb-10'>
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
                <div onClick={() => handleColorChange('White')} className={`bg-white rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'White' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
                <div onClick={() => handleColorChange('Black')} className={`bg-black rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'Black' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
                <div onClick={() => handleColorChange('Blue')} className={`bg-blue-400 rounded-full h-4 w-4 border-2 cursor-pointer ${activeColor === 'Blue' ? 'border-zinc-200' : 'border-zinc-400'}`}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black border rounded-lg border-zinc-800 w-full max-w-[63rem] h-auto mt-2'>
          <div>
            {activeTab === 'Preview' && (
              <div className='black-grid-embed'>
                {activeColor === 'White' && <PricingSectionWhite />}
                {activeColor === 'Black' && <PricingSectionBlack />}
                {activeColor === 'Blue' && <PricingSectionBlue />}
            
              </div>
            )}
            {activeTab === 'Code' && (
              <div>
                {activeColor === 'White' && <SerenitySourceCodeBlock codeString={sourcecodewhite} language="javascript"/>}
                {activeColor === 'Black' && <SerenitySourceCodeBlock codeString={sourcecodeblack} language="javascript"/>}
                {activeColor === 'Blue' &&  <SerenitySourceCodeBlock codeString={sourcecodeblue} language="javascript"/>}
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
                  <pre className='bg-zinc-900/70 backdrop-blur-lg p-3 sm:ml-4 border border-zinc-700 shadow-lg rounded-md overflow-auto text-sm sm:text-base w-[350px] sm:w-[600px]'>
                    {activeTab === 'Preview' && (
                    <div>
                      {activeColor === 'White' && <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add pricing-section-white</code>}
                      {activeColor === 'Black' && <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add pricing-section-black</code>}
                      {activeColor === 'Blue' &&  <code className='text-zinc-300'>npx @ayushmxxn/serenity-ui@latest add pricing-section-blue</code>}
                    </div>
                    )}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(getCommand(), 1)}
                    className='absolute right-0 top-2 p-2 w-10 h-auto bg-[#111113] rounded border-r border-zinc-700'
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
        <SerenityExampleBlock files={example}/>
      </div>
    </div>
  )
}

export default StarRatingTestimonialPage;
