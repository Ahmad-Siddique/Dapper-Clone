// "use client";

// import {
//   useLayoutEffect,
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
//   memo,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import Link from "next/link";

// // Register ScrollTrigger
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Memoized Card Component
// const HeroCard = memo(({ 
//   mediaAsset, 
//   mediaIndex, 
//   stackPosition, 
//   offset, 
//   isMobile, 
//   isActive,
//   onClick,
//   cardRef
// }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current && mediaAsset.type === 'video') {
//       if (isActive && stackPosition === 0) {
//         videoRef.current.play().catch(() => {});
//       } else {
//         videoRef.current.pause();
//       }
//     }
//   }, [isActive, stackPosition, mediaAsset.type]);

//   return (
//     <div
//   ref={cardRef}
//   className={`hero-card absolute w-full h-full transition-all duration-500 ease-out cursor-pointer shadow-lg ${
//     stackPosition === 0 ? '!opacity-100 shadow-2xl scale-100 z-40' : 'opacity-80'
//   }`}
//   style={{
//     transform: `translateX(${offset}px) translateY(${offset}px) translateZ(-${stackPosition * 50}px) scale(${1 - stackPosition * 0.05})`,
//     zIndex: 50 - stackPosition, // Higher z-index to stay above portfolio section
//     opacity: stackPosition === 0 ? 1 : 0.8  // Force inline style for immediate effect
//   }}
//   onClick={onClick}
// >

//       <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10">
//         {mediaAsset.type === 'image' ? (
//           <Image
//             src={mediaAsset.src}
//             alt={mediaAsset.alt}
//             fill
//             className="object-cover"
//             priority={stackPosition === 0}
//           />
//         ) : (
//           <video
//             ref={videoRef}
//             src={mediaAsset.src}
//             muted
//             loop
//             playsInline
//             className="w-full h-full object-cover"
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
//           <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
//             <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-1">
//               {mediaAsset.title}
//             </h3>
//             <p className="text-white/80 text-xs sm:text-sm font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
//               {mediaAsset.subtitle}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }, (prevProps, nextProps) => {
//   return (
//     prevProps.stackPosition === nextProps.stackPosition &&
//     prevProps.offset === nextProps.offset &&
//     prevProps.isActive === nextProps.isActive &&
//     prevProps.mediaIndex === nextProps.mediaIndex
//   );
// });

// HeroCard.displayName = 'HeroCard';

// // Card Stack Component with forwardRef to expose refs
// const CardStackSection = forwardRef(({ mediaAssets, isMobile, theme, lightColors, darkColors }, ref) => {
//   const [videoStack, setVideoStack] = useState([0, 1, 2, 3]);
//   const [playingVideo, setPlayingVideo] = useState(null);
//   const heroCardsRef = useRef([]);

//   // Expose heroCardsRef to parent component
//   useImperativeHandle(ref, () => ({
//     getCardRefs: () => heroCardsRef.current,
//     getVideoStack: () => videoStack,
//   }));

//   const handleMediaClick = useCallback((clickedIndex) => {
//     if (clickedIndex === undefined || clickedIndex < 0 || clickedIndex >= mediaAssets.length) {
//       return;
//     }

//     setVideoStack(prevStack => {
//       if (prevStack[0] === clickedIndex) return prevStack;
//       return [clickedIndex, ...prevStack.filter(idx => idx !== clickedIndex)];
//     });
    
//     const clickedAsset = mediaAssets[clickedIndex];
//     if (clickedAsset && clickedAsset.type === 'video') {
//       setPlayingVideo(clickedIndex);
//     } else {
//       setPlayingVideo(null);
//     }
//   }, [mediaAssets]);

//   // Float animation
//   useEffect(() => {
//     const cardInners = heroCardsRef.current
//       .map((card) => card?.querySelector('.hero-card > div'))
//       .filter(Boolean);
    
//     gsap.killTweensOf(cardInners);

//     if (cardInners.length > 0) {
//       gsap.to(cardInners, {
//         y: "-=15",
//         duration: 2.5,
//         ease: "sine.inOut",
//         stagger: {
//           each: 0.2,
//           from: "start", 
//           yoyo: true,
//           repeat: -1
//         },
//         yoyo: true,
//         repeat: -1
//       });
//     }

//     return () => {
//       gsap.killTweensOf(cardInners);
//     };
//   }, []);

//   return (
//     <div className="hero-body lg:flex-shrink-0 w-full relative z-30 lg:-mt-8 xl:-mt-12">
//       {/* SMALLER CARDS: max-w-[280px] on mobile, max-w-[320px] on desktop */}
//       <div className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] xl:max-w-[540px] mx-auto lg:mx-0">
//         {/* REDUCED HEIGHT: aspect-[3/4] */}
//         <div className="relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl" style={{ perspective: '1000px' }}>
//           {videoStack.map((mediaIndex, stackPosition) => {
//             const offset = isMobile ? stackPosition * 15 : stackPosition * 50;
            
//             return (
//               <HeroCard
//                 key={mediaIndex}
//                 mediaAsset={mediaAssets[mediaIndex]}
//                 mediaIndex={mediaIndex}
//                 stackPosition={stackPosition}
//                 offset={offset}
//                 isMobile={isMobile}
//                 isActive={playingVideo === mediaIndex}
//                 onClick={() => handleMediaClick(mediaIndex)}
//                 cardRef={(el) => { if(el) heroCardsRef.current[mediaIndex] = el; }}
//               />
//             );
//           })}
//         </div>
        
//         {/* Pagination Dots */}
//         <div className="flex justify-center mt-6 sm:mt-7 md:mt-12 space-x-2">
//           {mediaAssets.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleMediaClick(index)}
//               className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
//                 index === videoStack[0]
//                   ? "scale-110"
//                   : theme === "dark" ? "bg-white/30 hover:bg-white/50" : "bg-black/30 hover:bg-black/50"
//               }`}
//               style={{
//                 backgroundColor: index === videoStack[0]
//                   ? (theme === "dark" ? darkColors.paginationActive : lightColors.paginationActive)
//                   : (theme === "dark" ? darkColors.paginationInactive : lightColors.paginationInactive)
//               }}
//               aria-label={`View ${mediaAssets[index].title}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });

