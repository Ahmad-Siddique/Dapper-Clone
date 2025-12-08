// components/StatsSection.jsx
'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
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
  const animationRef = useRef(null);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    currentScroll: 0,
    targetScroll: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    isButtonScrolling: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.stats-card', {
        scrollTrigger: {
          trigger: section,
          start: 'top 20%',
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

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;

    setCanScrollPrev(left > 4);
    setCanScrollNext(left < maxScroll - 4);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    const handle = () => updateScrollState();

    track.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);

    return () => {
      track.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (!track) return;

    const card = track.querySelector('[data-card]');
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24;
    const scrollAmount = direction === 'next' ? cardWidth + gap : -(cardWidth + gap);

    state.isButtonScrolling = true;
    track.style.scrollSnapType = 'none';

    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      track.style.scrollSnapType = 'x mandatory';
      state.isButtonScrolling = false;
      state.targetScroll = track.scrollLeft;
      state.currentScroll = track.scrollLeft;
      updateScrollState();
    }, 500);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const state = dragState.current;

    const smoothScroll = () => {
      if (!state.isButtonScrolling) {
        if (!state.isDown) {
          if (Math.abs(state.velocity) > 0.1) {
            state.targetScroll += state.velocity;
            state.velocity *= 0.95;
          }
        }

        const ease = 0.1;
        state.currentScroll += (state.targetScroll - state.currentScroll) * ease;

        if (state.isDown || Math.abs(state.velocity) > 0.1) {
          track.scrollLeft = state.currentScroll;
        }

        const maxScroll = track.scrollWidth - track.clientWidth;
        if (state.currentScroll < 0) {
          state.currentScroll = 0;
          state.targetScroll = 0;
          state.velocity = 0;
        } else if (state.currentScroll > maxScroll) {
          state.currentScroll = maxScroll;
          state.targetScroll = maxScroll;
          state.velocity = 0;
        }
      }

      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    animationRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const state = dragState.current;

    const onMouseDown = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }

      state.isDown = true;
      state.isButtonScrolling = false;
      state.startX = e.pageX;
      state.currentScroll = track.scrollLeft;
      state.targetScroll = track.scrollLeft;
      state.lastX = e.pageX;
      state.lastTime = Date.now();
      state.velocity = 0;

      track.classList.add('dragging');
      track.style.scrollSnapType = 'none';
      track.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (!state.isDown) return;
      e.preventDefault();

      const currentTime = Date.now();
      const deltaX = e.pageX - state.startX;
      const timeDelta = currentTime - state.lastTime;

      state.targetScroll = state.currentScroll - deltaX;

      if (timeDelta > 0) {
        const moveX = e.pageX - state.lastX;
        state.velocity = (moveX / timeDelta) * -16;
      }

      state.lastX = e.pageX;
      state.lastTime = currentTime;
    };

    const onMouseUp = () => {
      if (state.isDown) {
        state.isDown = false;
        track.classList.remove('dragging');
        track.style.cursor = 'grab';
        
        setTimeout(() => {
          if (!state.isButtonScrolling) {
            track.style.scrollSnapType = 'x mandatory';
            updateScrollState();
          }
        }, 500);
      }
    };

    const onMouseLeave = () => {
      if (state.isDown) {
        onMouseUp();
      }
    };

    track.addEventListener('mousedown', onMouseDown);
    track.addEventListener('mousemove', onMouseMove);
    track.addEventListener('mouseup', onMouseUp);
    track.addEventListener('mouseleave', onMouseLeave);

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      track.removeEventListener('mousemove', onMouseMove);
      track.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#EFEFEF] py-18 sm:py-22 md:py-24"
    >
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        {/* TOP ROW */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] mb-40">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
              <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#212121]">
                Results
              </p>
            </div>

            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] text-[28px] sm:text-[34px] md:text-[42px] lg:text-[80px] font-semibold leading-[1.05] tracking-tight text-[#111111]">
              100+ B2B companies trusted us to improve their{' '}
              <span className="font-ivy-presto italic font-normal">
                marketing
              </span>
            </h2>
          </div>

          <div className="max-w-[520px] lg:ml-auto lg:mt-10">
            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-semibold leading-relaxed text-[#212121]">
              More than 100 B2B Companies worldwide trusted us to improve their
              marketing engine and marketing ROI.
            </p>

            <Link
              href="#cases"
              className="group mt-6 inline-flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-4 py-2 shadow-sm transition-transform duration-300 ease-out hover:scale-[1.10] hover:-translate-y-[1px]"
            >
              <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] md:text-[18px] font-semibold tracking-tight text-[#212121]">
                Explore all results
              </span>

              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-colors duration-500 group-hover:bg-black">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
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

                <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
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
        <div className="mt-14 pt-2">
          <div className="relative">
            {/* Desktop slider buttons */}
            <div className="absolute -top-12 right-0 hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollByCard('prev')}
                disabled={!canScrollPrev}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-[6px] text-white transition',
                  canScrollPrev
                    ? 'bg-[#111111] hover:bg-black cursor-pointer'
                    : 'bg-[#D3D3D3] cursor-not-allowed',
                ].join(' ')}
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
                disabled={!canScrollNext}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-[6px] text-white transition',
                  canScrollNext
                    ? 'bg-[#111111] hover:bg-black cursor-pointer'
                    : 'bg-[#D3D3D3] cursor-not-allowed',
                ].join(' ')}
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

            {/* Track with smooth drag-to-scroll */}
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto pb-4 cursor-grab snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {COMPANY_CARDS.map((card) => {
                const isHovered = hoveredCardId === card.id;

                return (
                  <article
                    key={card.id}
                    data-card
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className="stats-card snap-start shrink-0 w-[90vw] sm:w-[380px] md:w-[420px] lg:w-[520px] flex flex-col rounded-lg border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] select-none transition-shadow duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
                  >
                    {/* Logo section */}
                    <div className="relative h-[140px] sm:h-[170px] md:h-[190px] lg:h-[220px] px-6 pt-6">
                      <div className="relative flex h-8 sm:h-9 md:h-10 w-auto items-center">
                        {card.logoSrc ? (
                          <Image
                            src={card.logoSrc}
                            alt={card.logoAlt}
                            fill
                            className="object-contain object-left pointer-events-none"
                            sizes="300px"
                          />
                        ) : (
                          <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] font-bold text-[#111111]">
                            {card.logoAlt}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metrics section with 3-column grid */}
                    <div className="border-t border-black/[0.05] px-4 pb-4 pt-3">
                      <div
                        className="grid gap-3 transition-all duration-500 ease-out"
                        style={{
                          gridTemplateColumns: isHovered ? '1fr 1fr auto' : '1fr 1fr 0fr',
                        }}
                      >
                        {/* Metric columns */}
                        {card.metrics.map((metric) => (
                          <div
                            key={metric.value + metric.label}
                            className="rounded-md bg-[#F4F4F4] px-5 py-4"
                          >
                            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[22px] sm:text-[26px] md:text-[28px] font-bold tracking-tight text-[#111111]">
                              {metric.value}
                            </p>
                            <p className="mt-1 max-w-[220px] font-[Helvetica Now Text,Arial,sans-serif] text-[13px] sm:text-[14px] md:text-[15px] font-semibold leading-snug text-[#444444]">
                              {metric.label}
                            </p>
                          </div>
                        ))}

                        {/* 3rd column: Full button (appears on hover) */}
                        <div
                          className="overflow-hidden transition-all duration-500 ease-out"
                          style={{
                            width: isHovered ? '90px' : '0px',
                            opacity: isHovered ? 1 : 0,
                          }}
                        >
                          <Link
                            href={`#case-${card.id}`}
                            aria-label={`View ${card.logoAlt} case study`}
                            className="group/arrow flex h-full w-full items-center justify-center rounded-md bg-[#74F5A1] transition-all duration-500 ease-out hover:bg-black hover:scale-105"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Default arrow */}
                            <span className="absolute flex items-center justify-center transition-all duration-500 ease-out group-hover/arrow:translate-x-2 group-hover/arrow:-translate-y-2 group-hover/arrow:opacity-0">
                              <svg
                                width="20"
                                height="20"
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
                            <span className="absolute flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0 group-hover/arrow:opacity-100">
                              <svg
                                width="20"
                                height="20"
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
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile / tablet buttons */}
            <div className="mt-4 flex justify-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => scrollByCard('prev')}
                disabled={!canScrollPrev}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-[6px] text-white transition',
                  canScrollPrev
                    ? 'bg-[#111111] hover:bg-black cursor-pointer'
                    : 'bg-[#D3D3D3] cursor-not-allowed',
                ].join(' ')}
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
                disabled={!canScrollNext}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-[6px] text-white transition',
                  canScrollNext
                    ? 'bg-[#111111] hover:bg-black cursor-pointer'
                    : 'bg-[#D3D3D3] cursor-not-allowed',
                ].join(' ')}
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
