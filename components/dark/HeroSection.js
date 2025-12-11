// components/HeroSection.jsx
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
  const sectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const [triangles, setTriangles] = useState([]);
  const triangleIdRef = useRef(0);
  const hasAnimatedRef = useRef(false);
  const animationIntervalRef = useRef(null);
  const storyteqCardRef = useRef(null);
  const [videoStack, setVideoStack] = useState([0, 1, 2, 3]); // Stack order: top to bottom
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);

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

  // Handle clicking on any media asset to bring it to top
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

  // Control video playback
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const titleContainer = titleContainerRef.current;

    if (!section || !titleContainer) return;

    // Create the GSAP context
    const ctx = gsap.context(() => {
      // Clear any existing animations first
      gsap.killTweensOf(".hero-title-line");

      // Set initial state - text is fully visible
      gsap.set(".hero-title-line", {
        opacity: 1,
        y: 0,
      });

      // Set up the reveal animation timeline for scroll
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleContainer,
          start: "top 85%",
          end: "top 50%",
          once: true,
          onEnter: () => {
            hasAnimatedRef.current = true;
            // Start animation after scroll reveal
            setTimeout(() => {
              startElectricalAnimation();
            }, 1000);
          },
          markers: false,
        },
      });

      // Animate each line with a staggered reveal
      revealTl.fromTo(
        ".hero-title-line",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      // Original entrance animations for other elements
      const entranceTl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      entranceTl
        .from(".hero-badge", {
          y: 24,
          opacity: 0,
        })
        .from(
          ".hero-body",
          {
            y: 32,
            opacity: 0,
            stagger: 0.08,
          },
          "-=0.2"
        );
    }, section);

    return () => ctx.revert();
  }, [theme]);

  // Add hover animation for the Storyteq card
  useEffect(() => {
    const card = storyteqCardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(card, {
        scale: 1,
        boxShadow: "0 18px 45px rgba(0, 0, 0, 0.22)",
      });

      // Hover animation timeline
      const hoverTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: "power2.out" }
      });

      hoverTl
        .to(card, {
          scale: 1.03,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
        })
        .to(".card-image", {
          scale: 1.05,
          duration: 0.5,
        }, "<")
        .to(".card-content", {
          y: -3,
          duration: 0.3,
        }, "<0.1");

      // Mouse enter event
      const handleMouseEnter = () => {
        hoverTl.play();
      };

      // Mouse leave event
      const handleMouseLeave = () => {
        hoverTl.reverse();
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, card);

    return () => ctx.revert();
  }, []);

  // Function to create smooth electrical hover effect
  const triggerElectricalAnimation = useCallback(() => {
    const titleLines = document.querySelectorAll(".hero-title-line");

    // Define colors based on theme
    const originalColor = theme === "dark" ? "#f3f3f3" : "#111111";
    const electricColor = theme === "dark" ? "#74F5A1" : "#3BC972";
    const brightElectricColor = theme === "dark" ? "#FFFFFF" : "#FFFFFF";

    // Create a single timeline for all lines
    const tl = gsap.timeline({
      defaults: {
        ease: "sine.inOut",
      },
    });

    // Animate each line with an electrical sweep effect
    titleLines.forEach((line, lineIndex) => {
      // Get the text content
      const text = line.textContent;

      // Split text into spans for character-by-character animation
      if (!line.querySelector(".char")) {
        const chars = text
          .split("")
          .map(
            (char, i) =>
              `<span class="char" style="color: ${originalColor}; display: inline-block; position: relative;" data-index="${i}">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");
        line.innerHTML = chars;
      }

      // Animate each character with electrical effect
      const chars = line.querySelectorAll(".char");
      chars.forEach((char, charIndex) => {
        // Randomize timing slightly for electrical feel
        const baseDelay = lineIndex * 0.5 + charIndex * 0.06;
        const randomDelay = Math.random() * 0.1;
        const totalDelay = baseDelay + randomDelay;

        // Electrical flicker effect
        tl.to(
          char,
          {
            duration: 0.12,
            color: brightElectricColor,
            scale: 1.05,
            delay: totalDelay,
            ease: "power2.out",
          },
          0
        )
          .to(
            char,
            {
              duration: 0.18,
              color: electricColor,
              scale: 1.02,
              delay: totalDelay + 0.12,
              ease: "sine.inOut",
            },
            0
          )
          .to(
            char,
            {
              duration: 0.3,
              color: originalColor,
              scale: 1,
              delay: totalDelay + 0.3,
              ease: "power2.in",
            },
            0
          );
      });
    });
  }, [theme]);

  // Function to start continuous animation
  const startElectricalAnimation = useCallback(() => {
    // Clear any existing interval
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    // Trigger first animation immediately
    setTimeout(() => {
      triggerElectricalAnimation();
    }, 800);

    // Then repeat every 4 seconds (slower interval)
    animationIntervalRef.current = setInterval(() => {
      triggerElectricalAnimation();
    }, 10000);
  }, [triggerElectricalAnimation]);

  // Add CSS for the electrical effects and card hover
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
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

      @keyframes subtle-glitch {
        0%, 100% {
          transform: translateX(0);
        }
        94% {
          transform: translateX(0);
        }
        95% {
          transform: translateX(1px);
        }
        96% {
          transform: translateX(-1px);
        }
        97% {
          transform: translateX(0);
        }
      }

      .animate-triangle-fade {
        animation: triangle-fade 1.05s ease-out forwards;
      }

      /* Smooth transition for electrical effects */
      .char {
        transition: color 0.15s ease, transform 0.15s ease;
        will-change: color, transform;
        animation: subtle-glitch 10s infinite;
      }

      /* Different glitch timing for each character */
      .char:nth-child(3n) {
        animation-delay: 0.5s;
      }
      .char:nth-child(3n+1) {
        animation-delay: 1s;
      }
      .char:nth-child(3n+2) {
        animation-delay: 1.5s;
      }

      /* Fellix font styling for headings */
      .font-fellix {
        font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Smooth theme transition for title */
      .hero-title-line {
        transition: color 0.4s ease;
      }

      /* Card hover animation styles */
      .storyteq-card {
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                   box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-origin: center;
        cursor: pointer;
      }

      .storyteq-card:hover {
        transform: scale(1.03);
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3) !important;
      }

      .storyteq-card:hover .card-image {
        transform: scale(1.05);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .storyteq-card:hover .card-content {
        transform: translateY(-3px);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Start animation on mount
  useEffect(() => {
    // Start animation after initial load
    const timer = setTimeout(() => {
      startElectricalAnimation();
    }, 1500);

    // Clean up on unmount
    return () => {
      clearTimeout(timer);
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [startElectricalAnimation]);

  const createTriangle = useCallback((x, y) => {
    const id = triangleIdRef.current++;
    const size = Math.random() * 5 + 8;
    const rotation = Math.random() * 360;
    const greenShades = ["#74F5A1", "#5FE08D", "#4DD97F", "#3BC972"];
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

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createTriangle]);

  // Background styles
  const bgStyle =
    theme === "dark"
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-32 md:pt-40 pb-28"
      style={bgStyle}
    >
      {/* Noise texture overlay */}
      {theme === "dark" && (
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

      {/* BACKGROUND LEAF IMAGE ON RIGHT */}
      <div className="pointer-events-none absolute inset-y-0 right-[-14%] w-[120%] sm:right-[-6%] sm:w-[70%] lg:right-[-2%] lg:w-[55%] xl:right-0 xl:w-[50%]">
        {/* <Image
          src="/hero-plant.png"
          alt="Decorative plant"
          fill
          priority
          className="object-contain object-right"
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 600px, (min-width: 768px) 480px, 320px"
        /> */}
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10">
        {/* Top text block: badge + full-width title */}
        <div className="max-w-[1400px]" ref={titleContainerRef}>
          {/* Badge */}
          <div className="hero-badge mb-10 flex items-center gap-3">
            <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
            <span
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
              }`}
            >
              B2B marketing agency
            </span>
          </div>

          {/* Title with FELLIX font and electrical animation */}
          <h1 className="mb-4 font-fellix leading-[0.92] tracking-[-0.03em] [font-variant-ligatures:no-common-ligatures]">
            {/* Line 1 */}
            <div
              className={`hero-title-line text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px] ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
              }`}
            >
              <span className="font-bold">We build </span>
              <span className="italic font-semibold tracking-[0.03em]">
                high‑performing
              </span>
            </div>
            {/* Line 2 */}
            <div
              className={`hero-title-line mt-2 text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px]  ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
              }`}
            >
              marketing engines for
            </div>
            {/* Line 3 */}
            <div
              className={`hero-title-line mt-2 text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px]  ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
              }`}
            >
              B2B brands
            </div>
          </h1>
        </div>

        {/* Row: left = subcopy + CTA, right = card */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          {/* Left column: subcopy + CTA */}
          <div className="hero-body lg:flex-1 max-w-[640px]">
            <p
              className={`mb-9 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold leading-relaxed ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
              }`}
            >
              We build, optimize and scale marketing engines that generate
              pipeline and improve marketing ROI.
            </p>

            {/* Main CTA with straight downward animated arrow */}
            <Link
              href="#discover"
              className="inline-flex items-center gap-3 group"
            >
              <span
                className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold tracking-tight ${
                  theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                }`}
              >
                Discover more
              </span>

              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                {/* Default downward arrow */}
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-y-3 group-hover:opacity-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 1V13M7 13L3 9M7 13L11 9"
                      fill="none"
                      stroke="#212121"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* New downward arrow (flies in from top) */}
                <span className="absolute inset-0 flex items-center justify-center translate-y-[-12px] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 1V13M7 13L3 9M7 13L11 9"
                      fill="none"
                      stroke="#74F5A1"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </div>

          {/* Right column: Storyteq card flush to the right */}
          <div className="hero-body lg:flex-shrink-0 lg:ml-auto w-full lg:w-auto relative z-20">
            <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl">
              {/* Interactive Media Stack Container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl" style={{ perspective: '1000px' }}>
                {videoStack.map((mediaIndex, stackPosition) => (
                  <div
                    key={mediaIndex}
                    className={`absolute w-full h-full transition-all duration-500 ease-out cursor-pointer ${
                      stackPosition === 0 
                        ? 'opacity-100 shadow-2xl scale-100 z-40' 
                        : 'opacity-80 shadow-lg'
                    }`}
                    style={{
                      transform: `
                        translateX(${stackPosition * 15}px) 
                        translateY(${stackPosition * 15}px) 
                        translateZ(-${stackPosition * 30}px)
                        scale(${1 - stackPosition * 0.05})
                      `,
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
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Card Overlay with Brand Info */}
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

                      {/* Media Type Indicator */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full pointer-events-none">
                        <span className="text-white text-xs font-medium font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] uppercase">
                          {mediaAssets[mediaIndex].type}
                        </span>
                      </div>

                      {/* Play Indicator for Videos */}
                      {mediaAssets[mediaIndex].type === 'video' && stackPosition !== 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {mediaAssets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleMediaClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === videoStack[0] 
                        ? 'bg-[#74F5A1] scale-110' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`View ${mediaAssets[index].title}`}
                  />
                ))}
              </div>

              {/* Current Media Info */}
              <div className="text-center mt-4">
                <p className={`text-sm font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Click any card to bring it to the front
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div
          className={`mt-20 h-px w-full ${
            theme === "dark"
              ? "border-b border-white/10"
              : "border-b border-black/10"
          }`}
        />
      </div>
    </section>
  );
}