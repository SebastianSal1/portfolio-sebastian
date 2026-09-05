"use client";

import React from "react";
import { Mail, ArrowUpRight, ArrowRight, ArrowUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCvModal } from "@/context/CvModalContext";
// Compose email address from constituent fragments to prevent basic static HTML harvesting
const EMAIL_USER = "sebastiansalutare";
const EMAIL_DOMAIN = "gmail.com";
export const getCanonicalEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;
export const getMailtoHref = () => `mailto:${getCanonicalEmail()}`;

export const CANONICAL_CONTACT = {
  get email() {
    return getCanonicalEmail();
  },
  linkedin: "https://linkedin.com/in/sebastian-salutare/",
  github: "https://github.com/SebastianSal1",
  cvMailto: "/cv.pdf",
  cvLabel: "Preview CV",
};

/**
 * Authentic LinkedIn Brand Mark SVG (16x16 standard geometry)
 */
export function LinkedInBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
    </svg>
  );
}

/**
 * Authentic GitHub Brand Mark SVG (16x16 standard Octocat silhouette)
 */
export function GitHubBrandIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

/**
 * Standard Primary Action: Email me (semantic <a> anchor)
 */
export function PrimaryEmailLink({
  label = "Email me",
  className = "",
  showAddress = false,
  variant = "cobalt",
}: {
  label?: string;
  className?: string;
  showAddress?: boolean;
  variant?: "cobalt" | "ink" | "ghost";
}) {
  const [activeHref, setActiveHref] = React.useState<string>("#");

  const handleActivate = React.useCallback(() => {
    setActiveHref(getMailtoHref());
  }, []);

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = getMailtoHref();
  }, []);

  const baseClasses =
    "inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2";

  let colorClasses = "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-xs";
  if (variant === "ink") {
    colorClasses = "bg-[#1A1917] text-[#F5F3EE] hover:bg-black shadow-xs";
  } else if (variant === "ghost") {
    colorClasses = "bg-transparent text-[#1A1917] hover:bg-[#1A1917]/[0.05] border border-[#DDD7CB]";
  }

  return (
    <a
      href={activeHref}
      onClick={handleClick}
      onMouseEnter={handleActivate}
      onFocus={handleActivate}
      className={`${baseClasses} ${colorClasses} ${className}`}
      aria-label={`${label} (opens default mail client)`}
    >
      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

/**
 * Secondary Contact Navigation (LinkedIn, GitHub, Request CV)
 */
export function SecondaryContactLinks({
  variant = "editorial",
  colorTheme = "dark",
  className = "",
}: {
  variant?: "editorial" | "badges" | "minimal";
  colorTheme?: "dark" | "light";
  className?: string;
}) {
  const { openCvModal } = useCvModal();
  const textColor = colorTheme === "dark" ? "text-[#F5F3EE]/80 hover:text-white" : "text-[#5E5B55] hover:text-[#1A1917]";
  const badgeBg =
    colorTheme === "dark"
      ? "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-[#F5F3EE]"
      : "bg-white/70 hover:bg-white border-[#DDD7CB] hover:border-[#C8C0B2] text-[#1A1917]";

  if (variant === "badges") {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a
          href={CANONICAL_CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${badgeBg}`}
        >
          <LinkedInBrandIcon className="w-3.5 h-3.5 shrink-0" />
          <span>LinkedIn</span>
        </a>
        <a
          href={CANONICAL_CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${badgeBg}`}
        >
          <GitHubBrandIcon className="w-3.5 h-3.5 shrink-0" />
          <span>GitHub</span>
        </a>

        <button
          type="button"
          onClick={openCvModal}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer ${badgeBg}`}
          aria-label="Preview CV"
        >
          <span>{CANONICAL_CONTACT.cvLabel}</span>
          <ArrowRight className="w-3 h-3 shrink-0 opacity-70" />
        </button>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium ${textColor} ${className}`}>
        <a
          href={CANONICAL_CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs"
        >
          <span>LinkedIn</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
        </a>

        <a
          href={CANONICAL_CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs"
        >
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
        </a>

        <button
          type="button"
          onClick={openCvModal}
          className="inline-flex items-center gap-1 transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs cursor-pointer"
        >
          <span>{CANONICAL_CONTACT.cvLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
    );
  }

  // Editorial default: authentic brand SVGs with subtle typography
  return (
    <div className={`flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium ${textColor} ${className}`}>
      <a
        href={CANONICAL_CONTACT.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs"
      >
        <LinkedInBrandIcon className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100 transition-opacity" />
        <span className="group-hover/link:underline underline-offset-4">LinkedIn</span>
        <ArrowUpRight className="w-3 h-3 opacity-40 group-hover/link:opacity-80 transition-opacity" />
      </a>

      <a
        href={CANONICAL_CONTACT.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs"
      >
        <GitHubBrandIcon className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100 transition-opacity" />
        <span className="group-hover/link:underline underline-offset-4">GitHub</span>
        <ArrowUpRight className="w-3 h-3 opacity-40 group-hover/link:opacity-80 transition-opacity" />
      </a>

      <button
        type="button"
        onClick={openCvModal}
        className="group/link inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs cursor-pointer"
      >
        <span className="group-hover/link:underline underline-offset-4">{CANONICAL_CONTACT.cvLabel}</span>
        <ArrowRight className="w-3 h-3 opacity-40 group-hover/link:opacity-80 transition-opacity" />
      </button>
    </div>
  );
}

/**
 * Back to top utility link with directional arrow elevation
 */
export function BackToTopLink({
  className = "",
  colorTheme = "dark",
}: {
  className?: string;
  colorTheme?: "dark" | "light";
}) {
  const reducedMotion = usePrefersReducedMotion();

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  };

  const textColor =
    colorTheme === "dark"
      ? "text-[#F5F3EE]/80 hover:text-white"
      : "text-[#5E5B55] hover:text-[#1A1917]";

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      className={`group/top inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xs cursor-pointer ${textColor} ${className}`}
      aria-label="Back to top of page"
    >
      <span className="group-hover/top:underline underline-offset-4">Back to top</span>
      <ArrowUp
        className={`w-3.5 h-3.5 transition-transform duration-200 text-[var(--color-primary)] ${
          reducedMotion ? "" : "group-hover/top:-translate-y-1"
        }`}
      />
    </button>
  );
}
