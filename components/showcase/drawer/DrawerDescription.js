"use client";

import { forwardRef } from "react";

const DrawerDescription = forwardRef(function DrawerDescription({ description, theme = 'light' }, ref) {
  const isDark = theme === 'dark';
  return (
    <div ref={ref} className={`px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 border-t ${
      isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-[#E8E8E8] border-gray-300'
    }`}>
      <h3 className={`text-[20px] sm:text-[22px] md:text-[24px] font-bold mb-6 sm:mb-8 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Description
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {/* Main Description - Takes 2 columns */}
        <div className="md:col-span-2">
          <p className={`text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mb-4 sm:mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
});

export default DrawerDescription;

