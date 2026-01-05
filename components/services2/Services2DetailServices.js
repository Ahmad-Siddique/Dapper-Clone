"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services2DetailServices({ services = [], theme = 'dark' }) {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  const isDark = theme === 'dark';
  
  if (!services || services.length === 0) return null;

  return (
    <section 
      ref={sectionRef}
      className={`relative py-16 md:py-20 lg:py-24 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <h2 
          className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[36px] lg:text-[42px] font-bold tracking-tight mb-8 md:mb-12 ${isDark ? 'text-white' : 'text-[#111111]'}`}
        >
          We offer the following services:
        </h2>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <li
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:translate-x-2 ${isDark ? 'bg-[#1a1a1a] hover:bg-[#222222]' : 'bg-[#FAFAFA] hover:bg-[#F0F0F0]'}`}
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
                {service}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

