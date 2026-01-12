"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Lock, Eye, FileText, Mail, Calendar } from "lucide-react";
import Header from "../../../components/dark/Header";
import Footer from "../../../components/dark/Footer";
import "../../../components/dark/MainPage.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRIVACY_SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FileText,
    content: `At Dapper ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.`,
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    icon: Eye,
    content: `We collect information that you provide directly to us, including:
- Personal identification information (name, email address, phone number)
- Business information (company name, job title)
- Communication data (messages, inquiries, feedback)
- Usage data (how you interact with our website)
- Technical data (IP address, browser type, device information)
- Cookies and tracking technologies data`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: Lock,
    content: `We use the information we collect to:
- Provide, maintain, and improve our services
- Process your requests and transactions
- Send you marketing communications (with your consent)
- Respond to your inquiries and provide customer support
- Analyze website usage and trends
- Detect, prevent, and address technical issues
- Comply with legal obligations
- Protect our rights and prevent fraud`,
  },
  {
    id: "data-sharing",
    title: "Data Sharing and Disclosure",
    icon: Shield,
    content: `We do not sell your personal information. We may share your information only in the following circumstances:
- With service providers who assist us in operating our website and conducting our business
- When required by law or to respond to legal process
- To protect our rights, privacy, safety, or property
- In connection with a business transfer (merger, acquisition, etc.)
- With your explicit consent`,
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: Shield,
    content: `Depending on your location, you may have the following rights regarding your personal information:
- Right to access: Request copies of your personal data
- Right to rectification: Request correction of inaccurate data
- Right to erasure: Request deletion of your data
- Right to restrict processing: Request limitation of data processing
- Right to data portability: Request transfer of your data
- Right to object: Object to processing of your data
- Right to withdraw consent: Withdraw previously given consent

To exercise these rights, please contact us at hello@dapper.agency`,
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    icon: Eye,
    content: `We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.`,
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    icon: FileText,
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: Shield,
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`,
  },
  {
    id: "international",
    title: "International Data Transfers",
    icon: Lock,
    content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to the transfer of your information to our facilities and those third parties with whom we share it as described in this policy.`,
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    icon: Calendar,
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted on this page.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    content: `If you have any questions about this Privacy Policy, please contact us:

Email: hello@dapper.agency
Phone: +31 10 307 6707
Address: Weena 70, 13th floor, 3012 CM Rotterdam, Netherlands`,
  },
];

