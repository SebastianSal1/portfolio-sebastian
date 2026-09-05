"use client";

import React from "react";
import { FloatingNav } from "@/components/FloatingNav";
import { HeroSection } from "@/components/HeroSection";
import { VerticalNarrativeSections } from "@/components/VerticalNarrativeSections";
import { AnimatedFlow } from "@/components/lightswind/animated-flow";
import { PRODUCTION_THEME } from "@/lib/theme";

export default function Home() {
  const theme = PRODUCTION_THEME;

  return (
    <main
      className="relative min-h-screen selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-primary)] overflow-x-hidden bg-[var(--color-surface-canvas)] text-[var(--color-content-display)]"
    >
      {/* Top Floating Nav */}
      <FloatingNav theme={theme} />

      {/* CONTINUOUS VISUAL SCENE: Controlled Animated Flow for Cobalt + Bone + Vermilion */}
      <div
        className="absolute top-0 left-0 right-0 h-[86vh] min-h-[750px] max-h-[920px] pointer-events-none z-0 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.3) 84%, rgba(0,0,0,0.05) 93%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.3) 84%, rgba(0,0,0,0.05) 93%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <AnimatedFlow
          theme={theme}
          flowSpeed={0.65}
          distortionWarp={3.2}
          colorContrast={1.55}
          zoomScale={1.0}
          interactive={true}
          className="w-full h-full"
        />
      </div>

      {/* Foreground Sections sharing the continuous canvas */}
      <div className="relative z-10">
        <HeroSection theme={theme} />
        <VerticalNarrativeSections theme={theme} />
      </div>
    </main>
  );
}
