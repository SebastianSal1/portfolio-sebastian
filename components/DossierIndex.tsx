"use client";

import { motion } from "framer-motion";
import { useLightbox } from "./LightboxProvider";
import { CATEGORY_LABEL, type WorkCardData } from "@/lib/types";

interface DossierIndexProps {
  eyebrow: string;
  title: string;
  cards: WorkCardData[];
  /** Graphic archive numbers for Decision Archive */
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
    <div className="mb-16 last:mb-0">
      <div className="mb-6 border-b border-ink/10 pb-4">
        <p className="caption mb-2 text-accent">{eyebrow}</p>
        <h3
          className="font-display text-ink"
          style={{ fontSize: "var(--text-h3)" }}
        >
          {title}
        </h3>
        {note && <p className="mt-2 text-sm text-tertiary">{note}</p>}
      </div>

      <ul role="list" className="divide-y divide-ink/10">
        {sorted.map((card, i) => {
          const badge = CATEGORY_LABEL[card.category] ?? card.domain;
          const num = String(i + 1).padStart(2, "0");

          return (
            <motion.li
              key={card.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.35,
                delay: 0.05 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.button
                type="button"
                onClick={(e) => openCard(card.slug, e.currentTarget)}
                className="group flex w-full min-h-14 items-start gap-3 rounded-card px-3 py-5 text-left transition-colors hover:bg-ink/[0.035] focus-visible:bg-ink/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:gap-4 sm:px-4 md:items-center md:gap-6"
                whileTap={{ scale: 0.995 }}
              >
                {numbered ? (
                  <span
                    className="w-8 shrink-0 font-display text-xl tabular-nums leading-none text-accent/80 sm:w-10 sm:text-2xl md:w-14 md:text-3xl"
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                ) : (
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-0"
                    aria-hidden="true"
                  />
                )}

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-base uppercase tracking-wide text-ink transition-colors group-hover:text-accent group-focus-visible:text-accent md:text-lg">
                      {card.title}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-faint">
                      {badge}
                      {card.featured ? " · Featured" : ""}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-tertiary line-clamp-2 md:line-clamp-1">
                    {card.outcome}
                  </span>
                </span>

                <span className="caption shrink-0 pt-1 text-faint transition-colors group-hover:text-orange group-focus-visible:text-orange md:pt-0">
                  Open
                </span>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