// CardStackSection.displayName = 'CardStackSection';

// export default function HeroSection({ theme = "light" }) {
//   // --- Color Palettes ---
//   const lightColors = {
//     primary: "#013825",      // Deep Forest Green
//     secondary: "#9E8F72",    // Golden Brown (updated)
//     tertiary: "#CEC8B0",     // Light Beige/Tan (updated)
//     background: "#F9F7F0",   // Very light neutral for main background
//     noiseOverlay: "rgba(200, 200, 200, 0.3)",
//     cardBackground: "#CEC8B0", // Use tertiary on cards / certain sections
//     cardBorder: "black/10",
//     cardHoverBorder: "black/20",
//     cardHoverBackground: "black/5",
//     text: "#111111",
//     buttonBackground: "#013825",
//     buttonText: "white",
//     paginationActive: "#013825",
//     paginationInactive: "black/30",
//   };

//   const darkColors = {
//     primary: "#74F5A1",
//     secondary: "#5FE08D",
//     tertiary: "#3BC972",
//     background: "#2b2b2b",
//     noiseOverlay: "rgba(60, 60, 60, 0.3)",
//     cardBackground: "black/20",
//     cardBorder: "white/10",
//     cardHoverBorder: "white/30",
//     cardHoverBackground: "black/40",
//     text: "white",
//     buttonBackground: "#74F5A1",
//     buttonText: "#212121",
//     paginationActive: "#74F5A1",
//     paginationInactive: "white/30",
//   };

//   // --- Refs & State for Hero ---
//   const sectionRef = useRef(null);
//   const heroSectionRef = useRef(null);
//   const titleContainerRef = useRef(null);
//   const [triangles, setTriangles] = useState([]);
//   const triangleIdRef = useRef(0);
//   const hasAnimatedRef = useRef(false);
//   const animationIntervalRef = useRef(null);
//   const scrollTriggerInstancesRef = useRef([]);
  
//   const [isMobile, setIsMobile] = useState(false);
//   const cardStackRef = useRef(null);

//   // --- Refs & State for Portfolio Section ---
//   const containerRef = useRef(null);
//   const portfolioSectionRef = useRef(null);
//   const portfolioCardsRef = useRef([]);

//   // --- Data ---
//   const mediaAssets = [
//     {
//       type: 'image',
//       src: 'https://www.datocms-assets.com/151374/1741831437-mudwtr.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440',
//       alt: 'MUD\\WTR brand showcase',
//       title: 'MUD\\WTR',
//       subtitle: 'Health & Wellness'
//     },
//     {
//       type: 'image',
//       src: 'https://www.datocms-assets.com/151374/1741910699-cotopaxi_482x858_alternate.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440',
//       alt: 'Cotopaxi brand showcase',
//       title: 'Cotopaxi',
//       subtitle: 'Outdoor & Lifestyle'
//     },
//     {
//       type: 'video',
//       src: 'https://stream.mux.com/zaOX00ijKS1dZVZGFpLMjhNOIGbKQ8dmO/medium.mp4',
//       alt: 'Digital marketing campaign showcase',
//       title: 'OREO',
//       subtitle: 'Food & Beverage'
//     },
//     {
//       type: 'video',
//       src: 'https://stream.mux.com/s5S6U18mND3t8caFSka7r7Wrulxm4SAb/medium.mp4',
//       alt: 'Brand impact visualization',
//       title: 'Coca-Cola',
//       subtitle: 'Global Campaigns'
//     }
//   ];

//   const portfolioItems = [
//     {
//       type: "image",
//       title: "MUD\\WTR Campaign",
//       src: "https://www.datocms-assets.com/151374/1741831437-mudwtr.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440",
//       alt: "MUD\\WTR Campaign Image",
//       buttons: ["Health & Wellness"],
//       link: "/work/mud-wtr",
//     },
//     {
//       type: "image",
//       title: "Cotopaxi Branding",
//       src: "https://www.datocms-assets.com/151374/1741910699-cotopaxi_482x858_alternate.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440",
//       alt: "Cotopaxi Branding Image",
//       buttons: ["Outdoor & Active Lifestyle", "Fashion & Apparel"],
//       link: "/work/cotopaxi",
//     },
//     {
//       type: "video",
//       title: "OREO Social Media",
//       src: "https://stream.mux.com/zaOX00ijKS1dZVZGFpLMjhNOIGbKQ8dmO/medium.mp4",
//       alt: "OREO Social Media Video",
//       buttons: ["Food & Beverage", "CPG"],
//       link: "/work/oreo",
//     },
//     {
//       type: "video",
//       title: "Coca-Cola Ads",
//       src: "https://stream.mux.com/s5S6U18mND3t8caFSka7r7Wrulxm4SAb/medium.mp4",
//       alt: "Coca-Cola Ads Video",
//       buttons: ["Food & Beverage", "CPG"],
//       link: "/work/coca-cola",
//     },
//   ];

//   // --- Logic: Responsive Detection ---
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // --- Logic: Electrical Effects ---
// // --- Logic: Electrical Effects ---
// const originalHTMLRef = useRef({});




// // --- Logic: Electrical Effects ---
// // --- Logic: Electrical Effects ---
// const triggerElectricalAnimation = useCallback(() => {
//   const titleLines = document.querySelectorAll(".hero-main-title"); // Changed from .hero-title-line
//   // Return to brand colour after effect
//   const originalColor = theme === "dark" ? "#f3f3f3" : lightColors.primary;
//   const palette = theme === "dark" ? darkColors : lightColors;

