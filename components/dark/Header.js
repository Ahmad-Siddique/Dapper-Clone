// // components/Header.jsx
// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import Link from "next/link";

// const navItems = [
//   { label: "Services", hasDropdown: true, type: "mega" },
//   { label: "Expertise", hasDropdown: true, type: "mega" },
//   { label: "Cases", hasDropdown: false },
//   { label: "Resources", hasDropdown: true, type: "mega" },
//   { label: "About", hasDropdown: false },
//   { label: "Careers", hasDropdown: false },
// ];

// const SERVICES_ROW_1 = [
//   {
//     id: "content",
//     title: "Content & Creative",
//     description: "We'll make your prospects stop scrolling.",
//     href: "/services/content-creative",
//   },
//   {
//     id: "paid",
//     title: "Paid Media & Performance",
//     description: "Build, optimize and scale your performance marketing.",
//     href: "/services/paid-media",
//   },
//   {
//     id: "data",
//     title: "Data & Measurement",
//     description: "We make the invisible visible.",
//     href: "/services/data-measurement",
//   },
// ];

// const SERVICES_ROW_2 = [
//   {
//     id: "demand-team",
//     title: "Demand Team",
//     description: "Your dedicated demand generation team.",
//     href: "/services/demand-team",
//   },
//   {
//     id: "demand-agency",
//     title: "Demand Gen Agency",
//     description: "Full-service demand generation partnership.",
//     href: "/services/demand-gen-agency",
//   },
// ];

// const EXPERTISE_ITEMS = [
//   {
//     id: "b2b-saas",
//     title: "B2B SaaS",
//     description:
//       "Specialized marketing strategies for SaaS companies looking to scale.",
//     href: "/expertise/b2b-saas",
//   },
//   {
//     id: "b2b-service",
//     title: "B2B Service",
//     description: "Drive demand for your professional services business.",
//     href: "/expertise/b2b-service",
//   },
//   {
//     id: "b2b-hardware",
//     title: "B2B Hardware",
//     description:
//       "Marketing solutions for hardware and equipment manufacturers.",
//     href: "/expertise/b2b-hardware",
//   },
// ];

// const RESOURCES_ITEMS = [
//   {
//     id: "blog",
//     title: "Blog",
//     description:
//       "Insights, strategies, and best practices for B2B marketing success.",
//     href: "/blog",
//   },
//   {
//     id: "newsletter",
//     title: "Newsletter",
//     description:
//       "Get the latest demand generation insights delivered to your inbox.",
//     href: "/newsletter",
//   },
// ];

// export default function Header({ theme = "light" }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const dropdownTimeoutRef = useRef(null);

//   // Triangle animation effects - only for light theme (original)
//   const [triangles, setTriangles] = useState([]);
//   const triangleIdRef = useRef(0);

//   const handleMouseEnter = (label) => {
//     if (dropdownTimeoutRef.current) {
//       clearTimeout(dropdownTimeoutRef.current);
//     }
//     setActiveDropdown(label);
//   };

//   const handleMouseLeave = () => {
//     dropdownTimeoutRef.current = setTimeout(() => {
//       setActiveDropdown(null);
//       setHoveredCard(null);
//     }, 150);
//   };

//   const createTriangle = useCallback(
//     (x, y) => {
//       // Only create triangles for light theme (original behavior)
//       if (theme === "light") {
//         const id = triangleIdRef.current++;
//         const size = Math.random() * 5 + 8;
//         const rotation = Math.random() * 360;
//         const greenShades = ["#74F5A1", "#5FE08D", "#4DD97F", "#3BC972"];
//         const color =
//           greenShades[Math.floor(Math.random() * greenShades.length)];

//         const newTriangle = {
//           id,
//           x,
//           y,
//           size,
//           rotation,
//           color,
//         };

//         setTriangles((prev) => [...prev, newTriangle]);

//         setTimeout(() => {
//           setTriangles((prev) => prev.filter((t) => t.id !== id));
//         }, 800);
//       }
//     },
//     [theme]
//   );

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       // Only create triangles in dropdowns when active
//       if (activeDropdown && theme === "light") {
//         const dropdown = document.querySelector(
//           `[data-dropdown="${activeDropdown}"]`
//         );
//         if (dropdown) {
//           const rect = dropdown.getBoundingClientRect();
//           if (
//             e.clientX >= rect.left &&
//             e.clientX <= rect.right &&
//             e.clientY >= rect.top &&
//             e.clientY <= rect.bottom
//           ) {
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             createTriangle(x, y);
//           }
//         }
//       }
//     };

//     // Throttle mouse move events
//     let lastTime = 0;
//     const throttleDelay = 80;

//     const throttledMouseMove = (e) => {
//       const currentTime = Date.now();
//       if (currentTime - lastTime < throttleDelay) return;
//       lastTime = currentTime;
//       handleMouseMove(e);
//     };

//     document.addEventListener("mousemove", throttledMouseMove);

//     return () => {
//       document.removeEventListener("mousemove", throttledMouseMove);
//       if (dropdownTimeoutRef.current) {
//         clearTimeout(dropdownTimeoutRef.current);
//       }
//     };
//   }, [activeDropdown, createTriangle, theme]);

//   useEffect(() => {
//     return () => {
//       if (dropdownTimeoutRef.current) {
//         clearTimeout(dropdownTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Theme-based styles
//   const headerBg = theme === "dark" ? "#111111" : "#FFFFFF"; // Black for dark theme
//   const textColor = theme === "dark" ? "#FFFFFF" : "#111111"; // White text for dark theme
//   const hoverBg = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "#F5F5F5";
//   const dropdownBg = theme === "dark" ? "#1A1A1A" : "#FFFFFF"; // Dark dropdown for dark theme
//   const dropdownBorder =
//     theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
//   const cardBg = theme === "dark" ? "#2A2A2A" : "#FAFAFA"; // Dark cards for dark theme
//   const cardText = theme === "dark" ? "#FFFFFF" : "#111111";
//   const cardDesc = theme === "dark" ? "#A0A0A0" : "#444444";
//   const mobilePanelBg = theme === "dark" ? "#1A1A1A" : "#FFFFFF";
//   const mobilePanelText = theme === "dark" ? "#FFFFFF" : "#111111";
//   const mobileBorder =
//     theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";

//   return (
//     <>
//       <style jsx global>{`
//         @keyframes triangle-fade {
//           0% {
//             opacity: 0.7;
//             transform: translate(-50%, -50%) scale(1);
//           }
//           100% {
//             opacity: 0;
//             transform: translate(-50%, -50%) scale(1.5);
//           }
//         }

