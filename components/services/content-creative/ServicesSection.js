"use client";

import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    id: "design",
    title: "Design",
    description: "Beautiful, conversion-focused designs that elevate your brand.",
  },
  {
    id: "copywriting",
    title: "Copywriting",
    description: "Compelling copy that resonates with your target audience.",
  },
  {
    id: "videography",
    title: "Videography",
    description: "Engaging video content that tells your story effectively.",
  },
  {
    id: "motion-design",
    title: "Motion Design",
    description: "Dynamic animations that bring your brand to life.",
  },
  {
    id: "thought-leadership",
    title: "Thought Leadership",
    description: "Position your brand as an industry authority.",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description: "Boost your visibility and drive organic traffic.",
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const getGridColumns = (activeId) => {
  if (activeId === "design") return "1.15fr 0.85fr 0.85fr";
  if (activeId === "copywriting") return "0.85fr 1.15fr 0.85fr";
  if (activeId === "videography") return "0.85fr 0.85fr 1.15fr";
  if (activeId === "motion-design") return "1.15fr 0.85fr 0.85fr";
  if (activeId === "thought-leadership") return "0.85fr 1.15fr 0.85fr";
  if (activeId === "seo") return "0.85fr 0.85fr 1.15fr";
  return "repeat(3, 1fr)";
};

const getGridRows = (activeId) => {
  return "1fr 1fr";
};

export default function ContentCreativeServicesSection({ theme = "light" }) {
  const [activeId, setActiveId] = useState(null);
  const sectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const gridContainerRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [hasTriggeredAnimation, setHasTriggeredAnimation] = useState(false);

  const bgStyle =
    theme === "dark"
      ? {
          backgroundColor: "#2b2b2b",
          backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
          radial-gradient(ellipse at top left, rgba(60, 60, 60, 0.3), transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(50, 50, 50, 0.2), transparent 50%)
        `,
          backgroundBlendMode: "overlay, normal, normal",
        }
      : { backgroundColor: "#EFEFEF" };

  const noiseOverlayStyle = {
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.015) 2px, rgba(0, 0, 0, 0.015) 4px)
    `,
  };

  const triggerElectricalAnimation = useCallback(() => {
    const titleLines = document.querySelectorAll(".content-creative-title-line");

    const originalColor = theme === "dark" ? "#f3f3f3" : "#111111";
    const electricColor = theme === "dark" ? "#74F5A1" : "#3BC972";
    const brightElectricColor = theme === "dark" ? "#FFFFFF" : "#FFFFFF";

    const tl = gsap.timeline({
      defaults: {
        ease: "sine.inOut",
      },
    });

    titleLines.forEach((line, lineIndex) => {
      const text = line.textContent;

      if (!line.querySelector(".char")) {
        const chars = text
          .split("")
          .map(
            (char, i) =>
              `<span class="char" style="color: ${originalColor}; display: inline-block; position: relative;" data-index="${i}">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");
        line.innerHTML = chars;
      }

      const chars = line.querySelectorAll(".char");
      chars.forEach((char, charIndex) => {
        const baseDelay = lineIndex * 0.5 + charIndex * 0.06;
        const randomDelay = Math.random() * 0.1;
        const totalDelay = baseDelay + randomDelay;

        tl.to(
          char,
          {
            duration: 0.12,
            color: brightElectricColor,
            scale: 1.05,
            delay: totalDelay,
            ease: "power2.out",
          },
          0
        )
          .to(
            char,
            {
              duration: 0.18,
              color: electricColor,
              scale: 1.02,
              delay: totalDelay + 0.12,
              ease: "sine.inOut",
            },
            0
          )
          .to(
            char,
            {
              duration: 0.3,
              color: originalColor,
              scale: 1,
              delay: totalDelay + 0.3,
              ease: "power2.in",
            },
            0
          );
      });
    });
  }, [theme]);

  const startElectricalAnimation = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    setTimeout(() => {
      triggerElectricalAnimation();
    }, 800);

    animationIntervalRef.current = setInterval(() => {
      triggerElectricalAnimation();
    }, 10000);
  }, [triggerElectricalAnimation]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const titleContainer = titleContainerRef.current;

    if (!section || !titleContainer) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf(".content-creative-title-line");

      gsap.set(".content-creative-title-line", {
        opacity: 1,
        y: 0,
      });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleContainer,
          start: "top 60%",
          end: "top 30%",
          once: true,
          onEnter: () => {
            if (!hasTriggeredAnimation) {
              setHasTriggeredAnimation(true);
              hasAnimatedRef.current = true;
              setTimeout(() => {
                startElectricalAnimation();
              }, 1000);
            }
          },
          markers: false,
        },
      });

      revealTl.fromTo(
        ".content-creative-title-line",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      cardTl.fromTo(
        ".content-creative-service-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }, section);

    return () => ctx.revert();
  }, [theme, startElectricalAnimation, hasTriggeredAnimation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimatedRef.current) {
        triggerElectricalAnimation();
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [triggerElectricalAnimation]);

  useEffect(() => {
    const chars = document.querySelectorAll(".content-creative-title-line .char");
    if (chars.length > 0) {
      const newColor = theme === "dark" ? "#f3f3f3" : "#111111";
      chars.forEach((char) => {
        gsap.set(char, { color: newColor });
      });
    }
  }, [theme]);

  return (
    <>
      <style jsx global>{`
        /* Hardware acceleration for smooth transitions */
        .content-creative-services-grid {
          transition: grid-template-columns 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                      grid-template-rows 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: grid-template-columns, grid-template-rows;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .content-creative-service-card {
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform, opacity, box-shadow;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Prevent text shifting */
        .content-creative-service-card h3,
        .content-creative-service-card p {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Electrical animation */
        .content-creative-title-line .char {
          transition: color 0.15s ease, transform 0.15s ease;
          will-change: color, transform;
        }

        .text-transition {
          transition: color 0.5s ease;
        }

        .bg-transition {
          transition: background-color 0.5s ease, border-color 0.5s ease;
        }

        .border-transition {
          transition: border-color 0.5s ease;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden pt-32 pb-32 md:pt-40 md:pb-40 bg-transition"
        style={bgStyle}
      >
        {theme === "dark" && (
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={noiseOverlayStyle}
          />
        )}

        <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-8">
          {/* TOP ROW */}
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] mb-20">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
              <span
                className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-transition ${
                  theme === "dark" ? "text-[#f3f3f3]" : "text-[#212121]"
                }`}
              >
                Our services
              </span>
            </div>

            <div className="max-w-[1100px]" ref={titleContainerRef}>
              <h2 className="font-[Helvetica_Now_Text,Arial,sans-serif] leading-[1.02] tracking-tight">
                <div
                  className={`content-creative-title-line text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-semibold text-transition ${
                    theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                  }`}
                >
                  Your one-stop-shop
                </div>
                <div
                  className={`content-creative-title-line text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-semibold text-transition ${
                    theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                  }`}
                >
                  for B2B content
                </div>
              </h2>

              <p
                className={`mt-8 max-w-[640px] font-[Helvetica_Now_Text,Arial,sans-serif] text-[17px] md:text-[19px] lg:text-[22px] font-regular leading-relaxed text-transition ${
                  theme === "dark" ? "text-[#d0d0d0]" : "text-[#212121]"
                }`}
              >
                From SEO to LinkedIn Thoughtleadership, and everything in between.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`h-px w-full border-transition mb-20 ${
              theme === "dark"
                ? "border-b border-white/10"
                : "border-b border-black/10"
            }`}
          />

          {/* MAIN ROW */}
          <div className="flex flex-col items-stretch gap-8 lg:flex-row">
            {/* LEFT image */}
            <div className="relative w-full overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.16)] lg:w-[28%]">
              <div className="relative h-[520px] sm:h-[560px] lg:h-[600px]">
                <Image
                  src="https://cdn.prod.website-files.com/67b320fe114d5e148783d276/68947cf33c69a1ceddbdf83d_Dapper%20Flash%20Photos-04.avif"
                  alt="Dapper team"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 320px, 100vw"
                />
              </div>
              <span className="pointer-events-none absolute left-5 top-5 h-10 w-6 bg-[#74F5A1]" />
              <span className="pointer-events-none absolute left-16 top-24 h-8 w-5 bg-[#74F5A1]" />
            </div>

            {/* RIGHT cards with dynamic grid */}
            <div className="w-full flex-1">
              <div
                ref={gridContainerRef}
                className="content-creative-services-grid grid h-full gap-3"
                style={{
                  gridTemplateColumns: getGridColumns(activeId),
                  gridTemplateRows: getGridRows(activeId),
                }}
              >
                {SERVICES.map((service, index) => {
                  const isActive = activeId === service.id;

                  return (
                    <article
                      key={service.id}
                      onMouseEnter={() => setActiveId(service.id)}
                      onMouseLeave={() => setActiveId(null)}
                      className={`
                        content-creative-service-card
                        group relative flex flex-col justify-between rounded-xl 
                        border px-8 py-7
                        ${
                          theme === "dark"
                            ? "bg-[#2a2a2a] border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
                            : "bg-white border-black/[0.06] shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
                        }
                        ${index < 3 ? "row-start-1" : "row-start-2"}
                        ${index === 0 || index === 3 ? "col-start-1" : ""}
                        ${index === 1 || index === 4 ? "col-start-2" : ""}
                        ${index === 2 || index === 5 ? "col-start-3" : ""}
                      `}
                    >
                      <h3
                        className={`font-[Helvetica_Now_Text,Arial,sans-serif] text-[20px] sm:text-[22px] md:text-[32px] font-semibold tracking-tight text-transition ${
                          theme === "dark" ? "text-[#f3f3f3]" : "text-[#111111]"
                        }`}
                      >
                        {service.title}
                      </h3>

                      <div className="mt-4 flex items-end justify-between gap-4">
                        <p
                          className={`max-w-[360px] font-[Helvetica_Now_Text,Arial,sans-serif] text-[14px] sm:text-[15px] font-semibold leading-snug transition-all duration-500 ease-out text-transition ${
                            theme === "dark" ? "text-[#aaaaaa]" : "text-[#444444]"
                          } ${
                            isActive
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-1"
                          }`}
                        >
                          {service.description}
                        </p>

                        <Link
                          href="#"
                          aria-label={`Learn more about ${service.title}`}
                          className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center"
                        >
                          <span
                            className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] text-[#212121] transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-[1px] ${
                              theme === "dark"
                                ? "group-hover:bg-white"
                                : "group-hover:bg-black"
                            }`}
                          >
                            {/* Default arrow */}
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>

                            {/* New arrow */}
                            <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke={theme === "dark" ? "#111111" : "#74F5A1"}
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
