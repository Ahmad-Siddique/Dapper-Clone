
"use client";
import { useEffect, useState } from "react";
import Footer from "../../../components/dark/Footer";
import Header from "../../../components/dark/Header";
import MainCaseStudy from "../../../components/real-case-studies/MainCaseStudy";
import { ScrollTrigger } from "gsap/all";

export default function Home() {
    const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
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

  return (
    <div
      style={{ position: 'relative', zIndex: 1 }}
      data-theme={theme}
      className={theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}
    >
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
      <MainCaseStudy theme={theme} />
      <Footer theme={theme} />
    </div>
    </div>
  )
}
