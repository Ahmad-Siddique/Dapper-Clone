// components/StrategyCallSection.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';

gsap.registerPlugin(Draggable);

const strategySteps = [
  {
    id: 1,
    number: '01',
    title: 'Discovery Meeting',
    description: "We take the time to understand your business, marketing goals, and challenges — so we can get a clear picture of what you truly need."
  },
  {
    id: 2,
    number: '02',
    title: 'Analysis of Marketing Set-up',
    description: "We analyze your marketing setup to identify opportunities and gaps."
  },
  {
    id: 3,
    number: '03',
    title: 'Strategy Presentation',
    description: "In a follow-up call, we share our findings and an initial roadmap for higher marketing ROI."
  },
  {
    id: 4,
    number: '04',
    title: 'Custom Solution Design',
    description: "Based on our analysis, we design a tailored marketing strategy that aligns with your business objectives and budget."
  },
  {
    id: 5,
    number: '05',
    title: 'Implementation Planning',
    description: "We create a detailed implementation plan with timelines, milestones, and key performance indicators to track progress."
  },
  {
    id: 6,
    number: '06',
    title: 'Ongoing Support',
    description: "We provide continuous support and optimization to ensure your marketing engine delivers maximum ROI over time."
  }
];

export default function StrategyCallSection({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const draggableInstanceRef = useRef(null);

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    setVisibleCards(getVisibleCards());

    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, strategySteps.length - visibleCards);

  useEffect(() => {
    if (!carouselRef.current || !containerRef.current) return;

    const carousel = carouselRef.current;
    const container = containerRef.current;

    const updateBounds = () => {
      const containerWidth = container.offsetWidth;
      const carouselWidth = carousel.scrollWidth;
      const maxDrag = Math.max(0, carouselWidth - containerWidth);
      
      return {
        minX: -maxDrag,
        maxX: 0
      };
    };

    const bounds = updateBounds();

    const draggableInstance = Draggable.create(carousel, {
      type: 'x',
      bounds: bounds,
      inertia: true,
      dragResistance: 0.3,
      edgeResistance: 0.65,
      onDragStart: function() {
        setIsDragging(true);
      },
      onDrag: function() {
        const cardWidth = carousel.children[0]?.offsetWidth || 0;
        const gap = 24;
        const offset = Math.abs(this.x);
        const newIndex = Math.round(offset / (cardWidth + gap));
        setCurrentIndex(Math.min(newIndex, maxIndex));
      },
      onDragEnd: function() {
        setIsDragging(false);
        const cardWidth = carousel.children[0]?.offsetWidth || 0;
        const gap = 24;
        const offset = Math.abs(this.x);
        const newIndex = Math.round(offset / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
        
        gsap.to(carousel, {
          x: -clampedIndex * (cardWidth + gap),
          duration: 0.3,
          ease: 'power2.out'
        });
        
        setCurrentIndex(clampedIndex);
      },
      snap: function(endValue) {
        const cardWidth = carousel.children[0]?.offsetWidth || 0;
        const gap = 24;
        return Math.round(endValue / (cardWidth + gap)) * (cardWidth + gap);
      }
    })[0];

    draggableInstanceRef.current = draggableInstance;

    const handleResize = () => {
      const newBounds = updateBounds();
      draggableInstance.applyBounds(newBounds);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (draggableInstance) {
        draggableInstance.kill();
      }
    };
  }, [maxIndex, visibleCards]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
        const gap = 24;
        
        gsap.to(carouselRef.current, {
          x: -newIndex * (cardWidth + gap),
          duration: 0.5,
          ease: 'power2.out'
        });

        if (draggableInstanceRef.current) {
          draggableInstanceRef.current.update();
        }
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
        const gap = 24;
        
        gsap.to(carouselRef.current, {
          x: -newIndex * (cardWidth + gap),
          duration: 0.5,
          ease: 'power2.out'
        });

        if (draggableInstanceRef.current) {
          draggableInstanceRef.current.update();
        }
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`${isDark ? 'bg-[#2b2b2b]' : 'bg-[#E8E4E0]'} py-20 lg:py-32`}
    >
      <div className="container max-w-[1800px] mx-auto px-6">
        <div className="flex items-start justify-between mb-16 lg:mb-20">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 bg-[#7FFF7F] rounded-sm"></span>
              <span className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>Strategy Call</span>
            </div>
            
            <h2 className={`text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight max-w-4xl ${isDark ? 'text-white' : 'text-black'}`}>
              Here's what to expect
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-end mb-6 lg:mb-8">
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${
                currentIndex === 0
                  ? `${isDark ? 'bg-gray-700' : 'bg-gray-300'} cursor-not-allowed opacity-50`
                  : `${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black'}`
              }`}
              aria-label="Previous slide"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${
                currentIndex >= maxIndex
                  ? `${isDark ? 'bg-gray-700' : 'bg-gray-300'} cursor-not-allowed opacity-50`
                  : `${isDark ? 'bg-white hover:bg-white/90' : 'bg-black hover:bg-gray-900'} text-white`
              }`}
              aria-label="Next slide"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <div 
            ref={carouselRef}
            className={`flex gap-6 ${isDragging ? 'select-none' : ''}`}
            style={{ touchAction: 'pan-x' }}
          >
            {strategySteps.map((step) => (
              <div
                key={step.id}
                className={`flex-shrink-0 w-[calc(100%-2rem)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${isDark ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'} rounded-2xl p-10 lg:p-12 flex flex-col justify-between min-h-[400px] lg:min-h-[500px]`}
                style={{ userSelect: isDragging ? 'none' : 'auto' }}
              >
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <h3 className={`text-4xl lg:text-5xl font-normal leading-tight pr-4 flex-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      {step.title}
                    </h3>
                    <span className={`text-5xl lg:text-6xl font-normal ${isDark ? 'text-white' : 'text-black'} flex-shrink-0`}>
                      {step.number}
                    </span>
                  </div>
                </div>

                <p className={`text-xl lg:text-2xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${
              currentIndex === 0
                ? `${isDark ? 'bg-gray-700' : 'bg-gray-300'} cursor-not-allowed opacity-50`
                : `${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black'}`
            }`}
            aria-label="Previous slide"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-300 ${
              currentIndex >= maxIndex
                ? `${isDark ? 'bg-gray-700' : 'bg-gray-300'} cursor-not-allowed opacity-50`
                : `${isDark ? 'bg-white hover:bg-white/90' : 'bg-black hover:bg-gray-900'} text-white`
            }`}
            aria-label="Next slide"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
