"use client";
import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../../components/dark/Header';
import Footer from '../../../components/dark/Footer';
import '../../../components/dark/MainPage.css';
import TalkToExpertSection from '../../../components/dark/TalkToExpertSection';
import { fetchWordPressPages } from '../../../utils/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export default function WordPressPagesPage() {
  const [theme, setTheme] = useState('light');
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Refresh ScrollTrigger on mount/navigation
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Fetch WordPress pages
    const loadPages = async () => {
      setLoading(true);
      try {
        const wpPages = await fetchWordPressPages();
        
        if (wpPages && wpPages.length > 0) {
          setPages(wpPages);
        } else {
          console.log('No WordPress pages found');
          setPages([]);
        }
      } catch (error) {
        console.error('Error loading WordPress pages:', error);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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

      <Header theme={theme} />
      
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              WordPress Pages
            </h1>
            <p className={`text-lg md:text-xl ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Browse all pages from WordPress
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#74F5A1]"></div>
                <p className={`mt-4 text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Loading WordPress pages...
                </p>
              </div>
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-20">
              <p className={`text-xl ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No WordPress pages found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/wordpress-pages/${page.slug}`}
                  className={`group block rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h2 className={`text-xl font-bold mb-3 group-hover:text-[#74F5A1] transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {page.title}
                    </h2>
                    
                    {page.excerpt && (
                      <div 
                        className={`text-sm mb-4 line-clamp-3 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                        dangerouslySetInnerHTML={{ __html: page.excerpt }}
                      />
                    )}
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                        {page.date}
                      </span>
                      {page.readTime && (
                        <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                          {page.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <TalkToExpertSection theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}
