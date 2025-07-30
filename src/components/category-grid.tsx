
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { getPluginCategories } from '@/components/plugin-list';
import { motion } from 'framer-motion';

// Let's define some specific images and hints for our categories
const categoryVisuals: { [key: string]: { imageUrl: string; dataAiHint: string } } = {
  SEO: { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'analytics chart' },
  'E-commerce': { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'online store' },
  'Social Media': { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'social network' },
  Analytics: { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'data graph' },
  Security: { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'security shield' },
  Utilities: { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'tools gears' },
};


export function CategoryGrid() {
  const categories = getPluginCategories();

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 40,
        damping: 10,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section className="py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Product Archive</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our plugins by category.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
            const visual = categoryVisuals[category] || { imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'abstract tech' };
            return (
                <motion.div
                    key={category}
                    custom={index}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Link href={`/?category=${encodeURIComponent(category)}`} passHref>
                        <Card className="relative group block overflow-hidden rounded-lg h-64 cursor-pointer shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
                            <Image
                                src={visual.imageUrl}
                                alt={`${category} background`}
                                fill
                                style={{ objectFit: 'cover' }}
                                data-ai-hint={visual.dataAiHint}
                                className="z-0 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 z-10" />
                            <div className="relative z-20 flex items-center justify-center h-full">
                                <h3 className="text-3xl font-bold font-headline text-white drop-shadow-lg">
                                    {category}
                                </h3>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            )
        })}
      </div>
    </section>
  );
}
