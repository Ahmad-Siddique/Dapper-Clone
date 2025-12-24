"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcaseSection() {
  const containerRef = useRef(null);
  
  // Section 1 - Warden refs
  const section1Ref = useRef(null);
  const glassRef = useRef(null);
  const cardRef = useRef(null);
  const rightContent1Ref = useRef(null);
  
  // Section 2 - Skunk Ape refs
  const section2Ref = useRef(null);
  const hopsRef = useRef(null);
  const stickerRef = useRef(null);
  const rightContent2Ref = useRef(null);

  // Section 3 - Mermaids' Tears refs
  const section3Ref = useRef(null);
  const jugRef = useRef(null);
  const card3Ref = useRef(null);
  const rightContent3Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",        // Pin for 6 screens (3 sections * 2)
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });

    // ============ PHASE 1: Section 1 (Warden) Animate In ============
    tl.fromTo(
      glassRef.current,
      { x: -400, opacity: 0, rotation: -15, scale: 0.8 },
      { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "power3.out" },
      0
    )
    .fromTo(
      cardRef.current,
      { x: -350, opacity: 0, rotation: -12, scale: 0.9 },
      { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "power3.out" },
      0
    )
    .fromTo(
      rightContent1Ref.current,
      { rotationY: 95, transformOrigin: "right center", opacity: 0, scale: 1.4, x: 100, filter: "blur(8px)" },
      { rotationY: 0, opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.inOut" },
      0
    )
    
    // Hold Section 1
    .to({}, { duration: 0.5 })
    
    // ============ PHASE 2: Section 1 Fade Out ============
    .to(
      section1Ref.current,
      { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.8, ease: "power2.in" }
    )
    
    // ============ PHASE 3: Section 2 (Skunk Ape) Animate In ============
    .fromTo(
      section2Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: "none" }
    )
    .fromTo(
      hopsRef.current,
      { x: -400, opacity: 0, rotation: -15, scale: 0.8 },
      { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.1"
    )
    .fromTo(
      stickerRef.current,
      { x: -350, opacity: 0, rotation: -12, scale: 0.9 },
      { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.9"
    )
    .fromTo(
      rightContent2Ref.current,
      { rotationY: 95, transformOrigin: "right center", opacity: 0, scale: 1.4, x: 100, filter: "blur(8px)" },
      { rotationY: 0, opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.inOut" },
      "-=0.9"
    )
    
    // Hold Section 2
    .to({}, { duration: 0.5 })
    
    // ============ PHASE 4: Section 2 Fade Out ============
    .to(
      section2Ref.current,
      { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.8, ease: "power2.in" }
    )
    
    // ============ PHASE 5: Section 3 (Mermaids' Tears) Animate In ============
    .fromTo(
      section3Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: "none" }
    )
    .fromTo(
      jugRef.current,
      { x: -400, opacity: 0, rotation: -15, scale: 0.8 },
      { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.1"
    )
    .fromTo(
      card3Ref.current,
      { x: -350, opacity: 0, rotation: -12, scale: 0.9 },
      { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.9"
    )
    .fromTo(
      rightContent3Ref.current,
      { rotationY: 95, transformOrigin: "right center", opacity: 0, scale: 1.4, x: 100, filter: "blur(8px)" },
      { rotationY: 0, opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.inOut" },
      "-=0.9"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#F4EDDD] overflow-hidden"
    >
      {/* ==================== SECTION 1 - WARDEN OF THE WILD ==================== */}
      <div 
        ref={section1Ref}
        className="absolute inset-0 flex items-center justify-center px-4 md:px-12 lg:px-20"
      >
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative h-[600px] lg:h-[700px]">
            <div 
              ref={glassRef}
              className="absolute top-0 left-0 lg:left-10 w-[280px] md:w-[350px] lg:w-[400px] z-10"
              style={{ opacity: 0 }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600"
                  alt="Whisky glass on tree stump"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <div 
              ref={cardRef}
              className="absolute bottom-0 right-0 lg:right-10 w-[250px] md:w-[300px] lg:w-[350px] z-20"
              style={{ opacity: 0 }}
            >
              <div className="relative bg-[#E8DCC8] rounded-lg shadow-2xl overflow-hidden border-2 border-[#2C3E2E]/20">
                <div className="p-4 border-b border-[#2C3E2E]/20 flex justify-between items-start">
                  <span className="text-xs font-mono text-[#2C3E2E]">00119_01</span>
                  <span className="text-xs font-mono text-[#2C3E2E]">A</span>
                </div>
                <div className="relative w-full h-[180px] md:h-[220px] bg-[#2C3E2E]/10">
                  <Image
                    src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600"
                    alt="Journey to Ironhill"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg md:text-xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] uppercase tracking-wide">
                    Journey to Ironhill
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-[#2C3E2E]/70">7/83 INR</span>
                    <span className="text-2xl font-bold text-[#2C3E2E]">91</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative" style={{ perspective: "2500px", perspectiveOrigin: "50% 50%" }}>
            <div 
              ref={rightContent1Ref}
              className="space-y-8"
              style={{ opacity: 0, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 relative opacity-70">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#4A6B5E]">
                    <path d="M50 10 C30 10 20 25 20 40 C20 55 25 65 30 75 L35 85 L40 90 L50 95 L60 90 L65 85 L70 75 C75 65 80 55 80 40 C80 25 70 10 50 10 Z M40 35 C40 32 42 30 45 30 C48 30 50 32 50 35 C50 38 48 40 45 40 C42 40 40 38 40 35 Z M55 30 C58 30 60 32 60 35 C60 38 58 40 55 40 C52 40 50 38 50 35 C50 32 52 30 55 30 Z" />
                  </svg>
                </div>
                <div className="w-20 h-16 md:w-24 md:h-20 bg-[#E8DCC8] border-2 border-[#D4A574] rounded shadow-md transform rotate-12">
                  <div className="p-2 space-y-1">
                    <div className="w-full h-1 bg-[#2C3E2E]/20 rounded"></div>
                    <div className="w-3/4 h-1 bg-[#2C3E2E]/20 rounded"></div>
                    <div className="text-[10px] text-[#2C3E2E] font-bold text-center mt-2">14</div>
                  </div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 relative opacity-70">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4A574]">
                    <path d="M50 5 C35 5 25 15 20 30 L15 45 L20 60 C25 70 30 80 40 85 L50 90 L60 85 C70 80 75 70 80 60 L85 45 L80 30 C75 15 65 5 50 5 Z M38 25 C41 25 43 27 43 30 C43 33 41 35 38 35 C35 35 33 33 33 30 C33 27 35 25 38 25 Z M62 25 C65 25 67 27 67 30 C67 33 65 35 62 35 C59 35 57 33 57 30 C57 27 59 25 62 25 Z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] leading-none tracking-tight">
                  WARDEN<span className="text-4xl md:text-5xl lg:text-6xl align-super">OF</span>
                </h2>
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] leading-none tracking-tight">
                  THE WILD
                </h2>
              </div>

              <div className="space-y-1 max-w-md">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#2C3E2E] font-medium">
                  Whisky that warms the soul
                </p>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#2C3E2E] font-medium">
                  when the stories run cold
                </p>
              </div>

              <div className="pt-6">
                <button className="group relative px-12 py-4 bg-[#2C3E2E] text-[#F4EDDD] font-medium tracking-widest uppercase text-sm rounded-md overflow-hidden transition-all duration-300 hover:bg-[#3D5340] hover:scale-105">
                  <span className="relative z-10">Explore</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ==================== SECTION 2 - SKUNK APE ==================== */}
      <div 
        ref={section2Ref}
        className="absolute inset-0 flex items-center justify-center px-4 md:px-12 lg:px-20"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative h-[600px] lg:h-[700px]">
            <div 
              ref={hopsRef}
              className="absolute top-0 left-0 lg:left-10 w-[280px] md:w-[350px] lg:w-[400px] z-10"
              style={{ opacity: 0 }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600"
                  alt="Hops plant illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <div 
              ref={stickerRef}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 w-[280px] md:w-[320px] lg:w-[360px] z-20"
              style={{ opacity: 0 }}
            >
              <div className="relative bg-gradient-to-br from-[#F4A460] via-[#DAA520] to-[#B8860B] rounded-3xl shadow-2xl p-8 border-4 border-[#8B6914]">
                <div className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#3D2817]">
                      <path d="M50 10 C30 10 20 25 20 40 C20 55 25 65 30 75 L35 85 L40 90 L50 95 L60 90 L65 85 L70 75 C75 65 80 55 80 40 C80 25 70 10 50 10 Z M40 35 C40 32 42 30 45 30 C48 30 50 32 50 35 C50 38 48 40 45 40 C42 40 40 38 40 35 Z M55 30 C58 30 60 32 60 35 C60 38 58 40 55 40 C52 40 50 38 50 35 C50 32 52 30 55 30 Z" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-[#3D2817] tracking-wide">SKUNK<br/>APE</p>
                  <div className="bg-[#F4EDDD] py-2 px-6 rounded-lg">
                    <p className="text-sm font-bold text-[#3D2817]">IRONHILL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative" style={{ perspective: "2500px", perspectiveOrigin: "50% 50%" }}>
            <div 
              ref={rightContent2Ref}
              className="space-y-8"
              style={{ opacity: 0, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 relative opacity-70">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#4A6B5E]">
                    <path d="M50 10 C30 10 20 25 20 40 C20 55 25 65 30 75 L35 85 L40 90 L50 95 L60 90 L65 85 L70 75 C75 65 80 55 80 40 C80 25 70 10 50 10 Z" />
                  </svg>
                </div>
                <div className="w-32 h-20 relative opacity-80">
                  <Image
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=200"
                    alt="Vintage photo"
                    fill
                    className="object-cover rounded shadow-lg sepia"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] leading-none tracking-tight">
                  SKUNK
                </h2>
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] leading-none tracking-tight">
                  APE
                </h2>
              </div>

              <div className="space-y-1 max-w-md">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#2C3E2E] font-medium">
                  Swamp-stomping beer
                </p>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#2C3E2E] font-medium">
                  brewed in the wetlands
                </p>
              </div>

              <div className="pt-6">
                <button className="group relative px-12 py-4 bg-[#2C3E2E] text-[#F4EDDD] font-medium tracking-widest uppercase text-sm rounded-md overflow-hidden transition-all duration-300 hover:bg-[#3D5340] hover:scale-105">
                  <span className="relative z-10">Explore</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ==================== SECTION 3 - MERMAIDS' TEARS ==================== */}
      <div 
        ref={section3Ref}
        className="absolute inset-0 flex items-center justify-center px-4 md:px-12 lg:px-20"
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Jug with Cattails */}
            <div 
              ref={jugRef}
              className="absolute top-0 left-0 lg:left-10 w-[280px] md:w-[350px] lg:w-[400px] z-10"
              style={{ opacity: 0 }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600"
                  alt="Water jug with cattails and shells"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Journey Card 3 */}
            <div 
              ref={card3Ref}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 w-[250px] md:w-[300px] lg:w-[350px] z-20"
              style={{ opacity: 0 }}
            >
              <div className="relative bg-[#E8DCC8] rounded-lg shadow-2xl overflow-hidden border-2 border-[#2C3E2E]/20 transform -rotate-3">
                <div className="p-4 border-b border-[#2C3E2E]/20 flex justify-between items-start">
                  <span className="text-xs font-mono text-[#2C3E2E]">00125_03</span>
                  <span className="text-xs font-mono text-[#2C3E2E]">A</span>
                </div>
                <div className="relative w-full h-[180px] md:h-[220px] bg-[#2C3E2E]/10">
                  <Image
                    src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=600"
                    alt="Ocean waves"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg md:text-xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] uppercase tracking-wide">
                    Journey to Ironhill
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-[#2C3E2E]/70">4/65 INR</span>
                    <span className="text-2xl font-bold text-[#2C3E2E]">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Mermaids' Tears Content */}
          <div className="relative" style={{ perspective: "2500px", perspectiveOrigin: "50% 50%" }}>
            <div 
              ref={rightContent3Ref}
              className="space-y-8"
              style={{ opacity: 0, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              {/* Icons - Mermaid and Whale Tail */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 relative opacity-70">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#4A7C7E]">
                    {/* Mermaid silhouette */}
                    <path d="M50 10 C45 10 40 15 40 20 L40 35 C40 40 35 45 30 50 L25 55 C20 60 25 70 30 65 L40 60 L40 80 C40 85 45 90 50 90 C55 90 60 85 60 80 L60 60 L70 65 C75 70 80 60 75 55 L70 50 C65 45 60 40 60 35 L60 20 C60 15 55 10 50 10 Z" />
                  </svg>
                </div>
                <div className="w-32 h-20 relative opacity-80">
                  <Image
                    src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=200"
                    alt="Whale tail photo"
                    fill
                    className="object-cover rounded shadow-lg sepia"
                  />
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] leading-none tracking-tight">
                  MERMAIDS'
                </h2>
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-source-serif)] text-[#2C3E2E] leading-none tracking-tight">
                  TEARS
                </h2>
              </div>

              {/* Subtitle */}
              <div className="space-y-1 max-w-md">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#2C3E2E] font-medium">
                  A water that whispers
                </p>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#2C3E2E] font-medium">
                  of faraway seas
                </p>
              </div>

              {/* Explore Button */}
              <div className="pt-6">
                <button className="group relative px-12 py-4 bg-[#2C3E2E] text-[#F4EDDD] font-medium tracking-widest uppercase text-sm rounded-md overflow-hidden transition-all duration-300 hover:bg-[#3D5340] hover:scale-105">
                  <span className="relative z-10">Explore</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
