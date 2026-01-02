"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services1Hero({ theme = 'light' }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll and fade effect
      gsap.to(headingRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isDark = theme === 'dark';
  
  return (
    <section 
      ref={sectionRef}
      className={`relative overflow-hidden min-h-[700px] md:min-h-[800px] lg:min-h-[900px] ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#FF6B5A]'}`}
    >
      <div className="relative mx-auto max-w-[1800px] px-4 md:px-6 lg:px-8 pt-32 md:pt-40 lg:pt-48 xl:pt-52 pb-16 md:pb-20">
        
        {/* Left Side - Services Label + Heading */}
        <div 
          ref={headingRef}
          className="relative z-10 pl-2 md:pl-4 lg:pl-6 max-w-[700px]"
        >
          <p className={`font-suisse text-[14px] md:text-[16px] tracking-wide mb-8 md:mb-10 font-normal ${isDark ? 'text-white' : 'text-[#2d2d2d]'}`}>
            Services
          </p>
          
          <h1 className={`font-suisse text-[64px] sm:text-[80px] md:text-[100px] lg:text-[120px] xl:text-[170px] font-medium leading-[0.9] tracking-[-0.025em] ${isDark ? 'text-white' : 'text-[#2d2d2d]'}`}>
            No more<br />chaos.
          </h1>
        </div>

        {/* Right Side - Description (Bottom Right Corner) */}
        <div className="absolute right-4 md:right-6 lg:right-8 bottom-0 w-full max-w-[400px] md:max-w-[440px] lg:max-w-[480px] pr-2 md:pr-4 lg:pr-6 pb-16 md:pb-20 z-10">
          <p className={`font-suisse text-[17px] md:text-[18px] lg:text-[19px] leading-[1.65] font-normal ${isDark ? 'text-[#b0b0b0]' : 'text-[#2d2d2d]'}`}>
            At MindMarket, we specialise in global qualitative research that helps brands make smarter, faster decisions. Whether you're refining a product, exploring new markets, or launching a campaign, our custom research services deliver the clarity you need — without the complexity.
          </p>
        </div>
      </div>

      {/* Left Character - Placeholder for your illustration */}
      <div className="absolute bottom-0 left-0 w-[280px] h-[320px] md:w-[340px] md:h-[400px] lg:w-[420px] lg:h-[480px] xl:w-[500px] xl:h-[560px] pointer-events-none z-5">
        {/* Add your left character image here */}
        {/* <img src="/chaos-left.png" alt="Chaos characters" className="w-full h-full object-contain object-bottom" /> */}
      </div>

      {/* Right Character - Placeholder for your illustration */}
      <div className="absolute top-[100px] md:top-[120px] lg:top-[140px] right-0 w-[240px] h-[520px] md:w-[300px] md:h-[620px] lg:w-[360px] lg:h-[700px] xl:w-[420px] xl:h-[780px] pointer-events-none z-5">
        {/* Add your right character image here */}
        {/* <img src="/success-right.png" alt="Success character" className="w-full h-full object-contain object-top" /> */}
      </div>

      {/* Paper Plane 1 - Flying in middle */}
      <div className="absolute top-[180px] md:top-[200px] left-[42%] md:left-[46%] lg:left-[45%] w-[80px] h-[60px] md:w-[100px] md:h-[75px] lg:w-[120px] lg:h-[90px] pointer-events-none hidden sm:block z-10">
        <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
          <path 
            d="M 10 45 L 110 10 L 100 45 L 110 80 L 10 45 Z M 100 45 L 40 45" 
            fill="white" 
            stroke="#2d2d2d" 
            strokeWidth="2" 
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Paper Plane 2 - Small one near left character */}
      <div className="absolute bottom-[280px] md:bottom-[320px] left-[180px] md:left-[240px] lg:left-[320px] w-[60px] h-[45px] md:w-[75px] md:h-[55px] pointer-events-none hidden md:block z-10 opacity-80 rotate-[-15deg]">
        <svg viewBox="0 0 75 55" fill="none" className="w-full h-full">
          <path 
            d="M 5 27 L 70 5 L 65 27 L 70 50 L 5 27 Z M 65 27 L 25 27" 
            fill="white" 
            stroke="#2d2d2d" 
            strokeWidth="1.5" 
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Decorative wavy line - Top Right */}
      <div className="absolute top-[120px] md:top-[140px] right-[12%] md:right-[16%] lg:right-[22%] w-[100px] h-[35px] md:w-[130px] md:h-[45px] pointer-events-none hidden md:block z-10">
        <svg viewBox="0 0 130 45" fill="none" className="w-full h-full">
          <path 
            d="M 10 22 Q 35 12, 60 22 T 110 22" 
            stroke={isDark ? "#ffffff" : "#1a1a1a"} 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative squiggle - Yellow accent */}
      <div className="absolute top-[320px] md:top-[380px] right-[130px] md:right-[170px] lg:right-[210px] xl:right-[250px] w-[40px] h-[60px] md:w-[50px] md:h-[75px] pointer-events-none hidden md:block z-10">
        <svg viewBox="0 0 50 75" fill="none" className="w-full h-full">
          <path 
            d="M 25 10 Q 32 30, 25 42 T 25 65" 
            stroke="#FFD93D" 
            strokeWidth="5" 
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
