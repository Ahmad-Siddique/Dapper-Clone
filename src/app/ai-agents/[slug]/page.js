"use client";
import React, { useState, useEffect, use } from 'react';
import Header from '../../../../components/dark/Header';
import Footer from '../../../../components/dark/Footer';
import '../../../../components/dark/MainPage.css';
import AIAgentDetailHero from '../../../../components/ai-agents/AIAgentDetailHero';
import AIAgentDetailContent from '../../../../components/ai-agents/AIAgentDetailContent';
import AIAgentDetailFeatures from '../../../../components/ai-agents/AIAgentDetailFeatures';
import AIAgentDetailPricing from '../../../../components/ai-agents/AIAgentDetailPricing';
import TalkToExpertSection from '../../../../components/dark/TalkToExpertSection';

// AI Agents data - matching the showcase data
const AI_AGENTS_DATA = {
  'customer-support-bot': {
    id: 1,
    name: 'Customer Support Bot',
    description: 'Intelligent customer service agent that handles inquiries 24/7 with natural language understanding.',
    fullDescription: 'Transform your customer support with our advanced AI-powered chatbot. This intelligent agent provides instant responses, handles complex queries, and seamlessly integrates with your existing CRM systems. Built with state-of-the-art natural language processing, it understands context, maintains conversation history, and escalates to human agents when needed.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop&q=80',
    price: 49.99,
    category: 'Support',
    features: ['24/7 Availability', 'Multi-language Support', 'CRM Integration', 'Sentiment Analysis', 'Custom Training', 'Analytics Dashboard'],
    rating: 4.8,
    sales: 1250,
    badge: 'BESTSELLER',
    isPro: true,
    useCases: [
      'Handle customer inquiries instantly',
      'Reduce support ticket volume by 60%',
      'Provide consistent service quality',
      'Scale support without hiring'
    ],
    integrations: ['Salesforce', 'Zendesk', 'Intercom', 'HubSpot'],
    techStack: ['GPT-4', 'Custom NLP', 'REST API', 'WebSocket'],
  },
  'content-generator-ai': {
    id: 2,
    name: 'Content Generator AI',
    description: 'Create engaging content for blogs, social media, and marketing campaigns in seconds.',
    fullDescription: 'Revolutionize your content creation workflow with our AI-powered content generator. From blog posts to social media captions, this agent creates high-quality, SEO-optimized content that matches your brand voice. It learns from your existing content and adapts to your style, ensuring consistency across all platforms.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop&q=80',
    price: 79.99,
    category: 'Content',
    features: ['SEO Optimized', 'Multiple Formats', 'Brand Voice', 'Plagiarism Check', 'Multi-language', 'Content Calendar'],
    rating: 4.9,
    sales: 890,
    badge: 'NEW',
    isPro: true,
    useCases: [
      'Generate blog posts in minutes',
      'Create social media content at scale',
      'Maintain consistent brand voice',
      'Optimize content for SEO'
    ],
    integrations: ['WordPress', 'Shopify', 'Mailchimp', 'Buffer'],
    techStack: ['GPT-4', 'Claude', 'SEO Tools', 'Content API'],
  },
  'data-analyst-agent': {
    id: 3,
    name: 'Data Analyst Agent',
    description: 'Automated data analysis and insights generation from your business metrics and reports.',
    fullDescription: 'Unlock the power of your data with our intelligent analytics agent. It automatically processes your business metrics, identifies trends, generates insights, and creates visual reports. Whether you need sales forecasts, customer behavior analysis, or performance metrics, this agent delivers actionable insights in real-time.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=80',
    price: 99.99,
    category: 'Analytics',
    features: ['Real-time Analysis', 'Visual Reports', 'Predictive Insights', 'Custom Dashboards', 'Data Export', 'Alert System'],
    rating: 4.7,
    sales: 650,
    badge: 'PRO',
    isPro: true,
    useCases: [
      'Automate data analysis workflows',
      'Generate predictive insights',
      'Create custom dashboards',
      'Monitor KPIs in real-time'
    ],
    integrations: ['Google Analytics', 'Tableau', 'Power BI', 'Snowflake'],
    techStack: ['Python', 'TensorFlow', 'Pandas', 'Data API'],
  },
  'email-assistant': {
    id: 4,
    name: 'Email Assistant',
    description: 'Smart email management that prioritizes, responds, and schedules meetings automatically.',
    fullDescription: 'Take control of your inbox with our intelligent email assistant. It automatically prioritizes important emails, drafts responses, schedules meetings, and organizes your inbox. Using advanced AI, it understands context, learns your communication style, and helps you stay productive.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=900&fit=crop&q=80',
    price: 39.99,
    category: 'Productivity',
    features: ['Auto-respond', 'Smart Scheduling', 'Priority Sorting', 'Email Templates', 'Calendar Sync', 'Follow-up Reminders'],
    rating: 4.6,
    sales: 2100,
    badge: 'POPULAR',
    isPro: false,
    useCases: [
      'Automate email responses',
      'Schedule meetings automatically',
      'Prioritize important messages',
      'Reduce email overload'
    ],
    integrations: ['Gmail', 'Outlook', 'Google Calendar', 'Calendly'],
    techStack: ['NLP', 'Calendar API', 'Email API', 'ML Models'],
  },
  'social-media-manager': {
    id: 5,
    name: 'Social Media Manager',
    description: 'Automated social media posting, engagement tracking, and audience analysis.',
    fullDescription: 'Streamline your social media presence with our comprehensive social media management agent. It creates content, schedules posts, engages with your audience, tracks performance, and provides insights. From Instagram to LinkedIn, manage all your social platforms from one intelligent agent.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=900&fit=crop&q=80',
    price: 69.99,
    category: 'Marketing',
    features: ['Multi-platform', 'Auto-posting', 'Analytics', 'Engagement Tracking', 'Hashtag Research', 'Content Suggestions'],
    rating: 4.8,
    sales: 1450,
    badge: 'TRENDING',
    isPro: true,
    useCases: [
      'Schedule posts across platforms',
      'Track engagement metrics',
      'Analyze audience behavior',
      'Optimize posting times'
    ],
    integrations: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook'],
    techStack: ['Social APIs', 'Analytics Engine', 'Content AI', 'Scheduler'],
  },
  'code-review-assistant': {
    id: 6,
    name: 'Code Review Assistant',
    description: 'AI-powered code review that catches bugs, suggests improvements, and enforces best practices.',
    fullDescription: 'Elevate your code quality with our intelligent code review assistant. It analyzes your code for bugs, security vulnerabilities, performance issues, and style violations. It provides detailed feedback, suggests improvements, and helps maintain coding standards across your team.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=900&fit=crop&q=80',
    price: 89.99,
    category: 'Development',
    features: ['Bug Detection', 'Best Practices', 'Security Scan', 'Performance Analysis', 'Code Suggestions', 'Style Checking'],
    rating: 4.9,
    sales: 780,
    badge: 'PRO',
    isPro: true,
    useCases: [
      'Catch bugs before deployment',
      'Enforce coding standards',
      'Improve code quality',
      'Speed up code reviews'
    ],
    integrations: ['GitHub', 'GitLab', 'Bitbucket', 'Jira'],
    techStack: ['AST Parser', 'Security Scanner', 'Code Analysis', 'Git API'],
  },
  'hr-recruiter-bot': {
    id: 7,
    name: 'HR Recruiter Bot',
    description: 'Automated candidate screening, interview scheduling, and initial assessments.',
    fullDescription: 'Transform your recruitment process with our HR recruiter bot. It screens resumes, conducts initial interviews, schedules follow-ups, and ranks candidates based on your criteria. Save time and find the best talent faster with AI-powered recruitment automation.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80',
    price: 119.99,
    category: 'HR',
    features: ['Resume Screening', 'Interview Scheduling', 'Candidate Ranking', 'Skill Assessment', 'Background Check', 'Onboarding'],
    rating: 4.7,
    sales: 520,
    badge: 'NEW',
    isPro: true,
    useCases: [
      'Screen resumes automatically',
      'Schedule interviews efficiently',
      'Rank candidates objectively',
      'Streamline onboarding process'
    ],
    integrations: ['LinkedIn', 'Indeed', 'ATS Systems', 'Calendar'],
    techStack: ['NLP', 'Matching Algorithm', 'Calendar API', 'ATS API'],
  },
  'ecommerce-assistant': {
    id: 8,
    name: 'E-commerce Assistant',
    description: 'Product recommendations, inventory management, and customer behavior analysis.',
    fullDescription: 'Boost your e-commerce sales with our intelligent assistant. It provides personalized product recommendations, manages inventory, analyzes customer behavior, and optimizes pricing. From cart abandonment recovery to cross-selling, this agent helps maximize your revenue.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop&q=80',
    price: 94.99,
    category: 'E-commerce',
    features: ['Inventory Tracking', 'Recommendations', 'Sales Analytics', 'Price Optimization', 'Cart Recovery', 'Customer Insights'],
    rating: 4.8,
    sales: 1100,
    badge: 'BESTSELLER',
    isPro: true,
    useCases: [
      'Increase conversion rates',
      'Optimize inventory levels',
      'Personalize shopping experience',
      'Recover abandoned carts'
    ],
    integrations: ['Shopify', 'WooCommerce', 'Magento', 'Stripe'],
    techStack: ['Recommendation Engine', 'Analytics', 'Inventory API', 'Payment API'],
  },
};

export default function AIAgentDetailPage({ params }) {
  const resolvedParams = use(params);
  const [theme, setTheme] = useState('light');
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const slug = resolvedParams?.slug || '';
    const data = AI_AGENTS_DATA[slug] || null;
    setAgent(data);
  }, [resolvedParams]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!agent) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
        <div className="text-center">
          <p className="text-xl">Agent not found</p>
          <a href="/ai-agents" className="text-[#74F5A1] hover:underline mt-4 inline-block">Back to Agents</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-theme={theme} className={theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}>
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2v2m0 12v2M4.22 4.22l1.42 1.42m8.72 8.72l1.42 1.42M2 10h2m12 0h2M4.22 15.78l1.42-1.42m8.72-8.72l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        )}
      </button>

      <Header theme={theme} />
      <AIAgentDetailHero agent={agent} theme={theme} />
      <AIAgentDetailContent agent={agent} theme={theme} />
      <AIAgentDetailFeatures agent={agent} theme={theme} />
      <AIAgentDetailPricing agent={agent} theme={theme} />
      <TalkToExpertSection theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

