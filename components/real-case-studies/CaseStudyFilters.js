"use client";

export default function CaseStudyFilters({
  categories,
  activeCategory,
  onCategoryChange,
  theme = "light",
}) {
  const isDark = theme === "dark";

  return (
    <div className="mb-12 sm:mb-16 md:mb-20">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4
                text-[11px] sm:text-[12px] md:text-[13px] font-bold
                tracking-wider uppercase
                rounded-full
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isActive
                    ? isDark
                      ? "bg-white text-black focus:ring-white"
                      : "bg-black text-white focus:ring-black"
                    : isDark
                    ? "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] focus:ring-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400"
                }
              `}
              aria-pressed={isActive}
              aria-label={`Filter by ${category.label}`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
