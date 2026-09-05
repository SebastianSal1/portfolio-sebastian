"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, CheckCircle2 } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { SubpageHeroScene } from "@/components/SubpageHeroScene";
import { SubpageFooter } from "@/components/SubpageFooter";
import { PRODUCTION_THEME } from "@/lib/theme";
import { CANONICAL_EXPERIENCE_DATA } from "@/lib/domain-data";
export default function ExperiencePage() {
  const theme = PRODUCTION_THEME;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-primary)] overflow-x-hidden bg-[var(--color-surface-canvas)] text-[var(--color-content-display)] pb-24">
      {/* Persistent Floating Navigation */}
      <FloatingNav theme={theme} />

      {/* Background Visual Scene: Controlled Animated Flow */}
      <SubpageHeroScene />

      {/* Page Header & Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-22 lg:pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A766D] hover:text-[var(--color-primary)] transition-colors mb-4 group focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] rounded-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        {/* Page Title (Literal: Professional Experiences) */}
        <div className="mb-8 sm:mb-10 max-w-[880px]">
          <div className="flex items-center gap-2.5 mb-3 select-none">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
              <Briefcase className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A766D]">
              Domain Overview
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#1A1917] tracking-tight leading-[1.15] mb-3">
            Professional Experiences
          </h1>
          <p className="text-sm sm:text-base text-[#5E5B55] leading-relaxed">
            Detailed record of strategic corporate advisory, operational simulation modeling, and student enterprise leadership.
          </p>
        </div>

        {/* Full Career History (Level-1 Depth, No Child Routes) */}
        <div className="flex flex-col gap-12 sm:gap-14 max-w-[960px]">
          {CANONICAL_EXPERIENCE_DATA.map((role, idx) => {
            const isHovered = hoveredId === role.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <article
                key={role.id}
                onMouseEnter={() => setHoveredId(role.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex flex-col p-6 sm:p-8 rounded-2xl border border-[#DDD7CB] bg-white/60 backdrop-blur-xs transition-all duration-200 shadow-2xs ${
                  isDimmed ? "opacity-65" : "opacity-100"
                }`}
              >
                {/* Header: Title + Period */}
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2 pb-4 border-b border-[#E2DFD7]">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#1A1917] tracking-tight">
                    {role.title}
                  </h2>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] px-3 py-1 rounded-full bg-[var(--color-primary)]/[0.08]">
                    {role.period}
                  </span>
                </div>

                {/* Organization & Location */}
                <p className="text-xs sm:text-sm font-semibold text-[#5E5B55] mb-4">
                  {role.organization}, {role.location}
                </p>

                {/* Scope of Engagement */}
                <div className="mb-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C887B] mb-1.5">
                    Scope of Engagement
                  </h3>
                  <p className="text-sm text-[#45433E] leading-relaxed">
                    {role.scopeSummary}
                  </p>
                </div>

                {/* Methodological Formulation */}
                <div className="mb-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C887B] mb-1.5">
                    Methodological Formulation
                  </h3>
                  <p className="text-sm text-[#45433E] leading-relaxed">
                    {role.methodology}
                  </p>
                </div>

                {/* Quantified Deliverables & Impact */}
                <div className="mb-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C887B] mb-2.5">
                    Key Quantified Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {role.quantifiedImpact.map((metric, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2.5 text-sm text-[#1A1917]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Toolkit */}
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C887B] mb-2">
                    Tools & Applied Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {role.keyTools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#1A1917]/[0.05] text-[#1A1917]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Minimal Editorial Footer */}
      <SubpageFooter />
    </main>
  );
}
