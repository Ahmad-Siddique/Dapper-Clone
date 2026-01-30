// components/ThatsTheTechEyrie.jsx
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThatsTheTechEyrie({ theme = "light" }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const lightColors = {
    background: "#F9F7F0",
  };

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
      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.015) 2px, rgba(0, 0, 0, 0.015) 4px)
    `,
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textElement = textRef.current;

    if (!section || !textElement) return;

    const ctx = gsap.context(() => {
      gsap.set([".thats-the-text", ".tech-eyrie-text"], { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          once: true,
        },
      });

      tl.to(".thats-the-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }).to(
        ".tech-eyrie-text",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.7"
      );
    }, section);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 sm:py-40 md:py-48 lg:py-56 xl:py-64 transition-colors duration-500"
      style={bgStyle}
    >
      {theme === "dark" && (
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={noiseOverlayStyle}
        />
      )}

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8">
        <div ref={textRef} className="text-center">
          {/* "That's the" - Smaller, italic, semibold */}
          <div className="thats-the-text mb-4 sm:mb-6 md:mb-8">
            <span
              className={`font-playfair italic font-semibold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[52px] transition-colors duration-500 ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
              }`}
            >
              That's the
            </span>
          </div>

          {/* "Tech Eyrie" - Larger, light */}
          <div className="tech-eyrie-text">
            <h2
              className={`font-italiana font-light text-[56px] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[140px] 2xl:text-[160px] leading-[0.95] tracking-tight transition-colors duration-500 ${
                theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
              }`}
            >
              Tech Eyrie
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
