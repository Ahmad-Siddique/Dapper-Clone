"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkCTA({ theme = "light" }) {
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!sectionRef.current || !gradientRef.current) return;

    const section = sectionRef.current;
    const gradient = gradientRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;

    const ctx = gsap.context(() => {
      // Create a timeline for synchronized animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      // Animate gradient position
      tl.to(
        gradient,
        {
          y: "-50%",
          ease: "none",
        },
        0
      );

      // Animate heading color from black to white (starts at 40% progress)
      tl.to(
        heading,
        {
          color: "#ffffff",
          ease: "none",
        },
        0.4
      );

      // Animate subheading color from grey to light grey/white
      tl.to(
        subheading,
        {
          color: "rgba(255, 255, 255, 0.7)",
          ease: "none",
        },
        0.4
      );
    }, section);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Animated Gradient Background - 200% height, moves up on scroll */}
      <div
        ref={gradientRef}
        className="absolute left-0 w-full"
        style={{
          top: 0,
          height: "200%",
          background: isDark
            ? "linear-gradient(180deg, #1a1a1a 0%, #1a2a3a 20%, #2a4a6a 40%, #1a3050 60%, #0f1a25 80%, #0a0a0a 100%)"
            : "linear-gradient(180deg, #f8f8f8 0%, #e0ebf0 12%, #b0c8d8 25%, #7a9ab8 40%, #4a6a8a 55%, #2a4a6a 70%, #1a3050 85%, #0a0a0a 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between py-16 md:py-24">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 flex-1 flex items-center">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h2
              ref={headingRef}
              className="text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-serif leading-[1.1] tracking-[-0.02em] mb-4"
              style={{
                fontFamily: "'Times New Roman', 'Georgia', serif",
                color: "#1a1a1a",
              }}
            >
              Ready to make the leap?
            </h2>

            {/* Subheading */}
            <p
              ref={subheadingRef}
              className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-serif leading-[1.3] tracking-[-0.01em]"
              style={{
                fontFamily: "'Times New Roman', 'Georgia', serif",
                color: "rgba(26, 26, 26, 0.5)",
              }}
            >
              Share your vision, and we'll help shape it into something
              unforgettable.
            </p>
          </div>
        </div>

        {/* Our Approach Button */}
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <a
            href="/approach"
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: "rgba(30, 40, 50, 0.8)",
              color: "#ffffff",
            }}
          >
            Our Approach
          </a>
        </div>
      </div>
    </section>
  );
}
