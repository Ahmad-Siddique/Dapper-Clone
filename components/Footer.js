// components/Footer.jsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-white pt-8 pb-6 px-2 md:px-4">
      {/* Floating footer card */}
      <div className="mx-auto max-w-[1920px] rounded-2xl md:rounded-3xl bg-[#111111] shadow-[0_18px_70px_rgba(0,0,0,0.6)] border border-white/8 px-4 md:px-8 pt-16 pb-10">
        {/* TOP: 7 COLUMNS IN ONE ROW ON DESKTOP */}
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-7 border-b border-white/10 pb-14">
          {/* Contact Tycho */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Contact Tycho
            </h3>
            <div className="space-y-1.5">
              <a
                href="mailto:hello@dapper.agency"
                className="block font-[Helvetica Now Text,Arial,sans-serif] text-[15px] md:text-[16px] font-semibold text-[#D6D6D6] hover:text-[#74F5A1] transition-colors"
              >
                hello@dapper.agency
              </a>
              <a
                href="tel:+31103076707"
                className="block font-[Helvetica Now Text,Arial,sans-serif] text-[15px] md:text-[16px] font-semibold text-[#D6D6D6] hover:text-[#74F5A1] transition-colors"
              >
                +31 10 307 6707
              </a>
            </div>
          </div>

          {/* Dapper Rotterdam */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Dapper Rotterdam
            </h3>
            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] md:text-[16px] font-semibold leading-relaxed text-[#D6D6D6]">
              Weena 70, 13th floor
              <br />
              3012 CM Rotterdam
            </p>
          </div>

          {/* Dapper Lisbon */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Dapper Lisbon
            </h3>
            <p className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] md:text-[16px] font-semibold leading-relaxed text-[#D6D6D6]">
              Av. Duque de Loulé 12,
              <br />
              1050-093 Lisbon
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Services
            </h3>
            <nav className="space-y-1.5">
              <FooterLink href="/services/content-creative">
                Content &amp; Creative
              </FooterLink>
              <FooterLink href="/services/paid-media">
                Paid Media &amp; Performance
              </FooterLink>
              <FooterLink href="/services/data-measurement">
                Data &amp; Measurement
              </FooterLink>
              <FooterLink href="/services/demand-team">
                Demand Team
              </FooterLink>
              <FooterLink href="/services/demand-gen-agency">
                Demand Gen Agency
              </FooterLink>
              <FooterLink href="/services/demand-gen-training">
                Demand Gen Training
              </FooterLink>
            </nav>
          </div>

          {/* Expertise */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Expertise
            </h3>
            <nav className="space-y-1.5">
              <FooterLink href="/expertise/b2b-saas">B2B SaaS</FooterLink>
              <FooterLink href="/expertise/b2b-service">
                B2B Service
              </FooterLink>
              <FooterLink href="/expertise/b2b-hardware">
                B2B Hardware
              </FooterLink>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Resources
            </h3>
            <nav className="space-y-1.5">
              <FooterLink href="/cases">Cases</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/newsletter">Newsletter</FooterLink>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-[Helvetica Now Text,Arial,sans-serif] text-[20px] md:text-[22px] font-semibold tracking-tight">
              Company
            </h3>
            <nav className="space-y-1.5">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </nav>
          </div>
        </div>

        {/* LOGO BAND */}
        <div className="flex items-end border-b border-white/10 py-10">
          <div className="flex items-end gap-6">
            {/* Leaf mark */}
            <div className="h-[70px] w-[120px]">
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
            {/* Wordmark */}
            <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[46px] sm:text-[52px] md:text-[60px] font-extrabold tracking-tight">
              Dapper
            </span>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-6 py-6 text-[#D6D6D6] md:flex-row md:items-center md:justify-between">
          {/* Left: copyright + legal */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] font-semibold">
              © 2025 Dapper
            </span>
            <Link
              href="/privacy-policy"
              className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] font-semibold hover:text-[#74F5A1] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="font-[Helvetica Now Text,Arial,sans-serif] text-[15px] font-semibold hover:text-[#74F5A1] transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>

          {/* Middle: credits */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-[Helvetica Now Text,Arial,sans-serif] font-semibold">
            <span>Design by Nasick</span>
            <span>Code by Ahmad</span>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-3">
            <SocialIcon
              href="https://instagram.com"
              label="Instagram"
              type="instagram"
            />
            <SocialIcon
              href="https://linkedin.com"
              label="LinkedIn"
              type="linkedin"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block font-[Helvetica Now Text,Arial,sans-serif] text-[15px] md:text-[16px] font-semibold text-[#D6D6D6] hover:text-[#74F5A1] transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ href, label, type }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#181818] text-white transition-all hover:bg-[#74F5A1] hover:text-[#111111] hover:scale-105"
    >
      {type === 'instagram' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.066a6.771 6.771 0 1 0 0 13.542 6.771 6.771 0 0 0 0-13.542zm7.2-1.596a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.604 4.088 5.5 2.99 5.5 1.89 5.5 1 4.604 1 3.5 1 2.398 1.89 1.5 2.99 1.5c1.098 0 1.99.898 1.99 2zm.02 4H1V22h4V7.5zm7.982 0H9V22h4v-7.7c0-4.066 5-3.113 5 0V22h4v-8.994C22 7.64 14.89 7.812 12.982 11V7.5z" />
        </svg>
      )}
    </a>
  );
}
