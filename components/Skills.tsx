"use client";

import SectionHeading from "./SectionHeading";
import MotionSection from "./MotionSection";

interface Skill {
  label: string;
  descriptor?: string;
  application?: string;
}

const CATEGORIES: { name: string; skills: Skill[] }[] = [
  {
    name: "Think",
    skills: [
      { label: "Problem structuring", descriptor: "constraints, options, decisions", application: "APRIL Group — DES optimization" },
      { label: "Operations Research", descriptor: "optimization, system modelling", application: "IECOM 2026 — 2nd place" },
      { label: "Process Simulation", descriptor: "discrete-event, utilization", application: "APRIL Group — ~32% utilization" },
    ],
  },
  {
    name: "Analyze",
    skills: [
      { label: "Financial Modeling", descriptor: "forecasts, valuation", application: "Henan Putihrai — equity research" },
      { label: "Equity Research", descriptor: "company & industry analysis", application: "100+ daily market reports" },
      { label: "Cost Analysis", descriptor: "ops and commercial trade-offs", application: "TDC Business Case — Top 40" },
    ],
  },
  {
    name: "Build",
    skills: [
      { label: "Python", descriptor: "data modeling, simulation", application: "APRIL Group — DES model" },
      { label: "SQL", descriptor: "data querying", application: "Henan Putihrai — data analysis" },
      { label: "Backend delivery", descriptor: "transaction modules, feature shipping", application: "Ikonsultan — 4 core modules" },
    ],
  },
  {
    name: "Communicate",
    skills: [
      { label: "Excel (Advanced)", descriptor: "financial modeling", application: "Henan Putihrai — valuation models" },
      { label: "Tableau / Power BI", descriptor: "dashboards & reporting", application: "Henan Putihrai — market dashboards" },
      { label: "LaTeX", descriptor: "technical documents", application: "Thesis — optimization framework" },
    ],
  },
];

export default function Skills() {
  return (
    <MotionSection id="skills" className="section-shell">
      <div className="mb-10">
        <SectionHeading eyebrow="08 · Methods" title="How the work gets done" />
      </div>

      <div className="grid gap-px bg-ink/5 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="bg-paper p-6">
            <h3
              className="mb-5 text-accent"
              style={{ fontSize: "var(--text-label)", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              {cat.name}
            </h3>
            <ul className="space-y-4" role="list">
              {cat.skills.map((s) => (
                <li key={s.label}>
                  <span
                    className="font-body text-secondary"
                    style={{ fontSize: "var(--text-evidence-item)" }}
                  >
                    {s.label}
                  </span>
                  {s.descriptor && (
                    <span
                      className="mt-0.5 block text-tertiary"
                      style={{ fontSize: "var(--text-meta)" }}
                    >
                      {s.descriptor}
                    </span>
                  )}
                  {s.application && (
                    <span
                      className="mt-1 block text-accent/70"
                      style={{ fontSize: "var(--text-label)", letterSpacing: "0.04em" }}
                    >
                      {s.application}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