//         .animate-triangle-fade {
//           animation: triangle-fade 0.8s ease-out forwards;
//         }

//         /* Header link hover animation */
//         .header-link {
//           position: relative;
//         }

//         .header-link::after {
//           content: "";
//           position: absolute;
//           width: 100%;
//           height: 2px;
//           bottom: 0;
//           left: 0;
//           background-color: #74f5a1;
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.3s ease;
//         }

//         .header-link:hover::after {
//           transform: scaleX(1);
//         }

//         /* Mobile menu button animation */
//         .mobile-menu-btn span {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         /* Card hover animation */
//         .dropdown-card {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .dropdown-card:hover {
//           transform: translateY(-2px);
//         }
//       `}</style>

//       <header className="fixed left-0 right-0 top-6 z-50 antialiased md:top-8">
//         <div className="flex justify-center px-2 md:px-4">
//           <div
//             className="flex w-full max-w-[1180px] items-center gap-4 rounded-[14px] px-4 py-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:gap-8 md:px-9 md:py-[16px] lg:px-12"
//             style={{
//               backgroundColor: headerBg,
//               border:
//                 theme === "dark"
//                   ? "1px solid rgba(255, 255, 255, 0.08)"
//                   : "none",
//             }}
//           >
//             {/* Logo */}
//             <Link href="/" className="flex flex-shrink-0 items-center gap-3">
//               <div className="flex h-9 w-9 items-center justify-center">
//                 <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
//                   <path
//                     d="M7 18C7 11 13 7 19 7V18H7Z"
//                     fill={theme === "dark" ? "#74F5A1" : "#111111"}
//                   />
//                   <path
//                     d="M19 18C25 18 29 24 29 28H19V18Z"
//                     fill={theme === "dark" ? "#74F5A1" : "#111111"}
//                   />
//                 </svg>
//               </div>
//               <span
//                 className={`font-[Helvetica_Now_Text,Helvetica,Arial,sans-serif] text-[22px] md:text-[26px] font-bold leading-none tracking-tight`}
//                 style={{ color: textColor }}
//               >
//                 Dapper
//               </span>
//             </Link>

//             {/* Desktop NAV */}
//             <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex lg:gap-9">
//               {navItems.map((item) => (
//                 <div
//                   key={item.label}
//                   className="relative"
//                   onMouseEnter={() =>
//                     item.hasDropdown && handleMouseEnter(item.label)
//                   }
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button
//                     type="button"
//                     className="header-link flex items-center gap-1 font-[Helvetica_Now_Text,Arial,sans-serif] text-[18px] lg:text-[19px] tracking-tight transition-all duration-200 cursor-pointer px-3 py-2 rounded-[8px]"
//                     style={{
//                       color: textColor,
//                       backgroundColor:
//                         activeDropdown === item.label ? hoverBg : "transparent",
//                     }}
//                   >
//                     <span>{item.label}</span>
//                     {item.hasDropdown && (
//                       <svg
//                         width="9"
//                         height="5"
//                         viewBox="0 0 10 6"
//                         aria-hidden="true"
//                         className={`transition-transform duration-300 ${
//                           activeDropdown === item.label ? "rotate-180" : ""
//                         }`}
//                       >
//                         <path
//                           d="M1 1L5 5L9 1"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.4"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               ))}
//             </nav>

//             {/* Desktop CTA */}
//             <div className="hidden flex-shrink-0 items-center lg:flex">
//               {/* Desktop CTA */}
//               <div className="hidden flex-shrink-0 items-center lg:flex">
//                 <Link href="#talk" className="group flex items-center gap-3">
//                   <span
//                     className="font-[Helvetica_Now_Text,Arial,sans-serif] text-[17px] lg:text-[18px] tracking-tight"
//                     style={{ color: textColor }}
//                   >
//                     Talk to us
//                   </span>

//                   <span
//                     className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-colors duration-500 ${
//                       theme === "dark"
//                         ? "group-hover:bg-white"
//                         : "group-hover:bg-black"
//                     }`}
//                   >
//                     <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M1 13L13 1M13 1H5M13 1V9"
//                           fill="none"
//                           stroke={theme === "dark" ? "#111111" : "#111111"}
//                           strokeWidth="1.8"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </span>
//                     <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M1 13L13 1M13 1H5M13 1V9"
//                           fill="none"
//                           stroke={theme === "dark" ? "#111111" : "#74F5A1"}
//                           strokeWidth="1.8"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </span>
//                   </span>
//                 </Link>
//               </div>
//             </div>

//             {/* Mobile hamburger */}
//             <button
//               type="button"
//               onClick={() => setMobileOpen((o) => !o)}
//               aria-label="Toggle navigation"
//               aria-expanded={mobileOpen}
//               className="mobile-menu-btn ml-auto flex h-10 w-10 items-center justify-center rounded-[8px] border transition-colors lg:hidden"
//               style={{
//                 borderColor:
//                   theme === "dark"
//                     ? "rgba(255, 255, 255, 0.15)"
//                     : "rgba(0, 0, 0, 0.1)",
//                 backgroundColor: theme === "dark" ? "#2A2A2A" : headerBg,
//                 color: textColor,
//               }}
//             >
//               <span className="sr-only">Open navigation</span>
//               <div className="relative h-4 w-5">
//                 <span
//                   className={`absolute left-0 h-[2px] w-full rounded transition-all duration-300 ${
//                     mobileOpen
//                       ? "top-1/2 translate-y-[-50%] rotate-45"
//                       : "top-0"
//                   }`}
//                   style={{ backgroundColor: textColor }}
//                 />
//                 <span
//                   className={`absolute left-0 h-[2px] w-full rounded transition-all duration-300 ${
//                     mobileOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
//                   }`}
//                   style={{ backgroundColor: textColor }}
//                 />
//                 <span
//                   className={`absolute left-0 h-[2px] w-full rounded transition-all duration-300 ${
//                     mobileOpen
//                       ? "top-1/2 translate-y-[-50%] -rotate-45"
//                       : "bottom-0"
//                   }`}
//                   style={{ backgroundColor: textColor }}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* MEGA MENU DROPDOWN - Services */}
//         <div
//           data-dropdown="Services"
//           className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
//             activeDropdown === "Services"
//               ? "opacity-100 translate-y-0 pointer-events-auto"
//               : "opacity-0 -translate-y-2 pointer-events-none"
//           }`}
//           onMouseEnter={() => handleMouseEnter("Services")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="flex justify-center px-2 md:px-4">
//             <div
//               className="w-full max-w-[1180px] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6 relative overflow-hidden"
//               style={{
//                 backgroundColor: dropdownBg,
//                 border: `1px solid ${dropdownBorder}`,
//               }}
//             >
//               {/* Triangle animations - only for light theme */}
//               {theme === "light" &&
//                 triangles.map((triangle) => (
//                   <div
//                     key={triangle.id}
//                     className="pointer-events-none absolute animate-triangle-fade"
//                     style={{
//                       left: `${triangle.x}px`,
//                       top: `${triangle.y}px`,
//                       width: "0",
//                       height: "0",
//                       borderLeft: `${triangle.size / 2}px solid transparent`,
//                       borderRight: `${triangle.size / 2}px solid transparent`,
//                       borderBottom: `${triangle.size}px solid ${triangle.color}`,
//                       transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
//                       opacity: 0.7,
//                     }}
//                   />
//                 ))}

