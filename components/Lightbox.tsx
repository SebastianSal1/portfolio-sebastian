"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { WorkCardData } from "@/lib/types";
import { getPlaceholderUrl, textCoverLabel } from "@/lib/media";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type SlideDirection = 1 | -1;

interface LightboxProps {
  card: WorkCardData;
  onClose: () => void;
}

export default function Lightbox({ card, onClose }: LightboxProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [isChangingSlide, setIsChangingSlide] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isChangingSlideRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const screenshots = card.screenshots ?? [];
  const total = screenshots.length;
  const hasSlides = total > 0;
  const hasMultipleSlides = total > 1;
  const emptyLabel = textCoverLabel(card.slug, card.domain);

  const slideAlt = (i: number) =>
    screenshots[i]?.alt ||
    (hasSlides
      ? `${card.title} screenshot ${i + 1}`
      : `${card.title} — ${emptyLabel}`);

  const getFocusableElements = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return [];

    return Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter(
      (element) =>
        !element.hasAttribute("disabled") &&
        element.getAttribute("aria-hidden") !== "true"
    );
  }, []);

  const resetSlideTransition = useCallback(() => {
    isChangingSlideRef.current = false;
    setIsChangingSlide(false);
  }, []);

  const changeSlide = useCallback(
    (nextSlide: number, nextDirection: SlideDirection) => {
      if (
        !hasMultipleSlides ||
        nextSlide === currentSlide ||
        isChangingSlideRef.current
      ) {
        return;
      }

      if (!shouldReduceMotion) {
        isChangingSlideRef.current = true;
        setIsChangingSlide(true);
      }

      setDirection(nextDirection);
      setCurrentSlide(nextSlide);
    },
    [currentSlide, hasMultipleSlides, shouldReduceMotion]
  );

  const goNext = useCallback(() => {
    if (!hasMultipleSlides) return;
    const nextSlide = currentSlide === total - 1 ? 0 : currentSlide + 1;
    changeSlide(nextSlide, 1);
  }, [changeSlide, currentSlide, hasMultipleSlides, total]);

  const goPrev = useCallback(() => {
    if (!hasMultipleSlides) return;
    const nextSlide = currentSlide === 0 ? total - 1 : currentSlide - 1;
    changeSlide(nextSlide, -1);
  }, [changeSlide, currentSlide, hasMultipleSlides, total]);

  useEffect(() => {
    setCurrentSlide(0);
    setDirection(1);
    resetSlideTransition();
  }, [card.slug, resetSlideTransition]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      const focusable = getFocusableElements();

      if (!dialog || focusable.length === 0) {
        e.preventDefault();
        dialog?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (!dialog.contains(activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        handleTab(e);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [getFocusableElements, goNext, goPrev, onClose]);

  const imgSrc =
    screenshots[currentSlide]?.src ||
    getPlaceholderUrl(1200, 800, emptyLabel);
  const placeholderSrc = getPlaceholderUrl(1200, 800, emptyLabel);
  const overlayTransition = { duration: shouldReduceMotion ? 0 : 0.2 };
  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };
  const navButtonClass = `absolute top-1/2 -translate-y-1/2 z-10 text-white text-4xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-opacity ${
    hasMultipleSlides
      ? "hover:opacity-70"
      : "opacity-20 pointer-events-none"
  }`;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${card.title} gallery`}
      tabIndex={-1}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={overlayTransition}
      className="fixed inset-0 z-[100] modal-overlay flex flex-col items-center justify-center overflow-y-auto py-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center text-3xl text-white transition-opacity hover:opacity-70"
        style={{
          top: "max(1rem, env(safe-area-inset-top))",
          right: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        &times;
      </button>

      <div className="relative mx-auto flex w-full max-w-[90vw] items-center justify-center">
        <button
          type="button"
          aria-label="Previous image"
          aria-hidden={!hasMultipleSlides}
          disabled={!hasMultipleSlides || isChangingSlide}
          onClick={goPrev}
          className={`${navButtonClass} left-2 md:left-0`}
        >
          &#8249;
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={`${card.slug}-${currentSlide}`}
            src={imgSrc}
            alt={slideAlt(currentSlide)}
            custom={direction}
            initial={
              shouldReduceMotion
                ? false
                : { x: direction * 80, opacity: 0 }
            }
            animate={{ x: 0, opacity: 1 }}
            exit={
              shouldReduceMotion
                ? { x: 0, opacity: 1 }
                : { x: direction * -80, opacity: 0 }
            }
            transition={slideTransition}
            className="max-h-[60vh] md:max-h-[70vh] max-w-full object-contain"
            onAnimationComplete={resetSlideTransition}
            onError={(e) => {
              e.currentTarget.src = placeholderSrc;
            }}
          />
        </AnimatePresence>

        <button
          type="button"
          aria-label="Next image"
          aria-hidden={!hasMultipleSlides}
          disabled={!hasMultipleSlides || isChangingSlide}
          onClick={goNext}
          className={`${navButtonClass} right-2 md:right-0`}
        >
          &#8250;
        </button>
      </div>

      <p className="mt-4 max-w-prose px-4 text-center text-xs text-white/70 md:text-sm">
        {card.caption}
      </p>
      {hasMultipleSlides && (
        <p className="sr-only" aria-live="polite">
          Image {currentSlide + 1} of {total}
        </p>
      )}

      {card.body && (
        <div className="mt-4 w-full max-w-2xl px-4">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mx-auto flex min-h-11 items-center gap-2 rounded-pill border border-white/30 px-5 text-sm text-white transition-colors hover:border-orange hover:text-orange"
          >
            {expanded ? "Show less" : "Read more"}
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 22 }
                }
                className="overflow-hidden"
              >
                <div className="work-prose mt-3 max-h-[38vh] overflow-y-auto rounded-panel bg-paper p-6 text-left text-ink">
                  {card.body}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {hasMultipleSlides && (
        <div
          className="mt-4 flex gap-1"
          role="group"
          aria-label="Gallery pages"
        >
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1} of ${total}`}
              aria-current={i === currentSlide ? "true" : undefined}
              disabled={i === currentSlide || isChangingSlide}
              onClick={() => {
                changeSlide(i, i > currentSlide ? 1 : -1);
              }}
              className="flex min-h-11 min-w-11 items-center justify-center"
            >
              <span
                className={`block h-3 w-3 rounded-full transition-colors ${
                  i === currentSlide
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
