"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface CareerItem {
  year: string;
  period: string;
  title: string;
  organization: string;
  type: "work" | "education" | "leadership";
  summary: string;
  highlights: string[];
}

const TYPE_LABEL: Record<CareerItem["type"], string> = {
  work: "Work",
  education: "Education",
  leadership: "Leadership",
};

// Real CV data only — no reframing, no invented metrics.
const ITEMS: CareerItem[] = [
  {
    year: "2026",
    period: "Jan – Jun 2026",
    title: "Equity Research Intern",
    organization: "Henan Putihrai Sekuritas",
    type: "work",
    summary:
      "Supported the research division producing equity research and daily reports across Indonesian capital markets.",
    highlights: [
      "Company and industry research across 15+ IDX-listed companies in 5 sectors — financial models, forecasts, and valuation.",
      "Produced 100+ daily market reports synthesizing macro, sector, and company-specific developments.",
    ],
  },
  {
    year: "2025",
    period: "Jun – Sep 2025",
    title: "Project Engineer Intern",
    organization: "APRIL Group",
    type: "work",
    summary:
      "Process optimization and environmental compliance in the pulping process.",
    highlights: [
      "Discrete-event simulation identifying ~32% machine utilization opportunity; estimated efficiency value exceeding $100K/month (internal estimate).",
      "Ran a Kaizen daily target-and-review cadence associated with ~10% production efficiency gain over 3 months.",
    ],
  },
  {
    year: "2025",
    period: "Jun 2024 – Aug 2025",
    title: "Vice Leader, Training & Development",
    organization: "ShARE ITB",
    type: "leadership",
    summary:
      "Led consulting skill-building and training programs for a student consulting organization.",
    highlights: [
      "Designed and led 10+ consulting sessions (market sizing, venture capital, strategy) — 4.88/5 across 30+ members.",
      "Launched Masterclass programs contributing ~30% of the annual budget and drawing 50+ external participants.",
    ],
  },
  {
    year: "2024",
    period: "Aug – Sep 2024",
    title: "Backend Developer Intern",
    organization: "Ikonsultan Inovatama",
    type: "work",
    summary:
      "Built financial transaction features for a web application helping MSMEs access financial services.",
    highlights: [
      "Developed 4 core transaction modules (withdrawal, transfer, deposit, payment) plus dynamic bank statements.",
      "Shipped 10+ feature updates in 4 weeks with a cross-functional team using Git and Notion.",
    ],
  },
  {
    year: "2022",
    period: "2022 – Present",
    title: "BEng Industrial Engineering",
    organization: "Institut Teknologi Bandung",
    type: "education",
    summary:
      "Industrial engineering with a focus on cost analysis, operations research, and data analytics.",
    highlights: [
      "CGPA 3.83 / 4.0. Coursework: Cost Analysis, Data Analytics, Operations Research, System Modelling.",
      "3rd Most Outstanding Student, IE ITB; 5× national competition winner.",
    ],
  },
];

export default function CareerTimeline() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  // Branching a transition VALUE on reduced motion is safe (it is behavior, not
  // rendered markup, so it cannot cause a hydration mismatch).
  const reveal = reduce
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 120, damping: 22 } as const);

  function toggleEntry(i: number) {
    setOpenIndex((current) => (i === current ? -1 : i));
  }

  return (
    <section
      id="experience"
      aria-labelledby="timeline-heading"
      className="section-shell"
    >
      <div className="mb-12">
        <p className="caption mb-3 text-accent">06 · Trajectory</p>
        <h2
          id="timeline-heading"
          className="font-display text-ink text-balance"
          style={{ fontSize: "var(--text-section-title)", lineHeight: "var(--leading-display)" }}
        >
          Experience
        </h2>
        <p
          className="mt-3 max-w-2xl text-secondary"
          style={{ fontSize: "var(--text-section-subtitle)" }}
        >
          Chronology and context — proof metrics live under each role when
          expanded.
        </p>
      </div>

      <ol className="relative ml-2 border-l-2 border-accent/25 sm:ml-3">
        {ITEMS.map((item, i) => {
          const isOpen = i === openIndex;
          const panelId = `career-panel-${i}`;

          return (
            <li
              key={`${item.title}-${item.year}`}
              className="relative pb-8 pl-6 last:pb-0 sm:pl-8"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[6.5px] top-2 h-3 w-3 rounded-full border-2 border-accent transition-colors ${
                  isOpen ? "bg-accent" : "bg-paper"
                }`}
              />

              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleEntry(i)}
                className="group block w-full min-h-11 text-left"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <time
                    dateTime={item.year}
                    className="font-display text-2xl tabular-nums text-ink md:text-3xl"
                  >
                    {item.year}
                  </time>
                  <span className="font-body font-medium text-ink">
                    {item.title}
                  </span>
                  <span className="text-tertiary">· {item.organization}</span>
                </span>
                <span
                  className="mt-1 block text-tertiary"
                  style={{ fontSize: "var(--text-meta)", letterSpacing: "0.04em" }}
                >
                  {item.period} · {TYPE_LABEL[item.type]}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    key="summary"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reveal}
                    className="overflow-hidden"
                  >
                    <p className="prose-body mt-3 max-w-2xl text-secondary">
                      {item.summary}
                    </p>

                    {item.highlights.length > 0 && (
                      <ul className="mt-3 list-disc pl-5 text-secondary">
                        {item.highlights.map((h, hi) => (
                          <li key={hi} className="prose-body mt-1">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