//               {/* Row 1: 3 Cards */}
//               <div
//                 className="grid gap-4 mb-4 transition-all duration-500 ease-out"
//                 style={{
//                   gridTemplateColumns:
//                     hoveredCard === "content"
//                       ? "1.28fr 0.86fr 0.86fr"
//                       : hoveredCard === "paid"
//                       ? "0.86fr 1.28fr 0.86fr"
//                       : hoveredCard === "data"
//                       ? "0.86fr 0.86fr 1.28fr"
//                       : "1fr 1fr 1fr",
//                 }}
//               >
//                 {SERVICES_ROW_1.map((service) => {
//                   const isHovered = hoveredCard === service.id;
//                   return (
//                     <Link
//                       key={service.id}
//                       href={service.href}
//                       onMouseEnter={() => setHoveredCard(service.id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-4 py-4 min-h-[150px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
//                       style={{
//                         borderColor:
//                           theme === "dark"
//                             ? "rgba(255, 255, 255, 0.1)"
//                             : "rgba(0, 0, 0, 0.06)",
//                         backgroundColor: cardBg,
//                       }}
//                     >
//                       <div>
//                         <h3
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
//                           style={{ color: cardText }}
//                         >
//                           {service.title}
//                         </h3>
//                         <p
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
//                           style={{ color: cardDesc }}
//                         >
//                           {service.description}
//                         </p>
//                       </div>

//                       <div className="flex justify-end mt-4">
//                         <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
//                           <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
//                             <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#111111"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                             <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#74F5A1"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                           </span>
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>

//               {/* Row 2: 2 Cards */}
//               <div
//                 className="grid gap-4 transition-all duration-500 ease-out"
//                 style={{
//                   gridTemplateColumns:
//                     hoveredCard === "demand-team"
//                       ? "1.28fr 0.72fr"
//                       : hoveredCard === "demand-agency"
//                       ? "0.72fr 1.28fr"
//                       : "1fr 1fr",
//                 }}
//               >
//                 {SERVICES_ROW_2.map((service) => {
//                   const isHovered = hoveredCard === service.id;
//                   return (
//                     <Link
//                       key={service.id}
//                       href={service.href}
//                       onMouseEnter={() => setHoveredCard(service.id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-4 py-4 min-h-[150px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
//                       style={{
//                         borderColor:
//                           theme === "dark"
//                             ? "rgba(255, 255, 255, 0.1)"
//                             : "rgba(0, 0, 0, 0.06)",
//                         backgroundColor: cardBg,
//                       }}
//                     >
//                       <div>
//                         <h3
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
//                           style={{ color: cardText }}
//                         >
//                           {service.title}
//                         </h3>
//                         <p
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
//                           style={{ color: cardDesc }}
//                         >
//                           {service.description}
//                         </p>
//                       </div>

//                       <div className="flex justify-end mt-4">
//                         <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
//                           <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
//                             <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#111111"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                             <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#74F5A1"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                           </span>
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MEGA MENU DROPDOWN - Expertise */}
//         <div
//           data-dropdown="Expertise"
//           className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
//             activeDropdown === "Expertise"
//               ? "opacity-100 translate-y-0 pointer-events-auto"
//               : "opacity-0 -translate-y-2 pointer-events-none"
//           }`}
//           onMouseEnter={() => handleMouseEnter("Expertise")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="flex justify-center px-2 md:px-4">
//             <div
//               className="w-full max-w-[1180px] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6 relative overflow-hidden"
//               style={{
//                 backgroundColor: dropdownBg,
//                 border: `1px solid ${dropdownBorder}`,
//               }}
//             >
//               {/* Triangle animations - only for light theme */}
//               {theme === "light" &&
//                 triangles.map((triangle) => (
//                   <div
//                     key={triangle.id}
//                     className="pointer-events-none absolute animate-triangle-fade"
//                     style={{
//                       left: `${triangle.x}px`,
//                       top: `${triangle.y}px`,
//                       width: "0",
//                       height: "0",
//                       borderLeft: `${triangle.size / 2}px solid transparent`,
//                       borderRight: `${triangle.size / 2}px solid transparent`,
//                       borderBottom: `${triangle.size}px solid ${triangle.color}`,
//                       transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
//                       opacity: 0.7,
//                     }}
//                   />
//                 ))}

//               {/* Single Row: 3 Cards */}
//               <div
//                 className="grid gap-4 transition-all duration-500 ease-out"
//                 style={{
//                   gridTemplateColumns:
//                     hoveredCard === "b2b-saas"
//                       ? "1.28fr 0.86fr 0.86fr"
//                       : hoveredCard === "b2b-service"
//                       ? "0.86fr 1.28fr 0.86fr"
//                       : hoveredCard === "b2b-hardware"
//                       ? "0.86fr 0.86fr 1.28fr"
//                       : "1fr 1fr 1fr",
//                 }}
//               >
//                 {EXPERTISE_ITEMS.map((item) => {
//                   const isHovered = hoveredCard === item.id;
//                   return (
//                     <Link
//                       key={item.id}
//                       href={item.href}
//                       onMouseEnter={() => setHoveredCard(item.id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-4 py-4 min-h-[150px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
//                       style={{
//                         borderColor:
//                           theme === "dark"
//                             ? "rgba(255, 255, 255, 0.1)"
//                             : "rgba(0, 0, 0, 0.06)",
//                         backgroundColor: cardBg,
//                       }}
//                     >
//                       <div>
//                         <h3
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
//                           style={{ color: cardText }}
//                         >
//                           {item.title}
//                         </h3>
//                         <p
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
//                           style={{ color: cardDesc }}
//                         >
//                           {item.description}
//                         </p>
//                       </div>

