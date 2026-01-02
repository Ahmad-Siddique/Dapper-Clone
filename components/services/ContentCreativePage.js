"use client";
import React, { useState, useEffect } from 'react';
import Header from '../dark/Header';
import Footer from '../dark/Footer';
import HeroSection from './content-creative/HeroSection';
import ServicesSection from './content-creative/ServicesSection';

export default function ContentCreativePage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-theme={theme}>
      <Header theme={theme} />
      
      <HeroSection theme={theme} />
      
      <ServicesSection theme={theme} />

      <Footer theme={theme} />
    </div>
  );
}
