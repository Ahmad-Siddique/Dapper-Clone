'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check } from 'lucide-react';

export default function AIAgentCard({ agent, theme = 'light' }) {
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // Simulate purchase process
    setTimeout(() => {
      setIsPurchasing(false);
      setIsPurchased(true);
      // Here you would integrate with your payment system
      console.log('Purchased:', agent.name);
    }, 1500);
  };

  // Generate slug from agent name - matching detail page slugs
  const slugMap = {
    'Customer Support Bot': 'customer-support-bot',
    'Content Generator AI': 'content-generator-ai',
    'Data Analyst Agent': 'data-analyst-agent',
    'Email Assistant': 'email-assistant',
    'Social Media Manager': 'social-media-manager',
    'Code Review Assistant': 'code-review-assistant',
    'HR Recruiter Bot': 'hr-recruiter-bot',
    'E-commerce Assistant': 'ecommerce-assistant',
  };
  const slug = slugMap[agent.name] || agent.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/e-commerce/g, 'ecommerce');

  return (
    <Link href={`/ai-agents/${slug}`}>
      <div
        className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
          isDark 
            ? 'bg-black/20 border border-white/10 hover:border-white/30 hover:bg-black/40' 
            : 'bg-white border border-black/10 hover:border-black/20 hover:bg-black/5'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Image Container */}
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${isDark ? 'from-[#74F5A1]/20 to-[#5FE08D]/20' : 'from-[#3BC972]/10 to-[#4DD97F]/10'}`}>
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDark ? 'from-black/70 via-transparent to-transparent' : 'from-white/80 via-transparent to-transparent'
        }`} />

        {/* Badge */}
        {agent.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
            agent.badge === 'BESTSELLER'
              ? 'bg-yellow-500 text-black'
              : agent.badge === 'NEW'
              ? 'bg-green-500 text-white'
              : agent.badge === 'TRENDING'
              ? 'bg-pink-500 text-white'
              : 'bg-cyan-500 text-white'
          }`}>
            {agent.badge}
          </div>
        )}

        {/* Pro Badge */}
        {agent.isPro && (
          <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold ${
            isDark ? 'bg-[#74F5A1]/20 text-[#74F5A1] border border-[#74F5A1]/50' : 'bg-[#3BC972]/20 text-[#3BC972] border border-[#3BC972]/50'
          }`}>
            PRO
          </div>
        )}

        {/* Rating */}
        <div className={`absolute bottom-6 left-6 right-6`}>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className={`text-sm font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-white`}>
              {agent.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wider font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
            isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'
          }`}>
            {agent.category}
          </span>
          <span className={`text-xs font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            {agent.sales.toLocaleString()} sales
          </span>
        </div>

        {/* Name */}
        <h3 className={`text-xl sm:text-2xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-2 ${isDark ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
          {agent.name}
        </h3>

        {/* Description */}
        <p className={`text-sm font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-4 line-clamp-2 ${isDark ? 'text-white/80' : 'text-black/70'}`}>
          {agent.description}
        </p>

        {/* Features */}
        <div className="mb-4 space-y-1">
          {agent.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className={`w-3 h-3 ${isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'}`} />
              <span className={`text-xs font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Price and Purchase Button */}
        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div>
            <div className={`text-2xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              ${agent.price}
            </div>
            <div className={`text-xs font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${isDark ? 'text-white/60' : 'text-black/60'}`}>
              One-time purchase
            </div>
          </div>

          {isPurchased ? (
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[6px] bg-green-500/20 border border-green-500/50">
              <Check className="w-5 h-5 text-green-400" />
            </div>
          ) : (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePurchase();
            }}
            className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[6px] bg-[#74F5A1] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 cursor-pointer ${
              isDark
                ? 'group-hover:bg-white'
                : 'group-hover:bg-black'
            } ${isPurchasing || isPurchased ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
              {isPurchasing ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {/* Default arrow */}
                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0">
                    <svg width="16" height="16" viewBox="0 0 14 14">
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

                  {/* Hover arrow */}
                  <span className="absolute inset-0 flex items-center justify-center translate-x-[-12px] translate-y-[12px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg width="16" height="16" viewBox="0 0 14 14">
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
            </div>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
}

