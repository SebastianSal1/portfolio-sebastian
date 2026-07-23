"use client";

import MotionSection from "./MotionSection";

// Operating Thesis — editorial pull quote + two unequal truthful signals.
// Not 4 equal metric tiles. Backend modules stay out of About hero signals.

const SIGNALS = [
  {
    value: "100+",
    label: "equity research reports",
    note: "Daily market synthesis across IDX coverage",
  },
  {
    value: "~32%",
    label: "utilization opportunity identified",
    note: "DES on plant process — opportunity, not audited realized savings",
  },
] as const;

export default function AboutSnapshot() {
  return (
    <MotionSection
      id="about"
      className="section-shell"
      aria-labelledby="about-heading"
    >
      <p className="caption mb-4 text-accent">
        02 · Operating Thesis
      </p>

      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-10 lg:gap-12">
        <div className="md:col-span-7">
          <h2
            id="about-heading"
            className="font-display text-ink text-balance"
            style={{ fontSize: "var(--text-h2)" }}
          >
            I work where ambiguous business questions need to become structured,
            defensible decisions.
          </h2>
          <p className="mt-6 max-w-xl text-secondary">
            Structure first: map constraints, quantify options, then decide — in
            markets, plants, and product delivery. Primary evidence sits in
            equity research, industrial operations, and structured case work.
            When the problem needs software, I ship backend features as
            execution depth — not as a pure engineering identity.
          </p>
          <p className="mt-6 text-sm tracking-wide text-tertiary">
            Strategy · Finance · Operations · Technical execution
          </p>
        </div>

        <ul
          className="flex flex-col gap-8 md:col-span-5 md:pt-2"
          role="list"
        >
          {SIGNALS.map((s, i) => (
            <li
              key={s.label}
              className={`border-l-2 pl-5 ${
                i === 0 ? "border-accent" : "border-ink/15"
              }`}
            >
              <p
                className={`font-display leading-none tabular-nums text-ink ${
                  i === 0 ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"
                }`}
              >
                {s.value}
              </p>
              <p className="mt-2 font-medium text-secondary">{s.label}</p>
              <p className="mt-1 text-sm text-tertiary">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </MotionSection>
  );
}
