"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FullSiteStudyTheme } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCvModal } from "@/context/CvModalContext";
import { getMailtoHref } from "./footer/ContactLinks";
interface DocumentationItem {
  id: string;
  title: string;
  category: string;
  line1: string;
  line2: string;
  link: string;
  renderVisual: (theme: FullSiteStudyTheme) => React.ReactNode;
}

const DOCUMENTATION_ITEMS: DocumentationItem[] = [
  {
    id: "spatial-logistics",
    title: "Spatial Logistics",
    category: "Operations Research & Warehouse Logistics",
    line1: "Multi-facility warehouse layout & material routing architecture.",
    line2: "Algorithmic spatial pathing optimization for high-density dispatch.",
    link: "#projects",
    renderVisual: (theme) => (
      <svg className="w-full h-full" viewBox="0 0 350 220" fill="none">
        <rect width="350" height="220" fill={theme.projectSvgBg} />
        {/* Technical Coordinate Grid */}
        <line x1="70" y1="0" x2="70" y2="220" stroke={theme.projectSvgStrokePrimary} strokeWidth="1" strokeOpacity="0.35" />
        <line x1="140" y1="0" x2="140" y2="220" stroke={theme.projectSvgStrokePrimary} strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="210" y1="0" x2="210" y2="220" stroke={theme.projectSvgStrokePrimary} strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="280" y1="0" x2="280" y2="220" stroke={theme.projectSvgStrokePrimary} strokeWidth="1" strokeOpacity="0.35" />
        <line x1="0" y1="70" x2="350" y2="70" stroke={theme.projectSvgStrokePrimary} strokeWidth="1" strokeOpacity="0.35" />
        <line x1="0" y1="140" x2="350" y2="140" stroke={theme.projectSvgStrokePrimary} strokeWidth="1.5" strokeOpacity="0.7" />
        {/* Logistics Routing Core */}
        <path d="M 140 110 C 140 65, 210 65, 210 110 C 210 155, 160 155, 160 110 C 160 75, 195 75, 195 110" stroke={theme.projectSvgAccent} strokeWidth="15" strokeLinecap="round" />
        <path d="M 195 110 C 195 180, 160 170, 160 215" stroke={theme.projectSvgCounterAccent || "#F0522D"} strokeWidth="13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "operations-twin",
    title: "Operations Twin",
    category: "Simulation & Discrete Event Modeling",
    line1: "Real-time discrete event simulation of manufacturing line throughput.",
    line2: "Stochastic bottleneck detection with automated capacity rebalancing.",
    link: "#projects",
    renderVisual: (theme) => (
      <svg className="w-full h-full" viewBox="0 0 350 220" fill="none">
        <rect width="350" height="220" fill={theme.projectSvgBg} />
        <circle cx="175" cy="110" r="85" stroke={theme.projectSvgStrokeSecondary} strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="175" cy="110" r="55" stroke={theme.projectSvgStrokePrimary} strokeWidth="2" />
        <circle cx="175" cy="55" r="14" fill={theme.projectSvgAccent} />
        <circle cx="230" cy="110" r="14" fill={theme.projectSvgStrokePrimary} />
        <circle cx="175" cy="165" r="14" fill={theme.projectSvgCounterAccent || "#F0522D"} />
        <circle cx="120" cy="110" r="14" fill={theme.projectSvgStrokeSecondary} />
      </svg>
    ),
  },
  {
    id: "valuation-matrix",
    title: "Valuation Matrix",
    category: "Financial Modeling & Quantitative Valuation",
    line1: "Dynamic multi-scenario DCF and LBO sensitivity analysis framework.",
    line2: "Monte Carlo risk distribution across market volatility curves.",
    link: "#projects",
    renderVisual: (theme) => (
      <svg className="w-full h-full" viewBox="0 0 350 220" fill="none">
        <rect width="350" height="220" fill={theme.projectSvgBg} />
        <path d="M 50 180 L 110 130 L 170 150 L 230 80 L 300 40" stroke={theme.projectSvgAccent} strokeWidth="4" strokeLinecap="round" />
        <path d="M 50 190 L 110 160 L 170 170 L 230 120 L 300 90" stroke={theme.projectSvgStrokeSecondary} strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="230" cy="80" r="9" fill={theme.projectSvgCounterAccent || "#F0522D"} />
      </svg>
    ),
  },
  {
    id: "yield-optimizer",
    title: "Yield Optimizer",
    category: "Industrial Systems & Quality Engineering",
    line1: "Statistical process control and resource yield maximization platform.",
    line2: "Multivariate regression model identifying critical line failure modes.",
    link: "#projects",
    renderVisual: (theme) => (
      <svg className="w-full h-full" viewBox="0 0 350 220" fill="none">
        <rect width="350" height="220" fill={theme.projectSvgBg} />
        <rect x="60" y="140" width="30" height="60" fill={theme.projectSvgStrokePrimary} rx="2" />
        <rect x="110" y="100" width="30" height="100" fill={theme.projectSvgStrokePrimary} rx="2" />
        <rect x="160" y="70" width="30" height="130" fill={theme.projectSvgAccent} rx="2" />
        <rect x="210" y="90" width="30" height="110" fill={theme.projectSvgStrokeSecondary} rx="2" />
        <rect x="260" y="125" width="30" height="75" fill={theme.projectSvgCounterAccent || "#F0522D"} rx="2" />
        <line x1="40" y1="65" x2="310" y2="65" stroke={theme.projectSvgAccent} strokeWidth="1.5" strokeDasharray="5 5" />
      </svg>
    ),
  },
  {
    id: "network-topology",
    title: "Network Topology",
    category: "Supply Chain Engineering & Networks",
    line1: "Multi-echelon supply chain network redesign and inventory staging.",
    line2: "Mixed-integer linear programming minimizing total landed logistics cost.",
    link: "#projects",
    renderVisual: (theme) => (
      <svg className="w-full h-full" viewBox="0 0 350 220" fill="none">
        <rect width="350" height="220" fill={theme.projectSvgBg} />
        <line x1="80" y1="110" x2="175" y2="60" stroke={theme.projectSvgStrokePrimary} strokeWidth="2" />
        <line x1="80" y1="110" x2="175" y2="160" stroke={theme.projectSvgStrokePrimary} strokeWidth="2" />
        <line x1="175" y1="60" x2="270" y2="110" stroke={theme.projectSvgAccent} strokeWidth="2.5" />
        <line x1="175" y1="160" x2="270" y2="110" stroke={theme.projectSvgCounterAccent || "#F0522D"} strokeWidth="2.5" />
        <circle cx="80" cy="110" r="16" fill={theme.projectSvgStrokePrimary} />
        <circle cx="175" cy="60" r="14" fill={theme.projectSvgAccent} />
        <circle cx="175" cy="160" r="14" fill={theme.projectSvgCounterAccent || "#F0522D"} />
        <circle cx="270" cy="110" r="18" fill={theme.projectSvgAccent} />
      </svg>
    ),
  },
];

export interface FeaturedProjectDisplayProps {
  theme: FullSiteStudyTheme;
}

export function FeaturedProjectDisplay({ theme }: FeaturedProjectDisplayProps) {
  const { openCvModal } = useCvModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const activeItem = DOCUMENTATION_ITEMS[currentIndex];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const rotateX = isHovered && !reducedMotion ? (spotlightPos.y - 50) * -0.12 : 0;
  const rotateY = isHovered && !reducedMotion ? (spotlightPos.x - 50) * 0.12 : 0;

  return (
    <div className="flex flex-col items-center w-full max-w-[500px] select-none">
      {/* Top Editorial Project Tabs */}
      <nav aria-label="Projects" className="flex items-center justify-center gap-5 sm:gap-7 mb-4 z-20">
        {DOCUMENTATION_ITEMS.map((item, idx) => {
          const isSelected = currentIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className="group relative pb-1 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)]"
              style={{
                color: isSelected ? theme.textPrimary : theme.textMuted,
                fontWeight: isSelected ? 600 : 500,
              }}
            >
              <span>{item.title.split(" ")[0]}</span>
              {/* Cobalt hairline indicator under active tab */}
              <span
                className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? theme.textAccent : "transparent",
                  transform: isSelected ? "scaleX(1)" : "scaleX(0)",
                }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </nav>

      {/* The Freestanding Tactile Specimen Card (Open Layout - No Outer Box) */}
      <div className="relative w-full perspective-[1000px] px-3 sm:px-0">
        {/* Navigation Arrow Left */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + DOCUMENTATION_ITEMS.length) % DOCUMENTATION_ITEMS.length)}
          aria-label="Previous project"
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full border border-[#DDD7CB] bg-white/95 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer text-[#1A1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Single Unified Card: Top Blueprint + Bottom Description */}
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
            boxShadow: isHovered
              ? "0 20px 48px -12px rgba(26, 25, 23, 0.10), 0 2px 6px rgba(26, 25, 23, 0.04)"
              : "0 10px 32px -8px rgba(26, 25, 23, 0.06), 0 1px 3px rgba(26, 25, 23, 0.02)",
          }}
          className="relative w-full rounded-2xl overflow-hidden border border-[#DDD7CB] bg-white transition-all duration-300 cursor-crosshair group"
        >
          {/* Top Half: Technical SVG Blueprint with Lightswind Spotlight */}
          <div className="relative w-full h-[220px] sm:h-[240px] bg-[#E8EEF9] overflow-hidden">
            {/* SVG Visual - 100% Clean, No Badge Chips */}
            {activeItem.renderVisual(theme)}

            {/* Lightswind Dynamic Cursor-Tracking Radial Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(circle 220px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(49, 87, 200, 0.16), transparent 75%)`,
              }}
            />

          </div>


          {/* Bottom Half: Grounded Project Description & Case Study Action */}
          <div className="p-5 sm:p-6 bg-white flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#3157C8] block mb-1.5">
                {activeItem.category}
              </span>
              <h2 className="text-xl sm:text-[22px] font-bold font-sans tracking-tight text-[#1A1917] mb-2 leading-snug">
                {activeItem.title}
              </h2>
              <p className="text-xs sm:text-[13px] text-[#45433E] leading-relaxed mb-4">
                {activeItem.line1} {activeItem.line2}
              </p>
            </div>

            {/* Dedicated Project Action Row */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href={activeItem.link || "#projects"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1917] hover:text-[#3157C8] transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] rounded-xs"
              >
                <span>View Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

            </div>
          </div>
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % DOCUMENTATION_ITEMS.length)}
          aria-label="Next project"
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full border border-[#DDD7CB] bg-white/95 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer text-[#1A1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Action Buttons Directly Under the Card (Natural text-hug sizing with justified layout) */}
      <div className="w-full flex items-center justify-between mt-4 sm:mt-5 px-3 sm:px-0">
        {/* Left Group: Channels/Links hugging their text */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = getMailtoHref();
            }}
            onMouseEnter={(e) => {
              e.currentTarget.href = getMailtoHref();
            }}
            onFocus={(e) => {
              e.currentTarget.href = getMailtoHref();
            }}
            className="px-3.5 py-2 border border-[#DDD7CB]/75 bg-white/40 backdrop-blur-xs rounded-[10px] text-xs sm:text-sm font-medium text-[#1A1917] shadow-2xs hover:bg-white/95 hover:border-[#DDD7CB] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] cursor-pointer"
            aria-label="Email Sebastian Salutare (opens default mail client)"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/sebastian-salutare/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 border border-[#DDD7CB]/75 bg-white/40 backdrop-blur-xs rounded-[10px] text-xs sm:text-sm font-medium text-[#1A1917] shadow-2xs hover:bg-white/95 hover:border-[#DDD7CB] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)]"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/SebastianSal1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 border border-[#DDD7CB]/75 bg-white/40 backdrop-blur-xs rounded-[10px] text-xs sm:text-sm font-medium text-[#1A1917] shadow-2xs hover:bg-white/95 hover:border-[#DDD7CB] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)]"
          >
            GitHub
          </a>
        </div>
        {/* Right Action: Preview CV flush right */}
        <button
          onClick={openCvModal}
          type="button"
          className="px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold bg-[var(--color-primary,#3157C8)]/80 backdrop-blur-xs border border-[var(--color-primary,#3157C8)]/25 text-white shadow-xs hover:bg-[var(--color-primary,#3157C8)] hover:border-[var(--color-primary,#3157C8)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] cursor-pointer"
        >
          <span>Preview CV</span>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}
