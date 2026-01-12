"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calculator, Check, ArrowRight, Mail, Bot, Globe, Sparkles, Smartphone, Code, Cloud, Database, Shield } from "lucide-react";
import Header from "../../../components/dark/Header";
import Footer from "../../../components/dark/Footer";
import "../../../components/dark/MainPage.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: "chatbot",
    name: "Chatbot Development",
    icon: Bot,
    basePrice: 8000,
    unit: "one-time + monthly",
    description: "AI-powered chatbots for customer support and automation",
    options: [
      { 
        label: "Basic", 
        multiplier: 1, 
        features: [
          "Simple Q&A chatbot",
          "Basic integrations (1-2 platforms)",
          "Up to 50 conversations/month",
          "Email support",
          "Basic analytics"
        ] 
      },
      { 
        label: "Professional", 
        multiplier: 2, 
        features: [
          "Advanced AI chatbot with NLP",
          "Multiple integrations (5+ platforms)",
          "Up to 500 conversations/month",
          "Custom training on your data",
          "Priority support",
          "Advanced analytics & reporting"
        ] 
      },
      { 
        label: "Enterprise", 
        multiplier: 3.5, 
        features: [
          "Custom AI chatbot with deep learning",
          "Unlimited integrations",
          "Unlimited conversations",
          "Multi-language support",
          "Custom AI model training",
          "Dedicated support team",
          "White-label solution",
          "API access"
        ] 
      },
    ],
  },
  {
    id: "website-development",
    name: "Website Development",
    icon: Globe,
    basePrice: 12000,
    unit: "one-time",
    description: "Custom website development from design to deployment",
    options: [
      { 
        label: "Starter", 
        multiplier: 1, 
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic SEO setup",
          "Contact form",
          "3 months support",
          "Basic CMS integration"
        ] 
      },
      { 
        label: "Business", 
        multiplier: 2, 
        features: [
          "Up to 15 pages",
          "Custom design & animations",
          "Advanced SEO optimization",
          "E-commerce integration",
          "6 months support",
          "Full CMS integration",
          "Performance optimization",
          "Analytics setup"
        ] 
      },
      { 
        label: "Enterprise", 
        multiplier: 3.5, 
        features: [
          "Unlimited pages",
          "Fully custom design & development",
          "Enterprise SEO & performance",
          "Custom e-commerce solution",
          "12 months support & maintenance",
          "Custom CMS development",
          "Multi-language support",
          "Advanced security features",
          "Dedicated project manager"
        ] 
      },
    ],
  },
  {
    id: "ai-agents",
    name: "AI Agents Development",
    icon: Sparkles,
    basePrice: 15000,
    unit: "one-time + monthly",
    description: "Custom AI agents for automation and intelligent workflows",
    options: [
      { 
        label: "Standard", 
        multiplier: 1, 
        features: [
          "Single-purpose AI agent",
          "Basic automation workflows",
          "API integrations (3-5)",
          "Monthly maintenance",
          "Standard documentation"
        ] 
      },
      { 
        label: "Advanced", 
        multiplier: 2, 
        features: [
          "Multi-purpose AI agent",
          "Complex automation workflows",
          "API integrations (10+)",
          "Custom AI model fine-tuning",
          "Priority maintenance & updates",
          "Comprehensive documentation",
          "Training & onboarding"
        ] 
      },
      { 
        label: "Enterprise", 
        multiplier: 3.5, 
        features: [
          "Custom AI agent ecosystem",
          "Advanced workflow automation",
          "Unlimited API integrations",
          "Custom AI model development",
          "24/7 monitoring & support",
          "Full documentation & training",
          "Dedicated AI engineer",
          "Scalable infrastructure"
        ] 
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    icon: Smartphone,
    basePrice: 20000,
    unit: "one-time",
    description: "Native and cross-platform mobile applications",
    options: [
      { 
        label: "Basic", 
        multiplier: 1, 
        features: [
          "Single platform (iOS or Android)",
          "Up to 10 screens",
          "Basic features & functionality",
          "App store submission",
          "3 months support"
        ] 
      },
      { 
        label: "Professional", 
        multiplier: 2, 
        features: [
          "Cross-platform (iOS + Android)",
          "Up to 30 screens",
          "Advanced features & integrations",
          "Backend API development",
          "App store optimization",
          "6 months support",
          "Push notifications",
          "Analytics integration"
        ] 
      },
      { 
        label: "Enterprise", 
        multiplier: 3.5, 
        features: [
          "Cross-platform + Web app",
          "Unlimited screens",
          "Full-featured application",
          "Custom backend infrastructure",
          "Advanced app store optimization",
          "12 months support & updates",
          "Real-time features",
          "Enterprise security",
          "Dedicated development team"
        ] 
      },
    ],
  },
  {
    id: "api-development",
    name: "API Development & Integration",
    icon: Code,
    basePrice: 10000,
    unit: "one-time + monthly",
    description: "Custom APIs and third-party integrations",
    options: [
      { 
        label: "Essential", 
        multiplier: 1, 
        features: [
          "RESTful API development",
          "Basic authentication",
          "API documentation",
          "3 integrations",
          "Basic monitoring"
        ] 
      },
      { 
        label: "Professional", 
        multiplier: 2, 
        features: [
          "RESTful + GraphQL APIs",
          "Advanced authentication & security",
          "Comprehensive documentation",
          "10+ integrations",
          "Advanced monitoring & logging",
          "Rate limiting & caching",
          "Webhook support"
        ] 
      },
      { 
        label: "Enterprise", 
        multiplier: 3.5, 
        features: [
          "Full API ecosystem",
          "Enterprise-grade security",
          "Complete documentation & SDKs",
          "Unlimited integrations",
          "24/7 monitoring & alerting",
          "Auto-scaling infrastructure",
          "API gateway setup",
          "Dedicated DevOps support"
        ] 
      },
    ],
  },
  {
    id: "cloud-devops",
    name: "Cloud Services & DevOps",
    icon: Cloud,
    basePrice: 6000,
    unit: "per month",
    description: "Cloud infrastructure setup and DevOps automation",
    options: [
      { 
        label: "Starter", 
        multiplier: 1, 
        features: [
          "Basic cloud setup (AWS/Azure/GCP)",
          "CI/CD pipeline",
          "Basic monitoring",
          "Monthly backups",
          "Email support"
        ] 
      },
      { 
        label: "Business", 
        multiplier: 2, 
        features: [
          "Advanced cloud architecture",
          "Multi-environment setup",
          "Advanced CI/CD & automation",
          "Comprehensive monitoring & alerts",
          "Daily backups & disaster recovery",
          "Priority support",
          "Security hardening"
        ] 
      },
      { 
        label: "Enterprise", 
        multiplier: 3.5, 
        features: [
          "Enterprise cloud infrastructure",
          "Multi-cloud setup",
          "Full DevOps automation",
          "24/7 monitoring & alerting",
          "Real-time backups & disaster recovery",
          "Dedicated DevOps engineer",
          "Enterprise security & compliance",
          "Cost optimization"
        ] 
      },
    ],
  },
];

export default function PricingCalculatorPage() {
  const [theme, setTheme] = useState("light");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [duration, setDuration] = useState(3); // months
  const [addOns, setAddOns] = useState({
    hosting: false,
    maintenance: false,
    security: false,
    analytics: false,
  });

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const calculatorRef = useRef(null);
  const resultRef = useRef(null);

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
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (calculatorRef.current) {
        gsap.from(calculatorRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [theme]);

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedService || !selectedOption) return 0;

    const service = SERVICES.find((s) => s.id === selectedService);
    const option = service.options.find((o) => o.label === selectedOption);

    let basePrice = service.basePrice * option.multiplier;
    let addOnsPrice = 0;

    // Add-ons pricing
    if (addOns.hosting) addOnsPrice += 500;
    if (addOns.maintenance) addOnsPrice += 1500;
    if (addOns.security) addOnsPrice += 2000;
    if (addOns.analytics) addOnsPrice += 800;

    // Determine service type
    const isOneTimeOnly = service.unit === "one-time";
    const isOneTimePlusMonthly = service.unit.includes("one-time + monthly");
    const isMonthlyOnly = service.unit === "per month";
    
    let monthlyTotal = 0;
    let total = 0;
    let oneTimeCost = 0;
    let monthlyCost = 0;

    if (isOneTimeOnly) {
      // Pure one-time service (like Website Development, Mobile App)
      oneTimeCost = basePrice;
      monthlyCost = addOnsPrice;
      monthlyTotal = addOnsPrice;
      total = basePrice + (addOnsPrice * duration);
    } else if (isOneTimePlusMonthly) {
      // Service with both one-time setup and monthly subscription
      // Split: 40% one-time setup, 60% monthly subscription
      oneTimeCost = basePrice * 0.4;
      monthlyCost = (basePrice * 0.6) + addOnsPrice;
      monthlyTotal = monthlyCost;
      total = oneTimeCost + (monthlyCost * duration);
    } else {
      // Pure monthly service (like Cloud Services)
      oneTimeCost = 0;
      monthlyCost = basePrice + addOnsPrice;
      monthlyTotal = monthlyCost;
      total = monthlyCost * duration;
    }

    // Discount for longer commitments
    let discount = 0;
    if (duration >= 12) discount = 0.15;
    else if (duration >= 6) discount = 0.1;
    else if (duration >= 3) discount = 0.05;

    // Apply discount
    let discountedTotal = total;
    let discountAmount = 0;
    
    if (discount > 0) {
      if (isOneTimeOnly && monthlyCost === 0) {
        // Pure one-time service with no add-ons: apply discount to one-time cost
        discountAmount = oneTimeCost * discount;
        discountedTotal = oneTimeCost * (1 - discount);
      } else {
        // For services with monthly costs: apply discount only to monthly/recurring portion
        const monthlyPortion = monthlyCost * duration;
        discountAmount = monthlyPortion * discount;
        discountedTotal = oneTimeCost + (monthlyPortion * (1 - discount));
      }
    }

    return {
      monthly: monthlyTotal,
      total: discountedTotal,
      discount: discount * 100,
      discountAmount,
      basePrice,
      addOnsPrice,
      oneTimeCost,
      monthlyCost,
      originalTotal: total,
    };
  };

  const totals = calculateTotal();

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    const service = SERVICES.find((s) => s.id === serviceId);
    if (service && service.options.length > 0) {
      setSelectedOption(service.options[0].label);
    }
  };

  // Removed animation that was causing opacity issues
  // The card will update normally without animation interference

  const isDark = theme === "dark";

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
        className={`relative min-h-screen py-20 md:py-24 ${
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
          <div className="text-center mb-16 md:mb-20">
            <div
              ref={titleRef}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <Calculator
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
                Pricing Calculator
              </h1>
            </div>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              style={{
                fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
              }}
            >
              Calculate your custom pricing based on your needs and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Calculator Form */}
            <div ref={calculatorRef} className="lg:col-span-2 space-y-8">
              {/* Service Selection */}
              <div
                className={`p-8 rounded-[8px] border ${
                  isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/80 border-black/10"
                }`}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  Select Service
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICES.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`p-6 rounded-[8px] border text-left transition-all ${
                          isSelected
                            ? isDark
                              ? "bg-[#74F5A1]/20 border-[#74F5A1]/50"
                              : "bg-[#3BC972]/20 border-[#3BC972]/50"
                            : isDark
                            ? "bg-black/40 border-white/10 hover:border-white/30"
                            : "bg-white/80 border-black/10 hover:border-black/30"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-[6px] ${
                              isSelected
                                ? isDark
                                  ? "bg-[#74F5A1]/20 text-[#74F5A1]"
                                  : "bg-[#3BC972]/20 text-[#3BC972]"
                                : isDark
                                ? "bg-white/5 text-gray-400"
                                : "bg-black/5 text-gray-500"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3
                              className="font-semibold text-lg mb-1"
                              style={{
                                fontFamily:
                                  "Helvetica Now Text, Helvetica, Arial, sans-serif",
                              }}
                            >
                              {service.name}
                            </h3>
                            <p
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {service.description}
                            </p>
                          </div>
                          {isSelected && (
                            <Check
                              className={`w-5 h-5 ${
                                isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                              }`}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option Selection */}
              {selectedService && (
                <div
                  className={`p-8 rounded-[8px] border ${
                    isDark
                      ? "bg-black/40 border-white/10"
                      : "bg-white/80 border-black/10"
                  }`}
                >
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-6"
                    style={{
                      fontFamily: "Fellix, -apple-system, sans-serif",
                    }}
                  >
                    Choose Plan
                  </h2>
                  <div className="grid gap-4">
                    {SERVICES.find((s) => s.id === selectedService).options.map(
                      (option) => {
                        const isSelected = selectedOption === option.label;
                        return (
                          <button
                            key={option.label}
                            onClick={() => setSelectedOption(option.label)}
                            className={`p-6 rounded-[8px] border text-left transition-all ${
                              isSelected
                                ? isDark
                                  ? "bg-[#74F5A1]/20 border-[#74F5A1]/50"
                                  : "bg-[#3BC972]/20 border-[#3BC972]/50"
                                : isDark
                                ? "bg-black/40 border-white/10 hover:border-white/30"
                                : "bg-white/80 border-black/10 hover:border-black/30"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h3
                                className="font-semibold text-lg"
                                style={{
                                  fontFamily:
                                    "Helvetica Now Text, Helvetica, Arial, sans-serif",
                                }}
                              >
                                {option.label}
                              </h3>
                              {isSelected && (
                                <Check
                                  className={`w-5 h-5 ${
                                    isDark
                                      ? "text-[#74F5A1]"
                                      : "text-[#3BC972]"
                                  }`}
                                />
                              )}
                            </div>
                            <ul className="space-y-2">
                              {option.features.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className={`flex items-center gap-2 text-sm ${
                                    isDark ? "text-gray-300" : "text-gray-600"
                                  }`}
                                >
                                  <Check
                                    className={`w-4 h-4 ${
                                      isDark
                                        ? "text-[#74F5A1]"
                                        : "text-[#3BC972]"
                                    }`}
                                  />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* Duration Selection */}
              {selectedService && selectedOption && (
                <div
                  className={`p-8 rounded-[8px] border ${
                    isDark
                      ? "bg-black/40 border-white/10"
                      : "bg-white/80 border-black/10"
                  }`}
                >
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-6"
                    style={{
                      fontFamily: "Fellix, -apple-system, sans-serif",
                    }}
                  >
                    Contract Duration
                  </h2>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="24"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: isDark
                          ? "linear-gradient(to right, #74F5A1 0%, #74F5A1 " +
                            (duration / 24) * 100 +
                            "%, rgba(255,255,255,0.1) " +
                            (duration / 24) * 100 +
                            "%, rgba(255,255,255,0.1) 100%)"
                          : "linear-gradient(to right, #3BC972 0%, #3BC972 " +
                            (duration / 24) * 100 +
                            "%, rgba(0,0,0,0.1) " +
                            (duration / 24) * 100 +
                            "%, rgba(0,0,0,0.1) 100%)",
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-2xl font-bold w-16 text-center ${
                          isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                        }`}
                      >
                        {duration}
                      </span>
                      <span className="text-gray-500">months</span>
                    </div>
                  </div>
                  {totals.discount > 0 && totals.discountAmount > 0 && (
                    <p
                      className={`mt-4 text-sm ${
                        isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                      }`}
                    >
                      🎉 {totals.discount}% discount for {duration} month commitment
                    </p>
                  )}
                </div>
              )}

              {/* Add-ons */}
              {selectedService && selectedOption && (
                <div
                  className={`p-8 rounded-[8px] border ${
                    isDark
                      ? "bg-black/40 border-white/10"
                      : "bg-white/80 border-black/10"
                  }`}
                >
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-6"
                    style={{
                      fontFamily: "Fellix, -apple-system, sans-serif",
                    }}
                  >
                    Add-ons (Optional)
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: "hosting", label: "Cloud Hosting", price: 500, icon: Cloud },
                      { id: "maintenance", label: "Maintenance & Support", price: 1500, icon: Code },
                      { id: "security", label: "Security & Monitoring", price: 2000, icon: Shield },
                      { id: "analytics", label: "Advanced Analytics", price: 800, icon: Database },
                    ].map((addon) => {
                      const AddonIcon = addon.icon;
                      return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-4 rounded-[8px] border cursor-pointer transition-all ${
                          addOns[addon.id]
                            ? isDark
                              ? "bg-[#74F5A1]/20 border-[#74F5A1]/50"
                              : "bg-[#3BC972]/20 border-[#3BC972]/50"
                            : isDark
                            ? "bg-black/40 border-white/10 hover:border-white/30"
                            : "bg-white/80 border-black/10 hover:border-black/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={addOns[addon.id]}
                            onChange={(e) =>
                              setAddOns({ ...addOns, [addon.id]: e.target.checked })
                            }
                            className="w-5 h-5 rounded border-2"
                            style={{
                              accentColor: isDark ? "#74F5A1" : "#3BC972",
                            }}
                          />
                          <AddonIcon className={`w-5 h-5 ${
                            addOns[addon.id]
                              ? isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                              : isDark ? "text-gray-400" : "text-gray-500"
                          }`} />
                          <span
                            className="font-medium"
                            style={{
                              fontFamily:
                                "Helvetica Now Text, Helvetica, Arial, sans-serif",
                            }}
                          >
                            {addon.label}
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          ${addon.price.toLocaleString()}/mo
                        </span>
                      </label>
                    );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="sticky top-28 self-start h-fit z-20">
              <div
                ref={resultRef}
                className={`p-8 rounded-[8px] border ${
                  isDark
                    ? "bg-black/40 border-white/10"
                    : "bg-white/80 border-black/10"
                }`}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  Price Summary
                </h2>

                {totals.total > 0 ? (
                    <div className="space-y-6">
                    <div className="space-y-3">
                      {(() => {
                        const service = SERVICES.find((s) => s.id === selectedService);
                        const isOneTimeOnly = service?.unit === "one-time";
                        const isOneTimePlusMonthly = service?.unit.includes("one-time + monthly");
                        
                        return (
                          <>
                            {isOneTimeOnly ? (
                              <>
                                <div className="flex justify-between">
                                  <span
                                    className={isDark ? "text-gray-400" : "text-gray-600"}
                                  >
                                    Development Cost
                                  </span>
                                  <span>${totals.oneTimeCost.toLocaleString()}</span>
                                </div>
                                {totals.addOnsPrice > 0 && (
                                  <div className="flex justify-between">
                                    <span
                                      className={isDark ? "text-gray-400" : "text-gray-600"}
                                    >
                                      Monthly Add-ons
                                    </span>
                                    <span>${totals.addOnsPrice.toLocaleString()}/mo</span>
                                  </div>
                                )}
                              </>
                            ) : isOneTimePlusMonthly ? (
                              <>
                                <div className="flex justify-between">
                                  <span
                                    className={isDark ? "text-gray-400" : "text-gray-600"}
                                  >
                                    One-time Setup
                                  </span>
                                  <span>${totals.oneTimeCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span
                                    className={isDark ? "text-gray-400" : "text-gray-600"}
                                  >
                                    Monthly Service
                                  </span>
                                  <span>${totals.monthlyCost.toLocaleString()}/mo</span>
                                </div>
                                <div className="flex justify-between font-semibold text-sm">
                                  <span>Monthly Total</span>
                                  <span>${totals.monthly.toLocaleString()}/mo</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex justify-between">
                                  <span
                                    className={isDark ? "text-gray-400" : "text-gray-600"}
                                  >
                                    Base Service
                                  </span>
                                  <span>${totals.basePrice.toLocaleString()}/mo</span>
                                </div>
                                {totals.addOnsPrice > 0 && (
                                  <div className="flex justify-between">
                                    <span
                                      className={isDark ? "text-gray-400" : "text-gray-600"}
                                    >
                                      Add-ons
                                    </span>
                                    <span>${totals.addOnsPrice.toLocaleString()}/mo</span>
                                  </div>
                                )}
                                <div className="flex justify-between font-semibold">
                                  <span>Monthly Total</span>
                                  <span>${totals.monthly.toLocaleString()}/mo</span>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })()}
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span
                            className={isDark ? "text-gray-400" : "text-gray-600"}
                          >
                            Duration
                          </span>
                          <span>{duration} months</span>
                        </div>
                        {totals.discount > 0 && totals.discountAmount > 0 && (
                          <div className="flex justify-between text-sm mb-2">
                            <span
                              className={
                                isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                              }
                            >
                              Discount ({totals.discount}%)
                            </span>
                            <span
                              className={
                                isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                              }
                            >
                              -${totals.discountAmount.toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-2xl font-bold mt-4 pt-4 border-t">
                          <span>Total</span>
                          <span
                            className={
                              isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                            }
                          >
                            ${totals.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="mailto:hello@dapper.agency?subject=Pricing Inquiry"
                      className={`group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-[4px] font-semibold transition-all duration-300 ${
                        isDark
                          ? "bg-[#74F5A1] text-black hover:bg-[#5FE08D] hover:scale-105"
                          : "bg-[#3BC972] text-white hover:bg-[#2FA85F] hover:scale-105"
                      }`}
                      style={{
                        fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                      }}
                    >
                      <Mail className="w-5 h-5" />
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                ) : (
                  <div
                    className={`text-center py-12 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a service to see pricing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

