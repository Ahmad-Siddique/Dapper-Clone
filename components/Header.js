// components/Header.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Services', hasDropdown: true, type: 'mega' },
  { label: 'Expertise', hasDropdown: true, type: 'mega' },
  { label: 'Cases', hasDropdown: false },
  { label: 'Resources', hasDropdown: true, type: 'mega' },
  { label: 'About', hasDropdown: false },
  { label: 'Careers', hasDropdown: false },
];

const SERVICES_ROW_1 = [
  {
    id: 'content',
    title: 'Content & Creative',
    description: "We'll make your prospects stop scrolling.",
    href: '/services/content-creative',
  },
  {
    id: 'paid',
    title: 'Paid Media & Performance',
    description: 'Build, optimize and scale your performance marketing.',
    href: '/services/paid-media',
  },
  {
    id: 'data',
    title: 'Data & Measurement',
    description: 'We make the invisible visible.',
    href: '/services/data-measurement',
  },
];

const SERVICES_ROW_2 = [
  {
    id: 'demand-team',
    title: 'Demand Team',
    description: 'Your dedicated demand generation team.',
    href: '/services/demand-team',
  },
  {
    id: 'demand-agency',
    title: 'Demand Gen Agency',
    description: 'Full-service demand generation partnership.',
    href: '/services/demand-gen-agency',
  },
];

const EXPERTISE_ITEMS = [
  {
    id: 'b2b-saas',
    title: 'B2B SaaS',
    description: 'Specialized marketing strategies for SaaS companies looking to scale.',
    href: '/expertise/b2b-saas',
  },
  {
    id: 'b2b-service',
    title: 'B2B Service',
    description: 'Drive demand for your professional services business.',
    href: '/expertise/b2b-service',
  },
  {
    id: 'b2b-hardware',
    title: 'B2B Hardware',
    description: 'Marketing solutions for hardware and equipment manufacturers.',
    href: '/expertise/b2b-hardware',
  },
];

