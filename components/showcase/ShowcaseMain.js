'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteDrawer from './SiteDrawar';

// Sample showcase data with Unsplash images
const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: 'Malvah',
    url: '/showcase/malvah',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Agency',
    technology: 'WebGL',
    country: 'France',
    rating: '7.24',
    creators: [
      { name: 'Malvah', type: 'PRO', avatar: 'M' },
      { name: 'Estrela Studio', type: 'PRO', avatar: 'E' },
      { name: 'Zulik', type: '', avatar: 'Z' },
      { name: 'Raphael Segerman', type: '', avatar: 'R' },
    ],
  },
  {
    id: 2,
    title: 'HOLOGRAPHIK',
    url: '/showcase/holographik',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'React',
    country: 'USA',
    rating: '8.15',
    creators: [
      { name: 'HOLOGRAPHIK', type: 'PRO', avatar: 'H' },
    ],
  },
  {
    id: 3,
    title: 'REF Digital',
    url: '/showcase/ref-digital',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'E-commerce',
    technology: 'Next.js',
    country: 'UK',
    rating: '7.89',
    creators: [
      { name: 'REF Digital', type: 'PRO', avatar: 'R' },
    ],
  },
  {
    id: 4,
    title: 'Beaucoup.',
    url: '/showcase/beaucoup',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'Vue.js',
    country: 'Canada',
    rating: '8.42',
    creators: [
      { name: 'Beaucoup', type: 'PRO', avatar: 'B' },
    ],
  },
  {
    id: 5,
    title: 'Rare Beauty',
    url: '/showcase/rare-beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: false,
    category: 'E-commerce',
    technology: 'Shopify',
    country: 'USA',
    rating: '7.56',
    creators: [
      { name: 'Rare Beauty', type: '', avatar: 'R' },
    ],
  },
  {
    id: 6,
    title: 'Gen Z Marketing',
    url: '/showcase/gen-z',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    badges: ['DEV'],
    isPro: true,
    category: 'Marketing',
    technology: 'WordPress',
    country: 'Australia',
    rating: '7.92',
    creators: [
      { name: 'Gen Z Marketing', type: 'PRO', avatar: 'G' },
    ],
  },
  {
    id: 7,
    title: 'Neural Networks',
    url: '/showcase/neural',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'Tech',
    technology: 'Three.js',
    country: 'Japan',
    rating: '8.67',
    creators: [
      { name: 'Neural Networks', type: 'PRO', avatar: 'N' },
    ],
  },
  {
    id: 8,
    title: 'Typography Studio',
    url: '/showcase/typography',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: false,
    category: 'Agency',
    technology: 'Webflow',
    country: 'Netherlands',
    rating: '7.78',
    creators: [
      { name: 'Typography Studio', type: '', avatar: 'T' },
    ],
  },
  {
    id: 9,
    title: 'Quantum Design',
    url: '/showcase/quantum-design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'Tech',
    technology: 'React',
    country: 'Germany',
    rating: '8.31',
    creators: [
      { name: 'Quantum Design', type: 'PRO', avatar: 'Q' },
      { name: 'Tech Studio', type: 'PRO', avatar: 'T' },
    ],
  },
  {
    id: 10,
    title: 'Artisan Coffee',
    url: '/showcase/artisan-coffee',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop',
    badges: ['DEV'],
    isPro: false,
    category: 'E-commerce',
    technology: 'Shopify',
    country: 'Italy',
    rating: '7.45',
    creators: [
      { name: 'Artisan Coffee', type: '', avatar: 'A' },
    ],
  },
  {
    id: 11,
    title: 'Digital Nomad',
    url: '/showcase/digital-nomad',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'Next.js',
    country: 'Spain',
    rating: '8.56',
    creators: [
      { name: 'Digital Nomad', type: 'PRO', avatar: 'D' },
    ],
  },
  {
    id: 12,
    title: 'Urban Fashion',
    url: '/showcase/urban-fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'E-commerce',
    technology: 'Vue.js',
    country: 'Sweden',
    rating: '8.12',
    creators: [
      { name: 'Urban Fashion', type: 'PRO', avatar: 'U' },
      { name: 'Style Co', type: '', avatar: 'S' },
    ],
  },
  {
    id: 13,
    title: 'Creative Labs',
    url: '/showcase/creative-labs',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    badges: ['DEV'],
    isPro: true,
    category: 'Agency',
    technology: 'WebGL',
    country: 'UK',
    rating: '7.88',
    creators: [
      { name: 'Creative Labs', type: 'PRO', avatar: 'C' },
    ],
  },
  {
    id: 14,
    title: 'Green Energy',
    url: '/showcase/green-energy',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: false,
    category: 'Tech',
    technology: 'React',
    country: 'Norway',
    rating: '8.23',
    creators: [
      { name: 'Green Energy', type: '', avatar: 'G' },
    ],
  },
  {
    id: 15,
    title: 'Studio Minimal',
    url: '/showcase/studio-minimal',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'Astro',
    country: 'Denmark',
    rating: '8.67',
    creators: [
      { name: 'Studio Minimal', type: 'PRO', avatar: 'S' },
    ],
  },
  {
    id: 16,
    title: 'Foodie Express',
    url: '/showcase/foodie-express',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    badges: ['DEV'],
    isPro: false,
    category: 'E-commerce',
    technology: 'Next.js',
    country: 'USA',
    rating: '7.34',
    creators: [
      { name: 'Foodie Express', type: '', avatar: 'F' },
    ],
  },
  {
    id: 17,
    title: 'Architect Studio',
    url: '/showcase/architect-studio',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'Three.js',
    country: 'Switzerland',
    rating: '8.89',
    creators: [
      { name: 'Architect Studio', type: 'PRO', avatar: 'A' },
      { name: 'Design Collective', type: 'PRO', avatar: 'D' },
    ],
  },
  {
    id: 18,
    title: 'Music Waves',
    url: '/showcase/music-waves',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'GSAP',
    country: 'USA',
    rating: '8.45',
    creators: [
      { name: 'Music Waves', type: 'PRO', avatar: 'M' },
    ],
  },
  {
    id: 19,
    title: 'Tech Startup',
    url: '/showcase/tech-startup',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    badges: ['DEV'],
    isPro: true,
    category: 'Tech',
    technology: 'React',
    country: 'Israel',
    rating: '7.91',
    creators: [
      { name: 'Tech Startup', type: 'PRO', avatar: 'T' },
    ],
  },
  {
    id: 20,
    title: 'Luxury Watches',
    url: '/showcase/luxury-watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'E-commerce',
    technology: 'Shopify',
    country: 'Switzerland',
    rating: '8.76',
    creators: [
      { name: 'Luxury Watches', type: 'PRO', avatar: 'L' },
    ],
  },
  {
    id: 21,
    title: 'Fitness Pro',
    url: '/showcase/fitness-pro',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: false,
    category: 'Marketing',
    technology: 'WordPress',
    country: 'Australia',
    rating: '7.63',
    creators: [
      { name: 'Fitness Pro', type: '', avatar: 'F' },
    ],
  },
  {
    id: 22,
    title: 'Space Design',
    url: '/showcase/space-design',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    badges: ['SOTD'],
    isPro: true,
    category: 'Agency',
    technology: 'Webflow',
    country: 'Belgium',
    rating: '8.34',
    creators: [
      { name: 'Space Design', type: 'PRO', avatar: 'S' },
      { name: 'Creative Agency', type: 'PRO', avatar: 'C' },
    ],
  },
  {
    id: 23,
    title: 'Eco Products',
    url: '/showcase/eco-products',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    badges: ['DEV'],
    isPro: false,
    category: 'E-commerce',
    technology: 'Next.js',
    country: 'Canada',
    rating: '7.52',
    creators: [
      { name: 'Eco Products', type: '', avatar: 'E' },
    ],
  },
  {
    id: 24,
    title: 'Photography Hub',
    url: '/showcase/photography-hub',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    badges: ['DEV', 'SOTD'],
    isPro: true,
    category: 'Portfolio',
    technology: 'Vue.js',
    country: 'Portugal',
    rating: '8.91',
    creators: [
      { name: 'Photography Hub', type: 'PRO', avatar: 'P' },
    ],
  },
];

