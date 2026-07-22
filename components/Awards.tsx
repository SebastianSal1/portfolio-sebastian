"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MotionSection, { revealItem, revealSoft } from "./MotionSection";

// Light hierarchy polish — real awards only. No invent.

interface AwardItem {
  title: string;
  issuer: string;
  year: string;
  context: string;
  dominant?: boolean;
}

const ITEMS: AwardItem[] = [
  {
    title: "5× National-Level Competition Winner",
    issuer: "Finance, business case & industrial engineering competitions",
    year: "2022–2025",
    context: "First-place finishes across national competitions.",
    dominant: true,
  },
  {
    title: "3rd Most Outstanding Student",
    issuer: "Industrial Engineering, ITB",
    year: "2024",
    context: "Ranked on combined academic and organizational performance.",
  },
  {
    title: "Bakti BCA Scholarship Recipient",
    issuer: "Bank Central Asia",
    year: "2024",
    context: "Awarded scholarship supporting university studies.",
  },
  {
    title: "PAF Scholarship Recipient",
    issuer: "Putra Aqila Foundation",
    year: "2025",
    context: "Awarded scholarship supporting university studies.",
  },
];

export default function Awards() {
  const [lead, ...rest] = ITEMS;

  return (
    <MotionSection id="awards" className="section-shell">
      <motion.div variants={revealItem}>
        <SectionHeading eyebrow="07 · Recognition" title="Recognition" />
      </motion.div>

      <div className="mt-2 grid gap-4 md:grid-cols-12">
        <motion.article
          variants={revealItem}
          className="rounded-card border border-ink/12 bg-mist/40 p-6 shadow-rest md:col-span-5 md:p-8"
        >
          <p className="font-display text-5xl tabular-nums leading-none text-accent md:text-6xl">
            5×
          </p>
          <h3 className="mt-4 font-display text-lg uppercase tracking-wide text-ink md:text-xl">
            {lead.title}
          </h3>
          <p className="mt-2 text-sm text-tertiary">{lead.issuer}</p>
          <p className="mt-3 text-sm text-secondary">{lead.context}</p>
          <p className="caption mt-4 text-faint">{lead.year}</p>
        </motion.article>

        <ul className="flex flex-col gap-3 md:col-span-7" role="list">
          {rest.map((item) => (
            <motion.li
              key={item.title}
              variants={revealSoft}
              className="rounded-card border border-ink/10 px-5 py-4"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="font-medium text-ink">{item.title}</p>
                <span className="caption shrink-0 text-faint">{item.year}</span>
              </div>
              <p className="mt-1 text-sm text-tertiary">{item.issuer}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
