"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Award, AlertCircle } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { SubpageHeroScene } from "@/components/SubpageHeroScene";
import { SubpageFooter } from "@/components/SubpageFooter";
import { PRODUCTION_THEME } from "@/lib/theme";
import { COMPETITION_PLACEHOLDERS } from "@/lib/domain-data";

export default function CompetitionsPage() {
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

        {/* Page Title (Literal: Competitions) */}
        <div className="mb-8 sm:mb-10 max-w-[880px]">
          <div className="flex items-center gap-2.5 mb-3 select-none">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-accent)]">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A766D]">
              Domain Overview
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#1A1917] tracking-tight leading-[1.15] mb-3">
            Competitions
          </h1>
          <p className="text-sm sm:text-base text-[#5E5B55] leading-relaxed">
            Competitive strategic business case engagements, quantitative analytics hackathons, and operational modeling challenges.
          </p>

          {/* Placeholder Governance Note */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/[0.06] text-[var(--color-primary)] text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Structural placeholders for testing information architecture. Factual competition data population is pending.</span>
          </div>
        </div>

        {/* Level-1 Competitions Ledger */}
        <div className="flex flex-col gap-8 max-w-[960px]">
          {COMPETITION_PLACEHOLDERS.map((comp) => (
            <article
              key={comp.id}
              className="flex flex-col p-6 sm:p-8 rounded-2xl border border-[#DDD7CB] bg-white/70 backdrop-blur-xs shadow-2xs"
            >
              <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2 pb-4 border-b border-[#E2DFD7]">
                <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#1A1917] tracking-tight">
                  {comp.title}
                </h2>
                <span className="text-xs sm:text-sm font-semibold text-[var(--color-accent)] px-3 py-1 rounded-full bg-[var(--color-accent)]/[0.08]">
                  {comp.resultPlacement}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#5E5B55] mb-3">
                {comp.role}, {comp.period}
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#45433E]">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C887B] mb-1">
                    Problem & Challenge Statement
                  </h3>
                  <p className="leading-relaxed">{comp.challengeContext}</p>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8C887B] mb-1">
                    Key Submitted Output & Strategy
                  </h3>
                  <p className="leading-relaxed">{comp.keyOutput}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2DFD7]/80 flex justify-between items-center text-[11px] text-[#8C887B]">
                <span>Competitive Case Ledger</span>
                <span>Provisional Structure</span>
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
