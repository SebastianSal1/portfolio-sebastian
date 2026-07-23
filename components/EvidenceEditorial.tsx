"use client";

import { useEffect, useState } from "react";
import { useLightbox } from "./LightboxProvider";
import { CATEGORY_LABEL, type WorkCardData } from "@/lib/types";
import { textCoverLabel } from "@/lib/media";

interface EvidenceEditorialProps {
  cards: WorkCardData[];
}

export default function EvidenceEditorial({ cards }: EvidenceEditorialProps) {
  if (!cards.length) return null;

  const [anchor, ...rest] = cards;
  const support = rest.slice(0, 3);

  return (
    <div className="space-y-12">
      <LeadEvidence card={anchor} />
      
      {support.length > 0 && (
        <div className="border-t border-ink/10 pt-8">
          <p className="caption mb-6 text-tertiary">Additional evidence</p>
          <div className="space-y-0">
            {support.map((card, i) => (
              <SupportingEvidence key={card.slug} card={card} index={i + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LeadEvidence({ card }: { card: WorkCardData }) {
  const { openCard } = useLightbox();
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [card.cover?.src]);

  const showImage = Boolean(card.cover?.src) && !imgFailed;
  const badge = CATEGORY_LABEL[card.category] ?? card.domain;

  return (
    <button
      type="button"
      aria-label={`${card.title}. ${badge}. Open details.`}
      onClick={(e) => openCard(card.slug, e.currentTarget)}
      className="group block w-full text-left"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="caption mb-3 text-accent">{badge}</p>
          <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            {card.title}
          </h3>
          <p className="mt-4 max-w-xl text-lg text-secondary">
            {card.outcome}
          </p>
          <p className="mt-6 text-sm text-tertiary">
            Open case study →
          </p>
        </div>

        {showImage && card.cover && (
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-small bg-ink/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element -- local /public paths */}
              <img
                src={card.cover.src}
                alt={card.cover.alt}
                width={1200}
                height={900}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                onError={() => setImgFailed(true)}
              />
            </div>
          </div>
        )}

        {!showImage && (
          <div className="lg:col-span-5">
            <div className="flex aspect-[4/3] items-center justify-center rounded-small bg-ink/[0.04]">
              <span className="text-sm text-tertiary">
                {textCoverLabel(card.slug, card.domain)}
              </span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

function SupportingEvidence({ card, index }: { card: WorkCardData; index: number }) {
  const { openCard } = useLightbox();
  const badge = CATEGORY_LABEL[card.category] ?? card.domain;
  const num = String(index).padStart(2, "0");

  return (
    <button
      type="button"
      aria-label={`${card.title}. ${badge}. Open details.`}
      onClick={(e) => openCard(card.slug, e.currentTarget)}
      className="group flex w-full items-baseline gap-6 border-b border-ink/5 py-5 text-left transition-colors hover:bg-ink/[0.02]"
    >
      <span className="shrink-0 font-display text-lg tabular-nums text-tertiary">
        {num}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-base uppercase tracking-wide text-ink transition-colors group-hover:text-accent">
            {card.title}
          </span>
          <span className="text-xs uppercase tracking-wider text-faint">
            {badge}
          </span>
        </span>
        <span className="mt-1 block text-sm text-tertiary line-clamp-1">
          {card.outcome}
        </span>
      </span>
      <span className="shrink-0 text-sm text-faint transition-colors group-hover:text-orange">
        →
      </span>
    </button>
  );
}
