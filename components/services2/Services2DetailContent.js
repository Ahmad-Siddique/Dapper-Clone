"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Services2DetailContent({ 
  title, 
  description, 
  image, 
  imageAlt = "Content image",
  theme = 'dark' 
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isDark = theme === 'dark';
  
  return (
    <section 
      ref={sectionRef}
      className={`relative py-16 md:py-20 lg:py-24 ${isDark ? 'bg-[#111111]' : 'bg-[#F5F5F5]'}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#111111]'}`}
            >
              {title}
            </h2>
            <div 
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[18px] leading-relaxed space-y-4 ${isDark ? 'text-[#b0b0b0]' : 'text-[#666666]'}`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Image */}
          {image && (
            <div ref={imageRef} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

