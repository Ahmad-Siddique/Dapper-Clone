"use client";

import React, { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function AIAgentDetailPricing({ agent, theme = 'light' }) {
  const isDark = theme === 'dark';
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setIsPurchased(true);
      console.log('Purchased:', agent.name);
    }, 1500);
  };

  return (
    <section 
      id="pricing"
      className={`relative py-20 md:py-32 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-4 ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}>
              Pricing
            </h2>
            <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold ${
              isDark ? 'text-[#aaaaaa]' : 'text-[#444444]'
            }`}>
              One-time purchase, lifetime access
            </p>
          </div>

          {/* Pricing Card */}
          <div className={`rounded-2xl border p-8 md:p-12 ${
            isDark 
              ? 'bg-black/20 border-white/10' 
              : 'bg-white border-black/10'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div>
                <div className={`text-5xl md:text-6xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-2 ${
                  isDark ? 'text-white' : 'text-[#111111]'
                }`}>
                  ${agent.price}
                </div>
                <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] font-semibold ${
                  isDark ? 'text-[#aaaaaa]' : 'text-[#444444]'
                }`}>
                  One-time purchase
                </p>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isPurchasing || isPurchased}
                className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[6px] bg-[#74F5A1] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 ${
                  isDark
                    ? 'group-hover:bg-white'
                    : 'group-hover:bg-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPurchasing ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : isPurchased ? (
                  <Check className="w-6 h-6 text-black" />
                ) : (
                  <>
                    <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0">
                      <svg width="18" height="18" viewBox="0 0 14 14">
                        <path
                          d="M1 13L13 1M13 1H5M13 1V9"
                          fill="none"
                          stroke="#212121"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center translate-x-[-12px] translate-y-[12px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <svg width="18" height="18" viewBox="0 0 14 14">
                        <path
                          d="M1 13L13 1M13 1H5M13 1V9"
                          fill="none"
                          stroke={isDark ? "#111111" : "#74F5A1"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* What's Included */}
            <div className="border-t pt-8">
              <h3 className={`text-xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-6 ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}>
                What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#74F5A1] flex-shrink-0`}>
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] font-semibold ${
                      isDark ? 'text-[#f3f3f3]' : 'text-[#111111]'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

