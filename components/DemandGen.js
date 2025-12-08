// components/DemandSection.jsx
'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEMAND_BLOCKS = [
  {
    id: 'demand-gen',
    label: 'Demand Gen',
    tagline: 'Become famous in your niche and build demand',
    intro:
      'B2B buyers do not move in a straight, linear funnel. You cannot force a need into existence, but the moment a need appears you want to be the very first brand they recall.',
    body: [
      'That is why your brand has to sit top‑of‑mind in your niche category. When a problem shows up, the ideal customer should immediately think of you – what Dapper calls becoming “niche famous”.',
      'You get there by showing up in front of the right accounts with content that clearly proves you are the best‑equipped company to solve their problems.',
      'That means creative that is impossible to ignore and distribution strategies that keep you visible everywhere your ideal clients spend time.',
    ],
    results: [
      'Growing pipeline',
      'Shorter sales cycles',
      'Better ICP‑fit inbound leads',
      'Compounding brand building',
    ],
    href: 'https://www.dapper.agency/expertise/b2b-saas',
  },
  {
    id: 'demand-capture',
    label: 'Demand Capture',
    tagline: 'Turn active demand into pipeline',
    intro:
      'When buyers are ready to purchase, they research solutions on their own. At that point you must appear in the right places with the right offer, or the opportunity goes to someone else.',
    body: [
      'Capturing demand starts with understanding how prospects search, which touchpoints they trust, and what information convinces them to choose you over an alternative.',
      'Search, review sites, landing pages, and pricing experiences are all tuned to turn existing demand into qualified opportunities at the lowest possible acquisition cost.',
    ],
    results: [
      'More inbound pipeline',
      'Lower acquisition costs',
      'Higher conversion rates',
      'Better ICP‑fit inbound leads',
    ],
    href: '#',
  },
];

export default function DemandSection() {
  const sectionRef = useRef(null);
  const phoneWrapperRef = useRef(null);
  const phoneRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const wrapper = phoneWrapperRef.current;
    const phone = phoneRef.current;
    if (!section || !wrapper || !phone) return;

    const mq = window.matchMedia('(min-width: 1024px)');
    let st = null;

    const init = () => {
      if (st) st.kill();

      // Mobile → no sticky, no animation
      if (!mq.matches) {
        gsap.set(wrapper, { position: 'relative', top: 'auto' });
        gsap.set(phone, { y: 0 });
        return;
      }

      // Desktop: sticky at nice top offset
      gsap.set(wrapper, {
        position: 'sticky',
        top: '7rem', // same as your original lg:top-28
      });

      // Total distance the phone should travel
      const totalTravel = section.offsetHeight - wrapper.offsetHeight - 400; // 400px earlier stop

      st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom-=200', // ends 200px before actual bottom
        scrub: true, // 1:1 raw scroll sync – exactly what you want
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const y = totalTravel * self.progress;
          gsap.set(phone, { y });
        },
      });
    };

    init();

    const handleResize = () => {
      ScrollTrigger.refresh();
      init();
    };

    mq.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      mq.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
      if (st) st.kill();
      gsap.set([wrapper, phone], { clearProps: 'all' });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#EFEFEF] py-24 overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)]">

          {/* LEFT – Sticky Phone */}
          <div ref={phoneWrapperRef} className="relative lg:sticky lg:top-28">
            <div
              ref={phoneRef}
              className="relative w-full max-w-[360px] lg:max-w-[380px] xl:max-w-[420px] mx-auto lg:mx-0"
            >
              <div className="relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.20)]">
                <div className="relative h-[520px] sm:h-[560px] lg:h-[600px]">
                  <Image
                    src="https://cdn.prod.website-files.com/67b320fe114d5e148783d276/68947cf33c69a1ceddbdf83d_Dapper%20Flash%20Photos-04.avif"
                    alt="Demand gen creative on mobile"
                    fill
                    sizes="(min-width: 1280px) 420px, (min-width: 1024px) 380px, 360px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <span className="pointer-events-none absolute -left-6 top-16 h-14 w-8 bg-[#74F5A1]" />
              <span className="pointer-events-none absolute left-16 -bottom-6 h-10 w-24 bg-[#74F5A1]" />
            </div>
          </div>

          {/* RIGHT – Your original content (100% untouched) */}
          <div className="space-y-12">
            {DEMAND_BLOCKS.map((block) => (
              <article
                key={block.id}
                className="rounded-2xl border border-black/[0.06] bg-white px-12 py-16 sm:px-20 sm:py-20 md:px-24 md:py-24 shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
              >
                <header className="mb-12">
                  <h2 className="font-[Helvetica Now Text,Arial,sans-serif] text-[38px] sm:text-[44px] md:text-[75px] font-semibold tracking-tight text-[#111111]">
                    {block.label}
                  </h2>
                  <p className="mt-4 font-ivy-presto italic text-[24px] sm:text-[26px] md:text-[32px] text-[#111111]">
                    {block.tagline}
                  </p>
                </header>

                <div className="max-w-[800px] space-y-5 font-[Helvetica Now Text,Arial,sans-serif] text-[18px] sm:text-[19px] md:text-[20px] leading-relaxed text-[#212121]">
                  <p className="font-semibold">{block.intro}</p>
                  {block.body.map((p, i) => (
                    <p key={i} className="text-[#555]">{p}</p>
                  ))}
                </div>

                <div className="mt-14">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#777]">
                    The result?
                  </p>
                  <ul className="mt-6 space-y-4">
                    {block.results.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[17px] sm:text-[18px] text-[#212121]"
                      >
                        <span className="mt-[3px] h-5 w-5 shrink-0 rounded-md bg-[#74F5A1]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex justify-end">
                    <Link
                      href={block.href}
                      className="group inline-flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-6 py-3 text-[15px] sm:text-[16px] font-semibold tracking-tight text-[#111111] shadow-sm transition-all hover:bg-[#F7F7F7]"
                    >
                      Discover more
                      <span className="relative flex h-0 h-7 w-7 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all group-hover:bg-black group-hover:scale-110">
                        <svg className="absolute transition-all group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0" width="12" height="12" viewBox="0 0 14 14">
                          <path d="M1 13L13 1M13 1H5M13 1V9" fill="none" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className="absolute translate-x-[-10px] translate-y-[10px] opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" width="12" height="12" viewBox="0 0 14 14">
                          <path d="M1 13L13 1M13 1H5M13 1V9" fill="none" stroke="#74F5A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}