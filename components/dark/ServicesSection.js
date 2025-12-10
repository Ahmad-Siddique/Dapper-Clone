// // components/ServicesSection.jsx
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const SERVICES = [
//   {
//     id: "content",
//     title: "Content & Creative",
//     description: "We'll make your prospects stop scrolling.",
//   },
//   {
//     id: "paid",
//     title: "Paid Media & Performance",
//     description: "Build, optimize and scale your performance marketing.",
//   },
//   {
//     id: "data",
//     title: "Data & Measurement",
//     description: "We make the invisible visible.",
//   },
// ];

// export default function ServicesSection({ theme = "dark" }) {
//   const [activeId, setActiveId] = useState(null);

//   // Dark background exactly like HeroSection
//   const bgStyle =
//     theme === "dark"
//       ? {
//           backgroundColor: "#2b2b2b",
//           backgroundImage: `
//           url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
//           radial-gradient(ellipse at top left, rgba(60, 60, 60, 0.3), transparent 50%),
//           radial-gradient(ellipse at bottom right, rgba(50, 50, 50, 0.2), transparent 50%)
//         `,
//           backgroundBlendMode: "overlay, normal, normal",
//         }
//       : { backgroundColor: "#EFEFEF" };

//   const noiseOverlayStyle = {
//     backgroundImage: `
//       repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
//       repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
//       repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.015) 2px, rgba(0, 0, 0, 0.015) 4px)
//     `,
//   };

//   return (
//     <>
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>

//       <section
//         className="relative overflow-hidden pt-32 pb-32 md:pt-40 md:pb-40"
//         style={bgStyle}
//       >
//         {/* Noise overlay — only in dark mode */}
//         {theme === "dark" && (
//           <div
//             className="absolute inset-0 pointer-events-none z-[1]"
//             style={noiseOverlayStyle}
//           />
//         )}

//         <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-8">
//           {/* TOP ROW */}
//           <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] mb-20">
//             <div className="flex items-center gap-3">
//               <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
//               <span
//                 className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase ${
//                   theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
//                 }`}
//               >
//                 Our services
//               </span>
//             </div>

//             <div className="max-w-[1100px]">
//               <h2
//                 className={`font-[Helvetica_Now_Text,Arial,sans-serif] leading-[1.02] tracking-tight ${
//                   theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
//                 }`}
//               >
//                 <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
//                   Level up your marketing,
//                 </span>
//                 <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
//                   improve{" "}
//                   <span className="font-ivy-presto italic font-normal">
//                     marketing ROI
//                   </span>
//                 </span>
//               </h2>

//               <p
//                 className={`mt-8 max-w-[640px] font-[Helvetica_Now_Text,Arial,sans-serif] text-[17px] md:text-[19px] lg:text-[22px] font-semibold leading-relaxed ${
//                   theme === "dark" ? "text-[#d0d0d0]" : "text-[#212121]"
//                 }`}
//               >
//                 Better marketing leads to better marketing ROI. At Dapper, we
//                 help you level up your complete marketing engine. From strategy
//                 to content, advertising, and measurement.
//               </p>
//             </div>
//           </div>

//           {/* Divider */}
//           <div
//             className={`h-px w-full ${
//               theme === "dark"
//                 ? "border-b border-white/10"
//                 : "border-b border-black/10"
//             } mb-20`}
//           />

//           {/* MAIN ROW: Image + Interactive Cards */}
//           <div className="flex flex-col gap-10 lg:flex-row">
//             {/* LEFT: Image */}
//             <div className="relative w-full overflow-hidden rounded-2xl lg:w-[28%]">
//               <div className="relative h-[520px] sm:h-[560px] lg:h-[640px] border border-white/8 shadow-2xl">
//                 <Image
//                   src="https://cdn.prod.website-files.com/67b320fe114d5e148783d276/68947cf33c69a1ceddbdf83d_Dapper%20Flash%20Photos-04.avif"
//                   alt="Dapper team"
//                   fill
//                   className="object-cover"
//                   sizes="(min-width: 1024px) 420px, 100vw"
//                   priority
//                 />
//               </div>

//               {/* Green accent blocks */}
//               <span className="pointer-events-none absolute left-6 top-6 h-12 w-8 bg-[#74F5A1]" />
//               <span className="pointer-events-none absolute left-20 top-32 h-10 w-6 bg-[#74F5A1]" />
//             </div>

//             {/* RIGHT: Interactive service cards */}
//             <div className="flex-1">
//               <div
//                 className="grid h-full gap-4 lg:gap-6 transition-all duration-700 ease-out"
//                 style={{
//                   gridTemplateColumns:
//                     activeId === "content"
//                       ? "1.2fr 0.8fr"
//                       : activeId === "paid"
//                       ? "0.8fr 1.2fr"
//                       : "1fr 1fr",
//                   gridTemplateRows:
//                     activeId === "data" ? "0.85fr 1.15fr" : "1fr 1fr",
//                 }}
//               >
//                 {SERVICES.map((service, index) => {
//                   const isActive = activeId === service.id;

//                   return (
//                     <article
//                       key={service.id}
//                       onMouseEnter={() => setActiveId(service.id)}
//                       onMouseLeave={() => setActiveId(null)}
//                       className={`
//                         group relative flex flex-col justify-between 
//                         rounded-2xl border px-10 py-9 
//                         transition-all duration-700 ease-out
//                         ${
//                           theme === "dark"
//                             ? "bg-[#2a2a2a] border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
//                             : "bg-white border-black/6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
//                         }
//                         ${index === 2 ? "col-span-2" : ""}
//                       `}
//                     >
//                       <h3
//                         className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-bold tracking-tight ${
//                           theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
//                         }`}
//                       >
//                         {service.title}
//                       </h3>

//                       <div className="mt-6 flex items-end justify-between">
//                         <p
//                           className={`max-w-[400px] text-[15px] md:text-[16px] font-semibold leading-snug transition-all duration-500 ease-out ${
//                             theme === "dark"
//                               ? "text-[#aaaaaa]"
//                               : "text-[#444444]"
//                           } ${
//                             isActive
//                               ? "opacity-100 translate-y-0"
//                               : "opacity-0 translate-y-4"
//                           }`}
//                         >
//                           {service.description}
//                         </p>

//                         {/* Arrow Button */}
//                         <Link
//                           href={`/services/${service.id}`}
//                           className={`relative flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#74F5A1] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 ${
//                             theme === "dark"
//                               ? "group-hover:bg-white"
//                               : "group-hover:bg-black"
//                           }`}
//                         >
//                           {/* Default arrow */}
//                           <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0">
//                             <svg width="16" height="16" viewBox="0 0 14 14">
//                               <path
//                                 d="M1 13L13 1M13 1H5M13 1V9"
//                                 fill="none"
//                                 stroke={
//                                   theme === "dark" ? "#212121" : "#212121"
//                                 }
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </span>

//                           {/* Hover arrow */}
//                           <span className="absolute inset-0 flex items-center justify-center translate-x-[-12px] translate-y-[12px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                             <svg width="16" height="16" viewBox="0 0 14 14">
//                               <path
//                                 d="M1 13L13 1M13 1H5M13 1V9"
//                                 fill="none"
//                                 stroke={
//                                   theme === "dark" ? "#111111" : "#74F5A1"
//                                 }
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </span>
//                         </Link>
//                       </div>
//                     </article>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

































// components/ServicesSection.jsx
"use client";

import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    id: "content",
    title: "Content & Creative",
    description: "We'll make your prospects stop scrolling.",
  },
  {
    id: "paid",
    title: "Paid Media & Performance",
    description: "Build, optimize and scale your performance marketing.",
  },
  {
    id: "data",
    title: "Data & Measurement",
    description: "We make the invisible visible.",
  },
];

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection({ theme = "light" }) {
  const [activeId, setActiveId] = useState(null);
  const sectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [hasTriggeredAnimation, setHasTriggeredAnimation] = useState(false);

  // Dark background exactly like HeroSection
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

  const triggerElectricalAnimation = useCallback(() => {
  const titleLines = document.querySelectorAll(".services-title-line");

  // Always use current theme colors — critical for theme switching!
  const getCurrentColors = () => ({
    text: theme === "dark" ? "#f3f3f3" : "#111111",
    electric: "#74f5a1",
    flash: "#ffffff",
  });

  const { text, electric, flash } = getCurrentColors();

  // Split text into characters ONLY ONCE (first run)
  if (!titleLines[0]?.querySelector(".char")) {
    titleLines.forEach((line) => {
      const text = line.textContent;
      let html = "";

      // Split by words but preserve spaces
      const parts = text.split(/(\s+)/);
      parts.forEach((part) => {
        if (part.trim() === "") {
          html += part; // keep spaces
        } else {
          const chars = part.split("").map((char) => {
            const isSpace = char === " ";
            return `<span class="char" style="display:inline-block;position:relative;color:${text}">${
              isSpace ? "&nbsp;" : char
            }</span>`;
          }).join("");
          html += `<span class="word" style="white-space:nowrap">${chars}</span>`;
        }
      });

      line.innerHTML = html;
    });
  }

  // Now animate — always uses latest theme colors
  const chars = document.querySelectorAll(".services-title-line .char");
  const tl = gsap.timeline();

  chars.forEach((char, i) => {
    const delay = i * 0.045 + Math.random() * 0.08;

    tl.to(char, {
      color: flash,
      scale: 1.08,
      duration: 0.14,
      ease: "power2.out",
    }, delay)
      .to(char, {
        color: electric,
        scale: 1.03,
        duration: 0.22,
        ease: "sine.inOut",
      }, delay + 0.12)
      .to(char, {
        color: text,  // ← Always correct current theme color
        scale: 1,
        duration: 0.4,
        ease: "power2.in",
      }, delay + 0.3);
  });

  // Final cleanup — force correct color in case of race conditions
  tl.add(() => {
    const { text } = getCurrentColors();
    gsap.set(".services-title-line .char", { color: text });
  });

}, [theme]); // ← Critical: re-run when theme changes

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

    // Then repeat every 10 seconds
    animationIntervalRef.current = setInterval(() => {
      triggerElectricalAnimation();
    }, 10000);
  }, [triggerElectricalAnimation]);

  // GSAP Scroll Animation for heading
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const titleContainer = titleContainerRef.current;

    if (!section || !titleContainer) return;

    const ctx = gsap.context(() => {
      // Clear any existing animations first
      gsap.killTweensOf(".services-title-line");

      // Set initial state - text is fully visible
      gsap.set(".services-title-line", {
        opacity: 1,
        y: 0,
      });

      // Set up the reveal animation timeline for scroll
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleContainer,
          start: "top 60%", // Trigger when section is halfway passed
          end: "top 30%",
          once: true,
          onEnter: () => {
            if (!hasTriggeredAnimation) {
              setHasTriggeredAnimation(true);
              hasAnimatedRef.current = true;
              // Start electrical animation after scroll reveal
              setTimeout(() => {
                startElectricalAnimation();
              }, 1000);
            }
          },
          markers: false,
        },
      });

      // Animate each line with a staggered reveal
      revealTl.fromTo(
        ".services-title-line",
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

      // Animate service cards on scroll
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      cardTl.fromTo(
        ".service-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }, section);

    return () => ctx.revert();
  }, [theme, startElectricalAnimation, hasTriggeredAnimation]);

  // Start electrical animation on mount (only once)
  useEffect(() => {
    // Start animation after initial load
    const timer = setTimeout(() => {
      if (!hasAnimatedRef.current) {
        triggerElectricalAnimation();
      }
    }, 1500);

    // Clean up on unmount
    return () => {
      clearTimeout(timer);
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [triggerElectricalAnimation]);

  // Add CSS for the electrical effects and smooth transitions
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
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

      /* Keep words together */
      .word {
        white-space: nowrap;
        display: inline-block;
      }

      /* Fellix font styling for headings */
      .font-fellix {
        font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Smooth color transitions for theme switching */
      .services-title-line, 
      .services-title-line .char,
      .services-title-line .word {
        transition: color 0.5s ease;
      }

      /* Smooth transitions for all text elements */
      .text-transition {
        transition: color 0.5s ease;
      }

      /* Smooth background transitions */
      .bg-transition {
        transition: background-color 0.5s ease, border-color 0.5s ease;
      }

      /* Smooth border transitions */
      .border-transition {
        transition: border-color 0.5s ease;
      }

      /* Service card transitions */
      .service-card {
        transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), 
                   box-shadow 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
                   background-color 0.5s ease,
                   border-color 0.5s ease;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden pt-32 pb-32 md:pt-40 md:pb-40 bg-transition"
        style={bgStyle}
      >
        {/* Noise overlay — only in dark mode */}
        {theme === "dark" && (
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={noiseOverlayStyle}
          />
        )}

        <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-8">
          {/* TOP ROW */}
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] mb-20">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
              <span
                className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-transition ${
                  theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
                }`}
              >
                Our services
              </span>
            </div>

            <div className="max-w-[1100px]" ref={titleContainerRef}>
              {/* Title with FELLIX font and electrical animation */}
              <h2 className="font-fellix leading-[1.02] tracking-tight">
                {/* Line 1 */}
                <div
                  className={`services-title-line text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] text-transition ${
                    theme == "dark" ? "text-white" : "text-[#111111]"
                  }`}
                >
                  <span className="font-normal">Level up your marketing,</span>
                </div>
                {/* Line 2 */}
                <div
                  className={`services-title-line text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] text-transition ${
                    theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                  }`}
                >
                  <span className="font-normal">improve </span>
                  <span className="font-fellix italic font-normal tracking-[0.03em]">
                    marketing ROI
                  </span>
                </div>
              </h2>

              <p
                className={`mt-8 max-w-[640px] font-[Helvetica_Now_Text,Arial,sans-serif] text-[17px] md:text-[19px] lg:text-[22px] font-semibold leading-relaxed text-transition ${
                  theme === "dark" ? "text-[#d0d0d0]" : "text-[#212121]"
                }`}
              >
                Better marketing leads to better marketing ROI. At Dapper, we
                help you level up your complete marketing engine. From strategy
                to content, advertising, and measurement.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`h-px w-full border-transition mb-20 ${
              theme === "dark"
                ? "border-b border-white/10"
                : "border-b border-black/10"
            }`}
          />

          {/* MAIN ROW: Image + Interactive Cards */}
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* LEFT: Image */}
            <div className="relative w-full overflow-hidden rounded-2xl lg:w-[28%] service-card">
              <div className="relative h-[520px] sm:h-[560px] lg:h-[640px] border border-transition shadow-2xl">
                <Image
                  src="https://cdn.prod.website-files.com/67b320fe114d5e148783d276/68947cf33c69a1ceddbdf83d_Dapper%20Flash%20Photos-04.avif"
                  alt="Dapper team"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  priority
                />
              </div>

              {/* Green accent blocks */}
              <span className="pointer-events-none absolute left-6 top-6 h-12 w-8 bg-[#74F5A1]" />
              <span className="pointer-events-none absolute left-20 top-32 h-10 w-6 bg-[#74F5A1]" />
            </div>

            {/* RIGHT: Interactive service cards */}
            <div className="flex-1">
              <div
                className="grid h-full gap-4 lg:gap-6 transition-all duration-700 ease-out"
                style={{
                  gridTemplateColumns:
                    activeId === "content"
                      ? "1.2fr 0.8fr"
                      : activeId === "paid"
                      ? "0.8fr 1.2fr"
                      : "1fr 1fr",
                  gridTemplateRows:
                    activeId === "data" ? "0.85fr 1.15fr" : "1fr 1fr",
                }}
              >
                {SERVICES.map((service, index) => {
                  const isActive = activeId === service.id;

                  return (
                    <article
                      key={service.id}
                      onMouseEnter={() => setActiveId(service.id)}
                      onMouseLeave={() => setActiveId(null)}
                      className={`
                        service-card group relative flex flex-col justify-between 
                        rounded-2xl border px-10 py-9 
                        transition-all duration-700 ease-out
                        ${
                          theme === "dark"
                            ? "bg-[#2a2a2a] border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
                            : "bg-white border-black/6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                        }
                        ${index === 2 ? "col-span-2" : ""}
                      `}
                    >
                      <h3
                        className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-bold tracking-tight text-transition ${
                          theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                        }`}
                      >
                        {service.title}
                      </h3>

                      <div className="mt-6 flex items-end justify-between">
                        <p
                          className={`max-w-[400px] text-[15px] md:text-[16px] font-semibold leading-snug transition-all duration-500 ease-out text-transition ${
                            theme === "dark"
                              ? "text-[#aaaaaa]"
                              : "text-[#444444]"
                          } ${
                            isActive
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                          }`}
                        >
                          {service.description}
                        </p>

                        {/* Arrow Button */}
                        <Link
                          href={`/services/${service.id}`}
                          className={`relative flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#74F5A1] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 ${
                            theme === "dark"
                              ? "group-hover:bg-white"
                              : "group-hover:bg-black"
                          }`}
                        >
                          {/* Default arrow */}
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0">
                            <svg width="16" height="16" viewBox="0 0 14 14">
                              <path
                                d="M1 13L13 1M13 1H5M13 1V9"
                                fill="none"
                                stroke={
                                  theme === "dark" ? "#212121" : "#212121"
                                }
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>

                          {/* Hover arrow */}
                          <span className="absolute inset-0 flex items-center justify-center translate-x-[-12px] translate-y-[12px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <svg width="16" height="16" viewBox="0 0 14 14">
                              <path
                                d="M1 13L13 1M13 1H5M13 1V9"
                                fill="none"
                                stroke={
                                  theme === "dark" ? "#111111" : "#74F5A1"
                                }
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}