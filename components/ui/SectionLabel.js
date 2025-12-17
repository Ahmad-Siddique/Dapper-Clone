export const SectionLabel = ({ text, className = "text-gray-300" }) => (
  <div className="hidden md:block col-span-2 relative">
    <div className={`sticky top-32 text-[16px] tracking-[0.25em] uppercase font-sans ${className}`}>
      {text}
    </div>
  </div>
);