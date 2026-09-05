"use client";

import React from "react";
import { CredentialMatrix } from "@/components/CredentialMatrix";
import { HeroResearchFooter } from "@/components/HeroResearchFooter";
import { FeaturedProjectDisplay } from "@/components/FeaturedProjectDisplay";
import { FullSiteStudyTheme } from "@/lib/theme";
export interface HeroSectionProps {
  theme: FullSiteStudyTheme;
}

export function HeroSection({ theme }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-fit lg:min-h-[70vh] flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32 pb-2 sm:pb-3"
    >
      {/* Main Hero Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between relative z-10">
        {/* Upper Row: 2-Column Grid (Left: Identity/Credentials, Right: Work/Projects) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start w-full">
          {/* Left Column: Identity & Credential Matrix (Vertically centered with right column) */}
          <div className="lg:col-span-6 flex flex-col justify-center w-full max-w-[600px] lg:-translate-y-8 transition-transform">
            <div className="space-y-4">
              {/* Editorial Headline */}
              <h1
                style={{ color: theme.textPrimary }}
                className="font-serif leading-[0.80] tracking-tight uppercase flex flex-col text-[clamp(3.8rem,7.6vw,8.6rem)] select-none"
              >
                <span className="block font-normal">Sebastian</span>
                <span className="italic block ml-[18%]">
                  Salutare
                </span>
              </h1>

              {/* Positioning Statement */}
              <p
                style={{ color: theme.textSecondary }}
                className="text-sm sm:text-base font-normal max-w-md leading-snug pt-1"
              >
                Strategy, finance, operations and technology.
              </p>

              {/* 4 Independent Tactile Credential Tiles */}
              <CredentialMatrix theme={theme} />

              {/* Skills, Campus & Location Footer (Option 3 Justified, Zero Lines) */}
              <HeroResearchFooter theme={theme} />
            </div>
          </div>

          {/* Right Column: Freestanding Featured Project Specimen Card */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center w-full">
            <FeaturedProjectDisplay theme={theme} />
          </div>
        </div>

      </div>
    </section>
  );
}
