"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceHero({ 
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Industries', href: '/industries' },
    { label: 'Healthcare', href: '/industries/healthcare' }
  ],
  title = "Healthcare",
  description = "We design and develop digital healthcare solutions that seamlessly fuse innovation with compassion. Digital transformation will revolutionise healthcare with the widespread adoption of electronic health records, telemedicine, AI diagnostics, and remote patient monitoring. We empower healthcare organisations with the tools of tomorrow.",
  image = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80",
  theme = 'light'
}) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const optimisedRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate elements on load
      gsap.from(breadcrumbRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });

      // Animate content section on scroll
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Animate optimised section on scroll
      gsap.from(optimisedRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: optimisedRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Animate results section on scroll
      gsap.from(resultsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: resultsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative"
      style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)'
          : 'linear-gradient(to bottom, #e8ddd3 0%, #d4c4b8 100%)'
      }}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-40 lg:pb-20">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-[1800px] mx-auto">
            
            {/* Breadcrumb Navigation */}
            <nav 
              ref={breadcrumbRef}
              className="mb-8 md:mb-12"
            >
              <ol className="flex flex-wrap items-center gap-2 text-sm md:text-base font-space-grotesk">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Link 
                      href={crumb.href}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: isDark ? '#74F5A1' : '#c7006e' }}
                    >
                      {crumb.label}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                      <span style={{ color: isDark ? '#74F5A1' : '#c7006e' }}>/</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Title */}
            <h1 
              ref={titleRef}
              className="font-space-grotesk font-bold mb-6 md:mb-8 max-w-[1200px]"
              style={{
                fontSize: 'clamp(56px, 8vw, 120px)',
                lineHeight: '1.05',
                letterSpacing: '-0.02em',
                color: isDark ? '#FFFFFF' : '#c7006e'
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p 
              ref={descRef}
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[24px] leading-relaxed max-w-[900px] mb-12 md:mb-16 lg:mb-20"
              style={{ color: isDark ? '#B0B0B0' : '#c7006e' }}
            >
              {description}
            </p>

            {/* Image */}
            <div 
              ref={imageRef}
              className="relative w-full h-[300px] md:h-[400px] lg:h-[1000px] rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1800px"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - The future of healthcare (Centered) */}
      <div 
        ref={contentRef}
        className="pb-16 md:pb-20 lg:pb-24"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          
          {/* Section Title */}
          <h2 
            className="font-space-grotesk font-bold text-[40px] md:text-[48px] lg:text-[56px] mb-8 md:mb-10"
            style={{
              color: isDark ? '#FFFFFF' : '#7b2cbf',
              lineHeight: '1.2',
              letterSpacing: '-0.01em'
            }}
          >
            The future of healthcare
          </h2>

          {/* Content Paragraphs */}
          <div className="space-y-6 md:space-y-8">
            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              The latest innovations in technology are helping to revolutionise healthcare by providing increased accessibility and convenience. Telemedicine's ability to connect patients with healthcare professionals remotely is ushering in a new era of patient care and monitoring, offering unprecedented benefits.
            </p>

            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              <Link 
                href="/services/data-analytics" 
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}
              >
                Data analytics
              </Link>
              {' '}and{' '}
              <Link 
                href="/services/ai-data-science" 
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}
              >
                Artificial Intelligence (AI)
              </Link>
              {' '}provide real-time patient monitoring, empowering healthcare providers with informed decision-making capabilities. This blend of digital tools and patient care is resulting in more precise diagnoses, personalised treatment plans, and better patient outcomes.
            </p>

            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              Technology-enabled wearable health devices and mobile apps are facilitating proactive health management by allowing patients to monitor their health and share real-time data with healthcare providers.
            </p>

            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              Healthcare chatbots and electronic health records (EHR) streamline administrative tasks to boost efficiency and reduce the risk of human error for improved care coordination and enhanced patient safety. The future of healthcare will continue to evolve thanks to the advancements in technology-powered digital healthcare solutions.
            </p>

            {/* Services Section */}
            <div className="pt-4 md:pt-6">
              <p 
                className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed mb-6"
                style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
              >
                We offer the following services in the healthcare space:
              </p>

              {/* Bullet Points List */}
              <ul className="space-y-4 mb-10 md:mb-12">
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Electronic health records (EHR) implementation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Telemedicine solutions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    AI-driven diagnostics and treatment planning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Remote patient monitoring systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Health data interoperability solutions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Healthcare analytics and predictive modelling
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    <Link 
                      href="/services/cybersecurity" 
                      className="underline hover:opacity-70 transition-opacity"
                      style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}
                    >
                      Cybersecurity
                    </Link>
                    {' '}and data privacy solutions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Patient engagement platforms
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
                  <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                    Workflow optimisation and process automation
                  </span>
                </li>
              </ul>

              {/* CTA Button */}
              <Link 
                href="/contact"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-space-grotesk text-[18px] md:text-[20px] font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ${isDark ? 'bg-[#74F5A1] text-[#0a0a0a]' : 'bg-white'}`}
                style={isDark ? {} : { color: '#7b2cbf' }}
              >
                Let's create the future. Together
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path 
                    d="M4 10h12m0 0l-4-4m4 4l-4 4" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Optimised healthcare section */}
      <div 
        ref={optimisedRef}
        className="pb-16 md:pb-20 lg:pb-24"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          
          {/* Section Title */}
          <h2 
            className="font-space-grotesk font-bold text-[40px] md:text-[48px] lg:text-[56px] mb-8 md:mb-10"
            style={{
              color: isDark ? '#FFFFFF' : '#7b2cbf',
              lineHeight: '1.2',
              letterSpacing: '-0.01em'
            }}
          >
            Optimised healthcare driven by data
          </h2>

          {/* Content Paragraphs */}
          <div className="space-y-6 md:space-y-8">
            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              We specialise in developing cutting-edge healthcare solutions designed to streamline administrative processes to drive operational efficiency where it matters.
            </p>

            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              We've helped a healthcare group facilitate seamless practitioner onboarding by developing an innovative Enterprise Virtual Assistant tailored for the medical environment. Powered by AI and Natural Language Processing, we efficiently addressed specific healthcare administration challenges and simplified the information-sharing process across thousands of employees.
            </p>

            <p 
              className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed"
              style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}
            >
              We think outside the box to provide AI-driven diagnostics and remote patient monitoring. Our expertise in health data interoperability, predictive analytics, cybersecurity, and patient engagement platforms are all aimed at enhancing workflow efficiency and delivering unmatched healthcare services.
            </p>
          </div>
        </div>
      </div>

      {/* Results section */}
      <div 
        ref={resultsRef}
        className="pb-16 md:pb-20 lg:pb-24"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          
          {/* Section Title */}
          <h2 
            className="font-space-grotesk font-bold text-[40px] md:text-[48px] lg:text-[56px] mb-8 md:mb-10"
            style={{
              color: isDark ? '#FFFFFF' : '#7b2cbf',
              lineHeight: '1.2',
              letterSpacing: '-0.01em'
            }}
          >
            Results you can expect from us
          </h2>

          {/* Bullet Points List */}
          <ul className="space-y-4 mb-10 md:mb-12">
            <li className="flex items-start gap-3">
              <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
              <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                Enhanced patient care, efficient workflows, and improved healthcare outcomes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
              <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                Increased accessibility to healthcare through telemedicine
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
              <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                Data-driven insights for proactive and personalized treatments
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
              <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                Improved cybersecurity and protection of patient data
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[20px] md:text-[22px] mt-1" style={{ color: isDark ? '#74F5A1' : '#7b2cbf' }}>•</span>
              <span className="font-space-grotesk text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed" style={{ color: isDark ? '#B0B0B0' : '#7b2cbf' }}>
                Streamlined administrative processes and reduced paperwork
              </span>
            </li>
          </ul>

          {/* CTA Button */}
          <Link 
            href="/contact"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-space-grotesk text-[18px] md:text-[20px] font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ${isDark ? 'bg-[#74F5A1] text-[#0a0a0a]' : 'bg-white'}`}
            style={isDark ? {} : { color: '#7b2cbf' }}
          >
            Let's create the future. Together
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path 
                d="M4 10h12m0 0l-4-4m4 4l-4 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
