"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('All');
  const titleRef = useRef(null);
  const categories = ['All', 'Demand Generation', 'Other'];

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    
    if (titleRef.current) {
      // Set initial opacity to ensure visibility
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Blog Hero Section */}
      <section 
        className={`relative py-20 md:py-24 lg:py-32 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F5]'}`}
      >
        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-8 flex justify-center">
            <span className={`inline-flex items-center gap-2 text-base font-medium ${isDark ? 'text-white/80' : 'text-[#111111]'}`}>
              <span className="w-3 h-3 bg-[#74F5A1] rounded-sm"></span>
              Blog
            </span>
          </div>
          
          <h1 
            ref={titleRef}
            className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[56px] md:text-[72px] lg:text-[96px] xl:text-[120px] font-bold leading-[0.95] tracking-tight text-center ${isDark ? 'text-white' : 'text-[#111111]'}`}
            style={{ opacity: 1 }}
          >
            On our <span className="italic font-light">minds</span>
          </h1>
          
          <div className="mt-12 mb-6 text-center">
            <span 
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm md:text-base font-medium ${isDark ? 'text-white/70' : 'text-[#666666]'}`}
            >
              Choose a category:
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm md:text-base px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === category
                    ? 'bg-[#74F5A1] text-[#0a0a0a] shadow-lg shadow-[#74F5A1]/20'
                    : isDark
                    ? 'bg-white/10 text-white/80 hover:bg-white/15'
                    : 'bg-white text-[#666666] hover:bg-[#111111] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section
        className={`relative py-16 md:py-20 lg:py-24 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F5]'}`}
      >
        <div className="mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* First Row - 2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-10">
            
            {/* LEFT CARD - Takes 3 columns */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block lg:col-span-3">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 h-full">
                
                {/* Flex Container - 2 Columns */}
                <div className="flex flex-col md:flex-row h-full min-h-[600px]">
                  
                  {/* LEFT COLUMN - Image */}
                  <div className="relative w-full md:w-1/2 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                      alt="Demand Generation"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* RIGHT COLUMN - Content */}
                  <div className="relative w-full md:w-1/2 bg-[#2a2a2a] p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between">
                    
                    {/* Top - Category Badge */}
                    <div>
                      <span className="inline-block px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>

                    {/* Middle - Title */}
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold leading-[1.1] text-white transition-colors duration-300 group-hover:text-[#74F5A1]">
                      What Is Demand Generation? A Simple Guide for...
                    </h2>

                    {/* Bottom - Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base font-medium text-white">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm text-white/60">
                          8 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* RIGHT CARD - Image background with white content overlay */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block lg:col-span-1">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                
                {/* Background Image - Full Card */}
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop"
                  alt="Brand Growth"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />

                {/* White Content Box Overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    
                    {/* Category */}
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      Why Brand Is Your Most Underrated Growth Channel
                    </h2>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          5 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

          </div>

          {/* Second Row - 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-10">
            
            {/* Card 1 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      What Is Thought Leadership in B2B Marketing?
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          4 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Card 2 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      How to Build Brand Awareness in B2B Marketing
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          4 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Card 3 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Other
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      9 Signs It's Time to Hire a Marketing Agency
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                          alt="Eleni Zakof"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Eleni Zakof
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          5 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Card 4 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      What is the Niche Famous Framework?
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          6 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

          </div>

          {/* Third Row - 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            
            {/* Card 1 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      Content Marketing Strategy for B2B Success
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          7 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Card 2 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Other
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      The Future of Digital Marketing in 2026
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                          alt="Eleni Zakof"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Eleni Zakof
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          6 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Card 3 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Demand Generation
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      Lead Generation vs Demand Generation
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                          alt="Tycho Luijten"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Tycho Luijten
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          5 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Card 4 */}
            <Link href="/blog/why-brand-is-underrated-growth-channel" className="group block">
              <article className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 h-full min-h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
                  alt="Blog Post"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 rounded-lg text-base font-semibold uppercase tracking-wider bg-[#74F5A1] text-[#0a0a0a]">
                        Other
                      </span>
                    </div>
                    <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[1.2] mb-6 text-[#111111] transition-colors duration-300 group-hover:text-[#111111]/80">
                      Building a High-Performance Marketing Team
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                          alt="Eleni Zakof"
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-medium text-[#111111]">
                          Eleni Zakof
                        </span>
                        <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-base text-[#666666]">
                          8 min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}