//                       <div className="flex justify-end mt-4">
//                         <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
//                           <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
//                             <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#111111"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                             <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#74F5A1"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                           </span>
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MEGA MENU DROPDOWN - Resources */}
//         <div
//           data-dropdown="Resources"
//           className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
//             activeDropdown === "Resources"
//               ? "opacity-100 translate-y-0 pointer-events-auto"
//               : "opacity-0 -translate-y-2 pointer-events-none"
//           }`}
//           onMouseEnter={() => handleMouseEnter("Resources")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="flex justify-center px-2 md:px-4">
//             <div
//               className="w-full max-w-[1180px] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6 relative overflow-hidden"
//               style={{
//                 backgroundColor: dropdownBg,
//                 border: `1px solid ${dropdownBorder}`,
//               }}
//             >
//               {/* Triangle animations - only for light theme */}
//               {theme === "light" &&
//                 triangles.map((triangle) => (
//                   <div
//                     key={triangle.id}
//                     className="pointer-events-none absolute animate-triangle-fade"
//                     style={{
//                       left: `${triangle.x}px`,
//                       top: `${triangle.y}px`,
//                       width: "0",
//                       height: "0",
//                       borderLeft: `${triangle.size / 2}px solid transparent`,
//                       borderRight: `${triangle.size / 2}px solid transparent`,
//                       borderBottom: `${triangle.size}px solid ${triangle.color}`,
//                       transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
//                       opacity: 0.7,
//                     }}
//                   />
//                 ))}

//               {/* Single Row: 2 Cards */}
//               <div
//                 className="grid gap-4 transition-all duration-500 ease-out"
//                 style={{
//                   gridTemplateColumns:
//                     hoveredCard === "blog"
//                       ? "1.28fr 0.72fr"
//                       : hoveredCard === "newsletter"
//                       ? "0.72fr 1.28fr"
//                       : "1fr 1fr",
//                 }}
//               >
//                 {RESOURCES_ITEMS.map((item) => {
//                   const isHovered = hoveredCard === item.id;
//                   return (
//                     <Link
//                       key={item.id}
//                       href={item.href}
//                       onMouseEnter={() => setHoveredCard(item.id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
//                       style={{
//                         borderColor:
//                           theme === "dark"
//                             ? "rgba(255, 255, 255, 0.1)"
//                             : "rgba(0, 0, 0, 0.06)",
//                         backgroundColor: cardBg,
//                       }}
//                     >
//                       <div>
//                         <h3
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
//                           style={{ color: cardText }}
//                         >
//                           {item.title}
//                         </h3>
//                         <p
//                           className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
//                           style={{ color: cardDesc }}
//                         >
//                           {item.description}
//                         </p>
//                       </div>

//                       <div className="flex justify-end mt-4">
//                         <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
//                           <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
//                             <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#111111"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                             <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                               <svg
//                                 width="14"
//                                 height="14"
//                                 viewBox="0 0 14 14"
//                                 aria-hidden="true"
//                               >
//                                 <path
//                                   d="M1 13L13 1M13 1H5M13 1V9"
//                                   fill="none"
//                                   stroke="#74F5A1"
//                                   strokeWidth="1.8"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </span>
//                           </span>
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile dropdown panel */}
//         <div
//           className={`
//             lg:hidden
//             ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}
//           `}
//         >
//           <div
//             className={`
//               mx-auto mt-2 w-full max-w-[1180px] px-2 md:px-4
//               transition-[max-height,opacity,transform] duration-300 ease-out
//               ${
//                 mobileOpen
//                   ? "max-h-[320px] opacity-100 translate-y-0"
//                   : "max-h-0 opacity-0 -translate-y-2"
//               }
//             `}
//           >
//             <div
//               className="overflow-hidden rounded-[14px] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
//               style={{
//                 backgroundColor: mobilePanelBg,
//                 border:
//                   theme === "dark"
//                     ? "1px solid rgba(255, 255, 255, 0.1)"
//                     : "none",
//               }}
//             >
//               <nav className="flex flex-col gap-2">
//                 {navItems.map((item) => (
//                   <button
//                     key={item.label}
//                     type="button"
//                     className="flex items-center justify-between rounded-[8px] px-1 py-2 text-left font-[Helvetica_Now_Text,Arial,sans-serif] text-[16px] tracking-tight transition-colors hover:bg-[rgba(255,255,255,0.1)]"
//                     style={{ color: mobilePanelText }}
//                   >
//                     <span>{item.label}</span>
//                     {item.hasDropdown && (
//                       <svg
//                         width="9"
//                         height="5"
//                         viewBox="0 0 10 6"
//                         aria-hidden="true"
//                         style={{ color: mobilePanelText, opacity: 0.7 }}
//                       >
//                         <path
//                           d="M1 1L5 5L9 1"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.4"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 ))}
//               </nav>

//               <div
//                 className="mt-4 border-t pt-4"
//                 style={{ borderColor: mobileBorder }}
//               >
//                 <Link
//                   href="#talk"
//                   onClick={() => setMobileOpen(false)}
//                   className={`group inline-flex w-full items-center justify-between rounded-[10px] px-4 py-3 font-[Helvetica_Now_Text,Arial,sans-serif] text-[15px] font-semibold tracking-tight ${
//                     theme === "dark" ? "text-[#111111]" : "text-white"
//                   } transition-transform duration-300 ease-out hover:scale-[1.02]`}
//                   style={{
//                     backgroundColor: theme === "dark" ? "#74F5A1" : "#111111",
//                   }}
//                 >
//                   <span>Talk to us</span>
//                   <span
//                     className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-colors duration-500 ${
//                       theme === "dark"
//                         ? "group-hover:bg-white"
//                         : "group-hover:bg-black"
//                     }`}
//                   >
//                     <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
//                       <svg
//                         width="12"
//                         height="12"
//                         viewBox="0 0 14 14"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M1 13L13 1M13 1H5M13 1V9"
//                           fill="none"
//                           stroke="#111111"
//                           strokeWidth="1.8"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </span>
//                     <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
//                       <svg
//                         width="12"
//                         height="12"
//                         viewBox="0 0 14 14"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M1 13L13 1M13 1H5M13 1V9"
//                           fill="none"
//                           stroke="#111111"
//                           strokeWidth="1.8"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </span>
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }







































































