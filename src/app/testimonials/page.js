"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Header from "../../../components/dark/Header";
import Footer from "../../../components/dark/Footer";
import "../../../components/dark/MainPage.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Since we started with Dapper we finally have prospects reaching out to us, instead of relying on outbound.",
    author: "George Borst",
    role: "Business Development Lead",
    company: "FOCUS-ON",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    service: "Demand Generation",
  },
  {
    id: 2,
    quote:
      "Dapper constantly improves results in a proactive and very structured way; this makes the company stand out.",
    author: "Sammie Perkins",
    role: "Director Marketing EMEA",
    company: "Ultimaker",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    service: "Paid Media & Performance",
  },
  {
    id: 3,
    quote:
      "Working with Dapper has transformed our approach to demand generation. The results speak for themselves.",
    author: "Jane Smith",
    role: "VP Marketing",
    company: "TechCorp",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    service: "Content & Creative",
  },
  {
    id: 4,
    quote:
      "The strategic approach and execution from Dapper have exceeded our expectations in every way possible.",
    author: "Michael Chen",
    role: "Head of Growth",
    company: "CloudScale",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    service: "Data & Measurement",
  },
  {
    id: 5,
    quote:
      "Our pipeline has never been stronger. Dapper understands B2B marketing at a level few agencies do.",
    author: "Sarah Johnson",
    role: "CMO",
    company: "SaaSPro",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    service: "Demand Gen Agency",
  },
  {
    id: 6,
    quote:
      "The chatbot Dapper developed for us has revolutionized our customer support. Response times dropped by 80%.",
    author: "David Wilson",
    role: "CTO",
    company: "TechFlow",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=51",
    rating: 5,
    service: "Chatbot Development",
  },
  {
    id: 7,
    quote:
      "Their website development team delivered exactly what we needed. Professional, fast, and incredibly detailed.",
    author: "Emily Davis",
    role: "Founder",
    company: "StartupX",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    service: "Website Development",
  },
  {
    id: 8,
    quote:
      "The AI agents they built have automated our entire workflow. We've saved countless hours and improved accuracy significantly.",
    author: "Robert Martinez",
    role: "Operations Director",
    company: "InnovateDaily",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&q=80",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    service: "AI Agents Development",
  },
];

export default function TestimonialsPage() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("all");
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
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
  }, [theme, filter]);

  const isDark = theme === "dark";

  // Get unique services for filter
  const services = ["all", ...new Set(TESTIMONIALS.map((t) => t.service))];

  // Filter testimonials
  const filteredTestimonials =
    filter === "all"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.service === filter);

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
        className={`relative min-h-screen pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden ${
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
              <Quote
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
                Client Testimonials
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
              See what our clients say about working with us
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => setFilter(service)}
                className={`px-6 py-3 rounded-[4px] font-semibold transition-all duration-300 text-sm ${
                  filter === service
                    ? isDark
                      ? "bg-[#74F5A1] text-black"
                      : "bg-[#3BC972] text-white"
                    : isDark
                    ? "bg-black/40 border border-white/10 text-white hover:bg-black/60"
                    : "bg-white/80 border border-black/10 text-black hover:bg-white"
                }`}
                style={{
                  fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                }}
              >
                {service === "all" ? "All Services" : service}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`group p-8 rounded-[8px] border transition-all ${
                  isDark
                    ? "bg-black/40 border-white/10 hover:border-[#74F5A1]/30 hover:bg-black/50"
                    : "bg-white/80 border-black/10 hover:border-[#3BC972]/30 hover:bg-white"
                }`}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex p-3 rounded-[6px] ${
                      isDark
                        ? "bg-[#74F5A1]/10 text-[#74F5A1]"
                        : "bg-[#3BC972]/10 text-[#3BC972]"
                    }`}
                  >
                    <Quote className="w-6 h-6" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                      } fill-current`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className={`text-lg md:text-xl mb-6 leading-relaxed ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                  }}
                >
                  "{testimonial.quote}"
                </blockquote>

                {/* Service Badge */}
                <div className="mb-6">
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                      isDark
                        ? "bg-[#74F5A1]/20 text-[#74F5A1]"
                        : "bg-[#3BC972]/20 text-[#3BC972]"
                    }`}
                  >
                    {testimonial.service}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-6 border-t border-opacity-10">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-base"
                        style={{
                          fontFamily:
                            "Helvetica Now Text, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {testimonial.author}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                        style={{
                          fontFamily:
                            "Helvetica Now Text, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {testimonial.role}
                      </p>
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div
            className={`mt-20 p-10 md:p-12 rounded-[8px] border text-center ${
              isDark
                ? "bg-black/40 border-white/10"
                : "bg-white/80 border-black/10"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div
                  className={`text-4xl md:text-5xl font-bold mb-2 ${
                    isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                  }`}
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  100+
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Happy Clients
                </p>
              </div>
              <div>
                <div
                  className={`text-4xl md:text-5xl font-bold mb-2 ${
                    isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                  }`}
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  4.9/5
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Average Rating
                </p>
              </div>
              <div>
                <div
                  className={`text-4xl md:text-5xl font-bold mb-2 ${
                    isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                  }`}
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  95%
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Client Retention
                </p>
              </div>
              <div>
                <div
                  className={`text-4xl md:text-5xl font-bold mb-2 ${
                    isDark ? "text-[#74F5A1]" : "text-[#3BC972]"
                  }`}
                  style={{
                    fontFamily: "Fellix, -apple-system, sans-serif",
                  }}
                >
                  50+
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Projects Delivered
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "Fellix, -apple-system, sans-serif",
              }}
            >
              Ready to join our success stories?
            </h2>
            <p
              className={`text-lg mb-8 max-w-2xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              style={{
                fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
              }}
            >
              Let's discuss how we can help transform your business
            </p>
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-3 px-8 py-4 rounded-[4px] font-semibold transition-all duration-300 text-base ${
                isDark
                  ? "bg-[#74F5A1] text-black hover:bg-[#5FE08D] hover:scale-105"
                  : "bg-[#3BC972] text-white hover:bg-[#2FA85F] hover:scale-105"
              }`}
              style={{
                fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
              }}
            >
              <Users className="w-5 h-5" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}
