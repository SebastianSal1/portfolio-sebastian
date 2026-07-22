"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  sections: { id: string; label: string }[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const previousOverflowRef = useRef<string | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const updateActiveSection = useCallback(() => {
    const navHeight =
      document.querySelector("nav")?.getBoundingClientRect().height ?? 0;

    // Nav is transparent while the hero fills the view; solid once you leave it.
    const hero = document.getElementById("hero");
    setScrolled(hero ? hero.getBoundingClientRect().bottom <= navHeight + 4 : true);

    if (window.scrollY <= navHeight + 4) {
      setActiveId("hero");
      return;
    }

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtPageBottom =
      Math.ceil(window.scrollY + viewportHeight) >= documentHeight - 4;

    if (isAtPageBottom) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) setActiveId(lastSection.id);
      return;
    }

    let dominantId = "";
    let dominantRatio = 0;

    for (const section of sections) {
      if (section.id === "hero") continue;

      const element = document.getElementById(section.id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      );
      const viewportRatio = visibleHeight / viewportHeight;

      if (viewportRatio > dominantRatio) {
        dominantRatio = viewportRatio;
        dominantId = section.id;
      }
    }

    if (dominantId && dominantRatio >= 0.5) {
      setActiveId(dominantId);
      return;
    }

    setActiveId((current) => (current === "hero" ? "" : current));
  }, [sections]);

  // Smooth-scroll to a section without writing #id to the URL. replaceState
  // strips any existing hash and avoids adding a history entry.
  const scrollToSection = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const navHeight =
        document.querySelector("nav")?.getBoundingClientRect().height ?? 0;
      const el = id === "hero" ? null : document.getElementById(id);
      const top = el
        ? el.getBoundingClientRect().top + window.scrollY - navHeight
        : 0;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    },
    []
  );

  const requestActiveSectionUpdate = useCallback(() => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateActiveSection();
    });
  }, [updateActiveSection]);

  useEffect(() => {
    const observedSections = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      () => updateActiveSection(),
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    for (const section of observedSections) {
      observer.observe(section);
    }

    updateActiveSection();
    const initialFrame = window.requestAnimationFrame(requestActiveSectionUpdate);
    const initialTimer = window.setTimeout(updateActiveSection, 150);
    window.addEventListener("scroll", requestActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestActiveSectionUpdate);
    window.addEventListener("hashchange", requestActiveSectionUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(initialFrame);
      window.clearTimeout(initialTimer);
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
      window.removeEventListener("hashchange", requestActiveSectionUpdate);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [requestActiveSectionUpdate, sections, updateActiveSection]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    if (desktopQuery.matches) setMobileOpen(false);

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-sm border-b border-ink/12"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "hero")}
          aria-label="SL, home"
          className={`font-display text-lg tracking-wide uppercase transition-colors duration-200 ${
            activeId === "hero" ? "text-accent" : "text-ink"
          }`}
        >
          SL
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-sm" role="list">
          {sections
            .filter((s) => s.id !== "hero")
            .map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => scrollToSection(e, s.id)}
                  aria-current={activeId === s.id ? "true" : undefined}
                  className={`min-h-[44px] flex items-center transition-colors duration-200 ${
                    activeId === s.id
                      ? "text-accent font-medium"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`w-5 h-0.5 bg-ink transition-transform duration-200 ${
              mobileOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-ink transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-ink transition-transform duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-ink/12 bg-paper/95 backdrop-blur-sm"
          >
            <ul className="flex flex-col px-6 py-4 gap-2" role="list">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => scrollToSection(e, s.id)}
                    aria-current={activeId === s.id ? "true" : undefined}
                    className={`min-h-[44px] flex items-center text-sm transition-colors duration-200 ${
                      activeId === s.id
                        ? "text-accent font-medium"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