// components/Header.jsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const navItems = [
  { label: "Services", hasDropdown: true, type: "mega", href: "/services1" },
  { label: "Expertise", hasDropdown: true, type: "mega", href: "/expertise" },
  { label: "Cases", hasDropdown: false, href: "/case-studies" },
  { label: "Resources", hasDropdown: true, type: "mega" },
  { label: "About", hasDropdown: false, href: "/about" },
  { label: "Careers", hasDropdown: false, href: "/work" },
];

const SERVICES_ROW_1 = [
  {
    id: "content",
    title: "Content & Creative",
    description: "We'll make your prospects stop scrolling.",
    href: "/services/content-creative",
  },
  {
    id: "paid",
    title: "Paid Media & Performance",
    description: "Build, optimize and scale your performance marketing.",
    href: "/services/paid-media",
  },
  {
    id: "data",
    title: "Data & Measurement",
    description: "We make the invisible visible.",
    href: "/services/data-measurement",
  },
  {
    id: "services1",
    title: "Services",
    description: "Global qualitative research services.",
    href: "/services1",
  },
];

const SERVICES_ROW_2 = [
  {
    id: "demand-team",
    title: "Demand Team",
    description: "Your dedicated demand generation team.",
    href: "/services/demand-team",
  },
  {
    id: "demand-agency",
    title: "Demand Gen Agency",
    description: "Full-service demand generation partnership.",
    href: "/services/demand-gen-agency",
  },
];

const EXPERTISE_ITEMS = [
  {
    id: "b2b-saas",
    title: "B2B SaaS",
    description:
      "Specialized marketing strategies for SaaS companies looking to scale.",
    href: "/expertise/b2b-saas",
  },
  {
    id: "b2b-service",
    title: "B2B Service",
    description: "Drive demand for your professional services business.",
    href: "/expertise/b2b-service",
  },
  {
    id: "b2b-hardware",
    title: "B2B Hardware",
    description:
      "Marketing solutions for hardware and equipment manufacturers.",
    href: "/expertise/b2b-hardware",
  },
];

const RESOURCES_ITEMS = [
  {
    id: "blog",
    title: "Blog",
    description:
      "Insights, strategies, and best practices for B2B marketing success.",
    href: "/blog",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description:
      "Get the latest demand generation insights delivered to your inbox.",
    href: "/newsletter",
  },
];

