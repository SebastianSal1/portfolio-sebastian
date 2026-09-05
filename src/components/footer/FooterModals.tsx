"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ShieldCheck, BookOpen } from "lucide-react";
import { useIsMounted } from "@/lib/useIsMounted";
import { useFocusTrap } from "@/lib/useFocusTrap";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function BaseFooterModal({ isOpen, onClose, title, icon, children }: ModalProps) {
  const mounted = useIsMounted();
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const containerRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
    initialFocusRef: titleRef,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-modal-open="true"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-xl rounded-2xl bg-[#1A1917] border border-white/15 text-[#F5F3EE] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              {icon}
            </span>
            <h3
              ref={titleRef}
              id="modal-title"
              tabIndex={-1}
              className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight focus-visible:outline-none"
            >
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C887B] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#DDD7CB] leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          {children}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function PrivacyNoticeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <BaseFooterModal
      isOpen={isOpen}
      onClose={onClose}
      title="Privacy & Data Notice"
      icon={<ShieldCheck className="w-5 h-5" />}
    >
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-white text-sm">1. Zero Telemetry & Tracking</h4>
        <p>
          This personal portfolio does not deploy third-party tracking scripts, analytics cookies, advertising beacons, or behavioral profiling tools. Your browsing session remains private and unmonitored.
        </p>

        <h4 className="font-semibold text-white text-sm mt-2">2. Direct Communication</h4>
        <p>
          Any communications initiated via direct email (<code className="text-[var(--color-primary)] bg-white/5 px-1 py-0.5 rounded">contact@sebastiansalutare.com</code>) are used solely for professional dialogue, prospective consulting, or recruitment inquiries. Your email address is never shared, sold, or added to automated mailing lists.
        </p>

        <h4 className="font-semibold text-white text-sm mt-2">3. Hosting & Transit Security</h4>
        <p>
          All pages and visual assets are statically generated and delivered over encrypted HTTPS connections adhering to modern SSL/TLS transport security standards.
        </p>

        <h4 className="font-semibold text-white text-sm mt-2">4. User Preferences</h4>
        <p>
          The interface strictly honors native browser preferences, including the <code className="text-white/80 bg-white/5 px-1 py-0.5 rounded">prefers-reduced-motion</code> standard, avoiding unnecessary GPU usage or animation for sensitive users.
        </p>
      </div>
    </BaseFooterModal>
  );
}

export function ColophonModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <BaseFooterModal
      isOpen={isOpen}
      onClose={onClose}
      title="Colophon: Craft & Specifications"
      icon={<BookOpen className="w-5 h-5" />}
    >
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-white text-sm">1. Typographic System</h4>
        <p>
          Editorial display headlines are set in <span className="italic font-serif text-white">Instrument Serif</span> (designed by Jordan Bell and Rodrigo Fuenzalida). Interface metadata and technical body copy are set in <span className="font-medium text-white">Inter</span> (designed by Rasmus Andersson).
        </p>

        <h4 className="font-semibold text-white text-sm mt-2">2. Color Architecture</h4>
        <p>
          The color hierarchy operates as an uncoated paper canvas in Warm Bone (<code className="text-[#F5F3EE] bg-white/5 px-1 py-0.5 rounded">#F5F3EE</code>), high-density text in Warm Ink (<code className="text-white bg-white/5 px-1 py-0.5 rounded">#1A1917</code>), active navigational pigment in Monotonic Cobalt (<code className="text-[var(--color-primary)] bg-white/5 px-1 py-0.5 rounded">#3157C8</code>), and scarce thermal tension in Vermilion (<code className="text-[var(--color-accent)] bg-white/5 px-1 py-0.5 rounded">#F0522D</code>).
        </p>

        <h4 className="font-semibold text-white text-sm mt-2">3. Software & Simulation Engineering</h4>
        <p>
          Built on Next.js 16 (App Router), Tailwind CSS v4, and TypeScript. Fluid dynamics in the Hero operate via a custom WebGL 1.0 fractional Brownian motion fragment shader. The closing background utilizes deterministic curl-noise vector streamlines.
        </p>

        <h4 className="font-semibold text-white text-sm mt-2">4. Geographical & Academic Anchor</h4>
        <p>
          Designed, formulated, and modeled between Bandung & Jakarta, Indonesia (<code className="text-white/80 bg-white/5 px-1 py-0.5 rounded">UTC+7</code>) at the Department of Industrial Engineering, Institut Teknologi Bandung.
        </p>
      </div>
    </BaseFooterModal>
  );
}
