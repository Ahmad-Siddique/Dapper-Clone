"use client";
import React from "react";
import { GridAnimation } from "./GridAnimation";
import { MaskedReveal } from "../ui/MaskedRevel";

const INVESTORS = [
  {
    name: "Joe Lonsdale",
    title: "Lead Investor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop", 
  },
  {
    name: "Jake Medwell",
    title: "Lead Investor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop", 
  },
];

const Investors = () => {
  return (
    <section className="bg-white text-black overflow-hidden border-b border-gray-100">
      
      {/* HEADER SECTION (With Grid Background) */}
      <div className="relative pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-12 text-center">
          {/* Background Animation (Hero Style) - Only creates bg for this top part */}
          <GridAnimation className="opacity-50" />

          <div className="relative z-10 max-w-[1800px] mx-auto">
            {/* Label */}
            <div className="mb-8">
               <MaskedReveal>
                 <span className="text-gray-400 text-sm md:text-base font-medium tracking-wide font-mono uppercase">
                   Our Investors and Advisors
                 </span>
               </MaskedReveal>
            </div>

            {/* Title */}
            <div className="mb-12 md:mb-16">
              <MaskedReveal delay={0.1}>
                <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] font-['Figtree'] text-black">
                  Backed by decades <br className="hidden md:block" />
                  of logistics expertise
                </h2>
              </MaskedReveal>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <MaskedReveal delay={0.2}>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
                  Our founders, investors, and advisors are driven by the critical need to create an industry standard in the yard. They see us challenging conventions, solving problems that matter, and delivering products that revolutionize the way logistics works.
                </p>
              </MaskedReveal>
            </div>
          </div>
      </div>

      {/* INVESTORS GRID (White Background, No Animation) */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 pb-24 md:pb-32 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto border-t border-l border-gray-100">
          {INVESTORS.map((investor, index) => (
             <div 
               key={index}
               onMouseMove={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                 e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
               }}
               className="relative group border-r border-b border-gray-100 p-8 md:p-12 lg:p-16 flex flex-col items-center overflow-hidden bg-white/50 backdrop-blur-sm"
             >
                {/* Spotlight Glow */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(600px circle at var(--x) var(--y), rgba(251, 191, 36, 0.15), transparent 40%)"
                  }}
                />

                {/* Border Glow (Revealed by cursor) */}
                <div 
                  className="absolute inset-0 pointer-events-none border border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    maskImage: "radial-gradient(150px circle at var(--x) var(--y), black, transparent)",
                    WebkitMaskImage: "radial-gradient(150px circle at var(--x) var(--y), black, transparent)"
                  }}
                />

                {/* Corner Highlight (First Item Only) */}
                {index === 0 && (
                   <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-10">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D9F99D] to-transparent" />
                      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-[#D9F99D] to-transparent" />
                   </div>
                )}

                {/* Grid Crosshairs (Decoration) */}
                <div className="absolute -top-[5px] -left-[5px] w-[11px] h-[11px] text-gray-200 z-10">
                   <svg viewBox="0 0 10 10" className="w-full h-full"><path d="M5 0V10 M0 5H10" stroke="currentColor" strokeWidth="1"/></svg>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-square max-w-[400px] mb-8 overflow-hidden bg-gray-50 z-10 transition-transform duration-500 will-change-transform group-hover:scale-105">
                   <img 
                     src={investor.image} 
                     alt={investor.name} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   />
                </div>

                {/* Info */}
                <div className="text-center space-y-2 z-10">
                   <h3 className="text-2xl font-['Figtree'] font-semibold text-[#032219]">
                      {investor.name}
                   </h3>
                   <p className="text-gray-500 font-medium font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
                      {investor.title}
                   </p>
                </div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Investors;
