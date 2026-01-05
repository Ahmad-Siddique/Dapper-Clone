"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: 1,
    title: "Transforming patient care with AI-powered diagnostics",
    tags: ["Healthcare", "AI & ML", "Digital Transformation"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    link: "/case-studies/ai-diagnostics"
  },
  {
    id: 2,
    title: "Building a scalable telemedicine platform for rural healthcare",
    tags: ["Telemedicine", "Cloud Infrastructure", "Mobile App"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    link: "/case-studies/telemedicine-platform"
  },
  {
    id: 3,
    title: "Enterprise virtual assistant for healthcare administration",
    tags: ["NLP", "Automation", "Enterprise"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    link: "/case-studies/virtual-assistant"
  },
  {
    id: 4,
    title: "Secure health data interoperability solution",
    tags: ["Data Security", "API Integration", "Compliance"],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
    link: "/case-studies/data-interoperability"
  },
  {
    id: 5,
    title: "Predictive analytics for patient outcomes",
    tags: ["Data Analytics", "Machine Learning", "Healthcare"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    link: "/case-studies/predictive-analytics"
  }
];

export default function RelatedCases({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left' 
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount;

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.userSelect = 'none';
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (!sliderRef.current) return;
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
    sliderRef.current.style.userSelect = 'auto';
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
    sliderRef.current.style.userSelect = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    if (!sliderRef.current) return;
    const touch = e.touches[0];
    setStartX(touch.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!sliderRef.current) return;
    const touch = e.touches[0];
    const x = touch.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-24"
      style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)'
          : 'linear-gradient(to bottom, #e8ddd3 0%, #d4c4b8 100%)'
      }}
    >
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* Header */}
        <div 
          ref={titleRef}
          className="max-w-[1800px] mx-auto mb-12 md:mb-16 flex items-center justify-between"
        >
          <h2 
            className="font-space-grotesk font-bold text-[48px] md:text-[56px] lg:text-[64px]"
            style={{
              color: isDark ? '#FFFFFF' : '#7b2cbf',
              lineHeight: '1.1',
              letterSpacing: '-0.01em'
            }}
          >
            Related Cases
          </h2>

          <Link 
            href="/case-studies"
            className="hidden md:flex items-center gap-2 font-space-grotesk text-[18px] font-medium transition-opacity hover:opacity-70"
            style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}
          >
            View all cases
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <path 
                d="M4 10h12m0 0l-4-4m4 4l-4 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-[1800px] mx-auto">
          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-auto scrollbar-hide select-none"
            style={{
              cursor: 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="flex-shrink-0 w-[340px] sm:w-[500px] md:w-[680px] lg:w-[870px]"
                style={{ 
                  pointerEvents: isDragging ? 'none' : 'auto'
                }}
              >
                <Link
                  href={caseItem.link}
                  className="group block relative rounded-2xl overflow-hidden h-[500px] sm:h-[580px] md:h-[640px] lg:h-[680px]"
                  style={{
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                  onClick={(e) => {
                    if (isDragging) {
                      e.preventDefault();
                    }
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 340px, (max-width: 768px) 500px, (max-width: 1024px) 680px, 870px"
                      unoptimized
                      draggable={false}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 lg:p-10">
                    
                    {/* Bottom Content */}
                    <div>
                      <h3 className="text-white font-space-grotesk font-bold text-[24px] md:text-[28px] lg:text-[32px] leading-tight mb-5 md:mb-6">
                        {caseItem.title}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {caseItem.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="inline-block px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/30 text-white font-space-grotesk text-sm md:text-base backdrop-blur-sm bg-white/10 transition-all hover:bg-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`}
              style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}
              aria-label="Previous slide"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M15 18l-6-6 6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`}
              style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}
              aria-label="Next slide"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M9 18l6-6-6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
