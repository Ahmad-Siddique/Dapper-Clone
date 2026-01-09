"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIAgentDetailContent({ agent, theme = 'light' }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const useCasesRef = useRef([]);
  const useCasesTitleRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Animate title with split effect
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animate description with word-by-word reveal (AI-like typing effect)
      if (descriptionRef.current) {
        const words = descriptionRef.current.textContent.split(' ');
        descriptionRef.current.innerHTML = words.map((word, i) => 
          `<span class="word" style="opacity: 0;">${word} </span>`
        ).join('');

        const wordSpans = descriptionRef.current.querySelectorAll('.word');
        
        gsap.to(wordSpans, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animate use cases title
      if (useCasesTitleRef.current) {
        gsap.from(useCasesTitleRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: useCasesTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animate use case cards with stagger and scale
      useCasesRef.current.forEach((ref, index) => {
        if (ref) {
          gsap.from(ref, {
            opacity: 0,
            y: 40,
            scale: 0.9,
            rotationX: 15,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ref,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          // Hover animation
          const card = ref;
          const numberSpan = card.querySelector('.case-number');
          const textP = card.querySelector('.case-text');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.02,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
            if (numberSpan) {
              gsap.to(numberSpan, {
                scale: 1.2,
                rotation: 5,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            }
            if (textP) {
              gsap.to(textP, {
                x: 5,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            if (numberSpan) {
              gsap.to(numberSpan, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
            if (textP) {
              gsap.to(textP, {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });
        }
      });

      // Add subtle AI scanning line effect
      const scanLine = sectionRef.current.querySelector('.scan-line');
      if (scanLine) {
        gsap.to(scanLine, {
          y: '100%',
          duration: 2,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [theme, agent]);

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 md:py-32 lg:py-40 border-b overflow-hidden ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-0 w-72 h-72 rounded-full ${isDark ? 'bg-[#74F5A1]/3' : 'bg-[#3BC972]/3'} blur-3xl`} />
        <div className={`absolute bottom-1/4 right-0 w-96 h-96 rounded-full ${isDark ? 'bg-[#74F5A1]/2' : 'bg-[#3BC972]/2'} blur-3xl`} />
      </div>

      {/* AI Scanning line effect */}
      <div 
        className="scan-line absolute left-0 w-full h-px pointer-events-none z-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${isDark ? '#74F5A1' : '#3BC972'}, transparent)`,
          opacity: 0.3,
          top: 0,
        }}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Full Description */}
          <div className="mb-24">
            <h2 
              ref={titleRef}
              className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-12 ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
            >
              Overview
            </h2>
            <p 
              ref={descriptionRef}
              className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg md:text-xl leading-relaxed font-normal ${
                isDark ? 'text-[#f3f3f3]' : 'text-[#212121]'
              }`}
            >
              {agent.fullDescription}
            </p>
          </div>

          {/* Use Cases */}
          {agent.useCases && (
            <div className="mb-24">
              <h3 
                ref={useCasesTitleRef}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-10 ${
                  isDark ? 'text-white' : 'text-[#111111]'
                }`}
              >
                Use Cases
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agent.useCases.map((useCase, index) => (
                  <div 
                    key={index}
                    ref={(el) => (useCasesRef.current[index] = el)}
                    className={`p-8 md:p-10 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isDark 
                        ? 'bg-black/20 border-white/10 hover:border-[#74F5A1]/50 hover:bg-black/40' 
                        : 'bg-white border-black/10 hover:border-[#3BC972]/50 hover:bg-black/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span 
                        className={`case-number text-xs font-mono transition-transform duration-300 ${
                          isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'
                        }`}
                      >
                        [{String(index + 1).padStart(2, '0')}]
                      </span>
                      <p 
                        className={`case-text font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg md:text-xl font-semibold transition-transform duration-300 ${
                          isDark ? 'text-[#f3f3f3]' : 'text-[#111111]'
                        }`}
                      >
                        {useCase}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
