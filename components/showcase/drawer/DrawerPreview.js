"use client";

import Image from "next/image";

export default function DrawerPreview({ image, title }) {
  const hasImage = image && image.trim() !== "";
  
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[980px] bg-[#1F1F1F] overflow-hidden">
      {hasImage ? (
        <Image
          src={image}
          alt={`${title || 'Project'} preview`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

