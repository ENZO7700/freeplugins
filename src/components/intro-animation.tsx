'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
  isVisible: boolean;
}

export function IntroAnimation({ isVisible }: IntroAnimationProps) {
  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background pointer-events-none'
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold font-headline text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          FreePlugins
        </motion.h1>
      </div>
    </motion.div>
  );
}
