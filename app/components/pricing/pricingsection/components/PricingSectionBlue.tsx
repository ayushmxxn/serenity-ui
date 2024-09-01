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
            className={`px-5 py-1 rounded-full text-sm cursor-pointer text-black ${billingCycle === 'monthly' ? 'bg-gray-900 text-white' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <span
            className={`px-2 py-1 rounded-full text-sm cursor-pointer text-black ${billingCycle === 'annually' ? 'bg-gray-900 text-white' : ''}`}
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
                  ${billingCycle === 'monthly' ? plan.monthlyPrice : calculateAnnualPrice(plan.monthlyPrice).toFixed(2)}{' '}
                  <span className="text-xs">{billingCycle === 'annually' ? 'annually' : 'per month'}</span>
                </span>
              </div>
              <span className="text-slate-300 text-sm">{plan.description}</span>
              <div className="mt-5">
              <Link href={plan.link} target='_blank'>
                <button
                  className="bg-sky-500 buttonPress hover:bg-sky-400 text-white w-full h-10 rounded-full"
                  aria-label={`Get started with the ${plan.name}`}
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