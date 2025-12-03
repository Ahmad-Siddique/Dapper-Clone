// components/ResultsSection.jsx
'use client';

import { useState } from 'react';
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
  
  // Calculate max index based on showing 2 cards at a time
  const maxIndex = Math.max(0, TESTIMONIALS.length - 2);

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
          <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg font-semibold text-[#111111]">
            Results
          </span>
        </div>

        {/* Heading left, copy/CTA/nav right */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: heading only */}
          <div>
            <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[1.02] tracking-tight text-[#111111]">
              <span className="block text-[44px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[96px] font-bold">
                Driven by a
              </span>
              <span className="block text-[44px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[96px] font-bold">
                <span className="italic font-normal">performance</span> mindset
              </span>
            </h2>
          </div>

          {/* Right: copy + CTA + nav */}
          <div className="flex flex-col gap-6 lg:max-w-[520px]">
            <p className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] sm:text-[18px] md:text-[19px] font-semibold leading-relaxed text-[#212121]">
              You don't just hire experts—you hire people with a drive to
              deliver results. The Dapper team thrives on impact. When you work
              with us, you'll work with a team as ambitious about growth as you
              are.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white px-5 py-3 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] sm:text-[15px] font-bold tracking-tight text-[#111111] shadow-sm transition-colors hover:bg-[#F7F7F7]"
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

              {/* Carousel navigation - now on the right side, more prominent */}
              <div className="flex gap-3 self-start sm:self-auto">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#111111] text-white transition-all hover:bg-[#222222] hover:scale-105 active:scale-95"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 1L4 7L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#111111] text-white transition-all hover:bg-[#222222] hover:scale-105 active:scale-95"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 1L10 7L3 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial cards with proper sliding */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 12}px))`,
            }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[calc(50%-12px)] flex-shrink-0"
              >
                <article className="relative flex h-full flex-col justify-between rounded-2xl border border-black/[0.06] bg-white px-10 py-14 shadow-[0_14px_40px_rgba(0,0,0,0.10)] min-h-[420px] md:min-h-[480px]">
                  {/* Quote with left border accent */}
                  <blockquote className="border-l-4 border-[#111111] pl-8 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium leading-snug text-[#111111]">
                    " {testimonial.quote} "
                  </blockquote>

                  {/* Author + company */}
                  <div className="mt-12 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] font-bold text-[#111111] truncate">
                          {testimonial.author}
                        </p>
                        <p className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] font-medium text-[#444444] truncate">
                          {testimonial.role} - {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Company logo */}
                    <div className="relative h-10 w-32 flex-shrink-0">
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
    </section>
  );
}
