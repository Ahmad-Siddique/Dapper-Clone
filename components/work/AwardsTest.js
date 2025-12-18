"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const AwardsTest = () => {
  const cursorRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const [activeAward, setActiveAward] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const awards = [
    {
      id: 1,
      text: "U.S. Agency Awards: Digital Agency of the Year - 2024",
      details: "Recognized for outstanding digital marketing excellence",
      logo: "🏆",
      year: "2024"
    },
    {
      id: 2,
      text: "Adweek's Fastest Growing Agencies - 2023, 2024",
      details: "Consecutive years of exceptional growth",
      logo: "📈",
      year: "2023-2024"
    },
    {
      id: 3,
      text: "Inc.'s 5000 Fastest Growing Companies - 2021, 2022, 2023, 2024",
      details: "Four consecutive years of remarkable expansion",
      logo: "🚀",
      year: "2021-2024"
    },
    {
      id: 4,
      text: "Inc.'s Best Workplaces in America - 2023, 2024",
      details: "Creating exceptional workplace culture",
      logo: "⭐",
      year: "2023-2024"
    },
    {
      id: 5,
      text: "Google Premiere Partner of the Year - Online Sales",
      details: "Excellence in Google Ads performance",
      logo: "🎯",
      year: "2024"
    },
    {
      id: 6,
      text: "Hello Partner Top 30 Affiliate Agencies - 2024",
      details: "Leading affiliate marketing performance",
      logo: "🤝",
      year: "2024"
    },
    {
      id: 7,
      text: "Best Influencer Marketing Partnership - 2024",
      details: "Outstanding influencer campaign results",
      logo: "📱",
      year: "2024"
    },
    {
      id: 8,
      text: "Digiday: Best Use of Retail Media - 2024",
      details: "Innovative retail media strategies",
      logo: "🛍️",
      year: "2024"
    }
  ];

  useEffect(() => {
    let xTo, yTo;
    
    if (cursorRef.current) {
      xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.4,
        ease: "power2.out"
      });
      yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.4,
        ease: "power2.out"
      });
    }

    const handleMouseMove = (e) => {
      if (isVisible && xTo && yTo) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  const isMouseLeaving = (e) => {
    const related = e.relatedTarget;
    return !related || !e.currentTarget.contains(related);
  };

  const handleAwardHover = (award, e) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    setActiveAward(award);
    
    if (!isVisible) {
      setIsVisible(true);
      
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          scale: 0,
          opacity: 0
        });
        
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    }
  };

  const handleAwardLeave = (e) => {
    if (!isMouseLeaving(e)) return;

    hideTimeoutRef.current = setTimeout(() => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setIsVisible(false);
            setActiveAward(null);
          }
        });
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full bg-[#334238] py-12 sm:py-16 lg:py-20 xl:py-24 relative">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-white text-sm font-extrabold font-['Figtree'] uppercase leading-none tracking-wide">
              Awards
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-['Figtree'] leading-tight">
              Our hard work keeps paying off.
            </h1>
          </div>
        </div>

        <div className="w-full">
          <div className="border-t border-b border-lime-300/20">
            {awards.map((award) => (
              <div
                key={award.id}
                className="group border-t border-lime-300/20 first:border-t-0 transition-colors duration-300 hover:bg-lime-300/5"
                onMouseEnter={(e) => handleAwardHover(award, e)}
                onMouseLeave={handleAwardLeave}
              >
                <div className="py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16">
                  <p className="text-white text-lg sm:text-xl lg:text-2xl font-normal font-['Figtree'] leading-loose group-hover:text-lime-300 transition-colors duration-300">
                    {award.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={cursorRef}
        className="fixed pointer-events-auto z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        {activeAward && (
          <div className="bg-lime-300 text-neutral-900 rounded-3xl p-12 shadow-2xl w-[500px] min-h-[240px]">
            <div className="flex items-center gap-8 mb-8">
              <span className="text-5xl">{activeAward.logo}</span>
              <span className="text-base font-bold bg-neutral-900 text-lime-300 px-6 py-3 rounded-full">
                {activeAward.year}
              </span>
            </div>
            <p className="text-lg font-medium font-['Figtree'] leading-relaxed">
              {activeAward.details}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AwardsTest;