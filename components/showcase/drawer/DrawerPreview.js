"use client";

import Image from "next/image";

export default function DrawerPreview({ image, title }) {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[980px] bg-[#1F1F1F] overflow-hidden">
      <Image
        src={image}
        alt={`${title} preview`}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </div>
  );
}

