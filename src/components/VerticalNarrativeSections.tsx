"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  X,
  CheckCircle2,
  Mail,
  Compass,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { FullSiteStudyTheme } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCvModal } from "@/context/CvModalContext";
import { useIsMounted } from "@/lib/useIsMounted";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { CurlNoiseFlowField } from "./footer/CurlNoiseFlowField";
import { PrivacyNoticeModal, ColophonModal } from "./footer/FooterModals";
import { BackToTopLink } from "./footer/ContactLinks";
import {
  CANONICAL_EXPERIENCE_DATA,
  PROJECT_PLACEHOLDERS,
  COMPETITION_PLACEHOLDERS,
  CANONICAL_ACADEMICS_DATA,
  CURRENT_INTERESTS_DATA,
  ExperienceItem,
} from "@/lib/domain-data";

const PROJECT_IMAGES: Record<string, string> = {
  "proj-ph-1": "/images/explorations/project-placeholder-01.png",
  "proj-ph-2": "/images/explorations/project-placeholder-02.png",
  "proj-ph-3": "/images/explorations/project-placeholder-03.png",
};

const COMPETITION_IMAGES: Record<string, string> = {
  "comp-ph-1": "/images/competitions/real-case-competition.jpg",
  "comp-ph-2": "/images/competitions/real-mun-delegates.jpg",
  "comp-ph-3": "/images/competitions/real-hackathon-team.jpg",
};

export type ArrowDesign = "classic" | "chevron" | "taper" | "architectural" | "diagonal";

