"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../dark/Header";
import Footer from "../dark/Footer";
import "../dark/MainPage.css";

const CASE_STUDIES = {
  "vitacare": {
    id: "vitacare",
    title: "VitaCare",
    subtitle:
      "Transforming healthcare accessibility through an intuitive telemedicine platform that connects patients with specialists in minutes.",
    role: "Senior UX Designer",
    company: "VitaCare",
    timeframe: "6 months",
    tools: ["Figma", "Principle", "UserTesting", "Miro"],
    services: ["Product Design", "UX Research", "Mobile Design"],
    heroImage:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1800&q=80",
    problem:
      "VitaCare's existing platform had a complex booking flow that resulted in high abandonment rates. Patients struggled to find the right specialist and understand appointment availability.",
    goal:
      "Redesign the entire user journey to make healthcare booking as simple as ordering food, while maintaining trust and medical credibility.",
    metrics: [
      { label: "Booking completion", value: "+45%" },
      { label: "User retention", value: "+38%" },
      { label: "Time to book", value: "-52%" },
    ],
    overviewBullets: [
      "Streamlined the booking flow from 7 steps to 3, reducing cognitive load and decision fatigue.",
      "Introduced smart matching algorithm that suggests specialists based on symptoms and patient history.",
      "Built a comprehensive design system that scales across web, iOS, and Android platforms.",
    ],
    processSections: [
      {
        label: "01 — Research",
        title: "Understanding patient pain points",
        text: "We conducted 15 user interviews and analyzed 2,000+ booking sessions to identify friction points. The main issue was information overload — patients were overwhelmed by too many options and unclear pricing.",
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Strategy",
        title: "Simplifying the healthcare journey",
        text: "We redesigned the information architecture to prioritize clarity: symptoms first, then specialist recommendations, then availability. This progressive disclosure approach reduced decision paralysis significantly.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "03 — Design",
        title: "Creating a calming, trustworthy interface",
        text: "The visual design balances medical professionalism with approachability. Soft blues and greens convey health and trust, while micro-interactions provide feedback that makes the process feel smooth and reliable.",
        image:
          "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalScreens: [
      {
        title: "Symptom checker & specialist matching",
        image:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Simplified booking calendar",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Video consultation interface",
        image:
          "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    learnings: [
      "In healthcare, trust is built through clarity and transparency — not through complex features.",
      "Progressive disclosure works exceptionally well for complex domains like healthcare, where users need guidance.",
    ],
    whatsNext: "We're expanding the platform to include AI-powered symptom analysis and integrating with wearable devices for continuous health monitoring.",
  },
  "privilee-website": {
    id: "privilee-website",
    title: "Privilee Website",
    subtitle:
      "Designing a high‑conversion lifestyle membership experience for UAE's premium beach, pool, and fitness clubs.",
    role: "Lead Product Designer",
    company: "Privilee",
    timeframe: "4 months",
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    services: ["Product Design", "UX/UI", "Design Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1800&q=80",
    liveUrl: "https://privilee.ae",
    problem:
      "Privilee's website was visually dated, overloaded with content, and failing to clearly communicate the value of membership to different user segments.",
    goal:
      "Redesign the experience to clarify value, reduce friction in the funnel, and create a scalable system for future campaigns.",
    metrics: [
      { label: "Signup conversion", value: "+32%" },
      { label: "Bounce rate", value: "-21%" },
      { label: "Avg. session time", value: "+18%" },
    ],
    overviewBullets: [
      "Re‑architected the website around a clear story: from 'what is this?' to 'this is for me' in under 10 seconds.",
      "Segmented messaging for families, couples, and solo members, supported by tailored imagery and benefits.",
      "Built a token‑based design system so marketing could launch new landing pages without new design work each time.",
    ],
    processSections: [
      {
        label: "01 — Discovery",
        title: "Finding the friction points in the funnel",
        text: "We combined product analytics with 8 moderated usability sessions to understand where trust broke down. The largest drop‑off happened between the hero and pricing, where users didn't yet understand why Privilee was different from a regular gym membership.",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Strategy",
        title: "Reframing Privilee as a 'daily upgrade'",
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
    whatsNext: "We're exploring personalization per member segment, and an interactive value calculator for users arriving from performance campaigns.",
  },
  "bakkal": {
    id: "bakkal",
    title: "Bakkal",
    subtitle:
      "Redesigning Turkey's fastest-growing grocery delivery app to handle 10x growth while maintaining a delightful user experience.",
    role: "Product Design Lead",
    company: "Bakkal",
    timeframe: "5 months",
    tools: ["Figma", "After Effects", "Hotjar", "Amplitude"],
    services: ["Mobile Design", "UX Strategy", "Design Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=80",
    problem:
      "Bakkal's app couldn't scale with rapid growth. Users experienced slow load times, confusing navigation, and checkout errors during peak hours.",
    goal:
      "Rebuild the app architecture for performance while creating an intuitive shopping experience that feels fast and reliable.",
    metrics: [
      { label: "Order completion", value: "+41%" },
      { label: "App load time", value: "-67%" },
      { label: "User satisfaction", value: "+54%" },
    ],
    overviewBullets: [
      "Redesigned the entire shopping flow with offline-first architecture, allowing users to browse even with poor connectivity.",
      "Introduced smart cart suggestions and quick reorder features that reduced time-to-checkout by 60%.",
      "Created a scalable component library that enabled the engineering team to ship features 3x faster.",
    ],
    processSections: [
      {
        label: "01 — Analysis",
        title: "Identifying performance bottlenecks",
        text: "We analyzed crash reports, performance metrics, and user feedback to identify the core issues. The main problems were: heavy image loading, complex state management, and lack of offline capabilities.",
        image:
          "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Architecture",
        title: "Building for scale and speed",
        text: "We redesigned the data flow to prioritize critical information first. Product images load progressively, cart state is cached locally, and the checkout process works even with intermittent connectivity.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "03 — Experience",
        title: "Making grocery shopping delightful",
        text: "The new design focuses on speed and clarity. Large, scannable product cards, one-tap add-to-cart, and smart category navigation make finding items effortless. Visual feedback and micro-animations make the app feel responsive and polished.",
        image:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalScreens: [
      {
        title: "Home screen with smart recommendations",
        image:
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Product browsing with filters",
        image:
          "https://images.unsplash.com/photo-1556912173-6719e3e1d46f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Streamlined checkout flow",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    learnings: [
      "Performance is a feature — users will abandon a beautiful app if it's slow.",
      "Offline-first design is crucial for delivery apps, especially in areas with unreliable connectivity.",
    ],
    whatsNext: "We're working on AI-powered shopping lists, voice ordering, and predictive delivery scheduling based on user patterns.",
  },
  "ignyte": {
    id: "ignyte",
    title: "Ignyte by DIFC",
    subtitle:
      "Designing a comprehensive fintech platform that simplifies complex financial operations for Dubai's business community.",
    role: "Senior Product Designer",
    company: "DIFC",
    timeframe: "7 months",
    tools: ["Figma", "Framer", "Mixpanel", "Confluence"],
    services: ["Enterprise Design", "UX Research", "Design Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1800&q=80",
    problem:
      "DIFC's financial services were fragmented across multiple platforms, creating confusion and inefficiency for businesses trying to manage their operations.",
    goal:
      "Create a unified platform that consolidates all financial services while maintaining security and regulatory compliance.",
    metrics: [
      { label: "Task completion", value: "+58%" },
      { label: "Support tickets", value: "-43%" },
      { label: "User adoption", value: "+72%" },
    ],
    overviewBullets: [
      "Consolidated 8 separate tools into one cohesive platform, reducing context switching and training time.",
      "Designed role-based dashboards that surface relevant information based on user permissions and responsibilities.",
      "Built a comprehensive design system that ensures consistency across all financial modules while maintaining regulatory compliance.",
    ],
    processSections: [
      {
        label: "01 — Research",
        title: "Mapping the financial ecosystem",
        text: "We interviewed 25+ businesses and conducted workflow analysis to understand how different roles interact with financial services. The key insight: each role needs different information, but they all need to work together seamlessly.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Strategy",
        title: "Unifying without overwhelming",
        text: "We designed a modular architecture where each financial service feels integrated but can be accessed independently. The navigation adapts based on user role, showing only relevant modules and features.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "03 — Design",
        title: "Balancing complexity with clarity",
        text: "The interface uses progressive disclosure to handle complex financial data. Clean typography, clear hierarchy, and strategic use of color help users navigate dense information without feeling overwhelmed. Every interaction includes clear feedback and error states.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalScreens: [
      {
        title: "Unified dashboard with role-based views",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Financial transaction management",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Compliance & reporting interface",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    learnings: [
      "In enterprise fintech, clarity and security are more important than flashy features.",
      "Role-based design is essential when different users have vastly different needs and permissions.",
    ],
    whatsNext: "We're developing advanced analytics dashboards and integrating AI-powered fraud detection to enhance security and provide deeper insights.",
  },
  "privilee-app": {
    id: "privilee-app",
    title: "Privilee App",
    subtitle:
      "Creating a seamless mobile experience that makes booking beach and pool access as effortless as ordering coffee.",
    role: "Mobile Design Lead",
    company: "Privilee",
    timeframe: "5 months",
    tools: ["Figma", "Principle", "TestFlight", "Firebase"],
    services: ["Mobile Design", "iOS/Android", "UX Research"],
    heroImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1800&q=80",
    problem:
      "Privilee's mobile app had a confusing booking flow and poor offline functionality. Members struggled to book last-minute access, especially when connectivity was unreliable at beach locations.",
    goal:
      "Design an app that feels instant and reliable, with offline booking capabilities and clear visual feedback throughout the journey.",
    metrics: [
      { label: "Mobile bookings", value: "+67%" },
      { label: "Booking time", value: "-48%" },
      { label: "App store rating", value: "4.8★" },
    ],
    overviewBullets: [
      "Redesigned the booking flow to be completed in under 30 seconds, with smart defaults and one-tap actions.",
      "Implemented offline-first architecture that allows members to book even without internet, syncing when connection returns.",
      "Created native iOS and Android experiences that feel platform-appropriate while maintaining brand consistency.",
    ],
    processSections: [
      {
        label: "01 — Discovery",
        title: "Understanding mobile booking behavior",
        text: "We observed 12 members using the app in real beach scenarios and discovered that most bookings happen on-the-go, often with poor connectivity. The current app failed in these critical moments.",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Strategy",
        title: "Designing for speed and reliability",
        text: "We prioritized the most common use case: quick, last-minute bookings. The app now defaults to 'today' and 'nearest location', reducing taps by 70%. Offline mode caches venue data and booking history locally.",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "03 — Design",
        title: "Making booking feel effortless",
        text: "The interface uses large touch targets, clear visual hierarchy, and immediate feedback. Swipe gestures for quick actions, haptic feedback for confirmations, and smooth animations make the app feel responsive and delightful.",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalScreens: [
      {
        title: "Quick booking interface",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Venue discovery & map view",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Booking confirmation & QR code",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    learnings: [
      "Mobile apps need to work perfectly in the worst conditions — poor connectivity, bright sunlight, one-handed use.",
      "Offline-first design is not just a nice-to-have for location-based apps, it's essential.",
    ],
    whatsNext: "We're adding social features like group bookings, friend referrals, and personalized venue recommendations based on past visits.",
  },
  "portl": {
    id: "portl",
    title: "Portl",
    subtitle:
      "Designing an intuitive Web3 platform that makes blockchain technology accessible to everyday users without the complexity.",
    role: "Product Design Lead",
    company: "Portl",
    timeframe: "6 months",
    tools: ["Figma", "Webflow", "Dune Analytics", "Discord"],
    services: ["Web3 Design", "UX Strategy", "Design Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1800&q=80",
    problem:
      "Web3 platforms are notoriously difficult for non-technical users. Portl needed to bridge the gap between blockchain complexity and user-friendly design.",
    goal:
      "Create a platform that feels as simple as a traditional app while maintaining the power and transparency of Web3 technology.",
    metrics: [
      { label: "User onboarding", value: "+83%" },
      { label: "Transaction success", value: "+61%" },
      { label: "Daily active users", value: "+94%" },
    ],
    overviewBullets: [
      "Simplified wallet connection and transaction flows, reducing onboarding time from 15 minutes to under 2 minutes.",
      "Introduced clear, plain-language explanations for every blockchain action, removing technical jargon.",
      "Built a design system that balances Web3 aesthetics with mainstream usability, making crypto feel approachable.",
    ],
    processSections: [
      {
        label: "01 — Research",
        title: "Understanding Web3 barriers",
        text: "We interviewed 30+ users who had tried and abandoned other Web3 platforms. The main issues were: confusing terminology, unclear transaction states, and fear of making mistakes with irreversible actions.",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "02 — Strategy",
        title: "Translating blockchain to human language",
        text: "We redesigned every interaction to use familiar patterns from traditional apps. 'Send tokens' instead of 'execute transaction', clear progress indicators, and comprehensive error messages that explain what went wrong and how to fix it.",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=80",
      },
      {
        label: "03 — Design",
        title: "Making Web3 feel safe and simple",
        text: "The interface uses familiar UI patterns with Web3-specific enhancements. Transaction previews show exactly what will happen, confirmation screens are clear and non-technical, and success states celebrate small wins. Visual metaphors help users understand abstract concepts like gas fees and network congestion.",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    finalScreens: [
      {
        title: "Simplified wallet connection",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Token management dashboard",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Transaction flow with clear explanations",
        image:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    learnings: [
      "Web3 doesn't need to feel technical — users care about outcomes, not blockchain mechanics.",
      "Clear communication and error handling are critical when actions are irreversible and mistakes are costly.",
    ],
    whatsNext: "We're building NFT marketplace integration, DeFi yield farming tools, and multi-chain support to expand the platform's capabilities.",
  },
};

export { CASE_STUDIES };

function getCaseStudy(slug) {
  return CASE_STUDIES[slug] ?? CASE_STUDIES["vitacare"];
}

export default function CaseStudyPage({ params }) {
  // Extract slug from params
  const slug = params?.slug || 'vitacare';
  const cs = getCaseStudy(slug);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-theme={theme}>
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          // Moon icon for dark mode
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
          </svg>
        ) : (
          // Sun icon for light mode
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2v2m0 12v2M4.22 4.22l1.42 1.42m8.72 8.72l1.42 1.42M2 10h2m12 0h2M4.22 15.78l1.42-1.42m8.72-8.72l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        )}
      </button>

      <Header theme={theme} />
      <main className={`min-h-screen w-full text-base ${isDark ? 'bg-[#050114] text-white' : 'bg-white text-[#1a1a1a]'}`}>
      {isDark && (
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
          <div className="absolute -top-44 left-[-4rem] h-80 w-80 rounded-full bg-[#F27CE0]/6 blur-3xl" />
          <div className="absolute -top-32 right-[-6rem] h-96 w-96 rounded-full bg-[#37B4FF]/5 blur-[90px]" />
          <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-[#C779FF]/4 blur-[90px]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/1 via-transparent to-transparent" />
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 lg:px-0 lg:py-28">
        <div className={`mb-12 flex items-center justify-between text-lg ${isDark ? 'text-[#A6A0D4]' : 'text-[#666666]'}`}>
          <Link
            href="/case-studies"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] backdrop-blur-md transition-colors ${isDark ? 'border-white/12 bg-white/5 hover:border-white/30 hover:bg-white/10' : 'border-black/10 bg-white hover:border-black/20 hover:bg-[#f5f5f5]'}`}
          >
            <span>←</span> Case Studies
          </Link>
          <span className={`rounded-full px-5 py-2.5 text-sm uppercase tracking-[0.24em] ${isDark ? 'bg-white/5' : 'bg-[#f5f5f5]'}`}>
            {cs.company}
          </span>
        </div>

        <section className="mb-16 md:mb-20">
          <p className={`mb-3 text-lg font-semibold uppercase tracking-[0.36em] ${isDark ? 'text-[#D7C4FF]' : 'text-[#666666]'}`}>
            Case Study
          </p>
          <h1 className={`mb-5 text-[4rem] font-extrabold leading-[1.02] tracking-tight md:text-[5rem] lg:text-[5.5rem] ${isDark ? '' : 'text-[#1a1a1a]'}`}>
            <span className={isDark ? "bg-gradient-to-r from-[#F27CE0] via-[#C779FF] to-[#37B4FF] bg-clip-text text-transparent" : "text-[#1a1a1a]"}>
              {cs.title}
            </span>
          </h1>
          <p className={`max-w-4xl text-[1.8rem] leading-relaxed md:text-[2rem] ${isDark ? 'text-[#DCD6F4]' : 'text-[#4a4a4a]'}`}>
            {cs.subtitle}
          </p>
        </section>

        <section className={`mb-20 overflow-hidden rounded-[38px] border shadow-[0_48px_140px_rgba(0,0,0,0.96)] ${isDark ? 'border-white/12 bg-white/5' : 'border-black/10 bg-white'}`}>
          <div className="relative aspect-[16/7] w-full">
            <Image
              src={cs.heroImage}
              alt={cs.title}
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className={`pointer-events-none absolute inset-x-10 bottom-7 flex items-center justify-between text-lg ${isDark ? 'text-[#EFE9FF]' : 'text-white'}`}>
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md transition-colors ${isDark ? 'bg-black/50 hover:bg-black/70' : 'bg-black/60 hover:bg-black/80'}`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
                  Live product ↗
                </a>
              )}
              <span className={`hidden rounded-full px-4 py-1.5 backdrop-blur-md md:inline ${isDark ? 'bg-black/50' : 'bg-black/60'}`}>
                Role: {cs.role}
              </span>
            </div>
          </div>
        </section>

        <section className="mb-24 grid gap-14 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-start">
          <div>
            <h2 className={`mb-4 text-xl font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-[#D7C4FF]' : 'text-[#666666]'}`}>
              Project Overview
            </h2>
            <p className={`mb-4 text-[1.3rem] leading-relaxed ${isDark ? 'text-[#E2DCF9]' : 'text-[#4a4a4a]'}`}>
              {cs.problem}
            </p>
            <p className={`mb-7 text-[1.3rem] leading-relaxed ${isDark ? 'text-[#E2DCF9]' : 'text-[#4a4a4a]'}`}>
              {cs.goal}
            </p>
            <ul className={`space-y-3.5 text-[1.3rem] ${isDark ? 'text-[#EAE4FF]' : 'text-[#4a4a4a]'}`}>
              {cs.overviewBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className={`mt-[12px] h-[3px] w-[24px] rounded-full ${isDark ? 'bg-gradient-to-r from-[#37B4FF] via-[#C779FF] to-[#F27CE0] shadow-[0_0_22px_rgba(129,140,248,0.9)]' : 'bg-[#1a1a1a]'}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`space-y-7 rounded-3xl border px-7 py-8 text-[1.1rem] shadow-[0_32px_100px_rgba(0,0,0,0.85)] backdrop-blur-md ${isDark ? 'border-white/10 bg-white/5 text-[#F1ECFF]' : 'border-black/10 bg-[#f5f5f5] text-[#1a1a1a]'}`}>
            <div className="grid grid-cols-2 gap-5">
              <OverviewItem label="Role" value={cs.role} isDark={isDark} />
              <OverviewItem label="Company" value={cs.company} isDark={isDark} />
              <OverviewItem label="Timeframe" value={cs.timeframe} isDark={isDark} />
              <OverviewItem label="Services" value={cs.services.join(", ")} isDark={isDark} />
            </div>
            <Divider isDark={isDark} />
            <div className="grid grid-cols-2 gap-5">
              <OverviewItem label="Tools" value={cs.tools.join(", ")} isDark={isDark} />
              <div>
                <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-[#AAA0EA]' : 'text-[#666666]'}`}>
                  Key metrics
                </p>
                <div className="space-y-2">
                  {cs.metrics.map((m) => (
                    <p key={m.label}>
                      <span className={`font-semibold text-xl ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
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
                <p className={`mb-3 text-base font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-[#AAA0EA]' : 'text-[#666666]'}`}>
                  {block.label}
                </p>
                <h3 className={`mb-4 text-[2.2rem] font-semibold md:text-[2.4rem] ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  {block.title}
                </h3>
                <p className={`text-[1.3rem] leading-relaxed ${isDark ? 'text-[#E2DCF9]' : 'text-[#4a4a4a]'}`}>
                  {block.text}
                </p>
              </div>
              <div className={`overflow-hidden rounded-[30px] border shadow-[0_36px_110px_rgba(0,0,0,0.95)] ${isDark ? 'border-white/12 bg-white/5' : 'border-black/10 bg-white'}`}>
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
              <h2 className={`text-xl font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-[#D7C4FF]' : 'text-[#666666]'}`}>
                Final Experience
              </h2>
              <p className={`mt-3 text-[1.3rem] ${isDark ? 'text-[#E7E0FF]' : 'text-[#4a4a4a]'}`}>
                A modular, glowy interface that keeps the brand premium while
                driving measurable business outcomes.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {cs.finalScreens.map((screen) => (
              <div
                key={screen.title}
                className={`overflow-hidden rounded-[28px] border shadow-[0_30px_100px_rgba(0,0,0,0.9)] ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white'}`}
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
                  <p className={`text-lg font-medium ${isDark ? 'text-[#F3EDFF]' : 'text-[#1a1a1a]'}`}>
                    {screen.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-32 grid gap-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <div>
            <h2 className={`mb-4 text-xl font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-[#D7C4FF]' : 'text-[#666666]'}`}>
              Impact & Learnings
            </h2>
            <ul className={`space-y-4 text-[1.3rem] leading-relaxed ${isDark ? 'text-[#E2DCF9]' : 'text-[#4a4a4a]'}`}>
              {cs.learnings.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className={`mt-[12px] h-[3px] w-[24px] rounded-full ${isDark ? 'bg-gradient-to-r from-[#37B4FF] to-[#F27CE0] shadow-[0_0_22px_rgba(129,140,248,0.9)]' : 'bg-[#1a1a1a]'}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-3xl border px-7 py-8 text-[1.3rem] shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-md ${isDark ? 'border-white/10 bg-white/5 text-[#F3EEFF]' : 'border-black/10 bg-[#f5f5f5] text-[#1a1a1a]'}`}>
            <p className={`mb-3 text-base font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-[#AAA0EA]' : 'text-[#666666]'}`}>
              What's next
            </p>
            <p className="mb-5 leading-relaxed">
              {cs.whatsNext || "We're continuing to iterate and improve the experience based on user feedback and data insights."}
            </p>
            <Link
              href="/case-studies"
              className={`inline-flex items-center gap-2 text-base font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-[#F9EBFF] hover:text-white' : 'text-[#1a1a1a] hover:text-[#4a4a4a]'}`}
            >
              View more case studies →
            </Link>
          </div>
        </section>

        <section className={`border-t pt-14 pb-8 text-center ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <p className={`text-[1.3rem] ${isDark ? 'text-[#AFA8D6]' : 'text-[#4a4a4a]'}`}>
            Have a product, platform, or membership that needs this level of UX
            and UI thinking?
          </p>
          <Link
            href="/contact"
            className={`mt-7 inline-flex items-center justify-center rounded-full border px-10 py-4 text-base font-semibold uppercase tracking-[0.26em] shadow-[0_26px_80px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors ${isDark ? 'border-white/30 bg-white/12 text-white hover:bg-white/18' : 'border-black/20 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'}`}
          >
            Let's talk about your project
          </Link>
        </section>
      </div>
    </main>
    <Footer theme={theme} />
    </div>
  );
}

function OverviewItem({ label, value, isDark = true }) {
  return (
    <div>
      <p className={`mb-1 text-base font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-[#AAA0EA]' : 'text-[#666666]'}`}>
        {label}
      </p>
      <p className={`text-[1.2rem] leading-snug ${isDark ? 'text-[#F5F0FF]' : 'text-[#1a1a1a]'}`}>{value}</p>
    </div>
  );
}

function Divider({ isDark = true }) {
  return (
    <div className={`h-px w-full ${isDark ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'}`} />
  );
}