/**
 * Canonical Design System Tokens for Sebastian Salutare Portfolio
 * Color Direction: Cobalt (#3157C8) + Warm Bone (#F5F3EE) + Vermilion (#F0522D)
 *
 * All values are defined canonically in `src/app/globals.css` via Tailwind v4 `@theme`.
 * This module provides TypeScript-safe definitions and WebGL float parsers.
 */

export interface ThemeColors {
  // Surfaces
  surfaceCanvas: string;
  surfaceElevated: string;
  surfaceSecondary: string;

  // Typography & Content
  contentDisplay: string;
  contentBody: string;
  contentMuted: string;

  // Brand Chromatic
  primary: string;
  primaryHover: string;
  primaryActive: string;
  onPrimary: string;

  // Dedicated Semantics
  focusRing: string;
  accentCounter: string;

  // Hairlines & Outlines
  outlineHairline: string;
  outlineSoft: string;
  outlineInteractive: string;

  // WebGL Fluid Parameters
  shader: {
    base: string;
    soft: string;
    mid: string;
    primary: string;
    secondaryMid: string;
    secondaryDeep: string;
    highlight: string;
  };
}

export type FullSiteStudyTheme = typeof PRODUCTION_THEME;

export const CANONICAL_THEME: ThemeColors = {
  surfaceCanvas: "#F5F3EE",
  surfaceElevated: "#FBFBF9",
  surfaceSecondary: "#EDE9E1",

  contentDisplay: "#1A1917",
  contentBody: "#45433E",
  contentMuted: "#5E5B55",

  primary: "#3157C8",
  primaryHover: "#2849AB",
  primaryActive: "#223F96",
  onPrimary: "#FFFFFF",

  focusRing: "#244BC0",
  accentCounter: "#F0522D",

  outlineHairline: "#DDD7CB",
  outlineSoft: "#E2DFD7",
  outlineInteractive: "#C8C0B2",

  shader: {
    base: "#F5F3EE",          // Bone liquid medium
    soft: "#E2EAFA",          // Pale cobalt wash (cobalt-100)
    mid: "#5E80DD",           // Diagram/mid cobalt (cobalt-400)
    primary: "#3157C8",       // Cobalt anchor (cobalt-600)
    secondaryMid: "#F0522D",  // Localized vermilion tension filaments
    secondaryDeep: "#0C142E", // Deep vortex shadow (cobalt-950)
    highlight: "#FFFFFF",     // Fluid wave crest highlight
  },
};

/**
 * Parses HEX color string into WebGL-compatible normalized RGB Vec3 floats [0.0 - 1.0].
 */
export function hexToVec3(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "").trim();
  const num = parseInt(cleanHex, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  return [r, g, b];
}

/**
 * Backward-compatible mapping for components during token migration.
 */
export const PRODUCTION_THEME = {
  id: "study-c" as const,
  key: "C" as const,
  title: "Cobalt + Bone",
  subtitle: "Corporate-Modern & Strategic Analytical",
  concept: "Cobalt anchor with warm bone medium and restrained vermilion tension filaments.",

  pageBg: CANONICAL_THEME.surfaceCanvas,
  sectionBg: CANONICAL_THEME.surfaceSecondary,
  navBg: "rgba(245, 243, 238, 0.85)",
  navBorder: "rgba(49, 87, 200, 0.15)",

  textPrimary: CANONICAL_THEME.contentDisplay,
  textSecondary: CANONICAL_THEME.contentBody,
  textMuted: CANONICAL_THEME.contentMuted,
  textAccent: CANONICAL_THEME.primary,

  cardBg: CANONICAL_THEME.surfaceElevated,
  cardHoverBg: "#FFFFFF",
  cardBorder: CANONICAL_THEME.outlineHairline,
  cardHoverBorder: "rgba(49, 87, 200, 0.40)",
  cardShadow: "none",

  buttonPrimaryBg: CANONICAL_THEME.primary,
  buttonPrimaryText: CANONICAL_THEME.onPrimary,
  buttonPrimaryHoverBg: CANONICAL_THEME.primaryHover,
  buttonSecondaryBg: "transparent",
  buttonSecondaryBorder: CANONICAL_THEME.outlineHairline,
  buttonSecondaryText: CANONICAL_THEME.contentDisplay,

  activePillBg: CANONICAL_THEME.primary,
  activePillText: CANONICAL_THEME.onPrimary,
  inactivePillText: CANONICAL_THEME.contentMuted,

  divider: CANONICAL_THEME.outlineHairline,
  subtleDivider: CANONICAL_THEME.outlineSoft,

  projectSvgBg: "#E8EEF9",
  projectSvgStrokePrimary: CANONICAL_THEME.contentDisplay,
  projectSvgStrokeSecondary: "#5E80DD",
  projectSvgAccent: CANONICAL_THEME.primary,
  projectSvgCounterAccent: CANONICAL_THEME.accentCounter,

  shader: {
    mode: 2,
    base: CANONICAL_THEME.shader.base,
    soft: CANONICAL_THEME.shader.soft,
    mid: CANONICAL_THEME.shader.mid,
    primary: CANONICAL_THEME.shader.primary,
    secondaryMid: CANONICAL_THEME.shader.secondaryMid,
    secondaryDeep: CANONICAL_THEME.shader.secondaryDeep,
    highlight: CANONICAL_THEME.shader.highlight,
  },
};
