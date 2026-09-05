"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { SubpageHeroScene } from "@/components/SubpageHeroScene";
import { PRODUCTION_THEME } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function NotFound() {
  const theme = PRODUCTION_THEME;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <main className="relative min-h-screen selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-primary)] overflow-x-hidden bg-[var(--color-surface-canvas)] text-[var(--color-content-display)] flex flex-col justify-between">
      {/* Persistent Floating Navigation */}
      <FloatingNav theme={theme} />

      {/* Shared WebGL Background Scene: Fluid Atmosphere */}
      <SubpageHeroScene />

      {/* 
        Calm Readable Clearing:
        A soft, seamless radial Bone wash layered between AnimatedFlow (z-0) and Content (z-10).
        Fades gently from ~94% Warm Bone at the typography center out to transparent, 
        ensuring the 404 numerals remain sharply legible across ALL animation frames 
        without hard edges, cards, borders, or text shadows.
      */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 760px 480px at 50% 48%, rgba(245, 243, 238, 0.94) 0%, rgba(245, 243, 238, 0.82) 42%, rgba(245, 243, 238, 0.35) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Centered Main 404 Composition */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pt-28 sm:pt-32 lg:pt-36 pb-16 flex-1 flex flex-col items-center justify-center text-center">
        {/* Dominant Editorial 404 Numeral */}
        <span
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[144px] font-serif font-normal text-[#1A1917] tracking-tight leading-none select-none mb-2 sm:mb-3"
          aria-hidden="true"
        >
          404
        </span>

        {/* Hidden Accessible Heading for Screen Readers */}
        <h1 className="sr-only">404 – The page you&apos;re looking for isn&apos;t here.</h1>

        {/* Direct, Unembellished Recovery Sentence with Tight Vertical Rhythm */}
        <p className="text-base sm:text-lg text-[#5E5B55] leading-relaxed max-w-md mb-7 sm:mb-8">
          The page you&apos;re looking for isn&apos;t here.
        </p>

        {/* Strengthened Primary Action Button: Signature Living Navigation Interaction */}
        <div>
          <Link
            href="/"
            className="group/sig relative inline-flex h-11 sm:h-12 items-center overflow-hidden rounded-full border border-[#DDD7CB] bg-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] pl-[56px] sm:pl-[60px] pr-6 sm:pr-7 text-xs sm:text-sm font-semibold text-[#1A1917] whitespace-nowrap shadow-2xs transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] select-none cursor-pointer"
            aria-label="Return to homepage"
          >
            {/* Expanding Cobalt Sheath */}
            <div
              className={`absolute left-1 top-1 h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-in-out group-hover/sig:left-0 group-hover/sig:top-0 group-hover/sig:h-full group-hover/sig:w-full group-focus-visible/sig:left-0 group-focus-visible/sig:top-0 group-focus-visible/sig:h-full group-focus-visible/sig:w-full ${
                reducedMotion ? "transform-none transition-none" : ""
              }`}
              aria-hidden="true"
            />

            {/* Gliding Arrow (Centered in sheath circle at rest, glides right on hover) */}
            <span
              className={`absolute left-[23px] sm:left-[25px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 text-white transition-all duration-300 ease-in-out group-hover/sig:left-[calc(100%-22px)] group-focus-visible/sig:left-[calc(100%-22px)] pointer-events-none ${
                reducedMotion ? "transform-none" : ""
              }`}
              aria-hidden="true"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>

            {/* Label */}
            <span
              className="relative z-10 transition-all duration-300 ease-in-out group-hover/sig:text-white group-hover/sig:-translate-x-[24px] group-focus-visible/sig:text-white group-focus-visible/sig:-translate-x-[24px]"
            >
              Return to homepage
            </span>
          </Link>
        </div>
      </div>

      {/* Minimal Footer: Strictly Copyright Only (Zero Lines, Centered & Calm) */}
      <footer className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 py-6 flex items-center justify-center text-xs text-[#8C887B] select-none">
        <span>© 2026 Sebastian Salutare</span>
      </footer>
    </main>
  );
}
