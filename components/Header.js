// components/Header.jsx
import Link from 'next/link';

const navItems = [
  { label: 'Services', hasDropdown: true },
  { label: 'Expertise', hasDropdown: true },
  { label: 'Cases', hasDropdown: false },
  { label: 'Resources', hasDropdown: true },
  { label: 'About', hasDropdown: false },
  { label: 'Careers', hasDropdown: false },
];

export default function Header() {
  return (
    <header className="fixed top-6 md:top-8 left-0 right-0 z-50 antialiased">
      {/* Center the header bar */}
      <div className="flex justify-center px-2 md:px-4">
        {/* White bar */}
        <div className="flex w-full max-w-[1180px] items-center gap-8 lg:gap-10 rounded-[14px] bg-white px-7 md:px-9 lg:px-12 py-[14px] md:py-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {/* Logo left */}
          <Link href="/" className="flex flex-shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center">
              <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
                <path d="M7 18C7 11 13 7 19 7V18H7Z" fill="#111111" />
                <path d="M19 18C25 18 29 24 29 28H19V18Z" fill="#111111" />
              </svg>
            </div>
            <span className="font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[24px] md:text-[26px] font-bold leading-none tracking-tight text-text-black">
              Dapper
            </span>
          </Link>

          {/* Menu middle */}
          <nav className="flex flex-1 items-center justify-center gap-7 lg:gap-9">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex items-center gap-1 font-[Helvetica_Now_Text,Arial,sans-serif] text-[18px] lg:text-[19px]  tracking-tight text-black transition-colors hover:text-[#74F5A1]"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <svg
                    width="9"
                    height="5"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {/* Right: Talk to us */}
          <Link
            href="#talk"
            className="flex flex-shrink-0 items-center gap-3"
          >
            <span className="font-[Helvetica_Now_Text,Arial,sans-serif] text-[17px] lg:text-[18px]  tracking-tight text-black">
              Talk to us
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#74F5A1]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  d="M1 13L13 1M13 1H5M13 1V9"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
