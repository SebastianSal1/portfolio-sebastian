"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Layers,
  Sparkles,
  School,
} from "lucide-react";
import {
  CANONICAL_ACADEMICS_DATA,
  CANONICAL_LEADERSHIP_DATA,
  LeadershipItem,
} from "@/lib/domain-data";
import { PRODUCTION_THEME } from "@/lib/theme";
import { FloatingNav } from "@/components/FloatingNav";
import { SubpageFooter } from "@/components/SubpageFooter";

export default function ReviewLabPage() {
  const [activeTab, setActiveTab] = useState<"academics" | "leadership" | "holistic">("academics");
  const [academicsCandidate, setAcademicsCandidate] = useState<"A" | "B" | "C" | "control">("B");

  // Leadership Candidate state
  const [leadershipCandidate, setLeadershipCandidate] = useState<"A" | "B" | "C">("A");

  // Interactive states for candidates
  const [expandedLeadershipId, setExpandedLeadershipId] = useState<string | null>("lead-1");
  const [activeOrgTabId, setActiveOrgTabId] = useState<string>("lead-1");

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#1A1917] font-sans antialiased selection:bg-[#3157C8] selection:text-white">
      <FloatingNav theme={PRODUCTION_THEME} />

      {/* Lab Header */}
      <header className="pt-28 pb-12 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-[#DDD7CB]/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#3157C8]/10 text-[#3157C8]">
                Design Exploration Lab
              </span>
              <span className="text-xs text-[#7A766D]">Interactive Review Environment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#1A1917]">
              Academics & Leadership Architecture
            </h1>
            <p className="text-sm text-[#5E5B55] mt-1.5 max-w-[720px]">
              Exploring non-generic layout alternatives for Academics (eliminating the narrow box container) and introducing dedicated visual grammar for Student Leadership & Organizations.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#3157C8] hover:text-[#244BC0] transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Live Homepage</span>
          </Link>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setActiveTab("academics")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "academics"
                ? "bg-[#1A1917] text-white shadow-xs"
                : "bg-white/80 text-[#5E5B55] hover:bg-white hover:text-[#1A1917]"
            }`}
          >
            1. Academics Layout ({academicsCandidate === "control" ? "Control" : `Alt ${academicsCandidate}`})
          </button>
          <button
            onClick={() => setActiveTab("leadership")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "leadership"
                ? "bg-[#1A1917] text-white shadow-xs"
                : "bg-white/80 text-[#5E5B55] hover:bg-white hover:text-[#1A1917]"
            }`}
          >
            2. Leadership & Organizations (Alt {leadershipCandidate})
          </button>
          <button
            onClick={() => setActiveTab("holistic")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "holistic"
                ? "bg-[#3157C8] text-white shadow-xs"
                : "bg-white/80 text-[#5E5B55] hover:bg-white hover:text-[#1A1917]"
            }`}
          >
            3. Combined Flow (Preview Both in Context)
          </button>
        </div>
      </header>

      {/* Main Review Canvas */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12">
        {/* =================================================================== */}
        {/* TAB 1: ACADEMICS ALTERNATIVES                                       */}
        {/* =================================================================== */}
        {activeTab === "academics" && (
          <div className="space-y-10">
            {/* Candidate Selector Bar */}
            <div className="p-4 rounded-xl bg-white/70 border border-[#DDD7CB] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1A1917] uppercase tracking-wider">Select Architecture:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setAcademicsCandidate("B")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      academicsCandidate === "B"
                        ? "bg-[#3157C8] text-white"
                        : "bg-[#EAE6DE] text-[#45433E] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Alt B: Swiss 3-Zone Grid (Recommended)
                  </button>
                  <button
                    onClick={() => setAcademicsCandidate("A")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      academicsCandidate === "A"
                        ? "bg-[#3157C8] text-white"
                        : "bg-[#EAE6DE] text-[#45433E] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Alt A: Asymmetric 40:60 Overview
                  </button>
                  <button
                    onClick={() => setAcademicsCandidate("C")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      academicsCandidate === "C"
                        ? "bg-[#3157C8] text-white"
                        : "bg-[#EAE6DE] text-[#45433E] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Alt C: Scholastic Journey Timeline
                  </button>
                  <button
                    onClick={() => setAcademicsCandidate("control")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      academicsCandidate === "control"
                        ? "bg-[#1A1917] text-white"
                        : "bg-[#EAE6DE] text-[#7A766D] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Current Baseline (Narrow Box Control)
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#7A766D]">
                Width: <span className="font-semibold text-[#1A1917]">1440px Full-Width Justified</span>
              </div>
            </div>

            {/* Render Selected Academics Candidate */}
            <div className="py-6">
              {academicsCandidate === "B" && <AcademicsAltB />}
              {academicsCandidate === "A" && <AcademicsAltA />}
              {academicsCandidate === "C" && <AcademicsAltC />}
              {academicsCandidate === "control" && <AcademicsControl />}
            </div>

            {/* Critique & Design Analysis */}
            <div className="mt-12 p-6 rounded-xl bg-white/50 border border-[#DDD7CB]/70 text-xs leading-relaxed text-[#5E5B55] space-y-2">
              <div className="font-bold text-[#1A1917] uppercase tracking-wider mb-1">Architecture Notes:</div>
              {academicsCandidate === "B" && (
                <p>
                  <strong>Alt B (Swiss 3-Zone Grid)</strong> mirrors the exact 3-column rhythm of the Projects and Competitions card grids above it. Column 1 grounds the institutional authority (ITB, GPA 3.83, MAPRES Top 3); Column 2 outlines the 5 quantitative industrial engineering pillars; Column 3 highlights scholarships and honors. Zero enclosing box; structure is formed purely through typographic hierarchy and subtle vertical divider rules.
                </p>
              )}
              {academicsCandidate === "A" && (
                <p>
                  <strong>Alt A (Asymmetric 40:60 Overview)</strong> establishes a powerful anchor on the left with a display-scale GPA and ITB crest, balancing it on the right with a two-tier layout separating official scholarships and academic coursework. Perfect for recruiter scanning.
                </p>
              )}
              {academicsCandidate === "C" && (
                <p>
                  <strong>Alt C (Scholastic Journey Timeline)</strong> traces Sebastian&apos;s academic progression across 2022–2026, visualizing continuous distinction, scholarship awards, and academic milestones in chronological sequence.
                </p>
              )}
              {academicsCandidate === "control" && (
                <p>
                  <strong>Control (Narrow Box Baseline)</strong> is the old implementation: restricted to max-w-[960px], creating empty asymmetric space on desktop, enclosed in a generic 1px bordered card container, and omitting scholarships and coursework data.
                </p>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: LEADERSHIP & ORGANIZATIONS ALTERNATIVES                       */}
        {/* =================================================================== */}
        {activeTab === "leadership" && (
          <div className="space-y-10">
            {/* Candidate Selector Bar */}
            <div className="p-4 rounded-xl bg-white/70 border border-[#DDD7CB] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1A1917] uppercase tracking-wider">Select Architecture:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setLeadershipCandidate("A")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      leadershipCandidate === "A"
                        ? "bg-[#3157C8] text-white"
                        : "bg-[#EAE6DE] text-[#45433E] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Alt 1A: Minimalist Editorial Rows (Recommended)
                  </button>
                  <button
                    onClick={() => setLeadershipCandidate("B")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      leadershipCandidate === "B"
                        ? "bg-[#3157C8] text-white"
                        : "bg-[#EAE6DE] text-[#45433E] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Alt 1B: Dual-Panel Leadership Showcase
                  </button>
                  <button
                    onClick={() => setLeadershipCandidate("C")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      leadershipCandidate === "C"
                        ? "bg-[#3157C8] text-white"
                        : "bg-[#EAE6DE] text-[#45433E] hover:bg-[#DDD7CB]"
                    }`}
                  >
                    Alt 1C: Segmented Initiative Matrix
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#7A766D]">
                Visual Grammar: <span className="font-semibold text-[#1A1917]">Differentiated from Project Cards</span>
              </div>
            </div>

            {/* Render Selected Leadership Candidate */}
            <div className="py-6">
              {leadershipCandidate === "A" && (
                <LeadershipAltA
                  expandedId={expandedLeadershipId}
                  setExpandedId={setExpandedLeadershipId}
                />
              )}
              {leadershipCandidate === "B" && <LeadershipAltB />}
              {leadershipCandidate === "C" && (
                <LeadershipAltC
                  activeId={activeOrgTabId}
                  setActiveId={setActiveOrgTabId}
                />
              )}
            </div>

            {/* Critique & Design Analysis */}
            <div className="mt-12 p-6 rounded-xl bg-white/50 border border-[#DDD7CB]/70 text-xs leading-relaxed text-[#5E5B55] space-y-2">
              <div className="font-bold text-[#1A1917] uppercase tracking-wider mb-1">Grammar Justification:</div>
              <p>
                Student leadership experiences (e.g. ShARE ITB, LPOSI ITB) center on <em>team stewardship, operational budget contribution, and training satisfaction metrics</em>. By avoiding rectangular card boxes and large photography, these layouts prevent visual fatigue after the Projects and Competitions image grids, maintaining fresh typographic pacing across the page.
              </p>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: HOLISTIC FLOW (Academics + Leadership in Sequence)           */}
        {/* =================================================================== */}
        {activeTab === "holistic" && (
          <div className="space-y-16 py-6">
            <div className="p-4 rounded-xl bg-[#3157C8]/5 border border-[#3157C8]/20 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#1A1917]">Holistic Sequence Preview</h4>
                <p className="text-xs text-[#5E5B55] mt-0.5">
                  Visualizing how Academics (Alt B) and Leadership (Alt 1A) transition seamlessly without generic boxes.
                </p>
              </div>
              <span className="text-xs font-bold text-[#3157C8] uppercase tracking-wider">Live Composite</span>
            </div>

            {/* 1. Academics Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#DDD7CB]/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[#3157C8]">
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <h3 className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight text-[#1A1917]">
                    Academics
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#3157C8]">Institut Teknologi Bandung</span>
              </div>
              <AcademicsAltB />
            </section>

            {/* 2. Leadership & Organizations Section */}
            <section className="space-y-6 pt-6">
              <div className="flex items-center justify-between border-b border-[#DDD7CB]/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[#3157C8]">
                    <Users className="w-5 h-5" />
                  </span>
                  <h3 className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight text-[#1A1917]">
                    Leadership & Organizations
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#7A766D]">Student Governance & Labs</span>
              </div>
              <LeadershipAltA
                expandedId={expandedLeadershipId}
                setExpandedId={setExpandedLeadershipId}
              />
            </section>
          </div>
        )}
      </main>

      <SubpageFooter />
    </div>
  );
}

