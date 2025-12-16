"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";


// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection({ theme = "light" }) {
  // --- Refs & State for Hero ---
  const sectionRef = useRef(null); // Used for mouse move effect
  const heroSectionRef = useRef(null); // Used for ScrollTrigger
  const titleContainerRef = useRef(null);
  const [triangles, setTriangles] = useState([]);
  const triangleIdRef = useRef(0);
  const hasAnimatedRef = useRef(false);
  const animationIntervalRef = useRef(null);
  
  // --- Refs & State for Features (Video Stack / Cards) ---
  const [videoStack, setVideoStack] = useState([0, 1, 2, 3]); // Stack order: top to bottom
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);
  const heroCardsRef = useRef([]); // To target cards for GSAP transition

  // --- Refs & State for Portfolio Section ---
  const containerRef = useRef(null); // Main wrapper for Lenis/GSAP context
  const portfolioSectionRef = useRef(null);
  const portfolioCardsRef = useRef([]);
  const lenisRef = useRef(null);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const timeoutRef = useRef(null);

  // --- Data ---
  const mediaAssets = [
    {
      type: 'image',
      src: 'https://www.datocms-assets.com/151374/1741831437-mudwtr.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440',
      alt: 'MUD\\WTR brand showcase',
      title: 'MUD\\WTR',
      subtitle: 'Health & Wellness'
    },
    {
      type: 'image',
      src: 'https://www.datocms-assets.com/151374/1741910699-cotopaxi_482x858_alternate.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440',
      alt: 'Cotopaxi brand showcase',
      title: 'Cotopaxi',
      subtitle: 'Outdoor & Lifestyle'
    },
    {
      type: 'video',
      src: 'https://stream.mux.com/zaOX00ijKS1dZVZGFpLMjhNOIGbKQ8dmO/medium.mp4',
      alt: 'Digital marketing campaign showcase',
      title: 'OREO',
      subtitle: 'Food & Beverage'
    },
    {
      type: 'video',
      src: 'https://stream.mux.com/s5S6U18mND3t8caFSka7r7Wrulxm4SAb/medium.mp4',
      alt: 'Brand impact visualization',
      title: 'Coca-Cola',
      subtitle: 'Global Campaigns'
    }
  ];

  const brandLogos = [
    { src: "/stance_logo-bg.png", alt: "Cotopaxi" },
    { src: "/stance_logo-bg.png", alt: "MUD\\WTR" },
    { src: "/stance_logo-bg.png", alt: "OREO" },
    { src: "/stance_logo-bg.png", alt: "Coca-Cola" },
  ];

  const portfolioItems = [
    {
      type: "image",
      title: "MUD\\WTR Campaign",
      src: "https://www.datocms-assets.com/151374/1741831437-mudwtr.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440",
      alt: "MUD\\WTR Campaign Image",
      buttons: ["Health & Wellness"],
      link: "/work/mud-wtr",
    },
    {
      type: "image",
      title: "Cotopaxi Branding",
      src: "https://www.datocms-assets.com/151374/1741910699-cotopaxi_482x858_alternate.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440",
      alt: "Cotopaxi Branding Image",
      buttons: ["Outdoor & Active Lifestyle", "Fashion & Apparel"],
      link: "/work/cotopaxi",
    },
    {
      type: "video",
      title: "OREO Social Media",
      src: "https://stream.mux.com/zaOX00ijKS1dZVZGFpLMjhNOIGbKQ8dmO/medium.mp4",
      alt: "OREO Social Media Video",
      buttons: ["Food & Beverage", "CPG"],
      link: "/work/oreo",
    },
    {
      type: "video",
      title: "Coca-Cola Ads",
      src: "https://stream.mux.com/s5S6U18mND3t8caFSka7r7Wrulxm4SAb/medium.mp4",
      alt: "Coca-Cola Ads Video",
      buttons: ["Food & Beverage", "CPG"],
      link: "/work/coca-cola",
    },
  ];

  const LOGO_HEIGHT = 112;

  // --- Logic: Media Click Handling ---
  const handleMediaClick = (clickedIndex) => {
    // Reorder stack to bring clicked item to top (index 0)
    const newStack = [clickedIndex, ...videoStack.filter(idx => idx !== clickedIndex)];
    setVideoStack(newStack);
    
    // If it's a video, set it as playing
    if (mediaAssets[clickedIndex].type === 'video') {
      setPlayingVideo(clickedIndex);
    } else {
      setPlayingVideo(null);
    }
  };

  // --- Logic: Video Playback ---
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && mediaAssets[index].type === 'video') {
        if (index === playingVideo && index === videoStack[0]) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [playingVideo, videoStack, mediaAssets]);



  // --- Logic: GSAP Animations (Hero Electrical + Transition) ---
  useLayoutEffect(() => {
    if (!containerRef.current || !heroSectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. HERO TITLE ANIMATION (Existing)
      gsap.killTweensOf(".hero-title-line");
      gsap.set(".hero-title-line", { opacity: 1, y: 0 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleContainerRef.current,
          start: "top 85%",
          end: "top 50%",
          once: true,
          onEnter: () => {
            hasAnimatedRef.current = true;
            setTimeout(() => {
              startElectricalAnimation();
            }, 1000);
          },
          markers: false,
        },
      });

      revealTl.fromTo(
        ".hero-title-line",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );

      // Hero content entrance
      const entranceTl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
      entranceTl
        .from(".hero-badge", { y: 24, opacity: 0 })
        .from(".hero-body", { y: 32, opacity: 0, stagger: 0.08 }, "-=0.2");

      // 2. HERO TO PORTFOLIO TRANSITION
      const initTransitionAnimations = () => {
        // Initial states
        gsap.set(portfolioCardsRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(portfolioCardsRef.current, { opacity: 0, scale: 0.8 });

        const portfolioContent = portfolioSectionRef.current?.querySelectorAll(".portfolio-content > *");
        if (portfolioContent) {
           gsap.set(portfolioContent, { y: 30, opacity: 0 });
        }

        // Calculate transition positions
        const cardPositions = [];
        heroCardsRef.current.forEach((heroCard, index) => {
          if (heroCard && portfolioCardsRef.current[index]) {
            const portfolioCard = portfolioCardsRef.current[index];
            const heroRect = heroCard.getBoundingClientRect();
            // We need relative positions, usually easiest if we assume start at 0
            // Here we just want the delta to the portfolio card's position
            // But since we are scrubbing, we might need absolute calculations or 
            // fixed positioning approach if the layout is stable.
            // Using getBoundingClientRect works if we do it before scroll moves things too much
            // or use standard FLIP layout techniques. 
            // For now, using the logic from TestHome.js directly.
            
            // Note: calculating positions relative to viewport or parent might be tricky if
            // elements are far apart.
            // TestHome.js logic:
            const portfolioRect = portfolioCard.getBoundingClientRect();
            cardPositions[index] = {
              xDistance: portfolioRect.left - heroRect.left,
              yDistance: portfolioRect.top - heroRect.top,
            };
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "30% top",
            endTrigger: portfolioSectionRef.current,
            end: "center center",
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
          },
        });

        // Animate hero cards to portfolio positions
        heroCardsRef.current.forEach((heroCard, index) => {
            if (heroCard && cardPositions[index]) {
              const stackPosition = videoStack.indexOf(index); // Get visual position
              const startX = stackPosition * 75;
              const startY = stackPosition * 75;
              
              tl.fromTo(heroCard, {
                  x: startX,
                  y: startY,
                  scale: 1 - stackPosition * 0.05,
                  opacity: stackPosition === 0 ? 1 : 0.8,
                  zIndex: 40 - stackPosition
                }, {
                  x: startX + cardPositions[index].xDistance, // Add distance to start pos
                  y: startY + cardPositions[index].yDistance,
                  scale: 0.75,
                  opacity: 0,
                  ease: "none",
                  duration: 1,
                }, index * 0.05);
            }
        });

        // Animate portfolio cards appearing
        tl.to(portfolioCardsRef.current, {
            opacity: 1, scale: 1, y: 0, stagger: 0.1, ease: "none", duration: 0.8,
        }, 0.3);



        // Portfolio content reveal
        if (portfolioContent) {
            tl.to(portfolioContent, {
                y: 0, opacity: 1, stagger: 0.1, ease: "none", duration: 0.8,
            }, 0.5);
        }
      };

      // Run calculation after a moment to ensure layout is settled
      setTimeout(() => {
        initTransitionAnimations();
        ScrollTrigger.refresh();
      }, 800);

    }, containerRef.current);

    return () => ctx.revert();
  }, [theme, videoStack]); // Re-calculate when theme or stack changes

  // --- Logic: Brand Logo Animation Loop ---
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % brandLogos.length);
    }, 2500);
    return () => clearTimeout(timeoutRef.current);
  }, [currentLogoIndex]);


  // --- Logic: Electrical Effects (Keep existing helpers) ---
  const triggerElectricalAnimation = useCallback(() => {
    const titleLines = document.querySelectorAll(".hero-title-line");
    const originalColor = theme === "dark" ? "#f3f3f3" : "#111111";
    const electricColor = theme === "dark" ? "#74F5A1" : "#3BC972";
    const brightElectricColor = theme === "dark" ? "#FFFFFF" : "#FFFFFF";

    const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

    titleLines.forEach((line, lineIndex) => {
      const text = line.textContent;
      if (!line.querySelector(".char")) {
        const chars = text.split("").map((char, i) =>
              `<span class="char" style="color: ${originalColor}; display: inline-block; position: relative;" data-index="${i}">${
                char === " " ? "&nbsp;" : char
              }</span>`
          ).join("");
        line.innerHTML = chars;
      }

      const chars = line.querySelectorAll(".char");
      chars.forEach((char, charIndex) => {
        const baseDelay = lineIndex * 0.5 + charIndex * 0.06;
        const randomDelay = Math.random() * 0.1;
        const totalDelay = baseDelay + randomDelay;
        tl.to(char, { duration: 0.12, color: brightElectricColor, scale: 1.05, delay: totalDelay, ease: "power2.out" }, 0)
          .to(char, { duration: 0.18, color: electricColor, scale: 1.02, delay: totalDelay + 0.12, ease: "sine.inOut" }, 0)
          .to(char, { duration: 0.3, color: originalColor, scale: 1, delay: totalDelay + 0.3, ease: "power2.in" }, 0);
      });
    });
  }, [theme]);

  const startElectricalAnimation = useCallback(() => {
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    setTimeout(() => { triggerElectricalAnimation(); }, 800);
    animationIntervalRef.current = setInterval(() => { triggerElectricalAnimation(); }, 10000);
  }, [triggerElectricalAnimation]);

  // Clean up electrical
  useEffect(() => {
     const timer = setTimeout(() => { startElectricalAnimation(); }, 1500);
     return () => {
       clearTimeout(timer);
       if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
     };
  }, [startElectricalAnimation]);


  // --- Logic: Triangles (Mouse Trail) ---
  const createTriangle = useCallback((x, y) => {
    const id = triangleIdRef.current++;
    const size = Math.random() * 5 + 8;
    const rotation = Math.random() * 360;
    const greenShades = ["#74F5A1", "#5FE08D", "#4DD97F", "#3BC972"];
    const color = greenShades[Math.floor(Math.random() * greenShades.length)];
    const newTriangle = { id, x, y, size, rotation, color };
    setTriangles((prev) => [...prev, newTriangle]);
    setTimeout(() => { setTriangles((prev) => prev.filter((t) => t.id !== id)); }, 1050);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let lastTime = 0;
    const throttleDelay = 80;
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;
      lastTime = currentTime;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createTriangle(x, y);
    };
    section.addEventListener("mousemove", handleMouseMove);
    return () => { section.removeEventListener("mousemove", handleMouseMove); };
  }, [createTriangle]);

  // --- Logic: Idle "Float" Animation (NewEngen Style) ---
  useEffect(() => {
    // Target the INNER content of the cards to avoid conflict with ScrollTrigger
    // ScrollTrigger animates the card (outer wrapper), this animates the content (inner wrapper)
    const cardInners = heroCardsRef.current
      .map((card) => card?.firstElementChild)
      .filter(Boolean);
    
    // Kill any existing tweens on inner elements
    gsap.killTweensOf(cardInners);

    if (cardInners.length > 0) {
      // Create a floating effect on the inner content
      gsap.to(cardInners, {
        y: "-=15", // Move up 15px
        duration: 2.5,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "start", 
          yoyo: true,
          repeat: -1
        },
        yoyo: true,
        repeat: -1
      });
    }

    return () => {
      gsap.killTweensOf(cardInners);
    };
  }, [videoStack]); // Re-run if stack order changes

  // --- Styles ---
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes triangle-fade {
        0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
      }
      @keyframes subtle-glitch {
        0%, 100% { transform: translateX(0); }
        95% { transform: translateX(1px); }
        96% { transform: translateX(-1px); }
        97% { transform: translateX(0); }
      }
      .animate-triangle-fade { animation: triangle-fade 1.05s ease-out forwards; }
      .char { transition: color 0.15s ease, transform 0.15s ease; will-change: color, transform; animation: subtle-glitch 10s infinite; }
      .char:nth-child(3n) { animation-delay: 0.5s; }
      .char:nth-child(3n+1) { animation-delay: 1s; }
      .char:nth-child(3n+2) { animation-delay: 1.5s; }
      .font-fellix { font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .hero-title-line { transition: color 0.4s ease; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Background styles
  const bgStyle = theme === "dark"
      ? {
          backgroundColor: "#2b2b2b",
          backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
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
    <div ref={containerRef} className="w-full">
      {/* --- HERO SECTION --- */}
      <section
        ref={(node) => {
          sectionRef.current = node;
          heroSectionRef.current = node;
        }}
        className="relative overflow-hidden pt-32 md:pt-40 pb-28 min-h-screen"
        style={bgStyle}
      >
         {theme === "dark" && (
            <div className="absolute inset-0 pointer-events-none z-[1]" style={noiseOverlayStyle} />
         )}

         {triangles.map((triangle) => (
            <div
              key={triangle.id}
              className="pointer-events-none absolute z-[5] animate-triangle-fade"
              style={{
                left: `${triangle.x}px`, top: `${triangle.y}px`, width: "0", height: "0",
                borderLeft: `${triangle.size / 2}px solid transparent`,
                 borderRight: `${triangle.size / 2}px solid transparent`,
                 borderBottom: `${triangle.size}px solid ${triangle.color}`,
                 transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
                 opacity: 0.7,
              }}
            />
         ))}

         <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10">
            {/* Title Container */}
            <div className="max-w-[1400px]" ref={titleContainerRef}>
               <div className="hero-badge mb-10 flex items-center gap-3">
                 <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
                 <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase ${ theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]" }`}>
                   B2B marketing agency
                 </span>
               </div>
               <h1 className="mb-4 font-fellix leading-[0.92] tracking-[-0.03em] [font-variant-ligatures:no-common-ligatures]">
                 <div className={`hero-title-line text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px] ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}>
                   <span className="font-bold">We build </span>
                   <span className="italic font-semibold tracking-[0.03em]">high‑performing</span>
                 </div>
                 <div className={`hero-title-line mt-2 text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px] ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}>
                   marketing engines for
                 </div>
                 <div className={`hero-title-line mt-2 text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px] ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}>
                   B2B brands
                 </div>
               </h1>
            </div>

            {/* Bottom Content Row */}
            <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
               {/* Left: Copy + CTA */}
               <div className="hero-body lg:flex-1 max-w-[640px]">
                 <p className={`mb-9 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold leading-relaxed ${ theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]" }`}>
                   We build, optimize and scale marketing engines that generate pipeline and improve marketing ROI.
                 </p>
                 <Link href="#discover" className="inline-flex items-center gap-3 group">
                    <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold tracking-tight ${ theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]" }`}>
                      Discover more
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

               {/* Right: Card Stack (The items that will fly) */}
               <div className="hero-body lg:flex-shrink-0 lg:ml-auto w-full lg:w-[28%] xl:w-[32%] relative z-20">
                 <div className="w-full max-w-2xl lg:max-w-none">
                   <div className="relative w-full aspect-[4/5] rounded-2xl" style={{ perspective: '1000px' }}>
                     {videoStack.map((mediaIndex, stackPosition) => (
                       <div
                         key={mediaIndex}
                         ref={(el) => { if(el) heroCardsRef.current[mediaIndex] = el; }}
                         className={`hero-card absolute w-full h-full transition-all duration-500 ease-out cursor-pointer ${
                           stackPosition === 0 ? 'opacity-100 shadow-2xl scale-100 z-40' : 'opacity-80 shadow-lg'
                         }`}
                         style={{
                           transform: `translateX(${stackPosition * 75}px) translateY(${stackPosition * 75}px) translateZ(-${stackPosition * 50}px) scale(${1 - stackPosition * 0.05})`,
                           zIndex: 40 - stackPosition
                         }}
                         onClick={() => handleMediaClick(mediaIndex)}
                       >
                         <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border border-white/10">
                           {mediaAssets[mediaIndex].type === 'image' ? (
                             <Image
                               src={mediaAssets[mediaIndex].src}
                               alt={mediaAssets[mediaIndex].alt}
                               fill
                               className="object-cover"
                               priority={mediaIndex === videoStack[0]}
                             />
                           ) : (
                             <video
                               ref={(el) => (videoRefs.current[mediaIndex] = el)}
                               src={mediaAssets[mediaIndex].src}
                               muted loop playsInline
                               className="w-full h-full object-cover"
                             />
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
                             <div className="absolute bottom-6 left-6 right-6">
                               <h3 className="text-white text-xl sm:text-2xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-1">
                                 {mediaAssets[mediaIndex].title}
                               </h3>
                               <p className="text-white/80 text-sm font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
                                 {mediaAssets[mediaIndex].subtitle}
                               </p>
                             </div>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                   <div className="flex justify-center mt-6 space-x-2">
                     {mediaAssets.map((_, index) => (
                       <button
                         key={index}
                         onClick={() => handleMediaClick(index)}
                         className={`w-3 h-3 rounded-full transition-all duration-300 ${
                           index === videoStack[0] ? 'bg-[#74F5A1] scale-110' : 'bg-white/30 hover:bg-white/50'
                         }`}
                         aria-label={`View ${mediaAssets[index].title}`}
                       />
                     ))}
                   </div>
                 </div>
               </div>
            </div>

            <div className={`mt-20 h-px w-full ${ theme === "dark" ? "border-b border-white/10" : "border-b border-black/10" }`} />
         </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section
        ref={portfolioSectionRef}
        className="w-full min-h-screen py-16 sm:py-20 lg:py-24 relative z-10"
        style={bgStyle}
      >
         <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 portfolio-content">
           <div className="text-center mb-20">
             <h2 className={`${theme === "dark" ? "text-white" : "text-[#111111]"} text-4xl sm:text-6xl lg:text-8xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] tracking-tight`}>
               Services we offer
             </h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
             {portfolioItems.map((item, index) => (
               <div
                 key={index}
                 ref={(el) => { if (el) portfolioCardsRef.current[index] = el; }}
                 className="portfolio-card"
               >
                  <PortfolioCard item={item} theme={theme} />
               </div>
             ))}
           </div>
         </div>
         
         {/* Replaced AnimatedCTAButton with a standard simple button/link */}
         <div className="mt-16 flex justify-center">
            <Link href="/work" className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform">
               View All Work
            </Link>
         </div>
      </section>
    </div>
  );
}

// Subcomponents
function PortfolioCard({ item, theme }) {
  const isDark = theme === "dark";
  return (
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? "bg-black/20 border border-white/10 hover:border-white/30 hover:bg-black/40" : "bg-white border border-black/10 hover:border-black/20 hover:bg-black/5"}`}>
      <Link href={item.link || "#"} tabIndex={0} className="block focus:outline-none">
        <div className="relative w-full h-[500px]">
          {item.type === "image" ? (
            <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
          ) : (
            <video src={item.src} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          )}
        </div>
      </Link>
      <div className="p-6 sm:p-8 min-h-[120px] flex flex-col justify-between">
        <h3 className={`${isDark ? "text-white group-hover:text-[#74F5A1]" : "text-[#111111] group-hover:text-[#3BC972]"} font-bold font-['Figtree'] uppercase text-lg sm:text-xl mb-2 line-clamp-2 transition-colors`}>
          {item.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {item.buttons.map((button, btnIndex) => (
            <button key={btnIndex} className={`bg-transparent border rounded-full px-4 py-1 font-normal font-['Figtree'] leading-relaxed transition-all ${isDark ? "border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50" : "border-black/20 text-black/80 hover:bg-black/5 hover:border-black/40"}`} style={{ fontSize: "14px" }}>
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}