//   // Use the brand palette for the electric passes
//   const electricShades =
//     theme === "dark"
//       ? [darkColors.primary, darkColors.secondary, darkColors.tertiary]
//       : [lightColors.primary, lightColors.secondary, lightColors.tertiary];

//   const brightElectricColor = theme === "dark" ? "#FFFFFF" : lightColors.secondary;

//   // Define the EXACT original structure for hero section
//   const originalStructures = [
//     `<span class="font-bold">We build </span><span class="italic font-regular tracking-[0.03em]">high‑performing</span>`,
//     `<span class="font-bold">marketing engines for </span><span class="font-bold">B2B brands</span>`
//   ];
  

//   titleLines.forEach((line, lineIndex) => {
//     // FORCE restore to original structure
//     if (originalStructures[lineIndex]) {
//       line.innerHTML = originalStructures[lineIndex];
//     }
    
//     // Now animate the spans
//     const spans = line.querySelectorAll("span");
    
//     if (spans.length > 0) {
//       spans.forEach((span, spanIndex) => {
//         const baseDelay = lineIndex * 0.3 + spanIndex * 0.15;
//         const electricColor = electricShades[spanIndex % electricShades.length];
        
//         gsap.to(span, {
//           color: brightElectricColor,
//           duration: 0.15,
//           delay: baseDelay,
//           ease: "power2.out",
//           onComplete: () => {
//             gsap.to(span, {
//               color: electricColor,
//               duration: 0.2,
//               ease: "sine.inOut",
//               onComplete: () => {
//                 gsap.to(span, {
//                   color: originalColor,
//                   duration: 0.35,
//                   ease: "power2.in"
//                 });
//               }
//             });
//           }
//         });
//       });
//     } else {
//       const baseDelay = lineIndex * 0.3;
//       gsap.to(line, {
//         color: brightElectricColor,
//         duration: 0.15,
//         delay: baseDelay,
//         ease: "power2.out",
//         onComplete: () => {
//           gsap.to(line, {
//             color: electricColor,
//             duration: 0.2,
//             ease: "sine.inOut",
//             onComplete: () => {
//               gsap.to(line, {
//                 color: originalColor,
//                 duration: 0.35,
//                 ease: "power2.in"
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// }, [theme]);

// const startElectricalAnimation = useCallback(() => {
//   if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
//   setTimeout(() => { triggerElectricalAnimation(); }, 800);
//   animationIntervalRef.current = setInterval(() => { triggerElectricalAnimation(); }, 10000);
// }, [triggerElectricalAnimation]);







//   // --- Logic: GSAP Animations with ScrollTrigger ---
//   useLayoutEffect(() => {
//     if (!containerRef.current || !heroSectionRef.current || !cardStackRef.current) return;
    
//     const ctx = gsap.context(() => {
//       scrollTriggerInstancesRef.current.forEach(st => st.kill());
//       scrollTriggerInstancesRef.current = [];

//       gsap.killTweensOf(".hero-main-title");
//       gsap.set(".hero-main-title", { opacity: 1, y: 0 });

//       const revealTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: titleContainerRef.current,
//           start: "top 85%",
//           end: "top 50%",
//           once: true,
//           onEnter: () => {
//             hasAnimatedRef.current = true;
//             setTimeout(() => {
//               startElectricalAnimation();
//             }, 1000);
//           },
//           markers: false,
//         },
//       });

//       revealTl.fromTo(
//         ".hero-main-title",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
//       );

//       const entranceTl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
//       entranceTl
//         .from(".hero-badge", { y: 24, opacity: 0 })
//         .from(".hero-body", { y: 32, opacity: 0, stagger: 0.08 }, "-=0.2");

//       // Portfolio transition with card animation
//       const initTransitionAnimations = () => {
//         const heroCardsRef = cardStackRef.current?.getCardRefs();
//         const videoStack = cardStackRef.current?.getVideoStack();

//         if (!heroCardsRef || !videoStack) return;

//         gsap.set(portfolioCardsRef.current, { opacity: 0, scale: 0.8 });

//         const portfolioContent = portfolioSectionRef.current?.querySelectorAll(".portfolio-content > *");
//         if (portfolioContent) {
//           gsap.set(portfolioContent, { y: 30, opacity: 0 });
//         }

//         const cardPositions = [];
//         heroCardsRef.forEach((heroCard, index) => {
//           if (heroCard && portfolioCardsRef.current[index]) {
//             const portfolioCard = portfolioCardsRef.current[index];
//             const heroRect = heroCard.getBoundingClientRect();
//             const portfolioRect = portfolioCard.getBoundingClientRect();
//             cardPositions[index] = {
//               xDistance: portfolioRect.left - heroRect.left,
//               yDistance: portfolioRect.top - heroRect.top,
//             };
//           }
//         });

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: heroSectionRef.current,
//             start: "30% top",
//             endTrigger: portfolioSectionRef.current,
//             end: "center center",
//             scrub: 1,
//             markers: false,
//             invalidateOnRefresh: true,
//             onUpdate: (self) => {
//               heroCardsRef.forEach((heroCard, index) => {
//                 if (heroCard && cardPositions[index]) {
//                   const stackPosition = videoStack.indexOf(index);
//                   const startX = stackPosition * (isMobile ? 15 : 50);
//                   const startY = stackPosition * (isMobile ? 15 : 50);
                  
//                   const progress = self.progress;
//                   const newX = startX + (cardPositions[index].xDistance * progress);
//                   const newY = startY + (cardPositions[index].yDistance * progress);
//                   const newScale = 1 - stackPosition * 0.05 - (0.25 * progress);
//                   // Fade out completely - ensure opacity reaches 0
//                   const newOpacity = Math.max(0, stackPosition === 0 ? 1 - (progress * 1.2) : 0.8 - (progress * 1.2));
                  
