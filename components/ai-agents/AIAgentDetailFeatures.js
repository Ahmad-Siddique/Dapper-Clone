"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Check, 
  Zap, 
  Shield, 
  Clock, 
  Globe, 
  BarChart3, 
  Settings, 
  Brain,
  Code,
  Database,
  Cloud,
  Lock,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  Calendar as CalendarIcon
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon mapping for features
const featureIcons = {
  '24/7 Availability': Clock,
  'Multi-language Support': Globe,
  'Multi-language': Globe,
  'CRM Integration': Database,
  'Sentiment Analysis': Brain,
  'Custom Training': Settings,
  'Analytics Dashboard': BarChart3,
  'SEO Optimized': TrendingUp,
  'Multiple Formats': FileText,
  'Brand Voice': Sparkles,
  'Plagiarism Check': Shield,
  'Content Calendar': CalendarIcon,
  'Real-time Analysis': BarChart3,
  'Visual Reports': BarChart3,
  'Predictive Insights': TrendingUp,
  'Custom Dashboards': BarChart3,
  'Data Export': Database,
  'Alert System': Shield,
  'Auto-respond': Zap,
  'Smart Scheduling': Clock,
  'Priority Sorting': TrendingUp,
  'Email Templates': FileText,
  'Calendar Sync': CalendarIcon,
  'Follow-up Reminders': Clock,
  'Multi-platform': Globe,
  'Auto-posting': Zap,
  'Analytics': BarChart3,
  'Engagement Tracking': Users,
  'Hashtag Research': TrendingUp,
  'Content Suggestions': Sparkles,
  'Bug Detection': Shield,
  'Best Practices': Check,
  'Security Scan': Lock,
  'Performance Analysis': BarChart3,
  'Code Suggestions': Code,
  'Style Checking': Code,
  'Resume Screening': FileText,
  'Interview Scheduling': Clock,
  'Candidate Ranking': TrendingUp,
  'Skill Assessment': Brain,
  'Background Check': Shield,
  'Onboarding': Users,
  'Inventory Tracking': Database,
  'Recommendations': Sparkles,
  'Sales Analytics': BarChart3,
  'Price Optimization': TrendingUp,
  'Cart Recovery': Zap,
  'Customer Insights': Brain,
};


