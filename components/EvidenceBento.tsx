"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLightbox } from "./LightboxProvider";
import { CATEGORY_LABEL, type WorkCardData } from "@/lib/types";
import { textCoverLabel } from "@/lib/media";

interface EvidenceBentoProps {
  cards: WorkCardData[];
}

function BentoTile({
  data,
  anchor,
}: {
  data: WorkCardData;
  anchor?: boolean;
}) {
  const { openCard } = useLightbox();
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [data.cover?.src]);

  const showImage = Boolean(data.cover?.src) && !imgFailed;
  const badge = CATEGORY_LABEL[data.category] ?? data.domain;

  return (
    <motion.button
      type="button"
      aria-label={`${data.title}. ${badge}. Open details.`}
      onClick={(e) => openCard(data.slug, e.currentTarget)}
      whileTap={{ scale: 0.99 }}
      className={`group flex h-full min-h-0 w-full cursor-pointer flex-col rounded-card surface-raised surface-raised-hover p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${
        anchor ? "md:p-4" : ""
      }`}
    >
      <div
        className={`media-frame relative mb-3 overflow-hidden rounded-small bg-ink/[0.04] ${
          anchor
            ? "aspect-[16/10] min-h-[12rem] flex-1 md:aspect-auto md:min-h-[14rem] lg:min-h-[16rem]"
            : "aspect-[4/3]"
        }`}
        style={
          showImage
            ? undefined
            : {
                backgroundImage:
                  "linear-gradient(to right, rgba(26,43,224,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,43,224,0.07) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }
        }
      >
        {showImage && data.cover && (
          // eslint-disable-next-line @next/next/no-img-element -- local /public paths
          <img
            src={data.cover.src}
            alt={data.cover.alt}
            width={anchor ? 1600 : 1200}
            height={anchor ? 900 : 900}
            loading={anchor ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            onError={() => setImgFailed(true)}
          />
        )}
        {!showImage && (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
            <span className="text-sm font-medium tracking-wide text-tertiary">
              {textCoverLabel(data.slug, data.domain)}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-faint">
              Art plate
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-pill border border-ink/15 bg-paper/90 px-2.5 py-1 text-[11px] uppercase tracking-wider text-secondary backdrop-blur-sm">
          {badge}
        </span>
      </div>

      <h3
        className={`font-display uppercase leading-tight tracking-wide text-ink ${
          anchor ? "text-xl md:text-2xl" : "text-base md:text-lg"
        }`}
      >
        <span className="title-underline">{data.title}</span>
      </h3>
      <p
        className={`mt-2 text-tertiary ${
          anchor ? "text-sm md:text-base" : "text-sm line-clamp-2"
        }`}
      >
        {data.outcome}
      </p>
    </motion.button>
  );
}

export default function EvidenceBento({ cards }: EvidenceBentoProps) {
  if (!cards.length) return null;

  const [anchor, ...rest] = cards;
  const support = rest.slice(0, 3);
  // row-span must match support count so third compact stays in right rail
  const anchorRowSpan =
    support.length >= 3
      ? "lg:row-span-3"
      : support.length === 2
        ? "lg:row-span-2"
        : "";

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
      <motion.div
        className={`min-w-0 sm:col-span-2 lg:col-span-7 ${anchorRowSpan}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <BentoTile data={anchor} anchor />
      </motion.div>

      {support.map((card, i) => (
        <motion.div
          key={card.slug}
          className="min-w-0 lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.4,
            delay: 0.08 * (i + 1),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <BentoTile data={card} />
        </motion.div>
      ))}
    </div>
  );
}
