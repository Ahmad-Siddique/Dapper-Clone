"use client";
import React, { useState, useEffect } from "react";
import WorkHero from "../../../components/work/WorkHero";
import WorkPortfolio from "../../../components/work/WorkPortfolio";
import WorkCTA from "../../../components/work/WorkCTA";
import WorkFooter from "../../../components/work/WorkFooter";
import FlowerAnimation from "../../../components/work/FlowerAnimation";
import Header from "../../../components/dark/Header";
import Footer from "../../../components/dark/Footer";

export default function WorkPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
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

  return (
    <main
      className={`min-h-screen w-full overflow-x-hidden selection:bg-pink-500 selection:text-white transition-colors duration-500 ${
        theme === "dark" ? "bg-[#0B0B0B] text-white" : "bg-white text-black"
      }`}
    >
      {/* Theme Toggle Button (Floating - Vertically Centered Right) */}
      <button
        className="fixed top-1/2 -translate-y-1/2 right-[20px] md:right-[30px] z-[9999] w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-200 dark:border-[#333333]"
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

      {/* Hero Section Only (No Header) */}
      <Header theme={theme}/>
      <WorkHero theme={theme} />
      
      {/* Portfolio Section */}
      <WorkPortfolio theme={theme} />
      
      {/* CTA Section */}
      <WorkCTA theme={theme} />
      
      {/* Footer Section */}
      <WorkFooter theme={theme} />
      
      {/* Flower Animation Section */}
      <FlowerAnimation />
      <Footer theme={theme}/>
    </main>
  );
}
