"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  download?: boolean;
  external?: boolean;
  className?: string;
}

// Button that leans toward the cursor (magnetic) and compresses on tap.
// Default = cobalt structure; hover/active = orange interaction.
export default function MagneticButton({
  children,
  href,
  onClick,
  primary = false,
  download = false,
  external = false,
  className = "",
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base = `inline-flex min-h-[48px] items-center justify-center rounded-pill px-6 text-sm font-medium transition-colors ${
    primary
      ? "bg-ink text-paper hover:bg-orange"
      : "border border-accent/40 text-ink hover:border-orange hover:text-orange"
  } ${className}`;
  const style = { x: sx, y: sy };
  // Reduced motion handled globally by <MotionConfig reducedMotion="user">.
  const whileTap = { scale: 0.95 };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onPointerMove={onMove}
        onPointerLeave={reset}
        whileTap={whileTap}
        style={style}
        className={base}
      >
        {children}
        {external ? (
          <span className="sr-only"> (opens in new tab)</span>
        ) : null}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={whileTap}
      style={style}
      className={base}
    >
      {children}
    </motion.button>
  );
}