//                   gsap.set(heroCard, {
//                     x: newX,
//                     y: newY,
//                     scale: newScale,
//                     opacity: newOpacity,
//                     visibility: newOpacity < 0.1 ? 'hidden' : 'visible',
//                     pointerEvents: newOpacity < 0.1 ? 'none' : 'auto',
//                   });
//                 }
//               });
//             },
//             onComplete: () => {
//               // Hide all hero cards completely when animation completes
//               heroCardsRef.forEach((heroCard) => {
//                 if (heroCard) {
//                   gsap.set(heroCard, {
//                     opacity: 0,
//                     visibility: 'hidden',
//                     pointerEvents: 'none',
//                   });
//                 }
//               });
//             }
//           },
//         });

//         scrollTriggerInstancesRef.current.push(tl.scrollTrigger);

//         tl.to(portfolioCardsRef.current, {
//           opacity: 1, scale: 1, y: 0, stagger: 0.1, ease: "none", duration: 0.8,
//         }, 0.3);

//         if (portfolioContent) {
//           tl.to(portfolioContent, {
//             y: 0, opacity: 1, stagger: 0.1, ease: "none", duration: 0.8,
//           }, 0.5);
//         }
//       };

//       setTimeout(() => {
//         initTransitionAnimations();
//         ScrollTrigger.refresh();
//       }, 800);

//     }, containerRef.current);

//     return () => ctx.revert();
//   }, [theme, isMobile, startElectricalAnimation]);

//   // useEffect(() => {
//   //   const timer = setTimeout(() => { 
//   //     startElectricalAnimation(); 
//   //   }, 1500);
    
//   //   return () => {
//   //     clearTimeout(timer);
//   //     if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
//   //   };
//   // }, [startElectricalAnimation]);

//   // --- Logic: Triangles (Mouse Trail) ---
//   const createTriangle = useCallback((x, y) => {
//     const id = triangleIdRef.current++;
//     const size = Math.random() * 5 + 8;
//     const rotation = Math.random() * 360;
//     const greenShades = theme === "dark"
//       ? ["#74F5A1", "#5FE08D", "#4DD97F", "#3BC972"]
//       : [lightColors.primary, lightColors.secondary, lightColors.tertiary];
//     const color = greenShades[Math.floor(Math.random() * greenShades.length)];
//     const newTriangle = { id, x, y, size, rotation, color };
//     setTriangles((prev) => [...prev, newTriangle]);
//     setTimeout(() => { setTriangles((prev) => prev.filter((t) => t.id !== id)); }, 1050);
//   }, [theme, lightColors]);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;
//     let lastTime = 0;
//     const throttleDelay = 80;
//     const handleMouseMove = (e) => {
//       const currentTime = Date.now();
//       if (currentTime - lastTime < throttleDelay) return;
//       lastTime = currentTime;
//       const rect = section.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       createTriangle(x, y);
//     };
//     section.addEventListener("mousemove", handleMouseMove);
//     return () => { section.removeEventListener("mousemove", handleMouseMove); };
//   }, [createTriangle]);

//   // --- Styles ---
//   // --- Styles ---
// useEffect(() => {
//   const style = document.createElement("style");
//   style.innerHTML = `
//     @keyframes triangle-fade {
//       0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
//       100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
//     }
//     @keyframes subtle-glitch {
//       0%, 100% { transform: translateX(0); }
//       95% { transform: translateX(1px); }
//       96% { transform: translateX(-1px); }
//       97% { transform: translateX(0); }
//     }
//     .animate-triangle-fade { animation: triangle-fade 1.05s ease-out forwards; }
//     .hero-char { 
//       transition: color 0.15s ease, transform 0.15s ease; 
//       will-change: color, transform; 
//       animation: subtle-glitch 10s infinite; 
//     }
//     .hero-char:nth-child(3n) { animation-delay: 0.5s; }
//     .hero-char:nth-child(3n+1) { animation-delay: 1s; }
//     .hero-char:nth-child(3n+2) { animation-delay: 1.5s; }
//     .font-fellix { font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
//     .font-cinzel { font-family: 'Cinzel Decorative', serif; }
//     .font-italiana { font-family: 'Italiana', serif; }
//     .hero-title-line { transition: color 0.4s ease; }
//   `;
//   document.head.appendChild(style);
//   return () => { document.head.removeChild(style); };
// }, []);


//   const bgStyle = theme === "dark"
//     ? {
//         backgroundColor: darkColors.background,
//         backgroundImage: `
//           url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
//           radial-gradient(ellipse at top left, ${darkColors.noiseOverlay}, transparent 50%),
//           radial-gradient(ellipse at bottom right, rgba(50, 50, 50, 0.2), transparent 50%)
//         `,
//         backgroundBlendMode: "overlay, normal, normal",
//       }
//     : {
//         backgroundColor: lightColors.background,
//         backgroundImage: `
//           url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
//           radial-gradient(ellipse at top left, ${lightColors.noiseOverlay}, transparent 50%),
//           radial-gradient(ellipse at bottom right, rgba(200, 200, 200, 0.2), transparent 50%)
//         `,
//         backgroundBlendMode: "overlay, normal, normal",
//       };

//   const noiseOverlayStyle = {
//     backgroundImage: `
//       repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
//       repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
//       repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.015) 2px, rgba(0, 0, 0, 0.015) 4px)
//     `,
//   };

//   return (
//     <div ref={containerRef} className="w-full">
//       <section
//         ref={(node) => {
//           sectionRef.current = node;
//           heroSectionRef.current = node;
//         }}
//         className="relative overflow-visible pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 min-h-screen"
//         style={bgStyle}
//       >
//         {theme === "dark" && (
//           <div className="absolute inset-0 pointer-events-none z-[1]" style={noiseOverlayStyle} />
//         )}

//         {triangles.map((triangle) => (
//           <div
//             key={triangle.id}
//             className="pointer-events-none absolute z-[5] animate-triangle-fade"
//             style={{
//               left: `${triangle.x}px`, 
//               top: `${triangle.y}px`, 
//               width: "0", 
//               height: "0",
//               borderLeft: `${triangle.size / 2}px solid transparent`,
//               borderRight: `${triangle.size / 2}px solid transparent`,
//               borderBottom: `${triangle.size}px solid ${triangle.color}`,
//               transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
//               opacity: 0.7,
//             }}
//           />
//         ))}

