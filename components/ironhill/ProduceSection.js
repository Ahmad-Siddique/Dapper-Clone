"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);


export default function ProduceSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const eggsCardRef = useRef(null);
  const beefCardRef = useRef(null);
  const honeyCardRef = useRef(null);
  const cursorRef = useRef(null);
  
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });


  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",        // Extended to 400% for 4 phases
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });


    const chars = textRef.current.querySelectorAll(".char");


    // PHASE 1: Eggs card slides in from RIGHT (0-25%)
    tl.fromTo(
      eggsCardRef.current,
      {
        x: 600,
        opacity: 0,
        rotation: 15,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        rotation: -5,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      },
      0
    )
    
    // PHASE 2: Text fades to gray (25-50%)
    .to(
      chars,
      {
        color: "#C5C5B8",
        duration: 1.5,
        stagger: 0.02,
        ease: "none"
      },
      1
    )
    
    // PHASE 3: Beef card slides in from LEFT (50-75%)
    .fromTo(
      beefCardRef.current,
      {
        x: -600,
        opacity: 0,
        rotation: -15,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        rotation: 5,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      },
      2.5
    )
    
    // PHASE 4: Honey card slides in from RIGHT (75-100%)
    .fromTo(
      honeyCardRef.current,
      {
        x: 600,
        opacity: 0,
        rotation: 15,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        rotation: -5,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      },
      4
    );


  }, { scope: containerRef });


  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };


    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);


    const titleText = textRef.current;
    const eggsCard = eggsCardRef.current;
    const beefCard = beefCardRef.current;
    const honeyCard = honeyCardRef.current;


    // Add listeners for title text
    if (titleText) {
      titleText.addEventListener('mouseenter', handleMouseEnter);
      titleText.addEventListener('mouseleave', handleMouseLeave);
      titleText.addEventListener('mousemove', handleMouseMove);
    }

    // Add listeners for eggs card
    if (eggsCard) {
      eggsCard.addEventListener('mouseenter', handleMouseEnter);
      eggsCard.addEventListener('mouseleave', handleMouseLeave);
      eggsCard.addEventListener('mousemove', handleMouseMove);
    }


    // Add listeners for beef card
    if (beefCard) {
      beefCard.addEventListener('mouseenter', handleMouseEnter);
      beefCard.addEventListener('mouseleave', handleMouseLeave);
      beefCard.addEventListener('mousemove', handleMouseMove);
    }

    // Add listeners for honey card
    if (honeyCard) {
      honeyCard.addEventListener('mouseenter', handleMouseEnter);
      honeyCard.addEventListener('mouseleave', handleMouseLeave);
      honeyCard.addEventListener('mousemove', handleMouseMove);
    }


    return () => {
      if (titleText) {
        titleText.removeEventListener('mouseenter', handleMouseEnter);
        titleText.removeEventListener('mouseleave', handleMouseLeave);
        titleText.removeEventListener('mousemove', handleMouseMove);
      }
      if (eggsCard) {
        eggsCard.removeEventListener('mouseenter', handleMouseEnter);
        eggsCard.removeEventListener('mouseleave', handleMouseLeave);
        eggsCard.removeEventListener('mousemove', handleMouseMove);
      }
      if (beefCard) {
        beefCard.removeEventListener('mouseenter', handleMouseEnter);
        beefCard.removeEventListener('mouseleave', handleMouseLeave);
        beefCard.removeEventListener('mousemove', handleMouseMove);
      }
      if (honeyCard) {
        honeyCard.removeEventListener('mouseenter', handleMouseEnter);
        honeyCard.removeEventListener('mouseleave', handleMouseLeave);
        honeyCard.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);


  const splitText = (str) => {
    return str.split("").map((char, index) => (
      <span key={index} className="char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };


  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#F4EDDD] flex items-center justify-center overflow-hidden"
    >
      {/* Custom Cursor - Explore Circle */}
      <div 
        ref={cursorRef}
        className="fixed w-20 h-20 bg-[#2C3E2E] text-[#F4EDDD] rounded-full flex items-center justify-center text-xs font-medium tracking-wider uppercase pointer-events-none z-50 transition-opacity duration-300"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: cursorVisible ? 1 : 0,
        }}
      >
        Explore
      </div>


      {/* Header Label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <p className="text-xs md:text-sm tracking-[0.3em] text-[#2C3E2E] uppercase font-medium">
          Ironhill Produce
        </p>
      </div>


      {/* Main Heading Text - GIGANTIC */}
      <div className="relative z-10 px-4 md:px-12 lg:px-20 w-full">
        <h1 
          ref={textRef}
          className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] 2xl:text-[13rem] font-ppwoodland text-[#2C3E2E] text-center leading-[0.95] tracking-tighter max-w-[95%] mx-auto cursor-none"
        >
          {splitText("SIMPLE WARES, BORN FROM HONEST WORK.")}
        </h1>
      </div>


      {/* Eggs Card - Comes from Right */}
      <div 
        ref={eggsCardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[550px] cursor-none z-20"
        style={{ opacity: 0 }}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#2C3E2E]">
          {/* Card Content */}
          <div className="p-12 md:p-16 text-center space-y-8">
            {/* Title */}
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-ppwoodland text-[#2C3E2E] tracking-tight">
              EGGS
            </h2>


            {/* Chicken Illustration */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400"
                alt="Chicken illustration"
                fill
                className="object-contain"
              />
            </div>


            {/* Description */}
            <p className="text-sm md:text-base text-[#2C3E2E] uppercase tracking-[0.2em] font-medium pt-4">
              Smooth, oval capsules<br />of yolky goodness.
            </p>
          </div>
        </div>
      </div>


      {/* Beef Card - Comes from Left */}
      <div 
        ref={beefCardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[550px] cursor-none z-20"
        style={{ opacity: 0 }}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#2C3E2E]">
          {/* Card Content */}
          <div className="p-12 md:p-16 text-center space-y-8">
            {/* Title */}
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-ppwoodland text-[#2C3E2E] tracking-tight">
              BEEF
            </h2>


            {/* Cow Illustration */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?auto=format&fit=crop&w=400"
                alt="Cow illustration"
                fill
                className="object-contain"
              />
            </div>


            {/* Description */}
            <p className="text-sm md:text-base text-[#2C3E2E] uppercase tracking-[0.2em] font-medium pt-4">
              100% grass-fed beef, great eating,<br />whichever way you cut it.
            </p>
          </div>
        </div>
      </div>


      {/* Honey Card - Comes from Right */}
      <div 
        ref={honeyCardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[550px] cursor-none z-20"
        style={{ opacity: 0 }}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#2C3E2E]">
          {/* Card Content */}
          <div className="p-12 md:p-16 text-center space-y-8">
            {/* Title */}
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-ppwoodland text-[#2C3E2E] tracking-tight">
              HONEY
            </h2>


            {/* Bee/Honey Illustration */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1587049352846-4a222e784587?auto=format&fit=crop&w=400"
                alt="Honey and bee illustration"
                fill
                className="object-contain"
              />
            </div>


            {/* Description */}
            <p className="text-sm md:text-base text-[#2C3E2E] uppercase tracking-[0.2em] font-medium pt-4">
              Nature's natural treat, sweeter than<br />your favourite granny.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
