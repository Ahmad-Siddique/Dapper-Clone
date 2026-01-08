'use client';

import { useState, useRef, useEffect } from 'react';

const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Data Collection',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'We gather and analyze data to deeply understand your market and buyers.',
  },
  {
    id: 2,
    title: 'Strategy Definition',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="18" r="3"/>
        <circle cx="6" cy="6" r="3"/>
        <path d="M13 6h3a2 2 0 0 1 2 2v7" strokeLinecap="round"/>
      </svg>
    ),
    description: 'We identify your Ideal Customer Profile, messaging strategy, channels, content and more.',
  },
  {
    id: 3,
    title: 'Demand Gen',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'We set up content creation systems and build highly targeted campaigns. We make you famous in your niche and build demand.',
  },
  {
    id: 4,
    title: 'Lead Nurturing',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'We create automated nurture sequences and personalized outreach to convert prospects into qualified leads.',
  },
  {
    id: 5,
    title: 'Optimization',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: 'We continuously test, measure, and optimize campaigns to improve conversion rates and ROI.',
  },
];

export default function ProcessSection({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollButtons);
      return () => slider.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (sliderRef.current) {
        sliderRef.current.style.cursor = 'grab';
      }
    }
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 700;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#EFEFEF]'} py-28 md:py-36 lg:py-44`}>
      <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          {/* Badge */}
          <div className="mb-10 flex items-center gap-3">
            <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
            <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase ${isDark ? 'text-white' : 'text-[#212121]'}`}>
              Process
            </span>
          </div>

          {/* Title */}
          <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[1.05] tracking-[-0.02em]">
            <span className={`block text-[48px] sm:text-[60px] md:text-[72px] lg:text-[84px] xl:text-[96px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              Our <span className="italic font-light">process</span> to improve
            </span>
            <span className={`mt-1 block text-[48px] sm:text-[60px] md:text-[72px] lg:text-[84px] xl:text-[96px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              your SaaS pipeline
            </span>
          </h2>
        </div>

        {/* Navigation Buttons - Above Cards on Right */}
        <div className="mb-6 flex justify-end gap-3">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`flex h-12 w-12 items-center justify-center rounded-lg ${isDark ? 'bg-[#1a1a1a] text-white hover:bg-[#74F5A1] hover:text-black' : 'bg-white hover:bg-[#74F5A1]'} transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'disabled:hover:bg-[#1a1a1a]' : 'disabled:hover:bg-white'}`}
            aria-label="Scroll left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`flex h-12 w-12 items-center justify-center rounded-lg ${isDark ? 'bg-[#74F5A1] text-black hover:bg-[#5FE08D]' : 'bg-black text-white hover:bg-[#74F5A1] hover:text-black'} transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'disabled:hover:bg-[#74F5A1]' : 'disabled:hover:bg-black disabled:hover:text-white'}`}
            aria-label="Scroll right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Slider - 3 Cards Visible */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROCESS_STEPS.map((step, index) => (
            <article
              key={step.id}
              className={`flex-shrink-0 w-[calc(33.333%-16px)] min-w-[450px] h-[500px] rounded-2xl ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border border-black/6'} p-12 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]`}
            >
              {/* Top: Title and Icon */}
              <div className="flex items-start justify-between gap-6">
                {/* Title */}
                <h3 className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[32px] md:text-[38px] lg:text-[43px] font-regular tracking-tight ${isDark ? 'text-white' : 'text-[#111111]'} leading-tight`}>
                  {index + 1}. {step.title}
                </h3>

                {/* Icon */}
                <div className={`flex-shrink-0 ${isDark ? 'text-white' : 'text-[#111111]'}`}>{step.icon}</div>
              </div>

              {/* Bottom: Description */}
              <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[18px] font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#555555]'}`}>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
