"use client";

import SectionHeading from "./SectionHeading";
import MotionSection from "./MotionSection";

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
      <div className="mb-10">
        <SectionHeading eyebrow="07 · Recognition" title="Recognition" />
      </div>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-6xl tabular-nums leading-none text-accent">
            5×
          </p>
          <h3
            className="mt-4 font-display uppercase tracking-wide text-ink"
            style={{ fontSize: "var(--text-evidence-lead)" }}
          >
            {lead.title}
          </h3>
          <p
            className="mt-2 text-tertiary"
            style={{ fontSize: "var(--text-meta)" }}
          >
            {lead.issuer}
          </p>
          <p
            className="mt-3 text-secondary"
            style={{ fontSize: "var(--text-evidence-item)" }}
          >
            {lead.context}
          </p>
          <p
            className="mt-4 text-faint"
            style={{ fontSize: "var(--text-label)", letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            {lead.year}
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-ink/5 md:col-span-7" role="list">
          {rest.map((item) => (
            <li key={item.title} className="py-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p
                  className="font-medium text-ink"
                  style={{ fontSize: "var(--text-evidence-item)" }}
                >
                  {item.title}
                </p>
                <span
                  className="shrink-0 text-faint"
                  style={{ fontSize: "var(--text-label)", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  {item.year}
                </span>
              </div>
              <p
                className="mt-1 text-tertiary"
                style={{ fontSize: "var(--text-meta)" }}
              >
                {item.issuer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
