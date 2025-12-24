"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";


export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);


  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };


    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  const maxTilt = 5;
  const rotateX = -mousePosition.y * maxTilt;
  const rotateY = mousePosition.x * maxTilt;


  // Reduced parallax for contained movement
  const parallaxX = mousePosition.x * 20;
  const parallaxY = mousePosition.y * 20;


  return (
    <div className="relative w-full h-screen overflow-hidden font-[family-name:var(--font-source-serif)]">
      {/* Jungle Background with Parallax - Increased scale to prevent white edges */}
      <div
        className="absolute inset-0 w-[130%] h-[130%] -left-[15%] -top-[15%] transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.15)`,
          backgroundImage: "url('/jungle-pic.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>


      {/* Cloud/Fog Effects - Multiple dense layers */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        {/* Dense cloud layers */}
        <div className="cloud-layer cloud-1"></div>
        <div className="cloud-layer cloud-2"></div>
        <div className="cloud-layer cloud-3"></div>
        <div className="cloud-layer cloud-4"></div>
        <div className="cloud-layer cloud-5"></div>
        <div className="cloud-layer cloud-6"></div>
        <div className="cloud-layer cloud-7"></div>
        <div className="cloud-layer cloud-8"></div>
        <div className="cloud-layer cloud-9"></div>
        <div className="cloud-layer cloud-10"></div>
        <div className="cloud-layer cloud-11"></div>
        <div className="cloud-layer cloud-12"></div>
      </div>


      {/* Grain/Noise Texture Overlay */}
      <div className="absolute inset-0 grain-texture opacity-20 pointer-events-none z-[6]"></div>


      {/* Menu Button */}
      <div className="absolute top-8 right-8 z-20">
        <button className="p-3 border border-[#EDC227] rounded-md text-[#EDC227] hover:bg-[#EDC227] hover:text-[#F9F4EA] transition-colors duration-300">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>


      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="text-center flex flex-col items-center">
          <p className="text-[#EDC227] tracking-[0.2em] text-sm md:text-base font-semibold mb-[-10px] md:mb-[-20px] uppercase drop-shadow-lg">
            Step onto the
          </p>
          
          <div
            ref={titleRef}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "transform 0.2s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
            }}
            className="cursor-default"
          >
            <h1 className="text-[#EDC227] text-[15vw] md:text-[12rem] leading-none font-normal tracking-tight scale-y-110 select-none drop-shadow-2xl">
              IRONHILL
            </h1>
          </div>
          
          <p className="text-[#EDC227] tracking-[0.2em] text-xs md:text-sm font-semibold mt-4 uppercase drop-shadow-lg">
            Known to some, found by few.
          </p>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-custom z-10">
        <span className="text-[#EDC227] text-xs tracking-widest uppercase">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-[#EDC227]"></div>
      </div>


      <style jsx>{`
        @keyframes bounce-custom {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }


        @keyframes cloud-drift-1 {
          0% {
            transform: translateX(100%) translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(-100%) translateY(-30px) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes cloud-drift-2 {
          0% {
            transform: translateX(100%) translateY(10px) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.65;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-100%) translateY(-20px) scale(1);
            opacity: 0;
          }
        }


        .animate-bounce-custom {
          animation: bounce-custom 2s ease-in-out infinite;
        }


        .cloud-layer {
          position: absolute;
          width: 150%;
          height: 100%;
          left: -25%;
          background: radial-gradient(
            ellipse 800px 300px at center,
            rgba(220, 220, 220, 0.5) 0%,
            rgba(200, 200, 200, 0.4) 20%,
            rgba(180, 180, 180, 0.3) 40%,
            rgba(160, 160, 160, 0.15) 60%,
            transparent 80%
          );
          filter: blur(40px);
        }


        .cloud-1 {
          top: 5%;
          animation: cloud-drift-1 35s linear infinite;
          animation-delay: 0s;
          filter: blur(45px);
        }


        .cloud-2 {
          top: 10%;
          animation: cloud-drift-2 42s linear infinite;
          animation-delay: -7s;
          filter: blur(50px);
        }


        .cloud-3 {
          top: 15%;
          animation: cloud-drift-1 38s linear infinite;
          animation-delay: -14s;
          filter: blur(42px);
        }

        .cloud-4 {
          top: 22%;
          animation: cloud-drift-2 45s linear infinite;
          animation-delay: -21s;
          filter: blur(48px);
        }


        .cloud-5 {
          top: 28%;
          animation: cloud-drift-1 40s linear infinite;
          animation-delay: -28s;
          filter: blur(46px);
        }


        .cloud-6 {
          top: 35%;
          animation: cloud-drift-2 36s linear infinite;
          animation-delay: -35s;
          filter: blur(44px);
        }

        .cloud-7 {
          top: 42%;
          animation: cloud-drift-1 43s linear infinite;
          animation-delay: -10s;
          filter: blur(47px);
        }

        .cloud-8 {
          top: 48%;
          animation: cloud-drift-2 48s linear infinite;
          animation-delay: -24s;
          filter: blur(49px);
        }

        .cloud-9 {
          top: 55%;
          animation: cloud-drift-1 37s linear infinite;
          animation-delay: -31s;
          filter: blur(43px);
        }

        .cloud-10 {
          top: 62%;
          animation: cloud-drift-2 41s linear infinite;
          animation-delay: -38s;
          filter: blur(46px);
        }

        .cloud-11 {
          top: 70%;
          animation: cloud-drift-1 39s linear infinite;
          animation-delay: -17s;
          filter: blur(45px);
        }

        .cloud-12 {
          top: 78%;
          animation: cloud-drift-2 44s linear infinite;
          animation-delay: -42s;
          filter: blur(48px);
        }


        .grain-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
