"use client";

import React from "react";
import { AnimatedFlow } from "@/components/lightswind/animated-flow";
import { PRODUCTION_THEME, FullSiteStudyTheme } from "@/lib/theme";

export interface SubpageHeroSceneProps {
  theme?: FullSiteStudyTheme;
  className?: string;
}

export function SubpageHeroScene({
  theme = PRODUCTION_THEME,
  className = "",
}: SubpageHeroSceneProps) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 h-[65vh] min-h-[500px] max-h-[750px] pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.25) 80%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 60%, rgba(0,0,0,0.25) 80%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <AnimatedFlow
        theme={theme}
        flowSpeed={0.55}
        distortionWarp={3.0}
        colorContrast={1.5}
        zoomScale={1.0}
        interactive={true}
        className="w-full h-full"
      />
    </div>
  );
}
