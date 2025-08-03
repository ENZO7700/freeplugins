
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Balancer } from 'react-wrap-balancer';

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
      <motion.h1
        className="text-6xl md:text-8xl font-bold font-headline tracking-tighter animate-text-glow"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.1)'
        }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <Balancer>
            {words.map((word, index) => (
            <motion.span
                variants={child}
                style={{ marginRight: "1rem" }}
                key={index}
            >
                {word}
            </motion.span>
            ))}
        </Balancer>
      </motion.h1>
    );
};

export function HeroSection() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);


  return (
    <section ref={targetRef} className="relative w-full overflow-hidden bg-background py-20 md:py-32">
      <motion.div style={{ y }}>
        <GridPattern
            className="absolute inset-0 z-0 h-full w-full fill-primary/10 stroke-border [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
            yOffset={-1}
            interactive
        />
      </motion.div>
      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div style={{ y: textY }}>
            <AnimatedWords text="SOFTW4R3" />
          </motion.div>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-muted-foreground"
            variants={itemVariants}
          >
            <Balancer>
                Nájdite, zdieľajte a predávajte softvérové pluginy a nástroje, ktoré poháňajú vaše projekty.
            </Balancer>
          </motion.p>
          <motion.div 
            className="inline-block mt-8"
            variants={itemVariants}
          >
            <Button size="lg" className="shadow-lg hover:shadow-primary/50">
              Preskúmať pluginy <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