// =============================================================================
// CANDIDATE IMPLEMENTATIONS: ACADEMICS
// =============================================================================

/**
 * Alternative B: Swiss 3-Zone Grid (Recommended)
 * Perfectly aligns with the 3-column layout of Projects & Competitions.
 * Zero enclosing box; high information density.
 */
function AcademicsAltB() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 py-6 select-none">
      {/* Zone 1: Scholastic Anchor */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 relative shrink-0 mt-0.5">
              <Image
                src="/images/itb-logo.png"
                alt="ITB Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1A1917] tracking-tight leading-tight">
                {CANONICAL_ACADEMICS_DATA.institution}
              </h4>
              <p className="text-sm font-semibold text-[#45433E] mt-1">
                {CANONICAL_ACADEMICS_DATA.degree}
              </p>
              <p className="text-xs text-[#7A766D] mt-0.5">
                {CANONICAL_ACADEMICS_DATA.department} · {CANONICAL_ACADEMICS_DATA.period}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C887B]">
                Cumulative Grade Point Average
              </span>
              <div className="flex items-baseline gap-3 mt-1.5">
                <span className="text-4xl sm:text-5xl font-bold font-serif text-[#1A1917] tracking-tight">
                  {CANONICAL_ACADEMICS_DATA.gpa}
                </span>
                <span className="text-xs font-bold text-[#3157C8] px-2.5 py-1 rounded-md bg-[#3157C8]/10">
                  {CANONICAL_ACADEMICS_DATA.academicStanding}
                </span>
              </div>
              <p className="text-xs font-medium text-[#5E5B55] mt-2">
                Curriculum Progress: {CANONICAL_ACADEMICS_DATA.creditsCompleted}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between text-xs text-[#7A766D]">
          <span className="font-semibold text-[#1A1917]">Dean&apos;s List Standing</span>
          <span>Continuous High Distinction</span>
        </div>
      </div>

      {/* Zone 2: Research Focus */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#3157C8]/10 text-[#3157C8] flex items-center justify-center shrink-0">
              {/* Bespoke Industrial Engineering / Optimization SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1A1917] tracking-tight">
                Research Focus
              </h4>
              <p className="text-xs text-[#7A766D]">
                Operations Research & Quantitative Modeling
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5E5B55] leading-relaxed mb-5">
            Core analytical specialization bridging mathematical optimization, stochastic systems, and corporate finance:
          </p>

          <ul className="space-y-3">
            {CANONICAL_ACADEMICS_DATA.focusAreas.map((area, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1A1917]">
                <span className="w-2 h-2 rounded-full bg-[#3157C8] mt-1.5 shrink-0" />
                <span className="leading-snug font-medium">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 text-xs text-[#7A766D]">
          <span>Applied Toolset: Python (PuLP, NumPy), Arena, SQL, Excel VBA</span>
        </div>
      </div>

      {/* Zone 3: Recognition & Awards */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#F0522D]/10 text-[#F0522D] flex items-center justify-center shrink-0">
              {/* Bespoke Honors & Excellence Laurel/Medal SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1A1917] tracking-tight">
                Recognition & Awards
              </h4>
              <p className="text-xs text-[#7A766D]">
                Merit Scholarships & Academic Distinctions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Scholarships */}
            {CANONICAL_ACADEMICS_DATA.scholarships.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#1A1917]">{s.name}</span>
                  <span className="text-xs font-semibold text-[#3157C8] shrink-0">{s.year}</span>
                </div>
                <p className="text-xs text-[#5E5B55] leading-relaxed">{s.note}</p>
              </div>
            ))}

            {/* Additional Grant */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#1A1917]">YAR-TSRA Research Grant</span>
                <span className="text-xs font-semibold text-[#3157C8] shrink-0">2024</span>
              </div>
              <p className="text-xs text-[#5E5B55] leading-relaxed">
                Competitive engineering research grant for systems modeling and optimization.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center text-xs text-[#7A766D]">
          <span>Institutional Standing</span>
          <span className="font-semibold text-[#1A1917]">High Scholastic Honors</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Alternative A: Asymmetric 40:60 Overview Spread
 * Massive display GPA on left, two-tier structured information on right.
 */
function AcademicsAltA() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-4">
      {/* Left 40%: The Scholastic Anchor */}
      <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DDD7CB]/80 pb-8 lg:pb-0 lg:pr-10">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 relative shrink-0">
              <Image
                src="/images/itb-logo.png"
                alt="ITB Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-2xl font-bold font-serif text-[#1A1917] tracking-tight">
                {CANONICAL_ACADEMICS_DATA.institution}
              </h4>
              <p className="text-xs font-semibold text-[#5E5B55] mt-1">
                {CANONICAL_ACADEMICS_DATA.degree}, {CANONICAL_ACADEMICS_DATA.department}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2DFD7]/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C887B]">
              Cumulative Grade Point Average
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl font-bold font-serif text-[#1A1917]">
                3.83
              </span>
              <span className="text-sm font-semibold text-[#7A766D]">/ 4.00</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#3157C8]/10 text-[#3157C8]">
                Top 3 Outstanding Student (MAPRES)
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#1A1917]/[0.05] text-[#1A1917]">
                140 / 144 SKS Completed
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#7A766D] mt-8 pt-4 border-t border-[#E2DFD7]/80">
          Enrolled 2022 - Expected Graduation 2026 · Bandung Institute of Technology
        </p>
      </div>

      {/* Right 60%: Focus Areas and Scholarships */}
      <div className="lg:col-span-7 space-y-8">
        {/* Tier 1: Focus Areas */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#1A1917] mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#3157C8]" />
            <span>Core Analytical Disciplines</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CANONICAL_ACADEMICS_DATA.focusAreas.map((area, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white/70 border border-[#DDD7CB]/60">
                <span className="text-xs font-semibold text-[#1A1917] block leading-snug">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Scholarships & Honors */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#1A1917] mb-3 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#3157C8]" />
            <span>Merit Scholarships & Research Grants</span>
          </h5>
          <div className="space-y-3">
            {CANONICAL_ACADEMICS_DATA.scholarships.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-white/70 border border-[#DDD7CB]/60 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="text-xs font-bold text-[#1A1917]">{s.name}</span>
                  <p className="text-[11.5px] text-[#5E5B55] mt-0.5">{s.note}</p>
                </div>
                <span className="text-xs font-semibold text-[#3157C8] shrink-0">{s.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Alternative C: Scholastic Journey Timeline (2022-2026)
 */
function AcademicsAltC() {
  const milestones = [
    {
      year: "2022 – 2023",
      title: "Foundational Optimization",
      desc: "Dean's List standing, multivariate calculus, discrete mathematics, and linear programming fundamentals.",
      badge: "High Distinction",
    },
    {
      year: "2023 – 2024",
      title: "Simulation & Analytics",
      desc: "Top 3 MAPRES IE ITB, Academic Excellence Grant, Arena stochastic simulation, and queuing models.",
      badge: "Top 3 Ranked",
    },
    {
      year: "2024 – 2025",
      title: "Corporate Finance & Supply Chain",
      desc: "Bakti BCA & PAF Scholarship awardee, YAR-TSRA research grant, LPOSI laboratory assistantship.",
      badge: "BCA & PAF Fellow",
    },
    {
      year: "2025 – 2026",
      title: "Senior Thesis & Capstone",
      desc: "Completing 140/144 credit curriculum; modeling strategic dispatch operations and graduate defense.",
      badge: "Candidate 2026",
    },
  ];

  return (
    <div className="w-full space-y-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDD7CB]/80">
        <div>
          <h4 className="text-xl font-bold font-serif text-[#1A1917]">
            {CANONICAL_ACADEMICS_DATA.institution}: Scholastic Trajectory
          </h4>
          <p className="text-xs text-[#5E5B55] mt-1">
            {CANONICAL_ACADEMICS_DATA.degree}, {CANONICAL_ACADEMICS_DATA.department} · Cumulative GPA: <strong className="text-[#1A1917]">3.83 / 4.00</strong>
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#3157C8]/10 text-[#3157C8] self-start sm:self-auto">
          140 / 144 SKS Completed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, idx) => (
          <div key={idx} className="flex flex-col justify-between p-5 rounded-xl bg-white/60 border border-[#DDD7CB]/70">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold text-[#3157C8] uppercase tracking-wider">{m.year}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1A1917]/[0.06] text-[#1A1917]">{m.badge}</span>
              </div>
              <h5 className="text-sm font-bold text-[#1A1917] mb-1.5">{m.title}</h5>
              <p className="text-xs text-[#5E5B55] leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Baseline Control: Old Narrow Box
 */
function AcademicsControl() {
  return (
    <div className="flex flex-col max-w-[960px] p-6 sm:p-8 rounded-2xl border border-[#DDD7CB] bg-white/60 backdrop-blur-xs">
      <div className="flex items-start gap-4 sm:gap-5 mb-6">
        <div className="relative w-12 h-12 shrink-0 mt-0.5">
          <Image
            src="/images/itb-logo.png"
            alt="ITB Emblem"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-xl sm:text-2xl font-bold font-sans text-[#1A1917] tracking-tight">
            {CANONICAL_ACADEMICS_DATA.institution}
          </h4>
          <p className="text-sm sm:text-base font-semibold text-[#45433E] mt-0.5">
            {CANONICAL_ACADEMICS_DATA.degree}, {CANONICAL_ACADEMICS_DATA.department}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#5E5B55] mt-2">
            <span>{CANONICAL_ACADEMICS_DATA.period}</span>
            <span className="text-[#DDD7CB]">,</span>
            <span className="font-semibold text-[#1A1917]">GPA {CANONICAL_ACADEMICS_DATA.gpa}</span>
            <span className="text-[#3157C8] font-medium">({CANONICAL_ACADEMICS_DATA.academicStanding})</span>
          </div>
        </div>
      </div>
      <p className="text-xs sm:text-[13.5px] text-[#45433E] leading-relaxed mb-4">
        Industrial engineering focus spanning linear & mixed-integer optimization (MILP), stochastic discrete-event simulation, and corporate financial valuation models.
      </p>
    </div>
  );
}

// =============================================================================
// CANDIDATE IMPLEMENTATIONS: LEADERSHIP & ORGANIZATIONS
// =============================================================================

/**
 * Proposal 1 (Alt 1A): Metric-Led Editorial Stream (Linear / Stripe Press Style)
 * Front-loads real quantitative proof (30%, 4.88/5, 100+) in large display numerals.
 * Zero box enclosure, zero line clutter.
 */
function LeadershipAltA({
  expandedId,
  setExpandedId,
}: {
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  const metricCallouts: Record<string, { big: string; label: string }> = {
    "lead-1": { big: "30%", label: "Annual Budget Revenue Generated" },
    "lead-2": { big: "100+", label: "Undergraduates Mentored in Simulation" },
    "lead-3": { big: "40+", label: "Regional Students Integrated across Campuses" },
  };

  return (
    <div className="w-full space-y-10 select-none py-2">
      {CANONICAL_LEADERSHIP_DATA.map((item) => {
        const isExpanded = expandedId === item.id;
        const metric = metricCallouts[item.id] || { big: "10+", label: "Strategic Initiatives" };

        return (
          <div
            key={item.id}
            className="group transition-all"
          >
            <div
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start cursor-pointer py-2"
            >
              {/* Metric Column (Col 1-3) */}
              <div className="md:col-span-3 flex flex-col justify-start">
                <span className="text-4xl sm:text-5xl font-bold font-serif text-[#3157C8] tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">
                  {metric.big}
                </span>
                <span className="text-xs font-semibold text-[#5E5B55] mt-1.5 leading-snug">
                  {metric.label}
                </span>
              </div>

              {/* Organization & Role (Col 4-7) */}
              <div className="md:col-span-5 space-y-1">
                <div className="flex items-baseline gap-3">
                  <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1A1917] tracking-tight group-hover:text-[#3157C8] transition-colors">
                    {item.organization}
                  </h4>
                </div>
                <p className="text-sm font-semibold text-[#45433E]">
                  {item.role}
                </p>
                <p className="text-xs text-[#7A766D]">
                  {item.period} · {item.location}
                </p>
                <p className="text-xs text-[#5E5B55] leading-relaxed pt-2">
                  {item.scopeSummary}
                </p>
              </div>

              {/* Initiatives & Quick View (Col 8-12) */}
              <div className="md:col-span-4 flex flex-col justify-between space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.focusAreas.map((f, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#1A1917]/[0.04] text-[#45433E]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3157C8] group-hover:underline pt-1">
                  <span>{isExpanded ? "Hide key deliverables" : "Explore key deliverables"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Expandable Deliverables Drawer */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-[#DDD7CB]/70 grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C887B]">
                    Documented Impact
                  </span>
                  <p className="text-xs text-[#7A766D] mt-1">
                    Verified through student council reports & departmental reviews.
                  </p>
                </div>
                <div className="md:col-span-9">
                  <ul className="space-y-2">
                    {item.keyInitiatives.map((init, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A1917]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3157C8] mt-2 shrink-0" />
                        <span className="leading-relaxed">{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Proposal 2 (Alt 1B): Kinetic Timeline Rails (Apple / Vercel Ship Log Style)
 * Continuous vertical timeline with kinetic hover illumination, active organization elevation, and crisp initiative metrics.
 */
function LeadershipAltB() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("lead-1");

  return (
    <div className="w-full relative space-y-12 select-none py-4">
      {/* Continuous Vertical Rail centered on left-3 / left-4 */}
      <div className="absolute top-2.5 bottom-6 left-3 sm:left-4 w-[1.5px] -translate-x-1/2 bg-[#DDD7CB]" />

      {CANONICAL_LEADERSHIP_DATA.map((item) => {
        const isHovered = hoveredNodeId === item.id;
        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredNodeId(item.id)}
            className="relative group cursor-pointer transition-all pl-8 sm:pl-11"
          >
            {/* Timeline Node Dot centered exactly on the line */}
            <div
              className={`absolute left-3 sm:left-4 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 z-10 ${
                isHovered
                  ? "bg-[#3157C8] border-white ring-4 ring-[#3157C8]/20 scale-125 shadow-xs"
                  : "bg-white border-[#8C887B]"
              }`}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Organization Header (Col 1-4) */}
              <div className="lg:col-span-4 space-y-1">
                <span className="text-xs font-bold text-[#3157C8] uppercase tracking-wider">
                  {item.period}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1A1917] tracking-tight">
                  {item.organization}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[#5E5B55]">
                  {item.role}
                </p>
                <p className="text-xs text-[#7A766D]">{item.location}</p>
              </div>

              {/* Scope & Impact (Col 5-12) */}
              <div className="lg:col-span-8 space-y-3">
                <div className="p-3.5 rounded-xl bg-white/80 border border-[#DDD7CB]/70">
                  <span className="text-xs font-bold text-[#3157C8] block mb-0.5">
                    Primary Quantified Result:
                  </span>
                  <span className="text-sm font-semibold text-[#1A1917]">
                    {item.primaryMetric}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#45433E] leading-relaxed">
                  {item.scopeSummary}
                </p>

                <ul className="space-y-1.5 pt-1">
                  {item.keyInitiatives.map((init, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1A1917]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3157C8] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{init}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Proposal 3 (Alt 1C): Asymmetric Leadership Split (Editorial Magazine Directory)
 * 35:65 directory on left, active impact canvas on right. Zero generic card borders.
 */
function LeadershipAltC({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const activeItem = CANONICAL_LEADERSHIP_DATA.find((i) => i.id === activeId) || CANONICAL_LEADERSHIP_DATA[0];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 select-none py-2">
      {/* Left 35%: Organization Directory */}
      <div className="lg:col-span-4 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C887B] block mb-3">
          Select Society / Laboratory
        </span>
        {CANONICAL_LEADERSHIP_DATA.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                isActive
                  ? "bg-white shadow-xs border-l-4 border-l-[#3157C8]"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            >
              <div className="flex justify-between items-baseline gap-2">
                <h4 className="text-base font-bold font-serif text-[#1A1917]">{item.organization}</h4>
                <span className="text-[11px] font-semibold text-[#7A766D]">{item.period}</span>
              </div>
              <p className="text-xs text-[#5E5B55] mt-1 font-medium">{item.role}</p>
            </div>
          );
        })}
      </div>

      {/* Right 65%: Active Canvas */}
      <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#EDE9E1]/50 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex flex-wrap justify-between items-baseline gap-2 pb-4 border-b border-[#DDD7CB]/80">
            <div>
              <h4 className="text-2xl font-bold font-serif text-[#1A1917]">
                {activeItem.organization}
              </h4>
              <p className="text-sm font-semibold text-[#3157C8] mt-1">
                {activeItem.role} · {activeItem.period}
              </p>
            </div>
            <span className="text-xs text-[#7A766D]">{activeItem.location}</span>
          </div>

          <div className="my-5 p-4 rounded-xl bg-white shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3157C8] block">
              Primary Quantified Result
            </span>
            <p className="text-base font-bold font-serif text-[#1A1917] mt-1">
              {activeItem.primaryMetric}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#45433E] leading-relaxed mb-6">
            {activeItem.scopeSummary}
          </p>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C887B] block">
              Key Strategic Deliverables
            </span>
            <ul className="space-y-2.5">
              {activeItem.keyInitiatives.map((init, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1A1917]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3157C8] mt-2 shrink-0" />
                  <span className="leading-relaxed">{init}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#DDD7CB]/80 flex flex-wrap gap-2">
          {activeItem.focusAreas.map((f, idx) => (
            <span key={idx} className="px-3 py-1 rounded-md text-xs font-medium bg-white text-[#45433E] shadow-2xs">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
