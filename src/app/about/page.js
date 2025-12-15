'use client';

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = React.useRef(null);

  useGSAP(() => {
    // Hero animations
    gsap.timeline()
      .from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' })
      .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
      .from('.hero-paragraph', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5');

    // Value sections animations
    gsap.utils.toArray('.value-section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    });

    // Leaders section
    gsap.from('.leaders-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.leaders-section',
        start: 'top 80%',
      },
    });
    gsap.from('.team-card', {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.leaders-section',
        start: 'top 80%',
      },
    });

    // Investors section
    gsap.from('.investors-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.investors-section',
        start: 'top 80%',
      },
    });
    gsap.from('.investor-card', {
      opacity: 0,
      scale: 0.9,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: '.investors-section',
        start: 'top 80%',
      },
    });
    gsap.from('.advisor-card', {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.advisory-section',
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="hero-title text-4xl md:text-6xl font-bold leading-tight">
            A Different Kind of Logistics Technology Company | The Yard Reinvented
          </h1>
          <h2 className="hero-subtitle mt-8 text-xl md:text-2xl text-gray-600">About Terminal</h2>
          <p className="hero-paragraph mt-12 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Terminal is a different kind of logistics technology company. We exist to create a new industry standard in yard operations by completely rethinking what that yard of future will be - from fragmented bottleneck into a scalable, strategic advantage.
          </p>
        </div>
      </section>

      {/* Value Section 1 */}
      <section className="value-section py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-600">01 Built by the industry, for the industry</h3>
          <p className="mt-6 text-lg md:text-xl leading-relaxed">
            Every day, over <strong>$50 billion of goods move through 50,000+ U.S. warehouses</strong> — yet 35% of that supply chain stalls in the yard. While transportation and warehouse systems have modernized, the yard remains the industry’s blind spot, still run on clipboards, spreadsheets, and outdated IoT. The result? Bottlenecks, wasted labor, and millions lost in inefficiency.
          </p>
        </div>
      </section>

      {/* Value Section 2 */}
      <section className="value-section py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-600">02 Based on a proven category creation playbook</h3>
          <p className="mt-6 text-lg md:text-xl leading-relaxed">
            <strong>Terminal is reinventing the yard.</strong> We are building the industry’s first <strong>AI-native, Computer Vision–powered Yard Operating System (YOS)</strong> — designed to digitize, automate, and optimize yard operations end to end. Our platform connects cameras, data, and workflows into one seamless layer of visibility and control. From <strong>gate acceleration</strong> to <strong>asset inventory, compliance, orchestration, analytics, YMS-reimagined</strong>, Terminal delivers rapid ROI: reducing costs, accelerating throughput, and unlocking new revenue opportunities for the world’s largest logistics operators.
          </p>
        </div>
      </section>

      {/* Value Section 3 */}
      <section className="value-section py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-600">03 Positioned as the standard</h3>
          <p className="mt-6 text-lg md:text-xl leading-relaxed">
            With backing from leading investors and partnerships with several of the top 10 logistics companies, Terminal is <strong>building with the industry, for the industry</strong> — setting the new standard for yard technology.
          </p>
        </div>
      </section>

      {/* Leaders Section */}
      <section className="leaders-section py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="leaders-title text-4xl md:text-5xl font-bold text-center">Our Leaders</h2>
          <h3 className="mt-6 text-3xl font-bold text-center">
            <strong>Powered</strong> by <strong>innovators</strong> in tech & <strong>experts</strong> in logistics
          </h3>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto text-center">
            Terminal leaders drive towards a combined mission with extreme ownership, smart execution, and passionate innovation. Meet the strategic problem solvers at the helm:
          </p>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-bold">Darin Brannan</h4>
              <p className="text-blue-600 font-semibold">Chief Executive Officer</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                Darin is a proven founder-operator and repeat CEO with a 25+ year track record scaling SaaS and infrastructure platforms from zero to category leadership, resulting in successful IPOs and multi-billion-dollar outcomes. He has raised $1.25B in capital, led 35+ acquisitions, and built three breakout companies: Verio (IPO at $1B, acquired for $6.2B; also launched VIAnet, with a carve-out IPO at $3.2B), Web.com (IPO at $2B), and ClearDATA (healthcare cloud category leader). Earlier, Darin spent nearly a decade in leading Silicon Valley VC firms - Norwest Venture Partners and Burr, Egan, Deleage & Co.; and has since advised and led buy-and-build strategies for PE platforms including Blackstone, Tritium, and Blue Sea Capital. He also enjoys investing/advising in high-growth companies at the intersection of AI, healthtech, logistics, and vertical SaaS—shaping the future of automation and intelligent systems. He holds a B.S. from Embry-Riddle Aeronautical Univ. and an MBA in Int’l. Studies (Paris) from UofH. As CEO, Darin is driven to reinvent the yard by leading the creation of a category-defining platform to transform yard logistics. Powered by breakthrough technology and an elite team, Terminal is making the $50B-a-day flow of goods faster, cleaner, and more cost-effective—rewiring how the world moves.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-bold">Chris Brumett</h4>
              <p className="text-blue-600 font-semibold">Chief Product Officer</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                As Chief Product Officer, Chris is driven to reinvent the yard by bringing a strong voice of the customer deep into the fabric of company operations.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-bold">Kris Evans</h4>
              <p className="text-blue-600 font-semibold">Chief Technology Officer</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                As Head of Engineering, Kris is driven to reinvent the yard by making cutting-edge AI computer vision tech and sophisticated data-driven platforms accessible to everyday operators.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-bold">Corbin Howes</h4>
              <p className="text-blue-600 font-semibold">Chief Financial Officer</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                As CFO, Corbin is driven to reinvent the yard by ensuring we deliver meaningful ROI to the market and that we can continue to drive smart execution for our customers and shareholders.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-bold">Josh Kivenko</h4>
              <p className="text-blue-600 font-semibold">Chief Marketing Officer</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                As CMO, Josh is driven to reinvent the yard by building a winning brand that connects critical customer needs to the magic of Terminal's technology.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-2xl font-bold">Tristan Andrews</h4>
              <p className="text-blue-600 font-semibold">People Operations Manager</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                As Head of People, Tristan is driven to reinvent the yard by assembling the right team of technology and logistics experts and by fostering a culture of purposeful innovation.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <h4 className="text-2xl font-bold">Jeff Martin</h4>
              <p className="text-blue-600 font-semibold">VP of Revenue & Operations</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                As VP of Revenue, Jeff is driven to reinvent the yard by fostering strategic customer and channel relationships based on respect for cutting-edge technology and deep logistics expertise.
              </p>
            </div>
            <div className="team-card bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-2">
              <h4 className="text-2xl font-bold">Imry Atzmon</h4>
              <p className="text-blue-600 font-semibold">Head of Delivery</p>
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                Imry is a product delivery leader focused on driving successful implementations of AI and Computer Vision platforms in real-world environments. As Head of Field Operations and Delivery at Terminal, he leads product deployments, delivery partnerships, execution, and enterprise adoption. His background includes executive roles at AnyVision/Oosto, GO-OUT, and the Israel Airport Authority, where he built global teams, partnerships and scaled major customer deployments across tech ecosystems and vision AI products. Imry holds a BA from Tel Aviv University. As Head of Delivery, Imry is driven to reinvent the yard, he aligns technology and execution to exceed customer expectations, operational goals and unlock new opportunities for growth and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investors and Advisors Section */}
      <section className="investors-section py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="investors-title text-4xl md:text-5xl font-bold text-center">Our Investors and Advisors</h2>
          <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto text-center">
            Our founders, investors, and advisors are driven by the critical need to create an industry standard in the yard. They see us challenging conventions, solving problems that matter, and delivering products that revolutionize the way logistics works.
          </p>
          <div className="mt-16 grid md:grid-cols-2 gap-16">
            <div className="investor-card bg-gray-50 p-10 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold">Joe Lonsdale</h3>
              <p className="text-blue-600 font-semibold">Lead Investor</p>
              <p className="mt-6 text-gray-700 text-sm leading-relaxed">
                Founder of Palantir, 8VC, and multiple billion-dollar companies. Known for investments in tech and philanthropy.
              </p>
            </div>
            <div className="investor-card bg-gray-50 p-10 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold">Jake Medwell</h3>
              <p className="text-blue-600 font-semibold">Lead Investor</p>
              <p className="mt-6 text-gray-700 text-sm leading-relaxed">
                Co-founder of 8VC, previously founded BATON (acquired by Ryder) and other successful ventures.
              </p>
            </div>
          </div>
          <p className="mt-12 text-xl text-gray-600 max-w-4xl mx-auto text-center">
            Backed by prominent industry leaders who saw us challenging conventions, solving problems that matter, and delivering products that truly make a difference - and decided to come along for the ride.
          </p>
          <div className="advisory-section mt-20">
            <h3 className="text-3xl font-bold text-center mb-12">Industry Strategic Advisory Board</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="advisor-card bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h4 className="text-2xl font-bold">Shaleen Devgun</h4>
                <p className="text-gray-600 mt-2">Schneider, Diamond, Deloitte</p>
              </div>
              <div className="advisor-card bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h4 className="text-2xl font-bold">Andy Clarke</h4>
                <p className="text-gray-600 mt-2">C.H. Robinson, Arrive, DCLI</p>
              </div>
              <div className="advisor-card bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h4 className="text-2xl font-bold">Alan Gershenhorn</h4>
                <p className="text-gray-600 mt-2">UPS, Coyote, Marken, Transportation Insights</p>
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                  Alan Gershenhorn is a highly experienced executive in the logistics and transportation industry. He currently holds positions on the boards of directors for Transportation Insight and OTR Solutions and is a strategic advisor to 8VC, a venture capital fund, and some of their logistics technology portfolio companies. Additionally, he is a Principal of Horn Strategy Partners, LLC, providing advisory services to technology and logistics businesses. Prior to his current roles, Gershenhorn had a distinguished 39-year career at United Parcel Service (UPS), where he retired in June 2018 as the Executive Vice President and Chief Commercial Officer. In this role, he was responsible for global strategy, corporate development, mergers and acquisitions, sales, marketing, public affairs, and key growth initiatives, including the oversight of Coyote Logistics and Marken. In addition, he more recently held positions on the board of directors of Cargojet Inc. and Beacon Roofing Supply, Inc. He began his career at UPS in 1979 as a part-time package handler and held numerous leadership positions, including President of UPS International and Chief Sales, Marketing, and Strategy Officer. He played a significant role in transforming UPS from a U.S.-centric small package delivery company into a global leader in tech enabled logistics and supply chain solutions. Gershenhorn holds a finance degree from the University of Houston.
                </p>
              </div>
              <div className="advisor-card bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h4 className="text-2xl font-bold">Will Urban</h4>
                <p className="text-gray-600 mt-2">Flexport, Expeditors International</p>
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                  Will Urban is a seasoned supply chain executive, investor, and advisor with more than three decades of global logistics leadership. He most recently served as Chief Revenue Officer at Flexport, where he scaled revenue from $600M to $5B in four years, and previously spent 17 years at Expeditors International in senior roles including Regional Vice President for the Northwest United States. Urban currently partners with early- and growth-stage founders through his advisory and venture work with R7 Ventures, Companyon Ventures, and Nine Realms, where he focuses on scaling go-to-market execution and empowering the next generation of supply chain innovators. Urban holds extensive board and advisory experience across multiple logistics and technology companies, bringing deep expertise in customer-centric growth, operational scaling, and global market expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gray-50 text-center">
        <h2 className="text-4xl md:text-6xl font-bold">Ready to make goods flow?</h2>
        <div className="mt-16 text-4xl text-gray-300">----------------------------------------------------------------------------------------------------</div>
      </section>
    </div>
  );
}