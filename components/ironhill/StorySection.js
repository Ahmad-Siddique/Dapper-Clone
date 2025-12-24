"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);


const headerText = "HERE, MY FRIENDS, IS WHERE RACING MINDS TURN TO CLEAR THOUGHTS, A SPACE OF NATURE'S DOING - WHERE THE FRUITS OF YOUR LABOUR CAN BE PLUCKED FROM THE VINE.";


export default function StorySection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const imagesRef = useRef([]);


  useGSAP(() => {
    // Master Timeline with Pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    });


    // 1. Text Reveal (Linked to scroll)
    const chars = headerRef.current.querySelectorAll(".char");
    tl.fromTo(
      chars,
      { color: "#D1D5DB" }, 
      {
        color: "#1c1c1c",
        duration: 1,
        stagger: 0.05,
      }
    );


    // 2. Images Animation
    const images = imagesRef.current;
    
    // Image 1 (Left) - Come up high
    tl.to(images[0], { y: "0%", duration: 1.5, ease: "power2.out" }, "-=0.3");
    
    // Image 2 (Right) - Come up high
    tl.to(images[1], { y: "0%", duration: 1.5, ease: "power2.out" }, "-=1.2");

    // Image 3 (Center) - Come up but stay lower
    tl.to(images[2], { y: "0%", duration: 1.5, ease: "power2.out" }, "-=0.8"); 

  }, { scope: containerRef });


  // Helper to split text
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
    <div ref={containerRef} className="relative w-full h-screen bg-[#F4EDDD] font-ppwoodland flex flex-col overflow-hidden">
      
      {/* 1. Header Section - Compact */}
      <div className="flex-none pt-20 pb-10 px-4 md:px-20 flex justify-center z-10">
        <h2 ref={headerRef} className="max-w-6xl text-center text-2xl md:text-4xl lg:text-5xl leading-tight font-normal text-[#D1D5DB] uppercase">
          {splitText(headerText)}
        </h2>
      </div>


      {/* 2. Gallery & Text Section - Fills remaining height */}
      <div className="flex-grow w-full flex flex-col md:flex-row px-4 md:px-20 pb-10 overflow-hidden relative">
        
        {/* Left Column: Images Area */}
        <div className="w-full md:w-1/2 h-full relative">
            
            {/* Image 1: Left (High position) */}
            <div 
                ref={el => imagesRef.current[0] = el} 
                className="absolute left-0 md:left-10 bottom-32 md:bottom-48 w-[180px] h-[180px] md:w-[220px] md:h-[220px] translate-y-[200%]"
            >
                <Image 
                    src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600" 
                    alt="Vineyard detailed shot" 
                    fill 
                    className="object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-500" 
                />
            </div>


            {/* Image 2: Right (High position) */}
            <div 
                ref={el => imagesRef.current[1] = el} 
                className="absolute right-0 md:right-10 bottom-40 md:bottom-60 w-[180px] h-[180px] md:w-[220px] md:h-[220px] translate-y-[200%]"
            >
                <Image 
                    src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600" 
                    alt="Mystical forest background" 
                    fill 
                    className="object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>


            {/* Image 3: Center (Lower position) */}
            <div 
                ref={el => imagesRef.current[2] = el} 
                className="absolute left-1/2 -translate-x-1/2 bottom-0 md:bottom-10 w-[220px] h-[220px] md:w-[280px] md:h-[280px] translate-y-[200%] z-20 shadow-xl"
            >
                <Image 
                    src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600" 
                    alt="Nature details" 
                    fill 
                    className="object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>
        </div>


        {/* Right Column: Text */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4 md:p-10">
            <div className="max-w-md text-[#1c1c1c] space-y-6 text-sm md:text-base leading-relaxed">
                <p>
                    But while this place is silent and still, on the Ironhill you are never alone. For it is home to others, seldom seen but always there.
                </p>
                <p>
                    Creatures of myth and lore, they are the keepers of our crafts, the ones from whom our goods are born. And over them all stands just one, tall and heavy-set. He is the shape that shifts between the trees, the warden of this wildness.
                </p>
                <p>
                    So shake off the grip of your daily grind and come watch the mist sit low, heat your hands by the embers' warm, and step onto the Ironhill.
                </p>
            </div>
        </div>

      </div>

    </div>
  );
}
