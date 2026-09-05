"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";

export function SubpageFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 mt-20 sm:mt-28 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C887B] select-none">
      <span>© 2026 Sebastian Salutare</span>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#5E5B55] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] rounded-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to home</span>
        </Link>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 text-xs text-[#5E5B55] hover:text-[var(--color-primary)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] rounded-xs"
          aria-label="Scroll back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
