"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const MaskedReveal = ({ children, className, delay = 0, threshold = 0.2 }) => {
  const container = useRef(null);
  const body = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        body.current,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out", // The signature "luxury" ease
          delay: delay,
          scrollTrigger: {
            trigger: container.current,
            start: `top ${100 - threshold * 100}%`, // Trigger when element is slightly visible
          },
        }
      );
    }, container);
    return () => ctx.revert();
  }, [delay, threshold]);

  return (
    <div ref={container} className={`overflow-hidden ${className}`}>
      <div ref={body} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};