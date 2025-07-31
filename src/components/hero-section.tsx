
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';

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

const AnimatedWords = ({ text }: { text: string }) => {
    const words = text.split(" ");
  
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
      }),
    };
  
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
    };
  
    return (
      <motion.h2
        className="text-4xl md:text-6xl font-bold font-headline tracking-tighter"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            style={{ marginRight: "1rem" }}
            key={index}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    );
};

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-32">
      <GridPattern
        className="absolute inset-0 z-0 h-full w-full fill-primary/10 stroke-border [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        yOffset={-1}
        interactive
      />
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <AnimatedWords text="The Ultimate Software Marketplace" />
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
        </motion.div>
      </div>
    </section>
  );
}
