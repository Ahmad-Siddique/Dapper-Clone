"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);


const text = "Meet the keepers of our crafts, the ones from whom our goods are born.";


export default function TextRevealSection2() {
  const containerRef = useRef(null);
  const textRef = useRef(null);


  useGSAP(() => {
    const chars = textRef.current.querySelectorAll(".char");
    
    gsap.fromTo(
      chars,
      { color: "#D1D5DB" },
      {
        color: "#1c1c1c",
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


  const splitText = (str) => {
    return str.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
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
      </div>
    </div>
  );
}
