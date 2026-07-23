"use client";

import { useLightbox } from "./LightboxProvider";
import { CATEGORY_LABEL, type WorkCardData } from "@/lib/types";

interface DossierIndexProps {
  eyebrow: string;
  title: string;
  cards: WorkCardData[];
  numbered?: boolean;
  note?: string;
}

export default function DossierIndex({
  eyebrow,
  title,
  cards,
  numbered = false,
  note,
}: DossierIndexProps) {
  const { openCard } = useLightbox();

  if (!cards.length) return null;

  const sorted = [...cards].sort(
    (a, b) => a.categoryOrder - b.categoryOrder || a.title.localeCompare(b.title)
  );

  return (
    <div>
      <div className="mb-8">
        <p className="caption mb-3 text-accent">{eyebrow}</p>
        <h3
          className="font-display text-ink"
          style={{ fontSize: "var(--text-section-title)", lineHeight: "var(--leading-display)" }}
        >
          {title}
        </h3>
        {note && (
          <p
            className="mt-3 text-secondary"
            style={{ fontSize: "var(--text-section-subtitle)" }}
          >
            {note}
          </p>
        )}
      </div>

      <ul role="list" className="divide-y divide-ink/5">
        {sorted.map((card, i) => {
          const badge = CATEGORY_LABEL[card.category] ?? card.domain;
          const num = String(i + 1).padStart(2, "0");

          return (
            <li key={card.slug}>
              <button
                type="button"
                onClick={(e) => openCard(card.slug, e.currentTarget)}
                className="group flex w-full items-baseline gap-6 py-5 text-left transition-colors hover:bg-ink/[0.02] focus-visible:bg-ink/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                {numbered ? (
                  <span
                    className="w-10 shrink-0 font-display text-2xl tabular-nums leading-none text-tertiary"
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                ) : (
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      className="font-display uppercase tracking-wide text-ink transition-colors group-hover:text-accent group-focus-visible:text-accent"
                      style={{ fontSize: "var(--text-evidence-item)" }}
                    >
                      {card.title}
                    </span>
                    <span
                      className="text-label text-faint"
                    >
                      {badge}
                      {card.featured ? " · Featured" : ""}
                    </span>
                  </span>
                  <span
                    className="mt-1 block text-tertiary line-clamp-1"
                    style={{ fontSize: "var(--text-meta)" }}
                  >
                    {card.outcome}
                  </span>
                </span>

                <span
                  className="shrink-0 text-faint transition-colors group-hover:text-orange group-focus-visible:text-orange"
                  style={{ fontSize: "var(--text-meta)" }}
                >
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
