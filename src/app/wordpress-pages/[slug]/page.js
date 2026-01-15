"use client";
import React, { useState, useEffect, use } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../../../components/dark/Header';
import Footer from '../../../../components/dark/Footer';
import '../../../../components/dark/MainPage.css';
import TalkToExpertSection from '../../../../components/dark/TalkToExpertSection';
import { fetchWordPressPageBySlug } from '../../../../utils/wordpress';
import Image from 'next/image';
import Link from 'next/link';

export default function WordPressPageDetail({ params }) {
  // Unwrap params Promise using React.use()
  const resolvedParams = use(params);
  const [theme, setTheme] = useState('light');
  const [page, setPage] = useState(null);
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
    let currentSlug = '';
    
    // Get slug from resolved params
    if (resolvedParams && typeof resolvedParams === 'object' && resolvedParams.slug) {
      currentSlug = resolvedParams.slug;
    }
    
    // Fallback: get from URL (most reliable for client components)
    if (!currentSlug && typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      currentSlug = pathParts[pathParts.length - 1] || '';
    }

    // Fetch the page from WordPress API
    const loadPage = async () => {
      if (!currentSlug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Try to fetch the specific page from WordPress
        const wpPage = await fetchWordPressPageBySlug(currentSlug);
        
        if (wpPage) {
          setPage(wpPage);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error('Error loading WordPress page:', error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [resolvedParams]);

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
      
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#74F5A1]"></div>
            <p className={`mt-4 text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Loading page...
            </p>
          </div>
        </div>
      ) : page ? (
        <div className="min-h-screen pt-32 pb-20">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <Link 
              href="/wordpress-pages"
              className={`inline-flex items-center mb-8 text-sm hover:text-[#74F5A1] transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to WordPress Pages
            </Link>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {page.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm mb-8">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                By {page.author}
              </span>
              <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                •
              </span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {page.date}
              </span>
              {page.readTime && (
                <>
                  <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                    •
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {page.readTime}
                  </span>
                </>
              )}
            </div>

            {/* Featured Image */}
            {page.image && (
              <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
                <Image
                  src={page.image}
                  alt={page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                  priority
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="wordpress-content-wrapper text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Page not found
            </h1>
            <Link 
              href="/wordpress-pages" 
              className="text-[#74F5A1] hover:underline"
            >
              Back to WordPress Pages
            </Link>
          </div>
        </div>
      )}

      <TalkToExpertSection theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}
