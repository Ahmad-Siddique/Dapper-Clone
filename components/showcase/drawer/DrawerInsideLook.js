"use client";

import { forwardRef } from "react";
import Image from "next/image";

const DrawerInsideLook = forwardRef(function DrawerInsideLook({ insideLookImages = [], theme = 'light' }, ref) {
  const isDark = theme === 'dark';

  return (
    <div ref={ref} className={`px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 border-t ${
      isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-[#E8E8E8] border-gray-300'
    }`}>
      <span className={`text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-wide mb-2 sm:mb-3 block ${
        isDark ? 'text-gray-500' : 'text-gray-500'
      }`}>
        Inside look
      </span>
      <h3 className={`text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold leading-tight mb-8 sm:mb-10 md:mb-12 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Discover more
        <br />
        details of this SOTD.
      </h3>

      {/* Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {insideLookImages.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Card with image as background */}
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[650px]"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Label Below */}
            <div className="mt-3 sm:mt-4">
              <p className={`text-[13px] sm:text-[14px] md:text-[15px] ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="font-semibold">Great element</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-500'}> from </span>
                <span className="font-semibold">{item.title}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default DrawerInsideLook;