export default function Header({ theme = "light" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  // Triangle animation effects - only for light theme (original)
  const [triangles, setTriangles] = useState([]);
  const triangleIdRef = useRef(0);

  // Refs for Get a Quote button animation
  const getQuoteBtnRef = useRef(null);
  const getQuoteOverlayRef = useRef(null);
  const faceIconRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const smileRef = useRef(null);
  const faceContainerRef = useRef(null);

  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredCard(null);
    }, 150);
  };

  const createTriangle = useCallback(
    (x, y) => {
      // Only create triangles for light theme (original behavior)
      if (theme === "light") {
        const id = triangleIdRef.current++;
        const size = Math.random() * 5 + 8;
        const rotation = Math.random() * 360;
        const greenShades = ["#013825", "#295E4C", "#9E8F72", "#CEC8B0"];
        const color =
          greenShades[Math.floor(Math.random() * greenShades.length)];

        const newTriangle = {
          id,
          x,
          y,
          size,
          rotation,
          color,
        };

        setTriangles((prev) => [...prev, newTriangle]);

        setTimeout(() => {
          setTriangles((prev) => prev.filter((t) => t.id !== id));
        }, 800);
      }
    },
    [theme]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only create triangles in dropdowns when active
      if (activeDropdown && theme === "light") {
        const dropdown = document.querySelector(
          `[data-dropdown="${activeDropdown}"]`
        );
        if (dropdown) {
          const rect = dropdown.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createTriangle(x, y);
          }
        }
      }
    };

    // Throttle mouse move events
    let lastTime = 0;
    const throttleDelay = 80;

    const throttledMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;
      lastTime = currentTime;
      handleMouseMove(e);
    };

    document.addEventListener("mousemove", throttledMouseMove);

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [activeDropdown, createTriangle, theme]);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // GSAP animation for Get a Quote button
  useEffect(() => {
    const btn = getQuoteBtnRef.current;
    const overlay = getQuoteOverlayRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    const smile = smileRef.current;
    const faceContainer = faceContainerRef.current;
    const faceIcon = faceIconRef.current;

    if (!btn || !overlay || !faceIcon) return;

    // Initialize overlay to scaleY: 0
    gsap.set(overlay, {
      scaleY: 0,
      transformOrigin: "bottom center",
    });

    // Initialize face rotation
    if (faceContainer) {
      gsap.set(faceContainer, {
        rotation: 0,
        transformOrigin: "center center",
      });
    }

    const calculateAngle = (e) => {
      if (!faceIcon || !faceContainer) return 0;
      const rect = faceIcon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle from face center to cursor
      // atan2 gives angle in radians, convert to degrees
      // Y is first parameter (vertical), X is second (horizontal)
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      
      // Return the angle directly (atan2 already gives correct direction)
      return angle;
    };

    // Global mouse move handler - tracks cursor everywhere on the page
    const handleGlobalMouseMove = (e) => {
      if (!faceContainer || !faceIcon) return;
      
      const rect = faceIcon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate relative position
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate angle - atan2 gives angle in radians, convert to degrees
      // atan2(y, x) gives angle from positive x-axis
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      // Limit rotation to make it subtle (max 25 degrees)
      const limitedAngle = Math.max(-25, Math.min(25, angle));
      
      gsap.to(faceContainer, {
        rotation: limitedAngle,
        duration: 0.4,
        ease: "power2.out",
      });

      // Move eyes slightly towards cursor based on horizontal position
      if (leftEye && rightEye) {
        // Normalize eye movement based on horizontal distance (max 2px movement)
        const eyeOffset = Math.max(-2, Math.min(2, deltaX * 0.1));
        
        gsap.to(leftEye, {
          x: eyeOffset,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(rightEye, {
          x: eyeOffset,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseEnter = () => {
      // Animate overlay
      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Animate face - eyes get bigger and smile widens
      if (leftEye && rightEye) {
        gsap.to([leftEye, rightEye], {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }

      if (smile) {
        gsap.to(smile, {
          scaleY: 1.3,
          scaleX: 1.1,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      // Animate overlay back
      gsap.to(overlay, {
        scaleY: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      // Don't reset face rotation - keep tracking cursor globally
      // Animate face back to normal size
      if (leftEye && rightEye) {
        gsap.to([leftEye, rightEye], {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (smile) {
        gsap.to(smile, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Add global mouse move listener to track cursor everywhere
    document.addEventListener("mousemove", handleGlobalMouseMove);
    
    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Color Palettes
  const lightColors = {
    primary: "#013825",      // Deep Forest Green
    secondary: "#9E8F72",    // Golden Brown (updated)
    tertiary: "#CEC8B0",     // Light Beige/Tan (updated)
    background: "#F9F7F0",   // Very light neutral for main background
    text: "#111111",
    hoverBg: "#F5F5F5",
  };

  const darkColors = {
    primary: "#74F5A1",
    secondary: "#5FE08D",
    tertiary: "#3BC972",
    background: "#1A1A1A",
    text: "#FFFFFF",
    hoverBg: "rgba(255, 255, 255, 0.1)",
  };

  // Theme-based styles
  const headerBg = theme === "dark" ? darkColors.background : lightColors.tertiary; // Light brown for light theme
  const textColor = theme === "dark" ? darkColors.text : lightColors.text;
  const hoverBg = theme === "dark" ? darkColors.hoverBg : lightColors.hoverBg;
  const dropdownBg = theme === "dark" ? darkColors.background : lightColors.tertiary; // Light brown for light theme
  const dropdownBorder =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
  const cardBg = theme === "dark" ? "#2A2A2A" : lightColors.background; // Wheat for light theme
  const cardText = theme === "dark" ? darkColors.text : lightColors.text;
  const cardDesc = theme === "dark" ? "#A0A0A0" : "#444444";
  const mobilePanelBg = theme === "dark" ? darkColors.background : lightColors.tertiary;
  const mobilePanelText = theme === "dark" ? darkColors.text : lightColors.text;
  const mobileBorder =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";

  return (
    <>
      <style jsx global>{`
        @keyframes triangle-fade {
          0% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .animate-triangle-fade {
          animation: triangle-fade 0.8s ease-out forwards;
        }

        /* Header link hover animation */
        .header-link {
          position: relative;
        }

        .header-link::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #74f5a1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        
        [data-theme="light"] .header-link::after {
          background-color: #013825;
        }

        .header-link:hover::after {
          transform: scaleX(1);
        }

        /* Mobile menu button animation */
        .mobile-menu-btn span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Card hover animation */
        .dropdown-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dropdown-card:hover {
          transform: translateY(-2px);
        }

        /* Get a Quote button overlay */
        .get-quote-btn {
          position: relative;
          overflow: hidden;
        }

        .get-quote-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #FFEB3B;
          z-index: 0;
          pointer-events: none;
          border-radius: 10px;
        }

        .get-quote-btn-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      <header className="fixed left-0 right-0 top-6 z-50 antialiased md:top-8">
        <div className="flex items-center justify-center px-2 md:px-4 gap-3">
          <div
            className="flex w-full max-w-[800px] items-center gap-2 rounded-[14px] px-3 py-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:gap-4 md:px-5 md:py-[10px] lg:px-6"
            style={{
              backgroundColor: headerBg,
              border:
                theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "none",
            }}
          >
            {/* Logo */}
            <Link href="/dark" className="flex flex-shrink-0 items-center gap-3 md:gap-4">
              {/* Keep logo tall enough to be visible, but don't force extra header height */}
              <div className="relative flex h-11 w-auto md:h-12 items-center justify-center">
                <Image
                  src="/logo/techeyrie_logo.png"
                  alt="TechEyrie Logo"
                  width={96}
                  height={96}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop NAV */}
            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex lg:gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && handleMouseEnter(item.label)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="header-link flex items-center gap-1 font-[Helvetica_Now_Text,Arial,sans-serif] text-[14px] tracking-tight transition-all duration-200 cursor-pointer px-3 py-1.5 rounded-[8px]"
                      style={{
                        color: textColor,
                        backgroundColor:
                          activeDropdown === item.label ? hoverBg : "transparent",
                      }}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 10 6"
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="header-link flex items-center gap-1 font-[Helvetica_Now_Text,Arial,sans-serif] text-[14px] tracking-tight transition-all duration-200 cursor-pointer px-3 py-1.5 rounded-[8px]"
                      style={{
                        color: textColor,
                        backgroundColor:
                          activeDropdown === item.label ? hoverBg : "transparent",
                      }}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 10 6"
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden flex-shrink-0 items-center gap-3 lg:flex">
              {/* Talk to us Button */}
              <Link href="/contact" className="group flex items-center gap-2">
                <span
                  className="font-[Helvetica_Now_Text,Arial,sans-serif] text-[14px] tracking-tight"
                  style={{ color: textColor }}
                >
                  Talk to us
                </span>

                <span
                  className={`relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-colors duration-500 ${
                    theme === "dark"
                      ? "group-hover:bg-white"
                      : "group-hover:bg-black"
                  }`}
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 14 14"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 13L13 1M13 1H5M13 1V9"
                        fill="none"
                        stroke={theme === "dark" ? "#111111" : "#111111"}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 14 14"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 13L13 1M13 1H5M13 1V9"
                        fill="none"
                        stroke={theme === "dark" ? "#111111" : "#74F5A1"}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </Link>

            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              className="mobile-menu-btn ml-auto flex h-10 w-10 items-center justify-center rounded-[8px] border transition-colors lg:hidden"
              style={{
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.1)",
                backgroundColor: theme === "dark" ? "#2A2A2A" : headerBg,
                color: textColor,
              }}
            >
              <span className="sr-only">Open navigation</span>
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 h-[2px] w-full rounded transition-all duration-300 ${
                    mobileOpen
                      ? "top-1/2 translate-y-[-50%] rotate-45"
                      : "top-0"
                  }`}
                  style={{ backgroundColor: textColor }}
                />
                <span
                  className={`absolute left-0 h-[2px] w-full rounded transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                  }`}
                  style={{ backgroundColor: textColor }}
                />
                <span
                  className={`absolute left-0 h-[2px] w-full rounded transition-all duration-300 ${
                    mobileOpen
                      ? "top-1/2 translate-y-[-50%] -rotate-45"
                      : "bottom-0"
                  }`}
                  style={{ backgroundColor: textColor }}
                />
              </div>
            </button>
          </div>

          {/* Get a Quote Button - Outside Header */}
          <Link 
            ref={getQuoteBtnRef}
            href="/pricing-calculator" 
            className="get-quote-btn group hidden lg:flex items-center gap-2 px-4 py-2 rounded-[10px] transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex-shrink-0"
            style={{
              backgroundColor: theme === "dark" ? "#FFFFFF" : "#FFFFFF",
            }}
          >
            {/* Animated overlay */}
            <div ref={getQuoteOverlayRef} className="get-quote-overlay" />
            
            <div className="get-quote-btn-content">
              <span
                className="font-[Helvetica_Now_Text,Arial,sans-serif] text-[14px] font-semibold tracking-tight"
                style={{ color: theme === "dark" ? "#111111" : "#111111" }}
              >
                Get a quote
              </span>
              
              {/* Smiling Face Icon */}
              <div 
                ref={faceIconRef}
                className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: "#4285F4" }}
              >
              <svg
                ref={faceContainerRef}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transformOrigin: "12px 12px" }}
              >
                {/* Face circle */}
                <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
                {/* Left eye */}
                <circle ref={leftEyeRef} cx="9" cy="10" r="1.8" fill="#4285F4" style={{ transformOrigin: "9px 10px" }} />
                {/* Right eye */}
                <circle ref={rightEyeRef} cx="15" cy="10" r="1.8" fill="#4285F4" style={{ transformOrigin: "15px 10px" }} />
                {/* Eye highlights */}
                <circle cx="9.5" cy="9.5" r="0.6" fill="#FFFFFF" />
                <circle cx="15.5" cy="9.5" r="0.6" fill="#FFFFFF" />
                {/* Big friendly smile */}
                <path
                  ref={smileRef}
                  d="M8 15.5C8 15.5 9.5 18 12 18C14.5 18 16 15.5 16 15.5"
                  stroke="#4285F4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transformOrigin: "12px 16.75px" }}
                />
                {/* Cheek blush */}
                <ellipse cx="7" cy="13" rx="1.5" ry="1" fill="#FFB6C1" opacity="0.6" />
                <ellipse cx="17" cy="13" rx="1.5" ry="1" fill="#FFB6C1" opacity="0.6" />
              </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* MEGA MENU DROPDOWN - Services */}
        <div
          data-dropdown="Services"
          className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
            activeDropdown === "Services"
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("Services")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-center px-2 md:px-4">
            <div
              className="w-full max-w-[800px] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-4 relative overflow-hidden"
              style={{
                backgroundColor: dropdownBg,
                border: `1px solid ${dropdownBorder}`,
              }}
            >
              {/* Triangle animations - only for light theme */}
              {theme === "light" &&
                triangles.map((triangle) => (
                  <div
                    key={triangle.id}
                    className="pointer-events-none absolute animate-triangle-fade"
                    style={{
                      left: `${triangle.x}px`,
                      top: `${triangle.y}px`,
                      width: "0",
                      height: "0",
                      borderLeft: `${triangle.size / 2}px solid transparent`,
                      borderRight: `${triangle.size / 2}px solid transparent`,
                      borderBottom: `${triangle.size}px solid ${triangle.color}`,
                      transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
                      opacity: 0.7,
                    }}
                  />
                ))}

              {/* Row 1: 4 Cards */}
              <div
                className="grid gap-4 mb-4 transition-all duration-500 ease-out"
                style={{
                  gridTemplateColumns:
                    hoveredCard === "content"
                      ? "1.28fr 0.86fr 0.86fr 0.86fr"
                      : hoveredCard === "paid"
                      ? "0.86fr 1.28fr 0.86fr 0.86fr"
                      : hoveredCard === "data"
                      ? "0.86fr 0.86fr 1.28fr 0.86fr"
                      : hoveredCard === "services1"
                      ? "0.86fr 0.86fr 0.86fr 1.28fr"
                      : "1fr 1fr 1fr 1fr",
                }}
              >
                {SERVICES_ROW_1.map((service) => {
                  const isHovered = hoveredCard === service.id;
                  return (
                    <Link
                      key={service.id}
                      href={service.href}
                      onMouseEnter={() => setHoveredCard(service.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
                      style={{
                        borderColor:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.06)",
                        backgroundColor: cardBg,
                      }}
                    >
                      <div>
                        <h3
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
                          style={{ color: cardText }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
                          style={{ color: cardDesc }}
                        >
                          {service.description}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
                          <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#111111"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#74F5A1"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Row 2: 2 Cards */}
              <div
                className="grid gap-4 transition-all duration-500 ease-out"
                style={{
                  gridTemplateColumns:
                    hoveredCard === "demand-team"
                      ? "1.28fr 0.72fr"
                      : hoveredCard === "demand-agency"
                      ? "0.72fr 1.28fr"
                      : "1fr 1fr",
                }}
              >
                {SERVICES_ROW_2.map((service) => {
                  const isHovered = hoveredCard === service.id;
                  return (
                    <Link
                      key={service.id}
                      href={service.href}
                      onMouseEnter={() => setHoveredCard(service.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
                      style={{
                        borderColor:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.06)",
                        backgroundColor: cardBg,
                      }}
                    >
                      <div>
                        <h3
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
                          style={{ color: cardText }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
                          style={{ color: cardDesc }}
                        >
                          {service.description}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
                          <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#111111"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#74F5A1"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* MEGA MENU DROPDOWN - Expertise */}
        <div
          data-dropdown="Expertise"
          className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
            activeDropdown === "Expertise"
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("Expertise")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-center px-2 md:px-4">
            <div
              className="w-full max-w-[800px] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-4 relative overflow-hidden"
              style={{
                backgroundColor: dropdownBg,
                border: `1px solid ${dropdownBorder}`,
              }}
            >
              {/* Triangle animations - only for light theme */}
              {theme === "light" &&
                triangles.map((triangle) => (
                  <div
                    key={triangle.id}
                    className="pointer-events-none absolute animate-triangle-fade"
                    style={{
                      left: `${triangle.x}px`,
                      top: `${triangle.y}px`,
                      width: "0",
                      height: "0",
                      borderLeft: `${triangle.size / 2}px solid transparent`,
                      borderRight: `${triangle.size / 2}px solid transparent`,
                      borderBottom: `${triangle.size}px solid ${triangle.color}`,
                      transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
                      opacity: 0.7,
                    }}
                  />
                ))}

              {/* Single Row: 3 Cards */}
              <div
                className="grid gap-4 transition-all duration-500 ease-out"
                style={{
                  gridTemplateColumns:
                    hoveredCard === "b2b-saas"
                      ? "1.28fr 0.86fr 0.86fr"
                      : hoveredCard === "b2b-service"
                      ? "0.86fr 1.28fr 0.86fr"
                      : hoveredCard === "b2b-hardware"
                      ? "0.86fr 0.86fr 1.28fr"
                      : "1fr 1fr 1fr",
                }}
              >
                {EXPERTISE_ITEMS.map((item) => {
                  const isHovered = hoveredCard === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
                      style={{
                        borderColor:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.06)",
                        backgroundColor: cardBg,
                      }}
                    >
                      <div>
                        <h3
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
                          style={{ color: cardText }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
                          style={{ color: cardDesc }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
                          <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#111111"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#74F5A1"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* MEGA MENU DROPDOWN - Resources */}
        <div
          data-dropdown="Resources"
          className={`hidden lg:block absolute left-0 right-0 top-[calc(100%+8px)] transition-all duration-300 ${
            activeDropdown === "Resources"
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("Resources")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-center px-2 md:px-4">
            <div
              className="w-full max-w-[800px] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-4 relative overflow-hidden"
              style={{
                backgroundColor: dropdownBg,
                border: `1px solid ${dropdownBorder}`,
              }}
            >
              {/* Triangle animations - only for light theme */}
              {theme === "light" &&
                triangles.map((triangle) => (
                  <div
                    key={triangle.id}
                    className="pointer-events-none absolute animate-triangle-fade"
                    style={{
                      left: `${triangle.x}px`,
                      top: `${triangle.y}px`,
                      width: "0",
                      height: "0",
                      borderLeft: `${triangle.size / 2}px solid transparent`,
                      borderRight: `${triangle.size / 2}px solid transparent`,
                      borderBottom: `${triangle.size}px solid ${triangle.color}`,
                      transform: `translate(-50%, -50%) rotate(${triangle.rotation}deg)`,
                      opacity: 0.7,
                    }}
                  />
                ))}

              {/* Single Row: 2 Cards */}
              <div
                className="grid gap-4 transition-all duration-500 ease-out"
                style={{
                  gridTemplateColumns:
                    hoveredCard === "blog"
                      ? "1.28fr 0.72fr"
                      : hoveredCard === "newsletter"
                      ? "0.72fr 1.28fr"
                      : "1fr 1fr",
                }}
              >
                {RESOURCES_ITEMS.map((item) => {
                  const isHovered = hoveredCard === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="dropdown-card group relative flex flex-col justify-between rounded-xl border px-6 py-6 min-h-[180px] transition-all duration-500 ease-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] cursor-pointer"
                      style={{
                        borderColor:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.06)",
                        backgroundColor: cardBg,
                      }}
                    >
                      <div>
                        <h3
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[16px] font-semibold tracking-tight mb-2"
                          style={{ color: cardText }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="font-[Helvetica Now Text,Arial,sans-serif] text-[13px] font-regular leading-snug"
                          style={{ color: cardDesc }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center">
                          <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-all duration-500 ease-out group-hover:bg-black group-hover:scale-110 group-hover:-translate-y-[1px]">
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#111111"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 13L13 1M13 1H5M13 1V9"
                                  fill="none"
                                  stroke="#74F5A1"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        <div
          className={`
            lg:hidden
            ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}
          `}
        >
          <div
            className={`
              mx-auto mt-2 w-full max-w-[1180px] px-2 md:px-4
              transition-[max-height,opacity,transform] duration-300 ease-out
              ${
                mobileOpen
                  ? "max-h-[320px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2"
              }
            `}
          >
            <div
              className="overflow-hidden rounded-[14px] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              style={{
                backgroundColor: mobilePanelBg,
                border:
                  theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "none",
              }}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-[8px] px-1 py-2 text-left font-[Helvetica_Now_Text,Arial,sans-serif] text-[16px] tracking-tight transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                      style={{ color: mobilePanelText }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      type="button"
                      className="flex items-center justify-between rounded-[8px] px-1 py-2 text-left font-[Helvetica_Now_Text,Arial,sans-serif] text-[16px] tracking-tight transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                      style={{ color: mobilePanelText }}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <svg
                          width="9"
                          height="5"
                          viewBox="0 0 10 6"
                          aria-hidden="true"
                          style={{ color: mobilePanelText, opacity: 0.7 }}
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  )
                ))}
              </nav>

              <div
                className="mt-4 border-t pt-4 space-y-3"
                style={{ borderColor: mobileBorder }}
              >
                {/* Talk to us Button - Mobile */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`group inline-flex w-full items-center justify-between rounded-[10px] px-4 py-3 font-[Helvetica_Now_Text,Arial,sans-serif] text-[15px] font-semibold tracking-tight ${
                    theme === "dark" ? "text-[#111111]" : "text-white"
                  } transition-transform duration-300 ease-out hover:scale-[1.02]`}
                  style={{
                    backgroundColor: theme === "dark" ? "#74F5A1" : "#111111",
                  }}
                >
                  <span>Talk to us</span>
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[4px] bg-[#74F5A1] transition-colors duration-500 ${
                      theme === "dark"
                        ? "group-hover:bg-white"
                        : "group-hover:bg-black"
                    }`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 13L13 1M13 1H5M13 1V9"
                          fill="none"
                          stroke="#111111"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 13L13 1M13 1H5M13 1V9"
                          fill="none"
                          stroke="#111111"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>

                {/* Get a Quote Button - Mobile */}
                <Link
                  href="/pricing-calculator"
                  onClick={() => setMobileOpen(false)}
                  className="group inline-flex w-full items-center justify-between rounded-[10px] px-4 py-3 font-[Helvetica_Now_Text,Arial,sans-serif] text-[15px] font-semibold tracking-tight transition-transform duration-300 ease-out hover:scale-[1.02]"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#111111",
                  }}
                >
                  <span>Get a quote</span>
                  <div 
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "#4285F4" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" fill="#FFFFFF" />
                      <circle cx="8" cy="9" r="1.5" fill="#4285F4" />
                      <circle cx="16" cy="9" r="1.5" fill="#4285F4" />
                      <path
                        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                        stroke="#4285F4"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 12.5C10 12.5 11 13 12 13C13 13 14 12.5 14 12.5"
                        stroke="#4285F4"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
