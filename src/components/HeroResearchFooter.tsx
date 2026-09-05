"use client";

import React from "react";
import Image from "next/image";
import { Route, TrendingUp, Cpu, MapPin } from "lucide-react";
import { FullSiteStudyTheme } from "@/lib/theme";

export interface HeroResearchFooterProps {
  theme: FullSiteStudyTheme;
}

export function HeroResearchFooter({ theme }: HeroResearchFooterProps) {
  return (
    <div className="w-full max-w-[500px] pt-4 select-none flex flex-col gap-4">
      {/* Upper Tier: 3 Skills justified edge-to-edge across the full width */}
      <div className="flex items-start justify-between w-full">
        {/* Skill 1: Routing (Flush Left) */}
        <div className="group flex flex-col items-start text-left cursor-default">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1917] group-hover:text-[var(--color-primary)] transition-colors mb-0.5">
            <Route className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
            <span>Routing</span>
          </div>
          <span
            style={{ color: theme.textMuted }}
            className="text-[11px] leading-tight"
          >
            Operations Research
          </span>
        </div>

        {/* Skill 2: Valuation (Center) */}
        <div className="group flex flex-col items-center text-center cursor-default">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1917] group-hover:text-[var(--color-primary)] transition-colors mb-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
            <span>Valuation</span>
          </div>
          <span
            style={{ color: theme.textMuted }}
            className="text-[11px] leading-tight"
          >
            Financial Modeling
          </span>
        </div>

        {/* Skill 3: Simulation (Flush Right) */}
        <div className="group flex flex-col items-end text-right cursor-default">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1917] group-hover:text-[var(--color-primary)] transition-colors mb-0.5">
            <Cpu className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
            <span>Simulation</span>
          </div>
          <span
            style={{ color: theme.textMuted }}
            className="text-[11px] leading-tight"
          >
            Supply Chain Systems
          </span>
        </div>
      </div>

      {/* Lower Tier: Campus (Official ITB Logo + Stacked Text) & Location (Justified Left and Right) */}
      <div className="flex items-center justify-between text-xs w-full pt-0.5">
        {/* Left: Official ITB PNG Logo + Stacked Campus & Major */}
        <div className="group flex items-center gap-2.5 text-[#1A1917] cursor-default">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
            <Image
              src="/images/itb-logo.png"
              alt="Institut Teknologi Bandung Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-xs sm:text-[13px] text-[#1A1917] group-hover:text-[var(--color-primary)] transition-colors">
              Institut Teknologi Bandung
            </span>
            <span
              style={{ color: theme.textSecondary }}
              className="text-[11.5px] font-normal mt-0.5"
            >
              Industrial Engineering
            </span>
          </div>
        </div>

        {/* Right: MapPin + Jakarta, Indonesia */}
        <div className="group flex items-center gap-1.5 text-xs shrink-0 cursor-default">
          <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
          <span
            style={{ color: theme.textSecondary }}
            className="font-medium text-xs sm:text-[12.5px]"
          >
            Jakarta, Indonesia
          </span>
        </div>
      </div>
    </div>
  );
}
