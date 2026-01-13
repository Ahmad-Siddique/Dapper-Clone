"use client";

import Image from "next/image";

export default function ProjectOverview({ theme = "light" }) {
  const isDark = theme === "dark";

  // Sample data - replace with actual props
  const overview = {
    label: "OVERVIEW",
    title: "Overcoming all GRC challenges in one place",
    description:
      "The collaborative governance, risk, and compliance (GRC) assessment platform that helps the entire organization come together to enhance cybersecurity. It automates complex risk management tasks to improve data collection, risk identification, and regulatory compliance. Isora is trusted by information security teams at over 20% of high research activity universities (R1) in the United States.",
    client: {
      name: "SALTYCLOUD",
      location: "TEXAS, USA",
      flag: "🇺🇸",
    },
    services: [
      "UX AUDIT",
      "PRODUCT REDESIGN",
      "WEB DEVELOPMENT",
      "TEAM EXTENTION",
    ],
    technologies: [
      { name: "VITE", icon: "⚡" },
      { name: "REACT", icon: "⚛️" },
      { name: "TYPESCRIPT", icon: "TS" },
      { name: "REACT ROUTER DOM", icon: "🔀" },
      { name: "RADIX PRIMITIVES", icon: "▪️" },
      { name: "TAILWINDCSS", icon: "🌊" },
      { name: "RECHARTS", icon: "📊" },
      { name: "STORYBOOK", icon: "📚" },
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
        alt: "Dashboard analytics view",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
        alt: "Project details interface",
      },
    ],
  };

  return (
    <section className={`w-full ${isDark ? "bg-[#1a1a1a]" : "bg-white"}`}>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24">
          {/* Left Side - Label and Title */}
          <div>
            {/* Label */}
            <p
              className={`text-[12px] sm:text-[13px] md:text-[14px] font-semibold uppercase tracking-wider mb-8 sm:mb-10 md:mb-12 ${
                isDark ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {overview.label}
            </p>

            {/* Title */}
            <h2
              className={`text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[68px] font-semibold leading-[1.1] ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {overview.title}
            </h2>
          </div>

          {/* Right Side - Empty space on desktop */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Description and Info - Full width below, aligned to right column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-24 mt-12 md:mt-16 lg:mt-20">
          {/* Empty left column on desktop */}
          <div className="hidden lg:block"></div>

          {/* Description and Info on right */}
          <div className="space-y-12 sm:space-y-14 md:space-y-16">
            {/* Description */}
            <p
              className={`text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-light leading-relaxed ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {overview.description}
            </p>

            {/* Client */}
            <div>
              <h3
                className={`text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-normal mb-4 sm:mb-5 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Client
              </h3>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[14px] sm:text-[15px] md:text-[16px] font-light uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {overview.client.name}
                </span>
                <span className="text-[18px]">{overview.client.flag}</span>
                <span
                  className={`text-[14px] sm:text-[15px] md:text-[16px] font-light uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {overview.client.location}
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3
                className={`text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-normal mb-4 sm:mb-5 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Services
              </h3>
              <div className="flex flex-wrap gap-3">
                {overview.services.map((service, index) => (
                  <span
                    key={index}
                    className={`text-[13px] sm:text-[14px] md:text-[15px] font-light uppercase tracking-wider ${
                      isDark ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3
                className={`text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-normal mb-4 sm:mb-5 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {overview.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[16px] sm:text-[18px]">
                      {tech.icon}
                    </span>
                    <span
                      className={`text-[13px] sm:text-[14px] md:text-[15px] font-light uppercase tracking-wider ${
                        isDark ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images Section - Two columns side by side */}
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {overview.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