export default function PrivacyPolicyPage() {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Animate sections on scroll
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.from(section, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            ease: "power3.out",
            delay: index * 0.1,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [theme]);

  const isDark = theme === "dark";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      style={{ position: "relative", zIndex: 1 }}
      data-theme={theme}
      className={isDark ? "bg-[#0a0a0a]" : "bg-white"}
    >
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2v2m0 12v2M4.22 4.22l1.42 1.42m8.72 8.72l1.42 1.42M2 10h2m12 0h2M4.22 15.78l1.42-1.42m8.72-8.72l1.42-1.42"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="10"
              cy="10"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}
      </button>

      <Header theme={theme} />

      <main
        ref={containerRef}
        className={`relative min-h-screen py-20 md:py-24 overflow-hidden ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-20 left-10 w-64 h-64 rounded-full ${
              isDark ? "bg-[#74F5A1]/5" : "bg-[#3BC972]/5"
            } blur-3xl animate-pulse`}
          />
          <div
            className={`absolute bottom-20 right-10 w-96 h-96 rounded-full ${
              isDark ? "bg-[#74F5A1]/3" : "bg-[#3BC972]/3"
            } blur-3xl animate-pulse`}
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(${
                isDark ? "#74F5A1" : "#3BC972"
              } 1px, transparent 1px), linear-gradient(90deg, ${
                isDark ? "#74F5A1" : "#3BC972"
              } 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24">
            <div
              ref={titleRef}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <Shield
                className={`w-10 h-10 md:w-12 md:h-12 ${
                  isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                }`}
              />
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold"
                style={{
                  fontFamily: "Fellix, -apple-system, sans-serif",
                }}
              >
                Privacy Policy
              </h1>
            </div>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              style={{
                fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
              }}
            >
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your information.
            </p>
            <p
              className={`text-base ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
              style={{
                fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
              }}
            >
              Last Updated: {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Table of Contents - Sticky Sidebar on Desktop */}
          <div className="lg:flex lg:gap-16 xl:gap-20">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-80 xl:w-96 lg:flex-shrink-0">
              <div
                className={`sticky top-24 p-8 rounded-[8px] border ${
                  isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/80 border-black/10"
                }`}
              >
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  Contents
                </h2>
                <nav className="space-y-3">
                  {PRIVACY_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-[4px] text-base transition-all flex items-center gap-3 ${
                          activeSection === section.id
                            ? isDark
                              ? "bg-[#74F5A1]/20 text-[#74F5A1] border border-[#74F5A1]/30"
                              : "bg-[#3BC972]/20 text-[#3BC972] border border-[#3BC972]/30"
                            : isDark
                            ? "text-gray-300 hover:bg-black/60 hover:text-white border border-transparent"
                            : "text-gray-600 hover:bg-white hover:text-black border border-transparent"
                        }`}
                        style={{
                          fontFamily:
                            "Helvetica Now Text, Helvetica, Arial, sans-serif",
                        }}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {PRIVACY_SECTIONS.map((section, index) => {
                const Icon = section.icon;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    className="mb-16 scroll-mt-24"
                  >
                    <div
                      className={`p-8 md:p-10 lg:p-12 rounded-[8px] border transition-all ${
                        isDark
                          ? "bg-black/40 border-white/10 hover:border-[#74F5A1]/30 hover:bg-black/50"
                          : "bg-white/80 border-black/10 hover:border-[#3BC972]/30 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`p-3 rounded-[6px] ${
                            isDark
                              ? "bg-[#74F5A1]/10 text-[#74F5A1]"
                              : "bg-[#3BC972]/10 text-[#3BC972]"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <h2
                          className="text-3xl md:text-4xl font-bold"
                          style={{
                            fontFamily: "Fellix, -apple-system, sans-serif",
                          }}
                        >
                          {section.title}
                        </h2>
                      </div>
                      <div
                        className={`prose prose-base md:prose-lg max-w-none ${
                          isDark
                            ? "prose-invert text-gray-300"
                            : "text-gray-700"
                        }`}
                        style={{
                          fontFamily:
                            "Helvetica Now Text, Helvetica, Arial, sans-serif",
                        }}
                      >
                        <div className="whitespace-pre-line leading-relaxed text-base md:text-lg">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}

              {/* Back to Top / Contact CTA */}
              <div
                className={`mt-20 p-10 md:p-12 rounded-[8px] border text-center ${
                  isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/80 border-black/10"
                }`}
              >
                <h3
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  Questions About Privacy?
                </h3>
                <p
                  className={`mb-8 text-lg ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={{
                    fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                  }}
                >
                  If you have any questions or concerns about this Privacy Policy,
                  please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a
                    href="mailto:hello@dapper.agency"
                    className={`group flex items-center gap-3 px-8 py-4 rounded-[4px] font-semibold transition-all duration-300 text-base ${
                      isDark
                        ? "bg-[#74F5A1] text-black hover:bg-[#5FE08D] hover:scale-105"
                        : "bg-[#3BC972] text-white hover:bg-[#2FA85F] hover:scale-105"
                    }`}
                    style={{
                      fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                    }}
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact Us</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M1 13L13 1M13 1H5M13 1V9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <Link
                    href="/"
                    className={`group flex items-center gap-3 px-8 py-4 rounded-[4px] font-semibold transition-all duration-300 border text-base ${
                      isDark
                        ? "border-white/20 bg-black/40 text-white hover:bg-black/60 hover:border-white/30"
                        : "border-black/20 bg-white/80 text-black hover:bg-white hover:border-black/30"
                    } hover:scale-105`}
                    style={{
                      fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                    }}
                  >
                    <span>Back to Home</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

