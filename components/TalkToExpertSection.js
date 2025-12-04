// components/TalkToExpertSection.jsx
'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TalkToExpertSection() {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    if (!section || !leftText || !rightText) return;

    const ctx = gsap.context(() => {
      // Left text: move left as user scrolls down through the section
      gsap.fromTo(
        leftText,
        { x: 0 },
        {
          x: -200, // tweak distance as you like
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',   // when section enters viewport
            end: 'bottom top',     // until section leaves viewport
            scrub: true,           // ties motion to scroll
          },
        }
      );

      // Right text: move right as user scrolls down through the section
      gsap.fromTo(
        rightText,
        { x: 0 },
        {
          x: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2A2A2A] py-32 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="#74F5A1" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Large decorative arrow background - subtle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
          <path
            d="M400 100L700 400L400 700M100 400H700"
            stroke="#74F5A1"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Decorative squares - bottom right */}
      <div className="pointer-events-none absolute bottom-16 right-12 hidden lg:block">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <rect x="0" y="0" width="48" height="48" rx="8" fill="#4A4A4A" />
          <rect x="62" y="0" width="48" height="48" rx="8" fill="#74F5A1" />
        </svg>
      </div>

      {/* Decorative squares - bottom left */}
      <div className="pointer-events-none absolute bottom-24 left-12 hidden lg:block">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <rect x="0" y="0" width="70" height="70" rx="8" fill="#74F5A1" />
        </svg>
      </div>

      {/* Decorative square - top left */}
      <div className="pointer-events-none absolute top-20 left-20 hidden xl:block">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect x="0" y="0" width="50" height="50" rx="6" fill="#4A4A4A" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1800px] px-4 md:px-8">
        {/* Main content centered */}
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-16 xl:gap-24">
          {/* Left text: "Talk to" */}
          <div
            ref={leftTextRef}
            className="text-center lg:text-right will-change-transform"
          >
            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] text-[56px] sm:text-[68px] md:text-[80px] lg:text-[96px] xl:text-[110px] font-bold leading-[1.05] tracking-[-0.02em] text-white">
              Talk to
            </h2>
          </div>

          {/* Center: Stacked phone cards with expert images */}
          <div className="relative flex-shrink-0">
            {/* Back phone frame */}
            <div className="absolute -right-8 -top-6 z-0 h-[500px] w-[290px] sm:h-[540px] sm:w-[320px] rounded-[44px] border-[4px] border-white/20 bg-[#1A1A1A] p-3 opacity-60 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
              <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-gradient-to-b from-[#3A3A3A] to-[#2A2A2A]">
                <div className="relative h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop"
                    alt="Expert team member"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              {/* Top notch */}
              <div className="absolute left-1/2 top-5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1A1A1A]" />
            </div>

            {/* Front phone frame */}
            <div className="relative z-10 h-[500px] w-[290px] sm:h-[540px] sm:w-[320px] rounded-[44px] border-[4px] border-white/30 bg-[#1A1A1A] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.6)]">
              <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-gradient-to-b from-[#3A3A3A] to-[#2A2A2A]">
                {/* Expert image */}
                <div className="relative h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop"
                    alt="Marketing expert"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Green action badge at bottom */}
                <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
                  <Link
                    href="/contact"
                    aria-label="Contact an expert"
                    className="group flex h-16 w-16 items-center justify-center rounded-2xl bg-[#74F5A1] shadow-[0_10px_35px_rgba(116,245,161,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_45px_rgba(116,245,161,0.7)] active:scale-95"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12L19 12M19 12L12 5M19 12L12 19"
                        stroke="#111111"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Top notch/camera cutout effect */}
              <div className="absolute left-1/2 top-5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1A1A1A]" />
            </div>

            {/* Subtle glow behind phones */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-[44px] bg-[#74F5A1]/8 blur-3xl" />
          </div>

          {/* Right text: "an expert" */}
          <div
            ref={rightTextRef}
            className="text-center lg:text-left will-change-transform"
          >
            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] text-[56px] sm:text-[68px] md:text-[80px] lg:text-[96px] xl:text-[110px] font-normal italic leading-[1.05] tracking-[-0.02em] text-white">
              an expert
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
