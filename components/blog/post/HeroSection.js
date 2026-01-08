"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostHero({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);

  // Post data
  const post = {
    category: "Demand Generation",
    title: "Why Brand Is Your Most Underrated Growth Channel",
    author: "Tycho Luijten",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    readTime: "5 min read",
    date: "August 21, 2025",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop",
    hasVideo: false
  };

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1 });
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(titleRef.current, { opacity: 1 });
        }
      });
    }
    if (metaRef.current) {
      gsap.set(metaRef.current, { opacity: 1 });
      gsap.from(metaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        onComplete: () => {
          gsap.set(metaRef.current, { opacity: 1 });
        }
      });
    }
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 1 });
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        onComplete: () => {
          gsap.set(imageRef.current, { opacity: 1 });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Parse title to find italic words (between underscores)
  const renderTitle = (title) => {
    const parts = title.split(/(_[^_]+_)/g);
    return parts.map((part, i) => {
      if (part.startsWith('_') && part.endsWith('_')) {
        return <span key={i} className="italic">{part.slice(1, -1)}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section 
      className={`relative py-16 md:py-20 lg:py-24 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F5]'}`}
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Back Button */}
        <Link 
          href="/blog"
          className={`inline-flex items-center gap-2 mb-12 px-5 py-3 rounded-full font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base font-medium transition-all duration-300 ${
            isDark 
              ? 'bg-white/10 text-white hover:bg-white/15' 
              : 'bg-white text-[#111111] hover:bg-[#f0f0f0]'
          }`}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All blogs
        </Link>

        {/* Grid Layout - Content Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT SIDE - Content */}
          <div>
            {/* Category Badge */}
            <div className="mb-8">
              <span className="inline-block px-5 py-2.5 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 
              ref={titleRef}
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[48px] md:text-[56px] lg:text-[68px] xl:text-[80px] font-bold leading-[1.05] tracking-tight mb-10 ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
              style={{ opacity: 1 }}
            >
              {renderTitle(post.title)}
            </h1>

            {/* Meta Information */}
            <div 
              ref={metaRef}
              className="flex flex-wrap items-center gap-5"
              style={{ opacity: 1 }}
            >
              {/* Author Avatar & Name */}
              <div className="flex items-center gap-4">
                {post.authorAvatar ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-xl font-semibold ${
                    isDark 
                      ? 'bg-[#74F5A1]/20 text-[#74F5A1]' 
                      : 'bg-[#111111] text-white'
                  }`}>
                    {post.author?.charAt(0) || 'A'}
                  </div>
                )}
                <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-[#111111]'
                }`}>
                  {post.author}
                </p>
              </div>
              
              {/* Read Time */}
              <div className="flex items-center gap-2">
                <svg className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-[#666666]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg ${
                  isDark ? 'text-white/60' : 'text-[#666666]'
                }`}>
                  {post.readTime}
                </p>
              </div>

              {/* Date */}
              {post.date && (
                <div className="flex items-center gap-2">
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-[#666666]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg ${
                    isDark ? 'text-white/60' : 'text-[#666666]'
                  }`}>
                    {post.date}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Featured Image */}
          {post.image && (
            <div 
              ref={imageRef}
              className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] rounded-3xl overflow-hidden group"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              
              {/* Play Button Overlay (if video) */}
              {post.hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-24 h-24 bg-[#74F5A1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#5FE08D]">
                    <svg className="w-12 h-12 text-[#0a0a0a] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