const RESOURCES_ITEMS = [
  {
    id: 'blog',
    title: 'Blog',
    description: 'Insights, strategies, and best practices for B2B marketing success.',
    href: '/blog',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Get the latest demand generation insights delivered to your inbox.',
    href: '/newsletter',
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredCard(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-6 z-50 antialiased md:top-8">
      <div className="flex justify-center px-2 md:px-4">
        <div className="flex w-full max-w-[1180px] items-center gap-4 rounded-[14px] bg-white px-4 py-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:gap-8 md:px-9 md:py-[16px] lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center">
              <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
                <path d="M7 18C7 11 13 7 19 7V18H7Z" fill="#111111" />
                <path d="M19 18C25 18 29 24 29 28H19V18Z" fill="#111111" />
              </svg>
            </div>
            <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[22px] md:text-[26px] font-bold leading-none tracking-tight text-text-black">
              Dapper
            </span>
          </Link>

          {/* Desktop NAV */}
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex lg:gap-9">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 font-[Helvetica_Now_Text,Arial,sans-serif] text-[18px] lg:text-[19px] tracking-tight text-black transition-all duration-200  cursor-pointer px-3 py-2 rounded-[8px] hover:bg-[#F5F5F5]"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden flex-shrink-0 items-center lg:flex">
            <Link href="#talk" className="group flex items-center gap-3">
              <span className="font-[Helvetica_Now_Text,Arial,sans-serif] text-[17px] lg:text-[18px] tracking-tight text-black">
                Talk to us
              </span>

              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path
                      d="M1 13L13 1M13 1H5M13 1V9"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-[8px] border border-black/10 bg-white text-black transition-colors hover:bg-[#F7F7F7] lg:hidden"
          >
            <span className="sr-only">Open navigation</span>
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-black transition-all duration-300 ${
                  mobileOpen ? 'top-1/2 translate-y-[-50%] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-black transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-black transition-all duration-300 ${
                  mobileOpen ? 'top-1/2 translate-y-[-50%] -rotate-45' : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MEGA MENU DROPDOWN - Services */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
          activeDropdown === 'Services'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter('Services')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center px-2 md:px-4">
          <div className="w-full max-w-[1180px] rounded-[14px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/[0.06] p-6">
            {/* Row 1: 3 Cards */}
            <div
              className="grid gap-4 mb-4 transition-all duration-500 ease-out"
              style={{
                gridTemplateColumns:
                  hoveredCard === 'content'
                    ? '1.28fr 0.86fr 0.86fr'
                    : hoveredCard === 'paid'
                    ? '0.86fr 1.28fr 0.86fr'
                    : hoveredCard === 'data'
                    ? '0.86fr 0.86fr 1.28fr'
                    : '1fr 1fr 1fr',
              }}
            >
              {SERVICES_ROW_1.map((service) => {
                const isHovered = hoveredCard === service.id;
                return (
                  <Link
                    key={service.id}
                    href={service.href}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative flex flex-col justify-between rounded-xl border border-black/[0.06] bg-[#FAFAFA] hover:bg-white px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] cursor-pointer"
                  >
                    <div>
                      <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[18px] font-semibold tracking-tight text-[#111111] mb-3">
                        {service.title}
                      </h3>
                      <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[14px] font-regular leading-snug text-[#444444]">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center">
                        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] text-[#212121] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                              <path
                                d="M1 13L13 1M13 1H5M13 1V9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Row 2: 2 Cards */}
            <div
              className="grid gap-4 transition-all duration-500 ease-out"
              style={{
                gridTemplateColumns:
                  hoveredCard === 'demand-team'
                    ? '1.28fr 0.72fr'
                    : hoveredCard === 'demand-agency'
                    ? '0.72fr 1.28fr'
                    : '1fr 1fr',
              }}
            >
              {SERVICES_ROW_2.map((service) => {
                const isHovered = hoveredCard === service.id;
                return (
                  <Link
                    key={service.id}
                    href={service.href}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative flex flex-col justify-between rounded-xl border border-black/[0.06] bg-[#FAFAFA] hover:bg-white px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] cursor-pointer"
                  >
                    <div>
                      <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[18px] font-semibold tracking-tight text-[#111111] mb-3">
                        {service.title}
                      </h3>
                      <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[14px] font-regular leading-snug text-[#444444]">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center">
                        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] text-[#212121] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                              <path
                                d="M1 13L13 1M13 1H5M13 1V9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MEGA MENU DROPDOWN - Expertise */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
          activeDropdown === 'Expertise'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter('Expertise')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center px-2 md:px-4">
          <div className="w-full max-w-[1180px] rounded-[14px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/[0.06] p-6">
            {/* Single Row: 3 Cards */}
            <div
              className="grid gap-4 transition-all duration-500 ease-out"
              style={{
                gridTemplateColumns:
                  hoveredCard === 'b2b-saas'
                    ? '1.28fr 0.86fr 0.86fr'
                    : hoveredCard === 'b2b-service'
                    ? '0.86fr 1.28fr 0.86fr'
                    : hoveredCard === 'b2b-hardware'
                    ? '0.86fr 0.86fr 1.28fr'
                    : '1fr 1fr 1fr',
              }}
            >
              {EXPERTISE_ITEMS.map((item) => {
                const isHovered = hoveredCard === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative flex flex-col justify-between rounded-xl border border-black/[0.06] bg-[#FAFAFA] hover:bg-white px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] cursor-pointer"
                  >
                    <div>
                      <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[18px] font-semibold tracking-tight text-[#111111] mb-3">
                        {item.title}
                      </h3>
                      <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[14px] font-regular leading-snug text-[#444444]">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center">
                        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] text-[#212121] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                              <path
                                d="M1 13L13 1M13 1H5M13 1V9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MEGA MENU DROPDOWN - Resources */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
          activeDropdown === 'Resources'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter('Resources')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center px-2 md:px-4">
          <div className="w-full max-w-[1180px] rounded-[14px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/[0.06] p-6">
            {/* Single Row: 2 Cards */}
            <div
              className="grid gap-4 transition-all duration-500 ease-out"
              style={{
                gridTemplateColumns:
                  hoveredCard === 'blog'
                    ? '1.28fr 0.72fr'
                    : hoveredCard === 'newsletter'
                    ? '0.72fr 1.28fr'
                    : '1fr 1fr',
              }}
            >
              {RESOURCES_ITEMS.map((item) => {
                const isHovered = hoveredCard === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative flex flex-col justify-between rounded-xl border border-black/[0.06] bg-[#FAFAFA] hover:bg-white px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] cursor-pointer"
                  >
                    <div>
                      <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[18px] font-semibold tracking-tight text-[#111111] mb-3">
                        {item.title}
                      </h3>
                      <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[14px] font-regular leading-snug text-[#444444]">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center">
                        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] text-[#212121] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                              <path
                                d="M1 13L13 1M13 1H5M13 1V9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
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
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`
          lg:hidden
          ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <div
          className={`
            mx-auto mt-2 w-full max-w-[1180px] px-2 md:px-4
            transition-[max-height,opacity,transform] duration-300 ease-out
            ${mobileOpen ? 'max-h-[320px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
          `}
        >
          <div className="overflow-hidden rounded-[14px] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="flex items-center justify-between rounded-[8px] px-1 py-2 text-left font-[Helvetica_Now_Text,Arial,sans-serif] text-[16px] tracking-tight text-black transition-colors hover:bg-[#F7F7F7]"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      className="text-black/70"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-4 border-t border-black/5 pt-4">
              <Link
                href="#talk"
                onClick={() => setMobileOpen(false)}
                className="group inline-flex w-full items-center justify-between rounded-[10px] bg-[#111111] px-4 py-3 font-[Helvetica_Now_Text,Arial,sans-serif] text-[15px] font-semibold tracking-tight text-white transition-colors hover:bg-black"
              >
                <span>Talk to us</span>
                <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-white/90">
                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                    <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                      <path
                        d="M1 13L13 1M13 1H5M13 1V9"
                        fill="none"
                        stroke="#111111"
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
        </div>
      </div>
    </header>
  );
}
