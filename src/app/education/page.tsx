"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { SubpageHeroScene } from "@/components/SubpageHeroScene";
import { SubpageFooter } from "@/components/SubpageFooter";
import { PRODUCTION_THEME } from "@/lib/theme";
import { CANONICAL_ACADEMICS_DATA } from "@/lib/domain-data";

export default function AcademicsPage() {
  const theme = PRODUCTION_THEME;
  const data = CANONICAL_ACADEMICS_DATA;

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

        {/* Page Title (Literal: Academics) */}
        <div className="mb-8 sm:mb-10 max-w-[880px]">
          <div className="flex items-center gap-2.5 mb-3 select-none">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A766D]">
              Domain Overview
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#1A1917] tracking-tight leading-[1.15] mb-3">
            Academics
          </h1>
          <p className="text-sm sm:text-base text-[#5E5B55] leading-relaxed">
            Academic standing, core engineering coursework, institutional scholarships, and scholastic honors at Institut Teknologi Bandung.
          </p>
        </div>

        {/* Open Typographic Document Layout (No forced cards) */}
        <div className="flex flex-col gap-14 max-w-[960px]">
          {/* Section 1: Institutional Foundation */}
          <section className="pb-10 border-b border-[#DDD7CB]">
            <div className="flex items-start gap-4 sm:gap-5 mb-6">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 mt-1">
                <Image
                  src="/images/itb-logo.png"
                  alt="ITB Official Emblem"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-[28px] font-bold font-sans text-[#1A1917] tracking-tight leading-tight">
                  {data.institution}
                </h2>
                <p className="text-base sm:text-lg font-semibold text-[#45433E] mt-1">
                  {data.degree}, {data.department}
                </p>
                <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs sm:text-sm text-[#5E5B55]">
                  <span>{data.period}</span>
                  <span className="text-[#DDD7CB]">,</span>
                  <span className="font-semibold text-[#1A1917]">GPA {data.gpa}</span>
                  <span className="text-[var(--color-primary)] font-medium">({data.academicStanding})</span>
                </div>
              </div>
            </div>

            {/* Core Disciplines */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-3.5 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Core Engineering Curriculum & Disciplines</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-white/60 border border-[#DDD7CB]/70 text-xs sm:text-[13px] text-[#1A1917]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Scholarships & Institutional Grants */}
          <section className="pb-10 border-b border-[#DDD7CB]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-6 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Merit Scholarships & Academic Grants</span>
            </h3>
            <div className="flex flex-col gap-6">
              {data.scholarships.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-base sm:text-lg font-semibold text-[#1A1917]">
                      {s.name}
                    </h4>
                    <span className="text-xs font-semibold text-[var(--color-accent)] px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/[0.08]">
                      {s.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5E5B55] leading-relaxed">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Academic Honors & Distinctions */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-6 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>Scholastic Honors & Recognitions</span>
            </h3>
            <div className="flex flex-col gap-6">
              {data.honors.map((h, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-base sm:text-lg font-semibold text-[#1A1917]">
                      {h.name}
                    </h4>
                    <span className="text-xs text-[#8C887B] font-medium whitespace-nowrap ml-4">
                      {h.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5E5B55] leading-relaxed">
                    {h.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Minimal Editorial Footer */}
      <SubpageFooter />
    </main>
  );
}
