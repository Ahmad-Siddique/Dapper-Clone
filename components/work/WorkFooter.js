"use client";
import React from "react";

export default function WorkFooter({ theme = "light" }) {
  const isDark = theme === "dark";

  return (
    <footer
      className="w-full py-16 md:py-24"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 70%, #1e1310 100%)",
      }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Work With Us Section */}
        <div className="mb-16 md:mb-24">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 group"
          >
            <h2
              className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-serif leading-[1.1] tracking-[-0.02em] border-b border-white/30 pb-1"
              style={{
                fontFamily: "'Times New Roman', 'Georgia', serif",
                color: "#ffffff",
              }}
            >
              Work with us
            </h2>
            <span className="text-white text-2xl md:text-3xl transition-transform group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-24">
          {/* London */}
          <div>
            <h3
              className="text-lg font-medium mb-1"
              style={{ color: "#ffffff" }}
            >
              London
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/London",
              })}{" "}
              pm
            </p>
            <div className="space-y-1">
              <a
                href="mailto:london@newgenre.studio"
                className="block text-sm hover:opacity-70 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                london@newgenre.studio
              </a>
              <a
                href="tel:+442045728788"
                className="block text-sm hover:opacity-70 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                +44 20 4572 8788
              </a>
            </div>
            <div className="mt-6 space-y-0.5">
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                2 Appleby Yard,
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Soames Walk,
              </p>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                London SE10 0BJ
              </p>
            </div>
          </div>

          {/* San Francisco */}
          <div>
            <h3
              className="text-lg font-medium mb-1"
              style={{ color: "#ffffff" }}
            >
              San Francisco
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/Los_Angeles",
              })}{" "}
              am
            </p>
            <div className="space-y-1">
              <a
                href="mailto:sf@newgenre.studio"
                className="block text-sm hover:opacity-70 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                sf@newgenre.studio
              </a>
              <a
                href="tel:+18504688274"
                className="block text-sm hover:opacity-70 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                +1 850 468 8274
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-white/10">
          {/* Logo */}
          <div className="text-2xl" style={{ color: "#ffffff" }}>
            ⚪⚪
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 md:gap-8 flex-wrap">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Instagram
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              X
            </a>
            <a
              href="/careers"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Join Us
            </a>
            <a
              href="/newsletter"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Newsletter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
