"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

// Signature interaction: a faint cobalt grid over paper that drifts toward the
// cursor (parallax), with an orange glow tracking the pointer near the hero.
// Cobalt = structure (the grid). Orange = interaction (the glow). Decorative →
// aria-hidden, pointer-events-none, disabled for reduced motion / coarse pointers.
export default function MagneticGrid() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const glowX = useMotionValue(-600);
  const glowY = useMotionValue(-600);
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);

  const gx = useSpring(glowX, { stiffness: 150, damping: 20 });
  const gy = useSpring(glowY, { stiffness: 150, damping: 20 });
  const dx = useSpring(driftX, { stiffness: 60, damping: 18 });
  const dy = useSpring(driftY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      glowX.set(x);
      glowY.set(y);
      driftX.set((x / r.width - 0.5) * 24);
      driftY.set((y / r.height - 0.5) * 24);
    }

    // Only track the pointer while the grid is on screen — no work once the
    // hero has scrolled away.
    let listening = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("pointermove", onMove);
        listening = true;
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("pointermove", onMove);
        listening = false;
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      if (listening) window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, glowX, glowY, driftX, driftY]);

  const glow = useMotionTemplate`radial-gradient(180px circle at ${gx}px ${gy}px, rgba(255,90,31,0.16), transparent 65%)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          x: dx,
          y: dy,
          backgroundImage:
            "linear-gradient(to right, rgba(26,43,224,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,43,224,0.08) 1px, transparent 1px)",
          backgroundSize: "clamp(40px, 6vw, 64px) clamp(40px, 6vw, 64px)",
          // Extra tile coverage without negative inset (avoids 360px scrollWidth bleed)
          backgroundPosition: "center",
        }}
      />
      {/* Always rendered so SSR and client markup match. Under reduced motion the
          pointer listener is off, so the glow simply stays offscreen (invisible). */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />
      {/* Fade the grid into paper so it reads as texture, not a hard overlay. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, transparent 35%, #F5F4F0 100%)",
        }}
      />
    </div>
  );
}
