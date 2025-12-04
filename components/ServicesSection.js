// components/ServicesSection.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

const SERVICES = [
  {
    id: 'content',
    title: 'Content & Creative',
    description: "We’ll make your prospects stop scrolling.",
  },
  {
    id: 'paid',
    title: 'Paid Media & Performance',
    description: 'Build, optimize and scale your performance marketing.',
  },
  {
    id: 'data',
    title: 'Data & Measurement',
    description: 'We make the invisible visible.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#EFEFEF] pt-24 pb-24">
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        {/* TOP ROW: left label, right heading+paragraph */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]">
          {/* LEFT: Our services badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
            <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#212121]">
              Our services
            </span>
          </div>

          {/* RIGHT: heading + copy */}
          <div className="max-w-[1100px]">
            <h2 className="font-[Helvetica Now Text,Arial,sans-serif] leading-[1.02] tracking-tight text-[#111111]">
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                Level up your marketing,
              </span>
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                improve{' '}
                <span className="font-ivy-presto italic font-normal">
                  marketing ROI
                </span>
              </span>
            </h2>

            <p className="mt-6 max-w-[640px] font-[Helvetica Now Text,Arial,sans-serif] text-[17px] md:text-[18px] lg:text-[19px] font-semibold leading-relaxed text-[#212121]">
              Better marketing leads to better marketing ROI. At Dapper, we help
              you level up your complete marketing engine. From strategy to
              content, advertising, and measurement.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full border-b border-black/10" />

        {/* SECOND ROW: more portrait image left, cards right */}
        <div className="mt-10 flex flex-col items-stretch gap-8 lg:flex-row">
          {/* LEFT: more portrait image card */}
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

          {/* RIGHT: cards column filling image height */}
          <div className="w-full flex-1">
            <div className="grid h-full gap-6 md:grid-cols-2 md:grid-rows-2">
              {SERVICES.map((service, index) => (
                <article
                  key={service.id}
                  className={[
                    'group relative flex flex-col justify-between rounded-xl border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)]',
                    'px-8 py-7 md:py-8',
                    index === 0 ? 'md:row-start-1 md:col-start-1' : '',
                    index === 1 ? 'md:row-start-1 md:col-start-2' : '',
                    index === 2 ? 'md:row-start-2 md:col-span-2' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {/* Title at top */}
                  <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] sm:text-[22px] md:text-[32px] font-semibold tracking-tight text-[#111111]">
                    {service.title}
                  </h3>

                  {/* Bottom row: hover description + icon */}
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <p className="max-w-[360px] font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[15px] font-semibold leading-snug text-[#444444] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                      {service.description}
                    </p>

                    <Link
                      href="#"
                      aria-label={`Learn more about ${service.title}`}
                      className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[4px] bg-[#74F5A1] text-[#212121] transition-colors group-hover:bg-[#5fe58a]"
                    >
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
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
