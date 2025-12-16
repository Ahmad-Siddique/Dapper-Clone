export const SectionLabel = ({ text }) => (
  <div className="hidden md:block col-span-2 relative">
    <div className="sticky top-32 text-[16px]  tracking-[0.25em] uppercase text-gray-300 font-sans">
      {text}
    </div>
  </div>
);