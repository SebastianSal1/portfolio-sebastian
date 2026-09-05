"use client";

import { useEffect, useRef } from "react";

export interface UseFocusTrapOptions {
  isOpen: boolean;
  onClose: () => void;
  /** Optional custom element to receive initial focus (e.g. heading with tabIndex={-1}) */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Optional trigger element to return focus to when closed */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

const TABBABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>({
  isOpen,
  onClose,
  initialFocusRef,
  returnFocusRef,
}: UseFocusTrapOptions) {
  const containerRef = useRef<T | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Capture currently active element if returnFocusRef is not provided
    if (returnFocusRef?.current) {
      triggerElementRef.current = returnFocusRef.current;
    } else if (document.activeElement instanceof HTMLElement) {
      triggerElementRef.current = document.activeElement;
    }

    // Set inert on <main> background subtree to ensure background cannot be focused
    const mainEl = document.querySelector("main");
    if (mainEl && !mainEl.contains(containerRef.current)) {
      mainEl.setAttribute("inert", "");
    }

    // Direct initial focus to initialFocusRef or first tabbable element inside dialog
    const focusTimer = requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (containerRef.current) {
        const firstTabbable = containerRef.current.querySelector<HTMLElement>(TABBABLE_SELECTOR);
        if (firstTabbable) {
          firstTabbable.focus();
        } else {
          containerRef.current.focus();
        }
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !containerRef.current) return;

      const tabbables = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0);

      if (tabbables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === containerRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);

      // Remove inert from background
      if (mainEl) {
        mainEl.removeAttribute("inert");
      }

      // Restore focus to invoking control
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef, returnFocusRef]);

  return containerRef;
}
