"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import type { WorkCardData } from "@/lib/types";
import Lightbox from "./Lightbox";

interface LightboxContextValue {
  openCard: (slug: string, opener?: HTMLElement) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx)
    throw new Error("useLightbox must be used inside LightboxProvider");
  return ctx;
}

export default function LightboxProvider({
  cards,
  children,
}: {
  cards: WorkCardData[];
  children: React.ReactNode;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const previousOverflowRef = useRef<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const inertTargetsRef = useRef<HTMLElement[]>([]);
  const restoreTimerRef = useRef<number | null>(null);

  const selectedCard = selectedSlug
    ? cards.find((c) => c.slug === selectedSlug) ?? null
    : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const openCard = useCallback((slug: string, opener?: HTMLElement) => {
    const activeElement = document.activeElement;
    openerRef.current =
      opener ?? (activeElement instanceof HTMLElement ? activeElement : null);
    setSelectedSlug(slug);
  }, []);

  const restoreFocus = useCallback(() => {
    if (restoreTimerRef.current !== null) {
      window.clearTimeout(restoreTimerRef.current);
      restoreTimerRef.current = null;
    }
    const opener = openerRef.current;
    if (opener?.isConnected) {
      opener.focus();
    }
    openerRef.current = null;
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedSlug(null);
    if (restoreTimerRef.current !== null) {
      window.clearTimeout(restoreTimerRef.current);
    }
    restoreTimerRef.current = window.setTimeout(() => {
      restoreFocus();
    }, 400);
  }, [restoreFocus]);

  useEffect(() => {
    if (!selectedSlug) {
      return;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Lightbox portals to body — safe to inert page chrome under it
    const targets = [
      document.querySelector("nav"),
      document.getElementById("main-content"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);

    inertTargetsRef.current = targets;
    for (const el of targets) {
      el.setAttribute("aria-hidden", "true");
      el.setAttribute("inert", "");
    }

    return () => {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
      for (const el of inertTargetsRef.current) {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("inert");
      }
      inertTargetsRef.current = [];
    };
  }, [selectedSlug]);

  useEffect(() => {
    return () => {
      if (restoreTimerRef.current !== null) {
        window.clearTimeout(restoreTimerRef.current);
      }
    };
  }, []);

  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence mode="wait" onExitComplete={restoreFocus}>
        {selectedCard && (
          <Lightbox
            key={selectedCard.slug}
            card={selectedCard}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <LightboxContext.Provider value={{ openCard, closeLightbox }}>
      {children}
      {overlay}
    </LightboxContext.Provider>
  );
}
