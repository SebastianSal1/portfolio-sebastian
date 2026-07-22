"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MotionSection, { revealItem, revealSoft } from "./MotionSection";

// Methods Matrix — Think · Analyze · Build · Communicate.
// Real CV skills only. Build holds technical execution (not About hero).

interface Skill {
  label: string;
  descriptor?: string;
}

const CATEGORIES: { name: string; skills: Skill[] }[] = [
  {
    name: "Think",
    skills: [
      { label: "Problem structuring", descriptor: "constraints, options, decisions" },
      { label: "Operations Research", descriptor: "optimization, system modelling" },
      { label: "Process Simulation", descriptor: "discrete-event, utilization" },
    ],
  },
  {
    name: "Analyze",
    skills: [
      { label: "Financial Modeling", descriptor: "forecasts, valuation" },
      { label: "Equity Research", descriptor: "company & industry analysis" },
      { label: "Cost Analysis", descriptor: "ops and commercial trade-offs" },
    ],
  },
  {
    name: "Build",
    skills: [
      { label: "Python", descriptor: "data modeling, simulation" },
      { label: "SQL", descriptor: "data querying" },
      { label: "Backend delivery", descriptor: "transaction modules, feature shipping" },
    ],
  },
  {
    name: "Communicate",
    skills: [
      { label: "Excel (Advanced)", descriptor: "financial modeling" },
      { label: "Tableau / Power BI", descriptor: "dashboards & reporting" },
      { label: "LaTeX", descriptor: "technical documents" },
    ],
  },
];

export default function Skills() {
  return (
    <MotionSection id="skills" className="section-shell">
      <motion.div variants={revealItem}>
        <SectionHeading eyebrow="08 · Methods" title="How the work gets done" />
      </motion.div>

      <div className="mt-2 grid gap-px overflow-hidden rounded-panel border border-ink/12 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.name}
            variants={revealSoft}
            className="surface-base p-6"
          >
            <h3 className="caption mb-5 text-accent">{cat.name}</h3>
            <ul className="space-y-4" role="list">
              {cat.skills.map((s) => (
                <li key={s.label}>
                  <span className="font-body text-secondary">{s.label}</span>
                  {s.descriptor && (
                    <span className="mt-0.5 block text-sm text-tertiary">
                      {s.descriptor}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}
