// components/ResultsSection.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Since we started with Dapper we finally have prospects reaching out to us, instead of relying on outbound.',
    author: 'George Borst',
    role: 'Business Development Lead',
    company: 'FOCUS-ON',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    quote:
      'Dapper constantly improves results in a proactive and very structured way; this makes the company stand out.',
    author: 'Sammie Perkins',
    role: 'Director Marketing EMEA',
    company: 'Ultimaker',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    quote:
      'Working with Dapper has transformed our approach to demand generation. The results speak for themselves.',
    author: 'Jane Smith',
    role: 'VP Marketing',
    company: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: 4,
    quote:
      'The strategic approach and execution from Dapper have exceeded our expectations in every way possible.',
    author: 'Michael Chen',
    role: 'Head of Growth',
    company: 'CloudScale',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 5,
    quote:
      'Our pipeline has never been stronger. Dapper understands B2B marketing at a level few agencies do.',
    author: 'Sarah Williams',
    role: 'CMO',
    company: 'DataFlow',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
];

export default function ResultsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Responsive: 1 card on small screens, 2 on lg+
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#EFEFEF] py-24">
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        {/* Label above everything */}
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
          <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#111111]">
            Results
          </span>
        </div>

        {/* Heading left, copy/CTA right */}
        <div className="mb-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: heading only */}
          <div>
            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] leading-[1.02] tracking-tight text-[#111111]">
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                Driven by a
              </span>
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                <span className="font-ivy-presto font-normal">performance</span> mindset
              </span>
            </h2>
          </div>

          {/* Right: copy + CTA */}
          <div className="flex flex-col gap-6 lg:max-w-[600px]">
            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[17px] sm:text-[18px] md:text-[23px] font-semibold leading-relaxed text-[#212121]">
              You don&apos;t just hire experts - you hire people with a drive to
              deliver results. The Dapper team thrives on impact. When you work
              with us, you&apos;ll work with a team as ambitious about growth as
              you are.
            </p>

            <Link
              href="/cases"
              className="inline-flex items-center gap-2 self-start rounded-[10px] border border-black/10 bg-white px-5 py-3 font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[18px] font-semibold tracking-tight text-[#111111] shadow-sm transition-colors hover:bg-[#F7F7F7]"
            >
              <span>Explore our cases</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#74F5A1]">
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
            </Link>
          </div>
        </div>

        {/* Slider + nav (nav near slider on the right) */}
        <div className="relative mt-6">
          {/* Nav on the right, above slider on sm+ */}
          <div className="mb-4 flex justify-end gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#D3D3D3] text-white transition hover:bg-[#BBBBBB]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-[#111111] text-white transition hover:bg-black"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Testimonial cards */}
          <div className="overflow-hidden">
            <div
              className="flex -mx-3 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(100 / cardsPerView) * currentIndex}%)`,
              }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="basis-full px-3 flex-shrink-0 lg:basis-1/2"
                >
                  <article className="relative flex h-full min-h-[380px] flex-col justify-between rounded-2xl border border-black/[0.06] bg-white px-6 py-10 shadow-[0_14px_40px_rgba(0,0,0,0.10)] sm:px-8 sm:py-12 md:min-h-[440px] lg:px-10 lg:py-14">
                    {/* Quote */}
                    <blockquote className="border-l-4 border-[#111111] pl-5 sm:pl-7 font-[Helvetica Now Text,Arial,sans-serif] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[35px] font-regular leading-snug text-[#111111]">
                      “{testimonial.quote}”
                    </blockquote>

                    {/* Author + company */}
                    <div className="mt-10 flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 sm:h-16 sm:w-16">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] sm:text-[16px] font-bold text-[#111111] truncate">
                            {testimonial.author}
                          </p>
                          <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] sm:text-[14px] font-medium text-[#444444] truncate">
                            {testimonial.role} – {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Company logo */}
                      <div className="relative h-8 w-24 flex-shrink-0 sm:h-10 sm:w-32">
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.company} logo`}
                          fill
                          className="object-contain object-right"
                        />
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
