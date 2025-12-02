
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const animationDurations = {
  fast: 0.2,
  medium: 0.4,
  slow: 0.7,
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -15,
  },
};

export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const duration = animationDurations['medium'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
