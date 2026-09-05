"use client";

import React, { useState } from "react";
import { FullSiteStudyTheme } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export interface CredentialMatrixProps {
  theme: FullSiteStudyTheme;
}

interface MetricTile {
  id: string;
  category: string;
  primaryValue: string;
  secondaryValue?: string;
  label: string;
  contextFootnote: string;
}

const METRIC_TILES: MetricTile[] = [
  {
    id: "academic-standing",
    category: "Academic Rank",
    primaryValue: "TOP 3",
    label: "Industrial Engineering, ITB",
    contextFootnote: "Rank 3 out of 120+ student cohort",
  },
  {
    id: "internships",
    category: "Experience",
    primaryValue: "3",
    secondaryValue: "Roles",
    label: "Industry Internships",
    contextFootnote: "Strategy, Consulting & Operations",
  },
  {
    id: "gpa",
    category: "Cumulative Grade",
    primaryValue: "3.83",
    secondaryValue: "/ 4.00",
    label: "Academic Standing",
    contextFootnote: "High Distinction, Scale 4.00",
  },
  {
    id: "scholarships",
    category: "Honors",
    primaryValue: "2",
    secondaryValue: "Awards",
    label: "Merit Scholarships",
    contextFootnote: "Academic Distinction and Leadership",
  },
];

export function CredentialMatrix({ theme }: CredentialMatrixProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div className="w-full max-w-[500px] mt-4 sm:mt-5 grid grid-cols-2 gap-3 animate-matrix select-none">
      {METRIC_TILES.map((tile) => {
        const isHovered = hoveredId === tile.id;

        return (
          <div
            key={tile.id}
            onMouseEnter={() => setHoveredId(tile.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              borderColor: isHovered ? "rgba(49, 87, 200, 0.45)" : "rgba(221, 215, 203, 0.85)",
              boxShadow: isHovered
                ? "0 12px 28px -6px rgba(26, 25, 23, 0.08), 0 2px 6px rgba(26, 25, 23, 0.03)"
                : "0 1px 3px rgba(26, 25, 23, 0.03), 0 6px 16px -2px rgba(26, 25, 23, 0.02)",
              transform: isHovered && !reducedMotion ? "translateY(-3px)" : "translateY(0)",
            }}
            className="group relative p-3.5 sm:p-4 rounded-xl border backdrop-blur-xs transition-all duration-300 flex flex-col justify-between min-h-[104px] sm:min-h-[112px] cursor-default overflow-hidden"
          >
            {/* Top Row: Category Tag */}
            <div className="flex items-center justify-between mb-2">
              <span
                style={{ color: theme.textMuted }}
                className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em]"
              >
                {tile.category}
              </span>
            </div>

            {/* Middle: Authoritative Metric Value */}
            <div className="flex items-baseline gap-1.5 my-auto">
              <span
                style={{ color: theme.textPrimary }}
                className="text-[22px] sm:text-[26px] font-bold font-serif leading-none tracking-tight"
              >
                {tile.primaryValue}
              </span>
              {tile.secondaryValue && (
                <span
                  style={{ color: theme.textSecondary }}
                  className="text-xs sm:text-sm font-sans font-medium"
                >
                  {tile.secondaryValue}
                </span>
              )}
            </div>

            {/* Bottom Row: Dynamic Contextual Footnote on Hover */}
            <div className="relative pt-2 mt-1 border-t border-[rgba(221,215,203,0.5)] min-h-[22px] flex items-center overflow-hidden">
              {/* Default Label */}
              <p
                style={{ color: theme.textSecondary }}
                className={`text-[11px] sm:text-[12px] font-medium leading-none transition-all duration-200 ${
                  isHovered ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
                }`}
              >
                {tile.label}
              </p>

              {/* Hover Footnote Reveal */}
              <p
                style={{ color: "var(--color-primary, #3157C8)" }}
                className={`absolute left-0 right-0 text-[10.5px] sm:text-[11px] font-semibold leading-tight transition-all duration-200 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                {tile.contextFootnote}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
