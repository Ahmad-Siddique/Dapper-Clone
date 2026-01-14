// components/Footer.jsx
'use client';

import Link from 'next/link';

export default function Footer({ theme = 'light' }) {
  // Theme-based styles
  const footerBg = theme === 'dark' ? '#f5f5f5' : '#2A2A2A';
  const cardBg = theme === 'dark' ? '#FFFFFF' : '#111111';
  const textColor = theme === 'dark' ? '#111111' : 'text-white';
  const secondaryTextColor = theme === 'dark' ? '#444444' : '#D6D6D6';
  const borderColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  const socialBg = theme === 'dark' ? '#F5F5F5' : '#181818';
  
  // Background pattern for dark theme
  const bgPatternStyle = theme === 'dark' ? {
    backgroundImage: `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"),
      radial-gradient(ellipse at top left, rgba(0, 0, 0, 0.02), transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 0.01), transparent 50%)
    `,
    backgroundBlendMode: 'overlay, normal, normal',
  } : {};

  return (
    <>
      <style jsx global>{`
        @keyframes underlineSlideIn {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            transform-origin: left;
          }
          51% {
            transform-origin: right;
          }
          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }
        
        @keyframes underlineHover {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .footer-link-underline {
          position: relative;
          display: inline-block;
          padding-bottom: 2px;
        }

        .footer-link-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #74F5A1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .footer-link-underline:hover::after {
          transform: scaleX(1);
        }

        /* Animation for hover effect */
        .footer-link-underline:hover {
          animation: none;
        }

        .footer-link-underline:hover::after {
          animation: underlineHover 0.3s ease forwards;
        }

        /* Social icon hover animation */
        .social-icon-animate {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-icon-animate:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(116, 245, 161, 0.3);
        }
      `}</style>

      <footer 
        className="pt-4 sm:pt-5 md:pt-6 pb-6 sm:pb-7 md:pb-8 px-4 sm:px-5 md:px-6 lg:px-8"
        style={{ backgroundColor: footerBg, ...bgPatternStyle }}
      >
        {/* Floating footer card */}
        <div 
          className="mx-auto max-w-[1920px] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_18px_70px_rgba(0,0,0,0.15)] px-4 sm:px-5 md:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-7 md:pb-8"
          style={{ 
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`
          }}
        >
          {/* TOP: 7 COLUMNS IN ONE ROW ON DESKTOP */}
          <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 border-b pb-6 sm:pb-7 md:pb-8" style={{ borderColor }}>
            {/* Contact Tycho */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Contact Tycho
              </h3>
              <div className="space-y-0.5 sm:space-y-1">
                <a
                  href="mailto:hello@dapper.agency"
                  className="footer-link-underline block font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold transition-colors break-all"
                  style={{ color: secondaryTextColor }}
                >
                  hello@dapper.agency
                </a>
                <a
                  href="tel:+31103076707"
                  className="footer-link-underline block font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold transition-colors"
                  style={{ color: secondaryTextColor }}
                >
                  +31 10 307 6707
                </a>
              </div>
            </div>

            {/* Dapper Rotterdam */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Dapper Rotterdam
              </h3>
              <p 
                className="font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold leading-relaxed"
                style={{ color: secondaryTextColor }}
              >
                Weena 70, 13th floor
                <br />
                3012 CM Rotterdam
              </p>
            </div>

            {/* Dapper Lisbon */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Dapper Lisbon
              </h3>
              <p 
                className="font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold leading-relaxed"
                style={{ color: secondaryTextColor }}
              >
                Av. Duque de Loulé 12,
                <br />
                1050-093 Lisbon
              </p>
            </div>

            {/* Services */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Services
              </h3>
              <nav className="space-y-0.5 sm:space-y-1">
                <FooterLink href="/services/content-creative" theme={theme}>
                  Content &amp; Creative
                </FooterLink>
                <FooterLink href="/services/paid-media" theme={theme}>
                  Paid Media &amp; Performance
                </FooterLink>
                <FooterLink href="/services/data-measurement" theme={theme}>
                  Data &amp; Measurement
                </FooterLink>
                <FooterLink href="/services/demand-team" theme={theme}>
                  Demand Team
                </FooterLink>
                <FooterLink href="/services/demand-gen-agency" theme={theme}>
                  Demand Gen Agency
                </FooterLink>
                <FooterLink href="/services/demand-gen-training" theme={theme}>
                  Demand Gen Training
                </FooterLink>
              </nav>
            </div>

            {/* Expertise */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Expertise
              </h3>
              <nav className="space-y-0.5 sm:space-y-1">
                <FooterLink href="/expertise/b2b-saas" theme={theme}>
                  B2B SaaS
                </FooterLink>
                <FooterLink href="/expertise/b2b-service" theme={theme}>
                  B2B Service
                </FooterLink>
                <FooterLink href="/expertise/b2b-hardware" theme={theme}>
                  B2B Hardware
                </FooterLink>
              </nav>
            </div>

            {/* Resources */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Resources
              </h3>
              <nav className="space-y-0.5 sm:space-y-1">
                <FooterLink href="/cases" theme={theme}>Cases</FooterLink>
                <FooterLink href="/blog" theme={theme}>Blog</FooterLink>
                <FooterLink href="/newsletter" theme={theme}>Newsletter</FooterLink>
              </nav>
            </div>

            {/* Company */}
            <div className="space-y-1.5 sm:space-y-2">
              <h3 className={`font-[Helvetica Now Text,Arial,sans-serif] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Company
              </h3>
              <nav className="space-y-0.5 sm:space-y-1">
                <FooterLink href="/about" theme={theme}>About</FooterLink>
                <FooterLink href="/careers" theme={theme}>Careers</FooterLink>
                <FooterLink href="/contact" theme={theme}>Contact</FooterLink>
              </nav>
            </div>
          </div>

          {/* LOGO BAND */}
          <div className="flex items-end border-b py-4 sm:py-5 md:py-6" style={{ borderColor }}>
            <div className="flex items-end gap-2 sm:gap-3 md:gap-4">
              {/* Leaf mark - smaller */}
              <div className="h-[32px] w-[54px] sm:h-[38px] sm:w-[64px] md:h-[45px] md:w-[75px]">
                <svg
                  viewBox="0 0 120 80"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M0 40C0 17.9 17.9 0 40 0h40v40c0 22.1-17.9 40-40 40H0V40z"
                    fill="#74F5A1"
                  />
                </svg>
              </div>
              {/* Wordmark - smaller */}
              <span className={`font-[Helvetica Now Text,Arial,sans-serif] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[46px] font-extrabold tracking-tight ${theme === 'dark' ? 'text-[#111111]' : 'text-white'}`}>
                Dapper
              </span>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col gap-3 sm:gap-4 py-3 sm:py-4 md:flex-row md:items-center md:justify-between">
            {/* Left: copyright + legal */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2">
              <span 
                className="font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold"
                style={{ color: secondaryTextColor }}
              >
                © 2025 Dapper
              </span>
              <Link
                href="/privacy-policy"
                className="footer-link-underline font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold transition-colors"
                style={{ color: secondaryTextColor }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="footer-link-underline font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold transition-colors"
                style={{ color: secondaryTextColor }}
              >
                Terms and Conditions
              </Link>
            </div>

            {/* Middle: credits */}
            <div 
              className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-[Helvetica Now Text,Arial,sans-serif] font-semibold"
              style={{ color: secondaryTextColor }}
            >
              <span>Design by Nasick</span>
              <span>Code by Ahmad</span>
            </div>

            {/* Right: social icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                type="instagram"
                theme={theme}
              />
              <SocialIcon
                href="https://linkedin.com"
                label="LinkedIn"
                type="linkedin"
                theme={theme}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterLink({ href, children, theme = 'light' }) {
  const textColor = theme === 'dark' ? '#444444' : '#D6D6D6';
  
  return (
    <Link
      href={href}
      className="footer-link-underline block font-[Helvetica Now Text,Arial,sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold transition-colors"
      style={{ color: textColor }}
    >
      {children}
    </Link>
  );
}

function SocialIcon({ href, label, type, theme = 'light' }) {
  const socialBg = theme === 'dark' ? '#F5F5F5' : '#181818';
  const socialColor = theme === 'dark' ? '#111111' : '#FFFFFF';
  
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon-animate flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-[8px] sm:rounded-[10px] transition-all"
      style={{ 
        backgroundColor: socialBg,
        color: socialColor
      }}
    >
      {type === 'instagram' ? (
        <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.066a6.771 6.771 0 1 0 0 13.542 6.771 6.771 0 0 0 0-13.542zm7.2-1.596a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
        </svg>
      ) : (
        <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.604 4.088 5.5 2.99 5.5 1.89 5.5 1 4.604 1 3.5 1 2.398 1.89 1.5 2.99 1.5c1.098 0 1.99.898 1.99 2zm.02 4H1V22h4V7.5zm7.982 0H9V22h4v-7.7c0-4.066 5-3.113 5 0V22h4v-8.994C22 7.64 14.89 7.812 12.982 11V7.5z" />
        </svg>
      )}
    </a>
  );
}