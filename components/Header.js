// components/Header.tsx
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
    <header className="fixed top-6 md:top-8 left-0 right-0 z-50">
      {/* Center the header bar */}
      <div className="flex justify-center">
        {/* White bar */}
        <div className="flex items-center gap-8 lg:gap-10 bg-white rounded-lg shadow-sm px-6 md:px-8 lg:px-10 py-3 md:py-4">
          {/* Logo left */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            {/* Placeholder mark – replace with real logo if you have it */}
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
                <path d="M7 18C7 11 13 7 19 7V18H7Z" fill="#212121" />
                <path d="M19 18C25 18 29 24 29 28H19V18Z" fill="#212121" />
              </svg>
            </div>
            <span className="font-bold text-[22px] md:text-[24px] text-[#212121] tracking-tight leading-none font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
              Dapper
            </span>
          </Link>

          {/* Menu middle */}
          <nav className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex items-center gap-1 font-bold text-[15px] lg:text-[16px] text-[#212121] tracking-tight hover:text-[#74F5A1] transition-colors font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]"
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
            className="flex items-center gap-3 flex-shrink-0"
          >
            <span className="font-bold text-[15px] lg:text-[16px] text-[#212121] tracking-tight font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif]">
              Talk to us
            </span>
            <span className="w-9 h-9 bg-[#74F5A1] rounded-[4px] flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  d="M1 13L13 1M13 1H5M13 1V9"
                  fill="none"
                  stroke="#212121"
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
