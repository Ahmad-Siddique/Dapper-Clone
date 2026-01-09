"use client";

export default function DrawerCloseButton({ onClose, theme = 'light' }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onClose}
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
        isDark 
          ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]' 
          : 'bg-white hover:bg-gray-100'
      }`}
      aria-label="Close drawer"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDark ? 'text-white' : 'text-gray-900'}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

