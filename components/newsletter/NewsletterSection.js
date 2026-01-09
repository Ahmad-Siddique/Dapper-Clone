'use client';

import { useState } from 'react';

export default function NewsletterPage({ theme = 'light' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Handle successful submission
      setIsSuccess(true);
      setFormData({ name: '', email: '', agreedToTerms: false });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center pt-28 pb-8 px-4 md:px-6 lg:px-8 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#EFEFEF]'}`}>
      <div className="w-full max-w-[1800px]">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden ${isDark ? 'shadow-[0_20px_60px_rgba(255,255,255,0.05)]' : 'shadow-[0_20px_60px_rgba(0,0,0,0.15)]'}`}>
          {/* Left Column */}
          <div className={`${isDark ? 'bg-[#1a1a1a]' : 'bg-[#EFEFEF]'} p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center`}>
            {/* Badge */}
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
              <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] md:text-[16px] font-semibold tracking-[0.16em] uppercase ${isDark ? 'text-white' : 'text-[#212121]'}`}>
                Newsletter
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-12 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[1.05] tracking-[-0.02em]">
              <span className={`block text-[54px] sm:text-[63px] md:text-[72px] lg:text-[81px] xl:text-[90px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                Sign up for
              </span>
              <span className={`mt-1 block text-[54px] sm:text-[63px] md:text-[72px] lg:text-[81px] xl:text-[90px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                Tycho's <span className="italic font-light">personal</span>
              </span>
              <span className={`mt-1 block text-[54px] sm:text-[63px] md:text-[72px] lg:text-[81px] xl:text-[90px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                weekly mailing
              </span>
            </h1>

            {/* What to Expect */}
            <div>
              <h2 className={`mb-8 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[22px] md:text-[25px] lg:text-[27px] font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                What you can expect in B2B Marketing Made Stupid Simple
              </h2>

              {/* Benefits List */}
              <ul className="space-y-5">
                {[
                  'One value-packed e-mail every week, max 5 minutes to read',
                  'Real marketing lessons from B2B companies we work with daily',
                  'How to create content that beats your competitors',
                  'Ways to grow and engage your LinkedIn audience',
                  'Paid media tactics that improve ROI',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 mt-1.5 inline-flex h-5 w-5 rounded-sm bg-[#74F5A1]" />
                    <span className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[19px] md:text-[20px] lg:text-[21px] font-normal leading-relaxed ${isDark ? 'text-[#e0e0e0]' : 'text-[#212121]'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className={`${isDark ? 'bg-white' : 'bg-[#1A1A1A]'} p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center`}>
            {/* Header */}
            <div className="mb-12">
              <h2 className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] leading-[1.15] tracking-[-0.01em]">
                <span className={`block text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] italic font-light ${isDark ? 'text-[#111111]' : 'text-white'}`}>
                  Sign up for:
                </span>
                <span className={`mt-2 block text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold ${isDark ? 'text-[#111111]' : 'text-white'}`}>
                  B2B Marketing Made Stupid Simple
                </span>
              </h2>
            </div>

            {/* Author Profile */}
            <div className="mb-12 flex items-center gap-4">
              <div className={`relative h-14 w-14 rounded-full overflow-hidden ${isDark ? 'bg-[#EFEFEF]' : 'bg-[#2A2A2A]'}`}>
                <div className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${isDark ? 'text-[#111111]' : 'text-white'}`}>
                  TL
                </div>
              </div>
              <div>
                <h3 className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[17px] md:text-[18px] font-bold ${isDark ? 'text-[#111111]' : 'text-white'}`}>
                  Tycho Luijten
                </h3>
                <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] md:text-[15px] font-normal ${isDark ? 'text-[#666666]' : 'text-[#999999]'}`}>
                  Co-founder at Dapper
                </p>
              </div>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 rounded-lg bg-[#74F5A1] p-4 text-center">
                <p className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[15px] font-semibold text-[#111111]">
                  Successfully subscribed! Check your email for confirmation.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className={`mb-2 block font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] md:text-[15px] font-semibold ${isDark ? 'text-[#111111]' : 'text-white'}`}
                >
                  Name <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full rounded-lg ${isDark ? 'bg-[#EFEFEF] text-[#111111] placeholder:text-[#666666]' : 'bg-[#2A2A2A] text-white placeholder:text-[#666666]'} px-5 py-4 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[15px] md:text-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#74F5A1] ${
                    errors.name ? 'ring-2 ring-[#FF6B6B]' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-2 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] text-[#FF6B6B]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`mb-2 block font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] md:text-[15px] font-semibold ${isDark ? 'text-[#111111]' : 'text-white'}`}
                >
                  Email Address <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                  className={`w-full rounded-lg ${isDark ? 'bg-[#EFEFEF] text-[#111111] placeholder:text-[#666666]' : 'bg-[#2A2A2A] text-white placeholder:text-[#666666]'} px-5 py-4 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[15px] md:text-[16px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#74F5A1] ${
                    errors.email ? 'ring-2 ring-[#FF6B6B]' : ''
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-2 font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] text-[#FF6B6B]">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <p className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[13px] md:text-[14px] font-normal leading-relaxed ${isDark ? 'text-[#666666]' : 'text-[#999999]'}`}>
                By clicking 'Subscribe' you're confirming that you agree with our{' '}
                <a
                  href="/terms"
                  className={`${isDark ? 'text-[#111111]' : 'text-white'} underline transition-colors duration-200 hover:text-[#74F5A1]`}
                >
                  Terms and Conditions
                </a>
                .
              </p>

              {/* Submit Error */}
              {errors.submit && (
                <p className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[14px] text-[#FF6B6B]">
                  {errors.submit}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-3 rounded-lg bg-[#74F5A1] px-8 py-4 transition-all duration-300 hover:bg-[#5FE08D] hover:gap-4 hover:shadow-[0_8px_30px_rgba(116,245,161,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[16px] md:text-[17px] font-bold text-[#111111]">
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </span>
                {!isSubmitting && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#111111] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
