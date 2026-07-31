"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "react-intersection-observer";

type PremiumRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function PremiumReveal({
  children,
  className,
  delay = 0,
  distance = 26,
}: PremiumRevealProps) {
  const reduzirMovimento = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduzirMovimento ? false : { opacity: 0, y: distance }}
      animate={
        reduzirMovimento || inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: distance }
      }
      transition={{
        duration: reduzirMovimento ? 0 : 0.62,
        delay: reduzirMovimento ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
