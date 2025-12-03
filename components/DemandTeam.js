// components/DemandTeamSection.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DemandTeamSection() {
  return (
    <section className="bg-[#EFEFEF] py-24 overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        {/* LABEL */}
        <div className="mb-10 flex items-center gap-3">
          <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
          <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm font-semibold text-[#111111]">
            Demand team
          </span>
        </div>

        {/* GRID: heading full-width top, paragraph below on right */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          {/* Heading spans both columns on desktop */}
          <div className="lg:col-span-2">
            <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[1.02] tracking-tight text-[#111111]">
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                Your own team
              </span>
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                of <span className="italic font-normal">world‑class</span> B2B
              </span>
              <span className="block text-[40px] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px] font-bold">
                marketing experts
              </span>
            </h2>
          </div>

          {/* Paragraph: below heading, right column on large screens */}
          <div className="max-w-[640px] lg:col-start-2">
            <p className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] sm:text-[18px] md:text-[19px] font-semibold leading-relaxed text-[#212121]">
              Tailored teams of world‑class B2B marketers are built to
              complement your in‑house capabilities. They work closely with your
              internal marketing team to level up strategy and execution. Every
              member brings deep expertise and years of B2B experience, all
              aligned around one goal: running a high‑performance marketing
              engine.
            </p>
          </div>
        </div>

        {/* VISUAL SECTION */}
        <div className="relative mt-40 min-h-[1000px] lg:min-h-[1200px] flex items-center justify-center">
          {/* TOP ROW */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-6 md:gap-10 lg:gap-16 z-0 pointer-events-none">
            <div className="translate-y-40">
              <Tile label="LinkedIn" />
            </div>
            <div className="translate-y-6">
              <Tile label="Content" />
            </div>
            <div className="translate-y-6">
              <Tile label="Google" />
            </div>
            <div className="translate-y-40">
              <Tile label="Video" />
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-6 md:gap-10 lg:gap-16 z-0 pointer-events-none">
            <div className="-translate-y-40">
              <Tile label="AI" />
            </div>
            <div className="-translate-y-6">
              <Tile label="Email" />
            </div>
            <div className="-translate-y-6">
              <Tile label="Motion" />
            </div>
            <div className="-translate-y-40">
              <Tile label="Design" />
            </div>
          </div>

          {/* Demand — card stack — Team */}
          <div className="relative z-10 flex items-center justify-center gap-10 md:gap-16 lg:gap-24">
            <span className="hidden md:block italic text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#111] font-light">
              Demand
            </span>

            {/* Card stack */}
            <div className="relative w-48 h-64 sm:w-56 sm:h-80 md:w-64 md:h-96 lg:w-72 lg:h-[420px]">
              {/* Left */}
              <div className="absolute -left-6 sm:-left-8 top-4 w-full h-full rounded-3xl overflow-hidden shadow-2xl -rotate-12 hidden sm:block">
                <Image
                  src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg"
                  alt="Team member left"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Right */}
              <div className="absolute -right-6 sm:-right-8 top-4 w-full h-full rounded-3xl overflow-hidden shadow-2xl rotate-12 hidden sm:block">
                <Image
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                  alt="Team member right"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Center */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ring-8 ring-[#EFEFEF]">
                <Image
                  src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg"
                  alt="Team member center"
                  fill
                  className="object-cover"
                />
              </div>

              {/* CTA */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-xs md:text-sm font-bold tracking-tight shadow-2xl hover:bg-gray-50 transition-colors"
                >
                  Meet the team
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-[#74F5A1]">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 13L13 1M13 1H5M13 1V9"
                        stroke="#111"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#111]">
              Team
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Tile
function Tile({ label }) {
  return (
    <div className="flex h-20 w-28 md:h-24 md:w-36 lg:w-40 xl:w-44 items-center justify-center rounded-xl bg-[#74F5A1] shadow-xl">
      <span className="text-sm md:text-base lg:text-lg font-bold text-[#111] text-center leading-tight px-3">
        {label}
      </span>
    </div>
  );
}