//         <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10">
//           <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-12 xl:gap-16 items-start">
            
//             {/* LEFT COLUMN */}
//             <div className="flex flex-col">
//               <div className="max-w-[1400px]" ref={titleContainerRef}>
//                 <div className="hero-badge mb-6 sm:mb-7 md:mb-8 flex items-center gap-2 sm:gap-3">
//                   <span
//                     className="inline-flex h-4 w-4 sm:h-5 sm:w-5 rounded-sm"
//                     style={{ backgroundColor: theme === "dark" ? darkColors.primary : lightColors.primary }}
//                   />
//                   <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold tracking-[0.16em] uppercase ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"}`}>
//                     B2B marketing agency
//                   </span>
//                 </div>
                
//                 <h1 className="mb-4 sm:mb-5 font-cinzel leading-[0.96] tracking-[-0.02em] [font-variant-ligatures:no-common-ligatures]">
//                   <div className={`hero-main-title text-[22px] xs:text-[26px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] md:whitespace-nowrap ${theme === "dark" ? "text-[#f3f3f3]" : ""}`} style={{ color: theme === "dark" ? "#f3f3f3" : lightColors.primary }}>
//                     <span className="font-bold">We build </span>
//                     <span className="italic font-semibold tracking-[0.03em]">high‑performing</span>
//                   </div>
//                   <div className={`hero-main-title mt-1 sm:mt-2 text-[22px] xs:text-[26px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[52px] md:whitespace-nowrap ${theme === "dark" ? "text-[#f3f3f3]" : ""}`} style={{ color: theme === "dark" ? "#f3f3f3" : lightColors.primary }}>
//                     <span className="font-bold">marketing engines for </span>
//                     <span className="font-bold">B2B brands</span>
//                   </div>
//                 </h1>

//               </div>

//               <div className="hero-body max-w-full lg:max-w-[640px]">
//               <p className={`mt-10 sm:mt-8 md:mt-20 mb-6 sm:mb-7 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[15px] sm:text-[17px] md:text-[19px] font-semibold leading-relaxed ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"}`}>

//                   We build, optimize and scale marketing engines that generate pipeline and improve marketing ROI.
//                 </p>
//                 <Link href="#discover" className="inline-flex items-center gap-2 sm:gap-3 group">
//                   <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[17px] font-bold tracking-tight ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}>
//                     Discover more
//                   </span>
//                   <span
//                     className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-[4px] transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-[1px]"
//                     style={{
//                       backgroundColor: theme === "dark" ? darkColors.primary : lightColors.primary,
//                     }}
//                   >
//                     <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-y-3 group-hover:opacity-0">
//                       <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 14 14" aria-hidden="true">
//                         <path d="M7 1V13M7 13L3 9M7 13L11 9" fill="none" stroke={theme === "dark" ? "#212121" : "#F9FAF5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </span>
//                     <span className="absolute inset-0 flex items-center justify-center translate-y-[-12px] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
//                       <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 14 14" aria-hidden="true">
//                         <path d="M7 1V13M7 13L3 9M7 13L11 9" fill="none" stroke={theme === "dark" ? darkColors.primary : lightColors.secondary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </span>
//                   </span>
//                 </Link>
//               </div>
//             </div>

//             {/* RIGHT COLUMN - SMALLER CARDS */}
//             <CardStackSection ref={cardStackRef} mediaAssets={mediaAssets} isMobile={isMobile} theme={theme} lightColors={lightColors} darkColors={darkColors} />
//           </div>

//           <div className={`mt-12 sm:mt-16 md:mt-20 h-px w-full ${theme === "dark" ? "border-b border-white/10" : "border-b border-black/10"}`} />
//         </div>
//       </section>

//       {/* --- PORTFOLIO SECTION --- */}
//       <section
//         ref={portfolioSectionRef}
//         className="w-full min-h-screen py-16 sm:py-20 lg:py-24 relative"
//         style={bgStyle}
//       >
//         <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 portfolio-content">
//           <div className="text-center mb-12 sm:mb-16 md:mb-20">
//             <h2 className={`${theme === "dark" ? "text-white" : "text-[#111111]"} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] tracking-tight`}>
//               Services we offer
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 relative z-20">
//             {portfolioItems.map((item, index) => (
//               <div
//                 key={index}
//                 ref={(el) => { if (el) portfolioCardsRef.current[index] = el; }}
//                 className="portfolio-card relative z-20"
//               >
//                 <PortfolioCard item={item} theme={theme} />
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="mt-12 sm:mt-14 md:mt-16 flex justify-center">
//           <Link href="/work" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-black text-white text-sm sm:text-base font-bold rounded-full hover:scale-105 transition-transform">
//             View All Work
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// // Memoized Portfolio Card Component
// const PortfolioCard = memo(({ item, theme }) => {
//   const isDark = theme === "dark";
//   return (
//     <div className={`group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? "bg-black/20 border border-white/10 hover:border-white/30 hover:bg-black/40" : "bg-white border border-black/10 hover:border-black/20 hover:bg-black/5"}`}>
//       <Link href={item.link || "#"} tabIndex={0} className="block focus:outline-none">
//         <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
//           {item.type === "image" ? (
//             <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
//           ) : (
//             <video src={item.src} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
//           )}
//         </div>
//       </Link>
//       <div className="p-4 sm:p-6 md:p-8 min-h-[100px] sm:min-h-[120px] flex flex-col justify-between">
//         <h3
//           className={`${
//             isDark
//               ? "text-white group-hover:text-[#74F5A1]"
//               : "text-[#111111] group-hover:text-[#295E4C]"
//           } font-bold font-['Figtree'] uppercase text-base sm:text-lg md:text-xl mb-2 line-clamp-2 transition-colors`}
//         >
//           {item.title}
//         </h3>
//         <div className="flex flex-wrap gap-1.5 sm:gap-2">
//           {item.buttons.map((button, btnIndex) => (
//             <button key={btnIndex} className={`bg-transparent border rounded-full px-3 py-0.5 sm:px-4 sm:py-1 font-normal font-['Figtree'] leading-relaxed transition-all text-xs sm:text-sm ${isDark ? "border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50" : "border-black/20 text-black/80 hover:bg-black/5 hover:border-black/40"}`}>
//               {button}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });

