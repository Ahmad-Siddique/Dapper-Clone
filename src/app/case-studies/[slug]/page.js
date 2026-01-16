"use client";

import { useEffect, useState, use } from "react";
import Header from "../../../../components/dark/Header";
import Footer from "../../../../components/dark/Footer";
import InnerHeroSection from "../../../../components/real-case-studies/inner/InnerHeroSection";
import { ScrollTrigger } from "gsap/all";
import OverviewSection from "../../../../components/real-case-studies/inner/OverviewSection";
import AwardsSection from "../../../../components/real-case-studies/inner/AwardsSection";
import BusinessNeeds from "../../../../components/real-case-studies/inner/BusinessNeeds";
import ChallengesSolutions from "../../../../components/real-case-studies/inner/ChallengesSection";
import ResearchSection from "../../../../components/real-case-studies/inner/ResearchSection";
import DocumentationSection from "../../../../components/real-case-studies/inner/DocumentationSection";
import UXAuditSection from "../../../../components/real-case-studies/inner/UXAuditSection";
import InformationArchitectureSection from "../../../../components/real-case-studies/inner/InformationArchitecture";
import ProductDesignSection from "../../../../components/real-case-studies/inner/ProductDesign";
import DesignDirectionSection from "../../../../components/real-case-studies/inner/DesignDirectionSection";
import UIDesignSection from "../../../../components/real-case-studies/inner/UIDesignSection";
import DesignSystemSection from "../../../../components/real-case-studies/inner/DesignSystemSection";
import KeyProjectSection from "../../../../components/real-case-studies/inner/KeyProjectSection";
import ProductDevelopmentSection from "../../../../components/real-case-studies/inner/ProductDevelopmentSection";
import { fetchWordPressCaseStudyBySlug } from "../../../../utils/wordpress";
import { CASE_STUDIES } from "../../../../components/case-studies/SingleCaseStudy";

export default function CaseStudyDetailPage({ params }) {
  const [theme, setTheme] = useState('light');
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || resolvedParams;

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

  useEffect(() => {
    // Fetch WordPress case study
    const loadCaseStudy = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Try to fetch from WordPress first
        const wpCaseStudy = await fetchWordPressCaseStudyBySlug(slug);
        
        if (wpCaseStudy) {
          setCaseStudy(wpCaseStudy);
        } else {
          // Fallback to demo data
          const demoCaseStudy = CASE_STUDIES[slug] || CASE_STUDIES["vitacare"];
          setCaseStudy(demoCaseStudy);
        }
      } catch (error) {
        console.error('Error loading case study:', error);
        // Fallback to demo data on error
        const demoCaseStudy = CASE_STUDIES[slug] || CASE_STUDIES["vitacare"];
        setCaseStudy(demoCaseStudy);
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudy();
  }, [slug]);

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

      <Header theme={theme} />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#74F5A1]"></div>
            <p className={`mt-4 text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Loading case study...
            </p>
          </div>
        </div>
      ) : (
        <>
          <InnerHeroSection theme={theme} caseStudy={caseStudy} />
          <OverviewSection theme={theme} caseStudy={caseStudy} />
          <AwardsSection theme={theme} caseStudy={caseStudy} />
          <BusinessNeeds theme={theme} caseStudy={caseStudy} />
          <ChallengesSolutions theme={theme} caseStudy={caseStudy} />
          <ResearchSection theme={theme} caseStudy={caseStudy} />
          <DocumentationSection theme={theme} caseStudy={caseStudy} />
          <UXAuditSection theme={theme} caseStudy={caseStudy} />
          <InformationArchitectureSection theme={theme} caseStudy={caseStudy} />
          <ProductDesignSection theme={theme} caseStudy={caseStudy} />
          <DesignDirectionSection theme={theme} caseStudy={caseStudy} />
          <UIDesignSection theme={theme} caseStudy={caseStudy} />
          <DesignSystemSection theme={theme} caseStudy={caseStudy} />
          <KeyProjectSection theme={theme} caseStudy={caseStudy} />
          <ProductDevelopmentSection theme={theme} caseStudy={caseStudy} />
        </>
      )}
      <Footer theme={theme} />
    </div>
  );
}
