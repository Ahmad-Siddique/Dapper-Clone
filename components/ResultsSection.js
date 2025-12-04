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
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  const handlePrev = () => {
    if (!canPrev) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!canNext) return;
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="bg-[#EFEFEF] py-20 sm:py-24">
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        {/* Label above everything */}
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
          <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#111111]">
            Results
          </span>
        </div>

        {/* Heading left, copy/CTA right */}
        <div className="mb-10 grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] leading-[1.02] tracking-tight text-[#111111]">
              <span className="block text-[32px] sm:text-[40px] md:text-[56px] lg:text-[70px] xl:text-[82px] font-bold">
                Driven by a
              </span>
              <span className="block text-[32px] sm:text-[40px] md:text-[56px] lg:text-[70px] xl:text-[82px] font-bold">
                <span className="font-ivy-presto font-normal">performance</span>{' '}
                mindset
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6 lg:max-w-[600px]">
            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] sm:text-[17px] md:text-[21px] font-semibold leading-relaxed text-[#212121]">
              You don&apos;t just hire experts - you hire people with a drive to
              deliver results. The Dapper team thrives on impact. When you work
              with us, you&apos;ll work with a team as ambitious about growth as
              you are.
            </p>

            <Link
              href="/cases"
              className="group inline-flex items-center gap-2 self-start rounded-[10px] border border-black/10 bg-white px-4 py-2.5 font-[Helvetica Now Text,Arial,sans-serif] text-[13px] sm:text-[16px] font-semibold tracking-tight text-[#111111] shadow-sm transition-colors duration-500 ease-out hover:bg-[#F7F7F7]"
            >
              <span>Explore our cases</span>

              {/* Animated arrow square */}
              <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                {/* Default arrow */}
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

                {/* New arrow */}
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

        {/* Slider + nav */}
        <div className="relative mt-4 sm:mt-6">
          <div className="mb-4 flex justify-center gap-2 sm:justify-end">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              disabled={!canPrev}
              className={[
                'flex h-9 w-9 items-center justify-center rounded-[6px] text-white transition',
                canPrev
                  ? 'bg-[#111111] hover:bg-black cursor-pointer'
                  : 'bg-[#D3D3D3] cursor-not-allowed',
              ].join(' ')}
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
              disabled={!canNext}
              className={[
                'flex h-9 w-9 items-center justify-center rounded-[6px] text-white transition',
                canNext
                  ? 'bg-[#111111] hover:bg:black cursor-pointer'
                  : 'bg-[#D3D3D3] cursor-not-allowed',
              ].join(' ')}
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

          <div className="overflow-hidden">
            <div
              className="flex -mx-2 sm:-mx-3 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(100 / cardsPerView) * currentIndex}%)`,
              }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="basis-full px-2 flex-shrink-0 sm:px-3 lg:basis-1/2"
                >
                  <article className="relative flex h-full min-h-[280px] flex-col justify-between rounded-2xl border border-black/[0.06] bg-white px-4 py-7 shadow-[0_10px_30px_rgba(0,0,0,0.10)] sm:min-h-[360px] sm:px-6 sm:py-9 md:min-h-[420px] lg:px-10 lg:py-14">
                    <blockquote className="border-l-4 border-[#111111] pl-4 sm:pl-6 font-[Helvetica Now Text,Arial,sans-serif] text-[17px] sm:text-[20px] md:text-[24px] lg:text-[30px] leading-snug text-[#111111]">
                      “{testimonial.quote}”
                    </blockquote>

                    <div className="mt-7 flex items-center justify-between gap-4 sm:mt-9">
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 sm:h-14 sm:w-14">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[15px] font-bold text-[#111111] truncate">
                            {testimonial.author}
                          </p>
                          <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] font-medium text-[#444444] truncate">
                            {testimonial.role} – {testimonial.company}
                          </p>
                        </div>
                      </div>

                      <div className="relative h-7 w-20 flex-shrink-0 sm:h-8 sm:w-24">
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
