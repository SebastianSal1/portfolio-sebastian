"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Layers, AlertCircle } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { SubpageHeroScene } from "@/components/SubpageHeroScene";
import { SubpageFooter } from "@/components/SubpageFooter";
import { PRODUCTION_THEME } from "@/lib/theme";
import { PROJECT_PLACEHOLDERS } from "@/lib/domain-data";
export default function ProjectsPage() {
  const theme = PRODUCTION_THEME;

  return (
    <main className="relative min-h-screen selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-primary)] overflow-x-hidden bg-[var(--color-surface-canvas)] text-[var(--color-content-display)] pb-24">
      {/* Persistent Floating Navigation */}
      <FloatingNav theme={theme} />

      {/* Background Visual Scene: Controlled Animated Flow */}
      <SubpageHeroScene />

      {/* Page Header & Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-22 lg:pt-24">
        {/* Literal Return Affordance */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A766D] hover:text-[var(--color-primary)] transition-colors mb-4 group focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] rounded-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        {/* Page Title (Literal: Projects) */}
        <div className="mb-8 sm:mb-10 max-w-[880px]">
          <div className="flex items-center gap-2.5 mb-3 select-none">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A766D]">
              Domain Overview
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#1A1917] tracking-tight leading-[1.15] mb-3">
            Projects
          </h1>
          <p className="text-sm sm:text-base text-[#5E5B55] leading-relaxed">
            Structural preview of quantitative engineering, discrete simulation, and spatial optimization systems.
          </p>

          {/* Explicit Placeholder Governance Banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/[0.06] text-[var(--color-primary)] text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Structural placeholders for testing information architecture. Factual project data population is pending.</span>
          </div>
        </div>

        {/* Level-1 Projects Grid (No child routes, readable content surfaces) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECT_PLACEHOLDERS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between p-6 rounded-2xl border border-[#DDD7CB] bg-white/70 backdrop-blur-xs shadow-2xs"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[var(--color-primary)]">
                    {project.category}
                  </span>
                  <span className="text-xs text-[#8C887B] font-medium">{project.year}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-sans text-[#1A1917] tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-xs font-medium text-[#7A766D] mb-3">{project.shortContext}</p>
                <p className="text-xs sm:text-[13px] text-[#45433E] leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="pt-3 border-t border-[#E2DFD7] space-y-3">
                  <div>
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#8C887B] mb-1">
                      Methodology
                    </h3>
                    <p className="text-xs text-[#5E5B55] leading-relaxed">
                      {project.methodologyOverview}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#8C887B] mb-1">
                      Deliverable Preview
                    </h3>
                    <p className="text-xs text-[#5E5B55] leading-relaxed">
                      {project.deliverablePreview}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status footer without false link */}
              <div className="mt-6 pt-3 border-t border-[#E2DFD7]/80 flex justify-between items-center text-[11px] text-[#8C887B]">
                <span>Level-1 Portfolio Card</span>
                <span>Provisional</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Minimal Editorial Footer */}
      <SubpageFooter />
    </main>
  );
}
