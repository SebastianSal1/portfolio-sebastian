"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

// Scroll reveal. Reduced motion handled by <MotionConfig reducedMotion="user">
// in layout.tsx — transforms neutralize, opacity still fades in.
const spring = { type: "spring", stiffness: 120, damping: 22, mass: 0.7 } as const;

export const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const revealSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: spring },
};

type MotionSectionProps = HTMLMotionProps<"section">;

export default function MotionSection({
  children,
  ...rest
}: MotionSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={container}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
