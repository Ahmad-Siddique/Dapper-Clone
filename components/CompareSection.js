// components/CompareSection.jsx
'use client';

const TRADITIONAL_ITEMS = [
  'Marketing and sales work in silos',
  'Prioritizes MQLs',
  'Reporting stops at vanity metrics',
  'Relies on gated content for leads',
  'Sees marketing as a cost center',
  'Thinks in campaigns',
];

const MODERN_ITEMS = [
  'Marketing and sales collaborate to generate revenue',
  'Prioritizes pipeline growth and lead quality',
  'Metrics align with real business outcomes',
  'Provides ungated value that builds demand',
  'Proves marketing as a revenue driver',
  'Thinks in always-on demand gen',
];

export default function CompareSection() {
  return (
    <section className="relative bg-white py-32 overflow-hidden">
      {/* Decorative shapes - left and right */}
      <div className="pointer-events-none absolute right-0 top-20 hidden lg:block">
        <svg width="140" height="200" viewBox="0 0 140 200" fill="none">
          <rect x="0" y="0" width="70" height="70" rx="8" fill="#74F5A1" />
          <rect x="70" y="0" width="70" height="70" rx="8" fill="#E8E8E8" />
          <rect x="70" y="70" width="70" height="70" rx="8" fill="#74F5A1" />
          <rect x="0" y="140" width="70" height="70" rx="8" fill="#74F5A1" />
          <rect x="70" y="140" width="70" height="70" rx="8" fill="#E8E8E8" />
        </svg>
      </div>

      <div className="pointer-events-none absolute left-0 bottom-32 hidden lg:block">
        <svg width="100" height="160" viewBox="0 0 100 160" fill="none">
          <rect x="0" y="0" width="50" height="50" rx="6" fill="#74F5A1" />
          <rect x="0" y="60" width="50" height="50" rx="6" fill="#E8E8E8" />
          <rect x="0" y="120" width="50" height="50" rx="6" fill="#74F5A1" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        {/* Label */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="inline-flex h-6 w-6 rounded-sm bg-[#74F5A1]" />
          <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#111111]">
            Compare
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mb-10 max-w-5xl text-center font-[Helvetica Now Text,Arial,sans-serif] text-[40px] sm:text-[58px] md:text-[68px] lg:text-[78px] xl:text-[88px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111]">
          <span className="italic font-normal">Traditional B2B marketing</span>{' '}
          <span className="font-bold">vs modern B2B marketing</span>
        </h2>

        {/* Subheading */}
        <p className="mx-auto mb-24 max-w-3xl text-center font-[Helvetica Now Text,Arial,sans-serif] text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-relaxed tracking-tight text-[#444444]">
          B2B marketing is changing, fast. Attention spans are getting shorter,
          AI is getting smarter, and competition is increasing. That&apos;s why you
          need a partner who is a frontrunner in the industry.
        </p>

        {/* Comparison Grid */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Traditional Column */}
          <div>
            <h3 className="mb-12 text-center font-[Helvetica Now Text,Arial,sans-serif] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold tracking-tight text-[#111111]">
              Traditional B2B Marketing
            </h3>
            <div className="space-y-6">
              {TRADITIONAL_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 rounded-2xl border border-black/[0.08] bg-[#F9F9F9] px-6 py-6 sm:px-8 sm:py-7 transition-all hover:border-black/[0.12] hover:bg-[#F5F5F5]"
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-[#111111]">
                    <svg
                      width="22"
                      height="3"
                      viewBox="0 0 22 3"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        x1="0"
                        y1="1.5"
                        x2="22"
                        y2="1.5"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <p className="flex-1 font-[Helvetica Now Text,Arial,sans-serif] text-[17px] sm:text-[19px] md:text-[23px] font-semibold leading-snug tracking-tight text-[#111111]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Column */}
          <div>
            <h3 className="mb-12 text-center font-[Helvetica Now Text,Arial,sans-serif] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold tracking-tight text-[#111111]">
              Modern B2B Marketing
            </h3>
            <div className="space-y-6">
              {MODERN_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 rounded-2xl border border-[#74F5A1]/30 bg-[#74F5A1]/[0.08] px-6 py-6 sm:px-8 sm:py-7 transition-all hover:border-[#74F5A1]/50 hover:bg-[#74F5A1]/[0.12]"
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-[#74F5A1]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        x1="11"
                        y1="0"
                        x2="11"
                        y2="22"
                        stroke="#111111"
                        strokeWidth="3"
                      />
                      <line
                        x1="0"
                        y1="11"
                        x2="22"
                        y2="11"
                        stroke="#111111"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <p className="flex-1 font-[Helvetica Now Text,Arial,sans-serif] text-[17px] sm:text-[19px] md:text-[23px] font-semibold leading-snug tracking-tight text-[#111111]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
