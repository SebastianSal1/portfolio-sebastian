"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { useIsMounted } from "@/lib/useIsMounted";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  const mounted = useIsMounted();
  const reducedMotion = usePrefersReducedMotion();

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-preview-title"
        >
          {/* Backdrop Scrim */}
          <motion.div
            key="cv-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Centered Modal Window */}
          <motion.div
            key="cv-modal-window"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative z-10 w-full max-w-5xl h-[88vh] max-h-[920px] bg-[#FBFBF9] border border-[#DDD7CB] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#DDD7CB] bg-white/90 backdrop-blur-xs shrink-0 select-none">
              {/* Left: Document Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3
                    id="cv-preview-title"
                    className="text-base sm:text-lg font-bold font-sans text-[#1A1917] tracking-tight truncate leading-tight"
                  >
                    Curriculum Vitae
                  </h3>
                  <p className="text-xs text-[#5E5B55] font-medium truncate mt-0.5">
                    Sebastian Salutare · Industrial Engineering, ITB
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Download CV Action */}
                <a
                  href="/cv.pdf"
                  download="Sebastian_Salutare_CV.pdf"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs sm:text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-all shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
                  title="Download PDF to your device"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden sm:inline">Download CV</span>
                  <span className="sm:hidden">Download</span>
                </a>

                {/* Open in New Tab Action */}
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#DDD7CB] bg-white text-[#1A1917] hover:bg-[#F5F3EE] hover:border-[#C8C0B2] transition-colors cursor-pointer"
                  title="Open PDF in new browser tab"
                  aria-label="Open PDF in new browser tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#DDD7CB] bg-white text-[#1A1917] hover:bg-neutral-100 hover:text-[var(--color-primary)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] ml-1"
                  aria-label="Close CV preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded Native PDF Viewer */}
            <div className="relative flex-1 w-full h-full bg-[#525659] overflow-hidden">
              <object
                data="/cv.pdf#toolbar=1&navpanes=0&view=FitH"
                type="application/pdf"
                className="w-full h-full border-0"
              >
                <iframe
                  src="/cv.pdf#toolbar=1&navpanes=0&view=FitH"
                  title="Sebastian Salutare Curriculum Vitae"
                  className="w-full h-full border-0"
                />
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
