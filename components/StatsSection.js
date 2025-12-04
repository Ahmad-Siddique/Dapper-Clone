// components/StatsSection.jsx
'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const COMPANY_CARDS = [
  {
    id: 'cpp',
    logoSrc:
      'https://cdn.prod.website-files.com/67bd789ea8377ea95b1724ad/6839717b11fb3bf978dc6a90_Focus-on%20logo.avif',
    logoAlt: 'CPP',
    metrics: [
      { value: '200%', label: 'More inbound sales calls' },
      { value: '53%', label: 'More qualified pipeline' },
    ],
  },
  {
    id: 'bluebird',
    logoSrc:
      'https://cdn.prod.website-files.com/67bd789ea8377ea95b1724ad/6839717b11fb3bf978dc6a90_Focus-on%20logo.avif',
    logoAlt: 'Bluebird',
    metrics: [
      { value: '60+', label: 'Inbound Leads' },
      { value: '66%', label: 'Win rate' },
    ],
  },
  {
    id: 'focus-on',
    logoSrc:
      'https://cdn.prod.website-files.com/67bd789ea8377ea95b1724ad/6839717b11fb3bf978dc6a90_Focus-on%20logo.avif',
    logoAlt: 'FOCUS-ON',
    metrics: [
      { value: '12%', label: 'More Leads' },
      { value: '400%', label: 'High-intent Downloads' },
    ],
  },
  {
    id: 'reviewstudio',
    logoSrc:
      'https://cdn.prod.website-files.com/67bd789ea8377ea95b1724ad/6839717b11fb3bf978dc6a90_Focus-on%20logo.avif',
    logoAlt: 'reviewstudio',
    metrics: [
      { value: '350+', label: 'Signups in 4 months' },
      { value: '$70', label: 'Cost of a sign up' },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.stats-card', {
        scrollTrigger: {
          trigger: section,
          start: 'top 20%', // fire when section comes into viewport
          once: true,
        },
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.25,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector('[data-card]');
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24;

    track.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#EFEFEF] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        {/* TOP ROW: LEFT / RIGHT COLUMNS */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
          {/* Left: Results badge + main heading */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
              <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#212121]">
                Results
              </p>
            </div>

            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] text-[28px] sm:text-[34px] md:text-[42px] lg:text-[80px] font-bold leading-[1.05] tracking-tight text-[#111111]">
              100+ B2B companies trusted us to improve their{' '}
              <span className="font-ivy-presto italic font-normal">
                marketing
              </span>
            </h2>
          </div>

          {/* Right: description + Explore button */}
          <div className="max-w-[520px] lg:ml-auto lg:mt-10">
            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-semibold leading-relaxed text-[#212121]">
              More than 100 B2B companies worldwide trusted us to improve their
              marketing engine and marketing ROI.
            </p>

           <Link
              href="#cases"
              className="group mt-6 inline-flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-4 py-2 shadow-sm transition-colors duration-500 ease-out hover:bg-[#F7F7F7]"
            >
              <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] md:text-[18px] font-semibold tracking-tight text-[#212121]">
                Explore all results
              </span>

              {/* Arrow container */}
              <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                {/* Default arrow: slow fly-out to top-right + fade */}
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                  <svg
                    width="12"
                    height="12"
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

                {/* New arrow: slow fly-in from bottom-left + fade in */}
                <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg
                    width="12"
                    height="12"
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

        {/* SLIDER ROW */}
        <div className="mt-10 border-t border-black/10 pt-10">
          <div className="relative">
            {/* Slider buttons (desktop, floated on top-right) */}
            <div className="pointer-events-none absolute -top-12 right-0 hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollByCard('prev')}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#D3D3D3] text-white transition hover:bg-[#BBBBBB]"
                aria-label="Previous results"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M9.5 4L5.5 8L9.5 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollByCard('next')}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#111111] text-white transition hover:bg-black"
                aria-label="Next results"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M6.5 4L10.5 8L6.5 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Slider track */}
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {COMPANY_CARDS.map((card) => (
                <article
                  key={card.id}
                  data-card
                  className="stats-card snap-start shrink-0 w-[90vw] sm:w-[380px] md:w-[420px] lg:w-[520px] flex flex-col rounded-lg border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
                >
                  {/* Logo / name area */}
                  <div className="relative h-[140px] sm:h-[170px] md:h-[190px] lg:h-[220px] px-6 pt-6">
                    <div className="relative flex h-8 sm:h-9 md:h-10 w-auto items-center">
                      {card.logoSrc ? (
                        <Image
                          src={card.logoSrc}
                          alt={card.logoAlt}
                          fill
                          className="object-contain object-left"
                          sizes="300px"
                        />
                      ) : (
                        <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] font-bold text-[#111111]">
                          {card.logoAlt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom metrics – inset tiles */}
                  <div className="border-t border-black/[0.05] px-4 pb-4 pt-3">
                    <div className="flex gap-3">
                      {card.metrics.map((metric) => (
                        <div
                          key={metric.value + metric.label}
                          className="flex-1 rounded-md bg-[#F4F4F4] px-5 py-4"
                        >
                          <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[22px] sm:text-[26px] md:text-[28px] font-bold tracking-tight text-[#111111]">
                            {metric.value}
                          </p>
                          <p className="mt-1 max-w-[220px] font-[Helvetica Now Text,Arial,sans-serif] text-[13px] sm:text-[14px] md:text-[15px] font-semibold leading-snug text-[#444444]">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile / tablet slider buttons under track */}
            <div className="mt-4 flex justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => scrollByCard('prev')}
                className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#D3D3D3] text-white transition hover:bg-[#BBBBBB]"
                aria-label="Previous results"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M9.5 4L5.5 8L9.5 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByCard('next')}
                className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#111111] text-white transition hover:bg:black"
                aria-label="Next results"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M6.5 4L10.5 8L6.5 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