export default function ShowcasePage({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    awards: '',
    category: '',
    tag: '',
    technology: '',
    country: '',
    font: '',
    color: '',
  });
  const [activeFilters, setActiveFilters] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    const newFilters = { ...filters, [filterName]: value };
    const count = Object.values(newFilters).filter((v) => v !== '').length;
    setActiveFilters(count);
  };

  const resetFilters = () => {
    setFilters({
      awards: '',
      category: '',
      tag: '',
      technology: '',
      country: '',
      font: '',
      color: '',
    });
    setActiveFilters(0);
  };

  const handleCardClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className={`min-h-screen pt-32 pb-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F5]'}`}>
      <div className="mx-auto max-w-[1800px] px-6 lg:px-8">
        {/* Filter Bar */}
        <div className={`mb-6 py-3 px-4 rounded-lg ${isDark ? 'bg-[#1a1a1a] border border-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Awards Filter */}
              <select
                value={filters.awards}
                onChange={(e) => handleFilterChange('awards', e.target.value)}
                className={`rounded-lg border px-3 py-2 pr-8 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                }`}
              >
                <option value="">Awards</option>
                <option value="sotd">Site of the Day</option>
                <option value="dev">Developer Award</option>
                <option value="sotm">Site of the Month</option>
              </select>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className={`rounded-lg border px-3 py-2 pr-8 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                }`}
              >
                <option value="">Category</option>
                <option value="agency">Agency</option>
                <option value="portfolio">Portfolio</option>
                <option value="ecommerce">E-commerce</option>
                <option value="marketing">Marketing</option>
              </select>

              {/* Tag Filter */}
              <select
                value={filters.tag}
                onChange={(e) => handleFilterChange('tag', e.target.value)}
                className={`rounded-lg border px-3 py-2 pr-8 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                }`}
              >
                <option value="">Tag</option>
                <option value="animation">Animation</option>
                <option value="interactive">Interactive</option>
                <option value="minimalist">Minimalist</option>
              </select>

              {/* Technology Filter */}
              <select
                value={filters.technology}
                onChange={(e) => handleFilterChange('technology', e.target.value)}
                className={`rounded-lg border px-3 py-2 pr-8 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                }`}
              >
                <option value="">Technology</option>
                <option value="react">React</option>
                <option value="nextjs">Next.js</option>
                <option value="webgl">WebGL</option>
                <option value="threejs">Three.js</option>
              </select>

              {/* Country Filter */}
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className={`rounded-lg border px-3 py-2 pr-8 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                }`}
              >
                <option value="">Country</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="france">France</option>
                <option value="japan">Japan</option>
              </select>

              {/* Font Filter */}
              <select
                value={filters.font}
                onChange={(e) => handleFilterChange('font', e.target.value)}
                className={`rounded-lg border px-3 py-2 pr-8 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                  isDark 
                    ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                }`}
              >
                <option value="">Font</option>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="monospace">Monospace</option>
              </select>

              {/* Color Filter */}
              <div className="relative">
                <select
                  value={filters.color}
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                  className={`rounded-lg border pl-3 pr-10 py-2 text-[13px] font-medium cursor-pointer focus:outline-none transition-colors ${
                    isDark 
                      ? 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-600 focus:border-gray-500' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-gray-400'
                  }`}
                >
                  <option value="">Color</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                </select>
                <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 flex gap-0.5">
                  <span className="h-3 w-0.5 bg-blue-500 rounded-full"></span>
                  <span className="h-3 w-0.5 bg-green-500 rounded-full"></span>
                  <span className="h-3 w-0.5 bg-red-500 rounded-full"></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Active Filter Count */}
              {activeFilters > 0 && (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6B4A] text-[12px] font-bold text-white">
                  {activeFilters}
                </span>
              )}

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${
                  isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <span>Reset filters</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h1 className={`text-[18px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Sites Of The Day
            </h1>
            <span className={`rounded-md px-2 py-0.5 text-[12px] font-semibold ${
              isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}>
              2208
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className={`hidden lg:block text-[13px] ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Best selection of <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Sites Of The Day</span> for your inspiration...{' '}
              <Link href="/about" className={`font-medium hover:underline ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Read more
              </Link>
            </p>

            {/* View Toggle */}
            <div className={`flex items-center gap-1 rounded-lg p-0.5 border ${
              isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded p-1.5 transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? (isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100')
                    : (isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50')
                }`}
                aria-label="Grid view"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isDark ? 'text-gray-300' : 'text-gray-700'}
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded p-1.5 transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? (isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100')
                    : (isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50')
                }`}
                aria-label="List view"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isDark ? 'text-gray-300' : 'text-gray-700'}
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {SHOWCASE_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group relative transition-all duration-300 cursor-pointer"
              onClick={(e) => handleCardClick(e, item)}
            >
              <div className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                </div>

                {/* Info Section */}
                <div className="mt-3 bg-transparent">
                  <div className="flex items-center justify-between">
                    {/* Title and Pro Badge */}
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ${
                        isDark ? 'bg-[#2a2a2a] text-white' : 'bg-gray-200 text-gray-900'
                      }`}>
                        {item.title[0]}
                      </div>
                      <h3 className={`text-[15px] font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      {item.isPro && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          PRO
                        </span>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`rounded px-2 py-1 text-[11px] font-bold ${
                            badge === 'DEV'
                              ? 'border border-gray-300 bg-white text-gray-700'
                              : 'bg-[#FF6B6B] text-white'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Drawer Component */}
      <SiteDrawer 
        isOpen={isDrawerOpen} 
        selectedItem={selectedItem} 
        onClose={closeDrawer}
        theme={theme}
      />
    </div>
  );
}
