
"use client";
import { useEffect, useState } from "react";
import Footer from "../../../components/dark/Footer";
import Header from "../../../components/dark/Header";
import MainCaseStudy from "../../../components/real-case-studies/MainCaseStudy";
import { ScrollTrigger } from "gsap/all";
import { fetchWordPressCaseStudies } from "../../../utils/wordpress";
import MainSection from "../../../components/main-contact/MainSection";
import StrategyCallSection from "../../../components/main-contact/StrategyCallSection";



export default function Home() {
    const [theme, setTheme] = useState('dark');
   
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Refresh ScrollTrigger on mount/navigation
    if (typeof window !== 'undefined' && window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
    
    return () => {
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

 

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    // Force ScrollTrigger refresh after theme change
    if (typeof window !== 'undefined' && window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  };

  const bgStyle = theme === "dark"
    ? {
        backgroundColor: "#2b2b2b",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E"),
          radial-gradient(ellipse at top left, rgba(60, 60, 60, 0.3), transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(50, 50, 50, 0.2), transparent 50%)
        `,
        backgroundBlendMode: "overlay, normal, normal",
      }
    : { backgroundColor: "#EFEFEF" };

  const noiseOverlayStyle = {
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0.03) 2px),
      repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.015) 2px, rgba(0, 0, 0, 0.015) 4px)
    `,
  };

  return (
    <div
      style={{ position: 'relative', zIndex: 1, ...bgStyle }}
      data-theme={theme}
    >
      {theme === "dark" && (
        <div className="fixed inset-0 pointer-events-none z-[1]" style={noiseOverlayStyle} />
      )}
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
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
  
    <div>
    <Header theme={theme} />
      
    <MainSection theme={theme}  />
    <StrategyCallSection theme={theme}  />
      
      <Footer theme={theme} />
    </div>
    </div>
  )
}
