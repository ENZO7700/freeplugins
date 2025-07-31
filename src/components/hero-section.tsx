
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Wind, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const featureCards = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Vast Plugin Library',
      description: 'Access a wide variety of plugins for any need.',
      dataAiHint: 'software code',
    },
    {
      icon: <Wind className="w-8 h-8 text-primary" />,
      title: 'Easy Integration',
      description: 'Integrate our plugins seamlessly into your projects.',
      dataAiHint: 'puzzle connect',
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: 'Community Reviewed',
      description: 'Reliable and reviewed plugins by our community.',
      dataAiHint: 'people community',
    },
  ];

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 10,
        delay: i * 0.2
      }
    })
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="relative flex min-h-[50vh] flex-col items-center justify-center">
        <div 
          className="text-center max-w-4xl mx-auto mb-20 relative z-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold font-headline tracking-tighter animate-glow"
          >
            The Ultimate Software Marketplace
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-muted-foreground"
          >
            Find, share, and sell software plugins and tools that power your projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-8"
          >
            <Button size="lg" className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
              Explore Plugins <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 bg-transparent">
        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.4 }}
              >
                <Card
                  className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-background/80 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 ease-in-out"
                >
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">{feature.icon}</div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
