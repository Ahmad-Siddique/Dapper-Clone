"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../dark/Header";
import Footer from "../dark/Footer";

const CASE_STUDIES = {
  "privilee-website": {
    id: "privilee-website",
    title: "Privilee Website",
    subtitle:
      "Designing a high‑conversion lifestyle membership experience for UAE’s premium beach, pool, and fitness clubs.",
    role: "Lead Product Designer",
    company: "Privilee",
    timeframe: "4 months",
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    services: ["Product Design", "UX/UI", "Design Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1800&q=80",
    problem:
      "Privilee’s website was visually dated, overloaded with content, and failing to clearly communicate the value of membership to different user segments.",
    goal:
      "Redesign the experience to clarify value, reduce friction in the funnel, and create a scalable system for future campaigns.",
    metrics: [
      { label: "Signup conversion", value: "+32%" },
      { label: "Bounce rate", value: "-21%" },
      { label: "Avg. session time", value: "+18%" },
    ],
    overviewBullets: [
      "Re‑architected the website around a clear story: from ‘what is this?’ to ‘this is for me’ in under 10 seconds.",
      "Segmented messaging for families, couples, and solo members, supported by tailored imagery and benefits.",
      "Built a token‑based design system so marketing could launch new landing pages without new design work each time.",
    ],
    processSections: [
      {
        label: "01 — Discovery",
        title: "Finding the friction points in the funnel",
        text: "We combined product analytics with 8 moderated usability sessions to understand where trust broke down. The largest drop‑off happened between the hero and pricing, where users didn’t yet understand why Privilee was different from a regular gym membership.",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Strategy",
        title: "Reframing Privilee as a ‘daily upgrade’",
        text: "Instead of talking only about access to venues, we repositioned Privilee as a lifestyle upgrade: stress‑free weekends, active kids, flexible fitness. This narrative drove content, imagery, and the structure of every key page.",
        image:
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "03 — UX & UI",
        title: "Designing a modular, glowy interface",
        text: "We created a modular layout system with interchangeable hero blocks, benefit rows, social proof clusters, and pricing layouts. The visual language leaned into rich gradients, glassmorphism, and a light layer of motion for a premium but approachable feel.",
        image:
          "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalScreens: [
      {
        title: "Hero — membership overview",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Benefits & partner grid layout",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Responsive pricing & FAQs section",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    learnings: [
      "A clear narrative + proof (awards, partners, member quotes) beat long feature lists for driving sign‑ups.",
      "Treating the marketing site as a product — with its own system, tokens, and experiments — unlocked faster iteration and better compounding results.",
    ],
  },
};

function getCaseStudy(slug) {
  return CASE_STUDIES[slug] ?? CASE_STUDIES["privilee-website"];
}

export default function CaseStudyPage({ params }) {
  const cs = getCaseStudy(params?.slug || "privilee-website");
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-theme={theme}>
      <Header theme={theme} />
      <main className="min-h-screen w-full bg-[#050114] text-white text-base">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-44 left-[-4rem] h-80 w-80 rounded-full bg-[#F27CE0]/26 blur-3xl" />
        <div className="absolute -top-32 right-[-6rem] h-96 w-96 rounded-full bg-[#37B4FF]/24 blur-[90px]" />
        <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#C779FF]/18 blur-[90px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/4 via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 lg:px-0 lg:py-28">
        <div className="mb-12 flex items-center justify-between text-lg text-[#A6A0D4]">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] backdrop-blur-md hover:border-white/30 hover:bg-white/10"
          >
            <span>←</span> Case Studies
          </Link>
          <span className="rounded-full bg-white/5 px-5 py-2.5 text-sm uppercase tracking-[0.24em]">
            {cs.company}
          </span>
        </div>

        <section className="mb-16 md:mb-20">
          <p className="mb-3 text-lg font-semibold uppercase tracking-[0.36em] text-[#D7C4FF]">
            Case Study
          </p>
          <h1 className="mb-5 text-[4rem] font-extrabold leading-[1.02] tracking-tight md:text-[5rem] lg:text-[5.5rem]">
            <span className="bg-gradient-to-r from-[#F27CE0] via-[#C779FF] to-[#37B4FF] bg-clip-text text-transparent">
              {cs.title}
            </span>
          </h1>
          <p className="max-w-4xl text-[1.8rem] leading-relaxed text-[#DCD6F4] md:text-[2rem]">
            {cs.subtitle}
          </p>
        </section>

        <section className="mb-20 overflow-hidden rounded-[38px] border border-white/12 bg-white/5 shadow-[0_48px_140px_rgba(0,0,0,0.96)]">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src={cs.heroImage}
              alt={cs.title}
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="pointer-events-none absolute inset-x-10 bottom-7 flex items-center justify-between text-lg text-[#EFE9FF]">
              <a
                href="https://privilee.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-1.5 backdrop-blur-md hover:bg-black/70"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
                Live product ↗
              </a>
              <span className="hidden rounded-full bg-black/50 px-4 py-1.5 backdrop-blur-md md:inline">
                Role: {cs.role}
              </span>
            </div>
          </div>
        </section>

        <section className="mb-24 grid gap-14 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-start">
          <div>
            <h2 className="mb-4 text-xl font-semibold uppercase tracking-[0.24em] text-[#D7C4FF]">
              Project Overview
            </h2>
            <p className="mb-4 text-[1.3rem] leading-relaxed text-[#E2DCF9]">
              {cs.problem}
            </p>
            <p className="mb-7 text-[1.3rem] leading-relaxed text-[#E2DCF9]">
              {cs.goal}
            </p>
            <ul className="space-y-3.5 text-[1.3rem] text-[#EAE4FF]">
              {cs.overviewBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[12px] h-[3px] w-[24px] rounded-full bg-gradient-to-r from-[#37B4FF] via-[#C779FF] to-[#F27CE0] shadow-[0_0_22px_rgba(129,140,248,0.9)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-7 rounded-3xl border border-white/10 bg-white/5 px-7 py-8 text-[1.1rem] text-[#F1ECFF] shadow-[0_32px_100px_rgba(0,0,0,0.85)] backdrop-blur-md">
            <div className="grid grid-cols-2 gap-5">
              <OverviewItem label="Role" value={cs.role} />
              <OverviewItem label="Company" value={cs.company} />
              <OverviewItem label="Timeframe" value={cs.timeframe} />
              <OverviewItem label="Services" value={cs.services.join(", ")} />
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-5">
              <OverviewItem label="Tools" value={cs.tools.join(", ")} />
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#AAA0EA]">
                  Key metrics
                </p>
                <div className="space-y-2">
                  {cs.metrics.map((m) => (
                    <p key={m.label}>
                      <span className="font-semibold text-white text-xl">
                        {m.value}
                      </span>{" "}
                      · {m.label}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32 space-y-20">
          {cs.processSections.map((block, idx) => (
            <article
              key={block.label}
              className="grid gap-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] md:items-center"
            >
              <div className={idx % 2 === 1 ? "order-last md:order-first" : ""}>
                <p className="mb-3 text-base font-semibold uppercase tracking-[0.26em] text-[#AAA0EA]">
                  {block.label}
                </p>
                <h3 className="mb-4 text-[2.2rem] font-semibold text-white md:text-[2.4rem]">
                  {block.title}
                </h3>
                <p className="text-[1.3rem] leading-relaxed text-[#E2DCF9]">
                  {block.text}
                </p>
              </div>
              <div className="overflow-hidden rounded-[30px] border border-white/12 bg-white/5 shadow-[0_36px_110px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={block.image}
                    alt={block.title}
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-32">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold uppercase tracking-[0.24em] text-[#D7C4FF]">
                Final Experience
              </h2>
              <p className="mt-3 text-[1.3rem] text-[#E7E0FF]">
                A modular, glowy interface that keeps the brand premium while
                driving measurable business outcomes.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {cs.finalScreens.map((screen) => (
              <div
                key={screen.title}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={screen.image}
                    alt={screen.title}
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/74 via-transparent to-transparent" />
                </div>
                <div className="px-5 py-3.5">
                  <p className="text-lg font-medium text-[#F3EDFF]">
                    {screen.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-32 grid gap-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <div>
            <h2 className="mb-4 text-xl font-semibold uppercase tracking-[0.24em] text-[#D7C4FF]">
              Impact & Learnings
            </h2>
            <ul className="space-y-4 text-[1.3rem] leading-relaxed text-[#E2DCF9]">
              {cs.learnings.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[12px] h-[3px] w-[24px] rounded-full bg-gradient-to-r from-[#37B4FF] to-[#F27CE0] shadow-[0_0_22px_rgba(129,140,248,0.9)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-7 py-8 text-[1.3rem] text-[#F3EEFF] shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.26em] text-[#AAA0EA]">
              What’s next
            </p>
            <p className="mb-5 leading-relaxed">
              We’re exploring personalization per member segment, and an
              interactive value calculator for users arriving from performance
              campaigns.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-base font-semibold uppercase tracking-[0.26em] text-[#F9EBFF] hover:text-white"
            >
              View more case studies →
            </Link>
          </div>
        </section>

        <section className="border-t border-white/10 pt-14 pb-8 text-center">
          <p className="text-[1.3rem] text-[#AFA8D6]">
            Have a product, platform, or membership that needs this level of UX
            and UI thinking?
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/12 px-10 py-4 text-base font-semibold uppercase tracking-[0.26em] text-white shadow-[0_26px_80px_rgba(0,0,0,0.9)] backdrop-blur-md hover:bg-white/18"
          >
            Let’s talk about your project
          </Link>
        </section>
      </div>
    </main>
    <Footer theme={theme} />
    </div>
  );
}

function OverviewItem({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-base font-semibold uppercase tracking-[0.24em] text-[#AAA0EA]">
        {label}
      </p>
      <p className="text-[1.2rem] leading-snug text-[#F5F0FF]">{value}</p>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}