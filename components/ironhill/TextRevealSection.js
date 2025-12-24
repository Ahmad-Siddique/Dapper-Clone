"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const text = "THERE'S A PLACE NOT FAR FROM HERE THE MAPS WON'T SHOW, KNOWN TO SOME AS THE IRONHILL.";
const subText = "Beyond the noise, behind the veil, reached by foot and feel.";

export default function TextRevealSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const chars = textRef.current.querySelectorAll(".char");
    
    gsap.fromTo(
      chars,
      { color: "#D1D5DB" }, // Initial color: Light Gray
      {
        color: "#1c1c1c", // Reveal color: Dark/Black
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  // Helper to split text into characters
  const splitText = (str) => {
    return str.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
        {/* Add a space after each word unless it's the last one */}
        {wordIndex < str.split(" ").length - 1 && <span className="char inline-block">&nbsp;</span>}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-[60vh] bg-[#F4EDDD] flex flex-col items-center justify-center px-4 md:px-20 py-[360px] font-ppwoodland"
    >
      <div ref={textRef} className="max-w-6xl text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-normal text-[#D1D5DB]">
          {splitText(text)}
        </h2>
        <p className="mt-8 text-[#1c1c1c] text-sm md:text-base tracking-wide opacity-80">
          {subText}
        </p>
      </div>
    </div>
  );
}
