"use client";
import React from "react";
import { MaskedReveal } from "../ui/MaskedRevel";

const LEADERS = [
  {
    name: "Darin Brannan",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop", // Male, glasses, professional
  },
  {
    name: "Chris Brumett",
    title: "Chief Product Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop", // Male, smiling, professional
  },
  {
    name: "Kris Evans",
    title: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop", // Male, beard, professional
  },
];

const Leaders = () => {
  return (
    <section className="bg-white text-black py-32 md:py-48 px-6 md:px-12 border-b border-gray-100">
      <div className="max-w-[1800px] mx-auto text-center">
        
        {/* Label */}
        <div className="mb-8">
           <MaskedReveal>
             <span className="text-gray-400 text-sm md:text-base font-medium tracking-wide font-mono uppercase">
               Our Leaders
             </span>
           </MaskedReveal>
        </div>

        {/* Title */}
        <div className="mb-16 md:mb-24">
          <MaskedReveal delay={0.1}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] font-['Figtree'] text-black">
              Powered by <br className="hidden md:block" />
              innovators in tech <br className="hidden md:block" />
              & experts in logistics
            </h2>
          </MaskedReveal>
        </div>

        {/* Subtitles */}
        <div className="max-w-2xl mx-auto space-y-12 mb-32">
          <MaskedReveal delay={0.2}>
            <p className="text-md md:text-xl text-gray-600 leading-relaxed font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
              Terminal leaders drive towards a combined mission with extreme ownership, smart execution, and passionate innovation.
            </p>
          </MaskedReveal>

          <MaskedReveal delay={0.3}>
            <p className="text-md md:text-xl text-gray-600  font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
              Meet the strategic problem solvers at the helm:
            </p>
          </MaskedReveal>
        </div>

        {/* LEADERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-100">
          {LEADERS.map((leader, index) => (
             <div 
               key={index}
               onMouseMove={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                 e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
               }}
               className="relative group border-r border-b border-gray-100 p-8 md:p-12 lg:p-16 flex flex-col items-center overflow-hidden"
             >
                {/* Spotlight Glow */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(600px circle at var(--x) var(--y), rgba(251, 191, 36, 0.15), transparent 40%)"
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
                <div className="relative w-full aspect-square mb-8 overflow-hidden bg-gray-50 z-10 transition-transform duration-500 will-change-transform group-hover:scale-105">
                   <img 
                     src={leader.image} 
                     alt={leader.name} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   />
                </div>

                {/* Info */}
                <div className="text-center space-y-2 z-10">
                   <h3 className="text-2xl font-['Figtree'] font-semibold text-[#032219]">
                      {leader.name}
                   </h3>
                   <p className="text-gray-500 font-medium font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
                      {leader.title}
                   </p>
                </div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Leaders;
