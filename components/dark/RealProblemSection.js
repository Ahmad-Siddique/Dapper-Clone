// components/RealProblemSection.jsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function RealProblemSection({ theme = "light" }) {
  const containerRef = useRef(null);
  
  // Animation refs for electric text
  const animationIntervalRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Triangle animation effects
  const [triangles, setTriangles] = useState([]);
  const triangleIdRef = useRef(0);

  // Color Palettes
  const lightColors = {
    primary: "#013825",
    secondary: "#9E8F72",
    tertiary: "#CEC8B0",
    background: "#F9F7F0",
  };

  // Background styles based on theme
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
      : { backgroundColor: lightColors.background };

  const noiseOverlayStyle = {
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.03) 1px, rgba(255, 255, 255, 0.03) 2px),
      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.03) 1px, rgba(255, 255, 255, 0.03) 2px),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.015) 2px, rgba(255, 255, 255, 0.015) 4px)
    `,
  };

  // --- ELECTRIC ANIMATION LOGIC ---

  const triggerElectricalAnimation = useCallback(() => {
    const titleLines = document.querySelectorAll(".hero-title-line");

    const originalColor = theme === "dark" ? "#f3f3f3" : "#111111";
    const electricColor = theme === "dark" ? "#74F5A1" : "#3BC972";
    const brightElectricColor = theme === "dark" ? "#FFFFFF" : "#FFFFFF";

    const tl = gsap.timeline({
      defaults: {
        ease: "sine.inOut",
      },
    });

    titleLines.forEach((line, lineIndex) => {
      const text = line.textContent;

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

      const chars = line.querySelectorAll(".char");
      chars.forEach((char, charIndex) => {
        const baseDelay = lineIndex * 0.5 + charIndex * 0.06;
        const randomDelay = Math.random() * 0.1;
        const totalDelay = baseDelay + randomDelay;

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        startElectricalAnimation();
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [startElectricalAnimation]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes subtle-glitch {
        0%, 100% { transform: translateX(0); }
        94% { transform: translateX(0); }
        95% { transform: translateX(1px); }
        96% { transform: translateX(-1px); }
        97% { transform: translateX(0); }
      }
      .char {
        transition: color 0.15s ease, transform 0.15s ease;
        will-change: color, transform;
        animation: subtle-glitch 10s infinite;
      }
      .char:nth-child(3n) { animation-delay: 0.5s; }
      .char:nth-child(3n+1) { animation-delay: 1s; }
      .char:nth-child(3n+2) { animation-delay: 1.5s; }
      .word { white-space: nowrap; display: inline-block; }
      
      .bg-transition {
        transition: background-color 0.5s ease, border-color 0.5s ease;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // --- END ELECTRIC ANIMATION LOGIC ---

  const createTriangle = useCallback((x, y) => {
    const id = triangleIdRef.current++;
    const size = Math.random() * 12 + 20;
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
    const section = containerRef.current?.closest("section");
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

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createTriangle]);

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
        ref={containerRef}
        className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-transition"
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

        <div className="relative z-10 mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8">
          {/* Label above everything */}
          <div className="mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
            <span className="inline-flex h-4 w-4 sm:h-5 sm:w-5 rounded-sm bg-[#74F5A1]" />
            <span
              className={`font-italiana text-[11px] sm:text-[12px] md:text-[13px] lg:text-[16px] font-semibold tracking-[0.16em]  ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
              }`}
            >
              The real problem is
            </span>
          </div>

          {/* Heading left, copy/CTA right */}
          <div className="mb-8 sm:mb-10 grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2
                className={`leading-[1.02] tracking-tight ${
                  theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                }`}
              >
                <span className="hero-title-line block font-italiana font-light text-[24px] sm:text-[32px] md:text-[40px] lg:text-[56px] xl:text-[70px] 2xl:text-[82px]">
                  Most businesses don&apos;t
                </span>
                <span className="hero-title-line block font-italiana font-light text-[24px] sm:text-[32px] md:text-[40px] lg:text-[56px] xl:text-[70px] 2xl:text-[82px]">
                  have a tool problem,
                </span>
                <span className="hero-title-line block font-playfair font-semibold italic text-[24px] sm:text-[32px] md:text-[40px] lg:text-[56px] xl:text-[70px] 2xl:text-[82px]">
                  they have a systems
                </span>
                <span className="hero-title-line block font-playfair font-semibold italic text-[24px] sm:text-[32px] md:text-[40px] lg:text-[56px] xl:text-[70px] 2xl:text-[82px]">
                  problem
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:max-w-[600px]">
              <p
                className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] font-normal leading-relaxed ${
                  theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
                }`}
              >
                Too many businesses invest in the latest tools and platforms, expecting them to solve their growth challenges. But without the right systems in place, those tools become expensive distractions rather than drivers of real results.
              </p>

              <p
                className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] font-normal leading-relaxed ${
                  theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
                }`}
              >
                We build the frameworks, processes, and workflows that turn your tech stack into a high-performing marketing engine. Strategy comes first, tools follow.
              </p>

              <Link
  href="/services"
  className="group inline-flex items-center gap-3 self-start rounded-[8px] sm:rounded-[10px] px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.05] hover:-translate-y-[1px]"
  style={{ backgroundColor: '#12685b' }}
>
  <span className="font-[Helvetica_Now_Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight text-white">
    Our services
  </span>

  <span className="relative inline-flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center overflow-hidden rounded-[4px] bg-white/20 group-hover:bg-white/30 transition-colors duration-500">
    <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0">
      <svg
        width="12"
        height="12"
        className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"
        viewBox="0 0 14 14"
        aria-hidden="true"
      >
        <path
          d="M1 13L13 1M13 1H5M13 1V9"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
      <svg
        width="12"
        height="12"
        className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"
        viewBox="0 0 14 14"
        aria-hidden="true"
      >
        <path
          d="M1 13L13 1M13 1H5M13 1V9"
          fill="none"
          stroke="#ffffff"
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
      </section>
    </>
  );
}