export function renderArrowIcon(design: ArrowDesign = "classic") {
  switch (design) {
    case "chevron":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M 6 3.5 L 10.5 8 L 6 12.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "taper":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M 2.5 8 H 13.5 M 9.5 4.5 L 13.5 8 L 9.5 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "architectural":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M 3 8 H 13 M 8.5 3.5 L 13 8 L 8.5 12.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "diagonal":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M 4.5 11.5 L 11.5 4.5 M 6 4.5 H 11.5 V 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "classic":
    default:
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M 2.5 8 H 13.5 M 9.5 4 L 13.5 8 L 9.5 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

interface SignatureNavigationButtonProps {
  href: string;
  label: string;
  arrowDesign?: ArrowDesign;
  className?: string;
}

export function SignatureNavigationButton({
  href,
  label,
  arrowDesign = "classic",
  className = "",
}: SignatureNavigationButtonProps) {
  return (
    <Link
      href={href}
      className={`group/sig relative inline-flex h-10 items-center overflow-hidden rounded-full border border-[#DDD7CB] bg-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] pl-[52px] pr-5 text-xs sm:text-sm font-semibold text-[#1A1917] whitespace-nowrap shadow-2xs transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] select-none cursor-pointer ${className}`}
    >
      {/* 
        Cobalt element on the LEFT:
        - At rest: a mathematically true circle (h-8 w-8 rounded-full left-1 top-1)
        - On hover: enlarges to full height AND swipes/slides horizontally across to 100% full-bleed width with zero whitespace!
      */}
      <div
        className="absolute left-1 top-1 h-8 w-8 rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-in-out group-hover/sig:left-0 group-hover/sig:top-0 group-hover/sig:h-full group-hover/sig:w-full group-focus-visible/sig:left-0 group-focus-visible/sig:top-0 group-focus-visible/sig:h-full group-focus-visible/sig:w-full motion-reduce:transform-none motion-reduce:transition-none"
        aria-hidden="true"
      />

      {/* 
        Continuous Gliding Arrow:
        - At rest: 100% dead-centered in the 32px circle at left-5 (20px from left)
        - On hover: continuously slides smoothly across the button to left-[calc(100%-20px)]
      */}
      <span className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 text-white transition-all duration-300 ease-in-out group-hover/sig:left-[calc(100%-20px)] group-focus-visible/sig:left-[calc(100%-20px)] pointer-events-none motion-reduce:transform-none">
        {renderArrowIcon(arrowDesign)}
      </span>

      {/* 
        Label: optically centered and justified between left circle (16px gap) and right curved cap (20px gap).
        On hover: inverts to pure white and smoothly glides left (-translate-x-[26px]) to create balanced 26px spacing on both sides of text!
      */}
      <span className="relative z-10 transition-all duration-300 ease-in-out group-hover/sig:text-white group-hover/sig:-translate-x-[26px] group-focus-visible/sig:text-white group-focus-visible/sig:-translate-x-[26px]">
        {label}
      </span>
    </Link>
  );
}

export interface VerticalNarrativeProps {
  theme: FullSiteStudyTheme;
  arrowDesign?: ArrowDesign;
}
export function VerticalNarrativeSections({ theme, arrowDesign = "classic" }: VerticalNarrativeProps) {
  const { openCvModal } = useCvModal();
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [activeSidePanelId, setActiveSidePanelId] = useState<string | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isColophonOpen, setIsColophonOpen] = useState(false);
  const sidePanelTriggerRef = useRef<HTMLElement | null>(null);
  const panelTitleRef = useRef<HTMLHeadingElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const mounted = useIsMounted();

  const sidePanelContainerRef = useFocusTrap<HTMLElement>({
    isOpen: Boolean(activeSidePanelId),
    onClose: () => {
      setActiveSidePanelId(null);
      sidePanelTriggerRef.current?.focus();
    },
    initialFocusRef: panelTitleRef,
    returnFocusRef: sidePanelTriggerRef,
  });
  useEffect(() => {
    if (activeSidePanelId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeSidePanelId]);
  const activeRecord: ExperienceItem | null = activeSidePanelId
    ? CANONICAL_EXPERIENCE_DATA.find((r) => r.id === activeSidePanelId) || null
    : null;
  return (
    <div className="w-full relative z-10 flex flex-col gap-20 sm:gap-24 lg:gap-28 pb-0">
      {/* ======================================================================= */}
      {/* 1. PROFESSIONAL EXPERIENCES SECTION                                     */}
      {/* ======================================================================= */}
      <section id="experience" className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-4 sm:pt-6">
        {/* Factual 1-Line Serif Lead-in */}
        <div className="mb-8 sm:mb-10 w-full flex items-center gap-3.5 sm:gap-4 select-none">
          <div className="shrink-0 text-[var(--color-primary)]">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
              <circle cx="9" cy="9" r="2.5" fill="currentColor" />
              <line x1="9" y1="0" x2="9" y2="4.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="13.5" x2="9" y2="18" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="9" x2="4.5" y2="9" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13.5" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h2
            style={{ color: theme.textPrimary }}
            className="text-xl sm:text-2xl lg:text-[33px] xl:text-[38px] font-serif font-bold leading-[1.18] tracking-tight whitespace-normal lg:whitespace-nowrap"
          >
            My work spans{" "}
            <span className="italic text-[var(--color-primary)] font-bold">equity research</span>,{" "}
            <span className="italic text-[var(--color-primary)] font-bold">process simulation</span>, and{" "}
            <span className="italic text-[var(--color-primary)] font-bold">decision support</span>.
          </h2>
        </div>

        {/* Option C: 2-Column Asymmetric Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Anchor & Action */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 select-none">
                <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
                  <Briefcase className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A766D]">
                  Career Record
                </span>
              </div>
              <h3
                style={{ color: theme.textPrimary }}
                className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight mb-4"
              >
                Professional Experiences
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#5E5B55] leading-relaxed mb-6">
                Strategic corporate advisory, operational simulation modeling, and student enterprise leadership across multidisciplinary teams.
              </p>
            </div>

            <div className="pt-4">
              <SignatureNavigationButton href="/experience" label="View experience" arrowDesign={arrowDesign} />
            </div>
          </div>
          {/* Right Column: Experience Rows with Sibling Dimming & M3 State Layer */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {CANONICAL_EXPERIENCE_DATA.map((role) => {
              const isHovered = hoveredRoleId === role.id;
              const isDimmed = hoveredRoleId !== null && !isHovered;

              return (
                <article
                  key={role.id}
                  onMouseEnter={() => setHoveredRoleId(role.id)}
                  onMouseLeave={() => setHoveredRoleId(null)}
                  onClick={(e) => {
                    sidePanelTriggerRef.current = e.currentTarget;
                    setActiveSidePanelId(role.id);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-label={`Inspect ${role.title} at ${role.organization}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      sidePanelTriggerRef.current = e.currentTarget;
                      setActiveSidePanelId(role.id);
                    }
                  }}
                  className={`group flex flex-col p-4 sm:p-5 -mx-4 rounded-2xl transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] ${
                    isDimmed ? "opacity-55" : "opacity-100 hover:bg-white/70 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  {/* Top Bar: Company Name & Role Title (Left) + Period, Location & Micro Signature Arrow (Right) */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex flex-col min-w-0">
                      <h4
                        style={{ color: theme.textPrimary }}
                        className="text-base sm:text-lg font-bold font-sans tracking-tight group-hover:text-[var(--color-primary)] transition-colors"
                      >
                        {role.organization}
                      </h4>
                      <span className="text-xs sm:text-[13.5px] font-semibold text-[var(--color-primary)] mt-0.5">
                        {role.title}
                      </span>
                    </div>

                    {/* Right Metadata Block & Micro Signature Affordance */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 pt-0.5">
                      <div className="flex flex-col items-end text-right">
                        <span
                          style={{ color: theme.textMuted }}
                          className="text-xs sm:text-[13px] whitespace-nowrap font-medium leading-tight"
                        >
                          {role.period}
                        </span>
                        <span className="text-xs sm:text-[12.5px] whitespace-nowrap font-medium text-[#5E5B55] mt-1 leading-tight">
                          {role.location}
                        </span>
                      </div>

                      {/* Micro Signature Circle Arrow Affordance */}
                      <div
                        className="w-8 h-8 rounded-full border border-[#DDD7CB] bg-white text-[#1A1917] group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs group-hover:shadow-xs shrink-0"
                        aria-hidden="true"
                      >
                        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Grounded Scope Description */}
                  <p
                    style={{ color: theme.textSecondary }}
                    className="text-[13px] sm:text-sm leading-relaxed pr-0 sm:pr-12"
                  >
                    {role.scopeSummary}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================= */}
      {/* 2. PROJECTS SECTION                                                     */}
      {/* ======================================================================= */}
      <section id="projects" className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header Action: Perfectly aligned with headline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
              <Layers className="w-5 h-5" />
            </span>
            <h3
              style={{ color: theme.textPrimary }}
              className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight"
            >
              Projects
            </h3>
          </div>

          <SignatureNavigationButton href="/projects" label="View projects" arrowDesign={arrowDesign} />
        </div>

        {/* 3 Project Cards: Alternative C (Information Reveal Card with Tonal Surface on Hover, Zero Border, Soft Shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECT_PLACEHOLDERS.map((proj) => (
            <Link
              key={proj.id}
              href="/projects"
              aria-label={`Inspect ${proj.title}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-0 border-transparent bg-white/40 hover:bg-white shadow-2xs hover:shadow-[0_16px_40px_rgba(26,25,23,0.08)] transition-all duration-300 select-none cursor-pointer aspect-[4/5] sm:aspect-[3/4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              {/* Visual Artwork Layer */}
              <div className="absolute inset-0 z-0 bg-[#EAE6DE]/70">
                <Image
                  src={PROJECT_IMAGES[proj.id]}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover transition-transform duration-500 ease-out ${
                    reducedMotion ? "" : "group-hover:scale-105"
                  }`}
                />
              </div>

              {/* Top Floating Badges */}
              <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/95 text-[#1A1917] shadow-2xs backdrop-blur-xs">
                  {proj.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 text-[#5E5B55] backdrop-blur-xs">
                  {proj.year}
                </span>
              </div>

              {/* Sliding Bottom Reveal Drawer (Alt C Information Reveal) */}
              <div className="relative z-10 m-3 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-xs transition-all duration-300 ease-out group-hover:translate-y-0 translate-y-1">
                <h4 className="text-base font-serif font-bold text-[#1A1917] tracking-tight mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {proj.title}
                </h4>
                <p className="text-xs text-[#5E5B55] mb-2 line-clamp-2">{proj.shortContext}</p>

                {/* Expanded detail revealed on hover */}
                <div className="overflow-hidden transition-all duration-300 text-[11.5px] text-[#45433E] pt-2 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100">
                  <p className="line-clamp-2 mb-1.5">{proj.description}</p>
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                    <span>Model Specification</span>
                    <span className="flex items-center gap-0.5">
                      <span>View details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================================= */}
      {/* 3. COMPETITIONS SECTION                                                 */}
      {/* ======================================================================= */}
      <section id="competitions" className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header Action: Perfectly aligned with headline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-accent)]">
              <Award className="w-5 h-5" />
            </span>
            <h3
              style={{ color: theme.textPrimary }}
              className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight"
            >
              Competitions
            </h3>
          </div>

          <SignatureNavigationButton href="/competitions" label="View competitions" arrowDesign={arrowDesign} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {COMPETITION_PLACEHOLDERS.map((comp) => (
            <Link
              key={comp.id}
              href="/competitions"
              aria-label={`Inspect ${comp.title}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border-0 border-transparent bg-white/40 hover:bg-white shadow-2xs hover:shadow-[0_16px_40px_rgba(26,25,23,0.08)] transition-all duration-300 select-none cursor-pointer aspect-[4/5] sm:aspect-[3/4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              {/* Visual Background Layer */}
              <div className="absolute inset-0 z-0 bg-[#EAE6DE]/70">
                <Image
                  src={COMPETITION_IMAGES[comp.id]}
                  alt={comp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover transition-transform duration-500 ease-out ${
                    reducedMotion ? "" : "group-hover:scale-105"
                  }`}
                />
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/95 text-[#1A1917] shadow-2xs backdrop-blur-xs">
                  {comp.period}
                </span>
              </div>

              {/* Bottom Floating Reveal Plate */}
              <div className="relative z-10 m-3.5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-xs transition-all duration-300 ease-out group-hover:translate-y-[-2px]">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/[0.08]">
                    {comp.resultPlacement}
                  </span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#1A1917] tracking-tight mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {comp.title}
                </h4>
                <p className="text-xs text-[#5E5B55] mb-2 line-clamp-2">{comp.challengeContext}</p>
                <div className="overflow-hidden transition-all duration-300 text-[11px] text-[#45433E] pt-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2">
                  <p className="line-clamp-2 mb-1">{comp.keyOutput}</p>
                  <div className="flex items-center justify-end text-xs font-semibold text-[var(--color-primary)]">
                    <span className="flex items-center gap-0.5">
                      <span>Case details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================================= */}
      {/* 4. ACADEMICS SECTION                                                    */}
      {/* ======================================================================= */}
      <section id="academics" className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h3
              style={{ color: theme.textPrimary }}
              className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight"
            >
              Academics
            </h3>
          </div>

          <SignatureNavigationButton href="/education" label="View academics" arrowDesign={arrowDesign} />
        </div>

        {/* Open Typographic / Document Layout */}
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
                <span className="text-[var(--color-primary)] font-medium">({CANONICAL_ACADEMICS_DATA.academicStanding})</span>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-[13.5px] text-[#45433E] leading-relaxed mb-4">
            Industrial engineering focus spanning linear & mixed-integer optimization (MILP), stochastic discrete-event simulation, and corporate financial valuation models.
          </p>
        </div>
      </section>

      {/* ======================================================================= */}
      {/* 5. INTERESTS & CURRENT FOCUS SECTION (Homepage only)                    */}
      {/* ======================================================================= */}
      <section id="interests" className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-center gap-2.5 mb-7 select-none">
          <span className="p-1.5 rounded-lg bg-[#1A1917]/[0.04] text-[var(--color-primary)]">
            <Compass className="w-5 h-5" />
          </span>
          <h3
            style={{ color: theme.textPrimary }}
            className="text-2xl sm:text-[28px] font-bold font-sans tracking-tight"
          >
            Interests & Current Focus
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CURRENT_INTERESTS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-2xl border border-[#DDD7CB]/80 bg-white/40 backdrop-blur-xs"
            >
              <h4 className="text-base font-bold font-sans text-[#1A1917] mb-2 tracking-tight">
                {item.domain}
              </h4>
              <p className="text-xs sm:text-[13px] text-[#45433E] leading-relaxed mb-4">
                {item.currentFocus}
              </p>
              <div className="mt-auto pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C887B] block mb-1.5">
                  Core Exploration Themes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.readingThemes.map((themeTag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#1A1917]/[0.04] text-[#5E5B55]"
                    >
                      {themeTag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================================= */}
      {/* 6. CLOSING CTA & FOOTER: Option B + E Combined (Variant 3 Copy)         */}
      {/* ======================================================================= */}
      <footer id="contact" className="w-full relative bg-[#1A1917] text-[#F5F3EE] py-8 sm:py-10 px-6 sm:px-12 lg:px-16 transition-colors select-none overflow-hidden">
        {/* Static Curl-Noise Flow-Field Streamlines Background */}
        <div className="absolute inset-0 z-0 opacity-75 pointer-events-none">
          <CurlNoiseFlowField />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col justify-center gap-6 sm:gap-7">
          {/* Asymmetric 12-Column Grid with tight vertical centering */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column (7 cols): Variant 3 Italic Headline & Context */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl lg:text-[32px] font-serif italic text-[#E2DFD7] tracking-tight leading-[1.2] mb-2">
                  <span className="font-normal">Open to hearing about</span>{" "}
                  <span className="font-bold text-white">interesting opportunities</span>.
                </h3>
                <p className="text-xs sm:text-[13px] text-[#A8A49C] leading-relaxed max-w-xl">
                  Welcome conversations on operational transformation, analytical advisory, and research roles.
                </p>
              </div>
            </div>

            {/* Right Column (5 cols): Actions Stacked (Preview CV above Email, LinkedIn, GitHub) */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center gap-3 sm:gap-3.5">
              {/* Signature 'Preview CV' Action Button */}
              <div>
                <button
                  type="button"
                  onClick={openCvModal}
                  className="group/sig relative inline-flex h-10 items-center overflow-hidden rounded-full border border-[#DDD7CB] bg-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] pl-[52px] pr-5 text-xs sm:text-sm font-semibold text-[#1A1917] whitespace-nowrap shadow-2xs transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] select-none cursor-pointer"
                  aria-label="Preview CV in interactive modal"
                >
                  {/* Expanding Cobalt Sheath */}
                  <div
                    className={`absolute left-1 top-1 h-8 w-8 rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-in-out group-hover/sig:left-0 group-hover/sig:top-0 group-hover/sig:h-full group-hover/sig:w-full group-focus-visible/sig:left-0 group-focus-visible/sig:top-0 group-focus-visible/sig:h-full group-focus-visible/sig:w-full ${
                      reducedMotion ? "transform-none transition-none" : ""
                    }`}
                    aria-hidden="true"
                  />

                  {/* Gliding Arrow */}
                  <span
                    className={`absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 text-white transition-all duration-300 ease-in-out group-hover/sig:left-[calc(100%-20px)] group-focus-visible/sig:left-[calc(100%-20px)] pointer-events-none ${
                      reducedMotion ? "transform-none" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  {/* Label */}
                  <span
                    className="relative z-10 transition-all duration-300 ease-in-out group-hover/sig:text-white group-hover/sig:-translate-x-[26px] group-focus-visible/sig:text-white group-focus-visible/sig:-translate-x-[26px]"
                  >
                    Preview CV
                  </span>
                </button>
              </div>

              {/* Utility Trio: Email, LinkedIn, GitHub */}
              <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2.5 sm:gap-3">
                {/* Email Button */}
                <a
                  href="mailto:sebastiansalutare@gmail.com"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDD7CB] text-[#1A1917] text-xs sm:text-[13px] font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
                  aria-label="Email: sebastiansalutare@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                  <span>Email</span>
                </a>

                {/* LinkedIn Button */}
                <a
                  href="https://linkedin.com/in/sebastian-salutare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDD7CB] text-[#1A1917] text-xs sm:text-[13px] font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
                  aria-label="LinkedIn: Sebastian Salutare"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDD7CB] text-[#1A1917] text-xs sm:text-[13px] font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#1A1917] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Research-Backed Footer Content Bar (Zero Lines, No UTC+7, Perfectly Aligned) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-[#8C887B] pt-1">
            {/* Left Copyright */}
            <span>© 2026 Sebastian Salutare</span>

            {/* Right Legal Disclosures & Back to top */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] rounded-xs"
              >
                Privacy Notice
              </button>
              <button
                type="button"
                onClick={() => setIsColophonOpen(true)}
                className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] rounded-xs"
              >
                Colophon
              </button>
              <span className="opacity-30">|</span>
              <BackToTopLink colorTheme="dark" />
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Modals */}
      <PrivacyNoticeModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <ColophonModal isOpen={isColophonOpen} onClose={() => setIsColophonOpen(false)} />
      {/* ======================================================================= */}
      {/* QUICK-INSPECTION SIDE DETAIL PANEL (Preserved Canonical Interaction)     */}
      {/* ======================================================================= */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeRecord && (
            <div className="fixed inset-0 z-[100] flex justify-end" data-modal-open="true">
              {/* Backdrop Scrim */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
                onClick={() => {
                  setActiveSidePanelId(null);
                  sidePanelTriggerRef.current?.focus();
                }}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
                aria-hidden="true"
              />

              {/* Slide-out Panel Wrapper with unclipped Left Dismiss Tab */}
              <motion.div
                key="panel-wrapper"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                }
                className="relative z-10 w-full max-w-[560px] h-full flex"
              >
                {/* Left Edge Dismiss Cue: Vertically centered circular button with right chevron */}
                <button
                  onClick={() => {
                    setActiveSidePanelId(null);
                    sidePanelTriggerRef.current?.focus();
                  }}
                  className="hidden sm:flex items-center justify-center absolute -left-4 sm:-left-4.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#DDD7CB] text-[#1A1917] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] group"
                  aria-label="Close detail panel"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <aside
                  ref={sidePanelContainerRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="homepage-detail-panel-title"
                  style={{
                    backgroundColor: "color-mix(in srgb, #F5F3EE 97.5%, #3157C8 2.5%)",
                  }}
                  className="w-full h-full shadow-2xl border-l border-[#DDD7CB] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
                >
            <div>
              {/* Company Title & Top Close Button (Aligned on the SAME Top Baseline) */}
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <h3
                  ref={panelTitleRef}
                  id="homepage-detail-panel-title"
                  tabIndex={-1}
                  className="text-2xl sm:text-[28px] font-bold font-sans text-[#1A1917] tracking-tight leading-tight focus-visible:outline-none"
                >
                  {activeRecord.organization}
                </h3>
                <button
                  onClick={() => {
                    setActiveSidePanelId(null);
                    sidePanelTriggerRef.current?.focus();
                  }}
                  className="p-1.5 -mr-1.5 -mt-1 rounded-full hover:bg-black/5 text-[#1A1917] transition-colors cursor-pointer shrink-0"
                  aria-label="Close detail panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Role Title */}
              <div className="mb-2">
                <span className="text-base sm:text-lg font-semibold text-[var(--color-primary)]">
                  {activeRecord.title}
                </span>
              </div>

              {/* Metadata Row: Period on Left, Location on Right */}
              <div className="flex flex-wrap items-center justify-between text-xs text-[#5E5B55] mb-6">
                <span className="font-medium text-[#1A1917]">{activeRecord.period}</span>
                <span className="font-medium text-[#5E5B55]">{activeRecord.location}</span>
              </div>

              {/* Quantified Core Impact: Integrated Typographic Highlight (No Container Box) */}
              {activeRecord.primaryMetric && (
                <div className="mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary)] block mb-1">
                    Quantified Core Impact
                  </span>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1A1917] tracking-tight leading-snug">
                    {activeRecord.primaryMetric}
                  </p>
                </div>
              )}

              {/* Scope & Methodology (Zero Dividing Lines, Pure Spacing) */}
              <div className="space-y-6 mb-7">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-2">
                    Scope of Engagement
                  </h4>
                  <p className="text-sm text-[#45433E] leading-relaxed">
                    {activeRecord.scopeSummary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-2">
                    Methodology & Strategic Formulation
                  </h4>
                  <p className="text-sm text-[#45433E] leading-relaxed">
                    {activeRecord.methodology}
                  </p>
                </div>
              </div>

              {/* Key Quantified Deliverables */}
              <div className="space-y-3 mb-7">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-3">
                  Key Quantified Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {activeRecord.quantifiedImpact.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1A1917]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Toolkit & Frameworks */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C887B] mb-3">
                  Technical Toolkit & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeRecord.keyTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#1A1917] shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </motion.div>
      </div>
    )}
  </AnimatePresence>,
  document.body
)}
    </div>
  );
}
