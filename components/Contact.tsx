"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import MotionSection, { revealItem } from "./MotionSection";

interface ContactProps {
  email: string;
  linkedin: string;
  cvUrl: string;
}

export default function Contact({
  email,
  linkedin,
  cvUrl,
}: ContactProps) {
  return (
    <MotionSection
      id="contact"
      className="surface-night-close relative isolate overflow-hidden px-6 pb-16 pt-[var(--section-y-lg)] md:pb-20"
      aria-labelledby="contact-heading"
    >
      <div className="surface-night-close-entry" aria-hidden="true" />
      <div className="surface-night-close-busy" aria-hidden="true" />
      <div className="surface-night-close-stars" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full border border-paper/[0.06] md:h-96 md:w-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 top-24 h-48 w-48 rounded-full border border-accent/15 md:h-64 md:w-64"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-40 w-40 rounded-full border border-orange/10"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.p variants={revealItem} className="caption mb-5 text-orange">
          09 · Contact
        </motion.p>

        <motion.h2
          variants={revealItem}
          id="contact-heading"
          className="max-w-4xl font-display text-paper text-balance"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Ready to turn ambiguous questions into decisions you can defend.
        </motion.h2>

        <motion.p
          variants={revealItem}
          className="mt-6 max-w-xl text-paper/70"
        >
          Open to roles where strategy, financial or operational analysis, and
          data-driven decisions matter — with execution depth when the work
          needs building.
        </motion.p>

        <motion.div
          variants={revealItem}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={`mailto:${email}`}
            primary
            className="!bg-paper !text-night hover:!bg-orange hover:!text-paper"
          >
            Email me
          </MagneticButton>
          <a
            href={cvUrl}
            className="inline-flex min-h-11 items-center rounded-pill border border-paper/25 px-5 py-2.5 text-sm text-paper/90 transition-colors hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            View CV
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-pill border border-paper/25 px-5 py-2.5 text-sm text-paper/90 transition-colors hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </motion.div>
      </div>
    </MotionSection>
  );
}
