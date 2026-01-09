"use client";

const sections = [
  { id: "highlights", label: "Highlights" },
  { id: "colorPalette", label: "Colors" },
  { id: "technologies", label: "Tools" },
  { id: "description", label: "Description" },
  { id: "insideLook", label: "Inside Look" },
  { id: "score", label: "Score" },
  { id: "votes", label: "Votes" },
  { id: "collections", label: "Collections" },
];

export default function DrawerNavigation({ activeSection, onSectionClick }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full px-4">
      <div className="bg-black rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-2xl flex items-center gap-0.5 sm:gap-1 overflow-x-auto max-w-full sm:max-w-[90vw] mx-auto scrollbar-hide">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-[12px] md:text-[13px] font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
              activeSection === section.id
                ? "bg-white text-black"
                : "bg-transparent text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}

