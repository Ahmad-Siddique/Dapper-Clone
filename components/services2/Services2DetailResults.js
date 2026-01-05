"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services2DetailResults({ 
  title, 
  description, 
  results = [], 
  theme = 'dark' 
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const resultsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      resultsRef.current.forEach((result, index) => {
        if (result) {
          gsap.from(result, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: result,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [results]);

  const isDark = theme === 'dark';
  
  return (
    <section 
      ref={sectionRef}
      className={`relative py-16 md:py-20 lg:py-24 ${isDark ? 'bg-[#111111]' : 'bg-[#F5F5F5]'}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#111111]'}`}
            >
              {title}
            </h2>
            <p 
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[18px] leading-relaxed ${isDark ? 'text-[#b0b0b0]' : 'text-[#666666]'}`}
            >
              {description}
            </p>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                ref={(el) => (resultsRef.current[index] = el)}
                className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:translate-x-2 ${isDark ? 'bg-[#1a1a1a] hover:bg-[#222222]' : 'bg-white hover:bg-[#FAFAFA]'}`}
              >
                <span className="flex-shrink-0 mt-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-[#74F5A1]"
                  >
                    <path
                      d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span 
                  className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] leading-relaxed ${isDark ? 'text-[#E0E0E0]' : 'text-[#444444]'}`}
                >
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

