"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContentCreativeHero({ theme = 'light' }) {
  const heroSectionRef = useRef(null);
  const videoPinWrapperRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!heroSectionRef.current || !videoContainerRef.current || !videoPinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const videoContainer = videoContainerRef.current;
      const pinWrapper = videoPinWrapperRef.current;

      // Create the animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: pinWrapper, // Pin the wrapper, not the video itself
          pinSpacing: false,
        }
      });

      // Animate the video container inside the pinned wrapper
      tl.fromTo(videoContainer, 
        {
          width: '400px',
          height: '225px',
          borderRadius: '20px',
        },
        {
          width: '90vw',
          height: '90vh',
          borderRadius: '8px',
          ease: 'power2.inOut',
        }
      );

    }, heroSectionRef.current);

    return () => {
      ctx.revert();
    };
  }, []);

  const bgColor = theme === 'dark' ? '#0a0a0a' : '#F5F5F5';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#111111';
  const accentColor = '#74F5A1';

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full"
      style={{ backgroundColor: bgColor, minHeight: '300vh', paddingBottom: '100vh' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-20 md:px-8 md:pt-40 md:pb-32">
        {/* Top Tagline */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill={accentColor}
            />
          </svg>
          <span
            className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] font-medium uppercase tracking-[0.2em]"
            style={{ color: textColor }}
          >
            Content & Creative
          </span>
        </div>

        {/* Main Heading */}
        <div className="mb-16 text-center">
          <h1
            className="mb-4 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[3.5rem] font-bold leading-[1.1] tracking-tight md:text-[5.5rem] lg:text-[7rem]"
            style={{ color: textColor }}
          >
            Hire a B2B{' '}
            <span
              className="font-['Playfair_Display','Georgia',serif] italic font-normal"
              style={{ fontStyle: 'italic' }}
            >
              Creative
            </span>{' '}
            Powerhouse
          </h1>
        </div>

        {/* Pin Wrapper - This gets pinned */}
        <div 
          ref={videoPinWrapperRef}
          className="relative mx-auto mb-8 z-50"
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '225px'
          }}
        >
          {/* Video Container - This gets animated */}
          <div
            ref={videoContainerRef}
            className="relative overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            style={{
              width: '400px',
              height: '225px',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        {/* Bottom Content - Stays visible and scrollable */}
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="mb-8 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[1.1rem] leading-relaxed md:text-[1.3rem]"
            style={{ color: textColor, opacity: 0.8 }}
          >
            Attention spans are shrinking, and social media is more crowded
            than ever. Now's the time for content and creative that truly
            stands out. We'll make your prospects stop scrolling.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center gap-3">
            <span
              className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[1rem] font-medium"
              style={{ color: textColor }}
            >
              Discover more
            </span>
            <button
              className="flex h-12 w-12 items-center justify-center rounded-[8px] transition-all hover:scale-110"
              style={{ backgroundColor: accentColor }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="rotate-90"
              >
                <path
                  d="M10 4L16 10L10 16M16 10H4"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Side Images */}
        <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-[300px] w-[200px] overflow-hidden rounded-[16px] border border-black/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
              alt="Creative team"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-[350px] w-[250px] overflow-hidden rounded-[16px] border border-black/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
              alt="Studio work"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-[8px] opacity-60" style={{ backgroundColor: accentColor }} />
          <div className="absolute -bottom-4 -right-8 h-12 w-12 rounded-[8px] border-2 opacity-40" style={{ borderColor: accentColor }} />
          <div className="absolute -right-12 top-1/2 h-8 w-8 rounded-[8px] opacity-50" style={{ backgroundColor: accentColor }} />
        </div>
      </div>
    </section>
  );
}

