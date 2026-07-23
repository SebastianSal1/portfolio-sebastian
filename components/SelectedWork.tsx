"use client";

import SectionHeading from "./SectionHeading";
import MotionSection from "./MotionSection";
import EvidenceEditorial from "./EvidenceEditorial";
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
      <div className="mb-12">
        <SectionHeading
          eyebrow="03 · Selected Evidence"
          title="Evidence that holds up"
        />
        <p className="max-w-2xl text-secondary">
          Strongest proof first — strategy and analysis in markets and
          operations, with implementation depth where the work required building
          systems.
        </p>
      </div>

      <div className="mb-20 md:mb-28">
        <EvidenceEditorial cards={featured} />
      </div>

      <div className="border-t border-ink/10 pt-16">
        <DossierIndex
          eyebrow="04 · Field Work"
          title="Internships and applied roles"
          cards={internships}
          note="Full index — featured cases also appear above."
        />
      </div>

      <div className="mt-20 border-t border-ink/10 pt-16">
        <DossierIndex
          eyebrow="05 · Decision Archive"
          title="Competitions and case studies"
          cards={competitions}
          numbered
          note="Full index — featured cases also appear above."
        />
      </div>
    </MotionSection>
  );
}
