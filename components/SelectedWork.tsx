"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MotionSection, { revealItem } from "./MotionSection";
import EvidenceBento from "./EvidenceBento";
import DossierIndex from "./DossierIndex";
import type { WorkCardData, WorkCategory } from "@/lib/types";

interface SelectedWorkProps {
  featured: WorkCardData[];
  byCategory: Partial<Record<WorkCategory, WorkCardData[]>>;
}

export default function SelectedWork({
  featured,
  byCategory,
}: SelectedWorkProps) {
  const internships = byCategory.internship ?? [];
  const competitions = byCategory.competition ?? [];

  return (
    <MotionSection id="work" className="section-shell section-shell-lg">
      <motion.div variants={revealItem}>
        <SectionHeading
          eyebrow="03 · Selected Evidence"
          title="Evidence that holds up"
        />
        <p className="mb-10 max-w-2xl text-tertiary">
          Strongest proof first — strategy and analysis in markets and
          operations, with implementation depth where the work required building
          systems.
        </p>
      </motion.div>

      <motion.div variants={revealItem} className="mb-16 md:mb-24">
        <EvidenceBento cards={featured} />
      </motion.div>

      <motion.div variants={revealItem}>
        <DossierIndex
          eyebrow="04 · Field Work"
          title="Internships and applied roles"
          cards={internships}
          note="Full index — featured cases also appear above."
        />
      </motion.div>

      <motion.div variants={revealItem}>
        <DossierIndex
          eyebrow="05 · Decision Archive"
          title="Competitions and case studies"
          cards={competitions}
          numbered
          note="Full index — featured cases also appear above."
        />
      </motion.div>
    </MotionSection>
  );
}
