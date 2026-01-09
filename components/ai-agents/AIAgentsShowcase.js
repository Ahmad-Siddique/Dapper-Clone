'use client';

import React, { useState, useMemo } from 'react';
import AIAgentCard from './AIAgentCard';

// Sample AI Agents data
const AI_AGENTS = [
  {
    id: 1,
    name: 'Customer Support Bot',
    description: 'Intelligent customer service agent that handles inquiries 24/7 with natural language understanding.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
    price: 49.99,
    category: 'Support',
    features: ['24/7 Availability', 'Multi-language', 'CRM Integration'],
    rating: 4.8,
    sales: 1250,
    badge: 'BESTSELLER',
    isPro: true,
  },
  {
    id: 2,
    name: 'Content Generator AI',
    description: 'Create engaging content for blogs, social media, and marketing campaigns in seconds.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
    price: 79.99,
    category: 'Content',
    features: ['SEO Optimized', 'Multiple Formats', 'Brand Voice'],
    rating: 4.9,
    sales: 890,
    badge: 'NEW',
    isPro: true,
  },
  {
    id: 3,
    name: 'Data Analyst Agent',
    description: 'Automated data analysis and insights generation from your business metrics and reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    price: 99.99,
    category: 'Analytics',
    features: ['Real-time Analysis', 'Visual Reports', 'Predictive Insights'],
    rating: 4.7,
    sales: 650,
    badge: 'PRO',
    isPro: true,
  },
  {
    id: 4,
    name: 'Email Assistant',
    description: 'Smart email management that prioritizes, responds, and schedules meetings automatically.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80',
    price: 39.99,
    category: 'Productivity',
    features: ['Auto-respond', 'Smart Scheduling', 'Priority Sorting'],
    rating: 4.6,
    sales: 2100,
    badge: 'POPULAR',
    isPro: false,
  },
  {
    id: 5,
    name: 'Social Media Manager',
    description: 'Automated social media posting, engagement tracking, and audience analysis.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80',
    price: 69.99,
    category: 'Marketing',
    features: ['Multi-platform', 'Auto-posting', 'Analytics'],
    rating: 4.8,
    sales: 1450,
    badge: 'TRENDING',
    isPro: true,
  },
  {
    id: 6,
    name: 'Code Review Assistant',
    description: 'AI-powered code review that catches bugs, suggests improvements, and enforces best practices.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80',
    price: 89.99,
    category: 'Development',
    features: ['Bug Detection', 'Best Practices', 'Security Scan'],
    rating: 4.9,
    sales: 780,
    badge: 'PRO',
    isPro: true,
  },
  {
    id: 7,
    name: 'HR Recruiter Bot',
    description: 'Automated candidate screening, interview scheduling, and initial assessments.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
    price: 119.99,
    category: 'HR',
    features: ['Resume Screening', 'Interview Scheduling', 'Candidate Ranking'],
    rating: 4.7,
    sales: 520,
    badge: 'NEW',
    isPro: true,
  },
  {
    id: 8,
    name: 'E-commerce Assistant',
    description: 'Product recommendations, inventory management, and customer behavior analysis.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
    price: 94.99,
    category: 'E-commerce',
    features: ['Inventory Tracking', 'Recommendations', 'Sales Analytics'],
    rating: 4.8,
    sales: 1100,
    badge: 'BESTSELLER',
    isPro: true,
  },
];

export default function AIAgentsShowcase({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Memoize categories to prevent recalculation on every render
  const categories = useMemo(() => {
    return ['All', ...new Set(AI_AGENTS.map(agent => agent.category))];
  }, []);

  const filteredAgents = useMemo(() => {
    return selectedCategory === 'All' 
      ? AI_AGENTS 
      : AI_AGENTS.filter(agent => agent.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div id="agents" className={`min-h-screen pt-20 pb-16 transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#E8E8E8]'}`}>
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className={`text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] mb-4 ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              Available Agents
            </h2>
            <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[19px] font-semibold ${isDark ? 'text-[#aaaaaa]' : 'text-[#444444]'}`}>
              {filteredAgents.length} agents ready to deploy
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`bg-transparent border rounded-full px-4 py-1 font-normal font-['Figtree'] leading-relaxed transition-all text-[14px] ${
                  selectedCategory === category
                    ? isDark
                      ? 'bg-[#74F5A1] text-black border-[#74F5A1] hover:bg-[#74F5A1] hover:text-black'
                      : 'bg-[#3BC972] text-white border-[#3BC972] hover:bg-[#3BC972] hover:text-white'
                    : isDark
                    ? 'border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50 hover:text-white'
                    : 'border-black/20 text-black/80 hover:bg-black/5 hover:border-black/40 hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <AIAgentCard key={agent.id} agent={agent} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}

