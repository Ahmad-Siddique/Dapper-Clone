"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../components/dark/Header';

import Footer from '../../../components/dark/Footer';
import '../../../components/dark/MainPage.css';
import HeroExpertise from '../../../components/expertise/HeroExpertise';
import ClientExpertise from '../../../components/expertise/ClientsExpertise';
import B2BBuyersExpertise from '../../../components/expertise/B2BBuyerExpertise';
import ExpertiseExpertise from '../../../components/expertise/ExpertiseExpertise';
import BuildDemandExpertise from '../../../components/expertise/BuildDemandExpertise';
import ProcessExpertise from '../../../components/expertise/ProcessExpertise';
import CRMExpertise from '../../../components/expertise/CRMExpertise';
import CaseExpertise from '../../../components/expertise/CaseExpertise';
import FAQExpertise from '../../../components/expertise/FAQExpertise';
import TalkToExpertSection from '../../../components/dark/TalkToExpertSection';
import NewsletterSection from '../../../components/newsletter/NewsletterSection';
export default function Expertise1Page() {
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

  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-theme={theme} className={theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}>
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
     <NewsletterSection theme={theme} />
      <TalkToExpertSection theme={theme} />



      <Footer theme={theme} />
    </div>
  );
}

