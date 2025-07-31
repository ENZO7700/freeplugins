
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function HeroSection() {
  return (
    <motion.section 
      className="bg-background py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold font-headline tracking-tighter"
          variants={itemVariants}
        >
          The Ultimate Software Marketplace
        </motion.h2>
        <motion.p 
          className="mt-6 text-lg md:text-xl text-muted-foreground"
          variants={itemVariants}
        >
          Find, share, and sell software plugins and tools that power your projects.
        </motion.p>
        <motion.div 
          className="inline-block mt-8"
          variants={itemVariants}
        >
          <Button size="lg">
            Explore Plugins <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
