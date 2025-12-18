"use client";
import React from "react";

export default function WorkHero({ theme = "light" }) {
  const isDark = theme === "dark";

  return (
    <section
      className="relative w-full min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #1a2a3a 0%, #151515 50%, #1a1a1a 100%)"
          : "linear-gradient(180deg, #d4e4ed 0%, #f5f0e8 40%, #f8f8f8 100%)",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="flex flex-col gap-2">
          {/* Main Heading */}
          <h1
            className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] tracking-[-0.02em]"
            style={{
              fontFamily: "'Times New Roman', 'Georgia', serif",
              color: isDark ? "#ffffff" : "#1a1a1a",
            }}
          >
            Our work
          </h1>

          {/* Subheading */}
          <h2
            className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] tracking-[-0.02em]"
            style={{
              fontFamily: "'Times New Roman', 'Georgia', serif",
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(26,26,26,0.5)",
            }}
          >
            From idea to exit
          </h2>
        </div>
      </div>
    </section>
  );
}