// PortfolioCard.displayName = 'PortfolioCard';



















"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
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
  // --- Color Palettes (Memoized to prevent re-renders) ---
  const lightColors = useMemo(() => ({
    primary: "#013825",
    secondary: "#9E8F72",
    tertiary: "#CEC8B0",
    background: "#F9F7F0",
    noiseOverlay: "rgba(200, 200, 200, 0.3)",
    text: "#111111",
    paginationActive: "#013825",
    paginationInactive: "black/30",
  }), []);

  const darkColors = useMemo(() => ({
    primary: "#74F5A1",
    secondary: "#5FE08D",
    tertiary: "#3BC972",
    background: "#2b2b2b",
    noiseOverlay: "rgba(60, 60, 60, 0.3)",
    text: "white",
    paginationActive: "#74F5A1",
    paginationInactive: "white/30",
  }), []);

  // --- Refs & State ---
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const heroCardsContainerRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const heroCardsRef = useRef([]);
  const portfolioImageAreasRef = useRef([]);
  const animationIntervalRef = useRef(null);
  
  const [triangles, setTriangles] = useState([]);
  const triangleIdRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenSize, setScreenSize] = useState('mobile');
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredHeroCard, setHoveredHeroCard] = useState(null);
  const [hasTriggeredAnimation, setHasTriggeredAnimation] = useState(false);

  // --- Data (Memoized to prevent re-renders) ---
  const mediaAssets = useMemo(() => [
    {
      type: 'image',
      src: 'https://www.datocms-assets.com/151374/1741831437-mudwtr.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440',
      alt: 'MUD\\WTR brand showcase',
      title: 'MUD\\WTR',
      subtitle: 'Health & Wellness',
      metric: '+35% Conversion Rate',
      buttons: ["Health & Wellness"],
      link: "/work/mud-wtr",
    },
    {
      type: 'image',
      src: 'https://www.datocms-assets.com/151374/1741910699-cotopaxi_482x858_alternate.png?auto=format&fit=max&h=2440&lossless=false&q=75&w=2440',
      alt: 'Cotopaxi brand showcase',
      title: 'Cotopaxi',
      subtitle: 'Outdoor & Lifestyle',
      metric: '+20% Marketing Efficiency',
      buttons: ["Outdoor & Active Lifestyle", "Fashion & Apparel"],
      link: "/work/cotopaxi",
    },
    {
      type: 'video',
      src: 'https://stream.mux.com/zaOX00ijKS1dZVZGFpLMjhNOIGbKQ8dmO/medium.mp4',
      alt: 'Digital marketing campaign showcase',
      title: 'OREO',
      subtitle: 'Food & Beverage',
      metric: '+45% Engagement',
      buttons: ["Food & Beverage", "CPG"],
      link: "/work/oreo",
    },
    {
      type: 'video',
      src: 'https://stream.mux.com/s5S6U18mND3t8caFSka7r7Wrulxm4SAb/medium.mp4',
      alt: 'Brand impact visualization',
      title: 'Coca-Cola',
      subtitle: 'Global Campaigns',
      metric: '+60% Brand Awareness',
      buttons: ["Food & Beverage", "CPG"],
      link: "/work/coca-cola",
    }
  ], []);

  // --- Responsive Detection ---
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024;
      setIsDesktop(desktop);
      
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1440) {
        setScreenSize('laptop');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // --- Electrical Animation - WHOLE LINES ONLY ---
  const triggerElectricalAnimation = useCallback(() => {
    const titleLines = document.querySelectorAll(".hero-main-title-line");
    
    const originalColor = theme === "dark" ? "#f3f3f3" : "#111111";
    const electricColor = theme === "dark" ? "#74F5A1" : "#3BC972";
    const brightElectricColor = theme === "dark" ? "#FFFFFF" : "#FFFFFF";

    const tl = gsap.timeline();

    titleLines.forEach((line, index) => {
      tl.to(line, {
        color: brightElectricColor,
        duration: 0.1,
        ease: "power2.out",
      }, index * 0.2)
      .to(line, {
        color: electricColor,
        duration: 0.15,
        ease: "sine.inOut",
      })
      .to(line, {
        color: originalColor,
        duration: 0.25,
        ease: "power2.in",
      });
    });
  }, [theme]);

  const startElectricalAnimation = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    setTimeout(() => {
      triggerElectricalAnimation();
    }, 800);

    animationIntervalRef.current = setInterval(() => {
      triggerElectricalAnimation();
    }, 10000);
  }, [triggerElectricalAnimation]);

  // --- GSAP Scroll Animation ---
  useLayoutEffect(() => {
    if (!isDesktop || !heroCardsContainerRef.current || !portfolioSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-main-title-line",
        { opacity: 0, y: 60, skewY: 4 },
        { 
          opacity: 1, 
          y: 0, 
          skewY: 0,
          duration: 0.8, 
          ease: "power3.out", 
          stagger: 0.06,
          transformOrigin: 'top left',
          scrollTrigger: {
            trigger: titleContainerRef.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              if (!hasTriggeredAnimation) {
                setHasTriggeredAnimation(true);
                setTimeout(() => {
                  startElectricalAnimation();
                }, 1000);
              }
            },
          }
        }
      );

      gsap.from(".hero-badge", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-body", { y: 32, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2, stagger: 0.08 });

      setTimeout(() => {
        mediaAssets.forEach((_, index) => {
          const heroCard = heroCardsRef.current[index];
          const imageArea = portfolioImageAreasRef.current[index];
          
          if (!heroCard || !imageArea) return;

          const overlay = heroCard.querySelector('.card-overlay');

          ScrollTrigger.create({
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            onUpdate: (self) => {
              const progress = self.progress;
              
              const heroContainerRect = heroCardsContainerRef.current.getBoundingClientRect();
              const imageAreaRect = imageArea.getBoundingClientRect();
              
              const stackOffset = index * 30;
              const heroStartX = heroContainerRect.left + stackOffset;
              const heroStartY = heroContainerRect.top + stackOffset;
              const width = window.innerWidth;
              let offsetX, offsetY;
              
              if (width >= 1375 && width <= 1440) {
                offsetX = 20;
                offsetY = 120;
              } else {
                switch(screenSize) {
                  case 'laptop':
                    offsetX = 20;
                    offsetY = 160; 
                    break;
                  default:
                    offsetX = 50;
                    offsetY = 60;
                }
              }
              
              const targetX = imageAreaRect.left + offsetX;
              const targetY = imageAreaRect.top + offsetY;
              
              const deltaX = targetX - heroStartX;
              const deltaY = targetY - heroStartY;
              
              const heroWidth = heroContainerRect.width;
              const heroHeight = heroContainerRect.height;
              const targetWidth = imageAreaRect.width;
              const targetHeight = imageAreaRect.height;
              
              const scaleX = targetWidth / heroWidth;
              const scaleY = targetHeight / heroHeight;
              const targetScale = Math.min(scaleX, scaleY);
              const startScale = 1 - (index * 0.05);
              const currentScale = startScale + ((targetScale - startScale) * progress);
              
              gsap.set(heroCard, {
                x: stackOffset + (deltaX * progress),
                y: stackOffset + (deltaY * progress),
                scale: currentScale,
              });
              
              if (overlay) {
                gsap.set(overlay, {
                  opacity: 1 - progress,
                });
              }
            }
          });
        });
      }, 500);

    }, containerRef.current);

    return () => ctx.revert();
  }, [isDesktop, screenSize, mediaAssets, startElectricalAnimation, hasTriggeredAnimation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerElectricalAnimation();
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [triggerElectricalAnimation]);

  // --- Mouse Trail ---
  const createTriangle = useCallback((x, y) => {
    const id = triangleIdRef.current++;
    const size = Math.random() * 15 + 25;
    const rotation = Math.random() * 360;
    const greenShades = theme === "dark"
      ? ["#74F5A1", "#5FE08D", "#4DD97F", "#3BC972"]
      : [lightColors.primary, lightColors.secondary, lightColors.tertiary];
    const color = greenShades[Math.floor(Math.random() * greenShades.length)];
    setTriangles((prev) => [...prev, { id, x, y, size, rotation, color }]);
    setTimeout(() => setTriangles((prev) => prev.filter((t) => t.id !== id)), 1050);
  }, [theme, lightColors]);

  useEffect(() => {
    const section = heroSectionRef.current;
    if (!section) return;
    let lastTime = 0;
    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < 80) return;
      lastTime = currentTime;
      const rect = section.getBoundingClientRect();
      createTriangle(e.clientX - rect.left, e.clientY - rect.top);
    };
    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [createTriangle]);

  // --- Styles ---
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes triangle-fade {
        0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
      }
      .animate-triangle-fade { animation: triangle-fade 1.05s ease-out forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const bgStyle = useMemo(() => theme === "dark"
    ? {
        backgroundColor: darkColors.background,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
      }
    : {
        backgroundColor: lightColors.background,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
      }, [theme, darkColors, lightColors]);

  const getBottomPadding = () => {
    if (screenSize === 'laptop') return '600px';
    if (screenSize === 'desktop') return '7rem';
    return '7rem';
  };

  return (
    <div ref={containerRef} className="w-full">
      <section
        ref={heroSectionRef}
        className="relative overflow-visible pt-32 md:pt-40 pb-28 min-h-screen"
        style={{
          ...bgStyle,
          paddingBottom: getBottomPadding()
        }}
      >
        {triangles.map((triangle) => (
          <div
            key={triangle.id}
            className="pointer-events-none absolute z-[5] animate-triangle-fade"
            style={{
              left: `${triangle.x}px`,
              top: `${triangle.y}px`,
              width: "0",
              height: "0",
              borderLeft: `${triangle.size / 2}px solid transparent`,
              borderRight: `${triangle.size / 2}px solid transparent`,
              borderBottom: `${triangle.size}px solid ${triangle.color}`,
              transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
              opacity: 0.7,
            }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10 min-h-[calc(100vh-12rem)] flex flex-col justify-between pt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-12 xl:gap-16 items-start">
            
            <div className="flex flex-col">
  <div className="max-w-full lg:max-w-[1600px] xl:max-w-[1800px]" ref={titleContainerRef}>
    <div className="hero-badge mb-10 flex items-center gap-3">
      <span
        className="inline-flex h-5 w-5 rounded-sm"
        style={{ backgroundColor: theme === "dark" ? darkColors.primary : lightColors.primary }}
      />
      <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[20px] font-semibold tracking-[0.16em] uppercase ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"}`}>
        B2B marketing agency
      </span>
    </div>
    
   <h1 className="mb-4 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[0.92] tracking-[-0.03em]">
  <span 
    className={`hero-main-title-line block text-[32px] sm:text-[42px] md:text-[58px] lg:text-[72px] xl:text-[88px] 2xl:text-[100px] whitespace-nowrap ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}
  >
    <span className="font-bold">We build </span><span className="font-ivy-presto italic text-[0.94em] tracking-[0.03em]">high‑performing</span>
  </span>

  <span 
    className={`hero-main-title-line mt-2 block text-[32px] sm:text-[42px] md:text-[58px] lg:text-[72px] xl:text-[88px] 2xl:text-[104px] font-bold whitespace-nowrap ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}
  >
    marketing engines for
  </span>
  
  <span 
    className={`hero-main-title-line mt-2 block text-[32px] sm:text-[42px] md:text-[58px] lg:text-[72px] xl:text-[88px] 2xl:text-[104px] font-bold whitespace-nowrap ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}
  >
    B2B brands
  </span>
</h1>


  </div>


              <div className="hero-body max-w-full lg:max-w-[640px] pt-20">
                <p className={`mb-9 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[25px] font-semibold leading-relaxed ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"}`}>
                  We build, optimize and scale marketing engines that generate pipeline and improve marketing ROI.
                </p>
                
                <Link href="#discover" className="inline-flex items-center gap-3 group">
                  <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[20px] font-bold tracking-tight ${theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"}`}>
                    Discover more
                  </span>
                  <span 
                    className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-[1px]" 
                    style={{ 
                      backgroundColor: theme === "dark" ? darkColors.primary : lightColors.primary 
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-y-3 group-hover:opacity-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path
                          d="M7 1V13M7 13L3 9M7 13L11 9"
                          fill="none"
                          stroke={theme === "dark" ? "#212121" : "#F9FAF5"}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span className="absolute inset-0 flex items-center justify-center translate-y-[-12px] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path
                          d="M7 1V13M7 13L3 9M7 13L11 9"
                          fill="none"
                          stroke={theme === "dark" ? "#212121" : darkColors.primary}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {isDesktop && (
  <div className="flex justify-end items-end mb-[10vh]" style={{ transform: 'translateY(-75%)' }}>
    <div ref={heroCardsContainerRef} className="w-[180px] lg:w-[220px] xl:w-[260px]">
      <div className="relative w-full aspect-[3/4]" style={{ perspective: '1000px' }}>
        {mediaAssets.map((asset, index) => (
          <div
            key={index}
            ref={(el) => { if (el) heroCardsRef.current[index] = el; }}
            className="absolute w-full h-full cursor-pointer shadow-lg rounded-xl overflow-hidden"
            style={{
              zIndex: 50 - index,
              transform: `translateX(${index * 30}px) translateY(${index * 30}px) scale(${1 - index * 0.05})`,
            }}
            onClick={() => setActiveCard(index)}
            onMouseEnter={() => setHoveredHeroCard(index)}
            onMouseLeave={() => setHoveredHeroCard(null)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <div className="absolute inset-0 z-10">
                {asset.type === 'image' ? (
                  <Image src={asset.src} alt={asset.alt} fill className="object-cover rounded-xl" />
                ) : (
                  <video src={asset.src} muted loop playsInline autoPlay className="w-full h-full object-cover rounded-xl" />
                )}
              </div>
              
              <div className="card-overlay absolute inset-0 z-15 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white text-sm font-bold mb-1">{asset.title}</h3>
                  <p className="text-white/80 text-xs">{asset.subtitle}</p>
                </div>
              </div>
              
              <div 
                className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 pointer-events-none overflow-visible ${
                  hoveredHeroCard === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ height: '35%' }}
              >
                <svg 
                  className="absolute bottom-0 left-0 w-full h-full" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  <path d="M 0 100 L 50 0 L 100 100 Z" fill="#FFFFFF" />
                </svg>
                
                <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex flex-col items-center">
                  <h3 className="text-[#013825] font-bold text-[10px] sm:text-xs mb-0.5">
                    {asset.title}
                  </h3>
                  <p className="text-[#013825] text-[9px] sm:text-[10px] font-semibold">
                    {asset.metric}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {mediaAssets.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              backgroundColor: index === activeCard
                ? (theme === "dark" ? darkColors.paginationActive : lightColors.paginationActive)
                : (theme === "dark" ? darkColors.paginationInactive : lightColors.paginationInactive)
            }}
          />
        ))}
      </div>
    </div>
  </div>
)}

        </div>
      </section>

      <section ref={portfolioSectionRef} className="w-full min-h-screen py-16 sm:py-20 lg:py-24" style={bgStyle}>
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${theme === "dark" ? "text-white" : "text-[#111111]"} text-3xl sm:text-4xl md:text-5xl font-bold`}>
              Services we offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaAssets.map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden"
              >
                <Link href={item.link}>
                  <div 
                    ref={(el) => { if (el) portfolioImageAreasRef.current[index] = el; }}
                    className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden"
                  >
                    {!isDesktop && (
                      <>
                        <div 
                          className="relative w-full h-full"
                          onMouseEnter={() => setHoveredCard(index)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <div className="absolute inset-0 z-10">
                            {item.type === 'image' ? (
                              <Image src={item.src} alt={item.alt} fill className="object-cover rounded-xl" />
                            ) : (
                              <video src={item.src} muted loop playsInline autoPlay className="w-full h-full object-cover rounded-xl" />
                            )}
                          </div>
                          
                          <div 
                            className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 pointer-events-none overflow-hidden ${
                              hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            }`}
                            style={{ height: '25%' }}
                          >
                            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path d="M 0 100 L 0 100 Q 50 5, 100 100 L 100 100 Z" fill="#FFFFFF" />
                            </svg>
                            <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 flex flex-col items-center">
                              <h3 className="text-[#013825] font-bold text-xs sm:text-sm mb-0.5">
                                {item.title}
                              </h3>
                              <p className="text-[#013825] text-[10px] sm:text-xs font-semibold">
                                {item.metric}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className={`${theme === "dark" ? "text-white" : "text-[#111111]"} font-bold text-base sm:text-lg mb-2`}>
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.buttons.map((button, btnIndex) => (
                        <span key={btnIndex} className={`border rounded-full px-3 py-1 text-xs ${theme === "dark" ? "border-white/30 text-white/80" : "border-black/20 text-black/80"}`}>
                          {button}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

