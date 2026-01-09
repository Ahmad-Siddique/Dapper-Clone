"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIAgentDetailHero({ agent, theme = 'light' }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const badgeRef = useRef(null);

  const isDark = theme === 'dark';

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Create a timeline for sequential animations
      const tl = gsap.timeline();

      // Animate badge with rotation
      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      // Animate title with split text effect
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power4.out",
        }, "-=0.4");
      }

      // Animate description with fade and slide
      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
        }, "-=0.6");
      }

      // Animate image with scale and fade
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          rotation: 5,
          duration: 1.5,
          delay: 0.3,
          ease: "power3.out",
        });

        // Parallax effect on scroll
        gsap.to(imageRef.current, {
          y: -80,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }

      // Floating animation for rating section
      const ratingSection = containerRef.current?.querySelector('.rating-section');
      if (ratingSection) {
        gsap.to(ratingSection, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className={`absolute top-20 left-10 w-64 h-64 rounded-full ${isDark ? 'bg-[#74F5A1]/5' : 'bg-[#3BC972]/5'} blur-3xl animate-pulse`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full ${isDark ? 'bg-[#74F5A1]/3' : 'bg-[#3BC972]/3'} blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 w-80 h-80 rounded-full ${isDark ? 'bg-[#74F5A1]/4' : 'bg-[#3BC972]/4'} blur-3xl animate-pulse`} style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? '#74F5A1' : '#3BC972'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#74F5A1' : '#3BC972'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Back Button */}
      <Link 
        href="/ai-agents"
        className={`absolute top-8 left-6 md:left-8 z-[100] flex items-center gap-2 px-4 py-2 rounded-[4px] transition-all duration-300 cursor-pointer ${
          isDark 
            ? 'bg-black/40 hover:bg-black/60 text-white border border-white/20' 
            : 'bg-white/80 hover:bg-white text-black border border-black/20'
        } hover:scale-105`}
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm font-semibold">Back</span>
      </Link>

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="relative z-10">
            {/* Badge */}
            {agent.badge && (
              <div ref={badgeRef} className="mb-6 inline-block">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
                  agent.badge === 'BESTSELLER'
                    ? 'bg-yellow-500 text-black'
                    : agent.badge === 'NEW'
                    ? 'bg-green-500 text-white'
                    : agent.badge === 'TRENDING'
                    ? 'bg-pink-500 text-white'
                    : 'bg-[#74F5A1] text-black'
                }`}>
                  {agent.badge}
                </span>
              </div>
            )}

            {/* Category */}
            <div className="mb-4">
              <span className={`text-xs font-semibold uppercase tracking-wider font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
                isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'
              }`}>
                {agent.category}
              </span>
            </div>

            {/* Title */}
            <h1 
              ref={titleRef}
              className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-6 ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
            >
              {agent.name}
            </h1>

            {/* Description */}
            <p 
              ref={descriptionRef}
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold leading-relaxed mb-8 ${
                isDark ? 'text-[#f3f3f3]' : 'text-[#212121]'
              }`}
            >
              {agent.description}
            </p>

            {/* Rating and Sales */}
            <div className="rating-section flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className={`text-lg font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
                  isDark ? 'text-white' : 'text-[#111111]'
                }`}>
                  {agent.rating}
                </span>
              </div>
              <div className={`text-sm font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
                isDark ? 'text-white/60' : 'text-black/60'
              }`}>
                {agent.sales.toLocaleString()} sales
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              href="#pricing"
              className="inline-flex items-center gap-3 group"
            >
              <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold tracking-tight ${
                isDark ? 'text-[#f3f3f3]' : 'text-[#111111]'
              }`}>
                Purchase Now
              </span>
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-y-3 group-hover:opacity-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 1V13M7 13L3 9M7 13L11 9" fill="none" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-[-12px] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 1V13M7 13L3 9M7 13L11 9" fill="none" stroke="#74F5A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div 
              ref={imageRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#74F5A1]/20 to-[#5FE08D]/20"
            >
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${
                isDark ? 'from-black/50 via-transparent to-transparent' : 'from-white/30 via-transparent to-transparent'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className={`absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t ${
        isDark ? 'from-[#0a0a0a]' : 'from-white'
      } to-transparent pointer-events-none z-20`} />
    </section>
  );
}

