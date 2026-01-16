// components/ContactSection.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left content
      gsap.from(leftContentRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Animate form
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen ${isDark ? 'bg-[#2b2b2b]' : 'bg-[#E8E4E0]'} flex items-center justify-center px-6 py-20 lg:py-32 pt-32 lg:pt-40`}
    >
      <div className="container max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 xl:gap-32">
        {/* Left Content */}
        <div ref={leftContentRef} className="flex flex-col justify-between">
          {/* Top Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-[#7FFF7F] rounded-sm"></span>
              <span className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>Contact</span>
            </div>

            <h1 className={`text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1] ${isDark ? 'text-white' : 'text-black'}`}>
              Speak with an <span className="italic font-light font-serif">Expert</span>, not a salesperson
            </h1>
          </div>

          {/* Bottom Section */}
          <div className="space-y-8 mt-12 lg:mt-0">
            <p className={`text-2xl lg:text-3xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              When you book a meeting with us, you'll talk directly to a B2B marketing expert - not a sales rep. We're here to provide insights, brainstorm strategies, and discuss your growth goals from day one.
            </p>

            <div className="flex gap-6">
              <button className={`w-16 h-16 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-100'} rounded-lg flex items-center justify-center transition-colors`}>
                <svg className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </button>
              <button className={`w-16 h-16 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-100'} rounded-lg flex items-center justify-center transition-colors`}>
                <svg className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className={`${isDark ? 'bg-[#1A1A1A] border border-white/10' : 'bg-[#1A1A1A]'} rounded-3xl p-12 lg:p-16 xl:p-20`}>
          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-12">Get in touch</h2>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-white text-lg mb-3">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full bg-[#2A2A2A] text-white text-xl placeholder-gray-500 border-none rounded-lg px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#7FFF7F]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-lg mb-3">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                required
                className="w-full bg-[#2A2A2A] text-white text-xl placeholder-gray-500 border-none rounded-lg px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#7FFF7F]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white text-lg mb-3">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+31 6 12 34 56 78"
                className="w-full bg-[#2A2A2A] text-white text-xl placeholder-gray-500 border-none rounded-lg px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#7FFF7F]"
              />
            </div>

            <div>
              <label htmlFor="source" className="block text-white text-lg mb-3">
                Where did you hear about us? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Where did you hear about us?"
                required
                className="w-full bg-[#2A2A2A] text-white text-xl placeholder-gray-500 border-none rounded-lg px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#7FFF7F]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-lg mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Anything you'd like us to know?"
                rows={5}
                className="w-full bg-[#2A2A2A] text-white text-xl placeholder-gray-500 border-none rounded-lg px-6 py-5 resize-none focus:outline-none focus:ring-2 focus:ring-[#7FFF7F]"
              />
            </div>

            <p className="text-gray-400 text-base">
              By clicking 'Send Message' you're confirming that you agree with our{' '}
              <a href="#" className="underline hover:text-white">Terms and Conditions</a>.
            </p>

            <button
              type="submit"
              className="group inline-flex bg-[#7FFF7F] text-black text-xl font-semibold px-8 py-6 rounded-lg hover:bg-[#6FEF6F] transition-colors items-center gap-3"
            >
              <span>Send Message</span>
              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[4px] bg-black transition-colors duration-500">
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 14 14" 
                    fill="none"
                    stroke="#7FFF7F"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 13L13 1M13 1H5M13 1V9" />
                  </svg>
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 14 14" 
                    fill="none"
                    stroke="#7FFF7F"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 13L13 1M13 1H5M13 1V9" />
                  </svg>
                </span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
