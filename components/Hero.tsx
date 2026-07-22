"use client";

import { motion } from "framer-motion";
import MagneticGrid from "./MagneticGrid";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  name: string;
  eyebrow: string;
  thesis: string;
  chips: string[];
  email: string;
  cvUrl: string;
  linkedin: string;
  /** Portrait path under /public. Defaults to placeholder. */
  portraitSrc?: string;
  portraitAlt?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero({
  name,
  eyebrow,
  thesis,
  chips,
  email,
  cvUrl,
  linkedin,
  portraitSrc = "/me/portrait-placeholder.svg",
  portraitAlt = "Sebastian Lumme",
}: HeroProps) {
  // Reduced motion: MotionConfig reducedMotion="user" in layout — no useReducedMotion branch (hydration).

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden px-6 py-14 md:py-16"
    >
      <MagneticGrid />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Copy — left */}
        <div className="min-w-0 lg:col-span-7">
          <motion.p
            className="caption mb-4 text-accent"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
            Industrial Engineer
          </motion.p>

          <motion.p
            className="mb-5 max-w-xl text-sm text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            className="font-display uppercase tracking-tight text-balance text-ink"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
              lineHeight: "var(--leading-display)",
            }}
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl font-body text-base text-secondary md:text-lg"
            {...fadeUp}
            transition={{ delay: 0.18 }}
          >
            {thesis}
          </motion.p>

          {chips.length > 0 && (
            <motion.ul
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              {chips.slice(0, 2).map((c) => (
                <li
                  key={c}
                  className="inline-flex min-h-9 items-center rounded-pill border border-ink/12 bg-paper/80 px-3 py-1.5 text-xs tabular-nums text-tertiary"
                >
                  {c}
                </li>
              ))}
            </motion.ul>
          )}

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            {...fadeUp}
            transition={{ delay: 0.35 }}
          >
            <MagneticButton href="#work" primary>
              View evidence
            </MagneticButton>
            <MagneticButton href={`mailto:${email}`}>Email me</MagneticButton>
            <a
              href={cvUrl}
              className="inline-flex min-h-11 items-center px-2 text-sm text-tertiary underline-offset-4 transition-colors hover:text-orange hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              CV
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-2 text-sm text-tertiary underline-offset-4 transition-colors hover:text-orange hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </motion.div>
        </div>

        {/* Portrait media plate — right (option B) */}
        <motion.div
          className="min-w-0 lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <figure className="relative mx-auto w-full max-w-sm lg:ml-auto lg:max-w-none">
            <div className="media-frame relative aspect-[4/5] overflow-hidden rounded-card border border-ink/12 bg-ink/[0.04] shadow-rest">
              {/* eslint-disable-next-line @next/next/no-img-element -- local /public portrait */}
              <img
                src={portraitSrc}
                alt={portraitAlt}
                width={1200}
                height={1800}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
