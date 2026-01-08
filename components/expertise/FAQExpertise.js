'use client';

import { useState } from 'react';

const FAQ_DATA = [
  {
    id: 1,
    question: 'What makes B2B SaaS marketing different from other industries?',
    answer:
      'B2B SaaS marketing is unique because of longer sales cycles, multiple decision-makers, and the need for continuous education. Unlike B2C, SaaS buyers conduct extensive research before engaging with sales. Marketing must focus on building trust, demonstrating ROI, and nurturing prospects through content at every stage of the funnel. The subscription model also means customer retention and expansion are as critical as acquisition.',
  },
  {
    id: 2,
    question: 'How do you help SaaS companies grow pipeline?',
    answer:
      'We build and scale marketing engines that capture and create demand. Whether it\'s ranking for key terms, turning your team into LinkedIn thought leaders, or running high-performing ads - we tailor strategies to your product, audience, and overall GTM motion.',
  },
  {
    id: 3,
    question: 'Do you work with PLG (product-led growth) and SLG (sales-led growth) SaaS companies?',
    answer:
      'Yes, we work with both PLG and SLG companies. Our strategies are tailored to your go-to-market motion. For PLG companies, we focus on driving qualified signups and activation. For SLG companies, we optimize for pipeline generation and sales enablement. Many of our clients use hybrid models, and we excel at creating strategies that support both motions.',
  },
  {
    id: 4,
    question: 'What is your typical engagement model?',
    answer:
      'We offer flexible engagement models based on your needs: project-based work for specific campaigns, retainer partnerships for ongoing growth, and performance-based arrangements tied to pipeline metrics. Most clients start with a 3-6 month commitment to allow time for strategy implementation and optimization. We work as an extension of your team, integrating with your existing processes and tools.',
  },
  {
    id: 5,
    question: 'How long does it take to see results?',
    answer:
      'Timeline varies by channel and strategy. Paid advertising can generate leads within weeks, while SEO and content marketing typically show significant results in 3-6 months. We focus on building sustainable growth, not quick wins. You\'ll see early indicators like traffic and engagement improvements within 30-60 days, with meaningful pipeline impact by month 3-4.',
  },
  {
    id: 6,
    question: 'Do you work with early-stage startups or only established companies?',
    answer:
      'We work with SaaS companies at all stages, from pre-seed startups to established enterprises. Our approach is tailored to your stage: early-stage companies focus on finding product-market fit and initial traction, while growth-stage companies scale proven channels and expand into new markets. We adjust our strategies and pricing models based on your resources and goals.',
  },
  {
    id: 7,
    question: 'What metrics do you track and optimize for?',
    answer:
      'We focus on business outcomes, not vanity metrics. Primary KPIs include qualified pipeline generated, MQL to SQL conversion rates, customer acquisition cost (CAC), win rates, deal velocity, and revenue attribution. We also track leading indicators like traffic quality, engagement rates, and content performance. All metrics tie directly to your revenue goals and are tracked in your CRM.',
  },
  {
    id: 8,
    question: 'How do you integrate with our existing marketing team?',
    answer:
      'We work as a strategic extension of your team, complementing your in-house capabilities. We can own specific channels, provide strategic direction, or augment your team with specialized expertise. Regular communication through Slack, weekly syncs, and shared dashboards ensure seamless collaboration. We adapt to your tools, processes, and culture.',
  },
  {
    id: 9,
    question: 'What makes your approach different from other agencies?',
    answer:
      'Unlike traditional agencies focused on campaigns and vanity metrics, we\'re embedded in your business outcomes. Our team has operated marketing at high-growth SaaS companies, so we understand the challenges firsthand. We focus on sustainable, compounding growth rather than short-term wins. Our strategies are built on first-principles thinking, data-driven optimization, and deep SaaS expertise.',
  },
  {
    id: 10,
    question: 'What industries and verticals do you specialize in?',
    answer:
      'We specialize exclusively in B2B SaaS across various verticals including MarTech, Sales Tech, HR Tech, FinTech, and Developer Tools. Our deep focus on SaaS means we understand buyer behavior, sales cycles, and growth metrics specific to subscription businesses. This specialization allows us to apply proven playbooks and avoid common pitfalls that generalist agencies face.',
  },
];

export default function FAQSection({ theme = 'light' }) {
  const [openId, setOpenId] = useState(null);
  const isDark = theme === 'dark';

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} py-28 md:py-36 lg:py-44`}>
      <div className="relative z-10 mx-auto max-w-[900px] px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
            <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[14px] font-semibold tracking-[0.16em] uppercase ${isDark ? 'text-white' : 'text-[#212121]'}`}>
              FAQ
            </span>
          </div>

          {/* Title */}
          <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[1.1] tracking-[-0.02em]">
            <span className={`block text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              Frequently Asked
            </span>
            <span className={`mt-2 block text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] italic font-light ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              Questions
            </span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <article
                key={faq.id}
                className={`group rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? isDark 
                      ? 'bg-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
                      : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
                    : isDark 
                      ? 'bg-[#151515] hover:bg-[#1a1a1a]' 
                      : 'bg-[#F5F5F5] hover:bg-[#EFEFEF]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center gap-6 p-6 md:p-8 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {/* Plus/Minus Icon with Rotation Animation */}
                  <div className="flex-shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
                        isOpen
                          ? 'bg-white border-2 border-[#E5E5E5]'
                          : 'bg-[#74F5A1] group-hover:bg-[#5FE08D]'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-[#111111] transition-transform duration-300 ease-in-out ${
                          isOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className={`flex-1 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[18px] md:text-[20px] lg:text-[22px] font-semibold leading-tight ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                    {faq.question}
                  </h3>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pl-[88px] md:pl-[104px]">
                    <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.7] ${isDark ? 'text-gray-300' : 'text-[#555555]'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
