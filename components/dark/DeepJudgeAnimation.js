"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search, Zap, Database, Shield, Globe, Cpu, Lock, Cloud } from "lucide-react";

// Register usage
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DeepJudgeAnimation({ theme }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  // References
  const circleBgRefs = useRef([]);
  const circleContentRefs = useRef([]);
  const centerOrbRef = useRef(null);
  const searchFieldRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const heading3Ref = useRef(null);

  const isDark = theme === 'dark';
  
  // Theme Colors
  const bgColor = isDark ? 'bg-[#1c1c1c]' : 'bg-[#E8E8E8]';
  const textColor = isDark ? 'text-[#e5e5e5]' : 'text-slate-900';
  const circleBlobColor = isDark ? 'bg-neutral-800/80 border-neutral-700/50' : 'bg-white/70 border-white/40';
  const iconColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-slate-600';
  const cardBg = isDark ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-white/50';
  const cardTitle = isDark ? 'text-white' : 'text-slate-900';
  const cardDesc = isDark ? 'text-neutral-400' : 'text-slate-500';
  const badgeBg = isDark ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-slate-900';

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 800px)",
        isMobile: "(max-width: 799px)",
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 1, // Smooth scrolling
            pin: true,
          },
        });

        // =========================================
        // INITIAL SETUP (Responsive Layout)
        // =========================================
        const calculatePosition = (i) => {
             let x = 0;
             let y = 0;

             if (isDesktop) {
                // DESKTOP: Dual Arc Logic
                const isTop = i < 4;
                const colIndex = i % 4; 
                const spread = 240;
                const xOffset = -360 + (colIndex * spread); 
                const yBase = isTop ? -220 : 220;
                const isOuter = colIndex === 0 || colIndex === 3;
                const push = 100;
                let yOffset = yBase;
                if (isTop) {
                    if (isOuter) yOffset += push; 
                } else {
                    if (isOuter) yOffset -= push; 
                }
                x = xOffset;
                y = yOffset;
            } else {
                // MOBILE: Vertical Ellipse
                const angleDeg = (i * (360 / 8)) - 90; 
                const angleRad = (angleDeg * Math.PI) / 180;
                const rx = 140; 
                const ry = 280; 
                x = Math.cos(angleRad) * rx;
                y = Math.sin(angleRad) * ry;
            }
            return { x, y };
        };

        // Apply Initial Positions
        circleBgRefs.current.forEach((el, i) => {
            if(!el) return;
            const pos = calculatePosition(i);
            gsap.set(el, { x: pos.x, y: pos.y, scale: 1, opacity: 1 });
        });
        
        circleContentRefs.current.forEach((el, i) => {
            if(!el) return;
            const pos = calculatePosition(i);
            gsap.set(el, { x: pos.x, y: pos.y, scale: 1, opacity: 1 });
        });


        // =========================================
        // STAGE 1: MERGE TO CENTER (Dot Formation)
        // =========================================
        
        // 1. Content fades out
        tl.to(circleContentRefs.current, { opacity: 0, scale: 0.5, duration: 1 }, "stage1")
        
        // 2. Backgrounds move to CENTER (0,0) and shrink
        .to(circleBgRefs.current, {
            x: 0,
            y: 0, 
            scale: 0.2, 
            duration: 2,
            ease: "power2.inOut"
        }, "stage1")
        
        // 3. Hide Heading 1
        .to(heading1Ref.current, { opacity: 0, y: -50, duration: 1 }, "stage1")
        
        // 4. Transform to Single Orb (Seamless Swap)
        .to(circleBgRefs.current, { opacity: 0, duration: 0.1 }, "stage1+=1.9")
        .fromTo(centerOrbRef.current, 
            { width: 0, height: 0, opacity: 1, backgroundColor: "#FFFFFF" }, // Start WHITE
            { width: 20, height: 20, opacity: 1, duration: 0.2 },
            "stage1+=1.9"
        );

        tl.to({}, { duration: 0.5 }); // Hold Dot state

        // =========================================
        // STAGE 2: ORB MORPHS TO FIELD
        // =========================================
        
        const fieldWidth = isDesktop ? "600px" : "85vw";
        const headingY = isDesktop ? -120 : -160; 
        const fieldY = isDesktop ? 80 : 40;

        tl.fromTo(heading2Ref.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: headingY, duration: 1 }, 
            "stage2"
        );
        
        // MORPH TRANSITION: Physical Expansion
        tl.to(centerOrbRef.current, {
            width: fieldWidth,
            height: "64px",
            borderRadius: "32px",
            backgroundColor: "#FFFFFF", // Stay White
            y: fieldY,
            duration: 1.5,
            ease: "power2.inOut"
        }, "stage2")
        
        // Reveal text only AFTER morph is substantial
        .to(searchFieldRef.current, { opacity: 1, duration: 0.5 }, "stage2+=1.2");

        tl.to({}, { duration: 1 });

        // =========================================
        // STAGE 3: FIELD MORPHS BACK TO DOT
        // =========================================
        
        tl.to(searchFieldRef.current, { opacity: 0, duration: 0.5 }, "stage3")
        .to(centerOrbRef.current, {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF", // Stay White
            y: 0,
            duration: 1,
            ease: "power3.inOut"
        }, "stage3")
        .to(heading2Ref.current, { opacity: 0, y: -150, duration: 1 }, "stage3");

        // =========================================
        // STAGE 4: DOT EXPLODES TO CARDS
        // =========================================
        
        // Mobile Grid Size
        const cardWidth = isDesktop ? "250px" : "42vw"; 
        const cardHeight = isDesktop ? "320px" : "160px";

        tl.fromTo(heading3Ref.current,
            { opacity: 0, y: 50 },
            // Mobile: -320 to clear grid, Desktop: -280
            { opacity: 1, y: isMobile ? -320 : -280, duration: 1 },
            "stage4"
        );
        
        tl.to(centerOrbRef.current, { width: 30, height: 30, duration: 0.2 }, "stage4"); // Pulse

        const cards = gsap.utils.toArray(".feature-card");
        tl.set(cards, { opacity: 1, scale: 0.2 }, "stage4+=0.1")
          .to(centerOrbRef.current, { opacity: 0, duration: 0.1 }, "stage4+=0.2"); 
        
        tl.to(cards, {
            width: cardWidth,
            height: cardHeight,
            borderRadius: "24px",
            backgroundColor: isDark ? "rgba(23, 23, 23, 0.95)" : "rgba(255, 255, 255, 0.95)", // Neutral Dark
            scale: 1,
            left: (i) => {
                if(isMobile) {
                    // Mobile Grid Logic (2 Columns)
                    if (i === 4) return "50%"; // Last one centered
                    return (i % 2 === 0) ? "27%" : "73%"; // Col 1 vs Col 2
                }
                // Desktop: Horizontal Spread
                const positions = ["15%", "32.5%", "50%", "67.5%", "85%"];
                return positions[i];
            },
            top: (i) => {
                if(isMobile) {
                    // Mobile Grid Rows (2 per row)
                    const row = Math.floor(i / 2);
                    const startTop = 42; 
                    return `${startTop + (row * 18)}%`; 
                }
                // Desktop: Horizontal Line
                return "55%";
            },
            xPercent: -50,
            yPercent: -50,
            duration: 1.5,
            stagger: 0.1,
            ease: "expo.out"
        }, "stage4+=0.2");
        
        tl.to(".card-content", { opacity: 1, duration: 0.5 }, "stage4+=1");

      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDark]); // Re-run GSAP when theme changes to ensure colors match if dynamic (though most are CSS classes)

  // Icons Array (8 Items)
  const circleItems = [
     // Top Row
     { icon: Zap, text: "Instant Retrieval" },
     { icon: Database, text: "Secure Data" },
     { icon: Lock, text: "Enterprise Grade" },
     { icon: Cloud, text: "Cloud Native" },
     // Bottom Row
     { icon: Shield, text: "Compliance" },
     { icon: Globe, text: "Global Scale" },
     { icon: Cpu, text: "AI Power" },
     { icon: Search, text: "Deep Search" }
  ];


  const bgStyle =
    theme === "dark"
      ? {
          backgroundColor: "#2b2b2b",
          backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
          radial-gradient(ellipse at top left, rgba(60, 60, 60, 0.3), transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(50, 50, 50, 0.2), transparent 50%)
        `,
          backgroundBlendMode: "overlay, normal, normal",
        }
      : { backgroundColor: "#EFEFEF" };

  const noiseOverlayStyle = {
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.015) 2px, rgba(0, 0, 0, 0.015) 4px)
    `,
  };

  return (
    <main ref={containerRef} style={bgStyle} className={`min-h-screen font-helvetica overflow-x-hidden transition-colors duration-500`}>
      <div ref={wrapperRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        
        {/* === HEADINGS (Z-20) === */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-4 sm:px-6">
          <h1 ref={heading1Ref} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center ${textColor} tracking-tight leading-[1.1] absolute max-w-5xl transition-colors duration-500`}>
            Your collective knowledge is
            <br className="hidden sm:block" /> your unique asset
          </h1>
          <h1 ref={heading2Ref} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center ${textColor} tracking-tight leading-[1.1] absolute opacity-0 max-w-5xl transition-colors duration-500`}>
            Search the way you think
            <br className="hidden sm:block" /> to unlock everything
          </h1>
          <h1 ref={heading3Ref} className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center ${textColor} tracking-tight leading-[1.1] absolute opacity-0 max-w-5xl top-[50%] transition-colors duration-500`}>
            Build, deploy and orchestrate
            <br className="hidden sm:block" /> AI agents powered by your data
          </h1>
        </div>

        {/* === ANIMATION LAYER (Z-10) === */}
        <div className="relative w-full h-full z-10">
            
            {/* GROUP 1: CIRCLE ITEMS (Separated References) */}
            {circleItems.map((item, i) => (
                <React.Fragment key={i}>
                    {/* Background Blob (Independent) */}
                    <div 
                        ref={el => circleBgRefs.current[i] = el}
                        className={`circle-bg absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 ${circleBlobColor} backdrop-blur-xl shadow-xl rounded-xl sm:rounded-2xl z-10 transition-colors duration-500`}
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)" // Initial Centered, GSAP will Set X/Y
                        }}
                    />
                    
                    {/* Content (Independent) */}
                    <div 
                        ref={el => circleContentRefs.current[i] = el}
                        className="circle-content absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex flex-col items-center justify-center z-20 gap-1 sm:gap-1.5 md:gap-2 pointer-events-none"
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)" // Initial Centered, GSAP will Set X/Y
                        }}
                    >
                        <item.icon size={20} className={`sm:w-6 sm:h-6 md:w-8 md:h-8 ${iconColor}`} strokeWidth={1.5} />
                        <span className={`text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold ${subTextColor} text-center leading-tight px-0.5 sm:px-1`}>{item.text}</span>
                    </div>
                </React.Fragment>
            ))}

            {/* GROUP 2: CENTER ORB / FIELD */}
            <div 
                ref={centerOrbRef}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isDark ? 'bg-white' : 'bg-black'} z-30 flex items-center justify-center overflow-hidden shadow-2xl`}
                // INITIAL STATE: White background, 0 size
                style={{ width: '0px', height: '0px', opacity: 0, borderRadius: '50%', backgroundColor: '#FFFFFF' }} 
            >
                <div ref={searchFieldRef} className="flex items-center w-full px-3 sm:px-4 md:px-5 lg:px-6 opacity-0">
                  <Search className="text-slate-500 mr-2 sm:mr-3 md:mr-4 shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" size={24} />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-400 font-normal truncate">Ask anything about your data...</span>
                </div>
            </div>

            {/* GROUP 3: CARDS */}
            {[
               { title: "Connect", desc: "Ingest any data source" },
               { title: "Index", desc: "Vectorize for AI" },
               { title: "Retrieve", desc: "Semantic search" },
               { title: "Reason", desc: "LLM processing" },
               { title: "Deploy", desc: "Custom Agents" }
            ].map((card, i) => (
                <div 
                    key={i}
                    className={`feature-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${cardBg} shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden backdrop-blur-sm z-20 transition-colors duration-500`}
                    style={{ width: '0px', height: '0px', opacity: 0, borderRadius: '50%' }}
                >
                    <div className="card-content opacity-0 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col h-full relative">
                        {/* Number Badge */}
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${badgeBg} rounded-lg sm:rounded-xl flex items-center justify-center font-bold mb-2 sm:mb-3 md:mb-4 shrink-0 text-sm sm:text-base md:text-lg`}>
                            {i+1}
                        </div>
                        <h3 className={`text-base sm:text-lg md:text-xl font-bold ${cardTitle} mb-1 sm:mb-2`}>{card.title}</h3>
                        <p className={`${cardDesc} text-xs sm:text-sm leading-relaxed`}>{card.desc}</p>
                        
                        <div className={`mt-auto pt-2 sm:pt-3 md:pt-4 flex items-center ${isDark ? 'text-white' : 'text-black'} font-semibold text-xs sm:text-sm`}>
                            Learn more <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 md:w-[14px] md:h-[14px] ml-0.5 sm:ml-1" />
                        </div>
                    </div>
                </div>
            ))}

        </div>

      </div>
    </main>
  );
}
