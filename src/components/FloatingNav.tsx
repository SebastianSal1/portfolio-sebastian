"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { FullSiteStudyTheme } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCvModal } from "@/context/CvModalContext";
export interface NavItem {
  label: string;
  href: string;
}

export interface FloatingNavProps {
  theme: FullSiteStudyTheme;
}
export function FloatingNav({ theme }: FloatingNavProps) {
  const pathname = usePathname();
  const { openCvModal } = useCvModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect external modals, slide-panels, or dialogs across the document
  useEffect(() => {
    const checkModal = () => {
      const modalElements = document.querySelectorAll(
        '[role="dialog"][aria-modal="true"], [data-modal-open="true"]'
      );
      // Exclude elements inside this header (such as mobile menu)
      const hasExternalModal = Array.from(modalElements).some(
        (el) => !el.closest("header")
      );
      setModalActive(hasExternalModal);
    };

    checkModal();

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["role", "aria-modal", "data-modal-open", "style"],
    });

    return () => observer.disconnect();
  }, []);
  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const isHomepage = pathname === "/";
  const navLinks: NavItem[] = [
    { label: "Experience", href: isHomepage ? "#experience" : "/experience" },
    { label: "Projects", href: isHomepage ? "#projects" : "/projects" },
    { label: "Competitions", href: isHomepage ? "#competitions" : "/competitions" },
    { label: "Leadership", href: isHomepage ? "#leadership" : "/experience#leadership" },
    { label: "Academics", href: isHomepage ? "#academics" : "/education" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    }
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex flex-col items-center px-4 pt-3.5 sm:pt-4 pointer-events-none select-none transition-all duration-300 ${
        modalActive
          ? "opacity-0 -translate-y-5 invisible"
          : "opacity-100 translate-y-0 visible"
      } ${reducedMotion ? "transition-none transform-none" : ""}`}
      aria-hidden={modalActive}
    >
      <nav
        aria-label="Primary Navigation"
        style={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.88)"
            : "rgba(255, 255, 255, 0.65)",
          borderColor: scrolled
            ? "rgba(221, 215, 203, 0.92)"
            : "rgba(221, 215, 203, 0.75)",
          boxShadow: scrolled
            ? "0 10px 28px -4px rgba(26, 25, 23, 0.08), 0 2px 6px rgba(26, 25, 23, 0.03)"
            : "0 2px 12px rgba(26, 25, 23, 0.04), 0 1px 3px rgba(26, 25, 23, 0.02)",
        }}
        className="pointer-events-auto flex items-center justify-between md:justify-center gap-2.5 sm:gap-4 lg:gap-5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full w-full md:w-auto max-w-[96vw] transition-all duration-300 backdrop-blur-md border shadow-xs"
      >
        {/* Left: Full Brand Identity (Always routes to home /) */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHomepage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={{ color: theme.textPrimary }}
          className="font-semibold tracking-tight text-xs sm:text-[13px] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] rounded-full shrink-0 py-0.5"
        >
          <span>Sebastian Salutare</span>
        </Link>

        {/* Center: Desktop/Tablet Route Navigation (Hidden on small mobile < 768px) */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = activeHover === link.label;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setActiveHover(link.label)}
                onMouseLeave={() => setActiveHover(null)}
                style={{
                  color: isActive
                    ? "var(--color-primary, #3157C8)"
                    : isHovered
                    ? theme.textPrimary
                    : theme.textSecondary,
                  backgroundColor: isActive
                    ? "rgba(49, 87, 200, 0.12)"
                    : isHovered
                    ? "rgba(26, 25, 23, 0.05)"
                    : "transparent",
                  borderColor: isActive
                    ? "rgba(49, 87, 200, 0.22)"
                    : "transparent",
                }}
                className={`px-3.5 py-1 rounded-full font-medium border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] ${
                  isActive ? "font-semibold shadow-2xs" : ""
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Mobile Menu Toggle + CV Action */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            ref={toggleButtonRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-[#1A1917] hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Micro CV Action (Preserved canonical interaction) */}
          <button
            type="button"
            onClick={openCvModal}
            className="flex items-center gap-1 pl-3.5 pr-3 py-1 rounded-full bg-[var(--color-content-display,#1A1917)] text-white text-[11px] sm:text-xs font-medium shadow-2xs hover:bg-[var(--color-primary,#3157C8)] transition-all hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring,#244BC0)] shrink-0 cursor-pointer"
            aria-label="Preview CV"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </nav>
      {/* Mobile Menu Dropdown Panel (< 768px) with Full Unabbreviated Labels */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-label="Mobile Navigation"
          className="pointer-events-auto md:hidden w-full max-w-[340px] mt-2 p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DDD7CB] shadow-xl flex flex-col gap-1 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          {navLinks.map((link) => {
            const isActive = isHomepage ? false : pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary)]/[0.12] text-[var(--color-primary)] font-semibold border border-[var(--color-primary)]/20 shadow-2xs"
                    : "text-[#1A1917] hover:bg-black/5"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
