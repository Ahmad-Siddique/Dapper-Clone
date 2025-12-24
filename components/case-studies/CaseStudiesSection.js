"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    id: "vitacare",
    title: "VitaCare",
    tag: "Healthtech",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "privilee-website",
    title: "Privilee Website",
    tag: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "bakkal",
    title: "Bakkal",
    tag: "Food & Beverage",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ignyte",
    title: "Ignyte by DIFC",
    tag: "Fintech",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "privilee-app",
    title: "Privilee App",
    tag: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "portl",
    title: "Portl",
    tag: "Web3",
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function CaseStudiesPage() {
  // plain JS ref (no TS generic)
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // HERO
      gsap.from(".cs-hero-title", {
        opacity: 0,
        y: 40,
        filter: "blur(6px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-hero",
          start: "top 80%",
        },
      });

      gsap.from(".cs-hero-desc", {
        opacity: 0,
        y: 30,
        filter: "blur(8px)",
        duration: 1.1,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cs-hero",
          start: "top 78%",
        },
      });

      // CARDS – reveal
      const cards = gsap.utils.toArray(".cs-card");

      gsap.from(cards, {
        opacity: 0,
        y: 80,
        scale: 0.94,
        rotationX: 8,
        transformOrigin: "center top",
        filter: "blur(6px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".cs-grid",
          start: "top 80%",
        },
      });

      // CARDS – floating loop (convert to real array first)
      const cardsArray = Array.from(cards);

      cardsArray.forEach((card, i) => {
        gsap.to(card, {
          y: "+=10",
          duration: 4 + i * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // CALL SECTION
      gsap.from(".cs-call-text", {
        opacity: 0,
        x: -40,
        filter: "blur(6px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-call-section",
          start: "top 85%",
        },
      });

      gsap.from(".cs-call-card", {
        opacity: 0,
        x: 60,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cs-call-section",
          start: "top 85%",
        },
      });
    }, rootRef.current); // pass DOM node, not ref object

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="min-h-screen w-full bg-[#090316] text-white overflow-hidden"
    >
      {/* dreamy background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-[#F27CE0]/15 blur-3xl" />
        <div className="absolute top-40 right-[-4rem] h-96 w-96 rounded-full bg-[#37B4FF]/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-80 w-80 rounded-full bg-[#C779FF]/12 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-18 md:px-6 lg:px-0 lg:pt-24">
        {/* HERO */}
        <section className="cs-hero mb-16 md:mb-20">
          <h1 className="cs-hero-title text-[2.75rem] font-extrabold tracking-tight text-white md:text-[3.25rem] lg:text-[5.0rem]">
            <span className="bg-gradient-to-r from-[#F27CE0] via-[#C779FF] to-[#37B4FF] bg-clip-text text-transparent">
              CASE STUDIES
            </span>
          </h1>
          <p className="cs-hero-desc mt-4 max-w-4xl text-[0.98rem] leading-relaxed text-[#C9C4D8] md:text-[1.5rem]">
            Explore how we’ve helped startups and global brands turn complex
            ideas into intuitive, scalable designs.
          </p>
        </section>

        {/* CARDS GRID – 6 portrait cards */}
        <section className="cs-grid mb-24 grid gap-10 md:grid-cols-2">
          {CASE_STUDIES.map((item) => (
            <Link
              key={item.id}
              href={`/case-studies/${item.id}`}
              className="group cs-card flex flex-col will-change-transform"
            >
              <div className="relative overflow-hidden rounded-[30px] bg-black/60 ring-1 ring-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_40px_110px_rgba(0,0,0,1)]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#A89BCF]">
                  {item.tag}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white md:text-[1.3rem]">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </section>

        {/* CALL TO ACTION BLOCK */}
        <section className="cs-call-section grid gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-center">
          <div className="cs-call-text">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#C6B4FF]">
              Let’s Build Your Product Next
            </p>

            <h2 className="mb-6 text-[2.1rem] font-semibold leading-tight text-white md:text-[2.4rem] lg:text-[2.6rem]">
              Design that solves real problems and delights users.
            </h2>

            <p className="mb-3 max-w-xl text-[0.98rem] leading-relaxed text-[#C9C4D8] md:text-[1.02rem]">
              We help startups and established teams turn complex problems into
              seamless digital experiences. Whether you&apos;re building from
              scratch or improving an existing product – we bring clarity,
              creativity, and execution.
            </p>

            <p className="max-w-xl text-[0.98rem] leading-relaxed text-[#C9C4D8] md:text-[1.02rem]">
              We bring clarity, creativity, and execution.
            </p>
          </div>

          <div className="flex justify-end">
            <div className="cs-call-card w-full max-w-sm rounded-[32px] bg-[#6E0055] px-8 pb-10 pt-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#F4E4FF]/40 bg-[#4B003A]">
                  <Image
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
                    alt="Team member"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <h3 className="mb-1 text-center text-[1.4rem] font-semibold tracking-tight">
                BOOK A QUICK
              </h3>
              <h3 className="mb-6 text-center text-[1.4rem] font-semibold tracking-tight">
                INTRO CALL
              </h3>

              <button className="mb-7 flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-[#3B0030] shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-[1px] hover:bg-[#F8F5FF]">
                Book a Call
              </button>

              <div className="flex items-center justify-between text-xs text-[#F4E4FF]">
                <div>
                  <p className="mb-1 font-medium">Prefer email?</p>
                  <a
                    href="mailto:hello@wdesigna.com"
                    className="text-[11px] text-[#F9D6FF] underline-offset-2 hover:underline"
                  >
                    hello@wdesigna.com
                  </a>
                </div>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F4E4FF]/40 text-[18px] leading-none"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
