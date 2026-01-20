"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Sparkles, Zap, Brain, Network } from "lucide-react";
import { GridAnimation } from "../about/GridAnimation";
import { MaskedReveal } from "../ui/MaskedRevel";
import Link from "next/link";

// Register usage
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIAgentsHero({ theme = 'light' }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  // References for animated elements
  const circleBgRefs = useRef([]);
  const circleContentRefs = useRef([]);
  const centerOrbRef = useRef(null);

  const isDark = theme === 'dark';
  
  // Theme Colors - Using site's green color scheme
  const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const accentColor = isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]';
  const circleBlobColor = isDark ? 'bg-[#74F5A1]/10 border-[#74F5A1]/30' : 'bg-[#3BC972]/10 border-[#3BC972]/30';

  // AI Agent Icons for circles
  const agentIcons = [
    { icon: Bot, label: 'Chat Agent' },
    { icon: Brain, label: 'AI Assistant' },
    { icon: Zap, label: 'Automation' },
    { icon: Network, label: 'Integration' },
    { icon: Sparkles, label: 'Smart Agent' },
    { icon: Bot, label: 'Support Bot' },
    { icon: Brain, label: 'Analytics' },
    { icon: Zap, label: 'Workflow' },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 800px)",
        isMobile: "(max-width: 799px)",
      }, (context) => {
        let { isDesktop } = context.conditions;

        // Hero text animation
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
          });
        }

        if (subheadingRef.current) {
          gsap.from(subheadingRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
          });
        }

        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: 0.6,
            ease: "back.out(1.7)",
          });
        }

        // Animate circles
        circleContentRefs.current.forEach((ref, i) => {
          if (ref) {
            gsap.from(ref, {
              opacity: 0,
              scale: 0,
              rotation: -180,
              duration: 0.8,
              delay: 0.2 + i * 0.1,
              ease: "back.out(1.7)",
            });
          }
        });

        // Center orb pulse animation
        if (centerOrbRef.current) {
          gsap.to(centerOrbRef.current, {
            scale: 1.1,
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
          });
        }

        // Floating animation for circles with more dynamic movement
        circleBgRefs.current.forEach((ref, i) => {
          if (ref) {
            // Create a more complex floating pattern
            gsap.to(ref, {
              y: isDesktop ? "+=30" : "+=15",
              x: isDesktop ? `+=${10 + i * 2}` : `+=${5 + i}`,
              rotation: 360,
              duration: 4 + i * 0.3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            
            // Add scale pulse
            gsap.to(ref, {
              scale: 1.1,
              duration: 2 + i * 0.2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              delay: i * 0.3,
            });
          }
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [theme]);

  const calculatePosition = (i, isDesktop) => {
    if (!isDesktop) {
      // Mobile: Simple grid
      const cols = 2;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const spacing = 120;
      return {
        x: (col - 0.5) * spacing,
        y: (row - 1.5) * spacing,
      };
    }

    // Desktop: Circular arrangement
    const radius = 280;
    const angle = (i / agentIcons.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 ${bgColor} border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}
    >
      {/* Grid Animation Background */}
      <GridAnimation theme={theme} />

      {/* Animated Background Circles */}
      <div ref={wrapperRef} className="absolute inset-0 flex items-center justify-center z-0">
        {/* Center Orb with multiple layers for depth */}
        <div
          ref={centerOrbRef}
          className={`absolute w-32 h-32 md:w-48 md:h-48 rounded-full ${isDark ? 'bg-[#74F5A1]/30' : 'bg-[#3BC972]/30'} blur-3xl`}
        />
        <div className={`absolute w-24 h-24 md:w-36 md:h-36 rounded-full ${isDark ? 'bg-[#74F5A1]/20' : 'bg-[#3BC972]/20'} blur-2xl animate-pulse`} />
        <div className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full ${isDark ? 'bg-[#74F5A1]/40' : 'bg-[#3BC972]/40'} blur-xl`} />

        {/* Floating Circles with AI Icons */}
        {agentIcons.map((agent, i) => {
          const IconComponent = agent.icon;
          // Default to desktop layout, will be adjusted by GSAP
          const pos = calculatePosition(i, true);

          return (
            <div
              key={i}
              ref={(el) => (circleBgRefs.current[i] = el)}
              className="absolute hidden md:block"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
            >
              <div
                ref={(el) => (circleContentRefs.current[i] = el)}
                className={`${circleBlobColor} backdrop-blur-sm rounded-full p-4 md:p-6 border-2 transition-all duration-300 hover:scale-110 ${
                  isDark ? 'hover:bg-[#74F5A1]/20' : 'hover:bg-[#3BC972]/20'
                }`}
              >
                <IconComponent 
                  className={`w-6 h-6 md:w-8 md:h-8 ${accentColor}`} 
                />
              </div>
            </div>
          );
        })}
        
        {/* Mobile Grid Layout */}
        {agentIcons.slice(0, 4).map((agent, i) => {
          const IconComponent = agent.icon;
          const pos = calculatePosition(i, false);

          return (
            <div
              key={`mobile-${i}`}
              className="absolute md:hidden"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
            >
              <div
                className={`${circleBlobColor} backdrop-blur-sm rounded-full p-3 border-2 transition-all duration-300 ${
                  isDark ? 'hover:bg-[#74F5A1]/20' : 'hover:bg-[#3BC972]/20'
                }`}
              >
                <IconComponent 
                  className={`w-5 h-5 ${accentColor}`} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <div ref={headingRef} className="mb-8 md:mb-12">
          <MaskedReveal className="h-auto pb-2 md:pb-4">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${textColor}`}>
              <span className="block">AI Agents</span>
            </h1>
          </MaskedReveal>
          <MaskedReveal delay={0.15} className="h-auto pb-2 md:pb-4">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${accentColor}`}>
              <span className="block">Marketplace</span>
            </h1>
          </MaskedReveal>
        </div>

        <div ref={subheadingRef} className="max-w-3xl mx-auto mb-12">
          <MaskedReveal delay={0.3}>
            <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold leading-relaxed ${isDark ? 'text-[#f3f3f3]' : 'text-[#212121]'}`}>
              Discover powerful AI agents designed to automate workflows, enhance productivity, 
              and transform your business operations. Ready to deploy, ready to scale.
            </p>
          </MaskedReveal>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <MaskedReveal delay={0.45}>
            <Link href="#agents" className="inline-flex items-center gap-3 group">
              <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold tracking-tight ${isDark ? 'text-[#f3f3f3]' : 'text-[#111111]'}`}>
                Explore Agents
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
          </MaskedReveal>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className={`absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t ${isDark ? 'from-[#0a0a0a]' : 'from-white'} to-transparent pointer-events-none z-20`} />
      
      {/* Techy scan lines effect */}
      <div className={`absolute inset-0 pointer-events-none z-10 opacity-30 ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}>
        <div 
          className="absolute inset-0 scanlines"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${isDark ? 'rgba(116, 245, 161, 0.1)' : 'rgba(59, 201, 114, 0.08)'} 2px,
              ${isDark ? 'rgba(116, 245, 161, 0.1)' : 'rgba(59, 201, 114, 0.08)'} 4px
            )`,
          }} 
        />
      </div>
      
      {/* Animated particles/glow dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(20)].map((_, i) => {
          const size = 2 + Math.random() * 4;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = 5 + Math.random() * 5;
          const delay = Math.random() * 2;
          
          return (
            <div
              key={i}
              className={`absolute rounded-full particle-float ${isDark ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Add CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .scanlines {
          animation: scan 8s linear infinite;
        }
        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translate(10px, -10px) scale(1.2); 
            opacity: 0.6; 
          }
          50% { 
            transform: translate(-15px, 15px) scale(1.5); 
            opacity: 0.8; 
          }
          75% { 
            transform: translate(5px, 10px) scale(1.2); 
            opacity: 0.6; 
          }
        }
        .particle-float {
          animation: particleFloat ease-in-out infinite;
        }
      `}} />
    </section>
  );
}

