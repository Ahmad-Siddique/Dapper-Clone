// components/HeroSection.jsx
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scope animations and clean up automatically
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power3.out' },
      });

      // 1) Badge
      tl.from('.hero-badge', {
        y: 24,
        opacity: 0,
      })
        // 2) Title lines
        .from(
          '.hero-title-line',
          {
            y: 60,
            opacity: 0,
            skewY: 4,
            transformOrigin: 'top left',
            stagger: 0.06,
          },
          '-=0.3'
        )
        // 3) Description + CTA + right card
        .from(
          '.hero-body',
          {
            y: 32,
            opacity: 0,
            stagger: 0.08,
          },
          '-=0.2'
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#EFEFEF] pt-32 md:pt-40 pb-28"
    >
      {/* BACKGROUND LEAF IMAGE ON RIGHT */}
      <div className="pointer-events-none absolute inset-y-0 right-[-14%] w-[120%] sm:right-[-6%] sm:w-[70%] lg:right-[-2%] lg:w-[55%] xl:right-0 xl:w-[50%]">
        {/* <Image
          src="/hero-plant.png"
          alt="Decorative plant"
          fill
          priority
          className="object-contain object-right"
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 600px, (min-width: 768px) 480px, 320px"
        /> */}
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10">
        {/* Top text block: badge + full-width title */}
        <div className="max-w-[1400px]">
          {/* Badge */}
          <div className="hero-badge mb-10 flex items-center gap-3">
            <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
            <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#212121]">
              B2B marketing agency
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[0.92] tracking-[-0.03em] text-[#111111]">
            <span className="hero-title-line block text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px]">
              <span className="font-bold">We build </span>
              <span className="font-ivy-presto italic text-[0.94em] tracking-[0.03em]">
                high‑performing
              </span>
            </span>

            <span className="hero-title-line mt-2 block text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px] font-bold">
              marketing engines for
            </span>
            <span className="hero-title-line mt-2 block text-[46px] sm:text-[60px] md:text-[78px] lg:text-[92px] xl:text-[104px] font-bold">
              B2B brands
            </span>
          </h1>
        </div>

        {/* Row: left = subcopy + CTA, right = Storyteq card */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          {/* Left column: subcopy + CTA */}
          <div className="hero-body lg:flex-1 max-w-[640px]">
            <p className="mb-9 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold leading-relaxed text-[#212121]">
              We build, optimize and scale marketing engines that generate
              pipeline and improve marketing ROI.
            </p>

            {/* Main CTA with animated arrow */}
            <Link
              href="#discover"
              className="inline-flex items-center gap-3 group"
            >
              <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold tracking-tight text-[#111111]">
                Discover more
              </span>

              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
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
                      stroke="#212121"
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
                      stroke="#74F5A1"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </div>

          {/* Right column: Storyteq card flush to the right */}
          <div className="hero-body lg:flex-shrink-0 lg:ml-auto">
            <div className="w-[420px] max-w-full">
              <div className="flex overflow-hidden rounded-xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                {/* Text area */}
                <div className="flex flex-1 flex-col justify-between px-5 py-5 md:px-6 md:py-6">
                  <div>
                    <p className="mb-1 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A7A7A]">
                      Results
                    </p>
                    <h3 className="mb-3 pr-3 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[15px] md:text-[16px] font-bold leading-snug text-[#212121]">
                      54% increase in pipeline with demand generation strategy
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="relative h-4 w-28">
                      <Image
                        src="https://cdn.prod.website-files.com/67bd789ea8377ea95b1724ad/683979c61bb4c3a3f5a9f665_Storyteq_Logo_Light_Final.svg"
                        alt="Storyteq"
                        fill
                        className="object-contain object-left"
                        sizes="112px"
                      />
                    </div>

                    {/* Storyteq CTA with same arrow animation */}
                    <Link
                      href="#case-storyteq"
                      aria-label="Open Storyteq case study"
                      className="group flex h-9 w-9 items-center justify-center"
                    >
                      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
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
                              stroke="#212121"
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
                              stroke="#74F5A1"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right visual */}
                <div className="relative hidden sm:block w-[150px] lg:w-[170px]">
                  <Image
                    src="https://cdn.prod.website-files.com/67bd789ea8377ea95b1724ad/6863e1a7d3e379059672b955_3.avif"
                    alt="Campaign creative"
                    fill
                    className="object-cover"
                    sizes="170px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-20 h-px w-full border-b border-black/10" />
      </div>
    </section>
  );
}
