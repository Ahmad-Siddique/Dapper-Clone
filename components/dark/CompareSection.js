// components/CompareSection.jsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TRADITIONAL_ITEMS = [
  'Marketing and sales work in silos',
  'Prioritizes MQLs',
  'Reporting stops at vanity metrics',
  'Relies on gated content for leads',
  'Sees marketing as a cost center',
  'Thinks in campaigns',
];

const MODERN_ITEMS = [
  'Marketing and sales collaborate to generate revenue',
  'Prioritizes pipeline growth and lead quality',
  'Metrics align with real business outcomes',
  'Provides ungated value that builds demand',
  'Proves marketing as a revenue driver',
  'Thinks in always-on demand gen',
];

export default function CompareSection({ theme = 'light' }) {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  
  // Triangle animation effects
  const [triangles, setTriangles] = useState([]);
  const triangleIdRef = useRef(0);

  // Background styles based on theme
  const bgStyle = theme === 'dark' 
    ? {
        backgroundColor: '#2b2b2b',
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
          radial-gradient(ellipse at top left, rgba(60, 60, 60, 0.3), transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(50, 50, 50, 0.2), transparent 50%)
        `,
        backgroundBlendMode: 'overlay, normal, normal',
      }
    : { backgroundColor: '#FFFFFF' };

  const noiseOverlayStyle = {
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.03) 1px, rgba(255, 255, 255, 0.03) 2px),
      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.03) 1px, rgba(255, 255, 255, 0.03) 2px),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.015) 2px, rgba(255, 255, 255, 0.015) 4px)
    `,
  };

  const createTriangle = useCallback((x, y) => {
    const id = triangleIdRef.current++;
    const size = Math.random() * 12 + 20;
    const rotation = Math.random() * 360;
    const greenShades = ['#74F5A1', '#5FE08D', '#4DD97F', '#3BC972'];
    const color = greenShades[Math.floor(Math.random() * greenShades.length)];

    const newTriangle = {
      id,
      x,
      y,
      size,
      rotation,
      color,
    };

    setTriangles((prev) => [...prev, newTriangle]);

    setTimeout(() => {
      setTriangles((prev) => prev.filter((t) => t.id !== id));
    }, 1050);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastTime = 0;
    const throttleDelay = 100;

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;
      lastTime = currentTime;

      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createTriangle(x, y);
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [createTriangle]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // Disable scroll-trigger animation on mobile/tablet
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) {
      setHasEntered(true); // show everything immediately
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.unobserve(sectionEl);
        }
      },
      {
        threshold: 0.45,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Stagger timing (ms)
  const STAGGER = 140;
  const traditionalTotal = TRADITIONAL_ITEMS.length * STAGGER;
  const modernBaseDelay = traditionalTotal + 200;

  // Calculate icon colors based on theme
  const traditionalIconBg = theme === 'dark' ? '#FFFFFF' : '#111111';
  const traditionalIconStroke = theme === 'dark' ? '#111111' : '#FFFFFF';
  const modernIconBg = '#74F5A1';
  const modernIconStroke = '#111111';

  return (
    <>
      <style jsx>{`
        @keyframes triangle-fade {
          0% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .animate-triangle-fade {
          animation: triangle-fade 1.05s ease-out forwards;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-20 sm:py-24 md:py-32"
        style={bgStyle}
      >
        {/* Noise texture overlay */}
        {theme === 'dark' && (
          <div 
            className="absolute inset-0 pointer-events-none z-[1]"
            style={noiseOverlayStyle}
          />
        )}

        {/* CURSOR TRAIL TRIANGLES */}
        {triangles.map((triangle) => (
          <div
            key={triangle.id}
            className="pointer-events-none absolute z-[5] animate-triangle-fade"
            style={{
              left: `${triangle.x}px`,
              top: `${triangle.y}px`,
              width: '0',
              height: '0',
              borderLeft: `${triangle.size / 2}px solid transparent`,
              borderRight: `${triangle.size / 2}px solid transparent`,
              borderBottom: `${triangle.size}px solid ${triangle.color}`,
              transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Decorative shapes - right */}
        <div className="pointer-events-none absolute right-0 top-20 hidden lg:block">
          <svg width="140" height="200" viewBox="0 0 140 200" fill="none">
            <rect x="0" y="0" width="70" height="70" rx="8" fill="#74F5A1" />
            <rect x="70" y="0" width="70" height="70" rx="8" fill={theme === 'dark' ? '#3a3a3a' : '#E8E8E8'} />
            <rect x="70" y="70" width="70" height="70" rx="8" fill="#74F5A1" />
            <rect x="0" y="140" width="70" height="70" rx="8" fill="#74F5A1" />
            <rect x="70" y="140" width="70" height="70" rx="8" fill={theme === 'dark' ? '#3a3a3a' : '#E8E8E8'} />
          </svg>
        </div>

        {/* Decorative shapes - left */}
        <div className="pointer-events-none absolute left-0 bottom-32 hidden lg:block">
          <svg width="100" height="160" viewBox="0 0 100 160" fill="none">
            <rect x="0" y="0" width="50" height="50" rx="6" fill="#74F5A1" />
            <rect x="0" y="60" width="50" height="50" rx="6" fill={theme === 'dark' ? '#3a3a3a' : '#E8E8E8'} />
            <rect x="0" y="120" width="50" height="50" rx="6" fill="#74F5A1" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1500px] px-4 md:px-8">
          {/* Label */}
          <div className="mb-8 sm:mb-10 flex items-center justify-center gap-3">
            <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 rounded-sm bg-[#74F5A1]" />
            <span className={`font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase ${theme === 'dark' ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
              Compare
            </span>
          </div>

          {/* Heading */}
          <h2 className={`mx-auto mb-8 sm:mb-10 max-w-5xl text-center font-[Helvetica Now Text,Arial,sans-serif] leading-[1.08] tracking-[-0.02em] ${theme === 'dark' ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
            <span className="block text-[32px] sm:text-[40px] md:text-[48px] lg:text-[58px] xl:text-[68px] font-normal italic">
              Traditional B2B marketing
            </span>
            <span className="block text-[32px] sm:text-[40px] md:text-[48px] lg:text-[58px] xl:text-[68px] font-semibold">
              vs modern B2B marketing
            </span>
          </h2>

          {/* Subheading */}
          <p className={`mx-auto mb-16 sm:mb-20 md:mb-24 max-w-3xl text-center font-[Helvetica Now Text,Arial,sans-serif] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-regular leading-relaxed tracking-tight ${theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#444444]'}`}>
            B2B marketing is changing, fast. Attention spans are getting shorter,
            AI is getting smarter, and competition is increasing. That&apos;s why you
            need a partner who is a frontrunner in the industry.
          </p>

          {/* Comparison Grid */}
          <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
            {/* Traditional Column */}
            <div>
              <h3 className={`mb-8 sm:mb-10 md:mb-12 text-center font-[Helvetica Now Text,Arial,sans-serif] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
                Traditional B2B Marketing
              </h3>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {TRADITIONAL_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className={[
                      'flex items-center gap-4 sm:gap-5 md:gap-6 rounded-xl sm:rounded-2xl border',
                      theme === 'dark' 
                        ? 'border-white/[0.08] bg-[#3a3a3a]' 
                        : 'border-black/[0.08] bg-[#F9F9F9]',
                      'px-4 py-4 sm:px-6 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7',
                      'transition-all duration-600 ease-out',
                      hasEntered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4',
                    ].join(' ')}
                    style={{
                      transitionDelay: hasEntered ? `${index * STAGGER}ms` : '0ms',
                    }}
                  >
                    <div 
                      className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: traditionalIconBg }}
                    >
                      <svg
                        width="18"
                        height="3"
                        viewBox="0 0 22 3"
                        fill="none"
                        aria-hidden="true"
                      >
                        <line
                          x1="0"
                          y1="1.5"
                          x2="22"
                          y2="1.5"
                          stroke={traditionalIconStroke}
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                    <p className={`flex-1 font-[Helvetica Now Text,Arial,sans-serif] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] xl:text-[23px] font-semibold leading-snug tracking-tight ${theme === 'dark' ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Column */}
            <div>
              <h3 className={`mb-8 sm:mb-10 md:mb-12 text-center font-[Helvetica Now Text,Arial,sans-serif] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
                Modern B2B Marketing
              </h3>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {MODERN_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className={[
                      'flex items-center gap-4 sm:gap-5 md:gap-6 rounded-xl sm:rounded-2xl border border-[#74F5A1]/30',
                      theme === 'dark' 
                        ? 'bg-[#74F5A1]/[0.12]' 
                        : 'bg-[#74F5A1]/[0.08]',
                      'px-4 py-4 sm:px-6 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7',
                      'transition-all duration-600 ease-out',
                      hasEntered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4',
                    ].join(' ')}
                    style={{
                      transitionDelay: hasEntered
                        ? `${modernBaseDelay + index * STAGGER}ms`
                        : '0ms',
                    }}
                  >
                    <div 
                      className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: modernIconBg }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 22 22"
                        fill="none"
                        aria-hidden="true"
                      >
                        <line
                          x1="11"
                          y1="0"
                          x2="11"
                          y2="22"
                          stroke={modernIconStroke}
                          strokeWidth="3"
                        />
                        <line
                          x1="0"
                          y1="11"
                          x2="22"
                          y2="11"
                          stroke={modernIconStroke}
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                    <p className={`flex-1 font-[Helvetica Now Text,Arial,sans-serif] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] xl:text-[23px] font-semibold leading-snug tracking-tight ${theme === 'dark' ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}