export default function AIAgentDetailFeatures({ agent, theme = 'light' }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuresRef = useRef([]);
  const integrationsRef = useRef(null);
  const techStackRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animate feature cards
      featuresRef.current.forEach((ref, index) => {
        if (ref) {
          gsap.from(ref, {
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      // Animate integrations section
      if (integrationsRef.current) {
        gsap.from(integrationsRef.current.children, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: integrationsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Animate tech stack section
      if (techStackRef.current) {
        gsap.from(techStackRef.current.children, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [theme, agent]);

  const getFeatureIcon = (featureName) => {
    const IconComponent = featureIcons[featureName] || Zap;
    return IconComponent;
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-20 md:py-32 border-b ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full ${isDark ? 'bg-[#74F5A1]/3' : 'bg-[#3BC972]/3'} blur-3xl`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full ${isDark ? 'bg-[#74F5A1]/3' : 'bg-[#3BC972]/3'} blur-3xl`} />
      </div>

      <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className={`text-xs font-bold uppercase tracking-widest font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] px-4 py-2 rounded-full border ${
                isDark 
                  ? 'bg-[#74F5A1]/10 border-[#74F5A1]/30 text-[#74F5A1]' 
                  : 'bg-[#3BC972]/10 border-[#3BC972]/30 text-[#3BC972]'
              }`}>
                Features & Capabilities
              </span>
            </div>
            <h2 className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-8 ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}>
              Powerful Features
            </h2>
            <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}>
              Everything you need to automate, optimize, and scale your operations
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {agent.features.map((feature, index) => {
              const IconComponent = getFeatureIcon(feature);
              return (
                <div
                  key={index}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className={`group relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isDark 
                      ? 'bg-black/40 border-white/10 hover:border-[#74F5A1]/50 hover:bg-black/60' 
                      : 'bg-white border-black/10 hover:border-[#3BC972]/50 hover:bg-black/5'
                  } hover:shadow-2xl hover:-translate-y-2`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#74F5A1]/5 to-transparent' 
                      : 'bg-gradient-to-br from-[#3BC972]/5 to-transparent'
                  }`} />

                  {/* Icon */}
                  <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 ${
                    isDark 
                      ? 'bg-[#74F5A1]/10 group-hover:bg-[#74F5A1]/20' 
                      : 'bg-[#3BC972]/10 group-hover:bg-[#3BC972]/20'
                  } group-hover:scale-110 group-hover:rotate-3`}>
                    <IconComponent className={`w-7 h-7 transition-colors duration-500 ${
                      isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'
                    }`} />
                  </div>

                  {/* Feature Name */}
                  <h4 className={`relative font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 ${
                    isDark ? 'text-white group-hover:text-[#74F5A1]' : 'text-[#111111] group-hover:text-[#3BC972]'
                  }`}>
                    {feature}
                  </h4>

                  {/* Feature Description */}
                  <p className={`relative text-base md:text-lg font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-relaxed ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Advanced {feature.toLowerCase()} capabilities designed to enhance your workflow and productivity.
                  </p>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#74F5A1]/10 to-transparent' 
                      : 'bg-gradient-to-br from-[#3BC972]/10 to-transparent'
                  }`} style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                </div>
              );
            })}
          </div>

          {/* Integrations & Tech Stack Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Integrations */}
            {agent.integrations && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isDark ? 'bg-[#74F5A1]/10' : 'bg-[#3BC972]/10'
                  }`}>
                    <Database className={`w-6 h-6 ${isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'}`} />
                  </div>
                  <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
                    isDark ? 'text-white' : 'text-[#111111]'
                  }`}>
                    Integrations
                  </h3>
                </div>
                <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg md:text-xl mb-8 ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}>
                  Seamlessly connect with your favorite tools and platforms
                </p>
                <div ref={integrationsRef} className="flex flex-wrap gap-3">
                  {agent.integrations.map((integration, index) => (
                    <div
                      key={index}
                      className={`group px-6 py-3 rounded-xl border font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        isDark
                          ? 'bg-black/40 border-white/20 text-white/90 hover:border-[#74F5A1]/50 hover:bg-[#74F5A1]/10 hover:text-[#74F5A1]'
                          : 'bg-white border-black/20 text-black/90 hover:border-[#3BC972]/50 hover:bg-[#3BC972]/10 hover:text-[#3BC972]'
                      } hover:scale-105 hover:shadow-lg`}
                    >
                      {integration}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {agent.techStack && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isDark ? 'bg-[#74F5A1]/10' : 'bg-[#3BC972]/10'
                  }`}>
                    <Code className={`w-6 h-6 ${isDark ? 'text-[#74F5A1]' : 'text-[#3BC972]'}`} />
                  </div>
                  <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] ${
                    isDark ? 'text-white' : 'text-[#111111]'
                  }`}>
                    Tech Stack
                  </h3>
                </div>
                <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-lg md:text-xl mb-8 ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}>
                  Built with cutting-edge technology for maximum performance
                </p>
                <div ref={techStackRef} className="flex flex-wrap gap-3">
                  {agent.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className={`group px-6 py-3 rounded-xl font-mono text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        isDark
                          ? 'bg-[#74F5A1]/10 border border-[#74F5A1]/30 text-[#74F5A1] hover:bg-[#74F5A1]/20 hover:border-[#74F5A1]/50'
                          : 'bg-[#3BC972]/10 border border-[#3BC972]/30 text-[#3BC972] hover:bg-[#3BC972]/20 hover:border-[#3BC972]/50'
                      } hover:scale-105 hover:shadow-lg`}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
