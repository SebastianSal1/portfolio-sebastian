"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

const editorial = { type: "spring", stiffness: 100, damping: 20, mass: 0.8 } as const;

export const editorialEntrance: Variants = {
  hidden: { opacity: 0.92, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const editorialFade: Variants = {
  hidden: { opacity: 0.92 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0.92, y: 8 },
  show: { opacity: 1, y: 0, transition: editorial },
};

export const revealSoft: Variants = {
  hidden: { opacity: 0.92 },
  show: { opacity: 1, transition: { duration: 0.35 } },
};

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animated?: boolean;
  [key: string]: unknown;
}

export default function MotionSection({
  children,
  className,
  id,
  animated = false,
  ...rest
}: MotionSectionProps) {
  if (!animated) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -5% 0px" }}
      variants={editorialEntrance}
    >
      {children}
    </motion.section>
  );
}
